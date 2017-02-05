import assert from 'assert';
import RoutingService from '../services/RoutingService';

export default class LocationBinding {
    constructor(window, location, routingService) {
        assert.ok(window);
        assert.ok(location);
        assert.ok(routingService instanceof RoutingService);
        this.window = window;
        this.location = location;
        this.routingService = routingService;
    }

    bind() {
        this.window.addEventListener('hashchange', () => {
            this.loadBrowserUrl();
        });

        this.routingService.getStateStream().subscribe((newState) => {
            if (newState) {
                this.updateBrowserUrl();
            }
        });
        this.loadBrowserUrl();
    }

    updateBrowserUrl() {
        this.setHash(this.routingService.getUrl());
    }

    loadBrowserUrl() {
        this.routingService.toUrl(this.getHash());
    }

    setHash(newHash) {
        this.location.hash = `#${newHash}`;
    }

    getHash() {
        return this.location.hash.replace(/^#/, '');
    }
}
