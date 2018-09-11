var CL_CONSTANTS = require('../caplinked-constants');
var utils = require('../caplinked-utils');

/**
 * @class Activities
 * @classdesc Activities class. Takes a `client` arg. This arg attaches the class as a property of the client when it is required.
 * @arg {Object} client - The CapLinked Class
 */
function Activities (client) {

  return {

    /**
     * @function get
     * @memberof Activities
     * @arg {Number} workspaceId
     * @arg {Number} userId
     * @arg {Number} page 
     * @arg {Number} perPage
     * @returns {Object} Client.request Response
     */
    get: function (workspaceId, userId, page, perPage) {
      var queryParams = {};
      if (userId) {
        queryParams.user_id = userId;
      }
      if (page) {
        queryParams.page = page;
      }
      if (perPage) {
        queryParams.per_page = perPage;
      }
      return client.request(CL_CONSTANTS.GET, utils.path('/api/v1/activities/workspace/:workspace_id', {':workspace_id': workspaceId}), queryParams);
    }

  };

}

module.exports = Activities;
