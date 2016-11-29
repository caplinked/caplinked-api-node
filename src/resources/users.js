var CL_CONSTANTS = require('../caplinked-constants');
var utils = require('../caplinked-utils');

function Users (client) {

  return {

    create: function (userSettings) {
      var body = {
        user: userSettings
      };
      return client.request(CL_CONSTANTS.POST, utils.path('/api/v1/users'), null, body);
    },

    info: function () {
      return client.request(CL_CONSTANTS.GET, utils.path('/api/v1/users/me'));
    },

    update: function (userSettings) {
      var body = {
        user: userSettings
      };
      return client.request(CL_CONSTANTS.PUT, utils.path('/api/v1/users/me'), null, body);
    }

  };

}

module.exports = Users;
