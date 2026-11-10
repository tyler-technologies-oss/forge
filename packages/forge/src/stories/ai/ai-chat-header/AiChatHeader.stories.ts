import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html, type TemplateResult } from 'lit';
import { action } from 'storybook/actions';

import '@tylertech/forge-ai/ai-chat-header';
import { IconRegistry } from '@tylertech/forge/icon';
import '@tylertech/forge/card';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/icon';
import { tylIconHistory, tylIconSettings } from '@tylertech/tyler-icons';

const component = 'forge-ai-chat-header';

// Storybook actions for events
const expandAction = action('forge-ai-chat-header-expand');
const minimizeAction = action('forge-ai-chat-header-minimize');
const clearChatAction = action('forge-ai-chat-header-clear');
const infoAction = action('forge-ai-chat-header-info');

IconRegistry.define([tylIconHistory, tylIconSettings]);

const meta = {
  title: 'AI/Components/Chat Header',
  component,
  argTypes: {
    titleText: {
      control: 'text',
      description: 'The title text to display in the header slot'
    },
    showExpandButton: {
      control: 'boolean',
      description: 'Controls whether the expand button is visible'
    },
    showMinimizeButton: {
      control: 'boolean',
      description: 'Controls whether the minimize button is visible'
    },
    expanded: {
      control: 'boolean',
      description: 'Indicates the current expanded state for displaying the appropriate expand/collapse icon'
    },
    minimizeIcon: {
      control: { type: 'select' },
      options: ['default', 'panel'],
      description: 'Controls which minimize icon to display'
    },
    customIcon: {
      control: { type: 'select' },
      options: ['default', 'emoji', 'custom-svg'],
      description: 'Choose icon type to display'
    },
    showConversationsButton: {
      control: 'boolean',
      description: 'Controls whether the conversations button (hamburger menu) is visible'
    },
    hasConversationsError: {
      control: 'boolean',
      description: 'Shows an error badge on the conversations button, indicating a failure inside the conversations panel'
    },
    useLongTitle: {
      control: 'boolean',
      description: 'Toggle to test with a long Lorem Ipsum title for styling'
    }
  },
  args: {
    titleText: 'AI Assistant',
    showExpandButton: false,
    showMinimizeButton: false,
    expanded: false,
    minimizeIcon: 'default',
    customIcon: 'default',
    showConversationsButton: false,
    hasConversationsError: false,
    useLongTitle: false
  },
  render: (args: any) => {
    const getCustomIcon = (): TemplateResult | string => {
      switch (args.customIcon) {
        case 'emoji':
          return html`<div slot="icon" style="font-size: 24px;">🤖</div>`;
        case 'custom-svg':
          return html`
            <svg slot="icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          `;
        default:
          return '';
      }
    };

    const titleText = args.useLongTitle
      ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      : args.titleText;

    return html`
      <forge-ai-chat-header
        .titleText=${titleText}
        .showExpandButton=${args.showExpandButton}
        .showMinimizeButton=${args.showMinimizeButton}
        .expanded=${args.expanded}
        .minimizeIcon=${args.minimizeIcon}
        ?show-conversations-button=${args.showConversationsButton}
        ?has-conversations-error=${args.hasConversationsError}
        heading-level="2"
        @forge-ai-chat-header-expand=${expandAction}
        @forge-ai-chat-header-minimize=${minimizeAction}
        @forge-ai-chat-header-clear=${clearChatAction}
        @forge-ai-chat-header-info=${infoAction}>
        ${getCustomIcon()}
      </forge-ai-chat-header>
    `;
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

/**
 * `hasConversationsError` badges the conversations button so a failed thread load stays visible while
 * the conversations panel is closed.
 */
export const ConversationsError: Story = {
  args: {
    showConversationsButton: true,
    hasConversationsError: true
  }
};

export const WithHeaderActions: Story = {
  args: {
    showMinimizeButton: true,
    showExpandButton: true
  },
  render: (args: any) => {
    const titleText = args.useLongTitle
      ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      : args.titleText;

    return html`
      <forge-ai-chat-header
        .titleText=${titleText}
        .showExpandButton=${args.showExpandButton}
        .showMinimizeButton=${args.showMinimizeButton}
        .expanded=${args.expanded}
        .minimizeIcon=${args.minimizeIcon}
        heading-level="2"
        @forge-ai-chat-header-expand=${expandAction}
        @forge-ai-chat-header-minimize=${minimizeAction}
        @forge-ai-chat-header-clear=${clearChatAction}
        @forge-ai-chat-header-info=${infoAction}>
        <forge-icon-button slot="header-actions" density="medium" aria-label="History">
          <forge-icon name="history"></forge-icon>
        </forge-icon-button>
        <forge-icon-button slot="header-actions" density="medium" aria-label="Settings">
          <forge-icon name="settings"></forge-icon>
        </forge-icon-button>
      </forge-ai-chat-header>
    `;
  }
};
