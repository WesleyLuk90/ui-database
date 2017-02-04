const assert = require('assert');
const Server = require('./Server');
const express = require('express');
const path = require('path');
const Database = require('./Database');
const bodyParser = require('body-parser');
const SchemaController = require('./SchemaController');
const SchemaStorage = require('./SchemaStorage');
const RequestError = require('./errors/RequestError');

module.exports = class RoutesProvider {
    constructor(database) {
        assert(database instanceof Database);

        this.database = database;
    }

    loadMiddleware(server) {
        const app = server.getApp();
        app.use(bodyParser.json());
        app.use('/', express.static(path.join(__dirname, '../../public')));
    }

    loadRoutes(server) {
        const schemaController = new SchemaController(new SchemaStorage(this.database));
        const app = server.getApp();
        app.get('/api/schema/:id', schemaController.getRouteHandler('get'));
        app.put('/api/schema/', schemaController.getRouteHandler('create'));
        app.get('/api/schema/', schemaController.getRouteHandler('list'));
        app.post('/api/schema/', schemaController.getRouteHandler('update'));
    }

    loadErrorHandlers(server) {
        const app = server.getApp();
        app.use((err, req, res, next) => {
            // TODO add logging
            if (res.headersSent) {
                return next(err);
            }
            if (err instanceof RequestError) {
                return res.status(400).send({
                    error: {
                        name: err.name,
                        message: err.message,
                        stack: err.stack,
                    },
                });
            }
            return next(err);
        });
    }

    provide(server) {
        assert(server instanceof Server);

        this.loadMiddleware(server);
        this.loadRoutes(server);
        this.loadErrorHandlers(server);
    }
};
