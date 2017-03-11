import React from 'react';
import _ from 'lodash';

export default class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.id = `text-input__${_.uniqueId()}`;
    }

    onChange(e) {
        if (!this.props.disabled) {
            this.props.onChange(e.target.value);
        }
    }

    render() {
        return (<div className="text-input">
            <label className="text-input__label" htmlFor={this.id}>{this.props.label}</label>
            <input
                type="text"
                className="text-input__control"
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

TextInput.propTypes = {
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    disabled: React.PropTypes.bool,
};

TextInput.defaultProps = {
    onChange: null,
    placeholder: null,
    disabled: false,
};
