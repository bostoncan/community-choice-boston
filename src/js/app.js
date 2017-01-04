'use strict';

var Backbone = require('backbone-lodash'),
    config = require('./config'),
    HomeView = require('./views/home');

var Router = Backbone.Router.extend({
    routes: {
        'faq/': 'subpage',
        'endorsements/': 'subpage',
        '': 'home'
    },

    subpage: function() {
    },

    home: function() {
        new HomeView({config: config});
    }
});

// Route from location and kick off view
new Router();
Backbone.history.start({pushState: true});
