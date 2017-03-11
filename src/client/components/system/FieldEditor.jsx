import React from 'react';
import TextInput from '../elements/TextInput';
import Field from '../../models/Field';
import Icon from '../elements/Icon';
import FieldType from '../../models/FieldType';

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
        const fieldType = FieldType.getType(field.getType());
        return (<div className="field-editor">
            <h3><Icon icon={fieldType.getIcon()} /> {field.getName()} <small>{fieldType.getLabel()}</small></h3>
            <TextInput label="Name" value={field.getName()} onChange={v => this.onNameChange(v)} />
            <TextInput label="Id" value={field.getId()} onChange={v => this.onIdChange(v)} disabled={!this.props.isNew} />
        </div>);
    }
}

FieldEditor.propTypes = {
    field: React.PropTypes.instanceOf(Field).isRequired,
    isNew: React.PropTypes.bool.isRequired,
};
