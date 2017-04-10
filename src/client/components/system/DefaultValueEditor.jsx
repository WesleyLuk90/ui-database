import React from 'react';
import Field from '../../models/Field';
import NumberInputField from '../fields/NumberInputField';
import TextInputField from '../fields/TextInputField';
import DatetimeField from '../fields/DatetimeField';
import AppModule from '../../AppModule';
import DefaultReferenceEditor from './DefaultReferenceEditor';

export default class DefaultValueEditor extends React.Component {

    getValueInput() {
        const field = this.props.field;
        const fieldType = field.getType();
        if (fieldType === 'text') {
            return (<TextInputField
                label={field.getName()}
                placeholder={field.getName()}
                value={this.props.value || ''}
                onChange={v => this.props.onChange(v)}
            />);
        } else if (fieldType === 'number') {
            return (<NumberInputField
                label={field.getName()}
                placeholder={field.getName()}
                value={this.props.value || null}
                onChange={v => this.props.onChange(v)}
            />);
        } else if (fieldType === 'datetime') {
            return (<DatetimeField
                label={field.getName()}
                value={this.props.value}
                onChange={v => this.props.onChange(v)}
            />);
        } else if (fieldType === 'reference') {
            return (<DefaultReferenceEditor
                field={field}
                value={this.props.value}
                onChange={v => this.props.onChange(v)}
                appModule={this.props.appModule}
            />);
        }
        return `No Input for ${fieldType}`;
    }

    render() {
        return (<div className="default-value-editor">
            {this.getValueInput()}
        </div>);
    }
}

DefaultValueEditor.propTypes = {
    field: React.PropTypes.instanceOf(Field).isRequired,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func,
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};

DefaultValueEditor.defaultProps = {
    value: null,
    onChange: () => {},
};
