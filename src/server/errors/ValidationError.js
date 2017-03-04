const RequestError = require('./RequestError');
const assert = require('assert');

class ValidationError extends RequestError {
    static validate(truthy, message) {
        assert(message);
        if (!truthy) {
            throw new ValidationError(message);
        }
    }
}

module.exports = ValidationError;
