'use strict';

const qs = require('querystring'),
      http = require('../http');

/*
 * Proxy call to the Eventbrite API to return the next event
 */

class CalendarHandler {
    constructor(config) {
        this.organizer_id = config.EVENTBRITE_ORGANIZER;
        this.baseUrl = 'https://www.eventbriteapi.com';
        this.eventPath = '/v3/events/search/';
        this.token = config.EVENTBRITE_TOKEN;
    }

    handle(req, context) {
        const query = qs.stringify({
            'sort_by': 'date',
            'organizer.id': this.organizer_id,
            'token': this.token
        });

        const url = `${this.baseUrl}${this.eventPath}?${query}`;

        http.get(url).end((err, resp) => {
            if (err) return context.done('ERR_INTERNAL_ERROR');

            const ev = {};
            if (!resp.events[0]) {
                return context.done(null, {data: ev});
            }

            ev.summary = resp.events[0].name.text;
            ev.url = resp.events[0].url;
            ev.start = resp.events[0].start.utc;

            const venueUrl = `${this.baseUrl}/v3/venues/${resp.events[0].venue_id}` +
                             `/?token=${this.token}`;

            http.get(venueUrl).end((err, resp) => {
                if (err) return context.done('ERR_INTERNAL_ERROR');
                ev.location = resp.address.localized_address_display;
                context.done(null, {data: ev});
            });
        });
    }
}

module.exports = CalendarHandler;
