import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import DatetimePicker from '../../../../src/client/components/elements/DatetimePicker';

describe('DatetimePicker', () => {
    it('should have an input with an empty value', () => {
        const picker = shallow(<DatetimePicker />);
        expect(picker.find('input')).toBePresent();
        expect(picker.find('input').prop('value')).toBe('');
    });

    it('should have an input with the value', () => {
        const date = moment();
        const picker = shallow(<DatetimePicker value={date.toDate()} />);
        expect(picker.find('input').prop('value')).toBe(date.format('YYYY-MM-DD h:mm a'));
    });
});
