import React from 'react';
import Navigation from './Navigation';
import Content from './Content';

export default class Page extends React.Component {
    render() {
        return (<div className="page">
            <Navigation />
            <Content {...this.props} />
        </div>);
    }
}
