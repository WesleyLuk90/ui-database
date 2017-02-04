const assert = require('assert');

module.exports = class BaseController {
    getRouteHandler(method) {
        assert.ok(typeof this[method] === 'function');
        return (req, res, next) => this[method](req)
            .catch(e => next(e))
            .then(result => res.json({ result }));
    }
};
