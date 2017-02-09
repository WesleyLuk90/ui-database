import assert from 'assert';
import React from 'react';
import RoutingService from '../services/RoutingService';
import Home from '../components/Home';
import System from '../components/system/System';
import AppModule from '../AppModule';

export default class StateBindings {
    constructor(routingService) {
        assert.ok(routingService instanceof RoutingService);
        this.routingService = routingService;
    }

    bind(appModule) {
        assert(appModule instanceof AppModule);
        this.routingService.register({ name: 'schemas', url: '/schemas' });
        this.routingService.register({ name: 'system', url: '/system/', view: <System appModule={appModule} /> });
        this.routingService.register({ name: 'home', url: '/', default: '/', view: <Home /> });
    }
}

StateBindings.$name = 'StateBindings';
StateBindings.$inject = ['RoutingService'];
