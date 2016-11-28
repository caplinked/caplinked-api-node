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

  // set API endpoints
  this.folders = require('./resources/folders')(this);
  // ....
}

/**
 * Get the SDK version
 * @returns {String} Version of the Caplinked SDK (caplinked-api-node)
 */
Caplinked.prototype.getSdkVersion = function () {
  return this.sdkVersion;
};

/**
 * Get the config object
 * @returns {Object} Config object
 */
Caplinked.prototype.getConfig = function () {
  return this.config;
};

/**
 * Get the access token
 * @returns {String} Access token
 */
Caplinked.prototype.getToken = function () {
  return this.apiToken;
};

/**
 * Set the access token used to authenticate requests to the Caplinked API.
 * @arg {String} token - An access token
 * @returns {undefined}
 */
Caplinked.prototype.setToken = function (token) {
  this.apiToken = token;
};

/**
 * Invoke API request
 * @arg {String} path - API resource path
 * @arg {String} method - HTTP method
 * @arg {Object} queryParams - Object of query param key pairs
 * @arg {Object} body - Object of body key pairs
 * @returns {Object} Request promise
 */
Caplinked.prototype.request = function (path, method, queryParams, body) {
  var request = this.getHttpRequest();
  var fullPath = this.apiHost + path;
  return request(fullPath, method, queryParams, body, this.apiToken);
};

/**
 * Get Http request object
 * @returns {Object} Request manager
 */
Caplinked.prototype.getHttpRequest = function () {
 if (Caplinked.prototype.httpRequest === undefined) {
    Caplinked.prototype.httpRequest = require('./http-request-manager');
  }
  return Caplinked.prototype.httpRequest;
};

module.exports = Caplinked;
