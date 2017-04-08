import React from 'react';
import moment from 'moment';
import Calendar from './Calendar';
import TimeSelector from './TimeSelector';
import classnames from '../utils/classnames';

const DISPLAY_FORMAT = 'YYYY-MM-DD h:mm a';

export default class DatetimePicker extends React.Component {
    constructor(props) {
        super(props);

        const date = this.formatDate(props);
        this.state = {
            value: date,
            displayedValue: date,
            visible: false,
            valid: true,
        };

        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
    }

    componentWillReceiveProps(newProps) {
        const date = this.formatDate(newProps);
        this.setState({ value: date, displayedValue: date });
    }

    getTimeComponents() {
        if (!this.props.value) {
            return {
                year: null,
                month: null,
                date: null,
                hour: null,
                minute: null,
            };
        }
        const date = moment(this.props.value);
        return {
            year: date.year(),
            month: date.month(),
            date: date.date(),
            hour: date.hour(),
            minute: date.minute(),
        };
    }

    formatDate(props) {
        if (props.value) {
            return moment(props.value).format(DISPLAY_FORMAT);
        }
        return '';
    }

    togglePopup() {
        this.setState({ visible: !this.state.visible });
    }

    getPanel() {
        if (!this.state.visible) {
            return null;
        }
        const components = this.getTimeComponents();
        return (<div className="datetime-picker__popup">
            <Calendar year={components.year} month={components.month} date={components.date} onChange={this.onChangeDate} />
            <TimeSelector hour={components.hour} minute={components.minute} onChange={this.onChangeTime} />
        </div>);
    }

    onChangeDate(year, month, date) {
        const time = this.props.value ? moment(this.props.value) : moment();
        if (!this.props.value) {
            time.hour(0).minute(0);
        }
        time.year(year).month(month).date(date);
        this.props.onChange(time.toDate());
    }

    onChangeTime(hour, minute) {
        const time = this.props.value ? moment(this.props.value) : moment();
        time.hour(hour).minute(minute);
        this.props.onChange(time.toDate());
    }

    onChange(e) {
        this.setState({ displayedValue: e.target.value });
    }

    onBlur() {
        const newDate = moment(this.state.displayedValue, [DISPLAY_FORMAT, moment.ISO_8601]);
        if (newDate.isValid()) {
            this.props.onChange(newDate.toDate());
        } else {
            this.setState({ valid: false });
        }
    }

    render() {
        return (<div className="datetime-picker">
            <input
                className={classnames('datetime-picker__value', { 'datetime-picker__invalid': !this.state.valid })}
                value={this.state.displayedValue}
                onChange={e => this.onChange(e)}
                onBlur={e => this.onBlur(e)}
            />
            <span className="datetime-picker__input-addon">
                <button className="datetime-picker__toggle" onClick={() => this.togglePopup()}><span className="fa fa-calendar" /></button>
            </span>
            {this.getPanel()}
        </div>);
    }
}

DatetimePicker.propTypes = {
    value: React.PropTypes.instanceOf(Date),
    onChange: React.PropTypes.func,
};

DatetimePicker.defaultProps = {
    value: null,
    onChange: () => {},
};
