import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { ResourcesHandler } from './resources-handler.js';
import { ToolsHandler } from './tools-handler.js';
import { PromptsHandler } from './prompts-handler.js';

export async function createForgeDocsServer(server: Server): Promise<void> {
  const resourcesHandler = new ResourcesHandler();
  const toolsHandler = new ToolsHandler();
  const promptsHandler = new PromptsHandler();

  // Initialize handlers
  await resourcesHandler.initialize();

  // Register resource handlers
  resourcesHandler.registerHandlers(server);

  // Register tool handlers
  toolsHandler.registerHandlers(server);

  // Register prompt handlers
  promptsHandler.registerHandlers(server);
}
