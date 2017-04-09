import React from 'react';
import DefaultValueEditor from './DefaultValueEditor';
import List from '../elements/List';
import ListItem from '../elements/ListItem';
import Document from '../../models/Document';
import AppModule from '../../AppModule';

export default class DefaultDocumentEditor extends React.Component {

    getFieldValue(field) {
        return this.props.document.getValue(field.getId());
    }

    setFieldValue(field, value) {
        this.props.document.setValue(field.getId(), value);
        this.forceUpdate();
    }

    getFields() {
        return this.props.document.getSchema().getFields();
    }

    render() {
        return (<div className="default-document-editor">
            <List>
                {this.getFields().map(f => <ListItem key={f.getId()}>
                    <DefaultValueEditor field={f} value={this.getFieldValue(f)} onChange={v => this.setFieldValue(f, v)} appModule={this.props.appModule} />
                </ListItem>)}
            </List>
        </div>);
    }
}

DefaultDocumentEditor.propTypes = {
    document: React.PropTypes.instanceOf(Document).isRequired,
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};
