const bottlejs = require('bottlejs');
const assert = require('assert');
const Config = require('./Config');
const Database = require('./Database');
const DocumentController = require('./DocumentController');
const DocumentStorage = require('./DocumentStorage');
const RoutesProvider = require('./RoutesProvider');
const Server = require('./Server');
const SchemaValidator = require('./SchemaValidator');
const SchemaStorage = require('./SchemaStorage');
const SchemaController = require('./SchemaController');
const DescriptorPopulator = require('./DescriptorPopulator');
const DocumentCollectionProvider = require('./DocumentCollectionProvider');

class ServerModuleProvider {
    static create() {
        bottlejs.config.strict = true;
        const module = new ServerModuleProvider();
        module.register(Config);
        module.register(Database);
        module.register(DocumentController);
        module.register(DocumentStorage);
        module.register(RoutesProvider);
        module.register(SchemaController);
        module.register(SchemaStorage);
        module.register(SchemaValidator);
        module.register(DescriptorPopulator);
        module.register(DocumentCollectionProvider);
        module.register(Server);
        return module;
    }
    constructor() {
        this.bottle = new bottlejs.Bottle();
    }

    register(klass) {
        if (!klass.$name) {
            throw new Error(`Injected class is missing name ${klass}`);
        }
        this.bottle.register(klass);
    }

    get(module) {
        assert(typeof module === 'string');
        const foundModule = this.bottle.container[module];
        assert(foundModule, `Unknown module ${module}`);
        return foundModule;
    }
}

module.exports = ServerModuleProvider;
