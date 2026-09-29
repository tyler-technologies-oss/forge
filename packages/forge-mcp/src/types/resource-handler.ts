/**
 * Interface that all resource handlers must implement for consistency
 */
export interface ResourceHandler<TInput = any, TOutput = string> {
  /**
   * Get the resource content
   * @param input The input data needed to get the resource
   * @returns The resource content (typically markdown)
   */
  get?(input: TInput): Promise<TOutput> | TOutput;
}

/**
 * Base interface for resource handlers that don't require async operations
 */
export interface SyncResourceHandler<TInput = any, TOutput = string>
  extends ResourceHandler<TInput, TOutput> {
  get?(input: TInput): TOutput;
}

/**
 * Base interface for resource handlers that require async operations
 */
export interface AsyncResourceHandler<TInput = any, TOutput = string>
  extends ResourceHandler<TInput, TOutput> {
  get?(input: TInput): Promise<TOutput>;
}
