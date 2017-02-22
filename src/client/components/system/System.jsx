import React from 'react';
import AppModule from '../../AppModule';
import Section from '../elements/Section';
import ListItem from '../elements/ListItem';
import List from '../elements/List';

export default class System extends React.Component {

    constructor(props) {
        super(props);

        this.urlFactory = this.props.appModule.get('UrlFactory');

        this.state = {};
    }
    render() {
        return (<Section title="System">
            <List>
                <ListItem><a href={this.urlFactory.get('schemas')}>Schemas</a></ListItem>
                <ListItem><a href={this.urlFactory.get('documents')}>Documents</a></ListItem>
            </List>
        </Section>);
    }
}

System.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};
