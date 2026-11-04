# Icon Search Results for "{{query}}"

Found {{resultCount}} matching icon{{#unless (eq resultCount 1)}}s{{/unless}}:

{{#each results}}
## {{inc @index}}. {{name}}

**Score:** {{score}} ({{matchType}} match)
**ESM Import:** `{{esmImportName}}`
{{#if keywords.length}}**Keywords:** {{join keywords ", "}}{{/if}}

{{/each}}

---

## Next Steps

### 1. Import the Icon
```javascript
import { {{#each results}}{{esmImportName}}{{#unless @last}}, {{/unless}}{{/each}} } from '@tylertech/tyler-icons';
```

### 2. Register with IconRegistry
```javascript
import { IconRegistry } from '@tylertech/forge';

IconRegistry.define([{{#each results}}{{esmImportName}}{{#unless @last}}, {{/unless}}{{/each}}]);
```

### 3. Use in HTML
```html
{{#each results}}
<forge-icon name="{{name}}"></forge-icon>
{{/each}}
```

---

**⚠️ Important:** Always use icons that exist in the Tyler Icons library rather than guessing names. Use this `find_icons` tool to discover available icons.

**Need help setting up icons?** Use the `setup_icons` tool for complete installation, registration, and usage instructions.