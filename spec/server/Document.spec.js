const Document = require('../../src/server/Document');

describe('Document', () => {
    it('should be creatable', () => {
        const doc = Document.create('schema', 'id', { data: 1 });
        expect(doc.getSchema()).toBe('schema');
        expect(doc.getId()).toBe('id');
        expect(doc.getData()).toEqual({ data: 1 });
    });
});
