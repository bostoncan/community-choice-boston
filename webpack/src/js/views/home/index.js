'use strict';

var Backbone = require('backbone-lodash'),
    $ = require('jquery'),
    CalenderView = require('./components/cal'),
    MapView = require('./components/map');

module.exports = Backbone.View.extend({
    events: {
        'click #sign': 'petitionScroll',
        'click #submit-petition': 'submitPetition'
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
    },

    petitionScroll: function() {
        console.log('hi');
        $('html,body').animate({
            scrollTop: $("form").offset().top
        }, 'slow');
    },

    submitPetition: function(e) {
        e.preventDefault();
        var form = $('#petition').serializeArray();
        var data = {};
        form.forEach(function(d) {
            if (d.value !== '') {
                data[d.name] = d.value;
            }
        });

        $.post({
            uri: '/api/v1/petition',
            data: data,
            success: function() {

            },
            error: function() {

            }
        });
    },

    closeOutForm: function() {

    },

    formError: function() {

    }
});
