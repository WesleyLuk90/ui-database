import React from 'react';
import AppModule from '../../AppModule';
import Section from '../elements/Section';
import List from '../elements/List';
import ActionBar from '../elements/ActionBar';
import Button from '../elements/Button';
import PageLayout from '../elements/PageLayout';
import SchemaListItem from './SchemaListItem';

export default class Schemas extends React.Component {
    constructor(props) {
        super(props);

        this.schemaListStore = this.props.appModule.get('SchemaListStore');
        this.urlFactory = this.props.appModule.get('UrlFactory');

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
        return (<PageLayout title="Schemas">
            <Section>
                <ActionBar><Button href={this.urlFactory.get('schemas.create')}>Create Schema</Button></ActionBar>
            </Section>
            <Section>
                <List>
                    {this.state.schemas.map(schema => <SchemaListItem schema={schema} key={schema.getId()} appModule={this.props.appModule} />)}
                </List>
            </Section>
        </PageLayout>);
    }
}

Schemas.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};
