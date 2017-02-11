import React from 'react';
import AppModule from '../../AppModule';
import Card from '../elements/Card';
import Schema from '../../models/Schema';
import Section from '../elements/Section';
import TextInput from '../elements/TextInput';
import FieldEditor from './FieldEditor';

export default class SchemaEditor extends React.Component {
    constructor(props) {
        super(props);

        this.onNameChange = this.onNameChange.bind(this);
        this.onIdChange = this.onIdChange.bind(this);
    }

    onNameChange(e) {
        this.props.schema.setName(e.target.value);
        this.forceUpdate();
    }

    onIdChange(e) {
        this.props.schema.setId(e.target.value);
        this.forceUpdate();
    }

    addField(type) {
        this.props.schema.addField({ type: type });
        this.forceUpdate();
    }

    render() {
        return (<div className="schema-editor">
            <div className="schema-editor__toolbox">
                <Section>
                    <Card icon="font" label="Text" onClick={() => this.addField('text')} />
                    <Card icon="calculator" label="Number" onClick={() => this.addField('number')} />
                    <Card icon="calendar" label="Date" onClick={() => this.addField('date')} />
                    <Card icon="clock-o" label="Date Time" onClick={() => this.addField('datetime')} />
                    <Card icon="paperclip" label="File" onClick={() => this.addField('file')} />
                    <Card icon="link" label="Link" onClick={() => this.addField('link')} />
                    <Card icon="file" label="Reference" onClick={() => this.addField('reference')} />
                    <Card icon="list" label="List" onClick={() => this.addField('list')} />
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
                    {this.props.schema.getFields().map((f, i) => (<FieldEditor key={i} field={f} />))}
                </Section>
            </div>
        </div>);
    }
}

SchemaEditor.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
    schema: React.PropTypes.instanceOf(Schema).isRequired,
};
