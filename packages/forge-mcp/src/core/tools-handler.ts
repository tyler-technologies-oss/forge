import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { createToolRegistry } from '../tools/index.js';

export class ToolsHandler {
  private _toolRegistry = createToolRegistry();

  public registerHandlers(server: Server): void {
    // Handle tool listing
    server.setRequestHandler(ListToolsRequestSchema, async () => {
      try {
        return {
          tools: this._toolRegistry.getTools(),
        };
      } catch (error) {
        throw new Error(
          `Failed to list tools: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
      }
    });

    // Handle tool execution
    server.setRequestHandler(CallToolRequestSchema, async request => {
      try {
        const { name, arguments: args } = request.params;
        return await this._toolRegistry.execute(name, args);
      } catch (error) {
        throw new Error(
          `Failed to execute tool: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
      }
    });
  }
}
