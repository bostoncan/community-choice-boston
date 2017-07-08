'use strict';

var $ = require('jquery'),
    _ = require('lodash'),
    Backbone = require('backbone-lodash'),
    dateFormat = require('dateformat'),
    postTemplate = require('raw-loader!../templates/posts/post.html'),
    outerTemplate = require('raw-loader!../templates/posts/outer.html'),
    errorTemplate = require('raw-loader!../templates/posts/error.html');

// Set lodash interpolation
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

module.exports = Backbone.View.extend({
    initialize: function() {
        this.template = _.template(postTemplate);
        this.outerTemplate = _.template(outerTemplate);
        this.el = $('#posts');
        $.ajax({
            url: '/api_v1/posts',
            success: this.render.bind(this),
            error: this.error.bind(this)
        });
    },

    error: function() {
        this.el.html(errorTemplate);
    },

    render: function(resp) {
        try {
            var self = this;
            var content = resp.data.slice(0,3).map(function(post) {
                var context = {
                    title: post.title,
                    link: post.link,
                    when: dateFormat(new Date(post.pubdate), 'mmmm dS, yyyy')
                };
                return self.template(context);
            }).join('');
            content = this.outerTemplate({content: content});
            this.el.html(content);
        } catch(e) {
            console.log(e);
            this.error()
        }
    }
});
