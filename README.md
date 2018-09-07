NodeJS SDK for Caplinked's API
===================

## Overview

NodeJS (Javascript) SDK for the [Caplinked API](https://developer.caplinked.com/).

Core information security endpoints for managing your virtual data room capabilities around files/folders, users/groups and permissions, uploads/downloads, dynamic watermarking, DRM (digital rights management) and more.

Vist [Caplinked](https://www.caplinked.com/data-protection-api/) for more information.


Reporting Bugs
-----------
Please inform about any content inconsistencies, outdated materials, cosmetic issues, bugs in the code, and other defects you find in the docs and samples by submitting an issue on this repository.

Prerequisites
-----------
This application is tested using [Testen](https://github.com/egoist/testen). While this is somewhat opaque and brittle, Testen indicates that this SDK is compatible with Node Versions >= 4.
Download Node.js [here](https://nodejs.org/en/download/). Verify your installation with `node -v` or `which node`.


Installation
-----------

```
npm install --save caplinked-api-node
```

Basic Usage via NodeJS
-----------

```js
/* -- index.js -- */
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
Then run it

```
node index.js
```

Available Actions
----------
Please refer to the approriate wiki page to see a list of the available actions one may make via this SDK. Each action has a corresponding code example.
Additionally, some wiki pages may contain gotchas or important information not covered here.

[Activites](https://github.com/caplinked/caplinked-api-node/wiki/Activities)
[Downloads](https://github.com/caplinked/caplinked-api-node/wiki/Downloads)
[Files](https://github.com/caplinked/caplinked-api-node/wiki/Files)
[Folders](https://github.com/caplinked/caplinked-api-node/wiki/Folders)
[Group](https://github.com/caplinked/caplinked-api-node/wiki/Group)
[Organizations](https://github.com/caplinked/caplinked-api-node/wiki/Organizations)
[Permissions](https://github.com/caplinked/caplinked-api-node/wiki/Permissions)
[Team](https://github.com/caplinked/caplinked-api-node/wiki/Team)
[User](https://github.com/caplinked/caplinked-api-node/wiki/User)
[Watermark](https://github.com/caplinked/caplinked-api-node/wiki/Watermark)
[Workspaces](https://github.com/caplinked/caplinked-api-node/wiki/Workspaces)

Change Log
---------
[See full change log here](https://github.com/caplinked/caplinked-api-node/wiki/ChangeLog)
