import React from 'react';
import Section from './Section';

export default class PageLayout extends React.Component {
    render() {
        return (<div className="page-layout">
            <Section><div className="page-layout__title">{this.props.title}</div></Section>
            {this.props.children}
        </div>);
    }
}

PageLayout.propTypes = {
    children: React.PropTypes.node,
    title: React.PropTypes.string,
};

PageLayout.defaultProps = {
    children: null,
    title: '',
};
