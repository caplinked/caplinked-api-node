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

  // set config
  this.apiHost = config.apiHost || 'https://sandbox.caplinked.com';
  this.apiToken = config.apiToken || '';

  if (!this.apiToken) {
    throw new Error('Missing config key "token"');
  }

  this.sdkVersion = require('../package').version;
  this.config = config;

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
Caplinked.prototype.request = function (method, path, queryParams, body, options) {
  var request = this.getHttpRequest();
  var fullPath = this.apiHost + path;
  return request(fullPath, method, queryParams, body, this.apiToken, options);
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
