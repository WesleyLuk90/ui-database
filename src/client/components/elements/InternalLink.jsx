import React from 'react';
import AppModule from '../../AppModule';

export default class InternalLink extends React.Component {
    constructor(props) {
        super(props);
        this.urlFactory = this.props.appModule.get('UrlFactory');
    }

    render() {
        return (<a href={this.urlFactory.get(this.props.route, ...this.props.params)}>
            {this.props.children}
        </a>);
    }
}

InternalLink.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
    route: React.PropTypes.string.isRequired,
    children: React.PropTypes.node,
    params: React.PropTypes.array,
};

InternalLink.defaultProps = {
    children: null,
    params: [],
};
