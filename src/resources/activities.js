var CL_CONSTANTS = require('../caplinked-constants');
var utils = require('../caplinked-utils');

function Activities (client) {

  return {

    get: function (workspaceId, userId, pagiPage, pagiPerPage) {
      var queryParams = {};
      if (userId) {
        queryParams.user_id = userId;
      }
      if (pagiPage) {
        queryParams.page = pagiPage;
      }
      if (pagiPerPage) {
        queryParams.per_page = pagiPerPage;
      }
      var body = null;
      return client.request(utils.path('/api/v1/activities/workspace/:workspace_id', {':workspace_id': workspaceId}), CL_CONSTANTS.GET, queryParams, body);
    }

  };

}

module.exports = Activities;
