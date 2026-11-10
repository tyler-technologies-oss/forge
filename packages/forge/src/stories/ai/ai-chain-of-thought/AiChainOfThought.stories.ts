import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html, type TemplateResult } from 'lit';

import '@tylertech/forge-ai/ai-chain-of-thought';
import '@tylertech/forge-ai/ai-reasoning-header';
import '@tylertech/forge-ai/ai-chat-interface';
import '@tylertech/forge-ai/ai-chat-header';
import '@tylertech/forge-ai/ai-prompt';
import '@tylertech/forge-ai/ai-dropdown-menu';
import '@tylertech/forge-ai/ai-voice-input';
import '@tylertech/forge-ai/ai-gradient-container';
import '@tylertech/forge-ai/ai-user-message';
import '@tylertech/forge-ai/ai-response-message';
import type { ForgeAiVoiceInputResultEvent } from '@tylertech/forge-ai/ai-voice-input';
import { IconRegistry } from '@tylertech/forge/icon';
import '@tylertech/forge/card';
import '@tylertech/forge/icon';
import '@tylertech/forge/icon-button';
import { tylIconAdd, tylIconSparkles } from '@tylertech/tyler-icons';

const component = 'forge-ai-chain-of-thought';

IconRegistry.define([tylIconAdd, tylIconSparkles]);

const snowboardingSources = [
  { title: 'Powder Safety Guide', href: 'https://example.com/safety-guide' },
  { title: 'Equipment Reviews 2024', href: 'https://example.com/equipment-reviews' }
];

const createPrompt = (): TemplateResult => {
  const handleVoiceInput = (event: CustomEvent<ForgeAiVoiceInputResultEvent>): void => {
    const prompt = (event.target as HTMLElement).closest('forge-ai-prompt');
    if (prompt) {
      prompt.value = event.detail.transcript;
    }
  };

  return html`
    <forge-ai-prompt slot="prompt">
      <forge-ai-dropdown-menu variant="icon-button" selection-mode="none" slot="actions-start">
        <span slot="trigger-content">
          <forge-icon name="add" external></forge-icon>
        </span>
        <forge-ai-dropdown-menu-item value="add-image">
          <span>Add image</span>
          <forge-icon name="sparkles" slot="start"></forge-icon>
        </forge-ai-dropdown-menu-item>
        <forge-ai-dropdown-menu-item value="add-pdf">
          <span>Add PDF</span>
          <forge-icon name="sparkles" slot="start"></forge-icon>
        </forge-ai-dropdown-menu-item>
        <forge-ai-dropdown-menu-item value="add-spreadsheet">
          <span>Add spreadsheet</span>
          <forge-icon name="sparkles" slot="start"></forge-icon>
        </forge-ai-dropdown-menu-item>
      </forge-ai-dropdown-menu>
      <forge-ai-voice-input slot="actions-end" @forge-ai-voice-input-result=${handleVoiceInput}></forge-ai-voice-input>
    </forge-ai-prompt>
  `;
};

const meta = {
  title: 'AI/Components/Chain of Thought',
  component,
  argTypes: {
    expanded: {
      control: 'boolean',
      description: 'Whether the chain of thought is expanded'
    }
  },
  args: {
    expanded: false
  },
  render: (args: any) => html`
    <forge-ai-chain-of-thought .expanded=${args.expanded}>
      <forge-ai-reasoning-header slot="heading" .expanded=${args.expanded}>
        <span slot="title">Chain of Thought</span>
      </forge-ai-reasoning-header>

      <forge-ai-thought-search-result .sources=${snowboardingSources}>
        <span slot="title">Searching for snowboarding information</span>
        Found 2 relevant articles about advanced snowboarding techniques and safety tips for experienced riders.
      </forge-ai-thought-search-result>

      <forge-ai-thought-image>
        <span slot="title">Analyzing the snowboarder's technique</span>
        <img
          src="https://images.unsplash.com/photo-1495469552678-d0fb77903866?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          slot="image" />
      </forge-ai-thought-image>

      <forge-ai-thought-detail>
        <span slot="title">Assessment and conclusion</span>
        Based on the image analysis and research, this snowboarder demonstrates excellent form with proper edge control, balanced stance, and appropriate speed
        for the terrain. The powder conditions appear ideal for this type of riding.
      </forge-ai-thought-detail>
    </forge-ai-chain-of-thought>
  `
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const InChatInterface: Story = {
  render: () => html`
    <forge-ai-gradient-container style="height: 800px; width: 100%;">
      <forge-ai-chat-interface>
        <forge-ai-chat-header slot="header"></forge-ai-chat-header>

        <forge-ai-user-message> Can you analyze this snowboarding image and tell me about the technique being used? </forge-ai-user-message>

        <forge-ai-response-message>
          <p>I'll analyze the snowboarding image for you. Let me break down my thought process:</p>
        </forge-ai-response-message>

        <forge-ai-chain-of-thought>
          <forge-ai-reasoning-header slot="heading">
            <span slot="title">Analyzing Snowboarding Technique</span>
          </forge-ai-reasoning-header>

          <forge-ai-thought-search-result .sources=${snowboardingSources}>
            <span slot="title">Searching for snowboarding information</span>
            Found 2 relevant articles about advanced snowboarding techniques and safety tips for experienced riders.
          </forge-ai-thought-search-result>

          <forge-ai-thought-image>
            <span slot="title">Analyzing the snowboarder's technique</span>
            <img
              src="https://images.unsplash.com/photo-1495469552678-d0fb77903866?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by-web8fHx8MA%3D%3D"
              slot="image" />
          </forge-ai-thought-image>

          <forge-ai-thought-detail>
            <span slot="title">Assessment and conclusion</span>
            Based on the image analysis and research, this snowboarder demonstrates excellent form with proper edge control, balanced stance, and appropriate
            speed for the terrain. The powder conditions appear ideal for this type of riding.
          </forge-ai-thought-detail>
        </forge-ai-chain-of-thought>

        ${createPrompt()}
      </forge-ai-chat-interface>
    </forge-ai-gradient-container>
  `
};

export const SequentialLoading: Story = {
  render: () => {
    const thoughtSteps = [
      {
        type: 'search',
        title: 'Searching for Mini Australian Shepherd information',
        content: 'Found 12 breed-specific articles and veterinary resources about Mini Australian Shepherds.',
        sources: [
          { title: 'AKC Breed Standards', href: 'https://example.com/akc-standards' },
          { title: 'Mini Aussie Health Guide', href: 'https://example.com/health-guide' },
          { title: 'Herding Dog Training Manual', href: 'https://example.com/training-manual' }
        ],
        delay: 1500
      },
      {
        type: 'detail',
        title: 'Analyzing breed characteristics',
        content: 'Mini Australian Shepherds are highly intelligent, energetic herding dogs that typically weigh 20-40 pounds and stand 13-18 inches tall.',
        delay: 3500
      },
      {
        type: 'image',
        title: 'Examining breed appearance',
        content: 'This Mini Aussie shows the typical merle coat pattern and alert expression characteristic of the breed.',
        imageSrc: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?q=80&w=1287&auto=format&fit=crop',
        delay: 6000
      },
      {
        type: 'detail',
        title: 'Cross-referencing temperament data',
        content: 'Research shows Mini Aussies are loyal, protective, and require significant mental and physical stimulation due to their herding instincts.',
        delay: 8500
      },
      {
        type: 'detail',
        title: 'Care and training recommendations',
        content:
          'Mini Australian Shepherds thrive with consistent training, daily exercise, and early socialization. They excel at agility, herding trials, and make devoted family companions.',
        delay: 11000
      }
    ];

    const startSequentialLoading = (chainContainer: HTMLElement): void => {
      const reasoningHeader = chainContainer.querySelector('forge-ai-reasoning-header') as any;

      // Set reasoning mode to true when starting
      if (reasoningHeader) {
        reasoningHeader.reasoning = true;
      }

      thoughtSteps.forEach((step, stepIndex) => {
        setTimeout(() => {
          let thoughtElement: HTMLElement;

          if (step.type === 'search') {
            thoughtElement = document.createElement('forge-ai-thought-search-result');
            (thoughtElement as any).sources = step.sources;
            thoughtElement.innerHTML = `
              <span slot="title">${step.title}</span>
              ${step.content}
            `;
          } else if (step.type === 'image') {
            thoughtElement = document.createElement('forge-ai-thought-image');
            thoughtElement.innerHTML = `
              <span slot="title">${step.title}</span>
              <img src="${step.imageSrc}" slot="image" alt="Analysis image" />
              ${step.content}
            `;
          } else {
            thoughtElement = document.createElement('forge-ai-thought-detail');
            thoughtElement.innerHTML = `
              <span slot="title">${step.title}</span>
              ${step.content}
            `;
          }

          chainContainer.appendChild(thoughtElement);

          // If this is the last step, set reasoning to false
          if (stepIndex === thoughtSteps.length - 1) {
            setTimeout(() => {
              if (reasoningHeader) {
                reasoningHeader.reasoning = false;
              }
            }, 300); // Small delay after the last thought appears
          }
        }, step.delay);
      });
    };

    setTimeout(() => {
      const chainContainer = document.querySelector('#sequential-chain') as HTMLElement;
      if (chainContainer) {
        startSequentialLoading(chainContainer);
      }
    }, 500);

    return html`
      <forge-ai-gradient-container style="height: 800px; width: 100%;">
        <forge-ai-chat-interface>
          <forge-ai-chat-header slot="header"></forge-ai-chat-header>

          <forge-ai-user-message> Can you tell me about Mini Australian Shepherds? I'm thinking about getting one as a family pet. </forge-ai-user-message>

          <forge-ai-response-message>
            <p>I'd be happy to help you learn about Mini Australian Shepherds! Let me gather some information for you:</p>
          </forge-ai-response-message>

          <forge-ai-chain-of-thought id="sequential-chain" expanded>
            <forge-ai-reasoning-header slot="heading" expanded>
              <span slot="title">Mini Australian Shepherd Analysis</span>
              <span slot="reasoning-title">Thinking...</span>
            </forge-ai-reasoning-header>
          </forge-ai-chain-of-thought>

          ${createPrompt()}
        </forge-ai-chat-interface>
      </forge-ai-gradient-container>
    `;
  }
};
