#
# Primary Site Bucket
#

data "template_file" "bucket_policy" {
    template = "${file("./templates/bucket-policy.json")}"

    vars {
        domain_fqdn = "${var.domain_fqdn}"
    }
}

resource "aws_s3_bucket" "site" {
    bucket = "${var.domain_fqdn}"
    acl = "public-read"
    force_destroy = true
    policy = "${data.template_file.bucket_policy.rendered}"

    website {
        index_document = "index.html"
    }
    depends_on = ["data.template_file.bucket_policy"]
}

#
# App
#

resource "aws_s3_bucket_object" "app" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "app.js"
    source = "../webpack/build/app.js"
    etag = "${md5(file("../webpack/build/app.js"))}"
    content_type = "application/javascript"
}

#
# Pages
#

resource "aws_s3_bucket_object" "endorsements" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "endorsements.html"
    source = "../webpack/build/endorsements.html"
    etag = "${md5(file("../webpack/build/endorsements.html"))}"
    content_type = "text/html"
}

resource "aws_s3_bucket_object" "faq" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "faq.html"
    source = "../webpack/build/faq.html"
    etag = "${md5(file("../webpack/build/faq.html"))}"
    content_type = "text/html"
}

resource "aws_s3_bucket_object" "index" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "index.html"
    source = "../webpack/build/index.html"
    etag = "${md5(file("../webpack/build/index.html"))}"
    content_type = "text/html"
}

resource "aws_s3_bucket_object" "resources" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "resources.html"
    source = "../webpack/build/resources.html"
    etag = "${md5(file("../webpack/build/resources.html"))}"
    content_type = "text/html"
}


#
# Styles
#

resource "aws_s3_bucket_object" "styles" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "css/styles.css"
    source = "../webpack/build/css/styles.css"
    etag = "${md5(file("../webpack/build/css/styles.css"))}"
    content_type = "text/css"
}

#
# Data
#

resource "aws_s3_bucket_object" "town_data" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "data/ma-towns.topojson"
    source = "../webpack/build/data/ma-towns.topojson"
    etag = "${md5(file("../webpack/build/data/ma-towns.topojson"))}"
    content_type = "application/json"
}


#
# Images
#

resource "aws_s3_bucket_object" "img_hero" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/hero.jpg"
    source = "../webpack/build/img/hero.jpg"
    etag = "${md5(file("../webpack/build/img/hero.jpg"))}"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "img_favicon" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/favicon.ico"
    source = "../webpack/build/img/favicon.ico"
    etag = "${md5(file("../webpack/build/img/favicon.ico"))}"
    content_type = "image/x-icon"
}

resource "aws_s3_bucket_object" "img_negef" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/negef.png"
    source = "../webpack/build/img/negef.png"
    etag = "${md5(file("../webpack/build/img/negef.png"))}"
    content_type = "image/png"
}

resource "aws_s3_bucket_object" "img_poster_thumb" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/poster-thumb.jpg"
    source = "../webpack/build/img/poster-thumb.jpg"
    etag = "${md5(file("../webpack/build/img/poster-thumb.jpg"))}"
    content_type = "image/jpeg"
}

#
# Endorsement Images
#

resource "aws_s3_bucket_object" "endorsement_bcan" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/bcan.jpg"
    source = "../webpack/build/img/endorsements/bcan.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/bcan.jpg"))}"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_bsac" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/bsac.jpg"
    source = "../webpack/build/img/endorsements/bsac.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/bsac.jpg"))}"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_carol_oldham" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/carol_oldham.jpg"
    source = "../webpack/build/img/endorsements/carol_oldham.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/carol_oldham.jpg"))}"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_michael_orr" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/michael_orr.jpg"
    source = "../webpack/build/img/endorsements/michael_orr.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/michael_orr.jpg"))}"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_jenny_sazama" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/jenny_sazama.jpg"
    source = "../webpack/build/img/endorsements/jenny_sazama.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/jenny_sazama.jpg"))}"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_joel_wool" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/joel_wool.jpg"
    source = "../webpack/build/img/endorsements/joel_wool.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/joel_wool.jpg"))}"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_kalila_barnett" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/kalila_barnett.jpg"
    source = "../webpack/build/img/endorsements/kalila_barnett.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/kalila_barnett.jpg"))}"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_matt_omalley" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/matt_omalley.jpg"
    source = "../webpack/build/img/endorsements/matt_omalley.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/matt_omalley.jpg"))}"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_annissa_essaibi_george" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/essaibi-george.jpg"
    source = "../webpack/build/img/endorsements/essaibi-george.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/essaibi-george.jpg"))}"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_josh_zakim" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/zakim.jpg"
    source = "../webpack/build/img/endorsements/zakim.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/zakim.jpg"))}"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_michelle_wu" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/michelle_wu.jpg"
    source = "../webpack/build/img/endorsements/michelle_wu.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/michelle_wu.jpg"))}"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_rev_mariama_white_hammond" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/rev_mariama_white_hammond.jpg"
    source = "../webpack/build/img/endorsements/rev_mariama_white_hammond.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/rev_mariama_white_hammond.jpg"))}"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_sierra_mass" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/sierra-mass.jpg"
    source = "../webpack/build/img/endorsements/sierra-mass.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/sierra-mass.jpg"))}"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_nabb" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/nabb.jpg"
    source = "../webpack/build/img/endorsements/nabb.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/nabb.jpg"))}"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_bcec" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/bcec.jpg"
    source = "../webpack/build/img/endorsements/bcec.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/bcec.jpg"))}"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_wrse" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/wrse.jpg"
    source = "../webpack/build/img/endorsements/wrse.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/wrse.jpg"))}"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_roslindale" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/roslindale.jpg"
    source = "../webpack/build/img/endorsements/roslindale.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/roslindale.jpg"))}"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_jpnc" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/jpnc.jpg"
    source = "../webpack/build/img/endorsements/jpnc.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/jpnc.jpg"))}"
    content_type = "image/jpeg"
}

#
# Other
#

resource "aws_s3_bucket_object" "robots" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "robots.txt"
    source = "../webpack/build/robots.txt"
    etag = "${md5(file("../webpack/build/robots.txt"))}"
    content_type = "text/plain"
}
