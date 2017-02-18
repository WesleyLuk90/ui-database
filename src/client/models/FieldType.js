import _ from 'lodash';
import Field from './Field';

export default class FieldType {
    static getTypes() {
        return [
            new FieldType('text', 'Text', 'font'),
            new FieldType('number', 'Number', 'calculator'),
            new FieldType('date', 'Date', 'calendar'),
            new FieldType('datetime', 'Date Time', 'clock-o'),
            new FieldType('file', 'File', 'paperclip'),
            new FieldType('link', 'Link', 'link'),
            new FieldType('reference', 'Reference', 'file'),
            new FieldType('list', 'List', 'list'),
        ];
    }

    static getType(type) {
        return _(FieldType.getTypes()).filter(f => f.getType() === type).first();
    }

    constructor(type, label, icon) {
        this.type = type;
        this.label = label;
        this.icon = icon;
    }

    getType() {
        return this.type;
    }

    getLabel() {
        return this.label;
    }

    getIcon() {
        return this.icon;
    }

    newField() {
        return Field.create(this.getType());
    }
}
