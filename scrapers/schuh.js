var _ = require('lodash');

module.exports = {
  queryStrings: ["#sizes option.sizeAvailable"],
  filterFunction: function(result){
    result.sizes = _.map(result.sizes, function(n) {
      return {name: n}
    });
    return result;
  }
}