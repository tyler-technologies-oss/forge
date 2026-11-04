#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createForgeDocsServer } from './server.js';
import { SERVER_VERSION } from './version.js';

async function main(): Promise<void> {
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
      }
    }
  );

  await createForgeDocsServer(server);

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(() => process.exit(1));
