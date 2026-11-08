import type { ToolRenderFunction, ToolRenderer } from '../types/index.js';

export interface CreateToolRendererElementConfig {
  elementTag: keyof HTMLElementTagNameMap;
}

export interface CreateToolRendererFunctionConfig<TArgs = Record<string, unknown>, TResult = unknown> {
  render: ToolRenderFunction<TArgs, TResult>;
}

export type CreateToolRendererConfig<TArgs = Record<string, unknown>, TResult = unknown> =
  | CreateToolRendererElementConfig
  | CreateToolRendererFunctionConfig<TArgs, TResult>;

function isElementConfig<TArgs, TResult>(config: CreateToolRendererConfig<TArgs, TResult>): config is CreateToolRendererElementConfig {
  return 'elementTag' in config;
}

export function createToolRenderer<TArgs = Record<string, unknown>, TResult = unknown>(
  config: CreateToolRendererConfig<TArgs, TResult>
): ToolRenderer<TArgs, TResult> {
  if (isElementConfig(config)) {
    return {
      elementTag: config.elementTag
    };
  }

  return {
    render: config.render
  };
}
