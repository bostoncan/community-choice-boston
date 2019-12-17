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

variable "eventbrite_token" {
    type = "string"
    description = "API Token for Eventbrite"
}

variable "eventbrite_organizer" {
    type = "string"
    description = "Eventbrite Organizer ID"
}

variable "action_network_token" {
    type = "string"
    description = "API Token for the Action Network"
}

provider "template" {
    version = "~> 2.1"
}

provider "aws" {
    region = "${var.aws_region}"
    version = "2.41.0"
}

terraform {
    backend "s3" {
        key = "cce-boston.tfstate"
    }
}
