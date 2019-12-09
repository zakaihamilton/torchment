const { handleModule } = require("./core/module");

/* require modules that you want active on the server */
require('./core/config');
require('./push/push');

module.exports = {
    handleModule
};
