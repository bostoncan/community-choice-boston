'use strict';

/*
 * Express server for development purposes - not used in production
 */

const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
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
app.use('/api_v1/*', async (req, res) => {
    const lreq = {
        body: JSON.stringify(req.body),
        path: '/' + req.baseUrl.split('/').slice(2).join('/'),
        method: req.method
    };

    const resp = await handler.handle(lreq);
    res.status(resp.statusCode);
    res.set(resp.headers);
    res.send(resp.body);
});

app.use(express.static('../build'));

if (require.main === module) {
    app.listen(3000, () => console.log('Listening on port 3000'));
}
