import React from 'react';
import AppModule from '../../AppModule';
import Section from '../elements/Section';
import PageLayout from '../elements/PageLayout';
import ActionBar from '../elements/ActionBar';
import ActionBarRight from '../elements/ActionBarRight';
import Document from '../../models/Document';

export default class EditDocument extends React.Component {
    constructor(props) {
        super(props);

        this.documentService = this.props.appModule.get('DocumentService');
        this.errorService = this.props.appModule.get('ErrorService');
    }

    setSchema(schema) {
        this.setState({ schema: schema });
    }

    getFieldValue(field) {
        return this.state.document.getValue(field.getId());
    }

    setFieldValue(field, value) {
        this.state.document.setValue(field.getId(), value);
        this.forceUpdate();
    }

    render() {
        return (<PageLayout title={`Edit ${this.props.document.getSchema().getName()}`}>
            <Section>
                <ActionBar>
                    <ActionBarRight>
                    </ActionBarRight>
                </ActionBar>
            </Section>
        </PageLayout>);
    }
}

EditDocument.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
    document: React.PropTypes.instanceOf(Document).isRequired,
};
