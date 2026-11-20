import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { ref } from 'lit/directives/ref.js';
import { action } from 'storybook/actions';
import type { SlashCommand } from '@tylertech/forge-ai/types';
import type { AiSlashCommandMenuComponent } from '@tylertech/forge-ai/ai-slash-command-menu';

import '@tylertech/forge-ai/ai-slash-command-menu';

const component = 'forge-ai-slash-command-menu';

const commands: SlashCommand[] = [
  { id: 'clear', name: 'Clear conversation', group: 'Conversation' },
  { id: 'export', name: 'Export conversation', group: 'Conversation' },
  { id: 'info', name: 'About this assistant', group: 'Help' },
  { id: 'debug', name: 'Toggle debug mode', group: 'Help' }
];

const meta = {
  title: 'Components/Input & Context/Slash Command Menu',
  component,
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the menu is shown. It also requires an `anchor`'
    },
    filterQuery: {
      control: 'text',
      description: 'Text used to filter commands by name, ignoring case'
    }
  },
  args: {
    open: true,
    filterQuery: ''
  },
  render: args => {
    let input: HTMLInputElement | undefined;
    let menu: AiSlashCommandMenuComponent | undefined;
    return html`
      <style>
        .slash-command-menu-story {
          padding-block-start: 160px;
          max-inline-size: 480px;
        }
        .slash-command-menu-story input {
          box-sizing: border-box;
          inline-size: 100%;
        }
      </style>
      <div class="slash-command-menu-story">
        <input
          type="text"
          aria-label="Message"
          placeholder="Type a message"
          ${ref(el => (input = el as HTMLInputElement | undefined))}
          @keydown=${(evt: KeyboardEvent) => menu?.handleKeyDown(evt)} />
        <forge-ai-slash-command-menu
          ${ref(el => {
            menu = el as AiSlashCommandMenuComponent | undefined;
            if (menu && input) {
              menu.anchor = input;
            }
          })}
          .commands=${commands}
          .open=${args.open}
          filter-query=${args.filterQuery}
          @forge-ai-slash-command-menu-select=${(evt: CustomEvent) => action('forge-ai-slash-command-menu-select')(evt.detail)}
          @forge-ai-slash-command-menu-close=${action('forge-ai-slash-command-menu-close')}>
        </forge-ai-slash-command-menu>
      </div>
    `;
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

/** Commands whose name does not contain `filterQuery` are hidden. With no matches the menu shows "No commands found". */
export const Filtered: Story = {
  args: {
    filterQuery: 'conv'
  }
};
