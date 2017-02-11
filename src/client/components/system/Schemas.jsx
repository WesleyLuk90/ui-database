import React from 'react';
import AppModule from '../../AppModule';
import Section from '../elements/Section';
import ListItem from '../elements/ListItem';
import List from '../elements/List';
import ActionBar from '../elements/ActionBar';
import Button from '../elements/Button';
import PageLayout from '../elements/PageLayout';

export default class Schemas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (<PageLayout title="Schemas">
            <Section>
                <ActionBar><Button>Create Schema</Button></ActionBar>
            </Section>
            <Section>
                <List>
                    <ListItem>Schema 1</ListItem>
                    <ListItem>Schema 2</ListItem>
                    <ListItem>Schema 3</ListItem>
                    <ListItem>Schema 4</ListItem>
                    <ListItem>Schema 5</ListItem>
                    <ListItem>Schema 6</ListItem>
                    <ListItem>Schema 2</ListItem>
                    <ListItem>Schema 9</ListItem>
                    <ListItem>Schema 8</ListItem>
                    <ListItem>Schema 26</ListItem>
                    <ListItem>Schema 243</ListItem>
                    <ListItem>Schema 2</ListItem>
                </List>
            </Section>
        </PageLayout>);
    }
}

Schemas.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};
Schemas.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};
