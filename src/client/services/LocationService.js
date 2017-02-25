import assert from 'assert';
import RoutingService from './RoutingService';
import UrlFactory from './UrlFactory';

export default class LocationService {
    constructor(routingService, urlFactory) {
        assert(routingService instanceof RoutingService);
        assert(urlFactory instanceof UrlFactory);
        this.routingService = routingService;
        this.urlFactory = urlFactory;
    }

    toState(stateName, ...params) {
        const url = this.urlFactory.getReal(stateName, ...params);
        return this.routingService.toUrl(url);
    }
}

LocationService.$name = 'LocationService';
LocationService.$inject = ['RoutingService', 'UrlFactory'];
