'use strict';

const https = require('https'),
      qs = require('querystring');

const FIELDS = ['start', 'location', 'summary', 'description'];

/*
 * Proxy call to Google calendar events to return the next event
 */

class CalendarHandler {
    constructor(config) {
        this.calId = config.GOOGLE_CAL_ID;
        this.host = 'www.googleapis.com';
        this.path = '/calendar/v3/calendars/' + this.calId + '/events';
        this.apiKey = config.GOOGLE_API_KEY;
    }

    handle(req, context) {
        const query = qs.stringify({
            orderBy: 'startTime',
            singleEvents: 'True',
            maxResults: '20',
            timeMin: new Date().toISOString(),
            key: this.apiKey
        });

        const params = {
            host: this.host,
            path: this.path + '?' + query,
            headers: {
                'Accept': 'application/json'
            }
        };

        let r = https.request(params, (res) => {
            if (res.statusCode !== 200) {
                return context.done('ERR_INTERNAL_ERROR');
            }
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });

            res.on('end', () => {
                let content = JSON.parse(body);
                let ev = {calId: this.calId};
                if (content.items[0]) {
                    FIELDS.forEach((f) => {
                        ev[f] = content.items[0][f];
                    });
                }
                context.done(null, {data: ev});
            });
        });

        r.on('error', () => context.done('ERR_INTERNAL_ERROR'));
        r.end();
    }
}

module.exports = CalendarHandler;
