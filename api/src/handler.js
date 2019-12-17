'use strict';

const Ajv = require('ajv'),
      http = require('http'),
      CalendarHandler = require('./controllers/calendar'),
      PetitionHandler = require('./controllers/petition'),
      PostsHandler = require('./controllers/posts'),
      config = require('./config');

const ajv = new Ajv();

const routes = {
    '/calendar': new CalendarHandler(config),
    '/petition': new PetitionHandler(config),
    '/posts': new PostsHandler(config)
};

function response(code, body) {
    const responseBody = Object.assign(
        {code, message: http.STATUS_CODES[code]},
        body
    );
    return {
        statusCode: code,
        isBase64Encoded: false,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(responseBody)
    }
}

module.exports.handle = async function(req, context) {
    try {
        const handler = routes[req.path];
        if (!handler) return response(404);

        let parsed;
        if (handler.schema) {
            parsed = JSON.parse(req.body);

            if (!Object.keys(parsed).length) {
                return response(400, {detail: 'Empty request body'});
            }

            const valid = ajv.validate(handler.schema, parsed);
            if (!valid) {
                return response(400, {detail: ajv.errorsText()});
            }
        }

        const body = await handler.handle(req, parsed);
        return response(200, body);
    } catch(e) {
        return response(500, {detail: e.message});
    }
};
