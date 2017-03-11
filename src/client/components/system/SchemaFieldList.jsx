import React from 'react';
import FieldEditor from './FieldEditor';

export default class SchemaFieldList extends React.Component {
    render() {
        return (<div className="schema-field-list">
            {this.props.fields.map((f, i) => (<div key={i} className="schema-field-list__field">
                <FieldEditor field={f} isNew={this.props.isNew} />
            </div>))}
        </div>);
    }
}

SchemaFieldList.propTypes = {
    fields: React.PropTypes.array.isRequired,
    isNew: React.PropTypes.bool.isRequired,
};
