import { Tool, CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { ToolHandler, ToolInput } from './tool-handler.js';
import {
  getToolCallCache,
  ToolCallCache,
} from '../services/tool-call-cache.js';

/**
 * Central registry for managing MCP tool handlers, providing registration,
 * discovery, and execution of Tyler Forge documentation tools.
 *
 * The registry maintains a mapping of tool names to their handlers and provides
 * unified access for the MCP protocol to discover and execute available tools.
 */
export class ToolRegistry {
  private readonly _handlers = new Map<string, ToolHandler>();
  private readonly _cache: ToolCallCache = getToolCallCache();

  /**
   * Register a tool handler in the registry.
   *
   * @param handler - The tool handler to register
   * @throws Error if a tool with the same name is already registered
   */
  public register<TInput extends ToolInput>(
    handler: ToolHandler<TInput>,
  ): void {
    const tool = handler.getTool();
    this._handlers.set(tool.name, handler);
  }

  /**
   * Get all registered tools formatted for MCP protocol discovery.
   *
   * @returns Array of Tool definitions for MCP client consumption
   */
  public getTools(): Tool[] {
    return Array.from(this._handlers.values()).map(handler =>
      handler.getTool(),
    );
  }

  /**
   * Execute a registered tool by name with the provided arguments.
   * Results are cached to avoid redundant computations within a session.
   *
   * @param name - The name of the tool to execute
   * @param args - The arguments to pass to the tool (optional)
   * @returns Promise resolving to the tool execution result
   * @throws Error if the tool name is not found in the registry
   */
  public async execute(
    name: string,
    args: ToolInput | undefined,
  ): Promise<CallToolResult> {
    const handler = this._handlers.get(name);
    if (!handler) {
      throw new Error(`Unknown tool: ${name}`);
    }

    const normalizedArgs = args || {};
    const cacheKey = this._cache.generateKey(name, normalizedArgs);

    if (this._cache.has(cacheKey)) {
      return this._cache.get(cacheKey)!;
    }

    const result = await handler.execute(normalizedArgs);
    this._cache.set(cacheKey, result);

    return result;
  }

  /**
   * Clear the tool call cache.
   */
  public clearCache(): void {
    this._cache.clear();
  }

  /**
   * Get cache statistics for diagnostics.
   */
  public getCacheStats(): { size: number; hits: number; misses: number } {
    return this._cache.getStats();
  }
}
