import React from 'react';

export default class Icon extends React.Component {
    getClass() {
        const classNames = ['fa', `fa-${this.props.icon}`];
        if (this.props.size) {
            classNames.push(`fa-${this.props.size}`);
        }
        if (this.props.fullWidth) {
            classNames.push('fa-fw');
        }
        return classNames.join(' ');
    }

    render() {
        return (<span className={this.getClass()} />);
    }
}

Icon.propTypes = {
    icon: React.PropTypes.string.isRequired,
    size: React.PropTypes.string,
    fullWidth: React.PropTypes.bool,
};

Icon.defaultProps = {
    size: null,
    fullWidth: false,
};
