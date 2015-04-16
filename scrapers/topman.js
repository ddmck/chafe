var _ = require('lodash');

module.exports = {
  queryStrings: ['#product_size_full option[title$="stock"]:not(.stock_zero)', '#choosesize_1 option[title$="stock"]:not(.stock_zero)'],
  filterFunction: function(result){
    result.sizes = _.map(result.sizes, function(n) {
      return {name: n}
    });
    return result;
  }
}