/* eslint-env mocha */

let chai = require('chai')
let sinon = require('sinon')
let assert = chai.assert

let CapLinkedSDK = require('./../../src/caplinked-sdk')
let Files = require('./../../src/resources/files.js')
let httpRequest = require('./../../src/http-request')
let CL_CONSTANTS = require('./../../src/caplinked-constants')

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
