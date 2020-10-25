terraform {
  backend "s3" {
    bucket         = "terraform-state-all-projects"
    key            = "personal-website/production/cognito.tfstate"
    region         = "us-west-2"
    dynamodb_table = "TerraformStateLock"
    encrypt        = true
  }
}

provider "aws" {
  profile = "ZachTerraform"
  region  = var.aws_region
}



//This module needs a second provider block because it creates the SSL certificates and Cloudfront only accepts certs from us-east-1


module "cognito" {
  source = "../../../modules/cognito"
}