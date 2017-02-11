import React from 'react';

export default class Button extends React.Component {
    render() {
        return (<button type="button" className="button">{this.props.children}</button>);
    }
}

Button.propTypes = {
    children: React.PropTypes.node,
};

Button.defaultProps = {
    children: null,
};
