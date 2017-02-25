import React from 'react';
import { shallow } from 'enzyme';
import Q from 'q';
import NewSchema from '../../../../src/client/components/system/NewSchema';
import Schema from '../../../../src/client/models/Schema';
import app from '../../helpers/app';

describe('NewSchema', () => {
    it('should go to the edit page once after creating successfully', (done) => {
        const appModule = app();
        const newSchema = shallow(<NewSchema appModule={appModule} />);
        const button = newSchema.find({ className: 'create-schema' });
        expect(button).toBePresent();

        const schemaService = appModule.get('SchemaService');
        spyOn(schemaService, 'create').and.returnValue(Q.when(Schema.create().setId('abc')));
        spyOn(schemaService, 'get').and.returnValue(Q.when(Schema.create().setId('abc')));
        button.prop('onClick')()
            .then(() => {
                const routingService = appModule.get('RoutingService');
                const state = routingService.getState();
                expect(state.name).toBe('schemas.edit');
                const params = routingService.getOriginalParams();
                expect(params[1]).toBe('abc');
            }).catch(fail)
            .then(done);
    });
});
