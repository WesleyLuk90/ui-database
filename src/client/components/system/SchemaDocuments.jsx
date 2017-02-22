import React from 'react';
import AppModule from '../../AppModule';
import Section from '../elements/Section';
import List from '../elements/List';
import PageLayout from '../elements/PageLayout';
import Schema from '../../models/Schema';

export default class SchemaDocuments extends React.Component {
    constructor(props) {
        super(props);

        this.documentsSchemaStore = this.props.appModule.get('DocumentsSchemaStore');

        this.state = {
            schema: Schema.create(),
        };
    }

    componentDidMount() {
        this.subscriptions = [
            this.documentsSchemaStore.getStream().subscribe(s => this.setSchema(s)),
        ];
    }

    componentWillUnmount() {
        this.subscriptions.forEach(s => s.dispose());
    }

    setSchema(schema) {
        this.setState({ schema: schema });
    }

    render() {
        return (<PageLayout title={`Documents for ${this.state.schema.getName()}`}>
            <Section>
                <List>
                </List>
            </Section>
        </PageLayout>);
    }
}

SchemaDocuments.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};
