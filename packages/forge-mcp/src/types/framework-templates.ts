export type ExampleType = 'basic' | 'advanced' | 'complete';

export interface TemplateProperty {
  name: string;
  type?: string;
  default?: string;
  required?: boolean;
  description?: string;
  // Framework-specific formatted binding
  binding?: string;
}

export interface TemplateEvent {
  name: string;
  description?: string;
  // Framework-specific formatted handler
  handler?: string;
  handlerName?: string;
}
