provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "www-duckhuntjs-com" {
  bucket = "www.duckhuntjs.com"
  acl = "public-read"

  website {
    redirect_all_requests_to = "duckhuntjs.com"
  }
}

resource "aws_s3_bucket" "duckhuntjs-com" {
  bucket = "duckhuntjs.com"
  acl = "public-read"
  policy = "${file("s3policy.json")}"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "cloudflare_record" "www-duckhuntjs-com" {
  domain = "duckhuntjs.com"
  name = "www"
  value = "${aws_s3_bucket.www-duckhuntjs-com.website_endpoint}"
  type = "CNAME"
  ttl = 3600
}

resource "cloudflare_record" "duckhuntjs-com" {
  domain = "duckhuntjs.com"
  name = "duckhuntjs.com"
  value = "${aws_s3_bucket.duckhuntjs-com.website_endpoint}"
  type = "CNAME"
  ttl = 3600
}