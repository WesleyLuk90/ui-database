const Database = require('./Database');
const assert = require('assert');
const Schema = require('./Schema');
const CursorVisitor = require('./CursorVisitor');
const NotFoundError = require('./errors/NotFoundError');
const DuplicateKeyError = require('./errors/DuplicateKeyError');

module.exports = class SchemaStorage {
    constructor(database) {
        assert(database instanceof Database);
        this.database = database;
    }

    migrate() {}

    getCollection() {
        return this.database.getCollection('schemas');
    }

    get(_id) {
        assert(typeof _id === 'string' && _id);

        return this.getCollection()
            .then(col => col.findOne({ _id }))
            .then(data => (data ? this.fromObject(data) : null));
    }

    create(schema) {
        assert(schema instanceof Schema);
        assert(schema.getName());
        assert(schema.getId());
        const toInsert = this.toObject(schema);
        return this.getCollection()
            .then(col => col.insert(toInsert))
            .then(() => {
                const schemaToReturn = schema;
                schemaToReturn.setId(toInsert._id);
                return schemaToReturn;
            })
            .catch((e) => {
                if (e.code === 11000) {
                    const error = new DuplicateKeyError('Schema', schema.id);
                    throw error;
                }
                throw e;
            });
    }

    update(schema) {
        assert(schema instanceof Schema);
        const dataToUpdate = this.toObject(schema);
        delete dataToUpdate._id;
        return this.getCollection()
            .then(col => col.updateOne({ _id: schema.getId() }, { $set: dataToUpdate }))
            .then((res) => {
                if (res.result.nModified !== 1) {
                    throw new NotFoundError('schema', schema.getId());
                }
                return schema;
            });
    }

    list() {
        return this.getCollection()
            .then((collection) => {
                const visitor = new CursorVisitor(collection.find({}));
                const schemaData = [];
                return visitor.visit(data => schemaData.push(data))
                    .then(() => schemaData);
            })
            .then(res => res.map(d => this.fromObject(d)));
    }

    clear() {
        return this.getCollection()
            .then(col => col.remove({}));
    }

    toObject(schema) {
        assert(schema instanceof Schema);
        return {
            _id: schema.id,
            name: schema.name,
            fields: schema.fields,
        };
    }

    fromObject(data) {
        assert(data);
        const schema = new Schema();
        schema.id = data._id;
        schema.name = data.name;
        schema.fields = data.fields;
        return schema;
    }
};
