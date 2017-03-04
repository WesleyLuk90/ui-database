const SchemaController = require('../../src/server/SchemaController');
const SchemaStorage = require('../../src/server/SchemaStorage');
const Database = require('../../src/server/Database');
const Config = require('../../src/server/Config');
const Schema = require('../../src/server/Schema');
const ServerToolkit = require('./ServerToolkit');
const superagent = require('superagent');
const SchemaValidator = require('../../src/server/SchemaValidator');

describe('SchemaController', () => {
    let controller;
    let schemaStorage;
    let schemaValidator;
    beforeEach((done) => {
        schemaStorage = new SchemaStorage(new Database(new Config()));
        schemaValidator = new SchemaValidator();
        spyOn(schemaValidator, 'validate');
        controller = new SchemaController(schemaStorage, schemaValidator);
        schemaStorage.clear()
            .catch(fail)
            .then(done);
    });

    it('should create', (done) => {
        const request = {
            body: {
                name: 'my schema',
                id: 'my_schema',
                fields: [
                    { id: 'a' },
                    { id: 'b' },
                ],
            },
        };
        controller.create(request)
            .then((schema) => {
                expect(schemaValidator.validate).toHaveBeenCalled();
                expect(schema.getId()).toBe('my_schema');
                expect(schema.getName()).toBe('my schema');
                expect(schema.getFields().length).toBe(2);
                expect(schema.getFields()[0]).toEqual({ id: 'a' });
                expect(schema.getFields()[1]).toEqual({ id: 'b' });
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
                expect(schemaValidator.validate).toHaveBeenCalled();
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
                expect(schemaValidator.validate).not.toHaveBeenCalled();
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
                expect(schemaValidator.validate).not.toHaveBeenCalled();
                expect(Array.isArray(schemas)).toBe(true);
                expect(schemas.length).toBe(1);
                expect(schemas[0].getId()).toBe('my_schema');
                expect(schemas[0].getName()).toBe('my schema');
            })
            .catch(fail)
            .then(done);
    });

    describe('api', () => {
        const server = ServerToolkit.createServer();
        it('should expose get', (done) => {
            superagent.get(`${server.getBaseUrl()}/api/schema/invalid-schema-id`)
                .then((res) => {
                    expect(res.body).toEqual({
                        result: null,
                    });
                })
                .catch(fail)
                .then(done);
        });

        it('should expose create', (done) => {
            superagent.put(`${server.getBaseUrl()}/api/schema/`, { name: 'My Schema', id: 'my_schema', fields: [] })
                .then((res) => {
                    const schema = res.body.result;
                    expect(schema.name).toBe('My Schema');
                    expect(schema.id).toBe('my_schema');
                    expect(schema.fields).toEqual([]);
                })
                .catch(fail)
                .then(done);
        });

        it('should expose list', (done) => {
            superagent.get(`${server.getBaseUrl()}/api/schema/`)
                .then((res) => {
                    expect(res.body.result).toEqual([]);
                })
                .catch(fail)
                .then(done);
        });

        it('should update', (done) => {
            schemaStorage.create(Schema.create('My Schema', 'my_schema'))
                .then(() => superagent.post(`${server.getBaseUrl()}/api/schema/`, { id: 'my_schema', name: 'New Schema name', fields: [] }))
                .then((res) => {
                    expect(res.body.result).toEqual({ id: 'my_schema', name: 'New Schema name', fields: [], descriptor: [] });
                })
                .catch(fail)
                .then(done);
        });
    });
});
