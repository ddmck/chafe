var _ = require('lodash');

module.exports = {
  queryStrings: ['#prod-product-size ul.selection-grid li:not(.out-of-stock) a span'],
  filterFunction: function(result){
    result.sizes = _.map(result.sizes, function(n) {
      return {name: n}
    });
    return result;
  }
}