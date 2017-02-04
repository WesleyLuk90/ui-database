const Schema = require('../../src/server/Schema');

describe('Schema', () => {
    it('should validate ids', () => {
        expect(() => Schema.create('stuff', 'good_id')).not.toThrow();
        expect(() => Schema.create('stuff', 'fail -id')).toThrow();
        expect(() => Schema.create('stuff', 'NoCapsAllowed')).toThrow();
        expect(() => Schema.create('stuff', 'abc123')).not.toThrow();
        expect(() => Schema.create('stuff', '!@#')).toThrow();
    });
});
