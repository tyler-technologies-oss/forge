#!/usr/bin/env node

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createForgeServer } from './server.js';

async function main(): Promise<void> {
  const server = await createForgeServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(() => process.exit(1));
