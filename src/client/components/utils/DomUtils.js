export default class DomUtils {
    static isAncestorOf(parent, possibleChild) {
        let candidate = possibleChild.parentNode;
        while (candidate) {
            if (candidate === parent) {
                return true;
            }
            candidate = candidate.parentNode;
        }
        return false;
    }
}
