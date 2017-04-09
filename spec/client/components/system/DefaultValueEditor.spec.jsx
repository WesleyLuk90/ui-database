import { shallow } from 'enzyme';
import React from 'react';
import DefaultValueEditor from '../../../../src/client/components/system/DefaultValueEditor';
import FieldType from '../../../../src/client/models/FieldType';
import TextInputField from '../../../../src/client/components/fields/TextInputField';
import NumberInputField from '../../../../src/client/components/fields/NumberInputField';
import DatetimeField from '../../../../src/client/components/fields/DatetimeField';
import makeAppWithRoutes from '../../helpers/app';

describe('DefaultValueEditor', () => {
    let app;
    beforeEach(() => {
        app = makeAppWithRoutes();
    });
    it('should handle text fields', () => {
        const field = FieldType.getType('text').newField().setName('ABC');
        const onChange = jasmine.createSpy('onChange');
        const editor = shallow(<DefaultValueEditor field={field} value="abc" onChange={onChange} appModule={app} />);

        expect(editor.find(TextInputField)).toBePresent();
        const textField = editor.find(TextInputField);
        expect(textField.prop('value')).toBe('abc');
        textField.prop('onChange')('new val');
        expect(onChange).toHaveBeenCalledWith('new val');
        expect(textField.prop('label')).toBe('ABC');
    });

    it('should handle number fields', () => {
        const field = FieldType.getType('number').newField().setName('ABC');
        const onChange = jasmine.createSpy('onChange');
        const editor = shallow(<DefaultValueEditor field={field} value={1234} onChange={onChange} appModule={app} />);

        expect(editor.find(NumberInputField)).toBePresent();
        const numberField = editor.find(NumberInputField);
        expect(numberField.prop('value')).toBe(1234);
        numberField.prop('onChange')(456);
        expect(onChange).toHaveBeenCalledWith(456);
        expect(numberField.prop('label')).toBe('ABC');
    });

    it('should handle datetime fields', () => {
        const field = FieldType.getType('datetime').newField().setName('ABC');
        const onChange = jasmine.createSpy('onChange');
        const date = new Date();
        const editor = shallow(<DefaultValueEditor field={field} value={date} onChange={onChange} appModule={app} />);

        const newDate = new Date();

        expect(editor.find(DatetimeField)).toBePresent();
        const datetimeField = editor.find(DatetimeField);
        expect(datetimeField.prop('value')).toBe(date);
        datetimeField.prop('onChange')(newDate);
        expect(onChange).toHaveBeenCalledWith(newDate);
        expect(datetimeField.prop('label')).toBe('ABC');
    });
});
