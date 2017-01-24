'use strict';

require('../css/jumbotron-narrow.css');
require('../css/style.css');
require('../css/cal.css');

var Backbone = require('backbone-lodash'),
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
        new HomeView();
    }
});

// Route from location and kick off view
new Router();
Backbone.history.start({pushState: true});
