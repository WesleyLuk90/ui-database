import React from 'react';
import Dropdown from './Dropdown';

export default class DropdownField extends React.Component {
    render() {
        return (<div className="dropdown-field">
            <label className="dropdown-field__label" htmlFor={this.id}>{this.props.label}</label>
            <Dropdown
                options={this.props.options}
                value={this.props.value}
                onChange={this.props.onChange}
            />
        </div>);
    }
}
DropdownField.propTypes = {
    label: React.PropTypes.string.isRequired,
    options: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.func,
    ]).isRequired,
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
};

DropdownField.defaultProps = {
    onChange: () => {},
};
