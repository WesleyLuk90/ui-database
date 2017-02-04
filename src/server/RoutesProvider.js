const assert = require('assert');
const Server = require('./Server');
const express = require('express');
const path = require('path');
const Database = require('./Database');

module.exports = class RoutesProvider {
    constructor(database) {
        assert.ok(database instanceof Database);

        this.database = database;
    }

    provide(server) {
        assert.ok(server instanceof Server);

        server.getApp().use('/', express.static(path.join(__dirname, '../../public')));
    }
};
