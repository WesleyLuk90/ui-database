import React from 'react';
import TextInput from '../elements/TextInput';
import Field from '../../models/Field';

export default class FieldEditor extends React.Component {
    render() {
        const field = this.props.field;
        return (<div className="field-editor">
            Type: {field.getType()}<br />
            <TextInput label="Name" value={field.getName()} />
            <TextInput label="Id" value={field.getId()} />
        </div>);
    }
}

FieldEditor.propTypes = {
    field: React.PropTypes.instanceOf(Field).isRequired,
};
