'use strict';

const handler = require('../src/handler'),
      expect = require('chai').expect;

const baseBody = {
    name_first: 'Linus',
    name_last: 'Henry',
    email: 'linus@example.com',
    zip: '02122',
    'contact-pref': 'none'
};

function cloneBody() {
    return JSON.parse(JSON.stringify(baseBody));
}

describe('Post petition event', () => {
    // TODO: Nock interceptors and test successful case

    it('should reject empty requests', async () => {
        const req = {path: '/api_v1/petition', body: '{}'};
        const resp = await handler.handle(req);
        expect(resp.statusCode).to.equal(400);
    });

    it('should require zip codes', async () => {
        const body = cloneBody();
        delete body.zip;

        const req = {path: '/api_v1/petition', body: JSON.stringify(body)};
        const resp = await handler.handle(req);
        expect(resp.statusCode).to.equal(400);
    });

    it('should reject malformed emails', async () => {
        const body = cloneBody();
        body.email = 'foobarbazzhands';

        const req = {path: '/api_v1/petition', body: JSON.stringify(body)};
        const resp = await handler.handle(req);
        expect(resp.statusCode).to.equal(400);
    });
});
