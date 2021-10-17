terraform {
  backend "s3" {
    bucket         = "terraform-state-all-projects"
    key            = "personal-website/production/Iot.tfstate"
    region         = "us-west-2"
    dynamodb_table = "TerraformStateLock"
    encrypt        = true
  }
}

provider "aws" {
  profile = "ZachTerraform"
  region  = var.aws_region
}

module "cognito" {
  source = "../../../modules/cognitoIoTPolicy"
}

module "IoTRules" {
  source = "../../../modules/IoTRules"
  LwtTopic = "lastWillTestament/stringLights"
  LwtRepublishTopic = "$aws/things/stringLights/shadow/update"
}
