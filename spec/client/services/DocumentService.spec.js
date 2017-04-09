import makeAppWithRoutes from '../helpers/app';
import Schema from '../../../src/client/models/Schema';

describe('DocumentService', () => {
    it('should send search requests', (done) => {
        const app = makeAppWithRoutes();
        const HttpService = app.get('HttpService');
        HttpService.get.and.returnValue(Promise.resolve({ result: [] }));
        const DocumentService = app.get('DocumentService');

        DocumentService.search(Schema.create().setId('abc'), 'hello world')
            .then(() => {
                expect(HttpService.get).toHaveBeenCalledWith('/api/document/abc/', { search: 'hello world' });
            })
            .catch(fail)
            .then(done);
    });
});
