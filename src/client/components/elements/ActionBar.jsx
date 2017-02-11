import React from 'react';

export default class ActionBar extends React.Component {
    render() {
        return (<div className="action-bar">{this.props.children}</div>);
    }
}

ActionBar.propTypes = {
    children: React.PropTypes.node,
};

ActionBar.defaultProps = {
    children: null,
};
