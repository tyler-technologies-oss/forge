import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { createForgeDocsServer as createServer } from './core/index.js';

export async function createForgeDocsServer(server: Server): Promise<void> {
  await createServer(server);
}
