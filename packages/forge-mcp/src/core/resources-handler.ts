import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { getResourceManager } from '../resources/index.js';

export class ResourcesHandler {
  private _resourceManager = getResourceManager();

  public async initialize(): Promise<void> {
    await this._resourceManager.initialize();
  }

  public registerHandlers(server: Server): void {
    // Handle resource listing
    server.setRequestHandler(ListResourcesRequestSchema, async () => {
      try {
        const resources = await this._resourceManager.listResources();
        return { resources };
      } catch (error) {
        throw new Error(
          `Failed to list resources: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
      }
    });

    // Handle resource reading
    server.setRequestHandler(ReadResourceRequestSchema, async request => {
      try {
        const { uri } = request.params;

        if (!(await this._resourceManager.isValidResourceUri(uri))) {
          throw new Error(`Invalid resource URI: ${uri}`);
        }

        const content = await this._resourceManager.readResource(uri);

        return {
          contents: [
            {
              uri,
              mimeType: 'text/markdown',
              text: content,
            },
          ],
        };
      } catch (error) {
        throw new Error(
          `Failed to read resource: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
      }
    });
  }
}
