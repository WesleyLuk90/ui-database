const bottlejs = require('bottlejs');
const assert = require('assert');
const ApiRouter = require('./ApiRouter');
const Config = require('./Config');
const Database = require('./Database');
const DocumentController = require('./DocumentController');
const DocumentStorage = require('./DocumentStorage');
const RoutesProvider = require('./RoutesProvider');
const Server = require('./Server');
const SchemaValidator = require('./SchemaValidator');
const SchemaStorage = require('./SchemaStorage');
const SchemaController = require('./SchemaController');

class ServerModuleProvider {
    static create() {
        bottlejs.config.strict = true;
        const bottle = new bottlejs.Bottle();
        bottle.register(ApiRouter);
        bottle.register(Config);
        bottle.register(Database);
        bottle.register(DocumentController);
        bottle.register(DocumentStorage);
        bottle.register(RoutesProvider);
        bottle.register(SchemaController);
        bottle.register(SchemaStorage);
        bottle.register(SchemaValidator);
        bottle.register(Server);
        return new ServerModuleProvider(bottle);
    }
    constructor(bottle) {
        this.bottle = bottle;
    }

    get(module) {
        assert(typeof module === 'string');
        const foundModule = this.bottle.container[module];
        assert(foundModule, `Unknown module ${module}`);
        return foundModule;
    }
};
