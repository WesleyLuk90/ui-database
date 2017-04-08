import { shallow } from 'enzyme';
import React from 'react';
import DefaultValueEditor from '../../../../src/client/components/system/DefaultValueEditor';
import FieldType from '../../../../src/client/models/FieldType';
import TextInputField from '../../../../src/client/components/fields/TextInputField';
import NumberInputField from '../../../../src/client/components/fields/NumberInputField';

describe('DefaultValueEditor', () => {
    it('should handle text fields', () => {
        const field = FieldType.getType('text').newField().setName('ABC');
        const onChange = jasmine.createSpy('onChange');
        const editor = shallow(<DefaultValueEditor field={field} value="abc" onChange={onChange} />);

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
        const editor = shallow(<DefaultValueEditor field={field} value={1234} onChange={onChange} />);

        expect(editor.find(NumberInputField)).toBePresent();
        const numberField = editor.find(NumberInputField);
        expect(numberField.prop('value')).toBe(1234);
        numberField.prop('onChange')(456);
        expect(onChange).toHaveBeenCalledWith(456);
        expect(numberField.prop('label')).toBe('ABC');
    });
});
