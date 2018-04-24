'use strict';

const handler = require('../src/handler'),
      _ = require('lodash'),
      expect = require('chai').expect;

describe('Post petition event', () => {
    const baseBody = {
        name_first: 'Linus',
        name_last: 'Henry',
        email: 'linus@example.com',
        zip: '02122',
        'contact-pref': 'none'
    };

    /*
    it('should add a row', (done) => {
        this.timeout(10000);

        const req = {route: 'petition', body: baseBody};
        handler.handle(req, {done: (err) => {
            expect(err).not.to.exist;
            done();
        }});
    });
    */

    it('should reject empty requests', (done) => {
        const req = {route: 'petition', body: {}};
        handler.handle(req, {done: (err) => {
            expect(err).to.equal('ERR_BAD_REQUEST: Empty request');
            done();
        }});
    });

    it('should require zip codes', (done) => {
        const body = _.cloneDeep(baseBody);
        delete body.zip;

        const req = {route: 'petition', body};
        handler.handle(req, {done: (err) => {
            expect(err).to.equal('ERR_BAD_REQUEST: ' +
                                 'Additional properties not allowed');
            done();
        }});
    });

    it('should require contact-preferences', (done) => {
        const body = _.cloneDeep(baseBody);
        delete body['contact-pref'];

        const req = {route: 'petition', body};
        handler.handle(req, {done: (err) => {
            expect(err).to.equal('ERR_BAD_REQUEST: ' +
                                 'Additional properties not allowed');
            done();
        }});
    });

    it('should reject malformed emails', (done) => {
        const body = _.cloneDeep(baseBody);
        body.email = 'foobarbazzhands';

        const req = {route: 'petition', body};
        handler.handle(req, {done: (err) => {
            expect(err).to.equal('ERR_BAD_REQUEST: ' +
                                 'Additional properties not allowed');
            done();
        }});
    });
});
