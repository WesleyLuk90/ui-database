import assert from 'assert';
import RoutingService from './RoutingService';

export default class UrlFactory {
    constructor(routingService) {
        assert(routingService instanceof RoutingService);
        this.routingService = routingService;
    }

    get(routeName, ...params) {
        return this._wrapPrefix(this.getReal(routeName, ...params));
    }

    getReal(routeName, ...params) {
        assert(typeof routeName === 'string');

        const route = this.routingService.getStateByName(routeName);
        assert(route, `Route with name '${routeName}' does not exist`);

        return this._makeUrl(route, params);
    }

    _wrapPrefix(url) {
        return `#${url}`;
    }

    _makeUrl(route, params) {
        assert(Array.isArray(params), 'Expected an array of params');
        assert(route._originalUrl, 'Urls can only be created for string urls');
        const originalUrl = route._originalUrl;
        const paramCount = params.length;
        const match = originalUrl.match(RoutingService.getShorthandRegex()) || [];
        assert(paramCount === match.length, `Wrong number of replacements, found ${match.length} in ${originalUrl} but got ${paramCount}`);

        let index = 0;
        return originalUrl.replace(RoutingService.getShorthandRegex(), () => params[index++]);
    }
}

UrlFactory.$name = 'UrlFactory';
UrlFactory.$inject = ['RoutingService'];
