const assert = require('assert');

class CursorVisitor {
    constructor(cursor) {
        assert(cursor);
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
}

module.exports = CursorVisitor;
