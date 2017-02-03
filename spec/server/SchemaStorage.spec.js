const SchemaStorage = require('../../src/server/SchemaStorage');
const Database = require('../../src/server/Database');
const Config = require('../../src/server/Config');
const Schema = require('../../src/server/Schema');

describe('SchemaStorage', () => {
    let schemaStorage;

    beforeEach((done) => {
        schemaStorage = new SchemaStorage(new Database(new Config()));
        schemaStorage.clear()
            .catch(fail)
            .then(done);
    });

    it('should create schemas', (done) => {
        const schema = new Schema();
        schema.setName('my-schema');
        schemaStorage.create(schema)
            .then(() => expect(schema.getId()).toBeTruthy())
            .then(() => schemaStorage.get('my-schema'))
            .then(foundSchema => expect(foundSchema).toEqual(schema))
            .catch(fail)
            .then(done);
    });

    it('should fail inserting a duplicate schema', (done) => {
        const schema = new Schema();
        schema.setName('my-schema');
        schemaStorage.create(schema)
            .then(() => schemaStorage.create(schema))
            .then(fail)
            .catch(e => expect(e).toMatch(/Schema with name 'my-schema' already exists/))
            .catch(fail)
            .then(done);
    });

    it('should not find schemas that do not exist', (done) => {
        schemaStorage.get('other schema')
            .then(res => expect(res).toBe(null))
            .catch(fail)
            .then(done);
    });

    it('should update schemas', (done) => {
        const schema = new Schema();
        schema.setName('my-schema');
        schemaStorage.create(schema)
            .then(() => {
                schema.setFields([{ type: 'String' }]);
                return schemaStorage.update(schema);
            })
            .then(() => schemaStorage.get(schema.getName()))
            .then(foundSchema => expect(foundSchema).toEqual(schema))
            .catch(fail)
            .then(done);
    });
});
