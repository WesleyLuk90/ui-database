import React from 'react';
import assert from 'assert';
import DropdownField from '../fields/DropdownField';
import FieldType from '../../models/FieldType';
import FieldOptions from '../../models/FieldOptions';
import AppModule from '../../AppModule';
import Field from '../../models/Field';
import DocumentReference from '../../../server/DocumentReference';

export default class DefaultReferenceEditor extends React.Component {
    constructor(props) {
        super(props);

        assert(this.props.field.getType() === FieldType.getType('reference').getId());
        assert(this.props.field.getOption(FieldOptions.SCHEMA_REFERENCE()));

        this.referenceOptionsProvider = this.props.appModule.get('ReferenceOptionsProvider');
        this.optionsCache = this.referenceOptionsProvider.create(this.props.field.getOption(FieldOptions.SCHEMA_REFERENCE()));
    }

    onChange(v) {
        console.log(v);
    }

    render() {
        const field = this.props.field;
        return (<DropdownField
            label={field.getName()}
            value="abc"
            options={this.optionsCache.optionsProvider()}
            onChange={v => this.onChange(v)}
        />);
    }
}

DefaultReferenceEditor.propTypes = {
    value: React.PropTypes.instanceOf(DocumentReference),
    field: React.PropTypes.instanceOf(Field).isRequired,
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};

DefaultReferenceEditor.defaultProps = {
    value: null,
};
