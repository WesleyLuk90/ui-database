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
        const schema = Schema.create();
        schema.setName('My Schema');
        schema.setId('my_schema');
        schema.addField(Field.create('text').setName('Name').setId('name'));

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
                    },
                    {
                        name: 'My Schema 2',
                        id: 'my_schema2',
                        fields: [{
                            name: 'Name',
                            type: 'text',
                            id: 'name',
                        }],
                    },
                ],
            });
        });
        schemaService.list()
            .then((schemas) => {
                expect(schemas.length).toBe(2);
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
        const schema = Schema.create();
        schema.setName('My Schema');
        schema.setId('my_schema');
        schema.addField(Field.create('text').setName('Name').setId('name'));

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
