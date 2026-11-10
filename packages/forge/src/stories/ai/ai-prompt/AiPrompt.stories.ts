import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

import '@tylertech/forge-ai/ai-prompt';
import '@tylertech/forge-ai/ai-voice-input';
import '@tylertech/forge-ai/ai-file-picker';
import { AiPromptVariant } from '@tylertech/forge-ai/ai-prompt';
import { IconRegistry } from '@tylertech/forge/icon';
import '@tylertech/forge/icon';
import '@tylertech/forge/button';
import { tylIconChevronDown, tylIconWebAlt } from '@tylertech/tyler-icons';

IconRegistry.define([tylIconChevronDown, tylIconWebAlt]);

const component = 'forge-ai-prompt';

const meta = {
  title: 'AI/Components/Chat/Prompt',
  component,
  argTypes: {
    variant: {
      control: 'select',
      options: ['stacked', 'inline'] as AiPromptVariant[],
      description: 'Layout variant for the prompt component'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the textarea field'
    },
    autofocus: {
      control: 'boolean',
      description: 'Whether to autofocus the textarea field when the component renders'
    },
    sendDisabled: {
      control: 'boolean',
      description: 'Whether the send button is disabled'
    },
    inputDisabled: {
      control: 'boolean',
      description: 'Whether the textarea field is disabled'
    },
    cancelOnEscape: {
      control: 'boolean',
      description: 'Whether to dispatch cancel events when Escape key is pressed'
    },
    showAdditionalAction: {
      control: 'boolean',
      description: 'Show additional action button (only visible in stacked variant)'
    }
  },
  args: {
    variant: 'stacked',
    placeholder: 'Ask a question...',
    sendDisabled: false,
    inputDisabled: false,
    cancelOnEscape: true,
    showAdditionalAction: false
  },
  render: (args: any) => {
    const onSend = action('forge-ai-prompt-send');
    const onCancel = action('forge-ai-prompt-cancel');
    const onAttachment = action('forge-ai-prompt-attachment');
    return html`
      <forge-ai-prompt
        variant=${args.variant}
        placeholder=${args.placeholder}
        ?send-disabled=${args.sendDisabled}
        ?input-disabled=${args.inputDisabled}
        ?cancel-on-escape=${args.cancelOnEscape}
        @forge-ai-prompt-send=${onSend}
        @forge-ai-prompt-cancel=${onCancel}
        @forge-ai-prompt-attachment=${onAttachment}>
        <forge-ai-file-picker slot="actions-start"></forge-ai-file-picker>
        ${args.showAdditionalAction
          ? html`
              <forge-button slot="actions-start" variant="outlined">
                <forge-icon name="web_alt" slot="leading"></forge-icon>
                Web search
              </forge-button>
              <forge-button slot="actions-start" variant="outlined">
                GPT-4
                <forge-icon name="chevron_down" slot="trailing"></forge-icon>
              </forge-button>
            `
          : ''}
        <forge-ai-voice-input slot="actions-end"></forge-ai-voice-input>
      </forge-ai-prompt>
    `;
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
