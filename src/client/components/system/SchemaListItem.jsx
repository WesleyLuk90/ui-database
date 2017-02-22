import React from 'react';
import ListItem from '../elements/ListItem';
import Schema from '../../models/Schema';
import AppModule from '../../AppModule';

export default class SchemaListItem extends React.Component {

    constructor(props) {
        super(props);

        this.urlFactory = this.props.appModule.get('UrlFactory');
    }

    getEditUrl() {
        return this.urlFactory.get('schemas.edit', this.props.schema.getId());
    }

    render() {
        return (<ListItem>
            <div className="schema-list-item">
                <div className="schema-list-item__name">{this.props.schema.getName()}</div>
                <div className="schema-list-item__edit"><a href={this.getEditUrl()}>Edit</a></div>
            </div>
        </ListItem>);
    }
}

SchemaListItem.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
    schema: React.PropTypes.instanceOf(Schema).isRequired,
};
