/* eslint-disable react/no-array-index-key */
import moment from 'moment';
import React from 'react';
import classnames from '../utils/classnames';

const WEEKS = 6;
const START_OF_WEEK = 0;
const DAYS_IN_WEEK = 7;

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.setVisibleDate(this.props.year, this.props.month);
        this.setCurrentDate(this.props.year, this.props.month, this.props.date);
    }

    componentWillReceiveProps(newProps) {
        if (this.state.visibleYear !== newProps.year || this.state.month !== newProps.month) {
            this.setVisibleDate(newProps.year, newProps.month);
        }
        this.setCurrentDate(newProps.year, newProps.month, newProps.date);
        this.forceUpdate();
    }

    setVisibleDate(year, month) {
        const now = moment();
        this.state.visibleYear = year == null ? now.year() : year;
        this.state.visibleMonth = month == null ? now.month() : month;
    }

    setCurrentDate(year, month, date) {
        this.state.year = year;
        this.state.month = month;
        this.state.date = date;
    }

    getFirstDay(currentDate) {
        const first = currentDate.clone().date(1);
        while (first.day() !== START_OF_WEEK) {
            first.subtract(1, 'day');
        }
        return first;
    }

    getDates(firstDate) {
        const currentDate = firstDate.clone();
        const weeks = [];
        for (let i = 0; i < WEEKS; i++) {
            const week = [];
            for (let j = 0; j < DAYS_IN_WEEK; j++) {
                week.push(currentDate.clone());
                currentDate.add(1, 'day');
            }
            weeks.push(week);
        }
        return weeks;
    }

    getHeader(firstDate) {
        const currentDate = firstDate.clone();
        const dates = [];
        for (let i = 0; i < DAYS_IN_WEEK; i++) {
            dates.push(currentDate.clone());
            currentDate.add(1, 'day');
        }
        return dates;
    }

    previous() {
        this.setState({ visibleMonth: this.state.visibleMonth - 1 });
    }

    next() {
        this.setState({ visibleMonth: this.state.visibleMonth + 1 });
    }

    generateWeek(week) {
        const visibleDate = this.getVisibleDate();
        const selectedDate = this.getSelectedDate();
        return week.map((day, j) => <td key={j}>
            <button className={this.dateClasses(day, visibleDate, selectedDate)} onClick={() => this.selectDate(day)}>{day.date()}</button>
        </td>);
    }

    selectDate(date) {
        this.props.onChange(date.year(), date.month(), date.date());
    }

    dateClasses(date, visibleDate, selectedDate) {
        return classnames('calendar__date', {
            'calendar__date--selected': date.isSame(selectedDate, 'day'),
            'calendar__date--far': !date.isSame(visibleDate, 'month'),
        });
    }

    generateCalendar(startDate) {
        return this.getDates(startDate).map((week, i) =>
            <tr key={i}>{this.generateWeek(week)}</tr>);
    }

    getVisibleDate() {
        return moment()
            .year(this.state.visibleYear)
            .month(this.state.visibleMonth)
            .date(1)
            .hour(12);
    }

    getSelectedDate() {
        if (this.state.date == null || this.state.month == null || this.state.year == null) {
            return moment.invalid();
        }
        return moment()
            .hour(12)
            .date(this.state.date)
            .month(this.state.month)
            .year(this.state.year);
    }

    render() {
        const visibleDate = this.getVisibleDate();
        const first = this.getFirstDay(visibleDate);
        return (<div className="calendar">
            <div className="calendar__header">
                <button onClick={() => this.previous()} className="calendar__previous"><span className="fa fa-chevron-left" /></button>
                <span className="calendar__month">{visibleDate.format('MMMM YYYY')}</span>
                <button onClick={() => this.next()} className="calendar__next"><span className="fa fa-chevron-right" /></button>
            </div>
            <table className="calendar__table">
                <thead>
                    <tr className="calendar__days">
                        {this.getHeader(first).map((day, j) => <th key={j}>{day.format('dd')}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {this.generateCalendar(first)}
                </tbody>
            </table>
            {JSON.stringify(this.state)}
        </div>);
    }
}

Calendar.propTypes = {
    year: React.PropTypes.number,
    month: React.PropTypes.number,
    date: React.PropTypes.number,
    onChange: React.PropTypes.func,
};

Calendar.defaultProps = {
    year: null,
    month: null,
    date: null,
    onChange: () => {},
};
