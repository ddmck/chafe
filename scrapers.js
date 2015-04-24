var phantom = require('phantom');

module.exports = function(res, url, site){
  phantom.create(function(ph) {
    return ph.createPage(function(page) {
      return page.open(url, function(status) {
        console.log("opened site? ", status);         
   
          page.injectJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function() {
              //jQuery Loaded.
              //Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds.
            setTimeout(function() {
              return page.evaluate(function(selector) {

                //Get what you want from the page using jQuery. A good way is to populate an object with all the jQuery commands that you need and then return the object.
                var sArr = [];
                if ($(selector[0]).length) {
                  $(selector[0]).each(function() {
                    sArr.push($(this).html());
                  });
                } else if (selector[1]) {
                  $(selector[1]).each(function() {
                    sArr.push($(this).html());
                  });
                }

                return {
                  sizes: sArr
                };
              }, function(result) {
                result = site.filterFunction(result);
                res.send(result);
                ph.exit();
              }, site.queryStrings);
            }, 100);

          });
        });
      });
  });
}