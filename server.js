
var express = require('express');
var fs = require('fs');

var app     = express();


app.get('/scrape/:id', function(req, res){

  var url = req.params.id; //"http://www.asos.com/Chi-Chi-London/Chi-Chi-London-Premium-Metallic-Lace-Midi-Prom-Dress-with-Bardot-Neck/Prod/pgeproduct.aspx?iid=4541672";
  var $ = require('jquerygo');
  var nsizes = [];
  $.visit(url, function() {
    $.waitForPage(function() {
      var sizes = $('#ctl00_ContentMainPage_ctlSeparateProduct_drpdwnSize option');
      sizes.each(function(i, size, done){
        size.text(function(name){
          nsizes.push(name);
          console.log(name);
          done();
        })
      }, function(){
        console.log("got sizes");

        res.send(nsizes);
        
        $.close();
      });
    })
  });

});

app.listen('3010');

console.log('Magic happens on port 3010');

exports = module.exports = app;
