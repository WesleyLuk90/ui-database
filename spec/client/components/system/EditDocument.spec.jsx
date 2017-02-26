import React from 'react';
import { shallow } from 'enzyme';
import Q from 'q';
import EditDocument from '../../../../src/client/components/system/EditDocument';
import Schema from '../../../../src/client/models/Schema';
import app from '../../helpers/app';
import Document from '../../../../src/client/models/Document';

describe('EditDocument', () => {
    it('should go to the edit page once after creating successfully', (done) => {
        const schema = Schema.create().setId('abc');
        const doc = Document.fromJSON({
            id: 'def',
            data: {},
        }, schema);
        const appModule = app();
        const newSchema = shallow(<EditDocument appModule={appModule} document={doc} />);
        const button = newSchema.find({ className: 'save-document' });
        expect(button).toBePresent();

        const documentService = appModule.get('DocumentService');
        const schemaService = appModule.get('SchemaService');

        spyOn(documentService, 'update').and.returnValue(Q.when(doc));
        spyOn(documentService, 'list').and.returnValue(Q.when(doc));
        spyOn(schemaService, 'get').and.returnValue(Q.when(schema));
        button.prop('onClick')()
            .then(() => {
                const routingService = appModule.get('RoutingService');
                const state = routingService.getState();
                expect(state.name).toBe('documents.forschema');
                const params = routingService.getOriginalParams();
                expect(params[1]).toBe(schema.getId());
            }).catch(fail)
            .then(done);
    });
});
