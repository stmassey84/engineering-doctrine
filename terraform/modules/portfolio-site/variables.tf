variable "domain" {
  description = "Domain for the website"
  type        = string
}

variable "subdomain" {
  description = "Subdomain for the website"
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
