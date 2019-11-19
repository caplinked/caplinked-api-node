var request = require('superagent');
var Promise = require('es6-promise').Promise;
var fs = require('fs');
var mime = require('mime');

var CL_CONSTANTS = require('./caplinked-constants');
var utils = require('./caplinked-utils');

/**
 * @class HttpRequest
 * @classdesc HttpRequest Class that returns a promise
 * @arg {String} path
 * @arg {String} method
 * @arg {Object} queryParams
 * @arg {Ojbect} body
 * @arg {String} apiKey
 * @arg {String} apiSecretKey
 * @arg {String} apiUserToken
 * @arg {Object} options
 * @returns {Object} new Promise
 */
function HttpRequest (path, method, queryParams, body, apiKey, apiSecretKey, apiUserToken, options) {
  options = options || {};

  return new Promise(

    function httpRequestPromise(resolve, reject) {
      var apiRequest;
      var headers;

      function success(data) {
        if (resolve) {
          resolve(data);
        }
      }

      function failure(error) {
        if (reject) {
          reject(error);
        }
      }

      switch(method) {
        case CL_CONSTANTS.POST:
          apiRequest = request.post(path);
          break;
        case CL_CONSTANTS.PUT:
          apiRequest = request.put(path);
          break;
        case CL_CONSTANTS.DELETE:
          apiRequest = request.del(path);
          break;
        case CL_CONSTANTS.GET:
          apiRequest = request.get(path);
          break;
      }

      if (queryParams) {
        apiRequest.query(queryParams);
      }
      if (body) {
        apiRequest.send(body);
      }

      headers = utils.signedRequestHeaders(apiKey, apiSecretKey, apiUserToken, options);
      if (headers) {
        for (var headerKey in headers) {
          apiRequest.set(headerKey, headers[headerKey]);
        }
      }
      const { file_name } = queryParams;
      apiRequest.type(file_name ? mime.lookup(file_name) : CL_CONSTANTS.CONTENT_TYPE_OCTECT_STREAM);

      apiRequest.end(function resHandler(err, res) {
        if (err) {
          failure(utils.responseErrorBuilder(err, res));
        } else {
          success(res.body);
        }
      });
    }

  );
}

module.exports = HttpRequest;
