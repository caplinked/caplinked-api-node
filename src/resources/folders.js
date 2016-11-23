var CL_CONSTANTS = require('../caplinked-constants');

function getBasePath(id, param) {
  var basePath = '/api/v1/folders';
  id = parseInt(id, 10);
  if (id >= 0) {
    basePath += '/' + id;
    if (param) {
      basePath += '/' + param;
    }
  }
  return basePath;
}

function Folders (client) {

  return {

    create: function (workspaceId, folderName, parentId) {
      var queryParams = {
        workspace_id: workspaceId
      };
      var body = {
        name: folderName,
        parent_id: parentId
      };
      return client.request(getBasePath(), CL_CONSTANTS.POST, queryParams, body);
    },

    delete: function (workspaceId, folderId) {
      var queryParams = {
        workspace_id: workspaceId
      };
      var body = null;
      return client.request(getBasePath(folderId), CL_CONSTANTS.DELETE, queryParams, body);
    },

    get: function (workspaceId, folderId) {
      var queryParams = {
        workspace_id: workspaceId
      };
      var body = null;
      return client.request(getBasePath(folderId), CL_CONSTANTS.GET, queryParams, body);
    },

    getRootLevel: function (workspaceId) {
      var queryParams = {
        workspace_id: workspaceId
      };
      var body = null;
      return client.request(getBasePath(0), CL_CONSTANTS.GET, queryParams, body);
    },

    update: function (workspaceId, folderId, folderName, folderIndex) {
      var queryParams = {
        workspace_id: workspaceId
      };
      var body = {
        folder: {
          name: folderName,
          index: folderIndex
        }
      };
      return client.request(getBasePath(folderId), CL_CONSTANTS.PUT, queryParams, body);
    },

    copy: function (workspaceId, folderId, destinationFolderId) {
      var queryParams = {
        workspace_id: workspaceId
      };
      var body = {
        destination_folder_id: destinationFolderId
      };
      return client.request(getBasePath(folderId, 'copy'), CL_CONSTANTS.POST, queryParams, body);
    },

    move: function (workspaceId, folderId, destinationFolderId) {
      var queryParams = {
        workspace_id: workspaceId
      };
      var body = {
        destination_folder_id: destinationFolderId
      };
      return client.request(getBasePath(folderId, 'move'), CL_CONSTANTS.POST, queryParams, body);
    }

  };

}

module.exports = Folders;
