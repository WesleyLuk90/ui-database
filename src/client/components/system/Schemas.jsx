import React from 'react';
import AppModule from '../../AppModule';
import SimplePage from '../elements/SimplePage';
import ListItem from '../elements/ListItem';
import List from '../elements/List';

export default class Schemas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (<SimplePage title="Schemas">
            <List>
                <ListItem>Schema 1</ListItem>
                <ListItem>Schema 2</ListItem>
            </List>
        </SimplePage>);
    }
}

Schemas.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};
