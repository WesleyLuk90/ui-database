import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import DatetimePicker from '../../../../src/client/components/elements/DatetimePicker';

describe('DatetimePicker', () => {
    const DATE_FORMAT = 'YYYY-MM-DD h:mm a';

    it('should have an input with an empty value', () => {
        const picker = shallow(<DatetimePicker />);
        expect(picker.find('input')).toBePresent();
        expect(picker.find('input').prop('value')).toBe('');
    });

    it('should have an input with the value', () => {
        const date = moment();
        const picker = shallow(<DatetimePicker value={date.toDate()} />);
        expect(picker.find('input').prop('value')).toBe(date.format(DATE_FORMAT));
    });

    it('should allow typing in a value', () => {
        const date = moment();
        const onChange = jasmine.createSpy();
        const picker = shallow(<DatetimePicker value={date.toDate()} onChange={onChange} />);
        const anotherDate = '2017-04-08 8:30 am';
        const momentAnotherDate = moment(anotherDate, DATE_FORMAT);

        picker.find('.datetime-picker__value').simulate('change', { target: { value: anotherDate } });
        picker.find('.datetime-picker__value').simulate('blur');

        expect(onChange).toHaveBeenCalledWith(momentAnotherDate.toDate());

        picker.props('value', momentAnotherDate.toDate());
        expect(picker.find('.datetime-picker__value').prop('value')).toBe(momentAnotherDate.format('YYYY-MM-DD h:mm a'));
    });
});
