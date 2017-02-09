import ReactDom from 'react-dom';
import React from 'react';
import Page from './components/Page';
import AppModuleProvider from './AppModuleProvider';

export default function boot() {
    const appModule = AppModuleProvider.create();

    const stateBindings = appModule.get('StateBindings');
    stateBindings.bind(appModule);

    const binder = appModule.get('LocationBinding');
    binder.bind();

    ReactDom.render(<Page appModule={appModule} />, document.querySelector('.page-container'));
}
