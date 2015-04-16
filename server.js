var express = require('express');
var phantom = require('phantom');
var _ = require('lodash');
var app     = express();

var scrapers = require('./scrapers');
var asos = require('./scrapers/asos');
var hof = require('./scrapers/hof');
var johnLewis = require('./scrapers/john_lewis');
var topshop = require('./scrapers/topshop');
var topman = require('./scrapers/topman');
var site;

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization,If-Modified-Since');
  next();
});

app.get('/favicon.ico', function(req, res){
  console.log("No favicon to find here!");
})

app.get('/', function(req, res){
  res.send("Place a product url after the url to scrape for sizes!");
})

app.get('*', function(req, res){
  var url = req.originalUrl.substring(1);
  console.log("Scraping: " + url);
  if (url.indexOf("www.asos.com") !== -1) {
    console.log("scraping an asos product"); 
    site = asos;
  } else if (url.indexOf("www.houseoffraser.co.uk") !== -1) {
    console.log("Scraping a House of Fraser Product")
    site = hof;
  } else if (url.indexOf("www.johnlewis.com") !== -1) {
    console.log("Scraping a John Lewis Product");
    site = johnLewis;
  } else if (url.indexOf("www.topshop.com") !== -1) {
    console.log("Scraping a Topshop Product");
    site = topshop;
  } else if (url.indexOf("www.topman.com") !== -1) {
    console.log("Scraping a Topman Product");
    site = topman;
  } 

  if (site) {
    scrapers(res, url, site);
  } else {
    res.send("cant scrape this currently");
  }

});

app.listen(process.env.PORT || 5000);

console.log('Magic happens on port 5000');

exports = module.exports = app;
