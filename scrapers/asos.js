var _ = require('lodash');

module.exports = {
  queryStrings: ['#ctl00_ContentMainPage_ctlSeparateProduct_drpdwnSize option'],
  filterFunction: function(result){
    result.sizes = _.drop(result.sizes, 1);
    result.sizes = _.reject(result.sizes, function(s){
      console.log(s);
      console.log(s.indexOf("- Not available"));
      return s.indexOf("- Not available") !== -1
    });
    result.sizes = _.map(result.sizes, function(n) {
      return {name: n}
    });
    return result;
  }
}