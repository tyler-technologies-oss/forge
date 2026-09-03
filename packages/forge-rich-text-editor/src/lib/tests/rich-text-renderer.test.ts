import { expect, fixture, html } from '@open-wc/testing';
import type { RichTextRendererComponent } from '../rich-text-renderer';
import '../rich-text-renderer';

describe('RichTextRendererComponent', () => {
  describe('Component Structure', () => {
    it('should contain shadow root', async () => {
      const el = await fixture<RichTextRendererComponent>(html`<forge-rich-text-renderer></forge-rich-text-renderer>`);
      expect(el.shadowRoot).not.to.be.null;
    });

    it('should render content container', async () => {
      const el = await fixture<RichTextRendererComponent>(html`<forge-rich-text-renderer></forge-rich-text-renderer>`);
      const container = el.shadowRoot?.querySelector('.renderer-content');
      expect(container).to.exist;
    });

    it('should set the ARIA role on the host element', async () => {
      const el = await fixture<RichTextRendererComponent>(html`<forge-rich-text-renderer></forge-rich-text-renderer>`);
      expect(el.getAttribute('role')).to.equal('article');
    });

    it('should not override a consumer-provided role', async () => {
      const el = await fixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer role="region"></forge-rich-text-renderer>`
      );
      expect(el.getAttribute('role')).to.equal('region');
    });

    it('should not apply a hardcoded ARIA label', async () => {
      const el = await fixture<RichTextRendererComponent>(html`<forge-rich-text-renderer></forge-rich-text-renderer>`);
      expect(el.hasAttribute('aria-label')).to.be.false;

      const container = el.shadowRoot?.querySelector('.renderer-content');
      expect(container?.hasAttribute('aria-label')).to.be.false;
    });

    it('should allow the host to be labelled by the consumer', async () => {
      const el = await fixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer aria-label="Release notes"></forge-rich-text-renderer>`
      );
      expect(el.getAttribute('aria-label')).to.equal('Release notes');
    });
  });

  describe('Content Rendering', () => {
    it('should render empty content', async () => {
      const el = await fixture<RichTextRendererComponent>(html`<forge-rich-text-renderer></forge-rich-text-renderer>`);
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      expect(container?.textContent?.trim()).to.equal('');
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

      const el = await fixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      expect(container?.textContent).to.include('Hello world');
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

      const el = await fixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const paragraphs = container?.querySelectorAll('p');
      expect(paragraphs?.length).to.equal(2);
      expect(paragraphs?.[0].textContent).to.equal('First paragraph');
      expect(paragraphs?.[1].textContent).to.equal('Second paragraph');
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

      const el = await fixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content1}></forge-rich-text-renderer>`
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

      el.content = content2;
      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      expect(container?.textContent).to.include('Updated content');
      expect(container?.textContent).not.to.include('Original content');
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

      const el = await fixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const strong = container?.querySelector('strong');
      expect(strong).to.exist;
      expect(strong?.textContent).to.equal('Bold text');
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

      const el = await fixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const em = container?.querySelector('em');
      expect(em).to.exist;
      expect(em?.textContent).to.equal('Italic text');
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

      const el = await fixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const u = container?.querySelector('u');
      expect(u).to.exist;
      expect(u?.textContent).to.equal('Underlined text');
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

      const el = await fixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const s = container?.querySelector('s');
      expect(s).to.exist;
      expect(s?.textContent).to.equal('Strikethrough text');
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

      const el = await fixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const code = container?.querySelector('code');
      expect(code).to.exist;
      expect(code?.textContent).to.equal('const x = 42;');
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

      const el = await fixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const strong = container?.querySelector('strong');
      const em = container?.querySelector('em');
      expect(strong).to.exist;
      expect(em).to.exist;
      expect(container?.textContent).to.include('Bold and italic');
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

      const el = await fixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const h1 = container?.querySelector('h1');
      expect(h1).to.exist;
      expect(h1?.textContent).to.equal('Heading 1');
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

      const el = await fixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const h2 = container?.querySelector('h2');
      expect(h2).to.exist;
      expect(h2?.textContent).to.equal('Heading 2');
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

      const el = await fixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const h3 = container?.querySelector('h3');
      expect(h3).to.exist;
      expect(h3?.textContent).to.equal('Heading 3');
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

      const el = await fixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const h2 = container?.querySelector('h2');
      const strong = h2?.querySelector('strong');
      expect(h2).to.exist;
      expect(strong).to.exist;
      expect(strong?.textContent).to.equal('Bold Heading');
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

      const el = await fixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const ul = container?.querySelector('ul');
      const items = ul?.querySelectorAll('li');
      expect(ul).to.exist;
      expect(items?.length).to.equal(2);
      expect(items?.[0].textContent).to.equal('Item 1');
      expect(items?.[1].textContent).to.equal('Item 2');
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

      const el = await fixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const ol = container?.querySelector('ol');
      const items = ol?.querySelectorAll('li');
      expect(ol).to.exist;
      expect(items?.length).to.equal(2);
      expect(items?.[0].textContent).to.equal('First');
      expect(items?.[1].textContent).to.equal('Second');
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

      const el = await fixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const strong = container?.querySelector('strong');
      expect(strong).to.exist;
      expect(strong?.textContent).to.equal('Bold item');
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

      const el = await fixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const link = container?.querySelector('a');
      expect(link).to.exist;
      expect(link?.textContent).to.equal('Click here');
      expect(link?.getAttribute('href')).to.equal('https://example.com');
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

      const el = await fixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const link = container?.querySelector('a');
      expect(link).to.exist;
      expect(link?.getAttribute('target')).to.equal('_blank');
      expect(link?.getAttribute('rel')).to.include('noopener');
      expect(link?.getAttribute('rel')).to.include('noreferrer');
      expect(link?.getAttribute('rel')).to.include('nofollow');
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

      const el = await fixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const link = container?.querySelector('a');
      const strong = link?.querySelector('strong');
      expect(link).to.exist;
      expect(strong).to.exist;
      expect(strong?.textContent).to.equal('Bold link');
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

      const el = await fixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const paragraph = container?.querySelector('p');
      expect(paragraph).to.exist;
      expect(paragraph?.style.textAlign).to.equal('left');
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

      const el = await fixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const paragraph = container?.querySelector('p');
      expect(paragraph).to.exist;
      expect(paragraph?.style.textAlign).to.equal('center');
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

      const el = await fixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const paragraph = container?.querySelector('p');
      expect(paragraph).to.exist;
      expect(paragraph?.style.textAlign).to.equal('right');
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

      const el = await fixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      const paragraph = container?.querySelector('p');
      expect(paragraph).to.exist;
      expect(paragraph?.style.textAlign).to.equal('justify');
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

      const el = await fixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      expect(container?.querySelector('h1')).to.exist;
      expect(container?.querySelector('strong')).to.exist;
      expect(container?.querySelector('em')).to.exist;
      expect(container?.querySelector('ul')).to.exist;
      expect(container?.querySelector('a')).to.exist;
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

      const el = await fixture<RichTextRendererComponent>(
        html`<forge-rich-text-renderer .content=${content}></forge-rich-text-renderer>`
      );
      await new Promise(resolve => setTimeout(resolve, 50));

      const container = el.shadowRoot?.querySelector('.renderer-content');
      expect(container?.querySelector('strong')).to.exist;
      expect(container?.querySelector('em')).to.exist;
      expect(container?.querySelector('u')).to.exist;
    });
  });
});
