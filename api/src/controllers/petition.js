'use strict';

const PetitionModel = require('./schema/petition'),
      GoogleSpreadsheet = require("google-spreadsheet");

class PetitionHandler {

    constructor(config) {
        this.schema = PetitionModel;
        this.doc = new GoogleSpreadsheet(config.GOOGLE_SHEET_ID);

        try {
            this.creds = require('./credentials/drive.json')
        } catch(e) {
            console.warn('No config file found');
        }
    }

    handle(req, context) {
        // Tag the received dttm
        req.body.created = new Date().toISOString();

        // Set credentials and add the row
        this.doc.useServiceAccountAuth(this.creds, (err) => {
            if (err) return this.errorHandler(err, context);

            this.doc.getInfo((err, info) => {
                if (err) return this.errorHandler(err, context);
                let sheet = info.worksheets[0];
                sheet.addRow(req.body, (err) => {
                    if (err) return this.errorHandler(err, context);
                    context.done();
                });
            });
        });
    }

    errorHandler(err, context) {
        console.log(err);
        return context.done('ERR_INTERNAL_ERROR');
    }
}

module.exports = PetitionHandler;
