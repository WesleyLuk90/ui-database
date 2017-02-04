const SchemaController = require('../../src/server/SchemaController');
const SchemaStorage = require('../../src/server/SchemaStorage');
const Database = require('../../src/server/Database');
const Config = require('../../src/server/Config');
const Schema = require('../../src/server/Schema');

describe('SchemaController', () => {
    let controller;
    let schemaStorage;
    beforeEach((done) => {
        schemaStorage = new SchemaStorage(new Database(new Config()));
        controller = new SchemaController(schemaStorage);
        schemaStorage.clear()
            .catch(fail)
            .then(done);
    });

    it('should create', (done) => {
        const request = {
            body: {
                name: 'my schema',
                id: 'my_schema',
            },
        };
        controller.create(request)
            .then((schema) => {
                expect(schema.getId()).toBe('my_schema');
                expect(schema.getName()).toBe('my schema');
            })
            .catch(fail)
            .then(done);
    });

    it('should update', (done) => {
        const request = {
            body: {
                name: 'my schema',
                id: 'my_schema',
                fields: [{ id: 'f1', value: 'hi' }],
            },
        };
        schemaStorage.create(Schema.create('my schema', 'my_schema'))
            .then(() => controller.update(request))
            .then((schema) => {
                expect(schema.getId()).toBe('my_schema');
                expect(schema.getName()).toBe('my schema');
            })
            .catch(fail)
            .then(done);
    });

    it('should get', (done) => {
        const request = {
            params: {
                id: 'my_schema',
            },
        };
        schemaStorage.create(Schema.create('my schema', 'my_schema'))
            .then(() => controller.get(request))
            .then((schema) => {
                expect(schema.getId()).toBe('my_schema');
                expect(schema.getName()).toBe('my schema');
            })
            .catch(fail)
            .then(done);
    });

    it('should list', (done) => {
        const request = {};
        schemaStorage.create(Schema.create('my schema', 'my_schema'))
            .then(() => controller.list(request))
            .then((schemas) => {
                expect(Array.isArray(schemas)).toBe(true);
                expect(schemas.length).toBe(1);
                expect(schemas[0].getId()).toBe('my_schema');
                expect(schemas[0].getName()).toBe('my schema');
            })
            .catch(fail)
            .then(done);
    });
});
