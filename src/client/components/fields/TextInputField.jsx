import React from 'react';
import _ from 'lodash';

export default class TextInputField extends React.Component {
    constructor(props) {
        super(props);
        this.id = `text-input-field__${_.uniqueId()}`;
    }

    onChange(e) {
        if (!this.props.disabled) {
            this.props.onChange(e.target.value);
        }
    }

    render() {
        return (<div className="text-input-field">
            <label className="text-input-field__label" htmlFor={this.id}>{this.props.label}</label>
            <input
                type="text"
                className="text-input-field__control"
                id={this.id}
                name={this.id}
                onChange={e => this.onChange(e)}
                value={this.props.value}
                placeholder={this.props.placeholder}
                disabled={this.props.disabled}
            />
        </div>);
    }
}

TextInputField.propTypes = {
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    disabled: React.PropTypes.bool,
};

TextInputField.defaultProps = {
    onChange: null,
    placeholder: null,
    disabled: false,
};
