import Bottle from 'bottlejs';
import AppModule from './AppModule';

import LocationBinding from './bindings/LocationBinding';
import RoutingService from './services/RoutingService';
import StateBindings from './bindings/StateBindings';
import Logger from './services/Logger';

Bottle.config.strict = true;

export default class AppModuleProvider {
    static create() {
        const bottle = new Bottle();
        bottle.value('window', window);
        bottle.value('location', window.location);
        bottle.register(LocationBinding);
        bottle.register(RoutingService);
        bottle.register(StateBindings);
        bottle.register(Logger);
        return new AppModule(bottle);
    }
}
