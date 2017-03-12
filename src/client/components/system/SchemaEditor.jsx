import React from 'react';
import Card from '../elements/Card';
import Schema from '../../models/Schema';
import Section from '../elements/Section';
import TextInput from '../elements/TextInput';
import SchemaFieldList from './SchemaFieldList';
import FieldType from '../../models/FieldType';
import Dropdown from '../elements/Dropdown';

export default class SchemaEditor extends React.Component {
    constructor(props) {
        super(props);

        this.onNameChange = this.onNameChange.bind(this);
        this.onIdChange = this.onIdChange.bind(this);

        this.state = {
            value: 'z',
        };
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
                    <Dropdown value={this.state.value} options={['a', 'b', 'c']} />
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
