const Database = require('../../src/server/Database');
const Config = require('../../src/server/Config');
const RoutesProvider = require('../../src/server/RoutesProvider');
const Server = require('../../src/server/Server');

module.exports = class ServerToolkit {
    static createServer() {
        const config = new Config();
        const routesProvider = new RoutesProvider(new Database(config));
        const server = new Server(config);

        routesProvider.provide(server);
        beforeEach(done => server.start().catch(fail).then(done));
        afterEach(done => server.stop().catch(fail).then(done));

        return server;
    }
};
