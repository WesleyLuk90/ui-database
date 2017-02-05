import assert from 'assert';
import _ from 'lodash';
import Q from 'q';

export default class RoutingService {
    constructor() {
        this.states = [];
        this.currentUrl = null;
        this.currentState = null;
        this.currentParams = null;
        this.loadedParams = null;
    }

    register(state) {
        assert.ok(state.name);
        assert.ok(state.url);

        this.states.push(state);
    }

    toUrl(url) {
        assert.ok(typeof url === 'string');

        let state = _(this.states).first(s => s.url === url || url.match(s.url));
        if (!state) {
            state = _(this.states).first(s => s.default);
        }
        return this.updateState(url, state);
    }

    getUrl() {
        return this.currentUrl;
    }

    updateState(url, state) {
        const match = url.match(state.url);
        const params = match.slice();
        const asyncParams = state.onEnter ? state.onEnter(params) : params;

        return this.resolvePromises(asyncParams)
            .then((loadedParams) => {
                this.currentUrl = url;
                this.currentState = state;
                this.currentParams = loadedParams;
            });
    }

    resolvePromises(asyncParams) {
        if (Array.isArray(asyncParams)) {
            return Q.all(asyncParams);
        }
        const output = {};
        return Q.all(Object.keys(asyncParams)
            .map(key => Q.when(asyncParams[key])
                .then((value) => { output[key] = value; }))
        ).then(() => output);
    }

    getState() {
        return this.currentState;
    }

    getParams() {
        return this.currentParams;
    }
}
