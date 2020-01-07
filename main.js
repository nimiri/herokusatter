'use strict';

var rp = require('request-promise');
require('dotenv').config();

// .envが読み込めているか確認
if (typeof process.env['PIXELA_XUSERTOKEN'] == 'undefined') {
    console.error('Error: "PIXELA_XUSERTOKEN" is not set.');
    console.error('Please consider adding a .env file with PIXELA_XUSERTOKEN.');
    process.exit(1);
}

var options = {
    uri: 'https://pixe.la/v1/users/nimiri/graphs/kusa-graph/20200107',
    timeout: 30 * 1000,
    headers: {
        'X-USER-TOKEN': process.env['PIXELA_XUSERTOKEN']
    },
    json: true // Automatically parses the JSON string in the response
};

rp(options)
    .then(function (repos) {
        console.log(repos.quantity)
    })
    .catch(function (err) {
        // API call failed...
    });