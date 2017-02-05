import RoutingService from '../../../src/client/services/RoutingService';

describe('RoutingService', () => {
    it('should have defaults', () => {
        const router = new RoutingService();

        router.register({
            name: 'home',
            url: '/',
        });

        router.toUrl('/');

        expect(router.getState()).toEqual({ url: '/' });
        expect(router.getParams()).toEqual({});
    });
});
