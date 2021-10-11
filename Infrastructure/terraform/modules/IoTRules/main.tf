resource "aws_iot_topic_rule" "LWTRepublishDisconnectedState" {
  name        = "LWTRepublishDisconnectedState"
  description = "Upon device disconnection the device LWT will be republished to shadow/update with a disconnected state"
  enabled     = true
  sql         = "SELECT * FROM '${var.LwtPublishTopic}'"
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

resource "aws_iam_role_policy" "RepublishToReservedTopicsPermissions" {
    name = "RepublishToReservedTopicsPermissions"
    role = aws_iam_role.RepublishToReservedTopics.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
        "Effect": "Allow",
        "Action": [
            "iot:Publish"
        ],
        "Resource": "arn:aws:iot:us-west-2:746579880144:topic/${var.LwtRepublishTopic}"
    }
  ]
}
EOF
}