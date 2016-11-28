var CL_CONSTANTS = require('../caplinked-constants');
var utils = require('../caplinked-utils');

function Workspaces (client) {

  return {

    list: function (teamId) {
      var queryParams = {
        team_id: teamId
      };
      return client.request(utils.path('/api/v1/workspaces'), CL_CONSTANTS.GET, queryParams);
    },

    create: function (teamId, workspaceName) {
      var queryParams = null;
      var body = {
        team_id: teamId,
        workspace: {
          name: workspaceName
        }
      };
      return client.request(utils.path('/api/v1/workspaces'), CL_CONSTANTS.POST, queryParams, body);
    },

    get: function (workspaceId) {
      return client.request(utils.path('/api/v1/workspaces/:id', {':id': workspaceId}), CL_CONSTANTS.GET);
    },

    update: function (workspaceId, workspaceName) {
      var queryParams = null;
      var body = {
        workspace: {
          name: workspaceName
        }
      };
      return client.request(utils.path('/api/v1/workspaces/:id', {':id': workspaceId}), CL_CONSTANTS.PUT, queryParams, body);
    }

  };

}

module.exports = Workspaces;
