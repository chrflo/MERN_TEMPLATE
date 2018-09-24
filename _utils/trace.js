/*
 * author: Mike Smullin
 * repo: https://gist.github.com/mikesmullin/008721d4753d3e0d9a95cda617874736
 */

const path = require('path');

exports.trace = function (s) {
    const orig = Error.prepareStackTrace;
    Error.prepareStackTrace = (_, stack) => stack;
    const err = new Error();
    Error.captureStackTrace(err, arguments.callee);
    Error.prepareStackTrace = orig;
    const callee = err.stack[0];
    process.stdout.write(`${path.relative(process.cwd(), callee.getFileName())}:${callee.getLineNumber()}: ${s}\n`);
}