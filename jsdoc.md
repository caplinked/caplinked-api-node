This webiste contains the documentation of the CapLinked Node.js SDK. This information is also mirrored in the [Wiki](https://github.com/caplinked/caplinked-api-node/Wiki/Home)


## Requirements
- Node.js Version 5.12.0 or greater

## Installation
```
mkdir app
cd app
npm init // (follow prompts)
npm install --save caplinked-api-node
touch index.js
vim index.js
```

## A Working Example
In the `index.js` file

```js

// Require the SDK
var CaplinkedSDK = require('caplinked-api-node');
var fs = require('fs');

// Create a new client. We'll name it `caplinked`.
var caplinked = new CaplinkedSDK({
  apiUserToken: 'PLACEHOLDER',  // required or exception thrown
  apiKey: 'PLACEHOLDER',
  apiSecretKey: 'PLACEHOLDER',
  apiHost: 'https://sandbox.caplinked.com'
});

// These variables will be used later in this example. Initialize them for now.
var team_id;
var workspace_id;
var folder_id;
var file_id_1;
var file_id_2;
var file_name_1;
var file_name_2;
var zip_download_id;

var team_info = {
  name: 'HYDRA',
  allowed_workspaces: 10,
  allowed_admins: 10,
  drm_enabled: false,
  watermarking: false,
  suppress_email: false
}


/* =========================================
 * Due to the asynchronous nature of API calls, we have to wait until certain actions complete before moving on.
 * To do this, we will use Promise chaining. There are other methods to achieve this. But as it is simple
 * Promises will be used to perform this this.
 * =========================================
*/ 


/* ---------
 * First, we will create a Team with the team_info object created above
 * If successful, it will set team_id to the returned objects' id
 * The id of the user supplying the apiUserToken will be set as the team.creator_id
 * ---------
 */
var createTeam = new Promise((resolve, reject) => {
  caplinked.teams.create(team_info)
    .then(response => {
      team_id = response.id; // set team_id from above with the id from the team created in this action
      resolve(response);
    })
    .catch(error => {
      reject(error);
    });
})

/* ---------
 * Then, we will create a new workspace.
 * This uses the team_id we have just set and a workspace name of our choosing
 * ---------
 */
var createWorkspace = function() {
  return new Promise((resolve, reject) => {
    let workspace_name = 'Test Workspace';
    caplinked.workspaces.create(team_id, workspace_name)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

/* ---------
 * Once we have created a Team and Workspace, we must create a folder before we can upload a file.
 * Passing the workspace_id and folder_name, we create it. The null value in the 3rd argument is the parent folder id.
 * Since this is a root level folder, it has no parent, and thus the value is null
 * ---------
 */
var createFolder = function() {
  return new Promise((resolve, reject) => {
    caplinked.folders.create(workspace_id, 'TEST TEAM', null)
    .then(response => {
      resolve(response);
    })
    .catch(err => {
      reject(err);
    });
  });
}

/* ---------
 * Now that we have our folder, let's upload a file.
 * It takes the workspace id, folder id, file name, and file
 * In this example, a txt file is placed in the /var/www folder and its absolute path is used
 * Use `fs.createReadStream` instead of `fileSync` or `fileRead`. Large files can sometimes lead to corruptions
 * that create errors.
 * ---------
 */
var uploadFile = function(file_name, path) {
  var file_data = fs.createReadStream(path);
  return new Promise((resolve, reject) => {
    caplinked.files.upload(workspace_id, folder_id, file_name, file_data) 
    .then(response => {
      resolve(response);
    })
    .catch(error => {
      reject(error);
    });
  });
}

/* ----------
 * Now that we have uploaded a file, let's get the file information from the server
 * The 3rd arguement is the page_number. Pass 1 if the file is 1 or fewer pages. It cannot be null
 * ----------
 */
var getFileInfo = function() {
  return new Promise((resolve, reject) => {
    caplinked.files.getFileInfo(workspace_id, file_id_1, 1)
    .then(response => {
      resolve(response);
    })
    .catch(err => {
      reject(err);
    });
  });
}

/* ---------
 * We can download one of the files that we have just uploaded.
 * ---------
 */
var singleFileDownload = function(workspace_id, file_id) {
  return new Promise((resolve, reject) => {
    caplinked.downloads.downloadSingleFile(workspace_id, file_id)
    .then(response => {
      resolve(response);
    })
    .catch(err => {
      reject(err);
    });
  });
}

/* --------
 * Having confirmed these files exist and are available for download, let's create a zip file
 * Look at the promise chain below, where it is called, to see what the downloadSettings look like
 * -------
 */
var createZipFile = function(ws_id, download_settings) {
  return new Promise((resolve, reject) => {
    caplinked.downloads.createZip(ws_id, download_settings)
    .then(response => {
      resolve(response);
    })
    .catch(err => {
      reject(err);
    });
  });
}

// Now, we chain the promises together to execute each action in the order it needs to be. 
createTeam
  .then(team_response => {
    console.log("=========================================");
    console.log("Team Create Response: ", team_response);
    return createWorkspace();
  })
  .then(workspace_response => {
    workspace_id = workspace_response.id;
    console.log("\n=========================================");
    console.log('Workspace Create Response: ', workspace_response);
    return createFolder();
  })
  .then(folder_response => {
    folder_id = folder_response.id
    console.log("\n=========================================");
    console.log('Folder Create Response: ', folder_response);
    return uploadFile("api.png", "/var/www/api.png");
  })
  .then(file_upload_response => {
    file_id_1 = file_upload_response.id;
    file_name_1 = file_upload_response.file_name;
    console.log("\n=========================================");
    console.log('File Upload Response: ', file_upload_response);
    return uploadFile("Thing.pdf", "/var/www/Thing.pdf");
  })
  .then(file_upload_response_2 => {
    file_id_2 = file_upload_response_2.id;
    file_name_2 = file_upload_response_2.file_name;
    console.log("\n=========================================");
    console.log('File Upload 2 Response: ', file_upload_response_2);
    return getFileInfo();
  })
  .then(file_info_response => {
    console.log("\n=========================================");
    console.log('File Info Response: ', file_info_response);
    return singleFileDownload(workspace_id, file_id_1);
  })
  .then(single_download_response => {
    console.log("\n=========================================");
    console.log('Single File Download Response: ', single_download_response);

    var download_settings = {
      folder_ids: [folder_id]
    }

    return createZipFile(workspace_id, download_settings)
  })
  .then(zip_create_response => {
    zip_download_id = zip_create_response.id;
    console.log("\n=========================================");
    console.log('Zip Create Response: ', zip_create_response);
  })
  .catch(error1 => {
    console.log('ERROR:', error1);
  })
  .then(() => {
    console.log("\n=========================================");
  });


```

## Running
By running `node index.js` from the base dir of the index file, you will see the output of the actions logged to the console.

## No Console Logging

For a cleaner look, try this. You still must declare the named functions that get executed. I have omitted them in this section to save space and prevent redundancy.

```js

var CaplinkedSDK = require('caplinked-api-node');
var fs = require('fs');

// Create a new client. We'll name it `caplinked`.
var caplinked = new CaplinkedSDK({
  apiUserToken: 'PLACEHOLDER',  // required or exception thrown
  apiKey: 'PLACEHOLDER',
  apiSecretKey: 'PLACEHOLDER',
  apiHost: 'https://sandbox.caplinked.com'
});

// These variables will be used later in this example. Initialize them for now.
var team_id;
var workspace_id;
var folder_id;
var file_id_1;
var file_id_2;
var file_name_1;
var file_name_2;
var zip_download_id;

var team_info = {
  name: 'HYDRA',
  allowed_workspaces: 10,
  allowed_admins: 10,
  drm_enabled: false,
  watermarking: false,
  suppress_email: false
}

createTeam
  .then(team_response => createWorkspace())
  .then(workspace_response => {
    workspace_id = workspace_response.id;
    return createFolder();
  })
  .then(folder_response => {
    folder_id = folder_response.id
    return uploadFile("api.png", "/var/www/api.png");
  })
  .then(file_upload_response => {
    file_id_1 = file_upload_response.id;
    file_name_1 = file_upload_response.file_name;
    return uploadFile("Thing.pdf", "/var/www/Thing.pdf");
  })
  .then(file_upload_response_2 => {
    file_id_2 = file_upload_response_2.id;
    file_name_2 = file_upload_response_2.file_name;
    return getFileInfo();
  })
  .then(file_info_response => singleFileDownload(workspace_id, file_id_1))
  .then(single_download_response => {
    var download_settings = {
      folder_ids: [folder_id]
    }
    return createZipFile(workspace_id, download_settings)
  })
  .catch(error1 => {
    console.log('ERROR:', error1);
  });

```
