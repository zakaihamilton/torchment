const { handleModule, setImportMethod } = require("./core/module");

setImportMethod(require);

/* require modules that you want active on the server */
require('./core/config');
require('./push/push');

module.exports = {
    handleModule
};
