'use strict';

const tv4 = require('tv4'),
      CalendarHandler = require('./controllers/calendar'),
      PetitionHandler = require('./controllers/petition'),
      config = require('./config');

const routes = {
    calendar: new CalendarHandler(config),
    petition: new PetitionHandler(config)
};

module.exports.handle = function(req, context) {
    const handler = routes[req.route];
    if (!handler) {
        return context.done('ERR_INTERNAL');
    }

    if (handler.schema) {
        if (!Object.keys(req.body).length) {
            return context.done('ERR_BAD_REQUEST: Empty request');
        }

        const v = tv4.validateResult(req.body, handler.schema);
        if (!v.valid) {
            return context.done('ERR_BAD_REQUEST: ' + v.error.message);
        }
    }

    handler.handle(req, context);
};
