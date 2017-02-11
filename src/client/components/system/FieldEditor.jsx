import React from 'react';

export default class FieldEditor extends React.Component {
    render() {
        return (<div className="field-editor">Field Editor {this.props.field.type}</div>);
    }
}
