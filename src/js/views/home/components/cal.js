'use strict';

var $ = require('jquery'),
    _ = require('lodash'),
    Backbone = require('backbone-lodash'),
    moment = require('moment'),
    eventTemplate = require('raw-loader!../templates/cal-event.html'),
    errorTemplate = require('raw-loader!../templates/cal-error.html');

// Set lodash interpolation
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

module.exports = Backbone.View.extend({
    initialize: function(options) {
        this.template = _.template(eventTemplate);
        var url = 'https://www.googleapis.com/calendar/v3/calendars/' +
                  options.id + '/events?' +
                  'orderBy=startTime&singleEvents=True&maxResults=1&key=' +
                  options.key;

        this.el = $('#next-event');
        $.ajax({
            url: url,
            success: this.render.bind(this),
            error: this.error.bind(this)
        });
    },

    error: function() {
        this.el.html(errorTemplate);
    },

    render: function(resp) {
        try {
            var start = moment(new Date(resp.items[0].start.dateTime));
            var context = {
                isoformat: start.toISOString(),
                day: start.format('dddd'),
                month: start.format('MMMM'),
                date: start.format('D'),
                when: start.format('h:mm a'),
                where: resp.items[0].location,
                whereEnc: encodeURI(resp.items[0].location),
                title: resp.items[0].summary,
                description: resp.items[0].description
            };
            this.el.html(this.template(context));
        } catch(e) {
            this.error()
        }
    }
});
