terraform {
  backend "s3" {
    bucket  = "portfolio-tf-state"
    key     = "state/portfolio-website.tfstate"
    region  = "us-east-1"
    encrypt = true
  }
}

module "portfolio_site" {
  source = "./modules/portfolio-site"

  domain              = var.portfolio_domain
  subdomain           = var.portfolio_subdomain
  bucket_name         = var.portfolio_bucket_name
  ssl_certificate_arn = var.portfolio_ssl_certificate_arn
}
