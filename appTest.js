'use strict';

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/app'));
module.exports = app;