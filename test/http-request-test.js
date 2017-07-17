/* eslint-env mocha */

var Promise = require('es6-promise').Promise;
var CL_CONSTANTS = require('../src/caplinked-constants');
var HttpRequest = require('../src/http-request');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();
var nock = require('nock');
chai.use(chaiAsPromised);

describe('HttpRequest', function () {

  var HOST = 'https://www.example.com';
  var URI = '/test-path';
  var URL = HOST + URI;

  afterEach(function () {
    nock.cleanAll();
  });

  it('returns a promise', function () {
    nock(HOST).get(URI).query({ werd: 'up' }).reply(200, { ok: 'yes'});

    var apiRequest = HttpRequest(URL, CL_CONSTANTS.GET, { werd: 'up' }, null, 'apikey1', 'apiSecretKey1', 'apiUserToken1');
    assert.equal(apiRequest instanceof Promise, true);
    assert.equal(nock.isDone(), true);
  });

  it('sets header and content type', function () {
    nock(HOST).get(URI).query({ werd: 'up' })
      .reply(function(uri, requestBody) {
        var result = {
          validUserToken: this.req.headers['x-api-user-token'] || '',
          validKey: this.req.headers['x-api-key'] || '',
          validSig: this.req.headers['x-api-signature'] ? true : false,
          validExpDate: this.req.headers['x-api-exp-date'] ? true : false,
          validContentType: this.req.headers['content-type'] || ''
        };
        return [ 200, result ];
      });

    var apiRequest = HttpRequest(URL, CL_CONSTANTS.GET, { werd: 'up' }, null, 'apikey1', 'apiSecretKey1', 'apiUserToken1');
    return apiRequest.should.eventually.become({
      'validContentType': 'application/json',
      'validExpDate': true,
      'validKey': 'apikey1',
      'validSig': true,
      'validUserToken': 'apiUserToken1'
       });
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

    var apiRequest = HttpRequest(URL, CL_CONSTANTS.POST, { yee: 'yah' }, { werd: 'up' }, 'apikey1', 'apiSecretKey1', 'apiUserToken1');
    return apiRequest.should.eventually.become({ valid: 'query-and-body' });
  });

  it('should reject promise', function () {
    nock(HOST).get(URI).query({ werd: 'up' })
      .reply(function(uri, requestBody) {
        return [
          403,
          { error: 'Access Denied' }
        ];
      });

    var apiRequest = HttpRequest(URL, CL_CONSTANTS.GET, { werd: 'up' }, null, 'apikey1', 'apiSecretKey1', 'apiUserToken1');
    return apiRequest.should.eventually.be.rejected;
  });

  it('should reject promise and build custom non-api-endpoint error', function () {
    nock(HOST).get(URI).query({ werd: 'up' })
      .reply(function(uri, requestBody) {
        return [
          404,
          { nope: 'should not be returned to promise - fake 404' }
        ];
      });

    var apiRequest = HttpRequest(URL, CL_CONSTANTS.GET, { werd: 'up' }, null, 'apikey1', 'apiSecretKey1', 'apiUserToken1');
    return apiRequest.should.eventually.be.rejected;
  });


});
