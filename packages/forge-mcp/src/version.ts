import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export const { version: SERVER_VERSION } = require('../package.json') as { version: string };
