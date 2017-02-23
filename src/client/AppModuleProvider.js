import Bottle from 'bottlejs';
import superagent from 'superagent';

import AppModule from './AppModule';
import LocationBinding from './bindings/LocationBinding';
import RoutingService from './services/RoutingService';
import StateBindings from './bindings/StateBindings';
import Logger from './services/Logger';
import SchemaService from './services/SchemaService';
import HttpService from './services/HttpService';
import ErrorService from './services/ErrorService';
import ErrorFormattingService from './services/ErrorFormattingService';
import SchemaListStore from './stores/SchemaListStore';
import UrlFactory from './services/UrlFactory';
import DocumentsSchemaStore from './stores/DocumentsSchemaStore';
import DocumentService from './services/DocumentService';
import NewDocumentStore from './stores/NewDocumentStore';

Bottle.config.strict = true;

export default class AppModuleProvider {
    static create() {
        const bottle = new Bottle();
        bottle.value('window', window);
        bottle.value('location', window.location);
        bottle.register(LocationBinding);
        bottle.register(RoutingService);
        bottle.register(StateBindings);
        bottle.register(HttpService);
        bottle.register(SchemaService);
        bottle.register(DocumentService);
        bottle.register(ErrorService);
        bottle.register(ErrorFormattingService);
        bottle.register(SchemaListStore);
        bottle.register(DocumentsSchemaStore);
        bottle.register(NewDocumentStore);
        bottle.register(UrlFactory);
        bottle.constant('superagent', superagent);
        bottle.register(Logger);
        return new AppModule(bottle);
    }
}
