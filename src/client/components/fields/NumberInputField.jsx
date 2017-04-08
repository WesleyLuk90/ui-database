import React from 'react';
import _ from 'lodash';

export default class NumberInputField extends React.Component {
    constructor(props) {
        super(props);
        this.id = `number-input-field__${_.uniqueId()}`;
    }

    onChange(e) {
        this.props.onChange(parseFloat(e.target.value));
    }

    render() {
        return (<div className="number-input-field">
            <label className="number-input-field__label" htmlFor={this.id}>{this.props.label}</label>
            <input
                type="number"
                className="number-input-field__control"
                id={this.id}
                name={this.id}
                onChange={e => this.onChange(e)}
                value={this.props.value || ''}
                placeholder={this.props.placeholder}
            />
        </div>);
    }
}

NumberInputField.propTypes = {
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.number,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
};

NumberInputField.defaultProps = {
    onChange: null,
    value: null,
    placeholder: null,
};
