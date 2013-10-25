'use strict';

var app = require('./app.js');

//Anpassung für Heroku
var DEFAULT_PORT = process.env.PORT || 8000;

//start the http server

app.listen(DEFAULT_PORT, function () {
  console.log('Express server listening on port %d', DEFAULT_PORT);
});