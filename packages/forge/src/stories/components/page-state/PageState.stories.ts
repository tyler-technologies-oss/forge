import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { generateCustomElementArgTypes, getCssVariableArgs } from '../../utils.js';
import { styleMap } from 'lit/directives/style-map.js';

import '@tylertech/forge/page-state';
import '@tylertech/forge/button';

const component = 'forge-page-state';

const meta = {
  title: 'Components/Page State',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    return html`
      <forge-page-state style=${style}>
        <img src="https://cdn.forge.tylertech.com/v1/images/spot-hero/404-error-spot-hero.svg" alt="" slot="graphic" />
        <div slot="title">Nothing but tumbleweeds here...</div>
        <p slot="message">Even our best explorer couldn't find the page you're looking for. It might have been removed or you may have mistyped the URL.</p>
        <forge-button variant="raised" slot="action"> Go back </forge-button>
        <forge-button variant="outlined" slot="action"> Refresh </forge-button>
      </forge-page-state>
    `;
  },
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component
    })
  },
  args: {}
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const CSSOnly: Story = {
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    return html`
      <div class="forge-page-state" style=${style}>
        <img src="https://cdn.forge.tylertech.com/v1/images/spot-hero/404-error-spot-hero.svg" class="forge-page-state__graphic" alt="" />
        <div class="forge-page-state__title">Nothing but tumbleweeds here...</div>
        <div class="forge-page-state__message">
          Even our best explorer couldn't find the page you're looking for. It might have been removed or you may have mistyped the URL.
        </div>
        <div class="forge-page-state__actions">
          <button class="forge-button forge-button--raised">Go back</button>
          <button class="forge-button forge-button--outlined">Refresh</button>
        </div>
      </div>
    `;
  }
};
