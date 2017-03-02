const assert = require('assert');

module.exports = class BaseController {
    getRouteHandler(method) {
        assert(typeof this[method] === 'function');
        return (req, res, next) => this[method](req)
            .then((result) => {
                if (result && result.toJSON) {
                    return res.json(result.toJSON());
                }
                return res.json({ result });
            })
            .catch(e => next(e));
    }
};
