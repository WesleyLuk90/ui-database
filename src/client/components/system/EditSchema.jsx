import React from 'react';
import assert from 'assert';
import AppModule from '../../AppModule';
import PageLayout from '../elements/PageLayout';
import SchemaEditor from './SchemaEditor';
import Button from '../elements/Button';
import ActionBar from '../elements/ActionBar';
import Section from '../elements/Section';
import ActionBarRight from '../elements/ActionBarRight';

export default class EditSchema extends React.Component {

    constructor(props) {
        super(props);

        this.schemaState = this.props.appModule.get('SchemaStateStore');
        this.schemaService = this.props.appModule.get('SchemaService');
        this.errorService = this.props.appModule.get('ErrorService');

        this.state = {
            schema: this.schemaState.getSchema(),
        };
        assert(this.state.schema);
    }

    componentDidMount() {
        this.subscriptions = [
            this.schemaState.getStream().subscribe(schema => this.setSchema(schema)),
        ];
    }

    componentWillUnmount() {
        this.subscriptions.forEach(s => s.dispose());
    }

    saveSchema(schema) {
        this.schemaService.update(schema)
            .then(savedSchema => this.schemaState.setSchema(savedSchema))
            .catch(this.errorService.catchHandler());
    }

    setSchema(schema) {
        this.setState({ schema: schema });
    }

    render() {
        return (<PageLayout title="Edit Schema">
            <Section>
                <ActionBar>
                    <a href="#/system/schemas/">Back to Schemas</a>
                    <ActionBarRight>
                        <Button onClick={() => this.saveSchema(this.state.schema)}>Save</Button>
                    </ActionBarRight>
                </ActionBar>
            </Section>
            <SchemaEditor appModule={this.props.appModule} schema={this.state.schema} isNew={false} />
        </PageLayout>);
    }
}

EditSchema.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};
