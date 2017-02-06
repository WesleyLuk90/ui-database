import ReactDom from 'react-dom';
import React from 'react';
import Page from './components/Page';
import AppModule from './AppModule';

export default function boot() {
    const appModule = new AppModule();

    const routingService = appModule.get('RoutingService');
    routingService.register({ name: 'schemas', url: '/schemas' });
    routingService.register({ name: 'home', url: '/', default: '/' });

    const binder = appModule.get('LocationBinding');
    binder.bind();

    ReactDom.render(<Page appModule={appModule} />, document.querySelector('.page-container'));
}
