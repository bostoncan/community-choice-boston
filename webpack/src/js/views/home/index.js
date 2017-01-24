'use strict';

var Backbone = require('backbone-lodash'),
    $ = require('jquery'),
    CalenderView = require('./components/cal'),
    MapView = require('./components/map');

module.exports = Backbone.View.extend({
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

        // Clicking the button moves you to the form
        $("#sign").click(function() {
            $('html,body').animate({
                scrollTop: $("form").offset().top
            }, 'slow');
        });

        // Sub views
        new CalenderView({
            el: '#next-event'
        });
        new MapView({
            el: '#map'
        });
    }
});
