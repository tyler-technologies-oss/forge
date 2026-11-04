# Security Quick Reference - Rich Text Editor

> **Quick security checklist and common patterns for developers using the Rich Text Editor**

---

## ✅ Security Checklist

### Before Production Deployment

- [ ] URL validation is always enforced (no configuration needed — cannot be disabled)
- [ ] Character limits are set (`max-length="..."`)
- [ ] Server-side validation is implemented
- [ ] CSP headers are configured
- [ ] Error handling is in place
- [ ] Security tests are passing
- [ ] Content is sanitized before storage
- [ ] Output is validated before display

### When Displaying Content

- [ ] Use `<forge-rich-text-renderer>` for read-only display
- [ ] Never use `innerHTML` with editor output
- [ ] Validate content source (trusted vs untrusted)
- [ ] Log security-related errors
- [ ] Monitor for blocked protocols

---

## 🚫 Blocked Content

### Dangerous Protocols

```
❌ javascript:alert(1)
❌ data:text/html,<script>alert(1)</script>
❌ vbscript:msgbox(1)
❌ file:///etc/passwd
❌ about:blank
❌ blob:https://...
```

### Dangerous Elements

```
❌ <script>
❌ <iframe>
❌ <object>
❌ <embed>
❌ <svg>
❌ <math>
❌ <link>
❌ <style>
❌ <form>
❌ <base>
```

### Dangerous Attributes

```
❌ onclick="..."
❌ onerror="..."
❌ onload="..."
❌ data-*="..."
❌ style="..."
```

---

## ✅ Safe Usage Patterns

### Basic Setup (Trusted Users)

```typescript
<forge-rich-text-editor
  max-length="10000"
  @change=${this.handleChange}>
  <forge-rte-standard-tools></forge-rte-standard-tools>
  <forge-rte-link></forge-rte-link>
</forge-rich-text-editor>

handleChange(e) {
  // e.detail.json is ProseMirror JSON — call toHTML() for HTML output
  const html = this.editor.toHTML();
  // Safe to save - already sanitized
  this.saveContent(html);
}
```

### Display Untrusted Content

```typescript
<forge-rich-text-renderer
  .content=${externalContent}>
</forge-rich-text-renderer>

// Renderer automatically sanitizes input
```

### Get Sanitized Output

```typescript
const editor = document.querySelector('forge-rich-text-editor');

// ✅ Safe - HTML entities escaped, dangerous elements removed
const html = editor.toHTML();

// ✅ Safe - Text-based format
const markdown = editor.toMarkdown();

// ⚠️ Validate before rendering - ProseMirror JSON
const json = editor.toJSON();
```

### Server-Side Validation (Required)

```typescript
// Client-side
const html = editor.toHTML();
await fetch('/api/content', {
  method: 'POST',
  body: JSON.stringify({ content: html })
});

// Server-side (Node.js example)
app.post('/api/content', (req, res) => {
  const content = req.body.content;

  // Validate and sanitize server-side
  const sanitized = sanitizeHTML(content, {
    allowedTags: ['p', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'strong', 'em', 'u', 's', 'a', 'code'],
    allowedAttributes: {
      a: ['href', 'target', 'rel']
    },
    allowedProtocols: ['http', 'https']
  });

  // Store sanitized content
  db.save({ content: sanitized });
});
```

---

## ⚠️ High-Risk Patterns (Avoid)

### ❌ Attempting to Disable URL Validation

```typescript
// URL validation is unconditional — there is no validate-urls attribute.
// Any attempt to bypass it (e.g. custom link marks injected directly) is
// blocked by the JSON sanitizer before content reaches the editor.
```

### ❌ Using innerHTML Directly

```typescript
// UNSAFE - Bypasses sanitization
element.innerHTML = editor.toHTML();

// SAFE - Use textContent or createElement
element.textContent = editor.toHTML();
```

### ❌ Trusting Untrusted JSON

```typescript
// UNSAFE - No server-side validation
const content = await fetch('/api/untrusted').then(r => r.json());
editor.content = content;

// SAFE - Validate on server first
const content = await fetch('/api/validated').then(r => r.json());
editor.content = content; // Still sanitized client-side
```

### ❌ Suppressing Security Errors

```typescript
// UNSAFE - Hides security warnings
<forge-rich-text-editor suppress-errors="true">
```

---

## 🛡️ Security Features (Automatic)

### Output Sanitization

- HTML entities escaped (`<` → `&lt;`)
- Dangerous elements removed
- Event handlers stripped
- Recursive text node escaping

### Input Validation

- JSON depth limit (50 levels)
- Node count limit (5,000 nodes)
- Protocol validation in links
- URL-encoding detection

### Paste Handler

- Dangerous elements blocked
- Event handlers removed
- Formatting preserved (if enabled)
- Scripts stripped

---

## 🔍 Security Testing

### Quick Manual Tests

```javascript
// Test 1: XSS via script tag
editor.content = '<p><script>alert(1)</script></p>';
console.assert(!editor.toHTML().includes('<script>'));

// Test 2: XSS via javascript: protocol
link.linkUrl = 'javascript:alert(1)';
console.assert(link.validationError !== '');

// Test 3: XSS via JSON
editor.content = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Link',
          marks: [{ type: 'link', attrs: { href: 'javascript:alert(1)' } }]
        }
      ]
    }
  ]
};
console.assert(!editor.toHTML().includes('javascript:'));

// Test 4: DoS via depth
let deep = { type: 'doc', content: [] };
let current = deep.content;
for (let i = 0; i < 51; i++) {
  const node = { type: 'paragraph', content: [] };
  current.push(node);
  current = node.content;
}
try {
  editor.content = deep;
  console.error('Depth limit not enforced');
} catch (e) {
  console.assert(e.message.includes('depth'));
}
```

### Automated Tests

```bash
# Run security test suite
pnpm run test:extended --files='**/rich-text-security.test.ts'
```

---

## 📊 Security Limits

| Feature           | Limit          | Reason         |
| ----------------- | -------------- | -------------- |
| JSON Depth        | 50 levels      | DoS prevention |
| Node Count        | 5,000 nodes    | DoS prevention |
| Character Count   | Configurable   | DoS prevention |
| Allowed Protocols | http, https    | XSS prevention |
| HTML Content Size | 1MB (enforced) | DoS prevention |

---

## 🔗 CSP Configuration

### Recommended

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self';
  frame-ancestors 'none';
```

### Why 'unsafe-inline' for styles?

TipTap requires inline styles for editor functionality. All component scripts are CSP-compliant.

---

## 📞 Security Contact

**Found a security issue?**

- ✉️ Email: security@tylertech.com
- 🚫 Do NOT open public GitHub issues for security vulnerabilities

---

## 📚 More Information

- [Complete Security Guide](./SECURITY.md) - Detailed security documentation
- [API Documentation](../../../stories/components/rich-text-editor/RichTextEditor.mdx) - Component API with security notes
- [Test Suite](./rich-text-security.test.ts) - Security test examples

---

**Last Updated:** 2026-06-22  
**Version:** 1.6.2+
