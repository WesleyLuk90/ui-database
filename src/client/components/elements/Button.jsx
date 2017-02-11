import React from 'react';

export default class Button extends React.Component {
    render() {
        if (this.props.href) {
            return (<a href={this.props.href} className="button">{this.props.children}</a>);
        } else {
            return (<button type="button" className="button">{this.props.children}</button>);
        }
    }
}

Button.propTypes = {
    children: React.PropTypes.node,
    href: React.PropTypes.string,
};

Button.defaultProps = {
    children: null,
    href: null,
};
