import AppModule from '../../src/client/AppModule';

describe('AppModule', () => {
    it('should ensure dependencies', () => {
        const appModule = new AppModule({ container: {} });
        expect(() => appModule.get()).toThrowError(/Requires a dependency name/);
        expect(() => appModule.get('stuff')).toThrowError(/Unknown dependency 'stuff'/);
    });
});
