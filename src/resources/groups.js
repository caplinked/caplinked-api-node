var CL_CONSTANTS = require('../caplinked-constants');
var utils = require('../caplinked-utils');

function Groups (client) {

  return {

    list: function (workspaceId) {
      var queryParams = {
        workspace_id: workspaceId
      };
      return client.request(CL_CONSTANTS.GET, utils.path('/api/v1/groups'), queryParams);
    },

    create: function (groupSettings) {
      var body = {
        group: groupSettings
      };
      return client.request(CL_CONSTANTS.POST, utils.path('/api/v1/groups'), null, body);
    },

    get: function (groupId, workspaceId) {
      var queryParams = {
        workspace_id: workspaceId
      };
      return client.request(CL_CONSTANTS.GET, utils.path('/api/v1/groups/:id', { ':id': groupId }), queryParams);
    },

    update: function (groupId, workspaceId, groupSettings) {
      var body = {
        workspace_id: workspaceId,
        group: groupSettings
      };
      return client.request(CL_CONSTANTS.PUT, utils.path('/api/v1/groups/:id', { ':id': groupId }), null, body);
    },

    delete: function (groupId, workspaceId) {
      var body = {
        workspace_id: workspaceId
      };
      return client.request(CL_CONSTANTS.DELETE, utils.path('/api/v1/groups/:id', { ':id': groupId }), null, body);
    },

    removeUserFromGroup: function (groupId, workspaceId, userId) {
      var body = {
        workspace_id: workspaceId,
        user_id: userId
      };
      return client.request(CL_CONSTANTS.DELETE, utils.path('/api/v1/groups/:id/memberships', { ':id': groupId }), null, body);
    },

    listMemberships: function (groupId, workspaceId) {
      var queryParams = {
        workspace_id: workspaceId
      };
      return client.request(CL_CONSTANTS.GET, utils.path('/api/v1/groups/:id/memberships', { ':id': groupId }), queryParams);
    },

    addUserToGroup: function (groupId, workspaceId, userId, sendEmail) {
      var body = {
        workspace_id: workspaceId,
        user_id: userId,
        send_email: sendEmail
      };
      return client.request(CL_CONSTANTS.POST, utils.path('/api/v1/groups/:id/memberships', { ':id': groupId }), null, body);
    },

    updateDrm: function (groupId, workspaceId, groupDrmSettings) {
      var body = {
        workspace_id: workspaceId,
        group: groupDrmSettings
      };
      return client.request(CL_CONSTANTS.PUT, utils.path('/api/v1/groups/:id/drm', { ':id': groupId }), null, body);
    },

    disableDrmExpiration: function (groupId, workspaceId) {
      var body = {
        workspace_id: workspaceId
      };
      return client.request(CL_CONSTANTS.PUT, utils.path('/api/v1/groups/:id/disable_drm_expiration', { ':id': groupId }), null, body);
    },

    updateWatermarkSetting: function (groupId, workspaceId, enableWatermark) {
      var body = {
        workspace_id: workspaceId,
        group: {
          watermarking: !!enableWatermark
        }
      };
      return client.request(CL_CONSTANTS.PUT, utils.path('/api/v1/groups/:id/watermarking', { ':id': groupId }), null, body);
    },

    enableAccessExpiration: function (groupId, workspaceId, expirationDate) {
      var body = {
        workspace_id: workspaceId,
        group: {
          expire_workspace_access_at: expirationDate
        }
      };
      return client.request(CL_CONSTANTS.PUT, utils.path('/api/v1/groups/:id/enable_expire_access', { ':id': groupId }), null, body);
    },

    disableAccessExpiration: function (groupId, workspaceId) {
      var body = {
        workspace_id: workspaceId
      };
      return client.request(CL_CONSTANTS.PUT, utils.path('/api/v1/groups/:id/disable_expire_access', { ':id': groupId }), null, body);
    }

  };

}

module.exports = Groups;
