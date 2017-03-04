const ServerModuleProvider = require('../../src/server/ServerModuleProvider');
const RoutesProvider = require('../../src/server/RoutesProvider');
const Server = require('../../src/server/Server');

describe('ServerModuleProvider', () => {
    it('should provide the module', () => {
        const module = ServerModuleProvider.create();
        expect(module.get('RoutesProvider') instanceof RoutesProvider).toBe(true);
        expect(module.get('Server') instanceof Server).toBe(true);
    });
});
