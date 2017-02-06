import assert from 'assert';
import RoutingService from '../services/RoutingService';

export default class StateBindings {
    constructor(routingService) {
        assert.ok(routingService instanceof RoutingService);
        this.routingService = routingService;
    }

    bind() {
        this.routingService.register({ name: 'schemas', url: '/schemas' });
        this.routingService.register({ name: 'home', url: '/', default: '/' });
    }
}

StateBindings.$name = 'StateBindings';
StateBindings.$inject = ['RoutingService'];
