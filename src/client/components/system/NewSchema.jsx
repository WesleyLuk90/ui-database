import React from 'react';
import AppModule from '../../AppModule';
import Section from '../elements/Section';
import PageLayout from '../elements/PageLayout';

export default class NewSchema extends React.Component {

    render() {
        return (<PageLayout title="Create Schema">
            <Section>Section
            </Section>
        </PageLayout>);
    }
}

NewSchema.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};
NewSchema.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};
