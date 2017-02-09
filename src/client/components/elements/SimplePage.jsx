import React from 'react';

export default class SimplePage extends React.Component {
    render() {
        return (<div className="simple-page">
            <div className="simple-page__title">{this.props.title}</div>
            <div className="simple-page__contents">{this.props.children}</div>
        </div>);
    }
}

SimplePage.propTypes = {
    title: React.PropTypes.string.isRequired,
    children: React.PropTypes.node,
};

SimplePage.defaultProps = {
    children: null,
};
