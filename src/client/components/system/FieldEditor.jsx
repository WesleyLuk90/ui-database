import React from 'react';
import TextInput from '../elements/TextInput';
import Field from '../../models/Field';
import Icon from '../elements/Icon';
import FieldType from '../../models/FieldType';
import DropdownField from '../elements/DropdownField';
import FieldOptions from '../../models/FieldOptions';

export default class FieldEditor extends React.Component {
    onNameChange(name) {
        this.props.field.setName(name);
        this.forceUpdate();
    }

    onIdChange(id) {
        this.props.field.setId(id);
        this.forceUpdate();
    }

    setFieldOption(optionName, optionValue) {
        this.props.field.setOption(optionName, optionValue);
        this.forceUpdate();
    }

    getListAdditionalOptions(field) {
        const types = FieldType.getTypes().map(t => t.getLabel());
        const optionName = FieldOptions.LIST_TYPE();
        return (<DropdownField label="Type" options={types} value={field.getOption(optionName, '')} onChange={v => this.setFieldOption(optionName, v)} />);
    }

    getAdditionalOptions(field) {
        switch (field.getType()) {
            case 'list':
                return this.getListAdditionalOptions(field);
            default:
                return null;
        }
    }

    render() {
        const field = this.props.field;
        const fieldType = FieldType.getType(field.getType());
        return (<div className="field-editor">
            <h3><Icon icon={fieldType.getIcon()} /> {field.getName()} <small>{fieldType.getLabel()}</small></h3>
            <TextInput label="Name" value={field.getName()} onChange={v => this.onNameChange(v)} />
            <TextInput label="Id" value={field.getId()} onChange={v => this.onIdChange(v)} disabled={!this.props.isNew} />
            {this.getAdditionalOptions(field)}
        </div>);
    }
}

FieldEditor.propTypes = {
    field: React.PropTypes.instanceOf(Field).isRequired,
    isNew: React.PropTypes.bool.isRequired,
};
