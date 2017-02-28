import React from 'react';
import classnames from '../utils/classnames';

export default class Button extends React.Component {
    getClassNames() {
        return classnames('button', {
            'button--plain': this.props.plain,
        });
    }

    render() {
        if (this.props.href) {
            return (<a href={this.props.href} onClick={this.props.onClick} className={this.getClassNames()}>{this.props.children}</a>);
        } else {
            return (<button type="button" onClick={this.props.onClick} className={this.getClassNames()}>{this.props.children}</button>);
        }
    }
}

Button.propTypes = {
    children: React.PropTypes.node,
    href: React.PropTypes.string,
    onClick: React.PropTypes.func,
    plain: React.PropTypes.bool,
};

Button.defaultProps = {
    children: null,
    href: null,
    onClick: null,
    plain: false,
};
