var objectMerge = require('object-merge');

module.exports = objectMerge(
    require('./folders')(),
    require('./files')()
);
