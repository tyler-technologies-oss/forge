import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from 'storybook/actions';
import type { IMenuOption } from '@tylertech/forge/menu';

import '@tylertech/forge/responsive-toolbar';
import '@tylertech/forge/button';
import '@tylertech/forge/stack';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/icon';
import '@tylertech/forge/menu';
import '@tylertech/forge/split-view';
import '@tylertech/forge/card';

const updateAction = action('forge-responsive-toolbar-update');

const component = 'forge-responsive-toolbar';

interface CustomMenuOption extends IMenuOption {
  variant?: 'text' | 'raised' | 'outlined';
}

const meta = {
  title: 'Components/Responsive Toolbar',
  render: args => {
    const options: CustomMenuOption[] = [
      { label: 'Add User ', value: 'add-user', variant: 'text' },
      { label: 'Remove User', value: 'remove-user', variant: 'outlined' },
      { label: 'Third action', value: 'third-action', variant: 'raised' }
    ];

    return html`
      <forge-split-view auto-close-threshold="120">
        <forge-split-view-panel>
          <div class="container">
            <forge-card no-padding>
              <forge-responsive-toolbar @forge-responsive-toolbar-update=${updateAction} ?no-border=${args.noBorder} ?inverted=${args.inverted}>
                <forge-icon-button aria-label="Icon button demo" slot="before-start">
                  <forge-icon name="arrow_back" external></forge-icon>
                </forge-icon-button>
                <div slot="start" class="title forge-typography--heading4">${args.title}</div>
                <forge-stack inline alignment="center" slot="end-large">
                  ${options.map(item => html`<forge-button variant=${ifDefined(item.variant)}>${item.label}</forge-button>`)}
                </forge-stack>
                <div slot="end-small">
                  <forge-menu .options=${options} id="example-menu">
                    <forge-icon-button aria-label="Open menu">
                      <forge-icon name="more_vert" external></forge-icon>
                    </forge-icon-button>
                  </forge-menu>
                </div>
                ${args.afterEnd ? html`<div slot="after-end"><forge-button>After end</forge-button></div>` : nothing}
              </forge-responsive-toolbar>
              <div class="info">
                <forge-stack inline alignment="start">
                  <p>Resize the split view component to see the responsive behavior.</p>
                  <forge-icon name="arrow_forward" external></forge-icon>
                </forge-stack>
              </div>
            </forge-card>
          </div>
        </forge-split-view-panel>
        <forge-split-view-panel size="150"></forge-split-view-panel>
      </forge-split-view>

      <style>
        .title {
          white-space: nowrap;
        }

        forge-split-view {
          height: 300px;
        }

        .info {
          padding: 16px;
          margin-top: 64px;
          display: flex;
          justify-content: end;
        }

        .info p {
          margin: 0;
        }

        forge-split-view forge-split-view-panel:last-child {
          background-color: var(--forge-theme-surface-dim);
          display: grid;
          place-content: center;
          place-items: center;
          text-align: center;
        }
      </style>
    `;
  },
  component,
  argTypes: {
    title: { control: 'text' },
    noBorder: { control: 'boolean' },
    inverted: { control: 'boolean' },
    afterEnd: { control: 'boolean', name: 'Show after-end slot content' }
  },
  args: {
    title: 'User management',
    noBorder: false,
    inverted: false,
    afterEnd: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {
  args: {
    afterEnd: false
  }
};
