const assert = require('assert');

module.exports = class CursorVisitor {
    constructor(cursor) {
        assert.ok(cursor);
        this.cursor = cursor;
    }

    visit(visitor) {
        return this.cursor.next().then((doc) => {
            if (!doc || !visitor(doc)) {
                return null;
            }
            return this.visit(visitor);
        });
    }
};
