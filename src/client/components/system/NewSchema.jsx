import React from 'react';
import AppModule from '../../AppModule';
import PageLayout from '../elements/PageLayout';
import SchemaEditor from './SchemaEditor';
import Schema from '../../models/Schema';
import Button from '../elements/Button';
import ActionBar from '../elements/ActionBar';
import Section from '../elements/Section';

export default class NewSchema extends React.Component {

    constructor(props) {
        super(props);

        this.schemaService = this.props.appModule.get('SchemaService');
        this.errorService = this.props.appModule.get('ErrorService');
        this.state = {
            schema: Schema.create(),
        };
    }

    createSchema(schema) {
        this.schemaService.create(schema)
            .catch(this.errorService.catchHandler());
    }

    render() {
        return (<PageLayout title="Create Schema">
            <Section>
                <ActionBar>
                    <Button onClick={() => this.createSchema(this.state.schema)}>Create</Button>
                </ActionBar>
            </Section>
            <SchemaEditor appModule={this.props.appModule} schema={this.state.schema} />
        </PageLayout>);
    }
}

NewSchema.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};
