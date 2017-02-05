import Q from 'q';
import RoutingService from '../../../src/client/services/RoutingService';

describe('RoutingService', () => {
    it('should have defaults', (done) => {
        const router = new RoutingService();

        router.register({
            name: 'home',
            url: '/',
        });

        router.toUrl('/')
            .then(() => {
                expect(router.getState()).toEqual({ name: 'home', url: '/' });
                expect(router.getParams()).toEqual(['/']);
                expect(router.getUrl()).toEqual('/');
            }).catch(fail).then(done);
    });

    it('should handle parameters', (done) => {
        const router = new RoutingService();

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
        const router = new RoutingService();

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
        const router = new RoutingService();

        router.register({ name: 'a', url: '/a' });
        router.register({ name: 'b', url: '/b' });
        router.register({ name: 'c', url: '/c' });

        router.toUrl('/b')
            .then(() => expect(router.getState()).toEqual({ name: 'b', url: '/b' }))
            .catch(fail)
            .then(done);
    });

    it('should match the whole route', (done) => {
        const router = new RoutingService();

        router.register({ name: 'a', url: '/a' });
        router.register({ name: 'b', url: /^\/b$/ });
        router.register({ name: 'b-d-e', url: '/b/d/e' });
        router.register({ name: 'c', url: '/c' });

        router.toUrl('/b/d/e')
            .then(() => expect(router.getState()).toEqual({ name: 'b-d-e', url: '/b/d/e' }))
            .catch(fail)
            .then(done);
    });

    it('should emit a stream of states', (done) => {
        const router = new RoutingService();

        router.register({ name: 'a', url: '/a' });
        router.register({ name: 'b', url: '/b' });

        const streamSpy = jasmine.createSpy('streamSpy');
        router.getStateStream().subscribe(streamSpy);

        router.toUrl('/a')
            .then(() => {
                expect(streamSpy).toHaveBeenCalledWith({ name: 'a', url: '/a' });
                streamSpy.calls.reset();
            })
            .then(() => router.toUrl('/b'))
            .then(() => {
                expect(streamSpy).toHaveBeenCalledWith({ name: 'b', url: '/b' });
            })
            .catch(fail)
            .then(done);
    });
});
