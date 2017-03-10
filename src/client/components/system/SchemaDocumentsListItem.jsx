import React from 'react';
import ListItem from '../elements/ListItem';
import Schema from '../../models/Schema';
import AppModule from '../../AppModule';

export default class SchemaDocumentsListItem extends React.Component {
    constructor(props) {
        super(props);

        this.urlFactory = this.props.appModule.get('UrlFactory');
    }

    render() {
        return (<ListItem>
            <div className="schema-documents-list-item">
                <a href={this.urlFactory.get('documents.forschema', this.props.schema.getId())}>
                    <div className="schema-documents-list-item__name">{this.props.schema.getName()}</div>
                    <div className="schema-documents-list-item__edit">{this.props.count} Documents</div>
                </a>
            </div>
        </ListItem>);
    }
}

SchemaDocumentsListItem.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
    schema: React.PropTypes.instanceOf(Schema).isRequired,
    count: React.PropTypes.number.isRequired,
};
