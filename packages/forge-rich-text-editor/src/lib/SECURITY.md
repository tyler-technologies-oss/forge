# Security Guide - Rich Text Editor

**Component:** Tyler Forge Extended - Rich Text Editor  
**Version:** 1.6.2+  
**Last Updated:** 2026-06-22

---

## Table of Contents

1. [Overview](#overview)
2. [Threat Model](#threat-model)
3. [Security Features](#security-features)
4. [Safe Usage Patterns](#safe-usage-patterns)
5. [Content Security Policy](#content-security-policy)
6. [API Security Notes](#api-security-notes)
7. [Known Limitations](#known-limitations)
8. [Reporting Security Issues](#reporting-security-issues)

---

## Overview

The Tyler Forge Rich Text Editor is designed with security as a primary concern. This component implements multiple layers of protection against common web security vulnerabilities, particularly XSS (Cross-Site Scripting) and injection attacks.

### Security Principles

1. **Defense in Depth** - Multiple layers of validation and sanitization
2. **Secure by Default** - Safe configuration out of the box
3. **Fail Securely** - Graceful degradation on errors
4. **Least Privilege** - Minimal dangerous features enabled

---

## Threat Model

### Trust Boundaries

The rich text editor operates across several trust boundaries:

```
┌─────────────────────────────────────────────────┐
│  Trusted Zone: Application Code                 │
│  - Component configuration                      │
│  - Event handlers                               │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────┐
│  Semi-Trusted: Editor Content                   │
│  - User-created content                         │
│  - May contain formatting/links                 │
│  ⚠️  Sanitized on input and output              │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────┐
│  Untrusted: External Content                    │
│  - Pasted from clipboard                        │
│  - Loaded from external sources                 │
│  ⚠️  Heavily sanitized and validated            │
└─────────────────────────────────────────────────┘
```

### Threat Actors

1. **Malicious Users** - Attempting to inject XSS payloads
2. **Compromised Content** - Untrusted HTML/JSON from external sources
3. **Attack Vectors** - Clipboard paste, API injection, protocol abuse

### Protected Assets

- User session cookies and authentication tokens
- User data and personal information
- Application functionality and availability
- Other users viewing rendered content

---

## Security Features

### 1. Output Sanitization

**Protection:** XSS prevention in HTML output

The `toHTML()` method applies comprehensive sanitization:

```typescript
// All HTML entities are escaped
const html = editor.toHTML();
// Input: <script>alert(1)</script>
// Output: &lt;script&gt;alert(1)&lt;/script&gt;
```

**Features:**

- HTML entity escaping for text content
- Removal of dangerous elements (script, iframe, object, embed, style)
- Stripping of event handler attributes (onclick, onload, etc.)
- Recursive sanitization of all text nodes

### 2. Link Protocol Validation

**Protection:** XSS via malicious link protocols

Links are validated to only allow safe protocols:

```typescript
// ✅ Allowed
https://example.com
http://example.com/path

// ❌ Blocked
javascript:alert(1)
data:text/html,<script>alert(1)</script>
vbscript:alert(1)
file:///etc/passwd
```

**Features:**

- Allowlist: Only `http:` and `https:` allowed
- Detects direct protocol usage
- Detects obfuscated protocols using `startsWith` (no false positives for `?next=about:blank`)
- Detects URL-encoded bypass attempts (`java%09script:` etc.)
- Validates after URL normalization
- IDN/non-ASCII URLs produce a **non-blocking warning** — Apply remains enabled so
  legitimate international URLs work, but users are alerted to verify carefully
- URL validation is always enforced and cannot be disabled via attributes or properties

### 3. Input Sanitization

**Protection:** XSS via setContent() API

Content is sanitized before being passed to the editor:

```typescript
// JSON content is validated and cleaned
editor.content = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Safe text',
          marks: [
            {
              type: 'link',
              attrs: { href: 'javascript:alert(1)' } // ❌ Blocked
            }
          ]
        }
      ]
    }
  ]
};
// Dangerous protocol replaced with '#'
```

**Features:**

- JSON structure depth validation (MAX: 50 levels)
- Node count validation (MAX: 5000 nodes)
- Protocol validation in link marks
- URL-encoded protocol detection
- Removal of dangerous HTML elements
- Removal of dangerous attributes (on*, data-*, style)
- Input parsed via `DOMParser` (inert — no eager `<img src>` beacon fetches)
- **Non-mutating:** sanitization operates on a deep clone (`structuredClone`) so the
  caller's original object is never modified

### 4. Paste Handler Security

**Protection:** XSS via clipboard paste

Pasted content is aggressively sanitized:

```typescript
// User pastes from malicious website
// <svg onload="alert(1)"><script>alert(2)</script></svg>

// After sanitization: content removed entirely
```

**Blocked Elements:**

- `script` - JavaScript execution
- `iframe` - Embedded content
- `svg` - Can contain scripts and event handlers
- `math` - MathML can execute scripts
- `object`, `embed` - Plugin content
- `link`, `style` - CSS injection
- `form`, `input`, `button` - Form elements
- `audio`, `video` - Resource loading
- `base` - URL hijacking

### 5. DoS Prevention

**Protection:** Denial of Service attacks

Limits prevent resource exhaustion:

```typescript
// Deeply nested structure (51+ levels)
❌ Throws: "Maximum nesting depth exceeded (limit: 50)"

// Massive structure (5001+ nodes)
❌ Throws: "Maximum node count exceeded (limit: 5000)"
```

**Features:**

- Depth limit: 50 levels (JSON input)
- Node count limit: 5000 nodes (JSON input)
- HTML content size limit: 1 MB — HTML strings above this size are truncated with a console warning (`[RTE Security] HTML content too large`), applies to both paste and the `.content` property
- Character limit: Configurable via `maxLength` property (enforced at input — TipTap
  `filterTransaction` hard-blocks keystrokes beyond the limit, no overflow is possible)
- Graceful error handling

---

## Safe Usage Patterns

### ✅ Trusted Content (Internal Users)

```typescript
// When content is created by authenticated users in your app
<forge-rich-text-editor
  .content=${userContent}
  validate-urls="true"
  max-length="10000">
</forge-rich-text-editor>

// Output is safe to render
const html = editor.toHTML();
```

### ✅ Untrusted Content (Public/External)

```typescript
// When displaying content from external sources
<forge-rich-text-renderer
  .content=${externalContent}>
</forge-rich-text-renderer>

// Renderer automatically sanitizes input
// Consider additional server-side validation
```

### ⚠️ High-Risk Scenarios

```typescript
// RISK: Rendering toHTML() output as innerHTML
element.innerHTML = editor.toHTML(); // Still sanitized, but prefer forge-rich-text-renderer

// MITIGATION: Use the renderer component, or sanitize server-side before storage
const sanitized = serverSideSanitize(editor.toHTML());
```

### ❌ Unsafe Patterns to Avoid

```typescript
// ❌ DON'T: Trust JSON from untrusted sources without server-side validation
editor.content = await fetch('/api/untrusted/content').then(r => r.json());
// DO: Validate and sanitize on the server before passing to the editor

// ❌ DON'T: Attempt to suppress security warnings — there is no API to do so
// Security logging is unconditional and cannot be disabled
```

---

## Content Security Policy

### Recommended CSP Headers

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

### Why `'unsafe-inline'` for styles?

The component uses:

- **Lit adopted stylesheets** (CSP-compliant) for component styles
- **TipTap inline styles** (requires unsafe-inline) for editor functionality

**Testing CSP Compatibility:**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta
      http-equiv="Content-Security-Policy"
      content="
    default-src 'self';
    style-src 'self' 'unsafe-inline';
    script-src 'self';
  " />
  </head>
  <body>
    <forge-rich-text-editor></forge-rich-text-editor>
    <!-- Test that component renders and functions correctly -->
  </body>
</html>
```

### Additional Security Headers

```http
# Prevent MIME type sniffing
X-Content-Type-Options: nosniff

# Prevent clickjacking
X-Frame-Options: DENY

# Enable XSS protection (legacy browsers)
X-XSS-Protection: 1; mode=block

# Referrer policy
Referrer-Policy: strict-origin-when-cross-origin
```

---

## API Security Notes

### `setContent()` / `.content` property

**Security Level:** 🟡 Medium Risk

```typescript
// Input is sanitized, but prefer trusted sources
editor.content = userInput; // Sanitized automatically

// For untrusted JSON, validate structure first
if (isValidEditorJSON(untrustedJSON)) {
  editor.content = untrustedJSON;
}
```

**Protections:**

- ✅ Dangerous protocols blocked in links
- ✅ Depth and node count limits enforced
- ✅ HTML entities escaped
- ⚠️ Relies on client-side validation (validate server-side too)

### `toHTML()`

**Security Level:** 🟢 Low Risk

```typescript
const html = editor.toHTML();
// Output is sanitized and safe for rendering
```

**Protections:**

- ✅ HTML entities escaped
- ✅ Dangerous elements removed
- ✅ Event handlers stripped
- ✅ Safe to render in most contexts

**Best Practice:** Still validate server-side before persistent storage

### `toMarkdown()`

**Security Level:** 🟢 Low Risk

```typescript
const markdown = editor.toMarkdown();
// Markdown is text-based, minimal XSS risk
```

**Protections:**

- ✅ Markdown format is text-based
- ✅ Links still validated
- ⚠️ Validate before rendering as HTML

### Link Validation

**Security Level:** 🟢 Always enforced

URL validation is unconditional — there is no property or attribute to disable it.
The blocklist (`javascript:`, `data:`, `vbscript:`, `file:`, `about:`, `blob:`) is
checked on every URL, decoded URL, and normalized URL before a link can be applied.

**Recommendation:** Rely on the built-in validation; add server-side URL allowlisting
for stricter control over which domains users may link to.

---

## Known Limitations

### 1. Client-Side Validation Only

The component performs client-side validation. For production applications:

- ✅ **Always validate on the server-side** before storing content
- ✅ **Sanitize output** before serving to other users
- ✅ **Use CSP headers** to limit damage from any bypasses

### 2. TipTap Dependency

Security relies on TipTap's HTML serialization. Keep dependencies updated:

```bash
pnpm update @tiptap/core @tiptap/extension-*
```

### 3. Browser Compatibility

Some security features depend on modern browser APIs:

- `URL` constructor for validation
- `DOMParser` for inert HTML sanitization (no eager resource fetches)
- `structuredClone` for deep copying (polyfilled)

**Minimum Supported Browsers:**

- Chrome 90+
- Firefox 88+
- Safari 15+
- Edge 90+

### 4. No Server-Side Rendering (SSR) Validation

SSR contexts require additional validation. Never trust serialized content:

```typescript
// Server-side (Node.js)
import { sanitizeHTML } from 'your-sanitization-library';

app.post('/api/content', (req, res) => {
  const editorContent = req.body.content;

  // Validate server-side
  const sanitized = sanitizeHTML(editorContent);

  // Store sanitized content
  db.save(sanitized);
});
```

---

## Attack Scenarios & Mitigations

### Scenario 1: XSS via Paste

**Attack:**

```html
User copies from malicious site:
<svg onload="alert(document.cookie)">
  <script>
    steal(document.cookie);
  </script>
</svg>
```

**Mitigation:**

- ✅ Paste handler removes SVG elements
- ✅ Script tags stripped
- ✅ Event handlers removed

**Result:** Attack blocked

---

### Scenario 2: XSS via JSON Injection

**Attack:**

```javascript
fetch('/api/content', {
  method: 'POST',
  body: JSON.stringify({
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Click here',
            marks: [
              {
                type: 'link',
                attrs: { href: 'javascript:alert(document.domain)' }
              }
            ]
          }
        ]
      }
    ]
  })
});
```

**Mitigation:**

- ✅ JSON sanitizer detects `javascript:` protocol
- ✅ Replaced with safe default `#`
- ✅ Console warning logged

**Result:** Attack blocked, safe link rendered

---

### Scenario 3: DoS via Deep Nesting

**Attack:**

```javascript
const malicious = { type: 'doc', content: [] };
let current = malicious.content;
for (let i = 0; i < 1000; i++) {
  const node = { type: 'paragraph', content: [] };
  current.push(node);
  current = node.content;
}
editor.content = malicious; // Try to crash browser
```

**Mitigation:**

- ✅ Depth limit enforced (50 levels)
- ✅ Throws error: "Maximum nesting depth exceeded"
- ✅ Editor remains functional

**Result:** Attack blocked, error displayed

---

### Scenario 4: Protocol Encoding Bypass

**Attack:**

```javascript
// URL-encoded javascript: protocol
const encoded = 'java%09script:alert(1)'; // Tab character
editor.querySelector('forge-rte-link').linkUrl = encoded;
```

**Mitigation:**

- ✅ URL decoded before validation
- ✅ Protocol detected in decoded string
- ✅ Validation error shown

**Result:** Attack blocked

---

## Best Practices Checklist

### For Developers

- [ ] Set appropriate `max-length` for your use case (URL validation is always on)
- [ ] Validate content server-side before storage
- [ ] Sanitize output before serving to other users
- [ ] Keep dependencies updated (`pnpm update`)
- [ ] Test with strict CSP headers
- [ ] Monitor error events for security issues
- [ ] Never suppress security-related errors in production

### For Security Teams

- [ ] Review CSP headers for application
- [ ] Implement server-side content validation
- [ ] Rate-limit content submission endpoints
- [ ] Monitor for XSS attempts in logs
- [ ] Include component in security scanning
- [ ] Perform penetration testing on editor features
- [ ] Review changes to `validateUrls` configuration

### For Content Moderators

- [ ] Review user-generated content before publication
- [ ] Flag suspicious links or formatting
- [ ] Check for encoded or obfuscated URLs
- [ ] Report security concerns to development team

---

## Testing Security

### Automated Tests

```bash
# Run security test suite
pnpm run test:extended --files='**/rich-text-security.test.ts'
```

### Manual Security Testing

```javascript
// Test 1: XSS via script tag
editor.content = '<p><script>alert(1)</script></p>';
console.assert(!editor.toHTML().includes('<script>'), 'Script tag not escaped');

// Test 2: XSS via javascript: protocol — drive via input event
const link = editor.querySelector('forge-rte-link');
const input = link.shadowRoot.querySelector('input');
input.value = 'javascript:alert(1)';
input.dispatchEvent(new Event('input', { bubbles: true }));
await link.updateComplete;
// Apply button should be disabled (validationError is set internally)
const applyBtn = link.shadowRoot.querySelector('forge-button[variant="raised"]');
console.assert(applyBtn.disabled, 'Apply should be disabled for dangerous protocol');

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
console.assert(!editor.toHTML().includes('javascript:'), 'Protocol not sanitized');

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
  console.assert(e.message.includes('depth'), 'Wrong error message');
}
```

---

## Reporting Security Issues

### Responsible Disclosure

If you discover a security vulnerability:

1. **DO NOT** open a public GitHub issue
2. **DO NOT** discuss publicly on forums/social media
3. **DO** email security contact: security@tylertech.com
4. **DO** provide:
   - Detailed description of vulnerability
   - Steps to reproduce
   - Proof of concept (if applicable)
   - Suggested mitigation (if any)

### What to Report

- XSS vulnerabilities or bypasses
- Protocol validation bypasses
- Sanitization failures
- DoS vectors
- CSP violations
- Authentication/authorization issues

### What NOT to Report

- Feature requests (use GitHub issues)
- Browser-specific rendering bugs
- Performance issues (unless DoS-related)
- Questions about usage (use documentation/support)

---

## Security Updates

### Current Version: 1.6.2+

**Security Fixes in This Version:**

- ✅ HTML output sanitization (XSS prevention)
- ✅ Protocol validation (javascript:, data:, vbscript:, file:, about:, blob: blocking)
- ✅ Protocol blocklist uses `startsWith` — no over-blocking of valid URLs with protocols in query params
- ✅ IDN/non-ASCII URLs produce a non-blocking warning instead of hard error (REDTEAM #7)
- ✅ JSON input sanitization (injection prevention, non-mutating via `structuredClone`)
- ✅ HTML input parsed via `DOMParser` — no eager beacon fetches (REDTEAM #5)
- ✅ DoS prevention: depth (50) and node count (5000) limits for JSON; 1 MB size limit for HTML content (paste and `.content` property), logged as `[RTE Security] HTML content too large`
- ✅ `maxLength` enforced as hard input block via TipTap `filterTransaction`
- ✅ SVG paste blocking (script execution prevention)
- ✅ URL validation is unconditional — cannot be disabled via attributes or properties

### Update Notifications

Security updates are announced via:

- GitHub Security Advisories
- Tyler Technologies security bulletins
- CHANGELOG.md in repository

**Recommendation:** Subscribe to repository releases for notifications

---

## Additional Resources

- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [Content Security Policy Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [TipTap Security Documentation](https://tiptap.dev/docs/editor/security)
- [Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)

---

**Document Version:** 1.1  
**Last Reviewed:** 2026-06-22  
**Next Review:** 2026-09-22 (Quarterly)
