import React from 'react';

export default class ActionBarLeft extends React.Component {
    render() {
        return (<div className="action-bar--left">{this.props.children}</div>);
    }
}

ActionBarLeft.propTypes = {
    children: React.PropTypes.node,
};

ActionBarLeft.defaultProps = {
    children: null,
};
