#
# Primary Site Bucket
#

resource "template_file" "bucket_policy" {
    template = "${file("./manifests/templates/bucket-policy.json")}"

    vars {
        domain_fqdn = "${var.domain_fqdn}"
    }
}

resource "aws_s3_bucket" "site" {
    bucket = "${var.domain_fqdn}"
    acl = "public-read"
    force_destroy = true
    policy = "${template_file.bucket_policy.rendered}"

    website {
        index_document = "index.html"
    }
    depends_on = ["template_file.bucket_policy"]
}

#
# App
#

resource "aws_s3_bucket_object" "app" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "app.js"
    source = "./webpack/build/app.js"
    etag = "${md5(file("./webpack/build/app.js"))}"
    content_type = "application/javascript"
}

#
# Pages
#

resource "aws_s3_bucket_object" "endorsements" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "endorsements.html"
    source = "./webpack/build/endorsements.html"
    etag = "${md5(file("./webpack/build/endorsements.html"))}"
    content_type = "text/html"
}

resource "aws_s3_bucket_object" "faq" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "faq.html"
    source = "./webpack/build/faq.html"
    etag = "${md5(file("./webpack/build/faq.html"))}"
    content_type = "text/html"
}

resource "aws_s3_bucket_object" "index" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "index.html"
    source = "./webpack/build/index.html"
    etag = "${md5(file("./webpack/build/index.html"))}"
    content_type = "text/html"
}


#
# Styles
#

resource "aws_s3_bucket_object" "styles" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "css/styles.css"
    source = "./webpack/build/css/styles.css"
    etag = "${md5(file("./webpack/build/css/styles.css"))}"
    content_type = "text/css"
}

#
# Data
#

resource "aws_s3_bucket_object" "town_data" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "data/ma-towns.topojson"
    source = "./webpack/build/data/ma-towns.topojson"
    etag = "${md5(file("./webpack/build/data/ma-towns.topojson"))}"
    content_type = "application/json"
}


#
# Images
#

resource "aws_s3_bucket_object" "img_hero" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/hero.jpg"
    source = "./webpack/build/img/hero.jpg"
    etag = "${md5(file("./webpack/build/img/hero.jpg"))}"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "img_favicon" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/favicon.ico"
    source = "./webpack/build/img/favicon.ico"
    etag = "${md5(file("./webpack/build/img/favicon.ico"))}"
    content_type = "image/x-icon"
}

#
# Endorsement Images
#

resource "aws_s3_bucket_object" "endorsement_bsac" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/bsac.jpeg"
    source = "./webpack/build/img/endorsements/bsac.jpeg"
    etag = "${md5(file("./webpack/build/img/endorsements/bsac.jpeg"))}"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_kalila_barnett" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/kalila_barnett.jpg"
    source = "./webpack/build/img/endorsements/kalila_barnett.jpg"
    etag = "${md5(file("./webpack/build/img/endorsements/kalila_barnett.jpg"))}"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_mcann" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/MCAN_logo.png"
    source = "./webpack/build/img/endorsements/MCAN_logo.png"
    etag = "${md5(file("./webpack/build/img/endorsements/MCAN_logo.png"))}"
    content_type = "image/png"
}

resource "aws_s3_bucket_object" "endorsement_michelle_wu" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/michelle_wu.jpg"
    source = "./webpack/build/img/endorsements/michelle_wu.jpg"
    etag = "${md5(file("./webpack/build/img/endorsements/michelle_wu.jpg"))}"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_rev_mariama_white_hammond" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/rev_mariama_white_hammond.jpeg"
    source = "./webpack/build/img/endorsements/rev_mariama_white_hammond.jpeg"
    etag = "${md5(file("./webpack/build/img/endorsements/rev_mariama_white_hammond.jpeg"))}"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_roslindale" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/roslindale.png"
    source = "./webpack/build/img/endorsements/roslindale.png"
    etag = "${md5(file("./webpack/build/img/endorsements/roslindale.png"))}"
    content_type = "image/png"
}


#
# Other
#

resource "aws_s3_bucket_object" "robots" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "robots.txt"
    source = "./webpack/build/robots.txt"
    etag = "${md5(file("./webpack/build/robots.txt"))}"
    content_type = "text/plain"
}
