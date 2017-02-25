import React from 'react';
import AppModule from '../../AppModule';
import PageLayout from '../elements/PageLayout';
import SchemaEditor from './SchemaEditor';
import Schema from '../../models/Schema';
import Button from '../elements/Button';
import ActionBar from '../elements/ActionBar';
import Section from '../elements/Section';
import ActionBarRight from '../elements/ActionBarRight';

export default class NewSchema extends React.Component {

    constructor(props) {
        super(props);

        this.schemaService = this.props.appModule.get('SchemaService');
        this.errorService = this.props.appModule.get('ErrorService');
        this.locationService = this.props.appModule.get('LocationService');
        this.state = {
            schema: Schema.create(),
        };
    }

    createSchema(schema) {
        return this.schemaService.create(schema)
            .then(createdSchema => this.locationService.toState('schemas.edit', createdSchema.getId()))
            .catch(this.errorService.catchHandler());
    }

    render() {
        return (<PageLayout title="Create Schema">
            <Section>
                <ActionBar>
                    <a href="#/system/schemas/">Back to Schemas</a>
                    <ActionBarRight>
                        <Button onClick={() => this.createSchema(this.state.schema)} className="create-schema">Create</Button>
                    </ActionBarRight>
                </ActionBar>
            </Section>
            <SchemaEditor appModule={this.props.appModule} schema={this.state.schema} />
        </PageLayout>);
    }
}

NewSchema.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};
