var request = require('superagent');
var Promise = require('es6-promise').Promise;
var CL_CONSTANTS = require('./caplinked-constants');

function HttpRequest (path, method, queryParams, body, accessToken) {

  var promiseFunction = function (resolve, reject) {
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
    function responseHandler(error, response) {
      if (error) {
        failure(response.body);
      } else {
        success(response.body);
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
    apiRequest.end(responseHandler);
  };

  return new Promise(promiseFunction);
}

module.exports = HttpRequest;
