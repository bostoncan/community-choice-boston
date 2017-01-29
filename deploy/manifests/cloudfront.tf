data "aws_acm_certificate" "cert" {
    domain = "${var.domain_fqdn}"
    statuses = ["ISSUED"]
}

resource "aws_cloudfront_origin_access_identity" "id" {
    comment = "${var.resource_prefix} CDN origin access ID"
}

resource "aws_cloudfront_distribution" "dist" {
    enabled = true
    comment = "Terraform-managed CDN for ${var.domain_fqdn}"
    default_root_object = "index.html"
    aliases = ["${var.domain_fqdn}"]

    origin {
        domain_name = "${aws_s3_bucket.site.bucket}.s3.amazonaws.com"
        origin_id   = "${var.resource_prefix}-origin-id"

        s3_origin_config {
            origin_access_identity = "${aws_cloudfront_origin_access_identity.id.cloudfront_access_identity_path}"
        }
    }

    default_cache_behavior {
        allowed_methods  = ["GET", "HEAD", "DELETE", "OPTIONS", "PATCH", "POST", "PUT"]
        cached_methods   = ["GET", "HEAD"]
        target_origin_id = "${var.resource_prefix}-origin-id"

        forwarded_values {
            query_string = true
            cookies {
                forward = "none"
            }
        }

        viewer_protocol_policy = "redirect-to-https"
        compress = true
        min_ttl = 0
        default_ttl = 3600
        max_ttl = 3600
    }

    restrictions {
        geo_restriction {
            restriction_type = "none"
        }
    }

    custom_error_response {
        error_caching_min_ttl = 0
        error_code = 404
        response_code = 200
        response_page_path = "/index.html"
    }

    price_class = "PriceClass_200"

    viewer_certificate {
        acm_certificate_arn = "${aws_acm_certificate.cert.arn}"
        minimum_protocol_version = "TLSv1"
        ssl_support_method = "sni-only"
    }
}
