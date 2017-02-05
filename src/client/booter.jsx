import ReactDom from 'react-dom';
import React from 'react';
import Page from './components/Page';
import AppModule from './AppModule';

export default function boot() {
    const element = document.createElement('div');
    document.body.appendChild(element);

    ReactDom.render(React.createElement(Page), element);

    const appModule = new AppModule();

    const routingService = appModule.get('RoutingService');
    routingService.register({ name: 'schemas', url: '/schemas' });
    routingService.register({ name: 'home', url: '/', default: '/' });

    const binder = appModule.get('LocationBinding');
    binder.bind();
}
