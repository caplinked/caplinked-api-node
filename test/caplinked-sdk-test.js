/* eslint-env mocha */

var chai = require('chai');
var sinon = require('sinon');
var assert = chai.assert;

var CaplinkedSdk = require('../src/caplinked-sdk');
var httpRequest = require('../src/http-request');
var CL_CONSTANTS = require('../src/caplinked-constants');

describe('CaplinkedSdk', function () {
  var cl;
  var baseConfig;

  beforeEach(function() {
    baseConfig = { 'apiHost': 'https://api.caplinked.com', 'apiUserToken': 'userToken', 'apiKey': 'key', 'apiSecretKey': 'secretKey' };
  });

  describe('api keys', function () {
    it('throws an error for empty api key', function () {
      assert.throws(function() {
          baseConfig.apiKey = '';
          new CaplinkedSdk(baseConfig);
        },
        Error,
        'Missing config key "apiKey"'
      );
    });
    it('throws an error for empty api secret key', function () {
      assert.throws(function() {
          baseConfig.apiSecretKey = '';
          new CaplinkedSdk(baseConfig);
        },
        Error,
        'Missing config key "apiSecretKey"'
      );
    });
  });

  describe('api user token', function () {
    it('can be set in the constructor', function () {
      cl = new CaplinkedSdk(baseConfig);
      assert.equal(cl.getUserToken(), 'userToken');
    });
    it('throws an error for empty api user token', function () {
      assert.throws(function() {
          baseConfig.apiUserToken = '';
          new CaplinkedSdk(baseConfig);
        },
        Error,
        'Missing config key "apiUserToken"'
      );
    });
    it('can be changed', function () {
      cl = new CaplinkedSdk(baseConfig);
      assert.equal(cl.getUserToken(), 'userToken');
      cl.setUserToken('different-token');
      assert.equal(cl.getUserToken(), 'different-token');
    });
  });

  describe('http request', function () {
    it('can get default request object', function () {
      cl = new CaplinkedSdk(baseConfig);
      assert.equal(cl.getHttpRequest(), httpRequest);
    });
  });

  describe('request', function () {
    it('invokes http request', function () {
      cl = new CaplinkedSdk(baseConfig);
      var spy = sinon.spy();
      cl.setHttpRequest(spy);
      cl.request('POST', '/api/v1/test', { query1: 'query1value' }, { body1: 'body1value' }, { option1: 'option1' });
      assert(spy.calledOnce);
      assert.deepEqual(spy.getCall(0).args, [
        'https://api.caplinked.com/api/v1/test',
        'POST',
        { query1: 'query1value' },
        { body1: 'body1value' },
        'key',
        'secretKey',
        'userToken',
        { option1: 'option1' }
      ]);
    });
  });
});
