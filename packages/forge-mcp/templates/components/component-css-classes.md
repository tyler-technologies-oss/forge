# {{name}} - CSS Classes

**CSS-Only Variants**: These classes provide the visual styling of Forge components for native HTML elements. Use these when you need only the appearance without the component functionality. **Do not apply these classes to Forge components themselves.**

{{#if hasCssClasses}}
| CSS Class | Description |
|-----------|-------------|
{{#each cssClasses}}
| `{{name}}` | {{#if description}}{{description}}{{else}}No description{{/if}} |
{{/each}}
{{else}}
No CSS classes available for this component.
{{/if}}