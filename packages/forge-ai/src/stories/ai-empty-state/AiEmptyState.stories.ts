import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '@tylertech/forge-ai/ai-empty-state';
import '@tylertech/forge-ai/ai-suggestions';

const component = 'forge-ai-empty-state';

const meta = {
  title: 'Components/Chat/Empty State',
  component,
  argTypes: {
    showSuggestions: {
      control: 'boolean',
      description: 'Show or hide the suggestions'
    },
    headingText: {
      control: 'text',
      description: 'Custom heading text for the heading slot (leave empty for default)'
    },
    customMessage: {
      control: 'text',
      description: 'Custom message text (leave empty for default)'
    }
  },
  args: {
    showSuggestions: true,
    headingText: 'Forge AI',
    customMessage: 'Welcome to Forge AI! How can I assist you today?'
  },
  render: (args: any) => {
    const suggestions = [
      { text: 'Help me write an email', value: 'email' },
      { text: 'Create a presentation', value: 'presentation' },
      { text: 'Write some code', value: 'code' },
      { text: 'Plan a meeting', value: 'meeting' }
    ];

    return html`
      <forge-ai-empty-state>
        <img slot="icon" src="./ai-logo.png" alt="AI Icon" />
        ${args.headingText ? html`<span slot="heading">${args.headingText}</span>` : ''}
        ${args.customMessage ? html`<span slot="body">${args.customMessage}</span>` : ''}
        ${args.showSuggestions ? html` <forge-ai-suggestions slot="actions" variant="block" .suggestions=${suggestions}> </forge-ai-suggestions> ` : ''}
      </forge-ai-empty-state>
    `;
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {
  args: {
    customMessage: 'Welcome to Forge AI!  '
  }
};
