import React from 'react';
import _ from 'lodash';

export default class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.id = `text-input__${_.uniqueId()}`;
    }

    render() {
        return (<div className="text-input">
            <label className="text-input__label" htmlFor={this.id}>{this.props.label}</label>
            <input
                type="text"
                className="text-input__control"
                id={this.id}
                name={this.id}
                onChange={this.props.onChange}
                value={this.props.value}
                placeholder={this.props.placeholder}
            />
        </div>);
    }
}

TextInput.propTypes = {
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
};

TextInput.defaultProps = {
    onChange: null,
    placeholder: null,
};
