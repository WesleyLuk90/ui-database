import React from 'react';
import AppModule from '../../AppModule';
import PageLayout from '../elements/PageLayout';
import SchemaEditor from './SchemaEditor';
import Schema from '../../models/Schema';

export default class NewSchema extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            schema: Schema.create(),
        };
    }

    render() {
        return (<PageLayout title="Create Schema">
            <SchemaEditor appModule={this.props.appModule} schema={this.state.schema} />
        </PageLayout>);
    }
}

NewSchema.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};
