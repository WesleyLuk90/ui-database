import React from 'react';
import AppModule from '../../AppModule';
import Section from '../elements/Section';
import List from '../elements/List';
import PageLayout from '../elements/PageLayout';
import Schema from '../../models/Schema';
import ActionBar from '../elements/ActionBar';
import ActionBarRight from '../elements/ActionBarRight';
import Button from '../elements/Button';
import Document from '../../models/Document';
import ListItem from '../elements/ListItem';
import DefaultValueEditor from './DefaultValueEditor';

export default class NewDocument extends React.Component {
    constructor(props) {
        super(props);

        this.documentService = this.props.appModule.get('DocumentService');
        this.errorService = this.props.appModule.get('ErrorService');
        this.locationService = this.props.appModule.get('LocationService');

        this.state = {
            document: Document.fromSchema(this.props.schema),
        };
    }

    setSchema(schema) {
        this.setState({ schema: schema });
    }

    getFieldValue(field) {
        return this.state.document.getValue(field.getId());
    }

    setFieldValue(field, value) {
        this.state.document.setValue(field.getId(), value);
        this.forceUpdate();
    }

    create() {
        return this.documentService.create(this.state.document)
            .catch(this.errorService.catchHandler())
            .then(doc => this.locationService.toState('documents.edit', doc.getSchema().getId(), doc.getId()));
    }

    render() {
        return (<PageLayout title={`Create New ${this.props.schema.getName()}`}>
            <Section>
                <ActionBar>
                    <ActionBarRight>
                        <Button onClick={() => this.create()} className="create-document">Create</Button>
                    </ActionBarRight>
                </ActionBar>
            </Section>
            <Section>
                <List>
                    {this.props.schema.getFields().map(f => <ListItem key={f.getId()}>
                        <DefaultValueEditor field={f} value={this.getFieldValue(f)} onChange={v => this.setFieldValue(f, v)} />
                    </ListItem>)}
                </List>
            </Section>
        </PageLayout>);
    }
}

NewDocument.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
    schema: React.PropTypes.instanceOf(Schema).isRequired,
};
