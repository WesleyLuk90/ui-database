import React from 'react';
import AppModule from '../../AppModule';
import PageLayout from '../elements/PageLayout';
import SchemaEditor from './SchemaEditor';
import Button from '../elements/Button';
import ActionBar from '../elements/ActionBar';
import Section from '../elements/Section';
import ActionBarRight from '../elements/ActionBarRight';
import Schema from '../../models/Schema';

export default class EditSchema extends React.Component {

    constructor(props) {
        super(props);

        this.schemaService = this.props.appModule.get('SchemaService');
        this.errorService = this.props.appModule.get('ErrorService');
    }

    saveSchema(schema) {
        this.schemaService.update(schema)
            .catch(this.errorService.catchHandler());
    }

    render() {
        return (<PageLayout title="Edit Schema">
            <Section>
                <ActionBar>
                    <a href="#/system/schemas/">Back to Schemas</a>
                    <ActionBarRight>
                        <Button onClick={() => this.saveSchema(this.props.schema)}>Save</Button>
                    </ActionBarRight>
                </ActionBar>
            </Section>
            <SchemaEditor appModule={this.props.appModule} schema={this.props.schema} isNew={false} />
        </PageLayout>);
    }
}

EditSchema.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
    schema: React.PropTypes.instanceOf(Schema).isRequired,
};
