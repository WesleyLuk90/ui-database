const Client = require('../../src/server/Config');

describe('Client', () => {
    it('should load values from the environment', () => {
        process.env['DB_HOST'] = 'some host';
        const client = new Client();
        expect(client.getDbHost()).toBe('some host');
    });
});
