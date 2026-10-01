import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '@tylertech/forge-rich-text-editor';

/**
 * The renderer takes a ProseMirror document, NOT an HTML string - the shape the editor's `change`
 * event emits and `toJSON()` returns. Passing HTML displays it as escaped text, so the sample
 * below is authored as a document.
 */
const SAMPLE_DOCUMENT = {
  type: 'doc',
  content: [
    { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: 'Document Title' }] },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'This content is displayed read-only through ' },
        { type: 'text', text: 'forge-rich-text-renderer', marks: [{ type: 'code' }] },
        { type: 'text', text: '.' }
      ]
    },
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Key Features' }] },
    {
      type: 'bulletList',
      content: [
        ['Displays rich text without editing capabilities', 'Preserves formatting and structure'],
        ['No toolbar or interactive elements', 'Ideal for displaying saved content']
      ]
        .flat()
        .map(text => ({
          type: 'listItem',
          content: [{ type: 'paragraph', content: [{ type: 'text', text }] }]
        }))
    },
    {
      type: 'paragraph',
      attrs: { textAlign: 'center' },
      content: [
        {
          type: 'text',
          text: 'Perfect for blog posts, comments, or any read-only content display.',
          marks: [{ type: 'italic' }]
        }
      ]
    }
  ]
};

const meta = {
  title: 'Rich Text Editor/Renderer'
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Renderer: Story = {
  render: () => html`<forge-rich-text-renderer .content=${SAMPLE_DOCUMENT}></forge-rich-text-renderer>`,
  parameters: {
    docs: {
      description: {
        story:
          'Use `<forge-rich-text-renderer>` to display content without editing capabilities. Its `content` property takes a ProseMirror document - the value `toJSON()` returns and the `change` event emits - so editor output can be stored and rendered without a round trip through HTML.'
      }
    }
  }
};
