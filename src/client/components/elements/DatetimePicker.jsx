import React from 'react';
import moment from 'moment';
import Calendar from './Calendar';
import TimeSelector from './TimeSelector';

const DISPLAY_FORMAT = 'YYYY-MM-DD h:mm a';

export default class DatetimePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.formatDate(props),
            visible: false,
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({ value: this.formatDate(newProps) });
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
            <Calendar year={components.year} month={components.month} date={components.date} onChange={this.onChangeDate.bind(this)} />
            <TimeSelector hour={components.hour} minute={components.minute} onChange={this.onChangeTime.bind(this)} />
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

    render() {
        return (<div className="datetime-picker">
            <input className="datetime-picker__value" value={this.state.value} />
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
