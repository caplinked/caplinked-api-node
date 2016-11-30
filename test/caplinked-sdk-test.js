/* eslint-env mocha */

var chai = require('chai');
var sinon = require('sinon');
var assert = chai.assert;

var CaplinkedSdk = require('../src/caplinked-sdk');
var httpRequest = require('../src/http-request');
var CL_CONSTANTS = require('../src/caplinked-constants');

describe('CaplinkedSdk', function () {

  var cl;

  describe('api access token', function () {
    it('can be set in the constructor', function () {
      cl = new CaplinkedSdk({ 'apiToken': 'clApiToken', 'apiHost': 'https://api.caplinked.com' });
      assert.equal(cl.getToken(), 'clApiToken');
    });
    it('throws an error for empty api token', function () {
      assert.throws(function() {
        new CaplinkedSdk({ 'apiToken': '', 'apiHost': 'https://api.caplinked.com' });
        },
        Error,
        'Missing config key "token"'
      );
    });
    it('can be changed', function () {
      cl = new CaplinkedSdk({ 'apiToken': 'clApiToken', 'apiHost': 'https://api.caplinked.com' });
      assert.equal(cl.getToken(), 'clApiToken');
      cl.setToken('different-token');
      assert.equal(cl.getToken(), 'different-token');
    });
  });

  describe('config', function () {
    it('can be set in the constructor', function () {
      cl = new CaplinkedSdk({ 'apiToken': 'clApiToken', 'foo': 'bar' });
      assert.deepEqual(cl.getConfig(), { 'apiToken': 'clApiToken', 'foo': 'bar' });
    });
  });

  describe('http request', function () {
    it('can get default request object', function () {
      cl = new CaplinkedSdk({ 'apiToken': 'clApiToken' });
      assert.equal(cl.getHttpRequest(), httpRequest);
    });
  });

  describe('request', function () {
    it('invokes http request', function () {
      cl = new CaplinkedSdk({ 'apiToken': 'clApiToken' });
      var spy = sinon.spy();
      cl.setHttpRequest(spy);
      cl.request('POST', '/api/v1/test', { query1: 'query1value' }, { body1: 'body1value' });
      assert(spy.calledOnce);
      assert.deepEqual([
        'https://sandbox.caplinked.com/api/v1/test',
        'POST',
        { query1: 'query1value' },
        { body1: 'body1value' },
        'clApiToken'
      ], spy.getCall(0).args);
    });
  });
});
