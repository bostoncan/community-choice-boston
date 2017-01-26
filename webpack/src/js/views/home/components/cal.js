'use strict';

var $ = require('jquery'),
    _ = require('lodash'),
    Backbone = require('backbone-lodash'),
    dateFormat = require('dateformat'),
    eventTemplate = require('raw-loader!../templates/cal/event.html'),
    errorTemplate = require('raw-loader!../templates/cal/error.html');

// Set lodash interpolation
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

module.exports = Backbone.View.extend({
    initialize: function(options) {
        this.template = _.template(eventTemplate);
        this.el = $('#next-event');
        $.ajax({
            url: '/api/v1/calendar',
            success: this.render.bind(this),
            error: this.error.bind(this)
        });
    },

    error: function() {
        this.el.html(errorTemplate);
    },

    render: function(resp) {
        try {
            var now = Date.now(),
                item = resp.data,
                start = new Date(item.start.dateTime);

            var context = {
                isoformat: start.toISOString(),
                day: dateFormat(start, 'dddd'),
                month: dateFormat(start, 'mmmm'),
                date: dateFormat(start, 'd'),
                when: dateFormat(start, 'h:MM tt'),
                where: item.location,
                whereEnc: encodeURI(item.location),
                title: item.summary,
                description: item.description
            };
            this.el.html(this.template(context));
        } catch(e) {
            this.error()
        }
    }
});
