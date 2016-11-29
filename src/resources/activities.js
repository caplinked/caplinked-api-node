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
      return client.request(CL_CONSTANTS.GET, utils.path('/api/v1/activities/workspace/:workspace_id', {':workspace_id': workspaceId}), queryParams);
    }

  };

}

module.exports = Activities;
