import React from 'react';
import ListItem from '../elements/ListItem';
import Schema from '../../models/Schema';

export default class SchemaListItem extends React.Component {
    render() {
        return (<ListItem>
            {this.props.schema.getName()}
        </ListItem>);
    }
}

SchemaListItem.propTypes = {
    schema: React.PropTypes.instanceOf(Schema).isRequired,
};
