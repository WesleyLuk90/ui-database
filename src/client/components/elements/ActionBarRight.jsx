import React from 'react';

export default class ActionBarRight extends React.Component {
    render() {
        return (<div className="action-bar--right">{this.props.children}</div>);
    }
}

ActionBarRight.propTypes = {
    children: React.PropTypes.node,
};

ActionBarRight.defaultProps = {
    children: null,
};
