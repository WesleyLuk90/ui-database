import { shallow } from 'enzyme';
import React from 'react';
import Dropdown from '../../../../src/client/components/elements/Dropdown';
import OptionSelector from '../../../../src/client/components/elements/OptionSelector';

describe('Dropdown', () => {
    it('should list options when using an option getter', () => {
        const getter = jasmine.createSpy('optionsGetter');

        const dropdown = shallow(<Dropdown value="" options={getter} />);
        dropdown.instance().input = jasmine.createSpyObj('input', ['focus']);
        dropdown.find('.dropdown__toggle').simulate('click');

        expect(dropdown.instance().input.focus).toHaveBeenCalled();
        const optionSelector = dropdown.find(OptionSelector);
        expect(optionSelector).toBePresent();
        expect(optionSelector.prop('options')).toBe(getter);
    });

    it('should display a placeholder', () => {
        const dropdown = shallow(<Dropdown value="" options={['a', 'b']} />);
        expect(dropdown.find('.dropdown__placeholder')).toBePresent();
        expect(dropdown.find('.dropdown__placeholder').text()).toBe('Select a value...');
        dropdown.setProps({ placeholder: 'abc' });
        expect(dropdown.find('.dropdown__placeholder').text()).toBe('abc');
        dropdown.setProps({ value: 'c' });
        expect(dropdown.find('.dropdown__placeholder')).not.toBePresent();
    });
});
