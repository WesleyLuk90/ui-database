import React from 'react';

export default class Section extends React.Component {
    render() {
        return (<div className="section">{this.props.children}</div>);
    }
}

Section.propTypes = {
    children: React.PropTypes.node,
};

Section.defaultProps = {
    children: null,
};
