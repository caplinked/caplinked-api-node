var CL_CONSTANTS = require('../caplinked-constants');
var utils = require('../caplinked-utils');

function Downloads (client) {

  return {

    createZip: function (workspaceId, downloadSettings) {
      var body = {
        workspace_id: workspaceId,
        download: downloadSettings
      };
      return client.request(CL_CONSTANTS.POST, utils.path('/api/v1/downloads'), null, body);
    },

    getZip: function (workspaceId, downloadId) {
      var queryParams = {
        workspace_id: workspaceId
      };
      // TODO content-type binary download
      return client.request(CL_CONSTANTS.GET, utils.path('/api/v1/downloads/:id', { ':id': downloadId }), queryParams);
    },

    getSingleFile: function (workspaceId, fileId) {
      var queryParams = {
        workspace_id: workspaceId
      };
      return client.request(CL_CONSTANTS.GET, utils.path('/api/v1/downloads/file/:file_id', { ':file_id': fileId }), queryParams);
    },

    getStatus: function (workspaceId) {
      return client.request(CL_CONSTANTS.GET, utils.path('/api/v1/downloads/status/:workspace_id', { ':workspace_id': workspaceId }));
    },

    delete: function (workspaceId, downloadId) {
      var body = {
        workspace_id: workspaceId
      };
      return client.request(CL_CONSTANTS.DELETE, utils.path('/api/v1/downloads/:id', { ':id': downloadId }), null, body);
    }

  };

}

module.exports = Downloads;
