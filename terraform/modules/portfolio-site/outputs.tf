output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.website.id
}

output "route53_zone_id" {
  value = aws_route53_zone.main.zone_id
}

output "s3_bucket_url" {
  value = "https://${var.bucket_name}.s3.amazonaws.com"
}
