import { CEMComponentDeclaration, TemplateContext } from '../types/index.js';

/**
 * Build the Handlebars template context for a CEM component. Every consumer
 * of component documentation (full docs, summary, API quick reference) uses
 * this so a new CEM field is exposed everywhere at once.
 */
export function buildComponentTemplateContext(
  component: CEMComponentDeclaration,
): TemplateContext {
  const publicMembers =
    component.members?.filter(m => m.privacy === 'public') || [];
  const properties = publicMembers.filter(m => m.kind === 'field');
  const methods = publicMembers.filter(m => m.kind === 'method');

  return {
    // Basic info
    name: component.name,
    tagName: component.tagName,
    description: component.description,
    summary: component.summary,

    // API surfaces
    attributes: component.attributes || [],
    events: component.events || [],
    properties,
    methods,
    cssProperties: component.cssProperties || [],
    cssParts: component.cssParts || [],
    slots: component.slots || [],
    states: component.states || [],
    cssClasses: component.cssClasses || [],

    // Dependencies and inheritance
    dependencies: component.dependencies || [],

    // Computed helpers
    hasAttributes: (component.attributes?.length || 0) > 0,
    hasEvents: (component.events?.length || 0) > 0,
    hasProperties: properties.length > 0,
    hasMethods: methods.length > 0,
    hasCssProperties: (component.cssProperties?.length || 0) > 0,
    hasCssParts: (component.cssParts?.length || 0) > 0,
    hasSlots: (component.slots?.length || 0) > 0,
    hasStates: (component.states?.length || 0) > 0,
    hasCssClasses: (component.cssClasses?.length || 0) > 0,
    hasDependencies: (component.dependencies?.length || 0) > 0,
  };
}
