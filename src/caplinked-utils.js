var _ = require('underscore');
var CL_CONSTANTS = require('./caplinked-constants');

function path (uri, params) {
  params = params || {};
  if (_.isEmpty(params)) {
    return uri;
  }
  var reg = new RegExp(Object.keys(params).join('|'), 'gi');
  return uri.replace(reg, function(matched){
    return params[matched.toLowerCase()];
  });
}

function responseErrorBuilder (err, res) {
  if (res && res.body && _.isObject(res.body) && res.body.error) {
    // pass through error obj from API
    return res.body;
  } else {
    // build custom error
    return {
      error: {
        code: err.status || CL_CONSTANTS.RES_UNKNOWN,
        message: (res ? res.text : null) || err.toString(),
      }
    };
  }
}

function responseBinaryParser(res, callback) {
  res.setEncoding('binary');
  res.data = '';
  res.on('data', function (chunk) {
    res.data += chunk;
  });
  res.on('end', function () {
    callback(null, new Buffer(res.data, 'binary'));
  });
}

module.exports = {
  path: path,
  responseErrorBuilder: responseErrorBuilder,
  responseBinaryParser: responseBinaryParser
};
