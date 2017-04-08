import React from 'react';
import Document from '../../models/Document';
import AppModule from '../../AppModule';

export default class DocumentItemList extends React.Component {
    constructor(props) {
        super(props);

        this.urlFactory = this.props.appModule.get('UrlFactory');
        this.documentDescriptionService = this.props.appModule.get('DocumentDescriptionService');
    }

    render() {
        const doc = this.props.document;
        return (<div className="document-list-item">
            <div className="document-list-item__description">
                {this.documentDescriptionService.getDescription(doc)}
            </div>
            <div className="document-list-item__actions">
                <a href={this.urlFactory.get('documents.edit', doc.getSchema().getId(), doc.getId())}>Edit</a>
            </div>
        </div>);
    }
}

DocumentItemList.propTypes = {
    document: React.PropTypes.instanceOf(Document).isRequired,
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};
