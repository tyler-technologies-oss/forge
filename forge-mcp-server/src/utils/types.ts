export interface ForgeComponent {
  name: string;
  tagName: string;
  description: string;
  category: string;
  properties: ComponentProperty[];
  events: ComponentEvent[];
  slots: ComponentSlot[];
  cssVariables: CssVariable[];
  variants?: string[];
  themes?: string[];
  hasCSSOnly?: boolean;
  dependencies?: string[];
  accessibility?: string;
  examples?: ComponentExample[];
}

export interface ComponentProperty {
  name: string;
  type: string;
  default?: string;
  description: string;
  required: boolean;
}

export interface ComponentEvent {
  name: string;
  detail?: string;
  description: string;
}

export interface ComponentSlot {
  name: string;
  description: string;
}

export interface CssVariable {
  name: string;
  default?: string;
  description: string;
}

export interface ComponentExample {
  title: string;
  description?: string;
  code: string;
  framework: 'vanilla' | 'react' | 'angular' | 'vue';
}

export interface DesignToken {
  category: 'color' | 'typography' | 'spacing' | 'elevation' | 'shape' | 'animation';
  name: string;
  value: string;
  cssVariable: string;
  description?: string;
}

export type Framework = 'vanilla' | 'react' | 'angular' | 'vue' | 'svelte' | 'blazor';

export interface GenerateComponentOptions {
  component: string;
  framework: Framework;
  variant?: string;
  theme?: string;
  props?: Record<string, any>;
  slots?: Record<string, string>;
  events?: string[];
  cssOnly?: boolean;
}