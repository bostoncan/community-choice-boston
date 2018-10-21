'use strict';

const PetitionModel = require('./schema/petition'),
      crypto = require('crypto'),
      request = require('simpleragent'),
      GoogleSpreadsheet = require('google-spreadsheet');

class PetitionHandler {

    constructor(config) {
        this.schema = PetitionModel;

        // Google Drive
        this.gd_doc = new GoogleSpreadsheet(config.GOOGLE_SHEET_ID);
        this.gd_creds = config.GOOGLE_DRIVE_CRED;

        // Mailchimp settings
        this.mc_subdomain = config.MAILCHIMP_API_KEY.split('-')[1];
        this.mc_auth = new Buffer('user:' + config.MAILCHIMP_API_KEY).toString('base64');
        this.mc_list_all = config.MAILCHIMP_LIST_ALL;
        this.mc_list_cce = config.MAILCHIMP_LIST_CCE;
    }

    /*
     * Add the petition to Google Drive, then Mailchimp if subscribed
     */
    handle(req, context) {
        // Tag the received dttm
        req.body.created = new Date().toISOString();

        // Set credentials and add the row
        this.gd_doc.useServiceAccountAuth(this.gd_creds, (err) => {
            if (err) return this.errorHandler(err, context);

            this.gd_doc.getInfo((err, info) => {
                if (err) return this.errorHandler(err, context);
                const sheet = info.worksheets[0];
                sheet.addRow(req.body, (err) => {
                    if (err) return this.errorHandler(err, context);
                    this.postToMailChimp(req.body, context);
                });
            });
        });
    }

    /*
     * Post subscriber to email list
     */
    postToMailChimp(body, context) {
        // Don't add user to list if prefers no contact.
        if (body['contact-pref'] === 'none') return context.done();

        // Add to list depending on contact preference choice
        let listId = this.mc_list_all;
        if (body['contact-pref'] === 'cce-only') {
            listId = this.mc_list_cce;
        }

        const subscriber = crypto.createHash('md5')
                                 .update(body.email)
                                 .digest("hex");
        const url = `https://${this.mc_subdomain}.api.mailchimp.com` +
                    `/3.0/lists/${listId}/members/${subscriber}`;

        let street = body.address1;
        if (body.address1 && body.address2) {
            street += ', ' + body.address2;
        }

        const payload = {
            email_address: body.email,
            status: 'subscribed',
            merge_fields: {
                FNAME: body.name_first,
                LNAME: body.name_last,
                ZIP: body.zip,
                PHONE_HOME: body.phone,
                STREET: street,
                CITY: body.city
            }
        };

        request.put(url)
            .set('Authorization', 'Basic ' + this.mc_auth)
            .send(payload)
            .end((err) => {
                if (err) return this.errorHandler(err, context);
                context.done();
            });
    }

    errorHandler(err, context) {
        console.log(err);
        return context.done('ERR_INTERNAL_ERROR');
    }
}

module.exports = PetitionHandler;
