const assert = require('assert');
const Server = require('./Server');
const express = require('express');
const path = require('path');

module.exports = class RoutesProvider {
    provide(server) {
        assert.ok(server instanceof Server);

        server.getApp().use('/', express.static(path.join(__dirname, '../../public')));
    }
};
