'use strict';

var $ = require('jquery'),
    Backbone = require('backbone-lodash'),
    errorTmpl = require('raw-loader!../templates/petition/error.html'),
    petitionTmpl = require('raw-loader!../templates/petition/form.html'),
    pendingTmpl = require('raw-loader!../templates/petition/pending.html'),
    completeTmpl = require('raw-loader!../templates/petition/complete.html');

module.exports = Backbone.View.extend({
    events: {
        'click #submit-petition': 'submitPetition',
        'click #enable-petition': 'enablePetition'
    },

    initialize: function(options) {
        this.el = $(options.el);
        if (localStorage.getItem('petition')) {
            this.el.html(completeTmpl);
        } else {
            this.el.html(petitionTmpl);
        }
    },

    submitPetition: function(e) {
        e.preventDefault();
        var self = this,
            form = $('#petition').serializeArray(),
            data = {};

        form.forEach(function(d) {
            if (d.value !== '') {
                data[d.name] = d.value;
            }
        });

        $.post({
            url: '/api_v1/petition',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function() {
                localStorage.setItem('petition', '1');
                self.succeed();
            },
            error: self.formError.bind(self)
        });
        this.animate(pendingTmpl);
    },

    animate: function(content) {
        $('html,body').animate({
            scrollTop: $("#petition").offset().top
        }, 'slow');
        this.el.hide();
        this.el.html(content);
        this.el.show();
    },

    succeed: function() {
        this.animate(completeTmpl);
    },

    enablePetition: function(e) {
        e.preventDefault();
        localStorage.removeItem('petition');
        this.animate(petitionTmpl);
    },

    formError: function() {
        this.animate(errorTmpl);
    }
});
