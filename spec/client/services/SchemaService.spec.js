import Q from 'q';
import SchemaService from '../../../src/client/services/SchemaService';
import Schema from '../../../src/client/models/Schema';
import Field from '../../../src/client/models/Field';

describe('SchemaService', () => {
    const httpService = jasmine.createSpyObj([
        'post',
        'put',
        'get',
    ]);

    it('should create schemas', (done) => {
        const schema = Schema.create()
            .setName('My Schema')
            .setId('my_schema')
            .addField(Field.create('text').setName('Name').setId('name'))
            .setDescriptor(['j', 'k']);

        const schemaService = new SchemaService(httpService);
        httpService.put.and.callFake((url, data) => {
            expect(url).toEqual('/api/schema');
            expect(data).toEqual({
                name: 'My Schema',
                id: 'my_schema',
                fields: [{
                    name: 'Name',
                    type: 'text',
                    id: 'name',
                }],
                descriptor: ['j', 'k'],
            });
            return Q.when({
                result: {
                    name: 'My Schema',
                    id: 'my_schema',
                    fields: [{
                        name: 'Name',
                        type: 'text',
                        id: 'name',
                    }],
                    descriptor: ['j', 'k'],
                },
            });
        });
        schemaService.create(schema)
            .then((createdSchema) => {
                expect(createdSchema instanceof Schema).toBe(true);
                expect(createdSchema).toEqual(schema);
            })
            .catch(fail)
            .then(done);
    });

    it('should load schemas', (done) => {
        const schemaService = new SchemaService(httpService);
        httpService.get.and.callFake((url) => {
            expect(url).toBe('/api/schema');
            return Q.when({
                result: [
                    {
                        name: 'My Schema 1',
                        id: 'my_schema1',
                        fields: [{
                            name: 'Name',
                            type: 'text',
                            id: 'name',
                        }],
                        descriptor: ['a'],
                    },
                    {
                        name: 'My Schema 2',
                        id: 'my_schema2',
                        fields: [{
                            name: 'Name',
                            type: 'text',
                            id: 'name',
                        }],
                        descriptor: ['b'],
                    },
                ],
            });
        });
        schemaService.list()
            .then((schemas) => {
                expect(schemas.length).toBe(2);
                expect(schemas[0].getDescriptor()).toEqual(['a']);
                expect(schemas[1].getDescriptor()).toEqual(['b']);
            })
            .catch(fail)
            .then(done);
    });

    it('should get schemas', (done) => {
        const schemaService = new SchemaService(httpService);
        httpService.get.and.callFake((url) => {
            expect(url).toBe('/api/schema/abc');
            return Q.when({
                result: {
                    name: 'My Schema 1',
                    id: 'abc',
                    fields: [{
                        name: 'Name',
                        type: 'text',
                        id: 'name',
                    }],
                    descriptor: ['m'],
                },
            });
        });
        schemaService.get('abc')
            .then((schema) => {
                expect(schema instanceof Schema).toBe(true);
            })
            .catch(fail)
            .then(done);
    });

    it('should save schemas', (done) => {
        const schema = Schema.create()
            .setName('My Schema')
            .setId('my_schema')
            .addField(Field.create('text').setName('Name').setId('name'))
            .setDescriptor(['a', 'b']);

        const schemaService = new SchemaService(httpService);
        httpService.post.and.callFake((url) => {
            expect(url).toBe('/api/schema');
            return Q.when({
                result: {
                    name: 'My Schema',
                    id: 'my_schema',
                    fields: [{
                        name: 'Name',
                        type: 'text',
                        id: 'name',
                    }],
                    descriptor: ['a', 'b'],
                },
            });
        });
        schemaService.update(schema)
            .then((updatedSchema) => {
                expect(updatedSchema).toEqual(schema);
            })
            .catch(fail)
            .then(done);
    });
});
