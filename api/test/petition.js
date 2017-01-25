'use strict';

const handler = require('../src/handler'),
      _ = require('lodash'),
      expect = require('chai').expect;

describe('Post petition event', () => {
    const baseBody = {
        name_first: 'Linus',
        name_last: 'Henry',
        email: 'linus@example.com',
        zip: '02122'
    };

    it('should add a row', function(done) {
        this.timeout(10000);
        let req = {route: 'petition', body: baseBody};
        handler.handle(req, {done: (err) => {
            expect(err).not.to.exist;
            done();
        }});
    });

    it('should reject empty requests', (done) => {
        let req = {route: 'petition', body: {}};
        handler.handle(req, {done: (err) => {
            expect(err).to.equal('ERR_BAD_REQUEST: Empty request');
            done();
        }});
    });

    it('should reject malformed emails', (done) => {
        let body = _.cloneDeep(baseBody);
        body.email = 'foobarbazzhands';

        let req = {route: 'petition', body: body};
        handler.handle(req, {done: (err) => {
            expect(err).to.equal('ERR_BAD_REQUEST: ' +
                                 'Additional properties not allowed');
            done();
        }});
    });

});
