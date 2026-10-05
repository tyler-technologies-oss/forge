import { Resource } from '@modelcontextprotocol/sdk/types.js';

export interface ForgeResource extends Resource {
  uri: string;
  name: string;
  description?: string;
  mimeType?: string;
}

export interface TemplateContext {
  [key: string]: any;
}
