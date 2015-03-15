var express = require('express');
var fs = require('fs');
var phantom = require('phantom');
var app     = express();


app.get('/scrape/:id', function(req, res){

  var url = req.params.id;
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
                              s: sArr
                          };
                      }, function(result) {
                          res.send(result);
                          ph.exit();
                      });
                  }, 5000);
   
              });
      });
      });
  });
})

app.listen('3010');

console.log('Magic happens on port 3010');

exports = module.exports = app;
