import RoutingService from '../../../src/client/services/RoutingService';
import UrlFactory from '../../../src/client/services/UrlFactory';
import Logger from '../../../src/client/services/Logger';

describe('UrlFactory', () => {
    let logger;
    beforeEach(() => {
        logger = new Logger();
        logger.disableLogging();
    });

    it('should get routes', () => {
        const routingService = new RoutingService(logger);
        routingService.register({
            name: 'my-route',
            url: '/a/b/c/d',
        });

        const urlFactory = new UrlFactory(routingService);

        const url = urlFactory.get('my-route');

        expect(url).toBe('#/a/b/c/d');
    });

    it('should get from shorthand', () => {
        const routingService = new RoutingService(logger);
        routingService.register({
            name: 'my-route',
            url: '/a/:b/c/:d',
        });

        const urlFactory = new UrlFactory(routingService);

        const url = urlFactory.get('my-route', 'hello', 'world');

        expect(url).toBe('#/a/hello/c/world');
    });
});
