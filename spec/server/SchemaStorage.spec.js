const Schema = require('../../src/server/Schema');
const ModuleHarness = require('./ModuleHarness');

describe('SchemaStorage', () => {
    let schemaStorage;

    beforeEach((done) => {
        const module = ModuleHarness.create();
        schemaStorage = module.get('SchemaStorage');
        schemaStorage.clear()
            .catch(fail)
            .then(done);
    });

    it('should populate defaults for missing fields', (done) => {
        const schema = Schema.create('my-schema', 'my_schema');
        schemaStorage.create(schema)
            .then(() => expect(schema.getId()).toBeTruthy())
            .then(() => schemaStorage.get('my_schema'))
            .then((foundSchema) => {
                expect(foundSchema.getFields()).toEqual([]);
                expect(foundSchema.getDescriptor()).toEqual([]);
            })
            .catch(fail)
            .then(done);
    });

    it('should create schemas', (done) => {
        const schema = Schema.create('my-schema', 'my_schema')
            .setFields([{ id: 'a' }, { id: 'b' }])
            .setDescriptor(['a']);
        schemaStorage.create(schema)
            .then(() => expect(schema.getId()).toBeTruthy())
            .then(() => schemaStorage.get('my_schema'))
            .then(foundSchema => expect(foundSchema).toEqual(schema))
            .catch(fail)
            .then(done);
    });

    it('should fail inserting a duplicate schema', (done) => {
        const schema = Schema.create('My Schema', 'my_schema');

        schemaStorage.create(schema)
            .then(() => schemaStorage.create(schema))
            .then(fail)
            .catch(e => expect(e).toMatch(/Schema with id 'my_schema' already exists/))
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
        const schema = Schema.create('my-schema', 'my_schema')
            .setFields([])
            .setDescriptor([]);
        schemaStorage.create(schema)
            .then(() => {
                schema.setFields([{ type: 'String' }]);
                return schemaStorage.update(schema);
            })
            .then(updatedSchema => expect(updatedSchema instanceof Schema).toBe(true))
            .then(() => schemaStorage.get(schema.getId()))
            .then(foundSchema => expect(foundSchema).toEqual(schema))
            .catch(fail)
            .then(done);
    });

    it('should list schemas', (done) => {
        schemaStorage.create(Schema.create('my-schema', 'my_schema'))
            .then(() => schemaStorage.create(Schema.create('my-schema2', 'my_schema2')))
            .then(() => schemaStorage.list())
            .then(schemas => expect(schemas.length).toBe(2))
            .catch(fail)
            .then(done);
    });

    describe('integration test', () => {
        it('should do crud', (done) => {
            const schema = Schema.create('id', 'name')
                .setFields([])
                .setDescriptor([]);
            schemaStorage.create(schema)
                .then(() => schemaStorage.list())
                .then((schemas) => { expect(schemas).toContain(schema); })
                .then(() => {
                    const updatedSchema = schema.copy().setName('name2');
                    return schemaStorage.update(updatedSchema)
                        .then(() => schemaStorage.list())
                        .then((schemas) => {
                            expect(schemas).toContain(updatedSchema);
                            expect(schemas).not.toContain(schema);
                        });
                })
                .catch(fail)
                .then(done);
        });
    });

    describe('edge cases', () => {
        it('updating with no changes should not error', (done) => {
            const schema = Schema.create('id', 'name')
                .setFields([])
                .setDescriptor([]);

            schemaStorage.create(schema)
                .then(() => schemaStorage.update(schema))
                .catch(fail)
                .then(done);
        });
    });
});
