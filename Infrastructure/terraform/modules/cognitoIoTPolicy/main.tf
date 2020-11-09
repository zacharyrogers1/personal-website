resource "aws_iot_policy" "iotAllAccess" {
  name = "iotAllAccess"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "iot:*"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
EOF
}

# To give an authenticated Cognito identity right to iot you need to attach a policy to the cognito identityID(NOT USER)
# The target hardcoded below is the authenticated cognito identity of pop 
resource "aws_iot_policy_attachment" "att" {
  policy = aws_iot_policy.iotAllAccess.name
  target = "us-east-1:0e17a00b-dd7d-4429-84e9-aac67e294ccb"
}

# resource "aws_iot_policy" "iotLimitedSubscribeRights" {
#   name = "iotLimitedSubscribeRights"

#   policy = <<EOF
#   {
#   "Version": "2012-10-17",
#   "Statement": [
#     {
#       "Effect": "Allow",
#       "Action": [
#         "iot:Connect",
#         "iot:Publish",
#         "iot:Receive",
#         "iot:GetThingShadow",
#         "iot:UpdateThingShadow",
#         "iot:DeleteThingShadow"
#       ],
#       "Resource": "*"
#     },
#     {
#       "Effect": "Allow",
#       "Action": [
#         "iot:Subscribe"
#       ],
#       "Resource": "arn:aws:iot:us-east-1:746579880144:topicfilter/blah/blah/blah"
#     }
#   ]
# }
# EOF
# }