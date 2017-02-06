import Bottle from 'bottlejs';
import assert from 'assert';

import LocationBinding from './bindings/LocationBinding';
import RoutingService from './services/RoutingService';
import StateBindings from './bindings/StateBindings';

Bottle.config.strict = true;

export default class AppModule {
    constructor() {
        this.bottle = this.bind();
    }

    bind() {
        const bottle = new Bottle();
        bottle.value('window', window);
        bottle.value('location', window.location);
        bottle.register(LocationBinding);
        bottle.register(RoutingService);
        bottle.register(StateBindings);
        return bottle;
    }

    get(dependency) {
        assert.ok(typeof dependency === 'string');
        return this.bottle.container[dependency];
    }
}
