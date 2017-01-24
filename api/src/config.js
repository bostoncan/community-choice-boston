'use strict';

// Default values
let config = {
    GOOGLE_API_KEY: 'not-a-key',
    GOOGLE_CAL_ID: 'not-an-id',
    GOOGLE_SHEET_ID: 'some-spreadsheet-id'
};

// Override with environment variables
Object.keys(config).forEach((key) => {
    if (process.env[key]) {
        config[key] = process.env[key];
    }
});

console.log

module.exports = config;
