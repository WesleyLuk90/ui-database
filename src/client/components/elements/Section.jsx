import React from 'react';

export default class Section extends React.Component {
    getTitle() {
        if (this.props.title) {
            return (<h3 className="section__title">{this.props.title}</h3>);
        } else {
            return null;
        }
    }

    render() {
        return (<div className="section">
            {this.getTitle()}
            {this.props.children}
        </div>);
    }
}

Section.propTypes = {
    children: React.PropTypes.node,
    title: React.PropTypes.string,
};

Section.defaultProps = {
    title: null,
    children: null,
};
