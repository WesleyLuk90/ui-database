const assert = require('assert');
const Database = require('./Database');
const Schema = require('./Schema');
const Document = require('./Document');
const uuid = require('./uuid');
const DocumentReference = require('./DocumentReference');

module.exports = class DocumentStorage {
    constructor(database) {
        assert.ok(database instanceof Database);
        this.database = database;
    }

    getCollection(schema) {
        assert.ok(typeof schema === 'string');
        return this.database.getCollection(schema);
    }

    clear(schema) {
        assert.ok(schema instanceof Schema);

        return this.getCollection(schema.getId())
            .then(col => col.remove({}));
    }

    create(doc) {
        assert.ok(doc instanceof Document);
        assert.ok(!doc.getId(), 'Document already has an id');

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
        assert.ok(documentReference instanceof DocumentReference, 'Expected a document reference');

        return this.getCollection(documentReference.getSchema())
            .then(col => col.findOne({ _id: documentReference.getId() }))
            .then((data) => {
                if (!data) {
                    return null;
                }
                return this.fromObject(data);
            });
    }

    toObject(doc) {
        assert.ok(doc instanceof Document);

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
