var CL_CONSTANTS = require('../caplinked-constants');
var utils = require('../caplinked-utils');

function Folders (client) {

  return {

    create: function (workspaceId, folderName, parentId) {
      var body = {
        workspace_id: workspaceId,
        name: folderName,
        parent_id: parentId || 0
      };
      return client.request(CL_CONSTANTS.POST, utils.path('/api/v1/folders'), null, body);
    },

    delete: function (workspaceId, folderId) {
      var body = {
        workspace_id: workspaceId
      };
      return client.request(CL_CONSTANTS.DELETE, utils.path('/api/v1/folders/:id', { ':id': folderId }), null, body);
    },

    get: function (workspaceId, folderId) {
      var queryParams = {
        workspace_id: workspaceId
      };
      return client.request(CL_CONSTANTS.GET, utils.path('/api/v1/folders/:id', { ':id': folderId }), queryParams);
    },

    getRootLevel: function (workspaceId) {
      var queryParams = {
        workspace_id: workspaceId
      };
      return client.request(CL_CONSTANTS.GET, utils.path('/api/v1/folders/0'), queryParams);
    },

    update: function (workspaceId, folderId, folderName, folderIndex) {
      var body = {
        workspace_id: workspaceId,
        folder: {
          name: folderName,
          index: folderIndex
        }
      };
      return client.request(CL_CONSTANTS.PUT, utils.path('/api/v1/folders/:id', { ':id': folderId }), null, body);
    },

    copy: function (workspaceId, folderId, destinationFolderId) {
      var body = {
        workspace_id: workspaceId,
        destination_folder_id: destinationFolderId
      };
      return client.request(CL_CONSTANTS.POST, utils.path('/api/v1/folders/:id/copy', { ':id': folderId }), null, body);
    },

    move: function (workspaceId, folderId, destinationFolderId) {
      var body = {
        workspace_id: workspaceId,
        destination_folder_id: destinationFolderId
      };
      return client.request(CL_CONSTANTS.POST, utils.path('/api/v1/folders/:id/move', { ':id': folderId }), null, body);
    }

  };

}

module.exports = Folders;
