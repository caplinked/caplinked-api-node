var CL_CONSTANTS = require('../caplinked-constants');
var utils = require('../caplinked-utils');

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
      return client.request(utils.path('/api/v1/folders'), CL_CONSTANTS.POST, queryParams, body);
    },

    delete: function (workspaceId, folderId) {
      var queryParams = {
        workspace_id: workspaceId
      };
      var body = null;
      return client.request(utils.path('/api/v1/folders/:id', {':id': folderId}), CL_CONSTANTS.DELETE, queryParams, body);
    },

    get: function (workspaceId, folderId) {
      var queryParams = {
        workspace_id: workspaceId
      };
      var body = null;
      return client.request(utils.path('/api/v1/folders/:id', {':id': folderId}), CL_CONSTANTS.GET, queryParams, body);
    },

    getRootLevel: function (workspaceId) {
      var queryParams = {
        workspace_id: workspaceId
      };
      var body = null;
      return client.request(utils.path('/api/v1/folders/0'), CL_CONSTANTS.GET, queryParams, body);
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
      return client.request(utils.path('/api/v1/folders/:id', {':id': folderId}), CL_CONSTANTS.PUT, queryParams, body);
    },

    copy: function (workspaceId, folderId, destinationFolderId) {
      var queryParams = {
        workspace_id: workspaceId
      };
      var body = {
        destination_folder_id: destinationFolderId
      };
      return client.request(utils.path('/api/v1/folders/:id/copy', {':id': folderId}), CL_CONSTANTS.POST, queryParams, body);
    },

    move: function (workspaceId, folderId, destinationFolderId) {
      var queryParams = {
        workspace_id: workspaceId
      };
      var body = {
        destination_folder_id: destinationFolderId
      };
      return client.request(utils.path('/api/v1/folders/:id/move', {':id': folderId}), CL_CONSTANTS.POST, queryParams, body);
    }

  };

}

module.exports = Folders;
