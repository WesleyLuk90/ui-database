import { shallow } from 'enzyme';
import React from 'react';
import MultiDropdown from '../../../../src/client/components/elements/MultiDropdown';
import OptionSelector from '../../../../src/client/components/elements/OptionSelector';

describe('MultiDropdown', () => {
    let dropdown;
    beforeEach(() => {
        const options = ['a', 'b', 'c'];
        dropdown = shallow(<MultiDropdown options={options} value={['a', 'c']} />);
        dropdown.instance().input = jasmine.createSpyObj('input', ['focus']);
    });

    it('should expand when clicked', () => {
        expect(dropdown.find('.multi-dropdown--expanded')).not.toBePresent();
        dropdown.find('.multi-dropdown__toggle').simulate('click');
        expect(dropdown.find('.multi-dropdown--expanded')).toBePresent();
        expect(dropdown.instance().input.focus).toHaveBeenCalled();
    });

    it('should display options', () => {
        const options = dropdown.find('.multi-dropdown__toggle .multi-dropdown__selected');
        expect(options.length).toBe(2);
        expect(options.at(0).find('.multi-dropdown__value').text()).toBe('a');
        expect(options.at(1).find('.multi-dropdown__value').text()).toBe('c');

        dropdown.find('.multi-dropdown__toggle').simulate('click');

        const inputOptions = dropdown.find('.multi-dropdown__input-container .multi-dropdown__selected');
        expect(inputOptions.length).toBe(2);
        expect(inputOptions.at(0).find('.multi-dropdown__value').text()).toBe('a');
        expect(inputOptions.at(1).find('.multi-dropdown__value').text()).toBe('c');
    });

    it('should select options', () => {
        const onChange = jasmine.createSpy('onChange');
        dropdown = shallow(<MultiDropdown options={['a', 'b', 'c']} value={['a', 'c']} onChange={onChange} />);
        dropdown.find(OptionSelector).prop('onSelect')('b');
        expect(onChange).toHaveBeenCalledWith(['a', 'c', 'b']);
    });

    it('should remove options', () => {
        const onChange = jasmine.createSpy('onChange');
        dropdown = shallow(<MultiDropdown options={['a', 'b', 'c']} value={['a', 'c']} onChange={onChange} />);
        const options = dropdown.find('.multi-dropdown__toggle .multi-dropdown__selected');
        expect(options.length).toBe(2);
        options.at(1).find('.multi-dropdown__remove').simulate('click');
        expect(onChange).toHaveBeenCalledWith(['a']);
    });
});
