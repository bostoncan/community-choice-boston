'use strict';

const PetitionModel = require('./schema/petition'),
      request = require('simpleragent');

class PetitionHandler {

    constructor(config) {
        this.schema = PetitionModel;
        this.token = config.ACTION_NETWORK_TOKEN;
    }

    async handle(req, body) {
        const lines = [
            body.address1,
            body.address2
        ].filter(l => Boolean(l));

        const payload = {
            person: {
                family_name: body.name_last,
                given_name: body.name_first,
                postal_addresses: [
                    {
                        primary: true,
                        address_lines: lines.length ? lines : undefined,
                        postal_code: body.zip,
                        locality: body.city
                    }
                ],
                email_addresses: [
                    {
                        primary: true,
                        address: body.email,
                        status: 'subscribed'
                    }
                ],
                custom_fields: {
                    Phone: body.phone
                }
            }
        };

        await request
            .post('https://actionnetwork.org/api/v2/people/')
            .set('OSDI-API-Token', this.token)
            .send(payload);
    }
}

module.exports = PetitionHandler;
