const assert = require('assert');
const Schema = require('./Schema');
const Document = require('./Document');
const uuid = require('./uuid');
const DocumentReference = require('./DocumentReference');
const NotFoundError = require('./errors/NotFoundError');
const CursorVisitor = require('./CursorVisitor');
const ListResults = require('./ListResults');
const ListOptions = require('./ListOptions');
const SchemaStorage = require('./SchemaStorage');
const DescriptorPopulator = require('./DescriptorPopulator');
const DocumentCollectionProvider = require('./DocumentCollectionProvider');

class DocumentStorage {
    constructor(documentCollectionProvider, schemaStorage, descriptorPopulator) {
        assert(documentCollectionProvider instanceof DocumentCollectionProvider);
        assert(schemaStorage instanceof SchemaStorage);
        assert(descriptorPopulator instanceof DescriptorPopulator);
        this.documentCollectionProvider = documentCollectionProvider;
        this.schemaStorage = schemaStorage;
        this.descriptorPopulator = descriptorPopulator;
    }

    clear(schema) {
        assert(schema instanceof Schema, 'Requires a schema');

        return this.documentCollectionProvider.get(schema.getId())
            .then(col => col.remove({}));
    }

    create(doc) {
        assert(doc instanceof Document);
        assert(!doc.getId(), 'Document already has an id');

        return this.preprocessToNewObj(doc)
            .then(objectToInsert => this.documentCollectionProvider.get(doc.getSchema())
                .then(col => col.insert(objectToInsert))
                .then(() => {
                    const documentToReturn = doc;
                    documentToReturn.setId(objectToInsert._id);
                    documentToReturn.setDescriptor(doc.descriptor);
                    documentToReturn.setCreatedAt(new Date(objectToInsert.createdAt));
                    documentToReturn.setUpdatedAt(new Date(objectToInsert.updatedAt));
                    return documentToReturn;
                }));
    }

    get(documentReference) {
        assert(documentReference instanceof DocumentReference, 'Expected a document reference');

        return this.documentCollectionProvider.get(documentReference.getSchema())
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

        return this.preprocessToObject(doc)
            .then(dataToUpdate => this.documentCollectionProvider.get(doc.getSchema())
                .then(col => col.updateOne({ _id: doc.getId() }, { $set: dataToUpdate }))
                .then((res) => {
                    if (res.result.nModified !== 1) {
                        throw new NotFoundError('document', doc.getId());
                    }
                    return this.get(doc.toReference());
                }));
    }

    list(schema, optionsOrNull) {
        assert(typeof schema === 'string' && schema);
        const options = optionsOrNull == null ? ListOptions.create() : optionsOrNull;
        assert(options instanceof ListOptions);

        return this.documentCollectionProvider.get(schema)
            .then((col) => {
                const results = [];
                let cursor = null;
                if (options.getSearch()) {
                    cursor = col.find({ $text: { $search: options.getSearch() } });
                } else {
                    cursor = col.find({});
                }
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

    preprocessToObject(doc) {
        return this.schemaStorage.get(doc.getSchema())
            .then((schema) => {
                this.descriptorPopulator.populate(doc, schema);
                return {
                    data: doc.getData(),
                    descriptor: doc.getDescriptor(),
                    updatedAt: new Date().toJSON(),
                };
            });
    }

    preprocessToNewObj(doc) {
        assert(!doc.getId());
        return this.preprocessToObject(doc)
            .then((object) => {
                const newObject = object;
                newObject._id = uuid();
                newObject.schema = doc.getSchema();
                newObject.createdAt = new Date().toJSON();
                return newObject;
            });
    }

    fromObject(data) {
        return Document.create(data.schema, data._id, data.data)
            .setDescriptor(data.descriptor || '')
            .setUpdatedAt(new Date(data.updatedAt))
            .setCreatedAt(new Date(data.createdAt));
    }
}

DocumentStorage.$name = 'DocumentStorage';
DocumentStorage.$inject = ['DocumentCollectionProvider', 'SchemaStorage', 'DescriptorPopulator'];
module.exports = DocumentStorage;
