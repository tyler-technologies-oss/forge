#!/usr/bin/env node

import { createServer, IncomingMessage, ServerResponse } from 'http';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { createForgeDocsServer } from './core/server.js';
import { getCEMLoader } from './services/cem-loader.js';

const MCP_PATH = '/mcp';
const MAX_BODY_BYTES = 4 * 1024 * 1024; // 4mb, matches SDK's own request size limit

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers':
    'Content-Type, Accept, Mcp-Session-Id, Mcp-Protocol-Version',
  'Access-Control-Expose-Headers': 'Mcp-Session-Id',
};

function sendJsonRpcError(
  res: ServerResponse,
  status: number,
  message: string,
): void {
  res.writeHead(status, { 'Content-Type': 'application/json' }).end(
    JSON.stringify({
      jsonrpc: '2.0',
      error: { code: -32000, message },
      id: null,
    }),
  );
}

function readRequestBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let received = 0;
    const chunks: Buffer[] = [];

    req.on('data', chunk => {
      received += chunk.length;
      if (received > MAX_BODY_BYTES) {
        reject(new Error('Request body too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf-8');
      if (!raw) {
        resolve(undefined);
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error('Invalid JSON in request body'));
      }
    });

    req.on('error', reject);
  });
}

async function handleMcpRequest(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  let parsedBody: unknown;
  try {
    parsedBody = req.method === 'POST' ? await readRequestBody(req) : undefined;
  } catch (error) {
    sendJsonRpcError(
      res,
      400,
      error instanceof Error ? error.message : 'Invalid request body',
    );
    return;
  }

  const server = new Server(
    {
      name: '@tylertech/forge-mcp',
      version: '0.1.0',
    },
    {
      capabilities: {
        tools: {},
        resources: {},
        prompts: {},
      },
    },
  );

  // Stateless mode: no session ID is issued, so each request gets a fresh
  // Server/transport pair rather than being tied to a long-lived session.
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  res.on('close', () => {
    transport.close();
    server.close();
  });

  try {
    await createForgeDocsServer(server);
    await server.connect(transport);
    await transport.handleRequest(req, res, parsedBody);
  } catch (error) {
    if (!res.headersSent) {
      sendJsonRpcError(
        res,
        500,
        error instanceof Error ? error.message : 'Internal server error',
      );
    }
  }
}

const httpServer = createServer((req, res) => {
  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  if (req.method === 'OPTIONS') {
    res.writeHead(204).end();
    return;
  }

  const url = new URL(req.url ?? '/', 'http://localhost');

  if (url.pathname === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain' }).end('ok');
    return;
  }

  if (url.pathname !== MCP_PATH) {
    res.writeHead(404).end('Not found');
    return;
  }

  if (req.method === 'POST') {
    handleMcpRequest(req, res).catch(() => {
      if (!res.headersSent) {
        sendJsonRpcError(res, 500, 'Internal server error');
      }
    });
    return;
  }

  // Stateless mode has no server-initiated SSE stream or session to delete.
  sendJsonRpcError(res, 405, 'Method not allowed.');
});

async function primeCEMData(): Promise<void> {
  try {
    await getCEMLoader().loadCEM();
    for (const pkg of getCEMLoader().getLoadedPackages()) {
      console.warn(
        `Forge MCP: loaded ${pkg.packageName} from ${pkg.manifestPath}`,
      );
    }
  } catch (error) {
    // Don't block startup - each request re-attempts loadCEM() via
    // ResourcesHandler.initialize() until it succeeds.
    console.warn(
      `Forge MCP: failed to preload CEM data (will retry per-request): ${error instanceof Error ? error.message : error}`,
    );
  }
}

const port = Number(process.env.PORT) || 3000;
primeCEMData().then(() => {
  httpServer.listen(port, () => {
    console.warn(`Forge MCP Streamable HTTP server listening on port ${port}`);
  });
});
