const express = require('express');
const Q = require('q');
const assert = require('assert');

module.exports = class Server {
    constructor(config) {
        this.config = config;
        this.app = express();
    }

    start() {
        assert.ok(!this.httpServer, 'Server has already been started');
        const defer = Q.defer();
        this.httpServer = this.app.listen(this.config.getListenPort(), defer.resolve);
        return defer.promise;
    }

    getBaseUrl() {
        const port = parseInt(this.config.getListenPort(), 10);
        const portString = port !== 80 ? `:${this.config.getListenPort()}` : '';
        return `http://${this.config.getHostname()}${portString}`;
    }

    getApp() {
        return this.app;
    }

    stop() {
        assert.ok(this.httpServer, 'Server is not started');
        const defer = Q.defer();
        this.httpServer.close(defer.resolve);
        return defer.promise.then(() => {
            this.httpServer = null;
        });
    }
};
