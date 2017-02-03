const Client = require('../../src/server/Config');

describe('Client', () => {
    it('should load values from the environment', () => {
        const originalHost = process.env['DB_HOST'];
        process.env['DB_HOST'] = 'some host';
        const client = new Client();
        expect(client.getDbHost()).toBe('some host');
        process.env['DB_HOST'] = originalHost;
    });

    it('should be using testing values', () => {
        const client = new Client();
        expect(client.getDbDatabase()).toBe('uidatabase_test');
    });
});
