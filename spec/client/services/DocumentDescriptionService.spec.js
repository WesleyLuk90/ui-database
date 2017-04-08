import DocumentDescriptionService from '../../../src/client/components/system/DocumentDescriptionService';
import Document from '../../../src/client/models/Document';
import Schema from '../../../src/client/models/Schema';

describe('DocumentDescriptionService', () => {
    let descriptionService;
    beforeEach(() => {
        descriptionService = new DocumentDescriptionService();
    });

    it('should use the descriptor as the description', () => {
        const schema = Schema.create().setName('My Schema');
        const doc = Document.fromSchema(schema).setDescriptor('abc');
        expect(descriptionService.getDescription(doc)).toBe('abc');
    });

    it('should default to the type and id with no descriptor', () => {
        const schema = Schema.create().setName('My Schema');
        const doc = Document.fromSchema(schema).setId('1234');
        expect(descriptionService.getDescription(doc)).toBe('My Schema (1234)');
    });
});
