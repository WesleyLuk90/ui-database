import makeAppWithRoutes from '../helpers/app';
import Schema from '../../../src/client/models/Schema';
import Document from '../../../src/client/models/Document';


describe('ReferenceOptionsProvider', () => {
    let app;
    let documentService;
    let schemaService;
    let schema;

    beforeEach(() => {
        app = makeAppWithRoutes();
        documentService = app.get('DocumentService');
        spyOn(documentService, 'search');
        schemaService = app.get('SchemaService');
        spyOn(schemaService, 'list');
        schema = Schema.create('name', 'id');
        schemaService.list.and.returnValue(Promise.resolve([schema]));
    });

    it('should list options and get them by label', (done) => {
        const options = app.get('ReferenceOptionsProvider').create('my_schema');
        const documents = [
            Document.fromSchema(schema).setId('a1').setDescriptor('a'),
            Document.fromSchema(schema).setId('b1').setDescriptor('b'),
            Document.fromSchema(schema).setId('c1').setDescriptor('c'),
        ];
        documentService.search.and.returnValue(documents);
        const provider = options.optionsProvider();
        expect(provider).toEqual(jasmine.any(Function));
        provider('some string')
            .then((foundOptions) => {
                expect(foundOptions).toEqual(['a', 'b', 'c']);
                expect(options.getOptionByLabel('b')).toEqual(documents[1]);
            })
            .catch(fail)
            .then(done);
    });
});
