import React from 'react';
import MultiDropdown from '../elements/MultiDropdown';


export default class MultiDropdownField extends React.Component {
    render() {
        return (<div className="multi-dropdown-field">
            <label className="multi-dropdown-field__label" htmlFor={this.id}>{this.props.label}</label>
            <MultiDropdown
                options={this.props.options}
                value={this.props.value}
                onChange={this.props.onChange}
            />
        </div>);
    }
}

MultiDropdownField.propTypes = {
    label: React.PropTypes.string.isRequired,
    options: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.func,
    ]).isRequired,
    value: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func,
};

MultiDropdownField.defaultProps = {
    onChange: () => {},
};
