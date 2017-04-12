import React from 'react';
import { shallow } from 'enzyme';
import FieldTypePicker from '../../../../src/client/components/system/FieldTypePicker';
import FieldType from '../../../../src/client/models/FieldType';

describe('FieldTypePicker', () => {
    it('should display when clicked', () => {
        const picker = shallow(<FieldTypePicker onSelect={() => {}} />);
        expect(picker.find('.field-type-picker--expanded')).not.toBePresent();
        picker.find('.field-type-picker__toggle').simulate('click');
        expect(picker.find('.field-type-picker--expanded')).toBePresent();
        picker.find('.field-type-picker__toggle').simulate('click');
        expect(picker.find('.field-type-picker--expanded')).not.toBePresent();
    });

    it('should list the field types', () => {
        const picker = shallow(<FieldTypePicker onSelect={() => {}} />);
        const option = picker
            .find('.field-type-picker__options')
            .filterWhere(e => e.text().indexOf('Text') > -1);
        expect(option).toBePresent();
    });

    it('should select the field type when clicked', () => {
        const onSelect = jasmine.createSpy('onSelect');
        const picker = shallow(<FieldTypePicker onSelect={onSelect} />);
        const textField = FieldType.getType('text');
        const option = picker
            .find('.field-type-picker__options')
            .findWhere(e => e.key() === textField.getId())
            .find('a');
        expect(option).toBePresent();

        option.simulate('click');
        expect(onSelect).toHaveBeenCalledWith(textField);
    });
});
