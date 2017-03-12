import DomUtils from '../../../../src/client/components/utils/DomUtils';

describe('DomUtils', () => {
    it('should find parents', () => {
        const parent = {};
        const node = { parentNode: parent };
        const otherNode = { parentNode: parent };

        expect(DomUtils.isAncestorOf(parent, node)).toBe(true);
        expect(DomUtils.isAncestorOf(parent, otherNode)).toBe(true);
        expect(DomUtils.isAncestorOf(otherNode, node)).toBe(false);
        expect(DomUtils.isAncestorOf(node, otherNode)).toBe(false);
        expect(DomUtils.isAncestorOf(node, node)).toBe(false);
    });
});
