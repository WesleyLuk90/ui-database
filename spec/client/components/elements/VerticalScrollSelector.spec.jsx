import { shallow } from 'enzyme';
import React from 'react';
import VerticalScrollSelector from '../../../../src/client/components/elements/VerticalScrollSelector';

describe('VerticalScrollSelector', () => {
    const options = [
        'aa',
        'bb',
        'cc',
        'dd',
    ];

    it('should display the current value', () => {
        const selector = shallow(<VerticalScrollSelector className="value" options={options} value="aa" />)
        expect(selector.find('.value')).toBePresent();
        expect(selector.find('.value').text()).toBe('aa');
        selector.setProps({ value: 'cc' });
        expect(selector.find('.value').text()).toBe('cc');
    });

    it('should go to the next value', () => {
        const onChange = jasmine.createSpy('onChange');
        const selector = shallow(<VerticalScrollSelector className="value" options={options} value="aa" onChange={onChange} />)
        expect(selector.find('.next-value')).toBePresent();
        selector.find('.next-value').simulate('click');
        expect(onChange).toHaveBeenCalledWith('dd');
    });

    it('should go to the previous value', () => {
        const onChange = jasmine.createSpy('onChange');
        const selector = shallow(<VerticalScrollSelector className="value" options={options} value="dd" onChange={onChange} />)
        expect(selector.find('.previous-value')).toBePresent();
        selector.find('.previous-value').simulate('click');
        expect(onChange).toHaveBeenCalledWith('aa');
    });
});
