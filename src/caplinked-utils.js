var _ = require('underscore');
var CL_CONSTANTS = require('./caplinked-constants');
var CryptoJS = require('crypto-js');

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

function responseErrorBuilder(err, res) {
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

function signedRequestHeaders(apiKey, apiSecretKey, apiUserToken, options) {
  if (!apiKey || !apiSecretKey || !apiUserToken) {
    return false;
  }
  var apiExpDate = Math.floor(Date.now() / 1000) + 600;
  var payload = apiKey + apiUserToken + apiExpDate;
  var hash = CryptoJS.HmacSHA256(payload, apiSecretKey);
  var headers = {
    'x-api-key': apiKey,
    'x-api-user-token': apiUserToken,
    'x-api-signature': 'Method=HMAC-SHA256 Signature=' + hash,
    'x-api-exp-date': apiExpDate,
  };
  return headers;
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
  responseBinaryParser: responseBinaryParser,
  signedRequestHeaders: signedRequestHeaders
};
