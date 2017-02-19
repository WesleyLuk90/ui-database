const RequestError = require('./RequestError');
const assert = require('assert');

module.exports = class ValidationError extends RequestError {
    static validate(truthy, message) {
        assert(message);
        if (!truthy) {
            throw new ValidationError(message);
        }
    }
};
