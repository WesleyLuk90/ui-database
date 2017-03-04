const assert = require('assert');
const Server = require('./Server');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const SchemaController = require('./SchemaController');
const RequestError = require('./errors/RequestError');
const DocumentController = require('./DocumentController');

class RoutesProvider {
    constructor(schemaController, documentController) {
        assert(schemaController instanceof SchemaController);
        assert(documentController instanceof DocumentController);
        this.schemaController = schemaController;
        this.documentController = documentController;
    }

    loadMiddleware(server) {
        const app = server.getApp();
        app.use(bodyParser.json());
        app.use('/', express.static(path.join(__dirname, '../../public')));
    }

    loadRoutes(server) {
        const app = server.getApp();
        app.get('/api/schema/:id', this.schemaController.getRouteHandler('get'));
        app.put('/api/schema/', this.schemaController.getRouteHandler('create'));
        app.get('/api/schema/', this.schemaController.getRouteHandler('list'));
        app.post('/api/schema/', this.schemaController.getRouteHandler('update'));

        app.get('/api/document/:schema/:id', this.documentController.getRouteHandler('get'));
        app.put('/api/document/:schema/', this.documentController.getRouteHandler('create'));
        app.get('/api/document/:schema/', this.documentController.getRouteHandler('list'));
        app.post('/api/document/:schema/:id', this.documentController.getRouteHandler('update'));
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
}

RoutesProvider.$name = 'RoutesProvider';
RoutesProvider.$inject = ['SchemaController', 'DocumentController'];

module.exports = RoutesProvider;
