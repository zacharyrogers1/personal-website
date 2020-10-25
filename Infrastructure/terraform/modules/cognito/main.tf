data "aws_iam_policy" "managedPolicyIotDataReader" {
  arn = "arn:aws:iam::aws:policy/AWSIoTDataAccess"
# The arn of Managed AWS policies are fixed and unchanging.
}

resource "aws_cognito_identity_pool" "blindsIdentityPool" {
  identity_pool_name               = "blindsIdentityPool"
  allow_unauthenticated_identities = true
}

resource "aws_iam_role" "unauthenticated" {
  name               = "blindsCognitoUnauthRole"
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
          "cognito-identity.amazonaws.com:aud": "${aws_cognito_identity_pool.blindsIdentityPool.id}"
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

resource "aws_iam_role_policy_attachment" "managedIotDataReaderAttachmentUnauth" {
  role       = aws_iam_role.unauthenticated.name
  policy_arn = data.aws_iam_policy.managedPolicyIotDataReader.arn
}

resource "aws_iam_role" "authenticated" {
  name               = "blindsCognitoAuthRole"
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
          "cognito-identity.amazonaws.com:aud": "${aws_cognito_identity_pool.blindsIdentityPool.id}"
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


resource "aws_cognito_identity_pool_roles_attachment" "blindsPoolRoleAttachment" {
  identity_pool_id = aws_cognito_identity_pool.blindsIdentityPool.id

  roles = {
    "authenticated"   = aws_iam_role.authenticated.arn
    "unauthenticated" = aws_iam_role.unauthenticated.arn
  }
}