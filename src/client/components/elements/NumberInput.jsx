import React from 'react';
import _ from 'lodash';

export default class NumberInput extends React.Component {
    constructor(props) {
        super(props);
        this.id = `number-input__${_.uniqueId()}`;
    }

    render() {
        return (<div className="number-input">
            <label className="number-input__label" htmlFor={this.id}>{this.props.label}</label>
            <input
                type="number"
                className="number-input__control"
                id={this.id}
                name={this.id}
                onChange={this.props.onChange}
                value={this.props.value}
                placeholder={this.props.placeholder}
            />
        </div>);
    }
}

NumberInput.propTypes = {
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
};

NumberInput.defaultProps = {
    onChange: null,
    placeholder: null,
};
