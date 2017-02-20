import React from 'react';
import ListItem from '../elements/ListItem';
import Schema from '../../models/Schema';

export default class SchemaListItem extends React.Component {

    getEditUrl() {
        return `#/system/schemas/edit/${this.props.schema.getId()}`;
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
    schema: React.PropTypes.instanceOf(Schema).isRequired,
};
