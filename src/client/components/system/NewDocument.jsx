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

    render() {
        return (<PageLayout title={`Create New ${this.props.schema.getName()}`}>
            <Section>
                <ActionBar>
                    <ActionBarRight>
                        <Button>Create</Button>
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
