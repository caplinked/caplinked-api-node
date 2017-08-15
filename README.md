NodeJS SDK for Caplinked's API
===================

## Overview

NodeJS (Javascript) SDK for the [Caplinked API](https://developer.caplinked.com/).

Core information security endpoints for managing your virtual data room capabilities around files/folders, users/groups and permissions, uploads/downloads, dynamic watermarking, DRM (digital rights management) and more.

Vist [Caplinked](https://www.caplinked.com/data-protection-api/) for more information.

Basic Usage via NodeJS
-----------

```
npm install --save caplinked-api-node
```

```js
// initialize SDK
var CaplinkedSDK = require('caplinked-api-node');

var caplinked = new CaplinkedSDK({
  apiUserToken: 'USER_TOKEN',  // required or exception thrown
  apiKey: 'API_KEY',
  apiSecretKey: 'API_SECRET_KEY',
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
