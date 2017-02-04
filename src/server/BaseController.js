const assert = require('assert');

module.exports = class BaseController {
    getRouteHandler(method) {
        assert(typeof this[method] === 'function');
        return (req, res, next) => this[method](req)
            .then(result => res.json({ result }))
            .catch(e => next(e));
    }
};
