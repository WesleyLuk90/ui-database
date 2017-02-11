import React from 'react';
import AppModule from '../../AppModule';
import Card from '../elements/Card';
import Schema from '../../models/Schema';
import Section from '../elements/Section';

export default class SchemaEditor extends React.Component {
    render() {
        return (<div className="schema-editor">
            <div className="schema-editor__toolbox">
                <Section>
                    <Card icon="font" label="Text" />
                    <Card icon="calculator" label="Number" />
                    <Card icon="calendar" label="Date" />
                    <Card icon="clock-o" label="Date Time" />
                    <Card icon="paperclip" label="File" />
                    <Card icon="link" label="Link" />
                    <Card icon="file" label="Reference" />
                    <Card icon="list" label="List" />
                </Section>
            </div>
            <div className="schema-editor__fields">
                Files
            </div>
        </div>);
    }
}

SchemaEditor.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
    schema: React.PropTypes.instanceOf(Schema).isRequired,
};
