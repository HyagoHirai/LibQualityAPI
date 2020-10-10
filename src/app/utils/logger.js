const bunyan = require('bunyan');
const path = require('path');

function getLabel(callingModule) {
    const parts = callingModule.filename.split(path.sep);
    return path.join(parts[parts.length - 2], parts.pop());
}

module.exports = function logger(callingModule) {
    return bunyan.createLogger({
        name: 'LibQuality',
        file: getLabel(callingModule),
        streams: [{
            level: 'info',
            stream: process.stdout, // log INFO and above to stdout
        }],
    });
};
