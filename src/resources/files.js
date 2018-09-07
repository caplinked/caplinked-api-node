var CL_CONSTANTS = require('../caplinked-constants');
var utils = require('../caplinked-utils');

function Files (client) {

  return {

    upload: function (workspaceId, folderId, fileName, file) {
      var params = {
        workspace_id: workspaceId,
        folder_id: folderId,
        file_name: fileName
      };
      return client.request(CL_CONSTANTS.PUT, utils.path('/api/v1/files/upload'), params, file);
    },

    delete: function (workspaceId, fileId) {
      var body = {
        workspace_id: workspaceId
      };
      return client.request(CL_CONSTANTS.DELETE, utils.path('/api/v1/files/:id', { ':id': fileId }), null, body);
    },

    getFileInfo: function (workspaceId, fileId, pageNumber) {
      var queryParams = {
        workspace_id: workspaceId
      };
      if (pageNumber !== null) {
        queryParams.page_number = parseInt(pageNumber, 10);
      }
      return client.request(CL_CONSTANTS.GET, utils.path('/api/v1/files/:id', { ':id': fileId }), queryParams);
    },

    updateFileInfo: function (workspaceId, fileId, fileSettings) {
      var body = {
        workspace_id: workspaceId,
        file: fileSettings
      };
      return client.request(CL_CONSTANTS.PUT, utils.path('/api/v1/files/:id', { ':id': fileId }), null, body);
    },

    copy: function (workspaceId, fileId, destinationFolderId) {
      var body = {
        workspace_id: workspaceId,
        destination_folder_id: destinationFolderId
      };
      return client.request(CL_CONSTANTS.POST, utils.path('/api/v1/files/:id/copy', { ':id': fileId }), null, body);
    },

    move: function (workspaceId, fileId, destinationFolderId) {
      var body = {
        workspace_id: workspaceId,
        destination_folder_id: destinationFolderId
      };
      return client.request(CL_CONSTANTS.POST, utils.path('/api/v1/files/:id/move', { ':id': fileId }), null, body);
    }

  };

}

module.exports = Files;
