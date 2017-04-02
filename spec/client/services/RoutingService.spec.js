import Q from 'q';
import RoutingService from '../../../src/client/services/RoutingService';
import Logger from '../../../src/client/services/Logger';

describe('RoutingService', () => {
    let logger;
    beforeEach(() => {
        logger = new Logger();
        logger.disableLogging();
    });

    it('should have defaults', (done) => {
        const router = new RoutingService(logger);

        router.register({
            name: 'home',
            url: '/',
        });

        router.toUrl('/')
            .then(() => {
                expect(router.getState().name).toEqual('home');
                expect(router.getParams()).toEqual(['/']);
                expect(router.getUrl()).toEqual('/');
            }).catch(fail).then(done);
    });

    it('should require a name', () => {
        const router = new RoutingService(logger);
        expect(() => router.register({ url: 'things' })).toThrowError(/State requires a name/);
    });

    it('should get routes', () => {
        const router = new RoutingService(logger);
        const route = {
            name: 'page',
            url: /\/stuff\/(\w+)\/(\w+)/,
        };
        router.register(route);

        expect(router.getStateByName('page')).toEqual(route);
    });

    it('should handle parameters', (done) => {
        const router = new RoutingService(logger);

        router.register({
            name: 'page',
            url: /\/stuff\/(\w+)\/(\w+)/,
        });

        router.toUrl('/stuff/hello/world')
            .then(() => {
                expect(router.getState().name).toEqual('page');
                expect(router.getParams()).toEqual(['/stuff/hello/world', 'hello', 'world']);
                expect(router.getUrl()).toEqual('/stuff/hello/world');
            }).catch(fail).then(done);
    });

    it('should load params', (done) => {
        const router = new RoutingService(logger);

        router.register({
            name: 'page',
            url: /^\/stuff\/(\w+)\/(\w+)$/,
            onEnter(params) {
                return {
                    greeting: Q.resolve('value'),
                    hello: params[1],
                    world: params[2],
                };
            },
        });

        router.toUrl('/stuff/hello/world')
            .then(() => {
                expect(router.getState().name).toEqual('page');
                expect(router.getParams()).toEqual({
                    greeting: 'value',
                    hello: 'hello',
                    world: 'world',
                });
                expect(router.getUrl()).toEqual('/stuff/hello/world');
            }).catch(fail).then(done);
    });

    it('should match multiple routes', (done) => {
        const router = new RoutingService(logger);

        router.register({ name: 'a', url: '/a' });
        router.register({ name: 'b', url: '/b' });
        router.register({ name: 'c', url: '/c' });

        router.toUrl('/b')
            .then(() => expect(router.getState().name).toEqual('b'))
            .catch(fail)
            .then(done);
    });

    it('should allow shorthand parameters', (done) => {
        const router = new RoutingService(logger);

        router.register({ name: 'a', url: '/a/:b/:c' });

        router.toUrl('/a/b-9b2b/a-1-__S-2')
            .then(() => {
                expect(router.getState().name).toEqual('a');
                expect(router.getParams()).toEqual(['/a/b-9b2b/a-1-__S-2', 'b-9b2b', 'a-1-__S-2']);
            })
            .catch(fail)
            .then(done);
    });

    it('should match the whole route', (done) => {
        const router = new RoutingService(logger);

        router.register({ name: 'a', url: '/a' });
        router.register({ name: 'b', url: /^\/b$/ });
        const matchingRoute = { name: 'b-d-e', url: '/b/d/e' };
        router.register(matchingRoute);
        router.register({ name: 'c', url: '/c' });

        router.toUrl('/b/d/e')
            .then(() => expect(router.getState()).toBe(matchingRoute))
            .catch(fail)
            .then(done);
    });

    it('should use the default state', (done) => {
        const router = new RoutingService(logger);
        router.register({ name: 'a', url: '/a' });
        router.register({ name: 'b', url: '/b', default: '/b' });

        router.toUrl('/c')
            .then(() => {
                expect(router.getState().name).toBe('b');
                expect(router.getUrl()).toBe('/b');
            })
            .catch(fail)
            .then(done);
    });

    it('should throw an error on duplicate name', () => {
        const router = new RoutingService(logger);
        router.register({ name: 'a', url: '/a' });
        expect(() => router.register({ name: 'a', url: '/a' })).toThrowError(/Duplicate state name 'a'/);
    });

    it('should emit a stream of states', (done) => {
        const router = new RoutingService(logger);

        const aRoute = { name: 'a', url: '/a' };
        const bRoute = { name: 'b', url: '/b' };

        router.register(aRoute);
        router.register(bRoute);

        const streamSpy = jasmine.createSpy('streamSpy');
        router.getStateStream().subscribe(streamSpy);

        router.toUrl('/a')
            .then(() => {
                expect(streamSpy).toHaveBeenCalledWith(aRoute);
                expect(streamSpy).not.toHaveBeenCalledWith(bRoute);
                streamSpy.calls.reset();
            })
            .then(() => router.toUrl('/b'))
            .then(() => {
                expect(streamSpy).toHaveBeenCalledWith(bRoute);
                expect(streamSpy).not.toHaveBeenCalledWith(aRoute);
            })
            .catch(fail)
            .then(done);
    });

    it('should resolve onEnter before loading the state', (done) => {
        const router = new RoutingService(logger);

        const resolver = jasmine.createSpy('resolver');

        const aRoute = {
            name: 'a',
            url: '/a',
            onEnter: () => Q.delay(0)
                .then(() => expect(router.getState()).toBe(null))
                .then(resolver),
        };

        router.register(aRoute);

        router.toUrl('/a')
            .then(() => expect(resolver).toHaveBeenCalled())
            .catch(fail)
            .then(done);
    });

    it('should emit errors when resolving onEnter', (done) => {
        const router = new RoutingService(logger);
        const spy = jasmine.createSpy('errorStream');
        router.getErrorStream().subscribe(spy);

        const error = new Error('some error');
        const aRoute = {
            name: 'a',
            url: '/a',
            onEnter: () => Q.reject(error),
        };

        router.register(aRoute);

        router.toUrl('/a')
            .then(fail)
            .catch(() => expect(spy).toHaveBeenCalledWith(error))
            .catch(fail)
            .then(done);
    });
});
