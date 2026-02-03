import { html } from 'lit';
import { action } from 'storybook/actions';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { generateCustomElementArgTypes } from '../../utils';

import '@tylertech/forge/keyboard-shortcut';
import '@tylertech/forge/button';
import { IKeyboardShortcutComponent } from '@tylertech/forge/keyboard-shortcut';

const component = 'forge-keyboard-shortcut';

const activateAction = action('forge-keyboard-shortcut-activate');
const activateCallbackAction = action('activateCallback');

const meta = {
  title: 'Components/Keyboard Shortcut',
  render: args => {
    return html`
      <forge-button variant="raised">Shortcut target</forge-button>
      <forge-keyboard-shortcut
        .activateCallback=${activateCallbackAction}
        .keyBinding=${args.keyBinding}
        .global=${args.global}
        .allowWhileTyping=${args.allowWhileTyping}
        .preventDefault=${args.preventDefault}
        .capture=${args.capture}
        .useCode=${args.useCode}
        .disabled=${args.disabled}
        @forge-keyboard-shortcut-activate=${activateAction}>
      </forge-keyboard-shortcut>
    `;
  },
  component,
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['activateCallback', 'target', 'key']
    })
  },
  args: {
    keyBinding: 'a',
    global: false,
    allowWhileTyping: false,
    preventDefault: false,
    capture: false,
    useCode: false,
    disabled: false
  }
} satisfies Meta<Partial<IKeyboardShortcutComponent>>;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
