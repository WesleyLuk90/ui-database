import React from 'react';
import AppModule from '../../AppModule';
import Section from '../elements/Section';
import ListItem from '../elements/ListItem';
import List from '../elements/List';

export default class System extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (<Section title="System">
            <List>
                <ListItem><a href="#/system/schemas/">Schemas</a></ListItem>
                <ListItem><a href="#/system/documents/">Documents</a></ListItem>
            </List>
        </Section>);
    }
}

System.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};
