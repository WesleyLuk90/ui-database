import React from 'react';
import Field from '../../models/Field';
import TextInput from '../elements/TextInput';
import DatetimePicker from '../elements/DatetimePicker';
import NumberInput from '../elements/NumberInput';

export default class DefaultValueEditor extends React.Component {

    getValueInput() {
        const field = this.props.field;
        const fieldType = field.getType();
        if (fieldType === 'text') {
            return (<TextInput
                label={field.getName()}
                placeholder={field.getName()}
                value={this.props.value || ''}
                onChange={e => this.props.onChange(e.target.value)}
            />);
        } else if (fieldType === 'number') {
            return (<NumberInput
                label={field.getName()}
                placeholder={field.getName()}
                value={this.props.value || ''}
                onChange={e => this.props.onChange(e.target.value)}
            />);
        } else if (fieldType === 'datetime') {
            return (<DatetimePicker value={this.props.value} onChange={v => this.props.onChange(v)} />);
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
};

DefaultValueEditor.defaultProps = {
    value: null,
    onChange: () => {},
};
