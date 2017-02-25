import React from 'react';
import Field from '../../models/Field';
import TextInput from '../elements/TextInput';

export default class DefaultValueEditor extends React.Component {

    getValueInput() {
        const field = this.props.field;
        const fieldType = field.getType();
        if (fieldType === 'text') {
            return (<TextInput
                label={field.getName()}
                placeholder={field.getName()}
                value={this.props.value || ''}
                onChange={e => this.props.onChange(e.target.value)}
            />);
        }
        return `No Input for ${fieldType}`;
    }

    render() {
        return (<div className="default-value-editor">
            {this.getValueInput()}
        </div>);
    }
}

DefaultValueEditor.propTypes = {
    field: React.PropTypes.instanceOf(Field).isRequired,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func,
};

DefaultValueEditor.defaultProps = {
    value: null,
    onChange: () => {},
};
