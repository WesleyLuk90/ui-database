import React from 'react';
import AppModule from '../../AppModule';
import Section from '../elements/Section';
import List from '../elements/List';
import PageLayout from '../elements/PageLayout';
import Schema from '../../models/Schema';
import ActionBar from '../elements/ActionBar';
import ActionBarRight from '../elements/ActionBarRight';
import Button from '../elements/Button';

export default class NewDocument extends React.Component {
    constructor(props) {
        super(props);

        this.newDocumentStore = this.props.appModule.get('NewDocumentStore');

        this.state = {
            schema: Schema.create(),
        };
    }

    componentDidMount() {
        this.subscriptions = [
            this.newDocumentStore.getStream().subscribe(schema => this.setSchema(schema)),
        ];
    }

    componentWillUnmount() {
        this.subscriptions.forEach(s => s.dispose());
    }

    setSchema(schema) {
        this.setState({ schema: schema });
    }

    render() {
        return (<PageLayout title={`Create New ${this.state.schema.getName()}`}>
            <Section>
                <ActionBar>
                    <ActionBarRight>
                        <Button>Create</Button>
                    </ActionBarRight>
                </ActionBar>
            </Section>
            <Section>
                {this.state.schema.getFields().map(f => JSON.stringify(f))}
            </Section>
        </PageLayout>);
    }
}

NewDocument.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};
