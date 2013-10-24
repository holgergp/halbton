'use strict';
/**
 * App for 'production'-purposes, listens!
 * @type {*}
 */

var express = require('express');
var app = express();

//Anpassung für Heroku
var DEFAULT_PORT = process.env.PORT || 8000;
app.use(express.static(__dirname + '/app'));
//start the http server

app.listen(DEFAULT_PORT, function () {
  console.log('Express server listening on port %d', DEFAULT_PORT);
});