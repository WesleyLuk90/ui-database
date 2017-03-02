const ListOptions = require('../../src/server/ListOptions');

describe('ListOptions', () => {
    it('should have default values', () => {
        const options = ListOptions.create();
        expect(options.getLimit()).toBe(100);
    });

    it('should set values', () => {
        const options = ListOptions.create();
        options.setLimit(200);
        expect(options.getLimit()).toBe(200);
    });
});
