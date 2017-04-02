import Q from 'q';
import AppModuleProvider from '../../../src/client/AppModuleProvider';

export default function makeAppWithRoutes() {
    const appModule = AppModuleProvider.create();

    const statesProvider = appModule.get('StatesProvider');
    statesProvider.bind(appModule);

    const service = appModule.get('HttpService');
    spyOn(service, 'get').and.callFake((url) => {
        const message = `Unexpected get request to ${url}`;
        console.error(message);
        return Q.reject(new Error(message));
    });
    spyOn(service, 'post').and.callFake((url) => {
        const message = `Unexpected post request to ${url}`;
        console.error(message);
        return Q.reject(new Error(message));
    });
    spyOn(service, 'put').and.callFake((url) => {
        const message = `Unexpected put request to ${url}`;
        console.error(message);
        return Q.reject(new Error(message));
    });

    appModule.get('Logger').disableLogging();
    return appModule;
}
