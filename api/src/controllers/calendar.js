'use strict';

const qs = require('querystring'),
      util = require('../util');

/*
 * Proxy call to the Eventbrite API to return the next event
 */

class CalendarHandler {
    constructor(config) {
        this.page = config.EVENTBRITE_PAGE;
        this.organizer_id = config.EVENTBRITE_ORGANIZER;
        this.host = 'www.eventbriteapi.com';
        this.path = '/v3/events/search/';
        this.token = config.EVENTBRITE_TOKEN;
    }

    handle(req, context) {
        const query = qs.stringify({
            'sort_by': 'date',
            'organizer.id': this.organizer_id,
            'token': this.token
        });

        util.req(this.host, this.path + '?' + query, (err, resp) => {
            if (err) return context.done('ERR_INTERNAL_ERROR');
            let ev = {page: this.page};
            if (!resp.events[0]) {
                return context.done(null, {data: ev});
            }

            ev.summary = resp.events[0].name.text;
            ev.url = resp.events[0].url;
            ev.start = resp.events[0].start.utc;

            let venuePath = '/v3/venues/' + resp.events[0].venue_id +
                            '/?token=' + this.token;
            util.req(this.host, venuePath, (err, resp) => {
                if (err) return context.done('ERR_INTERNAL_ERROR');
                ev.location = resp.address.localized_address_display;
                context.done(null, {data: ev});
            });
        });
    }
}

module.exports = CalendarHandler;
