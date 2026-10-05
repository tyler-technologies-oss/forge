export interface CEMComponentDeclaration {
  kind: 'class';
  description?: string;
  name: string;
  tagName: string;
  customElement: boolean;
  summary?: string;
  members?: CEMComponentMember[];
  attributes?: CEMComponentAttribute[];
  events?: CEMComponentEvent[];
  cssProperties?: CEMCssProperty[];
  cssParts?: CEMCssPart[];
  slots?: CEMSlot[];
  dependencies?: CEMDependency[];
  superclass?: CEMSuperclass;
  mixins?: CEMMixin[];
  states?: CEMState[];
  cssClasses?: CEMCssClass[];
}

export interface CEMComponentMember {
  kind: 'field' | 'method';
  name: string;
  type?: { text: string };
  privacy: 'public' | 'private' | 'protected';
  description?: string;
  default?: string;
  attribute?: string;
  readonly?: boolean;
  deprecated?: string;
  return?: { type: { text: string } };
  parameters?: CEMParameter[];
  inheritedFrom?: CEMInheritance;
}

export interface CEMComponentAttribute {
  name: string;
  type?: { text: string };
  description?: string;
  default?: string;
  fieldName?: string;
  inheritedFrom?: CEMInheritance;
}

export interface CEMComponentEvent {
  type: { text: string };
  description?: string;
  name: string;
}

export interface CEMCssProperty {
  type?: { text: string };
  description?: string;
  name: string;
}

export interface CEMCssPart {
  description?: string;
  name: string;
}

export interface CEMSlot {
  description?: string;
  name: string;
}

export interface CEMDependency {
  name: string;
  description?: string;
}

export interface CEMSuperclass {
  name: string;
  module: string;
}

export interface CEMMixin {
  name: string;
  module: string;
}

export interface CEMState {
  name: string;
  description?: string;
}

export interface CEMCssClass {
  name: string;
  description?: string;
}

export interface CEMParameter {
  name: string;
  type?: { text: string };
  default?: string;
}

export interface CEMInheritance {
  name: string;
  module: string;
}

export interface CEMModule {
  kind: 'javascript-module';
  path: string;
  declarations: CEMComponentDeclaration[];
  exports: CEMExport[];
}

export interface CEMExport {
  kind: 'js';
  name: string;
  declaration: {
    name: string;
    module: string;
  };
}

export interface CustomElementsManifest {
  schemaVersion: string;
  readme?: string;
  modules: CEMModule[];
}
