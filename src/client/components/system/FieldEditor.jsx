import React from 'react';
import Field from '../../models/Field';
import Icon from '../elements/Icon';
import FieldType from '../../models/FieldType';
import FieldOptions from '../../models/FieldOptions';
import AppModule from '../../AppModule';
import Button from '../elements/Button';
import DropdownField from '../fields/DropdownField';
import TextInputField from '../fields/TextInputField';

export default class FieldEditor extends React.Component {
    constructor(props) {
        super(props);

        this.schemaService = this.props.appModule.get('SchemaService');
        this.schemaList = this.schemaService.getSchemaList();
    }

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

    getAdditionalOptions(field) {
        switch (field.getType()) {
            case 'list':
                return this.getListAdditionalOptions(field);
            case 'reference':
                return this.getReferenceAdditionalOptions(field);
            default:
                return null;
        }
    }

    getListAdditionalOptions(field) {
        const types = FieldType.getTypes().map(t => t.getLabel());
        const optionName = FieldOptions.LIST_TYPE();
        return (<DropdownField label="Referenced Schema" options={types} value={field.getOption(optionName, '')} onChange={v => this.setFieldOption(optionName, v)} />);
    }

    getReferenceAdditionalOptions(field) {
        this.loadSchemas();
        const types = this.schemaList.getSchemaUniqueDescriptions();
        const optionName = FieldOptions.SCHEMA_REFERENCE();
        const current = this.schemaList.getSchemaById(field.getOption(optionName));
        const currentValue = current ? current.getUniqueDescription() : '';
        const onChange = desc => this.setFieldOption(optionName, this.schemaList.getSchemaByUniqueDescription(desc).getId());
        return (<DropdownField
            label="Referenced Schema"
            options={types}
            value={currentValue}
            onChange={onChange}
        />);
    }

    loadSchemas() {
        if (!this.schemaList.isLoaded()) {
            this.schemaList.refresh().then(() => this.forceUpdate());
        }
    }

    getRemoveButton() {
        if (!this.props.isNew) {
            return null;
        }
        return (<div className="field-editor__remove">
            <Button plain onClick={() => this.props.onRemove(this.props.field)}><Icon icon="trash-o" /></Button>
        </div>);
    }

    render() {
        const field = this.props.field;
        const fieldType = FieldType.getType(field.getType());
        return (<div className="field-editor">
            <h3>
                <Icon icon={fieldType.getIcon()} /> {field.getName()} <small>{fieldType.getLabel()}</small>
                {this.getRemoveButton()}
            </h3>
            <TextInputField label="Name" value={field.getName()} onChange={v => this.onNameChange(v)} />
            <TextInputField label="Id" value={field.getId()} onChange={v => this.onIdChange(v)} disabled={!this.props.isNew} />
            {this.getAdditionalOptions(field)}
        </div>);
    }
}

FieldEditor.propTypes = {
    field: React.PropTypes.instanceOf(Field).isRequired,
    isNew: React.PropTypes.bool.isRequired,
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
    onRemove: React.PropTypes.func,
};

FieldEditor.defaultProps = {
    onRemove: () => {},
};
