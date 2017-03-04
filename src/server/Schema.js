function copyArrayOrNull(array) {
    if (array == null) {
        return null;
    }
    return array.slice();
}

class Schema {
    static create(name, id) {
        return new Schema().setName(name).setId(id);
    }

    constructor() {
        this.name = null;
        this.fields = null;
        this.id = null;
        this.descriptor = null;
    }

    copy() {
        return Schema.create(this.getName(), this.getId())
            .setFields(copyArrayOrNull(this.getFields()))
            .setDescriptor(copyArrayOrNull(this.getDescriptor()));
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
        return this;
    }

    setDescriptor(descriptor) {
        this.descriptor = descriptor;
        return this;
    }

    getDescriptor() {
        return this.descriptor;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    setFields(fields) {
        this.fields = fields;
        return this;
    }

    addField(field) {
        this.fields.push(field);
        return this;
    }

    getFields() {
        return this.fields;
    }
};
