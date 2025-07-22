provider "aws" {
  region = "us-east-1"
}

resource "null_resource" "build_and_deploy_site" {
  provisioner "local-exec" {
    command     = <<EOT
      npm install && npm run build
      aws s3 sync ./dist s3://${var.bucket_name} --delete
      aws cloudfront create-invalidation --distribution-id ${aws_cloudfront_distribution.website.id} --paths "/*"
    EOT
    working_dir = "${path.module}/../../../"
  }

  triggers = {
    src_hash        = join("", [for file in fileset("${path.module}/../../../src", "**/*") : filesha256("${path.module}/../../../src/${file}")])
    package_hash    = filemd5("${path.module}/../../../package.json")
    tailwind_config = filemd5("${path.module}/../../../tailwind.config.js")
    postcss_config  = filemd5("${path.module}/../../../postcss.config.js")
    index_css_hash  = filemd5("${path.module}/../../../src/index.css")
  }
}

resource "aws_s3_bucket" "website" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_public_access_block" "website" {
  bucket = aws_s3_bucket.website.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "website" {
  bucket = aws_s3_bucket.website.id

  versioning_configuration {
    status = "Disabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "website" {
  bucket = aws_s3_bucket.website.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.website.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

resource "aws_s3_bucket_policy" "website" {
  bucket = aws_s3_bucket.website.id
  policy = data.aws_iam_policy_document.bucket_policy.json
}

data "aws_iam_policy_document" "bucket_policy" {
  statement {
    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn}"]
    }

    actions = ["s3:GetObject"]

    resources = [
      "${aws_s3_bucket.website.arn}/*"
    ]
  }
}

resource "aws_cloudfront_distribution" "website" {
  origin {
    domain_name = aws_s3_bucket.website.bucket_domain_name
    origin_id   = "S3-${aws_s3_bucket.website.id}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = false
  default_root_object = "index.html"

  aliases = ["${var.subdomain1}.${var.domain}", "${var.subdomain2}.${var.domain}", "${var.subdomain3}.${var.domain}"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.website.id}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = var.ssl_certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}

resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "OAI for S3 bucket ${aws_s3_bucket.website.id}"
}

resource "aws_route53_zone" "main" {
  name = var.domain
}

resource "aws_route53_record" "alias_1" {
  zone_id = aws_route53_zone.main.zone_id
  name    = var.subdomain1
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "alias_2" {
  zone_id = aws_route53_zone.main.zone_id
  name    = var.subdomain2
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "alias_3" {
  zone_id = aws_route53_zone.main.zone_id
  name    = var.subdomain3
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}
