const RequestError = require('../../../src/server/errors/RequestError');

describe('RequestError', () => {
    it('should have error properties', () => {
        const err = new RequestError('some err');
        expect(err.message).toBe('some err');
        expect(err.stack).toBeTruthy();
        expect(err.name).toBe('RequestError');
    });
});
