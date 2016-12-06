NodeJS SDK for Caplinked's API
===================

A simple JavaScript interface to the [Caplinked API](https://developer.caplinked.com/docs).

Basic Usage via NodeJS
-----------

```
npm install --save caplinked-api-node
```

```js
// initialize SDK
var CaplinkedSDK = require('caplinked-api-node');

var caplinked = new CaplinkedSDK({
  apiToken: 'SECRET_API_TOKEN',  // required or exception thrown
  apiHost: 'https://sandbox.caplinked.com'
});

// get information about a particular file
var workspaceId = 438;
var fileId = 4675;
var pageNumber = 2;

caplinked.files.getFileInfo(workspaceId, fileId, pageNumber)
.then(function(response) {
  // console.log(response);
})
.catch(function(error) {
  // console.log(error);
});

```
