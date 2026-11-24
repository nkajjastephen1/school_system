output "s3_bucket_name" {
  description = "Name of the S3 bucket hosting the school management system"
  value       = aws_s3_bucket.website.bucket
}

output "cloudfront_domain_name" {
  description = "Public URL of the school management system"
  value       = "https://${aws_cloudfront_distribution.website.domain_name}"
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID for deployment invalidations"
  value       = aws_cloudfront_distribution.website.id
}
