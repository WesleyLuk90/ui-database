export default class Schema {
    static create() {
        return new Schema();
    }

    constructor() {
        this.name = '';
        this.id = '';
        this.fields = [];
    }

    setName(name) {
        this.name = name;
        return this;
    }

    getName() {
        return this.name;
    }

    setId(id) {
        this.id = id;
        return this;
    }

    getId() {
        return this.id;
    }

    getFields() {
        return this.fields.slice();
    }

    addField(field) {
        this.fields.push(field);
    }
}
