import assert from 'assert';
import React from 'react';
import RoutingService from '../services/RoutingService';
import Home from '../components/Home';
import System from '../components/system/System';
import AppModule from '../AppModule';
import Schemas from '../components/system/Schemas';
import NewSchema from '../components/system/NewSchema';
import EditSchema from '../components/system/EditSchema';
import Documents from '../components/system/Documents';
import SchemaDocuments from '../components/system/SchemaDocuments';
import NewDocument from '../components/system/NewDocument';
import EditDocument from '../components/system/EditDocument';

export default class StatesProvider {
    constructor(routingService) {
        assert.ok(routingService instanceof RoutingService);
        this.routingService = routingService;
    }

    bind(appModule) {
        assert(appModule instanceof AppModule);

        this.routingService.register({
            name: 'system',
            url: '/system/',
            view: <System appModule={appModule} />,
        });
        this.routingService.register({
            name: 'schemas',
            url: '/system/schemas/',
            view: <Schemas appModule={appModule} />,
            onEnter: () => appModule.get('SchemaListStore').load(),
        });
        this.routingService.register({
            name: 'schemas.create',
            url: '/system/schemas/create',
            view: <NewSchema appModule={appModule} />,
        });
        this.routingService.register({
            name: 'schemas.edit',
            url: '/system/schemas/edit/:id',
            onEnter(match) {
                return {
                    view: appModule.get('SchemaService').get(match[1])
                        .then(schema => <EditSchema appModule={appModule} schema={schema} />),
                };
            },
        });
        this.routingService.register({
            name: 'documents',
            url: '/system/documents/',
            view: <Documents appModule={appModule} />,
            onEnter: () => appModule.get('SchemaListStore').load(),
        });
        this.routingService.register({
            name: 'documents.forschema',
            url: '/system/documents/:id',
            view: <SchemaDocuments appModule={appModule} />,
            onEnter: match => appModule.get('DocumentsSchemaStore').load(match[1]),
        });
        this.routingService.register({
            name: 'documents.create',
            url: '/system/documents/:id/create',
            onEnter(match) {
                return {
                    view: appModule.get('SchemaService').get(match[1])
                        .then(schema => <NewDocument appModule={appModule} schema={schema} />),
                };
            },
        });
        this.routingService.register({
            name: 'documents.edit',
            url: '/system/documents/:schema/:id/edit',
            onEnter(match) {
                return {
                    view: appModule.get('DocumentService').get(match[1], match[2])
                        .then(doc => <EditDocument appModule={appModule} document={doc} />),
                };
            },
        });
        this.routingService.register({
            name: 'home',
            url: '/',
            default: '/',
            view: <Home />,
        });
    }
}

StatesProvider.$name = 'StatesProvider';
StatesProvider.$inject = ['RoutingService'];
