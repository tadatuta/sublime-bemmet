'use strict';
var stdin = require('get-stdin'),
    bemmet = require('bemmet');

stdin(function (data) {
    try {
        process.stdout.write(bemmet.stringify(data));
    } catch(err) {
        console.error(err);
    }
});
