import { shallow } from 'enzyme';
import React from 'react';
import TimeSelector from '../../../../src/client/components/elements/TimeSelector';

describe('TimeSelector', () => {
    it('should default to midnight', () => {
        const selector = shallow(<TimeSelector />);
        expect(selector.find('.hours')).toBePresent();
        expect(selector.find('.hours').prop('value')).toBe('12');
        expect(selector.find('.minutes')).toBePresent();
        expect(selector.find('.minutes').prop('value')).toBe('00');
        expect(selector.find('.half-day')).toBePresent();
        expect(selector.find('.half-day').prop('value')).toBe('AM');
    });

    it('should call the callback', () => {
        const onChange = jasmine.createSpy('onChange');
        const selector = shallow(<TimeSelector onChange={onChange} />);
        selector.find('.hours').prop('onChange')('3');
        expect(onChange).toHaveBeenCalledWith(3, 0);
        selector.setProps({ hours: 3, minutes: 0 });
        expect(selector.find('.hours').prop('value')).toBe('3');
        expect(selector.find('.minutes').prop('value')).toBe('00');
        expect(selector.find('.half-day').prop('value')).toBe('AM');

        selector.find('.minutes').prop('onChange')('15');
        expect(onChange).toHaveBeenCalledWith(3, 15);
        selector.setProps({ hours: 3, minutes: 15 });
        expect(selector.find('.hours').prop('value')).toBe('3');
        expect(selector.find('.minutes').prop('value')).toBe('15');
        expect(selector.find('.half-day').prop('value')).toBe('AM');

        selector.find('.half-day').prop('onChange')('PM');
        expect(onChange).toHaveBeenCalledWith(15, 15);
        selector.setProps({ hours: 15, minutes: 15 });
        expect(selector.find('.hours').prop('value')).toBe('3');
        expect(selector.find('.minutes').prop('value')).toBe('15');
        expect(selector.find('.half-day').prop('value')).toBe('PM');

        selector.find('.hours').prop('onChange')('12');
        selector.setProps({ hours: 12, minutes: 15 });
        selector.find('.half-day').prop('onChange')('AM');
        expect(onChange).toHaveBeenCalledWith(0, 15);
        selector.setProps({ hours: 0, minutes: 15 });
        expect(selector.find('.hours').prop('value')).toBe('12');
        expect(selector.find('.minutes').prop('value')).toBe('15');
        expect(selector.find('.half-day').prop('value')).toBe('AM');
    });
});
