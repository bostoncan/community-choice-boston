'use strict';

// Default values
let config = {
    EVENTBRITE_TOKEN: '',
    EVENTBRITE_PAGE: 'https://www.eventbrite.com/o/boston-climate-action-network-14272789018',
    EVENTBRITE_ORGANIZER: '14272789018',
    GOOGLE_SHEET_ID: 'some-spreadsheet-id',
    GOOGLE_DRIVE_CRED: null,
    POSTS_URL: 'https://bostoncan.wordpress.com/category/cce/feed/'
};

const env = process.env.NODE_ENV || 'local';

let local = {};
try {
    local = require('./' + env);
} catch(e) {
    if (env !== 'local') {
        throw e;
    }
}

// Copy in overrides
Object.keys(local).forEach((k) => {
    config[k] = local[k];
});


module.exports = config;
