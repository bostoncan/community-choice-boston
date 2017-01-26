'use strict';

/*
 * Express server for development purposes - not used in production
 */

const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      _ = require('lodash'),
      app = express();

const handler = require('./handler');

const responseHash = {
    ERR_BAD_REQUEST: 400,
    ERR_INTERNAL_ERROR: 500
};

// Basic middleware
app.use('*', bodyParser.json());
app.use('*', morgan('dev'));

// Primary API controller - does the work that API Gateway does
app.use('/api/v1/*', (req, res) => {
    let lreq = {
        params: _.merge(req.query, req.params),
        payload: req.body,
        route: req.baseUrl.split('/')[3]
    };

    handler.handle(lreq, {
        done: (err, result) => {
            let code, response;

            if (err) {
                let prefix = err.split(':')[0],
                    detail = err.split(':')[1];
                code = responseHash[prefix];
                response = {code: code, message: prefix};
                if (detail) {
                    response.detail = detail.trim();
                }
            } else {
                code = 200;
                response = {code: code, message: 'OK', data: result};
            }
            res.status(code).json(response);
        }
    });
});

app.use(express.static('../build'));

app.listen(3000);
