'use strict';

/*
 * Light-weight HTTPS & JSON request class syntactic sugar
 */

const https = require('https'),
      urlParse = require('url');

class Request {
    constructor(method, url) {
        const parsed = urlParse.parse(url);

        this.params = {
            host: parsed.hostname,
            path: parsed.path,
            method: method,
            headers: {
                'Accept': 'application/json'
            }
        }
        this.body = '';
    }

    set(header, value) {
        this.params.headers[header] = value;
        return this;
    }

    send(body) {
        this.body = JSON.stringify(body);
        return this;
    }

    end(done) {
        if (this.body.length) {
            this.params.headers['Content-Length'] = this.body.length;
            this.params.headers['Content-Type'] = 'application/json';
        }

        const r = https.request(this.params, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);

            res.on('end', () => {
                if (res.statusCode !== 200) {
                    console.log(res.statusCode + ' ' + body);
                    return done(new Error('Bad response code: ' + res.statusCode));
                }
                done(null, JSON.parse(body))
            });
        });

        if (this.body.length) r.write(this.body);
        r.on('error', done);
        r.end();
    }
}

module.exports.get = function(url) {
    return new Request('GET', url);
}

module.exports.post = function(url) {
    return new Request('POST', url);
}

module.exports.put = function(url) {
    return new Request('PUT', url);
}
