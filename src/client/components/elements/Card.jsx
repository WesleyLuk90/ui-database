import React from 'react';
import Icon from './Icon';
import classnames from '../utils/classnames';

export default class Card extends React.Component {

    render() {
        return (<button className="card" onClick={this.props.onClick}>
            <div className="card__icon"><Icon icon={this.props.icon} size="3x" fullWidth /></div>
            <div className="card__label">{this.props.label}</div>
        </button>);
    }
}

Card.propTypes = {
    label: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func,
};

Card.defaultProps = {
    onClick: null,
};
