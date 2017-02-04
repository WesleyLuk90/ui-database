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
});
