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
        schema = Schema.create().setName('schema name').setId('my_schema');
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
                expect(documentService.search).toHaveBeenCalledWith(schema, 'some string');
            })
            .catch(fail)
            .then(done);
    });

    it('should load a label', (done) => {
        const options = app.get('ReferenceOptionsProvider').create('my_schema');
        const doc = Document.fromSchema(schema).setId('b1').setDescriptor('b');
        spyOn(documentService, 'get').and.returnValue(doc);

        options.getLabel(doc.toReference())
            .then((label) => {
                expect(label).toBe('b');
                expect(documentService.get).toHaveBeenCalledWith('my_schema', 'b1');
            })
            .catch(fail)
            .then(done);
    });

    it('should return a label if it already exists', (done) => {
        const options = app.get('ReferenceOptionsProvider').create('my_schema');
        const documents = [
            Document.fromSchema(schema).setId('a1').setDescriptor('a'),
            Document.fromSchema(schema).setId('b1').setDescriptor('b'),
            Document.fromSchema(schema).setId('c1').setDescriptor('c'),
        ];
        documentService.search.and.returnValue(documents);

        options.optionsProvider()('')
            .then(() => options.getLabel(documents[1].toReference()))
            .then(label => expect(label).toBe('b'))
            .catch(fail)
            .then(done);
    });
});
