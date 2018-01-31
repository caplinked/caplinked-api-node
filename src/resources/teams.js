var CL_CONSTANTS = require('../caplinked-constants');
var utils = require('../caplinked-utils');

function Teams (client) {

  return {

    list: function(){
      return client.request(CL_CONSTANTS.GET, utils.path('/api/v1/teams'));
    },

    create: function (teamSettings) {
      var body = {
        team: teamSettings
      };
      return client.request(CL_CONSTANTS.POST, utils.path('/api/v1/teams'), null, body);
    },

    get: function (teamId) {
      return client.request(CL_CONSTANTS.GET, utils.path('/api/v1/teams/:id', { ':id': teamId }));
    },

    update: function (teamId, teamSettings) {
      var body = {
        team: teamSettings
      };
      return client.request(CL_CONSTANTS.PUT, utils.path('/api/v1/teams/:id', { ':id': teamId }), null, body);
    },

    removeMember: function (teamId, userId) {
      var body = {
        user_id: userId
      };
      return client.request(CL_CONSTANTS.DELETE, utils.path('/api/v1/teams/:id/memberships', { ':id': teamId }), null, body);
    },

    listMembers: function (teamId) {
      return client.request(CL_CONSTANTS.GET, utils.path('/api/v1/teams/:id/memberships', { ':id': teamId }));
    },

    addMember: function (teamId, userId) {
      var body = {
        user_id: userId
      };
      return client.request(CL_CONSTANTS.POST, utils.path('/api/v1/teams/:id/memberships', { ':id': teamId }), null, body);
    },

  };

}

module.exports = Teams;
