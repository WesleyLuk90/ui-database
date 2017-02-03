const Schema = require('../../src/server/Schema');

describe('Schema', () => {
    it('should validate ids', () => {
        expect(() => Schema.create('stuff', 'good_id')).not.toThrow();
        expect(() => Schema.create('stuff', 'fail -id')).toThrow();
        expect(() => Schema.create('stuff', '123')).toThrow();
        expect(() => Schema.create('stuff', '!@#')).toThrow();
    });
});
