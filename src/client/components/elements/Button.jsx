import React from 'react';

export default class Button extends React.Component {
    render() {
        if (this.props.href) {
            return (<a href={this.props.href} onClick={this.props.onClick} className="button">{this.props.children}</a>);
        } else {
            return (<button type="button" onClick={this.props.onClick} className="button">{this.props.children}</button>);
        }
    }
}

Button.propTypes = {
    children: React.PropTypes.node,
    href: React.PropTypes.string,
    onClick: React.PropTypes.func,
};

Button.defaultProps = {
    children: null,
    href: null,
    onClick: null,
};
