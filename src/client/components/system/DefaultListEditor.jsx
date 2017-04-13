import React from 'react';
import assert from 'assert';
import FieldType from '../../models/FieldType';
import Field from '../../models/Field';
import DefaultValueEditor from './DefaultValueEditor';
import Button from '../elements/Button';
import AppModule from '../../AppModule';

export default class DefaultListEditor extends React.Component {
    constructor(props) {
        super(props);

        assert(props.field.getType() === FieldType.getType('list').getId());
    }

    getRow(index, value) {
        return (<div key={index} className="default-list-editor__item">
            <DefaultValueEditor
                value={value}
                field={Field.create('text')}
                appModule={this.props.appModule}
                onChange={v => this.setValue(index, v)}
            />
        </div>);
    }

    getValues() {
        return this.props.value || [];
    }

    addItem() {
        const newValue = [...this.getValues(), null];
        this.props.onChange(newValue);
    }

    setValue(index, value) {
        const newValues = this.getValues().slice();
        newValues[index] = value;
        this.props.onChange(newValues);
    }

    render() {
        const values = this.getValues();
        return (<div className="default-list-editor">
            {values.map((v, i) => this.getRow(i, v))}
            <div className="default-list-editor__controls">
                <Button onClick={() => this.addItem()}>Add Item</Button>
            </div>
        </div>);
    }
}

DefaultListEditor.propTypes = {
    field: React.PropTypes.instanceOf(Field).isRequired,
    value: React.PropTypes.array,
    onChange: React.PropTypes.func,
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};

DefaultListEditor.defaultProps = {
    value: null,
    onChange: () => {},
};
