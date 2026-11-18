import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '@tylertech/forge-ai/ai-reasoning';
import '@tylertech/forge-ai/ai-reasoning-header';
import '@tylertech/forge-ai/ai-gradient-container';
import '@tylertech/forge-ai/ai-chat-interface';
import '@tylertech/forge-ai/ai-chat-header';

const component = 'forge-ai-reasoning';

const storyStyles = html`<style>
  .gradient-story-chat {
    block-size: 800px;
    inline-size: 100%;
  }
</style>`;

const meta = {
  title: 'Components/Tools & Reasoning/Reasoning',
  component,
  argTypes: {
    expanded: {
      control: 'boolean',
      description: 'Whether the reasoning is expanded'
    }
  },
  args: {
    expanded: true
  },
  render: (args: any) => {
    const reasoningSteps = [
      'Based on the provided information, I can reason through this step by step:',
      'Observation: The user is asking about a complex technical problem.',
      'Analysis: Multiple factors need to be considered including performance, scalability, and maintainability.',
      'Evaluation: The proposed solution addresses the core requirements while maintaining code quality.',
      'Conclusion: This approach provides the best balance of functionality and maintainability. Therefore, I recommend proceeding with the suggested implementation.'
    ];

    const template = html`
      ${storyStyles}
      <forge-ai-gradient-container class="gradient-story-chat">
        <forge-ai-chat-interface>
          <forge-ai-chat-header slot="header"></forge-ai-chat-header>
          <forge-ai-reasoning .expanded=${args.expanded} id="reasoning-container">
            <forge-ai-reasoning-header slot="header" .expanded=${args.expanded}>
              <span slot="reasoning-title">Thinking...</span>
              <span slot="title">AI Reasoning Process</span>
            </forge-ai-reasoning-header>
          </forge-ai-reasoning>
        </forge-ai-chat-interface>
      </forge-ai-gradient-container>
    `;

    // Add the reasoning steps dynamically with delays (only once)
    setTimeout(() => {
      const container = document.getElementById('reasoning-container');
      const header = container?.querySelector('forge-ai-reasoning-header');

      if (container && header && !container.hasAttribute('data-content-loaded')) {
        container.setAttribute('data-content-loaded', 'true');

        reasoningSteps.forEach((stepText, index) => {
          setTimeout(() => {
            // Set reasoning to true when first item starts processing
            if (index === 0) {
              (header as any).reasoning = true;
            }

            const contentElement = document.createElement('forge-ai-reasoning-content');
            contentElement.textContent = stepText;
            container.appendChild(contentElement);

            // Set reasoning to false when last item finishes processing
            if (index === reasoningSteps.length - 1) {
              // Wait for the typing animation to complete before setting to false
              setTimeout(
                () => {
                  (header as any).reasoning = false;
                },
                stepText.length * 10 + 500
              ); // Approximate typing duration + buffer
            }
          }, index * 2000); // 2 second delay between each step
        });
      }
    }, 100);

    return template;
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
