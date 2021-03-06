import Bottle from 'bottlejs';
import superagent from 'superagent';

import AppModule from './AppModule';
import LocationBinding from './bindings/LocationBinding';
import RoutingService from './services/RoutingService';
import Logger from './services/Logger';
import SchemaService from './services/SchemaService';
import HttpService from './services/HttpService';
import ErrorService from './services/ErrorService';
import ErrorFormattingService from './services/ErrorFormattingService';
import SchemaListStore from './stores/SchemaListStore';
import UrlFactory from './services/UrlFactory';
import DocumentsSchemaStore from './stores/DocumentsSchemaStore';
import DocumentService from './services/DocumentService';
import LocationService from './services/LocationService';
import StatesProvider from './bindings/StatesProvider';
import SchemaStateStore from './stores/SchemaStateStore';
import DocumentDescriptionService from './components/system/DocumentDescriptionService';
import SchemaList from './services/SchemaList';
import ReferenceOptionsProvider from './services/ReferenceOptionsProvider';

Bottle.config.strict = true;

export default class AppModuleProvider {
    static create() {
        const bottle = new Bottle();
        bottle.value('window', window);
        bottle.value('location', window.location);
        bottle.register(LocationBinding);
        bottle.register(RoutingService);
        bottle.register(StatesProvider);
        bottle.register(HttpService);
        bottle.register(SchemaService);
        bottle.register(DocumentService);
        bottle.register(ErrorService);
        bottle.register(ErrorFormattingService);
        bottle.register(SchemaListStore);
        bottle.register(DocumentsSchemaStore);
        bottle.register(LocationService);
        bottle.register(UrlFactory);
        bottle.register(SchemaStateStore);
        bottle.register(DocumentDescriptionService);
        bottle.register(SchemaList);
        bottle.register(ReferenceOptionsProvider);
        bottle.constant('superagent', superagent);
        bottle.register(Logger);
        return new AppModule(bottle);
    }
}
