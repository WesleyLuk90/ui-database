import React from 'react';
import { shallow } from 'enzyme';
import Q from 'q';
import NewDocument from '../../../../src/client/components/system/NewDocument';
import Schema from '../../../../src/client/models/Schema';
import app from '../../helpers/app';
import Document from '../../../../src/client/models/Document';

describe('NewDocument', () => {
    it('should go to the edit page once after creating successfully', (done) => {
        const schema = Schema.create().setId('abc');
        const doc = Document.fromJSON({
            id: 'def',
            data: {},
        }, schema);
        const appModule = app();
        const newSchema = shallow(<NewDocument appModule={appModule} schema={schema} />);
        const button = newSchema.find({ className: 'create-document' });
        expect(button).toBePresent();

        const documentService = appModule.get('DocumentService');
        const schemaService = appModule.get('SchemaService');

        spyOn(documentService, 'create').and.returnValue(Q.when(doc));
        spyOn(documentService, 'get').and.returnValue(Q.when(doc));
        spyOn(schemaService, 'get').and.returnValue(Q.when(schema));
        button.prop('onClick')()
            .then(() => {
                const routingService = appModule.get('RoutingService');
                const state = routingService.getState();
                expect(state.name).toBe('documents.edit');
                const params = routingService.getOriginalParams();
                expect(params[1]).toBe('abc');
                expect(params[2]).toBe('def');
            }).catch(fail)
            .then(done);
    });
});
