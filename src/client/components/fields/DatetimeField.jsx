import React from 'react';
import DatetimePicker from '../elements/DatetimePicker';

export default class DatetimeField extends React.Component {
    render() {
        return (<div className="date-time-picker">
            <label className="date-time-picker__label" htmlFor={this.id}>{this.props.label}</label>
            <DatetimePicker
                value={this.props.value}
                onChange={this.props.onChange}
            />
        </div>);
    }
}

DatetimeField.propTypes = {
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.instanceOf(Date),
    onChange: React.PropTypes.func,
};

DatetimeField.defaultProps = {
    value: null,
    onChange: () => {},
};
