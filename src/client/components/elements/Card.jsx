import React from 'react';
import Icon from './Icon';

export default class Card extends React.Component {
    render() {
        return (<div className="card">
            <div className="card__icon"><Icon icon={this.props.icon} size="3x" fullWidth /></div>
            <div className="card__label">{this.props.label}</div>
        </div>);
    }
}

Card.propTypes = {
    label: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired,
};
