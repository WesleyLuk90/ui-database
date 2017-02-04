const Database = require('../../src/server/Database');
const Config = require('../../src/server/Config');

describe('Database', () => {
    it('should connect', (done) => {
        const database = new Database(new Config());

        database.getCollection('test')
            .then((col) => {
                col.insert({ abc: 123 })
                    .then(() => col.findOne({}))
                    .then(val => expect(val.abc).toBe(123))
                    .then(() => col.remove({}));
            })
            .catch(fail)
            .then(done);
    });
});
