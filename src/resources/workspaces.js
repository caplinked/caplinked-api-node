var CL_CONSTANTS = require('../caplinked-constants');
var utils = require('../caplinked-utils');

function Workspaces (client) {

  return {

    list: function (teamId) {
      var queryParams = {
        team_id: teamId
      };
      return client.request(CL_CONSTANTS.GET, utils.path('/api/v1/workspaces'), queryParams);
    },

    create: function (teamId, workspaceName) {
      var body = {
        team_id: teamId,
        workspace: {
          name: workspaceName
        }
      };
      return client.request(CL_CONSTANTS.POST, utils.path('/api/v1/workspaces'), null, body);
    },

    get: function (workspaceId) {
      return client.request(CL_CONSTANTS.GET, utils.path('/api/v1/workspaces/:id', { ':id': workspaceId }));
    },

    update: function (workspaceId, workspaceName) {
      var body = {
        workspace: {
          name: workspaceName
        }
      };
      return client.request(CL_CONSTANTS.PUT, utils.path('/api/v1/workspaces/:id', {':id': workspaceId}), null, body);
    }

  };

}

module.exports = Workspaces;
