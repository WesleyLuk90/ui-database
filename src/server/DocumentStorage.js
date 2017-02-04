const assert = require('assert');
const Database = require('./Database');
const Schema = require('./Schema');
const Document = require('./Document');
const uuid = require('./uuid');
const DocumentReference = require('./DocumentReference');

module.exports = class DocumentStorage {
    constructor(database) {
        assert(database instanceof Database);
        this.database = database;
    }

    getCollection(schema) {
        assert(typeof schema === 'string');
        return this.database.getCollection(schema);
    }

    clear(schema) {
        assert(schema instanceof Schema, 'Requires a schema');

        return this.getCollection(schema.getId())
            .then(col => col.remove({}));
    }

    create(doc) {
        assert(doc instanceof Document);
        assert(!doc.getId(), 'Document already has an id');

        const objectToInsert = this.toObject(doc);

        return this.getCollection(doc.getSchema())
            .then(col => col.insert(objectToInsert))
            .then(() => {
                const documentToReturn = doc;
                documentToReturn.setId(objectToInsert._id);
                return documentToReturn;
            });
    }

    get(documentReference) {
        assert(documentReference instanceof DocumentReference, 'Expected a document reference');

        return this.getCollection(documentReference.getSchema())
            .then(col => col.findOne({ _id: documentReference.getId() }))
            .then((data) => {
                if (!data) {
                    return null;
                }
                return this.fromObject(data);
            });
    }

    update(doc) {
        assert(doc instanceof Document);
        assert(doc.getId());

        return this.getCollection(doc.getSchema())
            .then(col => col.updateOne({ _id: doc.getId() }, { $set: { data: doc.getData() } }))
            .then(res => assert(res.result.nModified, 'Expected one document to be updated'));
    }

    toObject(doc) {
        assert(doc instanceof Document);

        return {
            _id: doc.getId() || uuid(),
            schema: doc.getSchema(),
            data: doc.getData(),
        };
    }

    fromObject(data) {
        return Document.create(data.schema, data._id, data.data);
    }
};
