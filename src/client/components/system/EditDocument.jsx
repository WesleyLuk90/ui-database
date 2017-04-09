import React from 'react';
import AppModule from '../../AppModule';
import Section from '../elements/Section';
import PageLayout from '../elements/PageLayout';
import ActionBar from '../elements/ActionBar';
import ActionBarRight from '../elements/ActionBarRight';
import Document from '../../models/Document';
import Button from '../elements/Button';
import DefaultDocumentEditor from './DefaultDocumentEditor';
import ActionBarLeft from '../elements/ActionBarLeft';
import InternalLink from '../elements/InternalLink';
import TimeSelector from '../elements/TimeSelector';

export default class EditDocument extends React.Component {
    constructor(props) {
        super(props);

        this.documentService = this.props.appModule.get('DocumentService');
        this.errorService = this.props.appModule.get('ErrorService');
        this.locationService = this.props.appModule.get('LocationService');

        this.state = {
            value: 'c',
        };
    }

    save() {
        return this.documentService.update(this.props.document)
            .catch(this.errorService.catchHandler())
            .then(() => this.locationService.toState('documents.forschema', this.props.document.getSchema().getId()));
    }

    render() {
        return (<PageLayout title={`Edit ${this.props.document.getSchema().getName()}`}>
            <Section>
                <ActionBar>
                    <ActionBarLeft>
                        <InternalLink appModule={this.props.appModule} route="documents.forschema" params={[this.props.document.getSchema().getId()]}>
                            {'< Back'}
                        </InternalLink>
                    </ActionBarLeft>
                    <ActionBarRight>
                        <Button onClick={() => this.save()} className="save-document">Save</Button>
                    </ActionBarRight>
                </ActionBar>
            </Section>
            <Section>
                <DefaultDocumentEditor document={this.props.document} appModule={this.props.appModule} />
            </Section>
        </PageLayout>);
    }
}

EditDocument.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
    document: React.PropTypes.instanceOf(Document).isRequired,
};
