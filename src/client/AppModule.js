import assert from 'assert';

export default class AppModule {
    constructor(bottle) {
        assert(bottle);
        this.bottle = bottle;
    }

    get(dependency) {
        assert.ok(typeof dependency === 'string');
        return this.bottle.container[dependency];
    }
}
