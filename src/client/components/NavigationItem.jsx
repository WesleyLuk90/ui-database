import React from 'react';

export default class NavigationItem extends React.Component {

    getIconClass() {
        return `fa fa-${this.props.icon}`;
    }

    render() {
        return (<div className="navigation-item">
            <a href={this.props.href}>
                <span className={this.getIconClass()} /> {this.props.label}
            </a>
        </div>);
    }
}

NavigationItem.propTypes = {
    icon: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    href: React.PropTypes.string.isRequired,
};
