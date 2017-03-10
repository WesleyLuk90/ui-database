import React from 'react';
import AppModule from '../../AppModule';
import Section from '../elements/Section';
import List from '../elements/List';
import PageLayout from '../elements/PageLayout';
import SchemaDocumentsListItem from './SchemaDocumentsListItem';

export default class Documents extends React.Component {
    constructor(props) {
        super(props);

        this.schemaListStore = this.props.appModule.get('SchemaListStore');

        this.state = {
            schemas: [],
            counts: new Map(),
        };
    }

    componentDidMount() {
        this.subscriptions = [
            this.schemaListStore.getStream().subscribe(s => this.setSchemas(s)),
            this.schemaListStore.getDocumentCountStream().subscribe(d => this.setDocumentCounts(d)),
        ];
    }

    componentWillUnmount() {
        this.subscriptions.forEach(s => s.dispose());
    }

    setSchemas(schemas) {
        this.setState({
            schemas: schemas,
        });
    }

    setDocumentCounts(counts) {
        this.setState({
            counts: counts,
        });
    }

    getCount(schema) {
        const count = this.state.counts;
        return count.has(schema.getId()) ? count.get(schema.getId()) : 0;
    }

    render() {
        return (<PageLayout title="Documents">
            <Section>
                <List>
                    {this.state.schemas.map(schema => <SchemaDocumentsListItem schema={schema} count={this.getCount(schema)} key={schema.getId()} appModule={this.props.appModule} />)}
                </List>
            </Section>
        </PageLayout>);
    }
}

Documents.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};
