import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

import '@tylertech/forge-ai/ai-file-picker';

const component = 'forge-ai-file-picker';

const meta = {
  title: 'Components/Input & Context/File Picker',
  component,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['icon-button', 'button'],
      description: 'Whether the trigger is an icon button or a text button'
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the picker, including drag and drop'
    },
    accept: {
      control: 'text',
      description: 'Accepted file types as comma-separated MIME types or extensions'
    },
    multiple: {
      control: 'boolean',
      description: 'Allows selecting more than one file at a time'
    },
    maxSize: {
      control: 'number',
      description: 'Maximum file size in bytes. Larger files are rejected'
    },
    selectedFiles: {
      control: false,
      description: 'File names that are already selected. Files with a matching name are rejected as duplicates'
    }
  },
  args: {
    variant: 'icon-button',
    disabled: false,
    accept: '',
    multiple: false,
    maxSize: 10485760,
    selectedFiles: []
  },
  render: args => html`
    <forge-ai-file-picker
      variant=${args.variant}
      accept=${args.accept}
      max-size=${args.maxSize}
      ?disabled=${args.disabled}
      ?multiple=${args.multiple}
      .selectedFiles=${args.selectedFiles}
      @forge-ai-file-picker-change=${action('forge-ai-file-picker-change')}
      @forge-ai-file-picker-error=${action('forge-ai-file-picker-error')}>
    </forge-ai-file-picker>
  `
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

/** The default slot sets the label. It falls back to "Choose File". */
export const Button: Story = {
  args: {
    variant: 'button'
  },
  render: args => html`
    <forge-ai-file-picker
      variant=${args.variant}
      accept=${args.accept}
      max-size=${args.maxSize}
      ?disabled=${args.disabled}
      ?multiple=${args.multiple}
      .selectedFiles=${args.selectedFiles}
      @forge-ai-file-picker-change=${action('forge-ai-file-picker-change')}
      @forge-ai-file-picker-error=${action('forge-ai-file-picker-error')}>
      Upload document
    </forge-ai-file-picker>
  `
};

/** Only PDF and plain text files, up to 1 MB each, several at a time. Larger files fire the error event. */
export const Restricted: Story = {
  args: {
    accept: '.pdf,.txt',
    multiple: true,
    maxSize: 1048576
  }
};
