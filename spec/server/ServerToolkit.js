const ModuleHarness = require('./ModuleHarness');

module.exports = class ServerToolkit {
    static createServer(callback) {
        const module = ModuleHarness.create();
        const routesProvider = module.get('RoutesProvider');
        const server = module.get('Server');
        if (callback) {
            callback(module);
        }

        routesProvider.provide(server);
        beforeEach(done => server.start().catch(fail).then(done));
        afterEach(done => server.stop().catch(fail).then(done));

        return server;
    }
};
