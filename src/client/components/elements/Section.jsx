import React from 'react';
import classnames from '../utils/classnames';

export default class Section extends React.Component {
    getTitle() {
        if (this.props.title) {
            return (<h3 className="section__title">{this.props.title}</h3>);
        } else {
            return null;
        }
    }

    render() {
        return (<div className={classnames('section', { 'section--hidden': this.props.hidden })}>
            {this.getTitle()}
            {this.props.children}
        </div>);
    }
}

Section.propTypes = {
    children: React.PropTypes.node,
    title: React.PropTypes.string,
    hidden: React.PropTypes.bool,
};

Section.defaultProps = {
    title: null,
    children: null,
    hidden: false,
};
