import assert from 'assert';
import _ from 'lodash';

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
        this.currentUrl = url;

        let state = _(this.states).first(s => s.url === url);
        if (!state) {
            state = _(this.states).first(s => s.default);
        }
        this.setState(state);
    }

    getUrl() {
        return this.currentUrl;
    }

    setState(state) {
        this.currentState = state;
        this.currentParams = {};
    }

    getState() {
        return this.currentState;
    }

    getParams() {
        return this.currentParams;
    }
}
