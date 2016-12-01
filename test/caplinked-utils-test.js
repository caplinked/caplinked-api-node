/* eslint-env mocha */

var chai = require('chai');
var sinon = require('sinon');
var assert = chai.assert;

var clUtils = require('../src/caplinked-utils');

describe('CaplinkedUtils', function () {

  describe('path helper', function () {
    it('can return path uri with no params', function () {
      var uri = clUtils.path('/api/v1/test');
      assert.equal(uri, '/api/v1/test');
    });
    it('can return path uri with params', function () {
      var uri = clUtils.path('/api/v1/test/:param1/:param2/yee', {
        ':param1': 'abc',
        ':param2': 'def'
      });
      assert.equal(uri, '/api/v1/test/abc/def/yee');
    });
  });

});
