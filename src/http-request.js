var request = require('superagent');
var Promise = require('es6-promise').Promise;
var CL_CONSTANTS = require('./caplinked-constants');
var _ = require('underscore');

var buildError = function (err, res) {
  if (res && res.body && _.isObject(res.body) && res.body.error) {
    // pass through error obj from API
    return res.body;
  } else {
    // build custom error
    return {
      error: {
        code: err.status || 'UNKNOWN',
        message: (res ? res.text : null) || err.toString(),
      }
    };
  }
};

function HttpRequest (path, method, queryParams, body, accessToken) {

  return new Promise(

    function httpRequestPromise(resolve, reject) {
      var apiRequest;

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

      apiRequest.type('application/json');
      apiRequest.set('X-Token', accessToken);

      apiRequest.end(function resHandler(err, res) {
        if (err) {
          failure(buildError(err, res));
        } else {
          success(res.body);
        }
      });
    }

  );
}

module.exports = HttpRequest;
