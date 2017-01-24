'use strict';

const PetitionModel = require('./schema/petition'),
      GoogleSpreadsheet = require("google-sheets-node-api");

class PetitionHandler {

    constructor(config) {
        this.schema = PetitionModel;

        this.sheet = new GoogleSpreadsheet(config.GOOGLE_SHEET_ID);
        try {
            this.creds = require('./credentials/drive.json')
        } catch(e) {
            console.warn('No config file found');
        }
    }

    handle(req, context) {
        this.sheet.useServiceAccountAuth(this.creds)
            .then(this.sheet.getInfo.bind(this.sheet))
            .then((sheet_info) => {
                let worksheet = sheetInfo.worksheets[0];
                worksheet.addRow(req.payload)
                    .then(() => {
                        return context.done();
                    })
                    .catch((e) => {
                        console.log(e);
                        return context.done('ERR_INTERNAL');
                    });
            })
            .catch((e) => {
                console.log(e);
                return context.done('ERR_INTERNAL');
            });
    }
}

module.exports = PetitionHandler;
