import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { Suggestion } from '@tylertech/forge-ai/ai-suggestions';
import '@tylertech/forge/card';

import '@tylertech/forge-ai/ai-chat-interface';
import '@tylertech/forge-ai/ai-chat-header';
import '@tylertech/forge-ai/ai-user-message';
import '@tylertech/forge-ai/ai-response-message';
import '@tylertech/forge-ai/ai-suggestions';
import '@tylertech/forge-ai/ai-gradient-container';
import '@tylertech/forge-ai/ai-empty-state';
import '@tylertech/forge-ai/ai-prompt';

const component = 'forge-ai-chat-interface';

const meta = {
  title: 'Components/Chat/Chat Interface',
  component,
  render: () => html`
    <forge-ai-chat-interface>
      <forge-ai-chat-header slot="header"></forge-ai-chat-header>
      <forge-ai-prompt slot="prompt"></forge-ai-prompt>
    </forge-ai-chat-interface>
  `
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const WithEmptyState: Story = {
  render: () => {
    const suggestions = [
      { text: 'Help me write an email', value: 'email' },
      { text: 'Create a presentation', value: 'presentation' },
      { text: 'Write some code', value: 'code' },
      { text: 'Plan a meeting', value: 'meeting' },
      { text: 'Summarize a document', value: 'summarize' }
    ] as Suggestion[];

    return html`
      <forge-ai-gradient-container>
        <forge-ai-chat-interface>
          <forge-ai-chat-header slot="header"></forge-ai-chat-header>
          <forge-ai-empty-state>
            <forge-ai-suggestions slot="actions" variant="block" .suggestions=${suggestions}> </forge-ai-suggestions>
          </forge-ai-empty-state>
          <forge-ai-prompt slot="prompt"></forge-ai-prompt>
        </forge-ai-chat-interface>
      </forge-ai-gradient-container>
    `;
  }
};

export const WithMessages: Story = {
  render: () => html`
    <forge-ai-chat-interface>
      <forge-ai-chat-header slot="header"></forge-ai-chat-header>
      <forge-ai-user-message> Hello! Can you help me understand how to use TypeScript generics? </forge-ai-user-message>
      <forge-ai-response-message>
        I'd be happy to help you understand TypeScript generics! Generics allow you to create reusable components that can work with different types while
        maintaining type safety.
      </forge-ai-response-message>
      <forge-ai-user-message> Can you give me a practical example? </forge-ai-user-message>
      <forge-ai-response-message>
        Sure! Here's a simple example of a generic function: This function works with any type T, providing type safety while being reusable.
      </forge-ai-response-message>
      <forge-ai-prompt slot="prompt"></forge-ai-prompt>
    </forge-ai-chat-interface>
  `
};

export const WithInlineSuggestions: Story = {
  render: () => {
    const suggestions = [
      { text: 'Help me write an email', value: 'email' },
      { text: 'Create a presentation', value: 'presentation' },
      { text: 'Write some code', value: 'code' },
      { text: 'Plan a meeting', value: 'meeting' },
      { text: 'Summarize a document', value: 'summarize' }
    ] as Suggestion[];

    return html`
      <forge-ai-chat-interface>
        <forge-ai-chat-header slot="header"></forge-ai-chat-header>
        <forge-ai-user-message> Hello! Can you help me understand how to use TypeScript generics? </forge-ai-user-message>
        <forge-ai-response-message>
          I'd be happy to help you understand TypeScript generics! Generics allow you to create reusable components that can work with different types while
          maintaining type safety.
        </forge-ai-response-message>
        <forge-ai-user-message> Can you give me a practical example? </forge-ai-user-message>
        <forge-ai-response-message>
          Sure! Here's a simple example of a generic function: This function works with any type T, providing type safety while being reusable.
        </forge-ai-response-message>
        <forge-ai-suggestions slot="suggestions" .suggestions=${suggestions}></forge-ai-suggestions>
        <forge-ai-prompt slot="prompt"></forge-ai-prompt>
      </forge-ai-chat-interface>
    `;
  }
};

export const WithGradientBorderComponent: Story = {
  render: () => {
    const suggestions = [
      { text: 'Help me write an email', value: 'email' },
      { text: 'Create a presentation', value: 'presentation' },
      { text: 'Write some code', value: 'code' },
      { text: 'Plan a meeting', value: 'meeting' },
      { text: 'Summarize a document', value: 'summarize' }
    ] as Suggestion[];

    return html`
      <forge-ai-gradient-container>
        <forge-ai-chat-interface>
          <forge-ai-chat-header slot="header"></forge-ai-chat-header>
          <forge-ai-user-message> Hello! Can you help me understand how to use TypeScript generics? </forge-ai-user-message>
          <forge-ai-response-message>
            I'd be happy to help you understand TypeScript generics! Generics allow you to create reusable components that can work with different types while
            maintaining type safety.
          </forge-ai-response-message>
          <forge-ai-user-message> Can you give me a practical example? </forge-ai-user-message>
          <forge-ai-response-message>
            Sure! Here's a simple example of a generic function: This function works with any type T, providing type safety while being reusable.
          </forge-ai-response-message>
          <forge-ai-suggestions slot="suggestions" .suggestions=${suggestions}></forge-ai-suggestions>
          <forge-ai-prompt slot="prompt"></forge-ai-prompt>
        </forge-ai-chat-interface>
      </forge-ai-gradient-container>
    `;
  }
};
