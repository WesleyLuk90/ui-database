const ServerToolkit = require('./ServerToolkit');
const superagent = require('superagent');

describe('Server', () => {
    const server = ServerToolkit.createServer();

    it('should get the base url', () => {
        expect(server.getBaseUrl()).toBe('http://localhost:58081');
    });

    it('should serve pages', (done) => {
        superagent(`${server.getBaseUrl()}`)
            .then((response) => {
                expect(response.text).toMatch(/<html>/);
            })
            .catch(fail)
            .then(done);
    });

    it('should handle errors', (done) => {
        superagent.post(`${server.getBaseUrl()}/api/schema/`, { id: 'invalid_id', name: 'thing', fields: [] })
            .then(fail)
            .catch((e) => {
                expect(e.status).toBe(400);
                expect(e.response.body.error.name).toBe('NotFoundError');
                expect(e.response.body.error.message).toMatch(/The schema with id 'invalid_id' was not found/);
            })
            .catch(fail)
            .then(done);
    });
});
