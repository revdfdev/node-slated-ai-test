const _ = require('lodash');

require('dotenv').config();

const SERVER_SCRIPTS = {
    'dateserver': './workers/dateserver.js',
}

const WORKER_TYPE = process.env.WORKER_TYPE || null;

if (_.isEmpty(WORKER_TYPE) && _.isEmpty(SERVER_SCRIPTS[WORKER_TYPE])) {
    console.log(
        'no such WORKER_TYPE, possible values - ' +
        JSON.stringify(Object.keys(SERVER_SCRIPTS)),
    );
    process.exit(1);
}
console.log('Loaded config environment : ' + process.env.NODE_ENV);
console.log('Loaded worker type : ' + WORKER_TYPE);

require(SERVER_SCRIPTS[WORKER_TYPE]).worker.start();