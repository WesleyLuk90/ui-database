import React from 'react';
import Card from '../elements/Card';
import Schema from '../../models/Schema';
import Section from '../elements/Section';
import TextInput from '../elements/TextInput';
import FieldEditor from './FieldEditor';
import FieldType from '../../models/FieldType';

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
        return this.props.schema.fields.filter(f => !f.getId());
    }

    getExistingFields() {
        return this.props.schema.fields.filter(f => f.getId());
    }

    render() {
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
                    />
                </Section>
                <Section title="Fields">
                    <div className="schema-field-list">
                        {this.getExistingFields().map((f, i) => (<div key={i} className="schema-field-list__field">
                            <FieldEditor field={f} isNew={false} />
                        </div>))}
                    </div>
                </Section>
                <Section title="New Fields">
                    <div className="schema-field-list">
                        {this.getNewFields().map((f, i) => (<div key={i} className="schema-field-list__field">
                            <FieldEditor field={f} isNew />
                        </div>))}
                    </div>
                </Section>
            </div>
        </div>);
    }
}

SchemaEditor.propTypes = {
    // appModule: React.PropTypes.instanceOf(AppModule).isRequired,
    schema: React.PropTypes.instanceOf(Schema).isRequired,
};
