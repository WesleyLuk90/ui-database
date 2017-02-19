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
                <ActionBar><Button href="#/system/schemas/create">Create Schema</Button></ActionBar>
            </Section>
            <Section>
                <List>
                    {this.state.schemas.map(schema => <SchemaListItem schema={schema} key={schema.getId()} />)}
                </List>
            </Section>
        </PageLayout>);
    }
}

Schemas.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};
