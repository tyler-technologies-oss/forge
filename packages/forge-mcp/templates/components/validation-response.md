# API Validation Results: {{tagName}}

**Component:** `<{{tagName}}>`
**Total APIs Validated:** {{totalValidated}}

## Summary

- ✅ **Valid APIs:** {{validApis.length}}
- ❌ **Unmatched APIs:** {{invalidApis.length}}
- ⚠️ **Deprecated APIs:** {{deprecatedApis.length}}

## 📋 Important Context

**Standard HTML attributes are always valid:** Standard HTML attributes (aria-*, data-*, id, class, role, tabindex, etc.) are valid on all web components even if not listed in metadata. Do NOT remove these attributes.

**This tool validates API names only:** Only use this tool to fix incorrect component-specific API names (properties, attributes, events, methods, slots, CSS properties/parts/classes). Replace unmatched component APIs with the correct names from the "Available APIs" section below.

**For structural validation:** Do NOT restructure code based on this tool alone. Use the component usage examples tool to verify correct component structure and patterns.

{{#if invalidApis.length}}
## ❌ Unmatched APIs

These APIs were not found in component metadata. Standard HTML/ARIA/data-* attributes can be safely ignored. For component-specific APIs, check Available APIs below for correct names:

{{#each invalidApis}}
- **`{{name}}`** ({{apiType}})
{{/each}}

{{/if}}
{{#if deprecatedApis.length}}
## ⚠️ Deprecated APIs

These APIs exist but are deprecated:

{{#each deprecatedApis}}
- **`{{name}}`** ({{apiType}}){{#if deprecationMessage}}
  - 📝 **Deprecation:** {{deprecationMessage}}{{/if}}
{{/each}}

{{/if}}
{{#if validApis.length}}
## ✅ Valid APIs

These APIs are correctly available:

{{#each validApis}}
- **`{{name}}`** ({{apiType}})
{{/each}}

{{/if}}
{{#if invalidApis.length}}
## 📚 Available APIs

Component-specific APIs available (use these to replace unmatched component APIs):

{{#if availableApis.properties.length}}
**Properties:**
{{#each availableApis.properties}}
- **`{{name}}`**{{#if description}} - {{description}}{{/if}}
{{/each}}
{{/if}}
{{#if availableApis.attributes.length}}
**Attributes:**
{{#each availableApis.attributes}}
- **`{{name}}`**{{#if description}} - {{description}}{{/if}}
{{/each}}
{{/if}}
{{#if availableApis.events.length}}
**Events:**
{{#each availableApis.events}}
- **`{{name}}`**{{#if description}} - {{description}}{{/if}}
{{/each}}
{{/if}}
{{#if availableApis.methods.length}}
**Methods:**
{{#each availableApis.methods}}
- **`{{name}}`**{{#if description}} - {{description}}{{/if}}
{{/each}}
{{/if}}
{{#if availableApis.slots.length}}
**Slots:**
{{#each availableApis.slots}}
- **`{{name}}`**{{#if description}} - {{description}}{{/if}}
{{/each}}
{{/if}}
{{#if availableApis.cssProperties.length}}
**CSS Properties:**
{{#each availableApis.cssProperties}}
- **`{{name}}`**{{#if description}} - {{description}}{{/if}}
{{/each}}
{{/if}}
{{#if availableApis.cssParts.length}}
**CSS Parts:**
{{#each availableApis.cssParts}}
- **`{{name}}`**{{#if description}} - {{description}}{{/if}}
{{/each}}
{{/if}}
{{#if availableApis.cssClasses.length}}
**CSS Classes:**
{{#each availableApis.cssClasses}}
- **`{{name}}`**{{#if description}} - {{description}}{{/if}}
{{/each}}
{{/if}}

{{/if}}
{{#if (and (eq invalidApis.length 0) (eq deprecatedApis.length 0))}}
🎉 **All validated APIs are correct and up-to-date!**
{{/if}}