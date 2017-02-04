const SchemaController = require('../../src/server/SchemaController');
const SchemaStorage = require('../../src/server/SchemaStorage');
const Database = require('../../src/server/Database');
const Config = require('../../src/server/Config');
const Schema = require('../../src/server/Schema');
const ServerToolkit = require('./ServerToolkit');
const superagent = require('superagent');

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
            superagent.put(`${server.getBaseUrl()}/api/schema/`, { name: 'My Schema', id: 'my_schema' })
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

        it('should handle errors', (done) => {
            superagent.post(`${server.getBaseUrl()}/api/schema/`, { id: 'invalid_id', name: 'thing', fields: [] })
                .then(fail)
                .catch((e) => {
                    expect(e.status).toBe(400);
                    expect(e.response.body.error.message).toMatch(/No schema with id 'invalid_id' found/);
                })
                .catch(fail)
                .then(done);
        });
    });
});
