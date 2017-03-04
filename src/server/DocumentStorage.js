const assert = require('assert');
const Database = require('./Database');
const Schema = require('./Schema');
const Document = require('./Document');
const uuid = require('./uuid');
const DocumentReference = require('./DocumentReference');
const NotFoundError = require('./errors/NotFoundError');
const CursorVisitor = require('./CursorVisitor');
const ListResults = require('./ListResults');
const ListOptions = require('./ListOptions');
const SchemaStorage = require('./SchemaStorage');

class DocumentStorage {
    constructor(database, schemaStorage) {
        assert(database instanceof Database);
        assert(schemaStorage instanceof SchemaStorage);
        this.database = database;
        this.schemaStorage = schemaStorage;
    }

    getCollection(schema) {
        assert(typeof schema === 'string');
        return this.database.getCollection(`doc_${schema}`);
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
        objectToInsert.updatedAt = new Date().toJSON();
        objectToInsert.createdAt = new Date().toJSON();

        return this.getCollection(doc.getSchema())
            .then(col => col.insert(objectToInsert))
            .then(() => {
                const documentToReturn = doc;
                documentToReturn.setId(objectToInsert._id);
                documentToReturn.setCreatedAt(new Date(objectToInsert.createdAt));
                documentToReturn.setUpdatedAt(new Date(objectToInsert.updatedAt));
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

        const toUpdate = {
            data: doc.getData(),
            updatedAt: new Date().toJSON(),
        };

        return this.getCollection(doc.getSchema())
            .then(col => col.updateOne({ _id: doc.getId() }, { $set: toUpdate }))
            .then((res) => {
                if (res.result.nModified !== 1) {
                    throw new NotFoundError('document', doc.getId());
                }
                return this.get(doc.toReference());
            });
    }

    list(schema, optionsOrNull) {
        assert(typeof schema === 'string' && schema);
        const options = optionsOrNull == null ? ListOptions.create() : optionsOrNull;
        assert(options instanceof ListOptions);

        return this.getCollection(schema)
            .then((col) => {
                const results = [];
                const cursor = col.find({});
                const visitor = new CursorVisitor(cursor);
                return visitor
                    .visit((doc) => {
                        results.push(this.fromObject(doc));
                        return results.length < options.getLimit();
                    })
                    .then(() => cursor.count())
                    .then(count => ListResults.create(results).setTotal(count));
            });
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
        return Document.create(data.schema, data._id, data.data)
            .setUpdatedAt(new Date(data.updatedAt))
            .setCreatedAt(new Date(data.createdAt));
    }
}

DocumentStorage.$name = 'DocumentStorage';
DocumentStorage.$inject = ['Database', 'SchemaStorage'];
module.exports = DocumentStorage;
