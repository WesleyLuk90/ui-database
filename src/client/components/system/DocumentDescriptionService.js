import assert from 'assert';
import Document from '../../models/Document';

export default class DocumentDescriptionService {
    getDescription(doc) {
        assert(doc instanceof Document, 'Expected a document');

        const descriptor = doc.getDescriptor();
        if (descriptor) {
            return descriptor;
        }
        return `${doc.getSchema().getName()} (${doc.getId()})`;
    }
}

DocumentDescriptionService.$name = 'DocumentDescriptionService';
