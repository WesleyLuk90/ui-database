const assert = require('assert');
const Server = require('./Server');
const express = require('express');
const path = require('path');
const Database = require('./Database');
const bodyParser = require('body-parser');

module.exports = class RoutesProvider {
    constructor(database) {
        assert.ok(database instanceof Database);

        this.database = database;
    }

    loadMiddleware(server) {
        server.getApp().use(bodyParser.json());
        server.getApp().use('/', express.static(path.join(__dirname, '../../public')));
    }

    loadRoutes(server) {

    }

    provide(server) {
        assert.ok(server instanceof Server);

        this.loadMiddleware(server);
        this.loadRoutes(server);
    }
};
