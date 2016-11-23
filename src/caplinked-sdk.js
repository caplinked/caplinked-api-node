require('./polyfill-object-assign');

/**
 * @class Caplinked
 * @classdesc Caplinked SDK class
 * @arg {Object} config
 * @arg {String} [config.apiToken] - Access token for making authenticated requests to Caplinked API
 * @arg {String} [config.apiHost] - Caplinked API host
 */
function Caplinked (config) {
  config = config || {};
  if (!(this instanceof Caplinked)) {
    return new Caplinked(config);
  }

  this.apiHost = config.apiHost || 'https://sandbox.caplinked.com';
  this.apiToken = config.apiToken || '';

  if (!this.apiToken) {
    throw new Error('Missing config key "token"');
  }

  this.sdkVersion = require('../package').version;
  this.config = config;
}

/**
 * Get the SDK version
 * @returns {String} Version
 */
Caplinked.prototype.getSdkVersion = function () {
  return this.sdkVersion;
};

/**
 * Set the access token used to authenticate requests to the API.
 * @arg {String} token - An access tokens
 * @returns {undefined}
 */
Caplinked.prototype.setToken = function (token) {
  this.apiToken = token;
};

/**
 * Get the access token
 * @returns {String} Access token
 */
Caplinked.prototype.getToken = function () {
  return this.apiToken;
};

Caplinked.prototype.request = function (path, method, body, queryParams) {
  var request = this.getHttpRequest();
  var fullPath = this.apiHost + path;
  return request(fullPath, method, body, queryParams, this.apiToken);
};

Caplinked.prototype.getHttpRequest = function () {
 if (Caplinked.prototype.httpRequest === undefined) {
    Caplinked.prototype.httpRequest = require('./http-request-manager');
  }
  return Caplinked.prototype.httpRequest;
};

/**
 * API endpoint routes
 */
Caplinked.prototype = Object.assign(Caplinked.prototype, require('./resources'));

module.exports = Caplinked;
