import React from 'react';
import assert from 'assert';
import FieldType from '../../models/FieldType';
import Field from '../../models/Field';
import DefaultValueEditor from './DefaultValueEditor';

export default class DefaultListEditor extends React.Component {
    constructor(props) {
        super(props);

        assert(props.field.getType() === FieldType.getType('list').getId());
    }

    render() {
        return (<div className="default-list-editor">
            {this.props.value.map(v => <DefaultValueEditor value={v} field={Field.create('text')} />)}
        </div>);
    }
}

DefaultListEditor.propTypes = {
    field: React.PropTypes.instanceOf(Field).isRequired,
    value: React.PropTypes.array,
    onChange: React.PropTypes.onChange,
};

DefaultListEditor.defaultProps = {
    value: [],
};
