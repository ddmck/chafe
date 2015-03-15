var express = require('express');
var fs = require('fs');
var querystring = require("querystring");
var app  = express();

app.get('*', function(req, res){
  console.log(req.originalUrl.substring(1));
  console.log(querystring.escape(req.originalUrl.substring(1)));
});

app.listen('3020');

console.log('Magic happens on port 3020');

exports = module.exports = app;
