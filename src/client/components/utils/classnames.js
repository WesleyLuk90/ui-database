export default function classnames(...classes) {
    const classList = [];
    classes.forEach((klass) => {
        if (typeof klass === 'string') {
            classList.push(klass);
        } else if (typeof klass === 'object') {
            Object.keys(klass).forEach((klassName) => {
                if (klass[klassName]) {
                    classList.push(klassName);
                }
            });
        } else {
            throw new Error(`Invalid class ${klass}`);
        }
    });
    return classList.join(' ');
}
