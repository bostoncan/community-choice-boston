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
    cache_control = "max_age=86400"
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
    cache_control = "max_age=86400"
    content_type = "text/html"
}

resource "aws_s3_bucket_object" "faq" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "faq.html"
    source = "../webpack/build/faq.html"
    etag = "${md5(file("../webpack/build/faq.html"))}"
    cache_control = "max_age=86400"
    content_type = "text/html"
}

resource "aws_s3_bucket_object" "index" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "index.html"
    source = "../webpack/build/index.html"
    etag = "${md5(file("../webpack/build/index.html"))}"
    cache_control = "max_age=86400"
    content_type = "text/html"
}

resource "aws_s3_bucket_object" "resources" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "resources.html"
    source = "../webpack/build/resources.html"
    etag = "${md5(file("../webpack/build/resources.html"))}"
    cache_control = "max_age=86400"
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
    cache_control = "max_age=86400"
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
    cache_control = "max_age=86400"
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
    cache_control = "max_age=31536000"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "img_logo" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/cce.png"
    source = "../webpack/build/img/cce.png"
    etag = "${md5(file("../webpack/build/img/cce.png"))}"
    cache_control = "max_age=31536000"
    content_type = "image/png"
}

resource "aws_s3_bucket_object" "img_favicon" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/favicon.ico"
    source = "../webpack/build/img/favicon.ico"
    etag = "${md5(file("../webpack/build/img/favicon.ico"))}"
    cache_control = "max_age=31536000"
    content_type = "image/x-icon"
}

resource "aws_s3_bucket_object" "img_negef" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/negef.png"
    source = "../webpack/build/img/negef.png"
    etag = "${md5(file("../webpack/build/img/negef.png"))}"
    cache_control = "max_age=31536000"
    content_type = "image/png"
}

resource "aws_s3_bucket_object" "img_poster_thumb" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/poster-thumb.jpg"
    source = "../webpack/build/img/poster-thumb.jpg"
    etag = "${md5(file("../webpack/build/img/poster-thumb.jpg"))}"
    cache_control = "max_age=31536000"
    content_type = "image/jpeg"
}

#
# Endorsement Images
#

resource "aws_s3_bucket_object" "endorsement_bcan" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/bcan.png"
    source = "../webpack/build/img/endorsements/bcan.png"
    etag = "${md5(file("../webpack/build/img/endorsements/bcan.png"))}"
    cache_control = "max_age=31536000"
    content_type = "image/png"
}

resource "aws_s3_bucket_object" "endorsement_bsac" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/bsac.jpg"
    source = "../webpack/build/img/endorsements/bsac.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/bsac.jpg"))}"
    cache_control = "max_age=31536000"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_clampoint" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/clampoint.png"
    source = "../webpack/build/img/endorsements/clampoint.png"
    etag = "${md5(file("../webpack/build/img/endorsements/clampoint.png"))}"
    cache_control = "max_age=31536000"
    content_type = "image/png"
}

resource "aws_s3_bucket_object" "endorsement_charlestown" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/charlestown.png"
    source = "../webpack/build/img/endorsements/charlestown.png"
    etag = "${md5(file("../webpack/build/img/endorsements/charlestown.png"))}"
    cache_control = "max_age=31536000"
    content_type = "image/png"
}

resource "aws_s3_bucket_object" "endorsement_ward4" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/ward4.jpg"
    source = "../webpack/build/img/endorsements/ward4.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/ward4.jpg"))}"
    cache_control = "max_age=31536000"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_carol_oldham" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/carol_oldham.jpg"
    source = "../webpack/build/img/endorsements/carol_oldham.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/carol_oldham.jpg"))}"
    cache_control = "max_age=31536000"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_michael_orr" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/michael_orr.jpg"
    source = "../webpack/build/img/endorsements/michael_orr.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/michael_orr.jpg"))}"
    cache_control = "max_age=31536000"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_jenny_sazama" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/jenny_sazama.jpg"
    source = "../webpack/build/img/endorsements/jenny_sazama.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/jenny_sazama.jpg"))}"
    cache_control = "max_age=31536000"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_joel_wool" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/joel_wool.jpg"
    source = "../webpack/build/img/endorsements/joel_wool.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/joel_wool.jpg"))}"
    cache_control = "max_age=31536000"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_kalila_barnett" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/kalila_barnett.jpg"
    source = "../webpack/build/img/endorsements/kalila_barnett.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/kalila_barnett.jpg"))}"
    cache_control = "max_age=31536000"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_matt_omalley" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/matt_omalley.jpg"
    source = "../webpack/build/img/endorsements/matt_omalley.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/matt_omalley.jpg"))}"
    cache_control = "max_age=31536000"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_annissa_essaibi_george" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/essaibi-george.jpg"
    source = "../webpack/build/img/endorsements/essaibi-george.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/essaibi-george.jpg"))}"
    cache_control = "max_age=31536000"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_ayanna_pressley" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/pressley.jpg"
    source = "../webpack/build/img/endorsements/pressley.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/pressley.jpg"))}"
    cache_control = "max_age=31536000"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_andrea_campbell" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/campbell.jpg"
    source = "../webpack/build/img/endorsements/campbell.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/campbell.jpg"))}"
    cache_control = "max_age=31536000"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_josh_zakim" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/zakim.jpg"
    source = "../webpack/build/img/endorsements/zakim.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/zakim.jpg"))}"
    cache_control = "max_age=31536000"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_tito_jackson" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/tito_jackson.jpg"
    source = "../webpack/build/img/endorsements/tito_jackson.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/tito_jackson.jpg"))}"
    cache_control = "max_age=31536000"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_michelle_wu" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/michelle_wu.jpg"
    source = "../webpack/build/img/endorsements/michelle_wu.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/michelle_wu.jpg"))}"
    cache_control = "max_age=31536000"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_rev_mariama_white_hammond" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/rev_mariama_white_hammond.jpg"
    source = "../webpack/build/img/endorsements/rev_mariama_white_hammond.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/rev_mariama_white_hammond.jpg"))}"
    cache_control = "max_age=31536000"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_sierra_mass" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/sierra-mass.jpg"
    source = "../webpack/build/img/endorsements/sierra-mass.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/sierra-mass.jpg"))}"
    cache_control = "max_age=31536000"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_nabb" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/nabb.jpg"
    source = "../webpack/build/img/endorsements/nabb.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/nabb.jpg"))}"
    cache_control = "max_age=31536000"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_boston_globe" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/boston-globe.jpg"
    source = "../webpack/build/img/endorsements/boston-globe.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/boston-globe.jpg"))}"
    cache_control = "max_age=31536000"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_bcec" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/bcec.jpg"
    source = "../webpack/build/img/endorsements/bcec.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/bcec.jpg"))}"
    cache_control = "max_age=31536000"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_wrse" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/wrse.jpg"
    source = "../webpack/build/img/endorsements/wrse.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/wrse.jpg"))}"
    cache_control = "max_age=31536000"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_roslindale" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/roslindale.jpg"
    source = "../webpack/build/img/endorsements/roslindale.jpg"
    etag = "${md5(file("../webpack/build/img/endorsements/roslindale.jpg"))}"
    cache_control = "max_age=31536000"
    content_type = "image/jpeg"
}

resource "aws_s3_bucket_object" "endorsement_jpnc" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/jpnc.png"
    source = "../webpack/build/img/endorsements/jpnc.png"
    etag = "${md5(file("../webpack/build/img/endorsements/jpnc.png"))}"
    cache_control = "max_age=31536000"
    content_type = "image/png"
}

resource "aws_s3_bucket_object" "endorsement_arborway" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "img/endorsements/arborway-coalition.png"
    source = "../webpack/build/img/endorsements/arborway-coalition.png"
    etag = "${md5(file("../webpack/build/img/endorsements/arborway-coalition.png"))}"
    cache_control = "max_age=31536000"
    content_type = "image/png"
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

resource "aws_s3_bucket_object" "west_rox_rosl_bulletin" {
    bucket = "${aws_s3_bucket.site.bucket}"
    key = "pdf/West_Rox_Rosl_June_08_2017.pdf"
    source = "../webpack/build/pdf/West_Rox_Rosl_June_08_2017.pdf"
    etag = "${md5(file("../webpack/build/pdf/West_Rox_Rosl_June_08_2017.pdf"))}"
    cache_control = "max_age=31536000"
    content_type = "application/pdf"
}
