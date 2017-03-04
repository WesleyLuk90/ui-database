const ServerModuleProvider = require('../../src/server/ServerModuleProvider');

class ModuleHarness {
    static create() {
        return ServerModuleProvider.create();
    }
}
module.exports = ModuleHarness;
