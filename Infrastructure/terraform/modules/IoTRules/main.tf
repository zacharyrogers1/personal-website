resource "aws_iot_topic_rule" "LWTRepublishDisconnectedState" {
  name        = "LWTRepublishDisconnectedState"
  description = "Upon device disconnection the device LWT will be republished to shadow/update with a disconnected state"
  enabled     = true
  sql         = "SELECT * FROM '${var.LwtTopic}'"
  sql_version = "2015-10-08"

  republish {
      role_arn = aws_iam_role.RepublishToReservedTopics.arn
      topic = format("$%s", var.LwtRepublishTopic)
  }
}

resource "aws_iam_role" "RepublishToReservedTopics" {
    name = "RepublishToReservedTopics"
    assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "iot.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

data "aws_iam_policy" "managedPolicyIotDataReader" {
  arn = "arn:aws:iam::aws:policy/AWSIoTDataAccess"
  # The arn of Managed AWS policies are fixed and unchanging.
}

resource "aws_iam_role_policy_attachment" "managedIotDataReaderAttachment" {
  role       = aws_iam_role.RepublishToReservedTopics.name
  policy_arn = data.aws_iam_policy.managedPolicyIotDataReader.arn
}
