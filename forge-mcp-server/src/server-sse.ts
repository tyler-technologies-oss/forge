import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import express from 'express';
import cors from 'cors';
import { ForgeServerBase } from './server-base.js';

export class ForgeMCPServer extends ForgeServerBase {
  private app: express.Application;

  constructor() {
    super();
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.setupRoutes();
  }

  private setupRoutes() {
    this.app.get('/health', (_req, res) => {
      res.json({ status: 'ok', service: 'forge-mcp-server' });
    });

    this.app.get('/sse', async (_req, res) => {
      const transport = new SSEServerTransport('/message', res);
      await this.server.connect(transport);
    });

    this.app.post('/message', async (_req, res) => {
      // This is handled by the SSE transport
      res.status(404).json({ error: 'Use SSE endpoint' });
    });
  }

  async start(port = 3000) {
    return new Promise((resolve) => {
      this.app.listen(port, () => {
        console.log(`Tyler Forge MCP Server (SSE) running on port ${port}`);
        console.log(`Health check: http://localhost:${port}/health`);
        console.log(`SSE endpoint: http://localhost:${port}/sse`);
        resolve(undefined);
      });
    });
  }
}