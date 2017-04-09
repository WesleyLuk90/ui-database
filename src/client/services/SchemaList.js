import _ from 'lodash';

export default class SchemaList {
    constructor(schemaService) {
        this.schemaService = schemaService;
        this.schemas = [];
        this.loaded = false;
    }

    isLoaded() {
        return this.loaded;
    }

    refresh() {
        return this.schemaService.list()
            .then((schemas) => {
                this.schemas = schemas;
                this.loaded = true;
            });
    }

    getAsync(id) {
        if (!this.isLoaded()) {
            return this.refresh()
                .then(() => this.getSchemaById(id));
        }
        return Promise.resolve(this.getSchemaById(id));
    }

    getSchemaById(id) {
        return _(this.schemas)
            .filter(schema => schema.getId() === id)
            .first() || null;
    }

    getSchemaByUniqueDescription(description) {
        return _(this.schemas)
            .filter(schema => schema.getUniqueDescription() === description)
            .first() || null;
    }

    getSchemaUniqueDescriptions() {
        return this.schemas.map(s => s.getUniqueDescription());
    }
}

SchemaList.$name = 'SchemaList';
SchemaList.$inject = ['SchemaService'];
