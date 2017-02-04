const assert = require('assert');
const Config = require('./Config');
const MongoClient = require('mongodb').MongoClient;

module.exports = class Database {
    constructor(config) {
        assert(config instanceof Config);
        this.config = config;
    }

    getConnection() {
        if (!this.connection) {
            this.connection = MongoClient.connect(this.getConnectionUrl());
        }
        return this.connection;
    }

    getCollection(name) {
        return this.getConnection()
            .then(conn => conn.collection(name));
    }

    getConnectionUrl() {
        let userString = '';
        if (this.config.getDbUser() && this.config.getDbPassword()) {
            userString = `${this.config.getDbUser()}:${this.config.getDbPassword()}@`;
        }
        return `mongodb://${userString}${this.config.getDbHost()}:${this.config.getDbPort()}/${this.config.getDbDatabase()}`;
    }
};
