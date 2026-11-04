import { describe, expect, it } from 'vitest';
import { renderFixture } from '../../testing/fixture.js';
import { html as testHtml } from 'lit';
import { RichTextEditorComponent } from '../rich-text-editor.js';
import type { RichTextContextComponent } from '../rich-text-context.js';
import { MarkdownSerializer } from '../extensions/markdown-serializer.js';
import type { JSONContent } from '@tiptap/core';

import '../index.js';
import '../features/rte-standard-tools.js';
import '../features/rte-link.js';

/**
 * Test suite for Markdown output functionality in the rich text editor.
 *
 * Tests the toMarkdown() method and MarkdownSerializer class to ensure proper
 * conversion from ProseMirror JSON to Markdown format.
 */
describe('Rich Text Editor - Markdown Output', () => {
  async function waitForEditor(element: RichTextEditorComponent | RichTextContextComponent): Promise<void> {
    await element.updateComplete;

    const isEditorTag = element.tagName.toLowerCase() === 'forge-rich-text-editor';

    const getContext = (): RichTextContextComponent | null => {
      if (isEditorTag) {
        return (element.shadowRoot?.querySelector('forge-rich-text-context') as RichTextContextComponent) ?? null;
      }
      return element as RichTextContextComponent;
    };

    // Fast-path: already initialized
    if (getContext()?.isInitialized) {
      return;
    }

    // Wait via event OR polling fallback (in case the event was already dispatched)
    await new Promise<void>(resolve => {
      let resolved = false;
      const done = (): void => {
        if (!resolved) {
          resolved = true;
          resolve();
        }
      };

      // Event-based: listen for 'initialized' on element (composed event from context)
      element.addEventListener('initialized', done, { once: true });

      // Poll fallback: in case the event was already dispatched before our listener
      const interval = setInterval(() => {
        if (getContext()?.isInitialized) {
          clearInterval(interval);
          element.removeEventListener('initialized', done);
          done();
        }
      }, 50);

      // Safety timeout: 5 seconds
      setTimeout(() => {
        clearInterval(interval);
        element.removeEventListener('initialized', done);
        done(); // resolve anyway so the test fails on the assertion, not with a timeout error
      }, 3000);
    });
  }

  describe('MarkdownSerializer', () => {
    describe('Basic Text and Paragraphs', () => {
      it('should serialize empty content', () => {
        const json: JSONContent = {
          type: 'doc',
          content: []
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('');
      });

      it('should serialize plain text paragraph', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Hello world' }]
            }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('Hello world\n\n');
      });

      it('should serialize multiple paragraphs', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            { type: 'paragraph', content: [{ type: 'text', text: 'First paragraph' }] },
            { type: 'paragraph', content: [{ type: 'text', text: 'Second paragraph' }] }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('First paragraph\n\nSecond paragraph\n\n');
      });

      it('should serialize empty paragraphs', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            { type: 'paragraph', content: [{ type: 'text', text: 'First' }] },
            { type: 'paragraph', content: [] },
            { type: 'paragraph', content: [{ type: 'text', text: 'Second' }] }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('First\n\n\nSecond\n\n');
      });
    });

    describe('Text Formatting Marks', () => {
      it('should serialize bold text', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'bold text', marks: [{ type: 'bold' }] }]
            }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('**bold text**\n\n');
      });

      it('should serialize italic text', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'italic text', marks: [{ type: 'italic' }] }]
            }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('*italic text*\n\n');
      });

      it('should serialize underline text as HTML', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'underline text', marks: [{ type: 'underline' }] }]
            }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('<u>underline text</u>\n\n');
      });

      it('should serialize strikethrough text', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'strike text', marks: [{ type: 'strike' }] }]
            }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('~~strike text~~\n\n');
      });

      it('should serialize inline code', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'const x = 5;', marks: [{ type: 'code' }] }]
            }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('`const x = 5;`\n\n');
      });

      it('should serialize combined marks (bold + italic)', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'bold italic',
                  marks: [{ type: 'bold' }, { type: 'italic' }]
                }
              ]
            }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('***bold italic***\n\n');
      });

      it('should serialize mixed formatting in same paragraph', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'Normal ' },
                { type: 'text', text: 'bold', marks: [{ type: 'bold' }] },
                { type: 'text', text: ' and ' },
                { type: 'text', text: 'italic', marks: [{ type: 'italic' }] },
                { type: 'text', text: ' text.' }
              ]
            }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('Normal **bold** and *italic* text.\n\n');
      });
    });

    describe('Links', () => {
      it('should serialize link', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Click here',
                  marks: [{ type: 'link', attrs: { href: 'https://example.com' } }]
                }
              ]
            }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('[Click here](https://example.com)\n\n');
      });

      it('should serialize link with formatting', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'bold link',
                  marks: [{ type: 'bold' }, { type: 'link', attrs: { href: 'https://example.com' } }]
                }
              ]
            }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('[**bold link**](https://example.com)\n\n');
      });

      it('should serialize multiple links in paragraph', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'Visit ' },
                { type: 'text', text: 'example', marks: [{ type: 'link', attrs: { href: 'https://example.com' } }] },
                { type: 'text', text: ' or ' },
                { type: 'text', text: 'google', marks: [{ type: 'link', attrs: { href: 'https://google.com' } }] }
              ]
            }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('Visit [example](https://example.com) or [google](https://google.com)\n\n');
      });
    });

    describe('Headings', () => {
      it('should serialize H1 heading', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 1 },
              content: [{ type: 'text', text: 'Heading 1' }]
            }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('# Heading 1\n\n');
      });

      it('should serialize H2 heading', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 2 },
              content: [{ type: 'text', text: 'Heading 2' }]
            }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('## Heading 2\n\n');
      });

      it('should serialize H3 heading', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 3 },
              content: [{ type: 'text', text: 'Heading 3' }]
            }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('### Heading 3\n\n');
      });

      it('should serialize heading with formatting', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 1 },
              content: [
                { type: 'text', text: 'Bold ', marks: [{ type: 'bold' }] },
                { type: 'text', text: 'Heading' }
              ]
            }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('# **Bold** Heading\n\n');
      });

      it('should serialize document with mixed headings and paragraphs', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Title' }] },
            { type: 'paragraph', content: [{ type: 'text', text: 'Intro paragraph' }] },
            { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Section' }] },
            { type: 'paragraph', content: [{ type: 'text', text: 'Section content' }] }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('# Title\n\nIntro paragraph\n\n## Section\n\nSection content\n\n');
      });
    });

    describe('Lists', () => {
      it('should serialize bullet list', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            {
              type: 'bulletList',
              content: [
                { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'First item' }] }] },
                { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Second item' }] }] }
              ]
            }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('- First item\n- Second item\n\n');
      });

      it('should serialize ordered list', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            {
              type: 'orderedList',
              content: [
                { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'First item' }] }] },
                { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Second item' }] }] }
              ]
            }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('1. First item\n2. Second item\n\n');
      });

      it('should serialize list items with formatting', () => {
        const json: JSONContent = {
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
                      content: [{ type: 'text', text: 'bold item', marks: [{ type: 'bold' }] }]
                    }
                  ]
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [{ type: 'text', text: 'italic item', marks: [{ type: 'italic' }] }]
                    }
                  ]
                }
              ]
            }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('- **bold item**\n- *italic item*\n\n');
      });

      it('should serialize list with links', () => {
        const json: JSONContent = {
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
                        { type: 'text', text: 'Visit ' },
                        {
                          type: 'text',
                          text: 'example',
                          marks: [{ type: 'link', attrs: { href: 'https://example.com' } }]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('- Visit [example](https://example.com)\n\n');
      });
    });

    describe('Text Alignment', () => {
      it('should serialize center-aligned paragraph with HTML comment', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              attrs: { textAlign: 'center' },
              content: [{ type: 'text', text: 'Centered text' }]
            }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('<!-- align:center -->\nCentered text\n\n');
      });

      it('should serialize right-aligned paragraph with HTML comment', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              attrs: { textAlign: 'right' },
              content: [{ type: 'text', text: 'Right-aligned text' }]
            }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('<!-- align:right -->\nRight-aligned text\n\n');
      });

      it('should serialize justify-aligned paragraph with HTML comment', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              attrs: { textAlign: 'justify' },
              content: [{ type: 'text', text: 'Justified text' }]
            }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('<!-- align:justify -->\nJustified text\n\n');
      });

      it('should not add alignment comment for left-aligned paragraph', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              attrs: { textAlign: 'left' },
              content: [{ type: 'text', text: 'Left-aligned text' }]
            }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('Left-aligned text\n\n');
      });
    });

    describe('Complex Documents', () => {
      it('should serialize document with all features', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Document Title' }] },
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
            { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Features' }] },
            {
              type: 'bulletList',
              content: [
                { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Bullet one' }] }] },
                { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Bullet two' }] }] }
              ]
            },
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'Visit ' },
                { type: 'text', text: 'our site', marks: [{ type: 'link', attrs: { href: 'https://example.com' } }] }
              ]
            }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe(
          '# Document Title\n\n' +
            'This is **bold** and *italic* text.\n\n' +
            '## Features\n\n' +
            '- Bullet one\n- Bullet two\n\n' +
            'Visit [our site](https://example.com)\n\n'
        );
      });
    });

    describe('Edge Cases', () => {
      it('should handle null/undefined content gracefully', () => {
        const json: JSONContent = {
          type: 'doc',
          content: undefined
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('');
      });

      it('should handle unknown node types gracefully', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [{ type: 'unknownNode', content: [{ type: 'text', text: 'Should be skipped' }] }]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('Should be skipped');
      });

      it('should handle empty lists', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [{ type: 'bulletList', content: [] }]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toBe('\n');
      });
    });
  });

  describe('toMarkdown() Method', () => {
    describe('RichTextEditorComponent', () => {
      it('should return empty string when editor is not initialized', async () => {
        const element = await renderFixture<RichTextEditorComponent>(
          testHtml`
          <forge-rich-text-editor></forge-rich-text-editor>
        `,
          'forge-rich-text-editor'
        );

        const markdown = element.toMarkdown();
        expect(markdown).toBe('');
      });

      it('should return markdown for plain text content', async () => {
        const element = await renderFixture<RichTextEditorComponent>(
          testHtml`
          <forge-rich-text-editor content="<p>Hello world</p>">
            <forge-rte-standard-tools></forge-rte-standard-tools>
          </forge-rich-text-editor>
        `,
          'forge-rich-text-editor'
        );

        await waitForEditor(element);

        const markdown = element.toMarkdown();
        expect(markdown).toBe('Hello world\n\n');
      });

      it('should return markdown for formatted content', async () => {
        const element = await renderFixture<RichTextEditorComponent>(
          testHtml`
          <forge-rich-text-editor content="<p><strong>Bold</strong> and <em>italic</em></p>">
            <forge-rte-standard-tools></forge-rte-standard-tools>
          </forge-rich-text-editor>
        `,
          'forge-rich-text-editor'
        );

        await waitForEditor(element);

        const markdown = element.toMarkdown();
        expect(markdown).toBe('**Bold** and *italic*\n\n');
      });

      it('should return markdown for headings', async () => {
        const element = await renderFixture<RichTextEditorComponent>(
          testHtml`
          <forge-rich-text-editor content="<h1>Heading 1</h1><h2>Heading 2</h2>">
            <forge-rte-standard-tools></forge-rte-standard-tools>
          </forge-rich-text-editor>
        `,
          'forge-rich-text-editor'
        );

        await waitForEditor(element);

        const markdown = element.toMarkdown();
        expect(markdown).toBe('# Heading 1\n\n## Heading 2\n\n');
      });

      it('should return markdown for lists', async () => {
        const element = await renderFixture<RichTextEditorComponent>(
          testHtml`
          <forge-rich-text-editor content="<ul><li>Item 1</li><li>Item 2</li></ul>">
            <forge-rte-standard-tools></forge-rte-standard-tools>
          </forge-rich-text-editor>
        `,
          'forge-rich-text-editor'
        );

        await waitForEditor(element);

        const markdown = element.toMarkdown();
        expect(markdown).toBe('- Item 1\n- Item 2\n\n');
      });

      it('should return markdown for links', async () => {
        const element = await renderFixture<RichTextEditorComponent>(
          testHtml`
          <forge-rich-text-editor content='<p><a href="https://example.com">Click here</a></p>'>
            <forge-rte-standard-tools></forge-rte-standard-tools>
            <forge-rte-link></forge-rte-link>
          </forge-rich-text-editor>
        `,
          'forge-rich-text-editor'
        );

        await waitForEditor(element);

        const markdown = element.toMarkdown();
        expect(markdown).toBe('[Click here](https://example.com)\n\n');
      });

      it('should return markdown for complex content', async () => {
        const content = `
          <h1>Title</h1>
          <p>This is <strong>bold</strong> and <em>italic</em> text.</p>
          <ul>
            <li>First item</li>
            <li>Second item</li>
          </ul>
          <p>Visit <a href="https://example.com">example</a></p>
        `;

        const element = await renderFixture<RichTextEditorComponent>(
          testHtml`
          <forge-rich-text-editor .content=${content}>
            <forge-rte-standard-tools></forge-rte-standard-tools>
            <forge-rte-link></forge-rte-link>
          </forge-rich-text-editor>
        `,
          'forge-rich-text-editor'
        );

        await waitForEditor(element);

        const markdown = element.toMarkdown();
        expect(markdown).toContain('# Title');
        expect(markdown).toContain('**bold**');
        expect(markdown).toContain('*italic*');
        expect(markdown).toContain('- First item');
        expect(markdown).toContain('[example](https://example.com)');
      });
    });

    describe('escape() is called; body text and hrefs escaped', () => {
      it('should escape Markdown special characters in body text', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'text with *asterisks* and _underscores_' }]
            }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        expect(markdown).toContain('\\*asterisks\\*');
        expect(markdown).toContain('\\_underscores\\_');
      });

      it('should escape ] and ) in link text to prevent injection', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'click]here)',
                  marks: [{ type: 'link', attrs: { href: 'https://example.com' } }]
                }
              ]
            }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        // Must not produce [click]here)](https://example.com) — that breaks out of the link
        expect(markdown).toContain('\\]');
        expect(markdown).toContain('\\)');
      });

      it('should percent-encode parens in link href to prevent injection', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'link',
                  marks: [{ type: 'link', attrs: { href: 'https://example.com/path(1)' } }]
                }
              ]
            }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        // Parens in href must be encoded so the link doesn't break
        expect(markdown).toContain('https://example.com/path%281%29');
        expect(markdown).not.toContain('(1)');
      });

      it('should not double-escape code spans', () => {
        const json: JSONContent = {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'some *code*',
                  marks: [{ type: 'code' }]
                }
              ]
            }
          ]
        };

        const markdown = MarkdownSerializer.serialize(json);
        // Inside a code span, asterisks should be literal
        expect(markdown).toContain('`some *code*`');
      });
    });

    describe('RichTextContextComponent', () => {
      it('should return markdown from context component', async () => {
        const element = await renderFixture<RichTextContextComponent>(
          testHtml`
          <forge-rich-text-context content="<p><strong>Bold text</strong></p>">
            <forge-rte-standard-tools></forge-rte-standard-tools>
            <forge-rich-text-content></forge-rich-text-content>
          </forge-rich-text-context>
        `,
          'forge-rich-text-context'
        );

        await waitForEditor(element);

        const markdown = element.toMarkdown();
        expect(markdown).toBe('**Bold text**\n\n');
      });
    });
  });
});
