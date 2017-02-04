variable "resource_prefix" {
  type = "string"
  default = "cce-boston"
}

variable "domain_fqdn" {
    type = "string"
    default = "communitychoiceboston.org"
}

variable "aws_region" {
  type = "string"
  description = "What AWS region to deploy in"
  default = "us-east-1"
}

provider "aws" {
  // Access keys taken from the "bcan" profile of your ~/.aws/credentials file
  profile = "bcan"
  region = "${var.aws_region}"
}
