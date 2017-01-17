'use strict';

var $ = require('jquery'),
    _ = require('lodash'),
    Backbone = require('backbone-lodash'),
    dateFormat = require('dateformat'),
    eventTemplate = require('raw-loader!../templates/cal-event.html'),
    errorTemplate = require('raw-loader!../templates/cal-error.html');

// Set lodash interpolation
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

module.exports = Backbone.View.extend({
    initialize: function(options) {
        this.template = _.template(eventTemplate);
        var url = 'https://www.googleapis.com/calendar/v3/calendars/' +
                  options.id + '/events?' +
                  'orderBy=startTime&singleEvents=True&maxResults=20&key=' +
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
            var now = Date.now();
            var items = resp.items.filter(function(item) {
                if (!item.start || !item.start.dateTime) {
                    return false;
                }
                return new Date(item.start.dateTime).valueOf() > now;
            });
            var start = new Date(items[0].start.dateTime);
            var context = {
                isoformat: start.toISOString(),
                day: dateFormat(start, 'dddd'),
                month: dateFormat(start, 'mmmm'),
                date: dateFormat(start, 'd'),
                when: dateFormat(start, 'h:MM tt'),
                where: items[0].location,
                whereEnc: encodeURI(items[0].location),
                title: items[0].summary,
                description: items[0].description
            };
            this.el.html(this.template(context));
        } catch(e) {
            this.error()
        }
    }
});
