import React from 'react';
import AppModule from '../../AppModule';
import Section from '../elements/Section';
import List from '../elements/List';
import PageLayout from '../elements/PageLayout';
import Schema from '../../models/Schema';
import ActionBar from '../elements/ActionBar';
import ActionBarRight from '../elements/ActionBarRight';
import Button from '../elements/Button';
import DocumentListItem from './DocumentListItem';

export default class SchemaDocuments extends React.Component {
    constructor(props) {
        super(props);

        this.documentsSchemaStore = this.props.appModule.get('DocumentsSchemaStore');
        this.urlFactory = this.props.appModule.get('UrlFactory');

        this.state = {
            schema: Schema.create(),
            documents: [],
        };
    }

    componentDidMount() {
        this.subscriptions = [
            this.documentsSchemaStore.getStream().subscribe(s => this.setSchema(s)),
            this.documentsSchemaStore.getDocumentsStream().subscribe(d => this.setDocuments(d)),
        ];
    }

    componentWillUnmount() {
        this.subscriptions.forEach(s => s.dispose());
    }

    setSchema(schema) {
        this.setState({ schema: schema });
    }

    setDocuments(documents) {
        this.setState({ documents: documents });
    }

    render() {
        return (<PageLayout title={`Documents for ${this.state.schema.getName()}`}>
            <Section>
                <ActionBar>
                    <ActionBarRight>
                        <Button href={this.urlFactory.get('documents.create', this.state.schema.getId())}>Create</Button>
                    </ActionBarRight>
                </ActionBar>
            </Section>
            <Section>
                <List>
                    {this.state.documents
                        .map(d => <DocumentListItem key={d.getId()} appModule={this.props.appModule} document={d} />)}
                </List>
            </Section>
        </PageLayout>);
    }
}

SchemaDocuments.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};
