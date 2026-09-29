import { Tool, CallToolResult } from '@modelcontextprotocol/sdk/types.js';

/**
 * Base interface for tool input validation and processing
 */
export interface ToolInput {
  [key: string]: any;
}

/**
 * Base interface that all tool handlers must implement
 */
export interface ToolHandler<TInput extends ToolInput = ToolInput> {
  /**
   * Get the tool definition for MCP protocol
   */
  getTool(): Tool;

  /**
   * Execute the tool with the provided arguments
   * @param args The tool arguments from the MCP request
   * @returns The tool response
   */
  execute(args: TInput): Promise<CallToolResult>;
}

/**
 * Abstract base class providing common tool functionality
 */
export abstract class BaseToolHandler<TInput extends ToolInput = ToolInput>
  implements ToolHandler<TInput>
{
  constructor(
    protected readonly name: string,
    protected readonly description: string,
  ) {}

  public abstract getTool(): Tool;
  public abstract execute(args: TInput): Promise<CallToolResult>;

  /**
   * Helper method to create a text response
   */
  protected _createTextResponse(text: string): CallToolResult {
    return {
      content: [
        {
          type: 'text',
          text,
        },
      ],
    };
  }

  /**
   * Helper method to validate required parameters
   */
  protected _validateRequired(
    args: TInput,
    requiredFields: (keyof TInput)[],
  ): void {
    for (const field of requiredFields) {
      if (args[field] === undefined || args[field] === null) {
        throw new Error(`Missing required parameter: ${String(field)}`);
      }
    }
  }
}
