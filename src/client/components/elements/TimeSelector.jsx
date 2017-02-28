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
        if (this.props.hours == null) {
            return '12';
        }
        const hours = parseInt(this.props.hours, 10);
        if (hours === 0 || hours === 12) {
            return '12';
        }
        if (hours > 0 && hours < 24) {
            return `${hours % 12}`;
        }
        return '12';
    }

    getMinutes() {
        if (this.props.minutes == null) {
            return '00';
        }
        const minutes = parseInt(this.props.minutes, 10);
        if (minutes >= 0 && minutes < 60) {
            return _.padStart(minutes, 2, '0');
        }
        return '00';
    }

    getHalfDay() {
        if (this.props.hours == null) {
            return 'AM';
        }
        if (this.props.hours >= 0 && this.props.hours < 12) {
            return 'AM';
        }
        return 'PM';
    }

    setHours(hours) {
        this.triggerOnChange(hours, this.getMinutes(), this.getHalfDay());
    }

    setMinutes(minutes) {
        this.triggerOnChange(this.getHours(), minutes, this.getHalfDay());
    }

    setHalfDay(halfDay) {
        this.triggerOnChange(this.getHours(), this.getMinutes(), halfDay);
    }

    triggerOnChange(newHours, newMinutes, halfDay) {
        let hours = parseInt(newHours, 10);
        const minutes = parseInt(newMinutes, 10);
        if (halfDay === 'AM') {
            if (hours === 12) {
                hours -= 12;
            }
        } else if (hours !== 12) {
            hours += 12;
        }
        this.props.onChange(hours, minutes);
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
    hours: React.PropTypes.number,
    minutes: React.PropTypes.number,
};

TimeSelector.defaultProps = {
    onChange: () => {},
    hours: null,
    minutes: null,
};
