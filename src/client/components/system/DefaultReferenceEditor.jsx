import React from 'react';
import assert from 'assert';
import DropdownField from '../fields/DropdownField';
import FieldType from '../../models/FieldType';
import FieldOptions from '../../models/FieldOptions';
import AppModule from '../../AppModule';
import Field from '../../models/Field';
import DocumentReference from '../../models/DocumentReference';

export default class DefaultReferenceEditor extends React.Component {
    constructor(props) {
        super(props);

        assert(this.props.field.getType() === FieldType.getType('reference').getId());
        assert(this.props.field.getOption(FieldOptions.SCHEMA_REFERENCE()));

        this.referenceOptionsProvider = this.props.appModule.get('ReferenceOptionsProvider');
        this.optionsCache = this.referenceOptionsProvider.create(this.props.field.getOption(FieldOptions.SCHEMA_REFERENCE()));

        this.state = {
            valueLabel: '',
        };
    }

    componentDidMount() {
        this.loadLabel(this.props);
    }

    componentWillReceiveProps(newProps) {
        this.loadLabel(newProps);
    }

    onChange(label) {
        const option = this.optionsCache.getOptionByLabel(label);
        this.props.onChange(option.toReference());
    }

    loadLabel(props) {
        if (!props.value) {
            this.setState({ valueLabel: '' });
        } else {
            this.optionsCache.getLabel(props.value)
                .then(label => this.setState({ valueLabel: label }));
        }
    }

    render() {
        const field = this.props.field;
        return (<div className="default-reference-editor">
            <DropdownField
                label={field.getName()}
                value={this.state.valueLabel}
                options={this.optionsCache.optionsProvider()}
                onChange={v => this.onChange(v)}
                placeholder={`Select a ${field.getOption(FieldOptions.SCHEMA_REFERENCE())}`}
            />
        </div>);
    }
}

DefaultReferenceEditor.propTypes = {
    value: React.PropTypes.instanceOf(DocumentReference),
    field: React.PropTypes.instanceOf(Field).isRequired,
    onChange: React.PropTypes.func.isRequired,
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};

DefaultReferenceEditor.defaultProps = {
    value: null,
};
