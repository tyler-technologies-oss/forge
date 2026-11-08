import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

import '@tylertech/forge-ai/ai-attachment';

const component = 'forge-ai-attachment';

const meta = {
  title: 'AI/Attachment',
  render: args => {
    const handleRemove = action('forge-ai-attachment-remove');

    return html`
      <forge-ai-attachment
        .filename=${args.filename}
        .size=${args.size}
        .mimeType=${args.mimeType}
        .thumbnail=${args.thumbnail}
        ?removable=${args.removable}
        @forge-ai-attachment-remove=${handleRemove}>
      </forge-ai-attachment>
    `;
  },
  component,
  argTypes: {
    filename: {
      control: 'text',
      description: 'The name of the file'
    },
    size: {
      control: 'number',
      description: 'The size of the file in bytes'
    },
    mimeType: {
      control: 'select',
      options: [
        'application/pdf',
        'image/png',
        'image/jpeg',
        'video/mp4',
        'audio/mp3',
        'application/msword',
        'application/vnd.ms-excel',
        'application/vnd.ms-powerpoint',
        'application/zip',
        'text/plain'
      ],
      description: 'The MIME type of the file'
    },
    thumbnail: {
      control: 'text',
      description: 'Optional thumbnail data URL for image files'
    },
    removable: {
      control: 'boolean',
      description: 'Whether the attachment can be removed'
    }
  },
  args: {
    filename: 'document.pdf',
    size: 1048576,
    mimeType: 'application/pdf',
    thumbnail: '',
    removable: true
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
