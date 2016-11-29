var CL_CONSTANTS = require('../caplinked-constants');
var utils = require('../caplinked-utils');

function Permissions (client) {

  return {

    getFolderPermissions: function (workspaceId, groupId, folderId) {
      var queryParams = {
        workspace_id: workspaceId,
        group_id: groupId
      };
      return client.request(CL_CONSTANTS.GET, utils.path('/api/v1/permissions/folders/:id', { ':id': folderId }), queryParams);
    },

    updateFolderPermissions: function (workspaceId, groupId, folderId, verb, folderAction) {
      var body = {
        workspace_id: workspaceId,
        group_id: groupId,
        verb: verb,
        folder_action: folderAction
      };
      return client.request(CL_CONSTANTS.PUT, utils.path('/api/v1/permissions/folders/:id', { ':id': folderId }), null, body);
    }

  };

}

module.exports = Permissions;
