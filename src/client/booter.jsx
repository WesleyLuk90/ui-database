import ReactDom from 'react-dom';
import React from 'react';
import Page from './components/Page';
import RoutingService from './services/RoutingService';
import LocationBinding from './bindings/LocationBinding';

export default function boot() {
    const element = document.createElement('div');
    document.body.appendChild(element);

    ReactDom.render(React.createElement(Page), element);


    const routingService = new RoutingService();

    routingService.register({ name: 'schemas', url: '/schemas' });
    routingService.register({ name: 'home', url: '/', default: '/' });

    const binder = new LocationBinding(window, window.location, routingService);
    binder.bind();
}
