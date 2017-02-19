const RequestError = require('./RequestError');

module.exports = class DuplicateKeyError extends RequestError {
    constructor(name, id) {
        super(`The ${name} with id '${id}' already exists`);
    }
};
