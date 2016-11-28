var _ = require('underscore');

function path(uri, params) {
  params = params || {};
  if (_.isEmpty(params)) {
    return uri;
  }
  var reg = new RegExp(Object.keys(params).join('|'), 'gi');
  return uri.replace(reg, function(matched){
    return params[matched.toLowerCase()];
  });
}

module.exports = {
  path: path
};
