import React from 'react';
import TextInput from '../elements/TextInput';
import Field from '../../models/Field';

export default class FieldEditor extends React.Component {
    onNameChange(name) {
        this.props.field.setName(name);
        this.forceUpdate();
    }

    onIdChange(id) {
        this.props.field.setId(id);
        this.forceUpdate();
    }

    render() {
        const field = this.props.field;
        return (<div className="field-editor">
            Type: {field.getType()}<br />
            <TextInput label="Name" value={field.getName()} onChange={v => this.onNameChange(v)} />
            <TextInput label="Id" value={field.getId()} onChange={v => this.onIdChange(v)} />
        </div>);
    }
}

FieldEditor.propTypes = {
    field: React.PropTypes.instanceOf(Field).isRequired,
};
