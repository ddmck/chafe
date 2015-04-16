var _ = require('lodash');

module.exports = {
  queryStrings: ['.size-swatches-list li:not(.disabled) a'],
  filterFunction: function(result){
    result.sizes = _.map(result.sizes, function(n) {
      return {name: n}
    });
    return result;
  }
}