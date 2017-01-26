'use strict';

var Backbone = require('backbone-lodash'),
    $ = require('jquery'),
    CalenderView = require('./components/cal'),
    MapView = require('./components/map'),
    PetitionView = require('./components/petition');

module.exports = Backbone.View.extend({
    events: {
        'click #sign': 'petitionScroll'
    },

    initialize: function() {
        // Set the header image to have a nice parallax mode
        var bg = $('.bg'),
            jumboHeight = $('.jumbotron').outerHeight();

        function parallax(){
            var scrolled = $(window).scrollTop();
            bg.css('height', (jumboHeight - scrolled) + 'px');
        }
        $(window).scroll(parallax);
        $('.jumbotron').css('background', 'transparent');
        parallax();

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
    }
});
