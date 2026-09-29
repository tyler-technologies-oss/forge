import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '@tylertech/forge/footer';
import '@tylertech/forge/footer/footer-item';

const component = 'forge-footer';

const meta = {
  title: 'Components/Footer',
  component,
  render: args => html`
    <forge-footer .layout=${args.layout} .layoutBreakpoint=${args.layoutBreakpoint}>
      <forge-footer-item>
        <a href="javascript: void(0);">About</a>
      </forge-footer-item>
      <forge-footer-item>
        <a href="javascript: void(0);">Contact</a>
      </forge-footer-item>
      <forge-footer-item>
        <a href="javascript: void(0);">Privacy</a>
      </forge-footer-item>
      <forge-footer-item>
        <span>© 2026 Tyler Technologies</span>
      </forge-footer-item>

      <a slot="graphic" href="https://www.tylertech.com/" target="_blank">
        <img src="https://cdn.forge.tylertech.com/v1/images/branding/tyler/tyler-empowered-logo-white.svg" alt="Empowered by Tyler Technologies" />
      </a>
    </forge-footer>
  `,
  argTypes: {
    layout: {
      control: 'select',
      options: ['standard', 'alternative', 'auto']
    },
    layoutBreakpoint: {
      control: 'number',
      description: 'Breakpoint used when layout is set to auto'
    }
  },
  args: {
    layout: 'auto',
    layoutBreakpoint: 900
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
