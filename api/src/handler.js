'use strict';

const CalendarHandler = require('./controllers/calendar'),
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

    /*
    const errs = validator.validate(req, handler.schema);
    if (errs) {
        return context.done('ERR_BAD_REQUEST: ' + errs[0].text);
    }
    */

    handler.handle(req, context);
};
