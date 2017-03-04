const ServerModuleProvider = require('./ServerModuleProvider');

function main() {
    const module = ServerModuleProvider.create();
    const routesProvider = module.get('RoutesProvider');
    const server = module.get('Server');
    routesProvider.provide(server);
    server.start();
}

main();
