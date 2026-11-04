import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { createForgeDocsServer as createServer } from './core/index.js';
import { getServerInstructions } from './services/server-instructions.js';
import { SERVER_VERSION } from './version.js';

export async function createForgeDocsServer(server: Server): Promise<void> {
  await createServer(server);
}

/** A Forge MCP server with its capabilities and the live Forge rules as `instructions`. */
export async function createForgeServer(): Promise<Server> {
  const server = new Server(
    {
      name: '@tylertech/forge-mcp',
      version: SERVER_VERSION
    },
    {
      capabilities: {
        tools: {},
        resources: {},
        prompts: {}
      },
      instructions: await getServerInstructions()
    }
  );
  await createServer(server);
  return server;
}
