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
                schema: {
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
});
