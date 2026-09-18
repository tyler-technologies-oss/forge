import { describe, expect, it } from 'vitest';
import { renderFixture } from '../../testing/fixture.js';
import { html } from 'lit';
import type { RichTextRendererComponent, RichTextRendererContent } from '../rich-text-renderer.js';
import '../rich-text-renderer.js';

describe('RichTextRendererComponent', () => {
  describe('Component Structure', () => {
    it('should contain shadow root', async () => {
      const el = await renderFixture<RichTextRendererComponent>(html`<forge-rich-text-renderer></forge-rich-text-renderer>`, 'forge-rich-text-renderer');
      expect(el.shadowRoot).not.toBeNull();
    });

    it('should render content container', async () => {
      const el = await renderFixture<RichTextRendererComponent>(html`<forge-rich-text-renderer></forge-rich-text-renderer>`, 'forge-rich-text-renderer');
      const container = el.shadowRoot?.querySelector('.renderer-content');
      expect(container).toBeTruthy();
    });

    it('should set the ARIA role on the host element', async () => {
      const el = await renderFixture<RichTextRendererComponent>(html`<forge-rich-text-renderer></forge-rich-text-renderer>`, 'forge-rich-text-renderer');
      expect(el.getAttribute('role')).toBe('article');
    });

    it('should not override a consumer-provided role', async () => {
      const el = await renderFixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer role="region"></forge-rich-text-renderer>`,
        'forge-rich-text-renderer'
      );
      expect(el.getAttribute('role')).toBe('region');
    });

    it('should not apply a hardcoded ARIA label', async () => {
      const el = await renderFixture<RichTextRendererComponent>(html`<forge-rich-text-renderer></forge-rich-text-renderer>`, 'forge-rich-text-renderer');
      expect(el.hasAttribute('aria-label')).toBe(false);

      const container = el.shadowRoot?.querySelector('.renderer-content');
      expect(container?.hasAttribute('aria-label')).toBe(false);
    });

    it('should allow the host to be labelled by the consumer', async () => {
      const el = await renderFixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer aria-label="Release notes"></forge-rich-text-renderer>`,
        'forge-rich-text-renderer'
      );
      expect(el.getAttribute('aria-label')).toBe('Release notes');
    });
  });

  describe('Content Rendering', () => {
    it('should render empty content', async () => {
      const el = await renderFixture<RichTextRendererComponent>(html`<forge-rich-text-renderer></forge-rich-text-renderer>`, 'forge-rich-text-renderer');
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      expect(container?.textContent?.trim()).toBe('');
    });

    it('should render plain text paragraph', async () => {
      const content = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Hello world'
              }
            ]
          }
        ]
      };

      const el = await renderFixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`,
        'forge-rich-text-renderer'
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      expect(container?.textContent).toContain('Hello world');
    });

    it('should render multiple paragraphs', async () => {
      const content = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'First paragraph' }]
          },
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Second paragraph' }]
          }
        ]
      };

      const el = await renderFixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`,
        'forge-rich-text-renderer'
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const paragraphs = container?.querySelectorAll('p');
      expect(paragraphs?.length).toBe(2);
      expect(paragraphs?.[0].textContent).toBe('First paragraph');
      expect(paragraphs?.[1].textContent).toBe('Second paragraph');
    });

    it('should update content when property changes', async () => {
      const content1 = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Original content' }]
          }
        ]
      };

      const el = await renderFixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content1}></forge-rich-text-renderer>`,
        'forge-rich-text-renderer'
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const content2 = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Updated content' }]
          }
        ]
      };

      el.content = content2 as RichTextRendererContent;
      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      expect(container?.textContent).toContain('Updated content');
      expect(container?.textContent).not.toContain('Original content');
    });
  });

  describe('Text Formatting (Marks)', () => {
    it('should render bold text', async () => {
      const content = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Bold text',
                marks: [{ type: 'bold' }]
              }
            ]
          }
        ]
      };

      const el = await renderFixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`,
        'forge-rich-text-renderer'
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const strong = container?.querySelector('strong');
      expect(strong).toBeTruthy();
      expect(strong?.textContent).toBe('Bold text');
    });

    it('should render italic text', async () => {
      const content = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Italic text',
                marks: [{ type: 'italic' }]
              }
            ]
          }
        ]
      };

      const el = await renderFixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`,
        'forge-rich-text-renderer'
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const em = container?.querySelector('em');
      expect(em).toBeTruthy();
      expect(em?.textContent).toBe('Italic text');
    });

    it('should render underlined text', async () => {
      const content = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Underlined text',
                marks: [{ type: 'underline' }]
              }
            ]
          }
        ]
      };

      const el = await renderFixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`,
        'forge-rich-text-renderer'
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const u = container?.querySelector('u');
      expect(u).toBeTruthy();
      expect(u?.textContent).toBe('Underlined text');
    });

    it('should render strikethrough text', async () => {
      const content = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Strikethrough text',
                marks: [{ type: 'strike' }]
              }
            ]
          }
        ]
      };

      const el = await renderFixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`,
        'forge-rich-text-renderer'
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const s = container?.querySelector('s');
      expect(s).toBeTruthy();
      expect(s?.textContent).toBe('Strikethrough text');
    });

    it('should render code text', async () => {
      const content = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'const x = 42;',
                marks: [{ type: 'code' }]
              }
            ]
          }
        ]
      };

      const el = await renderFixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`,
        'forge-rich-text-renderer'
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const code = container?.querySelector('code');
      expect(code).toBeTruthy();
      expect(code?.textContent).toBe('const x = 42;');
    });

    it('should render combined formatting marks', async () => {
      const content = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Bold and italic',
                marks: [{ type: 'bold' }, { type: 'italic' }]
              }
            ]
          }
        ]
      };

      const el = await renderFixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`,
        'forge-rich-text-renderer'
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const strong = container?.querySelector('strong');
      const em = container?.querySelector('em');
      expect(strong).toBeTruthy();
      expect(em).toBeTruthy();
      expect(container?.textContent).toContain('Bold and italic');
    });
  });

  describe('Headings', () => {
    it('should render H1 heading', async () => {
      const content = {
        type: 'doc',
        content: [
          {
            type: 'heading',
            attrs: { level: 1 },
            content: [{ type: 'text', text: 'Heading 1' }]
          }
        ]
      };

      const el = await renderFixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`,
        'forge-rich-text-renderer'
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const h1 = container?.querySelector('h1');
      expect(h1).toBeTruthy();
      expect(h1?.textContent).toBe('Heading 1');
    });

    it('should render H2 heading', async () => {
      const content = {
        type: 'doc',
        content: [
          {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: 'Heading 2' }]
          }
        ]
      };

      const el = await renderFixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`,
        'forge-rich-text-renderer'
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const h2 = container?.querySelector('h2');
      expect(h2).toBeTruthy();
      expect(h2?.textContent).toBe('Heading 2');
    });

    it('should render H3 heading', async () => {
      const content = {
        type: 'doc',
        content: [
          {
            type: 'heading',
            attrs: { level: 3 },
            content: [{ type: 'text', text: 'Heading 3' }]
          }
        ]
      };

      const el = await renderFixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`,
        'forge-rich-text-renderer'
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const h3 = container?.querySelector('h3');
      expect(h3).toBeTruthy();
      expect(h3?.textContent).toBe('Heading 3');
    });

    it('should render headings with formatting', async () => {
      const content = {
        type: 'doc',
        content: [
          {
            type: 'heading',
            attrs: { level: 2 },
            content: [
              {
                type: 'text',
                text: 'Bold Heading',
                marks: [{ type: 'bold' }]
              }
            ]
          }
        ]
      };

      const el = await renderFixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`,
        'forge-rich-text-renderer'
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const h2 = container?.querySelector('h2');
      const strong = h2?.querySelector('strong');
      expect(h2).toBeTruthy();
      expect(strong).toBeTruthy();
      expect(strong?.textContent).toBe('Bold Heading');
    });
  });

  describe('Lists', () => {
    it('should render bullet list', async () => {
      const content = {
        type: 'doc',
        content: [
          {
            type: 'bulletList',
            content: [
              {
                type: 'listItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'Item 1' }]
                  }
                ]
              },
              {
                type: 'listItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'Item 2' }]
                  }
                ]
              }
            ]
          }
        ]
      };

      const el = await renderFixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`,
        'forge-rich-text-renderer'
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const ul = container?.querySelector('ul');
      const items = ul?.querySelectorAll('li');
      expect(ul).toBeTruthy();
      expect(items?.length).toBe(2);
      expect(items?.[0].textContent).toBe('Item 1');
      expect(items?.[1].textContent).toBe('Item 2');
    });

    it('should render ordered list', async () => {
      const content = {
        type: 'doc',
        content: [
          {
            type: 'orderedList',
            content: [
              {
                type: 'listItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'First' }]
                  }
                ]
              },
              {
                type: 'listItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'Second' }]
                  }
                ]
              }
            ]
          }
        ]
      };

      const el = await renderFixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`,
        'forge-rich-text-renderer'
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const ol = container?.querySelector('ol');
      const items = ol?.querySelectorAll('li');
      expect(ol).toBeTruthy();
      expect(items?.length).toBe(2);
      expect(items?.[0].textContent).toBe('First');
      expect(items?.[1].textContent).toBe('Second');
    });

    it('should render list items with formatting', async () => {
      const content = {
        type: 'doc',
        content: [
          {
            type: 'bulletList',
            content: [
              {
                type: 'listItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      {
                        type: 'text',
                        text: 'Bold item',
                        marks: [{ type: 'bold' }]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      };

      const el = await renderFixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`,
        'forge-rich-text-renderer'
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const strong = container?.querySelector('strong');
      expect(strong).toBeTruthy();
      expect(strong?.textContent).toBe('Bold item');
    });
  });

  describe('Links', () => {
    it('should render link', async () => {
      const content = {
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
                    attrs: { href: 'https://example.com' }
                  }
                ]
              }
            ]
          }
        ]
      };

      const el = await renderFixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`,
        'forge-rich-text-renderer'
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const link = container?.querySelector('a');
      expect(link).toBeTruthy();
      expect(link?.textContent).toBe('Click here');
      expect(link?.getAttribute('href')).toBe('https://example.com');
    });

    it('should render link with security attributes', async () => {
      const content = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'External link',
                marks: [
                  {
                    type: 'link',
                    attrs: { href: 'https://example.com' }
                  }
                ]
              }
            ]
          }
        ]
      };

      const el = await renderFixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`,
        'forge-rich-text-renderer'
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const link = container?.querySelector('a');
      expect(link).toBeTruthy();
      expect(link?.getAttribute('target')).toBe('_blank');
      expect(link?.getAttribute('rel')).toContain('noopener');
      expect(link?.getAttribute('rel')).toContain('noreferrer');
      expect(link?.getAttribute('rel')).toContain('nofollow');
    });

    it('should render link with formatting', async () => {
      const content = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Bold link',
                marks: [{ type: 'bold' }, { type: 'link', attrs: { href: 'https://example.com' } }]
              }
            ]
          }
        ]
      };

      const el = await renderFixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`,
        'forge-rich-text-renderer'
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const link = container?.querySelector('a');
      const strong = link?.querySelector('strong');
      expect(link).toBeTruthy();
      expect(strong).toBeTruthy();
      expect(strong?.textContent).toBe('Bold link');
    });
  });

  describe('Text Alignment', () => {
    it('should render left-aligned paragraph', async () => {
      const content = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            attrs: { textAlign: 'left' },
            content: [{ type: 'text', text: 'Left aligned' }]
          }
        ]
      };

      const el = await renderFixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`,
        'forge-rich-text-renderer'
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const paragraph = container?.querySelector('p');
      expect(paragraph).toBeTruthy();
      expect(paragraph?.style.textAlign).toBe('left');
    });

    it('should render center-aligned paragraph', async () => {
      const content = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            attrs: { textAlign: 'center' },
            content: [{ type: 'text', text: 'Centered' }]
          }
        ]
      };

      const el = await renderFixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`,
        'forge-rich-text-renderer'
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const paragraph = container?.querySelector('p');
      expect(paragraph).toBeTruthy();
      expect(paragraph?.style.textAlign).toBe('center');
    });

    it('should render right-aligned paragraph', async () => {
      const content = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            attrs: { textAlign: 'right' },
            content: [{ type: 'text', text: 'Right aligned' }]
          }
        ]
      };

      const el = await renderFixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`,
        'forge-rich-text-renderer'
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const paragraph = container?.querySelector('p');
      expect(paragraph).toBeTruthy();
      expect(paragraph?.style.textAlign).toBe('right');
    });

    it('should render justified paragraph', async () => {
      const content = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            attrs: { textAlign: 'justify' },
            content: [{ type: 'text', text: 'Justified text' }]
          }
        ]
      };

      const el = await renderFixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`,
        'forge-rich-text-renderer'
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const paragraph = container?.querySelector('p');
      expect(paragraph).toBeTruthy();
      expect(paragraph?.style.textAlign).toBe('justify');
    });
  });

  describe('Complex Content', () => {
    it('should render mixed content with all features', async () => {
      const content = {
        type: 'doc',
        content: [
          {
            type: 'heading',
            attrs: { level: 1 },
            content: [{ type: 'text', text: 'Document Title' }]
          },
          {
            type: 'paragraph',
            content: [
              { type: 'text', text: 'This is ' },
              { type: 'text', text: 'bold', marks: [{ type: 'bold' }] },
              { type: 'text', text: ' and ' },
              { type: 'text', text: 'italic', marks: [{ type: 'italic' }] },
              { type: 'text', text: ' text.' }
            ]
          },
          {
            type: 'bulletList',
            content: [
              {
                type: 'listItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'First item' }]
                  }
                ]
              },
              {
                type: 'listItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'Second item' }]
                  }
                ]
              }
            ]
          },
          {
            type: 'paragraph',
            content: [
              { type: 'text', text: 'Visit ' },
              {
                type: 'text',
                text: 'our website',
                marks: [{ type: 'link', attrs: { href: 'https://example.com' } }]
              }
            ]
          }
        ]
      };

      const el = await renderFixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`,
        'forge-rich-text-renderer'
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      expect(container?.querySelector('h1')).toBeTruthy();
      expect(container?.querySelector('strong')).toBeTruthy();
      expect(container?.querySelector('em')).toBeTruthy();
      expect(container?.querySelector('ul')).toBeTruthy();
      expect(container?.querySelector('a')).toBeTruthy();
    });

    it('should handle nested formatting', async () => {
      const content = {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Bold, italic, and underlined',
                marks: [{ type: 'bold' }, { type: 'italic' }, { type: 'underline' }]
              }
            ]
          }
        ]
      };

      const el = await renderFixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`,
        'forge-rich-text-renderer'
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      expect(container?.querySelector('strong')).toBeTruthy();
      expect(container?.querySelector('em')).toBeTruthy();
      expect(container?.querySelector('u')).toBeTruthy();
    });
  });
});
