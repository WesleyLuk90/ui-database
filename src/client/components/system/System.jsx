import React from 'react';
import AppModule from '../../AppModule';
import SimplePage from '../elements/SimplePage';
import ListItem from '../elements/ListItem';
import List from '../elements/List';

export default class System extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (<SimplePage title="System">
            <List>
                <ListItem><a href="#/system/schemas">Schemas</a></ListItem>
            </List>
        </SimplePage>);
    }
}

System.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};
