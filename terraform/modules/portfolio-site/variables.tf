variable "domain" {
  description = "Domain for the website"
  type        = string
}

variable "subdomain1" {
  description = "1st subdomain for the website"
  type        = string
}

variable "subdomain2" {
  description = "2nd subdomain for the website"
  type        = string
}

variable "subdomain3" {
  description = "3rd subdomain for the website"
  type        = string
}

variable "bucket_name" {
  description = "Bucket name for the website"
  type        = string
}

variable "ssl_certificate_arn" {
  description = "Existing SSL certificate ARN"
  type        = string
}
