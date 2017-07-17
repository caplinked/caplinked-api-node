/**
 * @class Caplinked
 * @classdesc Caplinked SDK class
 * @arg {Object} config
 * @arg {String} [config.apiUserToken] - Access token for making authenticated requests to Caplinked API
 * @arg {String} [config.apiHost] - Caplinked API host
 * @arg {String} [config.apiKey] - Caplinked API public key
 * @arg {String} [config.apiSecretKey] - Caplinked API secret key
 */
function Caplinked (config) {
  config = config || {};
  if (!(this instanceof Caplinked)) {
    return new Caplinked(config);
  }

  // set config
  var apiKey = config.apiKey || false;
  var apiSecretKey = config.apiSecretKey || false;

  this.apiUserToken = config.apiUserToken || false;
  this.apiHost = config.apiHost || 'https://sandbox.caplinked.com';

  if (!apiKey) {
    throw new Error('Missing config key "apiKey"');
  }

  if (!apiSecretKey) {
    throw new Error('Missing config key "apiSecretKey"');
  }

  if (!this.apiUserToken) {
    throw new Error('Missing config key "apiUserToken"');
  }

  this.sdkVersion = require('../package').version;

  // set API endpoint resources
  this.activities = require('./resources/activities')(this);
  this.downloads = require('./resources/downloads')(this);
  this.files = require('./resources/files')(this);
  this.folders = require('./resources/folders')(this);
  this.groups = require('./resources/groups')(this);
  this.organizations = require('./resources/organizations')(this);
  this.permissions = require('./resources/permissions')(this);
  this.teams = require('./resources/teams')(this);
  this.users = require('./resources/users')(this);
  this.workspaces = require('./resources/workspaces')(this);

  this.getApiKey = function() {
    return apiKey;
  };

  this.getApiSecretKey = function() {
    return apiSecretKey;
  };
}

/**
 * Get the SDK version
 * @returns {String} Version of the Caplinked SDK (caplinked-api-node)
 */
Caplinked.prototype.getSdkVersion = function () {
  return this.sdkVersion;
};

/**
 * Get the user API token
 * @returns {String} User API token
 */
Caplinked.prototype.getUserToken = function () {
  return this.apiUserToken;
};

/**
 * Set the user resource API token
 * @arg {String} token - An access token
 * @returns {undefined}
 */
Caplinked.prototype.setUserToken = function (userToken) {
  this.apiUserToken = userToken;
};

/**
 * Invoke API request
 * @arg {String} path - API resource path
 * @arg {String} method - HTTP method
 * @arg {Object} queryParams - Object of query param key pairs
 * @arg {Object} body - Object of body key pairs
 * @returns {Object} Request promise
 */
Caplinked.prototype.request = function (method, path, queryParams, body, options) {
  var request = this.getHttpRequest();
  var fullPath = this.apiHost + path;
  return request(fullPath, method, queryParams, body, this.getApiKey(), this.getApiSecretKey(), this.apiUserToken, options);
};

/**
 * Get Http request object
 * @returns {Object} HTTP request object
 */
Caplinked.prototype.getHttpRequest = function () {
  if (Caplinked.prototype.httpRequest === undefined) {
    Caplinked.prototype.httpRequest = require('./http-request');
  }
  return Caplinked.prototype.httpRequest;
};

Caplinked.prototype.setHttpRequest = function (httpRequest) {
  Caplinked.prototype.httpRequest = httpRequest;
};

module.exports = Caplinked;
