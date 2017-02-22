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
        };
    }

    componentDidMount() {
        this.subscriptions = [
            this.schemaListStore.getStream().subscribe(s => this.setSchemas(s)),
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

    render() {
        return (<PageLayout title="Documents">
            <Section>
                <List>
                    {this.state.schemas.map(schema => <SchemaDocumentsListItem schema={schema} key={schema.getId()} />)}
                </List>
            </Section>
        </PageLayout>);
    }
}

Documents.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};
