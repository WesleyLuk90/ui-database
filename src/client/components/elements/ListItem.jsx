import React from 'react';

export default class ListItem extends React.Component {
    render() {
        return (<li className="list">{this.props.children}</li>);
    }
}

ListItem.propTypes = {
    children: React.PropTypes.node,
};

ListItem.defaultProps = {
    children: null,
};
