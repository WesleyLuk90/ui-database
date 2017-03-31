import { shallow } from 'enzyme';
import React from 'react';
import MultiDropdown from '../../../../src/client/components/elements/MultiDropdown';

describe('MultiDropdown', () => {
    let dropdown;
    beforeEach(() => {
        const options = ['a', 'b'];
        dropdown = shallow(<MultiDropdown options={options} value={['a']} />);
        dropdown.instance().input = jasmine.createSpyObj('input', ['focus']);
    });

    it('should expand when clicked', () => {
        expect(dropdown.find('.multi-dropdown--expanded')).not.toBePresent();
        dropdown.find('.multi-dropdown__toggle').simulate('click');
        expect(dropdown.find('.multi-dropdown--expanded')).toBePresent();
        expect(dropdown.instance().input.focus).toHaveBeenCalled();
    });

    it('should display options', () => {
        const options = dropdown.find('.multi-dropdown__selected');
        expect(options.length).toBe(2);
        expect(options.at(0).find('.multi-dropdown__value').text()).toBe('a');
        expect(options.at(1).find('.multi-dropdown__value').text()).toBe('b');
    });
});
