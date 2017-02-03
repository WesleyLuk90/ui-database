const Database = require('./Database');
const assert = require('assert');
const Schema = require('./Schema');
const uuid = require('./uuid');


module.exports = class SchemaStorage {
    constructor(database) {
        assert.ok(database instanceof Database);
        this.database = database;
    }

    migrate() {
        return this.getCollection().createIndex({ name: true }, { unique: true });
    }

    getCollection() {
        return this.database.getCollection('schemas');
    }

    get(name) {
        assert.ok(typeof name === 'string' && name);

        return this.getCollection()
            .then(col => col.findOne({ name }))
            .then(data => (data ? this.fromObject(data) : null));
    }

    create(schema) {
        assert.ok(schema instanceof Schema);
        assert.ok(schema.getName());
        assert.ok(schema.getId());
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
                    const error = new Error(`Schema with name '${schema.name}' already exists`);
                    error.cause = e;
                    throw error;
                }
                throw e;
            });
    }

    update(schema) {
        assert.ok(schema instanceof Schema);
        const dataToUpdate = this.toObject(schema);
        delete dataToUpdate._id;
        return this.getCollection()
            .then(col => col.updateOne({ name: dataToUpdate.name }, { $set: dataToUpdate }))
            .then((res) => {
                if (res.result.nModified !== 1) {
                    throw new Error(`Expected one document to be updated but was ${res.result.nModified}`);
                }
            });
    }

    clear() {
        return this.getCollection()
            .then(col => col.remove({}));
    }

    toObject(schema) {
        assert.ok(schema instanceof Schema);
        return {
            _id: schema.id,
            name: schema.name,
            fields: schema.fields,
        };
    }

    fromObject(data) {
        assert.ok(data);
        const schema = new Schema();
        schema.id = data._id;
        schema.name = data.name;
        schema.fields = data.fields;
        return schema;
    }
};
