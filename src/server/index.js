const Config = require('./Config');
const RoutesProvider = require('./RoutesProvider');
const Database = require('./Database');
const Server = require('./Server');

function main() {
    const config = new Config();
    const routesProvider = new RoutesProvider(new Database(config));
    const server = new Server(config);

    routesProvider.provide(server);

    server.start();
}

main();
