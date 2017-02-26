import React from 'react';
import AppModule from '../../AppModule';
import Section from '../elements/Section';
import PageLayout from '../elements/PageLayout';
import Schema from '../../models/Schema';
import ActionBar from '../elements/ActionBar';
import ActionBarRight from '../elements/ActionBarRight';
import Button from '../elements/Button';
import Document from '../../models/Document';
import DefaultDocumentEditor from './DefaultDocumentEditor';
import ActionBarLeft from '../elements/ActionBarLeft';
import InternalLink from '../elements/InternalLink';

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

    create() {
        return this.documentService.create(this.state.document)
            .catch(this.errorService.catchHandler())
            .then(doc => this.locationService.toState('documents.edit', doc.getSchema().getId(), doc.getId()));
    }

    render() {
        return (<PageLayout title={`Create New ${this.props.schema.getName()}`}>
            <Section>
                <ActionBar>
                    <ActionBarLeft>
                        <InternalLink appModule={this.props.appModule} route="documents.forschema" params={[this.state.document.getSchema().getId()]}>
                            {'< Back'}
                        </InternalLink>
                    </ActionBarLeft>
                    <ActionBarRight>
                        <Button onClick={() => this.create()} className="create-document">Create</Button>
                    </ActionBarRight>
                </ActionBar>
            </Section>
            <Section>
                <DefaultDocumentEditor document={this.state.document} />
            </Section>
        </PageLayout>);
    }
}

NewDocument.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
    schema: React.PropTypes.instanceOf(Schema).isRequired,
};
