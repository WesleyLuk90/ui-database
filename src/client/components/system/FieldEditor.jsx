import React from 'react';
import TextInput from '../elements/TextInput';
import Field from '../../models/Field';

export default class FieldEditor extends React.Component {
    onNameChange(e) {
        this.props.field.setName(e.target.value);
        this.forceUpdate();
    }

    onIdChange(e) {
        this.props.field.setId(e.target.value);
        this.forceUpdate();
    }

    render() {
        const field = this.props.field;
        return (<div className="field-editor">
            Type: {field.getType()}<br />
            <TextInput label="Name" value={field.getName()} onChange={e => this.onNameChange(e)} />
            <TextInput label="Id" value={field.getId()} onChange={e => this.onIdChange(e)} />
        </div>);
    }
}

FieldEditor.propTypes = {
    field: React.PropTypes.instanceOf(Field).isRequired,
};
