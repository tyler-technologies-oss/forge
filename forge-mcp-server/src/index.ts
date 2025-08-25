#!/usr/bin/env node

import { ForgeServer } from './server.js';

async function main() {
  try {
    const server = new ForgeServer();
    await server.start();
  } catch (error) {
    console.error('Failed to start Tyler Forge MCP Server:', error);
    process.exit(1);
  }
}

main().catch(console.error);