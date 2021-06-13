terraform {
  backend "s3" {
    bucket         = "terraform-state-all-projects"
    key            = "personal-website/production/terraform.tfstate"
    region         = "us-west-2"
    dynamodb_table = "TerraformStateLock"
    encrypt        = true
  }
}

provider "aws" {
  profile = "ZachTerraform"
  region  = "us-west-1"
}

provider "aws" {
  profile = "ZachTerraform"
  alias   = "useast1"
  region  = "us-east-1"
}

//This module needs a second provider block because it creates the SSL certificates and Cloudfront only accepts certs from us-east-1
module "CertificatesAndDomains" {
  source = "../../../modules/CertificatesAndDomains"
  providers = {
    aws = aws.useast1
  }
  website_domain_name = var.website_domain_name
}

module "CloudFrontDistribution" {
  source = "../../../modules/CloudFrontDistribution"
  acm_certificate_arn = module.CertificatesAndDomains.acm_certificate_arn
  s3_bucket_name = "personal-website-cloudfront-distribution-bucket"
  website_domain_name = var.website_domain_name
}