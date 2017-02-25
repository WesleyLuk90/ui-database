import assert from 'assert';
import _ from 'lodash';
import Q from 'q';
import Rx from 'rx';

export default class RoutingService {
    static getShorthandRegex() {
        return /(:\w+)/g;
    }

    constructor() {
        this.states = [];
        this.currentUrl = null;
        this.currentState = null;
        this.currentParams = null;
        this.loadedParams = null;
        this.stateStream = new Rx.BehaviorSubject(null);
        this.currentParamStream = new Rx.BehaviorSubject(null);
        this.errorStream = new Rx.Subject();
    }

    register(state) {
        assert.ok(state.name, 'State requires a name');
        assert.ok(state.url);
        assert(!this.getStateByName(state.name), `Duplicate state name '${state.name}'`);

        const newState = state;
        if (typeof state.url === 'string') {
            const escapedRegex = state.url.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
            const tokenizedRegex = escapedRegex.replace(RoutingService.getShorthandRegex(), '(\\w+)');
            newState._originalUrl = state.url;
            newState.url = new RegExp(`^${tokenizedRegex}$`);
        }

        this.states.push(newState);
    }

    toUrl(url) {
        assert.ok(typeof url === 'string');
        let newUrl = url;

        let state = _(this.states).filter(s => url.match(s.url)).first();
        if (!state) {
            state = _(this.states).filter(s => s.default).first();
            assert.ok(state, `Failed to match url ${url} to any state and no default state was defined`);
            assert.ok(typeof state.default === 'string');
            newUrl = state.default;
        }
        return this.updateState(newUrl, state);
    }

    getUrl() {
        return this.currentUrl;
    }

    updateState(url, state) {
        const match = url.match(state.url) || [];

        const params = match.slice();
        const asyncParams = state.onEnter ? state.onEnter(params) : params;
        assert(asyncParams, 'onEnter should return a value');

        return this.resolvePromises(asyncParams)
            .then((loadedParams) => {
                this.currentUrl = url;
                this.currentState = state;
                this.currentParams = loadedParams;
                if (this.currentState === state) {
                    this.originalParams = params;
                    this.stateStream.onNext(state);
                    this.currentParamStream.onNext(loadedParams);
                }
            }).catch((e) => {
                this.errorStream.onNext(e);
                throw e;
            });
    }

    resolvePromises(asyncParams) {
        if (asyncParams.then) {
            return Q.when(asyncParams);
        }
        if (Array.isArray(asyncParams)) {
            return Q.all(asyncParams);
        }
        const output = {};
        return Q.all(Object.keys(asyncParams)
            .map(key =>
                Q.when(asyncParams[key]).then((value) => {
                    output[key] = value;
                }))).then(() => output);
    }

    getState() {
        return this.currentState;
    }

    getParams() {
        return this.currentParams;
    }

    getOriginalParams() {
        return this.originalParams;
    }

    getParamStream() {
        return this.currentParamStream;
    }

    getStateStream() {
        return this.stateStream;
    }

    getErrorStream() {
        return this.errorStream;
    }

    getStateByName(name) {
        const state = _(this.states).filter(s => s.name === name).first();
        return state;
    }
}

RoutingService.$name = 'RoutingService';
