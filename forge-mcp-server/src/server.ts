import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { ForgeServerBase } from './server-base.js';

export class ForgeServer extends ForgeServerBase {
  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Tyler Forge MCP Server started');
  }
}