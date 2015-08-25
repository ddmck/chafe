var _ = require('lodash');

module.exports = {
  // List of strings to query for sizes with jQuery
  queryStrings: ['#ctl00_ContentMainPage_ctlSeparateProduct_drpdwnSize option'],
  // function to filter the results will vary between sites
  filterFunction: function(result){
    // drop the first option since its the placeholder
    result.sizes = _.drop(result.sizes, 1);
    // reject sizes that are not available
    result.sizes = _.reject(result.sizes, function(s){
      return s.indexOf("- Not available") !== -1
    });
    // map the sizes to somthing a bit more readable
    result.sizes = _.map(result.sizes, function(n) {
      return {name: n}
    });
    // return the tidy sizes.
    return result;
  }
}
