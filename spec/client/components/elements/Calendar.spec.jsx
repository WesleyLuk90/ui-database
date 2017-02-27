import { shallow } from 'enzyme';
import React from 'react';
import moment from 'moment';
import Calendar from '../../../../src/client/components/elements/Calendar';

describe('Calendar', () => {
    it('should allow no value', () => {
        const onChange = jasmine.createSpy('onChange');
        const calendar = shallow(<Calendar onChange={onChange} />);

        expect(calendar.find('.calendar__date--selected')).not.toBePresent();
        expect(onChange).not.toHaveBeenCalled();
    });

    describe('displays month', () => {
        function assertMonth(calendar, date) {
            const month = calendar.find('.calendar__month');
            expect(month).toBePresent();
            expect(month.text()).toBe(date.format('MMMM YYYY'));
        }
        it('should default to the current month', () => {
            const calendar = shallow(<Calendar />);
            const now = moment();
            assertMonth(calendar, now);
        });

        it('should show to the current month value', () => {
            const now = moment().add(15, 'months');
            const calendar = shallow(<Calendar year={now.year()} month={now.month()} date={now.date()} />);
            assertMonth(calendar, now);
            const newDate = moment().clone().add(7, 'months');
            calendar.setProps({ year: newDate.year(), month: newDate.month(), date: newDate.date() });
            assertMonth(calendar, newDate);
        });
    });

    it('should select a date', () => {
        const date = moment('2017-02-26');
        const onChange = jasmine.createSpy('onChange');
        const calendar = shallow(<Calendar year={date.year()} month={date.month()} date={date.date()} onChange={onChange} />);
        calendar.find('tbody tr td button').at(9).prop('onClick')();

        expect(onChange).toHaveBeenCalledWith(2017, 1, 7);
        calendar.setProps({ year: 2017, month: 1, date: 7 });
        expect(calendar.find('.calendar__date--selected')).toBePresent();
        expect(calendar.find('.calendar__date--selected').text()).toBe('7');
    });
});
