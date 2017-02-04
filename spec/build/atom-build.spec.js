const build = require('../../.atom-build');

describe('atom-build', () => {
    it('should match errors', () => {
        const sampleOutput = `
Started
.............F.......

Failures:
1) SchemaController api should expose create
  Message:
    Expected undefined to be truthy.

  Stack:
    Error: Expected undefined to be truthy.
        at superagent.put.then (C:\\Users\\wesleyluk\\Desktop\\Projects\\ui-database\\spec\\server\\SchemaController.spec.js:103:46)
        at process._tickCallback (internal/process/next_tick.js:103:7)
  Message:
    Expected undefined to be truthy.
  Stack:
    Error: Expected undefined to be truthy.
        at superagent.put.then (C:\\Users\\wesleyluk\\Desktop\\Projects\\ui-database\\spec\\server\\SchemaController.spec.js:104:46)
        at process._tickCallback (internal/process/next_tick.js:103:7)

21 specs, 1 failure
Finished in 0.347 seconds`;
        const errors = build.functionMatch(sampleOutput);
        expect(errors).toEqual([
            {
                file: 'C:\\Users\\wesleyluk\\Desktop\\Projects\\ui-database\\spec\\server\\SchemaController.spec.js',
                line: '103',
                col: '46',
                message: 'SchemaController api should expose create\nExpected undefined to be truthy.',
            },
            {
                file: 'C:\\Users\\wesleyluk\\Desktop\\Projects\\ui-database\\spec\\server\\SchemaController.spec.js',
                line: '104',
                col: '46',
                message: undefined,
            },
        ]);
    });
});
