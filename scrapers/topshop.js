var _ = require('lodash');

module.exports = {
  queryStrings: ['ul.product_size_grid li a'],
  filterFunction: function(result){
    result.sizes = _.map(result.sizes, function(n) {
      return {name: n}
    });
    return result;
  }
}