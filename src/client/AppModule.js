import assert from 'assert';

export default class AppModule {
    constructor(bottle) {
        assert(bottle);
        this.bottle = bottle;
    }

    get(dependency) {
        assert.ok(typeof dependency === 'string', 'Requires a dependency name');
        assert.ok(this.bottle.container[dependency], `Unknown dependency '${dependency}'`);
        return this.bottle.container[dependency];
    }
}
