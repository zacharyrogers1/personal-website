#---------------------------------------------Identity Pool---------------------------------
data "aws_iam_policy" "managedPolicyIotDataReader" {
  arn = "arn:aws:iam::aws:policy/AWSIoTDataAccess"
  # The arn of Managed AWS policies are fixed and unchanging.
}

resource "aws_cognito_identity_pool" "identityPool" {
  identity_pool_name               = "personalWebsiteIdentityPool"
  allow_unauthenticated_identities = true
  cognito_identity_providers {
    client_id = aws_cognito_user_pool_client.webClient.id
    provider_name = aws_cognito_user_pool.pool.endpoint
    server_side_token_check = false
  }
}

resource "aws_iam_role" "unauthenticated" {
  name               = "personalWebsiteCognitoUnauthRole"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "cognito-identity.amazonaws.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "cognito-identity.amazonaws.com:aud": "${aws_cognito_identity_pool.identityPool.id}"
        },
        "ForAnyValue:StringLike": {
          "cognito-identity.amazonaws.com:amr": "unauthenticated"
        }
      }
    }
  ]
}
EOF
}


resource "aws_iam_role" "authenticated" {
  name               = "personalWebsiteCognitoAuthRole"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "cognito-identity.amazonaws.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "cognito-identity.amazonaws.com:aud": "${aws_cognito_identity_pool.identityPool.id}"
        },
        "ForAnyValue:StringLike": {
          "cognito-identity.amazonaws.com:amr": "authenticated"
        }
      }
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "managedIotDataReaderAttachmentAuth" {
  role       = aws_iam_role.authenticated.name
  policy_arn = data.aws_iam_policy.managedPolicyIotDataReader.arn
}


resource "aws_cognito_identity_pool_roles_attachment" "personalWebsitePoolRoleAttachment" {
  identity_pool_id = aws_cognito_identity_pool.identityPool.id

  roles = {
    "authenticated"   = aws_iam_role.authenticated.arn
    "unauthenticated" = aws_iam_role.unauthenticated.arn
  }
}



#------------------------------------------User Pool----------------------------------------
resource "aws_cognito_user_pool" "pool" {
  name = "personalWebsitePool"

  admin_create_user_config {
    allow_admin_create_user_only = true
    invite_message_template {
      email_message = "Welcome to zacharytrogers.com. Your username is {username} and your temporary password is {####}"
      email_subject = "Welcome to zacharytrogers.com!"
      sms_message   = "Welcome to zacharytrogers.com. Your username is {username} and your temporary password is {####}"
    }
  }

  sms_configuration {
    external_id    = "personalWebsiteUserPool"
    sns_caller_arn = aws_iam_role.cognitoAssumesThisRoleToDoActions.arn
  }


}

resource "aws_iam_role" "cognitoAssumesThisRoleToDoActions" {
  name               = "cognitoUserPoolRole"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "cognito-idp.amazonaws.com"
      },
      "Effect": "Allow",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "personalWebsiteUserPool"
        }
      }
    }
  ]
}
EOF
}

resource "aws_iam_policy" "sendSmsTexts" {
  name = "allowEntityToSendSMSTexts"
  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "sns:publish"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "cognitoCanSendTexts" {
  role       = aws_iam_role.cognitoAssumesThisRoleToDoActions.name
  policy_arn = aws_iam_policy.sendSmsTexts.arn
}

resource "aws_cognito_user_pool_client" "webClient" {
  name = "personalWebsiteClient"

  user_pool_id = aws_cognito_user_pool.pool.id
}
