import ReactDom from 'react-dom';
import React from 'react';
import Page from './components/Page';
import AppModuleProvider from './AppModuleProvider';

export default function boot() {
    const appModule = AppModuleProvider.create();

    const routingService = appModule.get('RoutingService');
    const errorService = appModule.get('ErrorService');
    routingService.getErrorStream().subscribe(e => errorService.handleError(e));

    const statesProvider = appModule.get('StatesProvider');
    statesProvider.bind(appModule);

    const binder = appModule.get('LocationBinding');
    binder.bind();

    ReactDom.render(<Page appModule={appModule} />, document.querySelector('.page-container'));
}
