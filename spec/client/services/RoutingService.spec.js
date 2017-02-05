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
            url: /\/stuff\/(\w+)\/(\w+)/,
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
});
