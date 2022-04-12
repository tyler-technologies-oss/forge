jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

const testsContext = require.context('.', true, /\.spec\.ts$/);
testsContext.keys().forEach(testsContext);
