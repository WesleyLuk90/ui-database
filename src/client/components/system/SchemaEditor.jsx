import React from 'react';
import Card from '../elements/Card';
import Schema from '../../models/Schema';
import Section from '../elements/Section';
import TextInput from '../elements/TextInput';
import SchemaFieldList from './SchemaFieldList';
import FieldType from '../../models/FieldType';
import MultiDropdownField from '../elements/MultiDropdownField';

export default class SchemaEditor extends React.Component {
    constructor(props) {
        super(props);

        this.onNameChange = this.onNameChange.bind(this);
        this.onIdChange = this.onIdChange.bind(this);
    }

    onNameChange(name) {
        this.props.schema.setName(name);
        this.forceUpdate();
    }

    onIdChange(name) {
        this.props.schema.setId(name);
        this.forceUpdate();
    }

    addField(type) {
        this.props.schema.addField(type.newField());
        this.forceUpdate();
    }

    getNewFields() {
        return this.props.schema.fields.filter(f => f.isNew());
    }

    getExistingFields() {
        return this.props.schema.fields.filter(f => !f.isNew());
    }

    setDescriptor(newDescriptor) {
        const newFields = this.props.schema
            .getFields()
            .filter(f => newDescriptor.indexOf(f.getName()) > -1)
            .map(f => f.getId());
        this.props.schema.setDescriptor(newFields);
        this.forceUpdate();
    }

    getDescriptorValues() {
        const descriptor = this.props.schema.getDescriptor();
        return this.props.schema
            .getFields()
            .filter(f => descriptor.indexOf(f.getId()) > -1)
            .map(f => f.getName());
    }

    getDescriptorOptions() {
        return this.props.schema.getFields().map(f => f.getName());
    }

    render() {
        const newFields = this.getNewFields();
        const existingFields = this.getExistingFields();
        return (<div className="schema-editor">
            <div className="schema-editor__toolbox">
                <Section>
                    {FieldType.getTypes().map(type =>
                        <Card key={type.getType()} icon={type.getIcon()} label={type.getLabel()} onClick={() => this.addField(type)} />)}
                </Section>
            </div>
            <div className="schema-editor__fields">
                <Section title="Schema Info">
                    <TextInput
                        label="Name"
                        value={this.props.schema.name}
                        onChange={this.onNameChange}
                    />
                    <TextInput
                        label="Internal ID"
                        value={this.props.schema.id}
                        onChange={this.onIdChange}
                        disabled={!this.props.isNew}
                    />
                    <MultiDropdownField label="Descriptor" value={this.getDescriptorValues()} options={this.getDescriptorOptions()} onChange={newDescriptor => this.setDescriptor(newDescriptor)} />
                </Section>
                <Section title="Fields" hidden={existingFields.length === 0}>
                    <SchemaFieldList fields={existingFields} isNew={false} />
                </Section>
                <Section title="New Fields" hidden={newFields.length === 0 && !this.props.isNew}>
                    <SchemaFieldList fields={newFields} isNew />
                </Section>
            </div>
        </div>);
    }
}

SchemaEditor.propTypes = {
    // appModule: React.PropTypes.instanceOf(AppModule).isRequired,
    schema: React.PropTypes.instanceOf(Schema).isRequired,
    isNew: React.PropTypes.bool.isRequired,
};
