variable "portfolio_domain" {
  description = "Domain for the website"
  type        = string
}

variable "portfolio_subdomain1" {
  description = "1st subdomain for the website"
  type        = string
}

variable "portfolio_subdomain2" {
  description = "2nd subdomain for the website"
  type        = string
}

variable "portfolio_bucket_name" {
  description = "Bucket name for the website"
  type        = string
}

variable "portfolio_ssl_certificate_arn" {
  description = "Existing SSL certificate ARN"
  type        = string
}
