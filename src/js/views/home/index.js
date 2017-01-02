'use strict';

var Backbone = require('backbone-lodash'),
    $ = require('jquery'),
    CalenderView = require('./components/cal'),
    MapView = require('./components/map');

module.exports = Backbone.View.extend({
    initialize(options) {
        $("#sign").click(function() {
            $('html,body').animate({
                scrollTop: $("form").offset().top
            }, 'slow');
        });

        new CalenderView({
            el: '#next-event',
            id: options.config.CAL_ID,
            key: options.config.CAL_KEY
        });
        new MapView({
            el: '#map'
        });
    }
});
