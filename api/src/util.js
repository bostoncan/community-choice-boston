'use strict';

const https = require('https');

module.exports.req = function(host, path, cb) {
    const params = {
        host: host,
        path: path,
        headers: {
            'Accept': 'application/json'
        }
    };

    let r = https.request(params, (res) => {
        let body = '';
        res.on('data', (chunk) => {
            body += chunk;
        });

        res.on('end', () => {
            if (res.statusCode !== 200) {
                console.log(res.statusCode + ' ' + body);
                return cb('ERR_INTERNAL_ERROR');
            }
            cb(null, JSON.parse(body))
        });
    });

    r.on('error', () => cb('ERR_INTERNAL_ERROR'));
    r.end();
}
