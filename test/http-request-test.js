/* eslint-env mocha */

var Promise = require('es6-promise').Promise;
var CL_CONSTANTS = require('../src/caplinked-constants');
var HttpRequest = require('../src/http-request');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var assert = chai.assert;
var should = chai.should();
var nock = require('nock');
chai.use(chaiAsPromised);

describe('HttpRequest', function () {

  var HOST = 'https://www.example.com';
  var URI = '/test-path';
  var URL = HOST + URI;
  var TOKEN = 'api-test-token';

  afterEach(function () {
    nock.cleanAll();
  });

  it('returns a promise', function () {
    nock(HOST).get(URI).query({ werd: 'up' }).reply(200, { ok: 'yes'});

    var apiRequest = HttpRequest(URL, CL_CONSTANTS.GET, { werd: 'up' }, null, TOKEN);
    assert.equal(apiRequest instanceof Promise, true);
    assert.equal(nock.isDone(), true);
  });

  it('sets X-Token header and content type', function () {
    nock(HOST).get(URI).query({ werd: 'up' })
      .reply(function(uri, requestBody) {
        var result = {
          validToken: this.req.headers['x-token'] || '',
          validContentType: this.req.headers['content-type'] || ''
        };
        return [ 200, result ];
      });

    var apiRequest = HttpRequest(URL, CL_CONSTANTS.GET, { werd: 'up' }, null, 'api-token');
    return apiRequest.should.eventually.become({ validToken: 'api-token', validContentType: 'application/json' });
  });

  it('sets query params and request body', function () {
    nock(HOST)
      .post(URI, { werd: 'up' })
      .query({ yee: 'yah' })
      .reply(function(uri, requestBody) {
        return [
          200,
          { valid: 'query-and-body' } || {}
        ];
      });

    var apiRequest = HttpRequest(URL, CL_CONSTANTS.POST, { yee: 'yah' }, { werd: 'up' }, 'api-token');
    return apiRequest.should.eventually.become({ valid: 'query-and-body' });
  });

  it('should reject promise', function () {
    nock(HOST).get(URI).query({ werd: 'up' })
      .reply(function(uri, requestBody) {
        return [
          403,
          { error: 'Access Denied' } || {}
        ];
      });

    var apiRequest = HttpRequest(URL, CL_CONSTANTS.GET, { werd: 'up' }, null, 'api-token');
    return apiRequest.should.be.rejectedWith({ error: 'Access Denied' });
  });

});
