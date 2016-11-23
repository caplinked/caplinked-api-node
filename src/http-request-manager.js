var request = require('superagent');
var Promise = require('es6-promise').Promise;

function HttpRequest (path, method, body, queryParams, accessToken) {

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

    apiRequest = request.get(path).type('application/json');
    apiRequest.set('X-Token', accessToken);
    apiRequest.query(queryParams);
    apiRequest.send(body).end(responseHandler);
  };

  return new Promise(promiseFunction);
}

module.exports = HttpRequest;
