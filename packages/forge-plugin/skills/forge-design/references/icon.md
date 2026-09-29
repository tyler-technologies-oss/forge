# Icon

## ⚠️ CRITICAL: Icon Import Path ⚠️

**ALWAYS import from `@tylertech/tyler-icons` - NEVER use subpaths like `/standard` or `/extended`.**

The `/standard` path **DOES NOT EXIST**. Any import using a subpath will fail.

```typescript
// ✅ CORRECT - the ONLY valid import path
import { tylIconHome, tylIconSettings, tylIconClose } from '@tylertech/tyler-icons';
IconRegistry.define([tylIconHome, tylIconSettings, tylIconClose]);

// ❌ WRONG - these paths DO NOT EXIST and will cause errors
import { tylIconHome } from '@tylertech/tyler-icons/standard';   // DOES NOT EXIST
import { tylIconHome } from '@tylertech/tyler-icons/extended';   // DOES NOT EXIST
import { tylIconHome } from '@tylertech/tyler-icons/custom';     // DOES NOT EXIST
```

---

## Rules

1. **ALWAYS import from `@tylertech/tyler-icons` ONLY** - See critical section above. NO SUBPATHS EXIST.
2. **Always use `aria-label` on icon buttons** for accessibility
3. **DO NOT use self-closing tags** UNLESS writing React code - Use `<forge-icon></forge-icon>` not `<forge-icon />`
4. **Register icons before use** - Call `IconRegistry.define()` with the imported icon definitions
