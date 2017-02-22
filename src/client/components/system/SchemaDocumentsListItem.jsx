import React from 'react';
import ListItem from '../elements/ListItem';
import Schema from '../../models/Schema';

export default class SchemaDocumentsListItem extends React.Component {

    getEditUrl() {
        return `#/system/schemas/edit/${this.props.schema.getId()}`;
    }

    render() {
        return (<ListItem>
            <div className="schema-documents-list-item">
                <div className="schema-documents-list-item__name">{this.props.schema.getName()}</div>
                <div className="schema-documents-list-item__edit">10 Documents</div>
            </div>
        </ListItem>);
    }
}

SchemaDocumentsListItem.propTypes = {
    schema: React.PropTypes.instanceOf(Schema).isRequired,
};
