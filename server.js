var express = require('express');
var phantom = require('phantom');
var _ = require('lodash');
var app     = express();

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
    phantom.create(function(ph) {
      return ph.createPage(function(page) {
        return page.open(url, function(status) {
          console.log("opened site? ", status);         
     
                page.injectJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function() {
                    //jQuery Loaded.
                    //Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds.
                    setTimeout(function() {
                        return page.evaluate(function() {
     
                            //Get what you want from the page using jQuery. A good way is to populate an object with all the jQuery commands that you need and then return the object.
                            var sArr = [];

                            $('#ctl00_ContentMainPage_ctlSeparateProduct_drpdwnSize option').each(function() {
                                sArr.push($(this).html());
                            });
     
                            return {
                                sizes: sArr
                            };
                        }, function(result) {
                            result.sizes = _.drop(result.sizes, 1);
                            result.sizes = _.reject(result.sizes, function(s){
                              console.log(s);
                              console.log(s.indexOf("- Not available"));
                              return s.indexOf("- Not available") !== -1
                            });
                            result.sizes = _.map(result.sizes, function(n) {
                              return {name: n}
                            });
                            res.send(result);
                            ph.exit();
                        });
                    }, 100);
     
                });
            });
        });
    });
  } else if (url.indexOf("www.houseoffraser.co.uk") !== -1) {
    console.log("Scraping a House of Fraser Product")
    phantom.create(function(ph) {
      return ph.createPage(function(page) {
        return page.open(url, function(status) {
          console.log("opened site? ", status);         
     
                page.injectJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function() {
                    //jQuery Loaded.
                    //Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds.
                    setTimeout(function() {
                        return page.evaluate(function() {
     
                            //Get what you want from the page using jQuery. A good way is to populate an object with all the jQuery commands that you need and then return the object.
                            var sArr = [];

                            $('.size-swatches-list li:not(.disabled) a').each(function() {
                                sArr.push($(this).html());
                            });
     
                            return {
                                sizes: sArr
                            };
                        }, function(result) {
                            result.sizes = _.map(result.sizes, function(n) {
                              return {name: n}
                            });
                            res.send(result);
                            ph.exit();
                        });
                    }, 100);
     
                });
            });
        });
    });
  } else if (url.indexOf("www.johnlewis.com") !== -1) {
    console.log("Scraping a John Lewis Product");
    phantom.create(function(ph) {
      return ph.createPage(function(page) {
        return page.open(url, function(status) {
          console.log("opened site? ", status);         
     
                page.injectJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function() {
                    //jQuery Loaded.
                    //Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds.
                    setTimeout(function() {
                        return page.evaluate(function() {
     
                            //Get what you want from the page using jQuery. A good way is to populate an object with all the jQuery commands that you need and then return the object.
                            var sArr = [];

                            $('#prod-product-size ul.selection-grid li:not(.out-of-stock) a span').each(function() {
                                sArr.push($(this).html());
                            });
     
                            return {
                                sizes: sArr
                            };
                        }, function(result) {
                            result.sizes = _.map(result.sizes, function(n) {
                              return {name: n}
                            });
                            res.send(result);
                            ph.exit();
                        });
                    }, 100);
     
                });
            });
        });
    });
  } else {
    res.send("cant scrape this currently");
  }

});

app.listen(process.env.PORT || 5000);

console.log('Magic happens on port 5000');

exports = module.exports = app;
