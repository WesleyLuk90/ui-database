import assert from 'assert';
import React from 'react';
import RoutingService from '../services/RoutingService';
import Home from '../components/Home';
import System from '../components/system/System';
import AppModule from '../AppModule';
import Schemas from '../components/system/Schemas';
import NewSchema from '../components/system/NewSchema';

export default class StateBindings {
    constructor(routingService) {
        assert.ok(routingService instanceof RoutingService);
        this.routingService = routingService;
    }

    bind(appModule) {
        assert(appModule instanceof AppModule);
        this.routingService.register({ name: 'schemas', url: '/schemas' });
        this.routingService.register({ name: 'system', url: '/system/', view: <System appModule={appModule} /> });
        this.routingService.register({ name: 'schemas', url: '/system/schemas/', view: <Schemas appModule={appModule} /> });
        this.routingService.register({ name: 'schemas.create', url: '/system/schemas/create', view: <NewSchema appModule={appModule} /> });
        this.routingService.register({ name: 'home', url: '/', default: '/', view: <Home /> });
    }
}

StateBindings.$name = 'StateBindings';
StateBindings.$inject = ['RoutingService'];
