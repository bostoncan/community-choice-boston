'use strict';

var Backbone = require('backbone-lodash'),
    $ = require('jquery'),
    CalenderView = require('./components/cal'),
    MapView = require('./components/map'),
    PetitionView = require('./components/petition');

module.exports = Backbone.View.extend({
    events: {
        'click #sign': 'petitionScroll',
        'click #share-fb': 'shareFB'
    },

    initialize: function() {
        // Sub views
        new CalenderView({
            el: '#next-event'
        });
        new MapView({
            el: '#map'
        });
        new PetitionView({
            el: '#petition'
        });
    },

    petitionScroll: function() {
        $('html,body').animate({
            scrollTop: $("#petition").offset().top
        }, 'slow');
    },

    shareFB: function() {
        window.open("https://www.facebook.com/sharer/sharer.php?" +
                    "u=https://www.communitychoiceboston.org/",
                    "pop", "width=600, height=400, scrollbars=no");
    }
});
