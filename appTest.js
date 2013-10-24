'use strict';
/**
 * App for test purposes, does not listen!
 * This one listens: https://github.com/blai/grunt-express
 * 'Cite: note: you DO NOT want to call the listen() from within your server module, express task will take care of that for you'
 * So be it!
 * @type {*}
 */
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/app'));
module.exports = app;