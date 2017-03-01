import React from 'react';
import _ from 'lodash';
import VerticalScrollSelector from './VerticalScrollSelector';

const HOURS = [];
for (let i = 1; i <= 12; i++) {
    HOURS.push(`${i}`);
}
const MINUTES = [];
for (let i = 0; i < 60; i++) {
    MINUTES.push(_.padStart(i, 2, '0'));
}
const HALF_DAYS = ['AM', 'PM'];

export default class TimeSelector extends React.Component {
    getHours() {
        if (this.props.hour == null) {
            return '12';
        }
        const hour = parseInt(this.props.hour, 10);
        if (hour === 0 || hour === 12) {
            return '12';
        }
        if (hour > 0 && hour < 24) {
            return `${hour % 12}`;
        }
        return '12';
    }

    getMinutes() {
        if (this.props.minute == null) {
            return '00';
        }
        const minute = parseInt(this.props.minute, 10);
        if (minute >= 0 && minute < 60) {
            return _.padStart(minute, 2, '0');
        }
        return '00';
    }

    getHalfDay() {
        if (this.props.hour == null) {
            return 'AM';
        }
        if (this.props.hour >= 0 && this.props.hour < 12) {
            return 'AM';
        }
        return 'PM';
    }

    setHours(hour) {
        this.triggerOnChange(hour, this.getMinutes(), this.getHalfDay());
    }

    setMinutes(minute) {
        this.triggerOnChange(this.getHours(), minute, this.getHalfDay());
    }

    setHalfDay(halfDay) {
        this.triggerOnChange(this.getHours(), this.getMinutes(), halfDay);
    }

    triggerOnChange(newHours, newMinutes, halfDay) {
        let hour = parseInt(newHours, 10);
        const minute = parseInt(newMinutes, 10);
        if (halfDay === 'AM') {
            if (hour === 12) {
                hour -= 12;
            }
        } else if (hour !== 12) {
            hour += 12;
        }
        this.props.onChange(hour, minute);
    }

    render() {
        return (<div className="time-selector">
            <div className="hours-selector">
                <VerticalScrollSelector value={this.getHours()} className="hours" options={HOURS} onChange={v => this.setHours(v)} />
            </div>
            <div className="minutes-selector">
                <VerticalScrollSelector value={this.getMinutes()} className="minutes" options={MINUTES} onChange={v => this.setMinutes(v)} />
            </div>
            <div className="half-day-selector">
                <VerticalScrollSelector value={this.getHalfDay()} className="half-day" options={HALF_DAYS} onChange={v => this.setHalfDay(v)} />
            </div>
        </div>);
    }
}

TimeSelector.propTypes = {
    onChange: React.PropTypes.func,
    hour: React.PropTypes.number,
    minute: React.PropTypes.number,
};

TimeSelector.defaultProps = {
    onChange: () => {},
    hour: null,
    minute: null,
};
