var CL_CONSTANTS = require('../caplinked-constants');
var utils = require('../caplinked-utils');

function Organizations (client) {

  return {

    get: function (organizationId) {
      return client.request(CL_CONSTANTS.GET, utils.path('/api/v1/organizations/:id', { ':id': organizationId }));
    },

    update: function (organizationId, organizationSettings) {
      var body = organizationSettings;
      return client.request(CL_CONSTANTS.PUT, utils.path('/api/v1/organizations/:id', { ':id': organizationId }), null, body);
    },

    updateSupportInformation: function (organizationId, supportInfoSettings) {
      var body = supportInfoSettings;
      return client.request(CL_CONSTANTS.PUT, utils.path('/api/v1/organizations/:id/support_information', { ':id': organizationId }), null, body);
    },

    removeOrgMember: function (organizationId, userId) {
      var body = {
        user_id: userId
      };
      return client.request(CL_CONSTANTS.DELETE, utils.path('/api/v1/organizations/:id/memberships', { ':id': organizationId }), null, body);
    },

    listOrgMembers: function (organizationId) {
      return client.request(CL_CONSTANTS.GET, utils.path('/api/v1/organizations/:id/memberships', { ':id': organizationId }));
    },

    addOrgMembers: function (organizationId, userId) {
      var body = {
        user_id: userId
      };
      return client.request(CL_CONSTANTS.POST, utils.path('/api/v1/organizations/:id/memberships', { ':id': organizationId }), null, body);
    }

  };

}

module.exports = Organizations;
