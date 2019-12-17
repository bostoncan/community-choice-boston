'use strict';

const request = require('simpleragent'),
      events = require('./data/events');

const client = new request.Client('https://www.eventbriteapi.com/v3');

/*
 * Proxy call to the Eventbrite API to return the next event
 */

class CalendarHandler {
    constructor(config) {
        this.organizer_id = config.EVENTBRITE_ORGANIZER;
        this.token = config.EVENTBRITE_TOKEN;
    }

    async handle(req) {
        // Check a static list of upcoming events to override the call to EB
        const now = new Date();
        const upcoming = events.filter((e) => new Date(e.start) > now);
        if (upcoming.length) {
            return {data: upcoming[0]};
        }

        const queryParams = {
            'time_filter': 'current_future',
            'token': this.token
        };

        const resp = await client
            .get(`/organizations/${this.organizer_id}/events/`)
            .query(queryParams);

        const found = resp.body.events[0];
        if (!found) {
            return {data: {}};
        }

        const ev = {
            summary: found.name.text,
            url: found.url,
            start: found.start.utc
        };

        const venueUrl = `/venues/${found.venue_id}/`;
        const venueResp = await client.get(venueUrl).query({token: this.token});
        ev.location = venueResp.body.address.localized_address_display;

        return {data: ev};
    }
}

module.exports = CalendarHandler;
