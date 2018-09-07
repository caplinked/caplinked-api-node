/* eslint-env mocha */
var chai = require('chai')
var sinon = require('sinon')
var assert = chai.assert

var CapLinkedSDK = require('./../../src/caplinked-sdk')
var Files = require('./../../src/resources/files.js')
var httpRequest = require('./../../src/http-request')
var CL_CONSTANTS = require('./../../src/caplinked-constants')

describe('Files Component', function () {
  let client = {
    request: function (method, path, options, params) {
      return { title: 'File title', meta: true }
    }
  };

  describe('getFileInfo', function () {
    it('Returns file information when passed proper ids', function () {
      f = new Files(client)
      assert.deepEqual(f.getFileInfo(123, 132, 123), { title: 'File title', meta: true })
    });
  });

});
