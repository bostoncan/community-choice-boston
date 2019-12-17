'use strict';

// Default values
const config = {
    EVENTBRITE_TOKEN: 'not-a-token',
    EVENTBRITE_PAGE: 'https://www.eventbrite.com/o/boston-climate-action-network-14272789018',
    EVENTBRITE_ORGANIZER: '',
    ACTION_NETWORK_TOKEN: 'not-a-token',
    POSTS_URL: 'https://bostoncan.wordpress.com/category/cce/feed/'
};

const env = process.env.NODE_ENV || 'local';

// Copy in overrides
Object.keys(config).forEach((k) => {
    config[k] = process.env[k] || config[k];
});

if (process.env.NODE_ENV === 'test') {
    config.EVENTBRITE_TOKEN = 'not-a-token';
    config.ACTION_NETWORK_TOKEN = 'not-a-token';
}

module.exports = config;
