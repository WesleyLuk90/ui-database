const RequestError = require('./RequestError');

class NotFoundError extends RequestError {
    constructor(name, id) {
        super(`The ${name} with id '${id}' was not found`);
    }
}

module.exports = NotFoundError;
