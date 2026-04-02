import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { IToastComponent, IToastProperties } from '@tylertech/forge/toast';
import { html, nothing } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { styleMap } from 'lit/directives/style-map.js';
import { action } from 'storybook/actions';
import { GLOBAL_THEME_OPTIONS, OVERLAY_PLACEMENT_OPTIONS, generateCustomElementArgTypes, getCssVariableArgs } from '../../utils.js';

import '@tylertech/forge/button';
import '@tylertech/forge/toast';

const component = 'forge-toast';

const actionAction = action('forge-toast-action');
const closeAction = action('forge-toast-close');

const meta = {
  title: 'Components/Toast',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const toastRef = createRef();
    const showToast = (): boolean => ((toastRef.value as IToastComponent).open = !(toastRef.value as IToastComponent).open);

    return html`
      <forge-button variant="raised" @click=${showToast}>Show Toast</forge-button>
      <forge-toast
        ${ref(toastRef)}
        .open=${args.open}
        .duration=${args.duration}
        .placement=${args.placement}
        .actionText=${args.actionText}
        .dismissible=${args.dismissible}
        .dismissLabel=${args.dismissLabel}
        .theme=${args.theme}
        style=${style}
        @forge-toast-action=${actionAction}
        @forge-toast-close=${closeAction}>
        ${args.text}
      </forge-toast>
    `;
  },
  component,
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      controls: {
        placement: { control: 'select', options: OVERLAY_PLACEMENT_OPTIONS },
        theme: { control: 'select', options: ['default', ...GLOBAL_THEME_OPTIONS] }
      }
    }),
    text: { control: 'text' }
  },
  args: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    open: false,
    duration: 2750,
    placement: 'bottom',
    actionText: '',
    dismissible: false,
    dismissLabel: 'Dismiss toast',
    theme: 'default'
  }
} satisfies Meta<IToastProperties & { text: string }>;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Dismissible: Story = {
  args: {
    dismissible: true,
    text: 'This toast is dismissible!'
  }
};
