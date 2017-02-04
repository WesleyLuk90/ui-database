const RequestError = require('./RequestError');

module.exports = class NotFoundError extends RequestError {
    constructor(name, id) {
        super(`The ${name} with id '${id}' was not found`);
    }
};
