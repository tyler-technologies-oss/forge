import { html } from 'lit';
import { action } from 'storybook/actions';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { generateCustomElementArgTypes } from '../../utils.js';

import '@tylertech/forge/keyboard-shortcut';
import '@tylertech/forge/button';
import '@tylertech/forge/text-field';
import { IKeyboardShortcutComponent } from '@tylertech/forge/keyboard-shortcut';

const component = 'forge-keyboard-shortcut';

const activateAction = action('forge-keyboard-shortcut-activate');
const activateCallbackAction = action('activateCallback');

const meta = {
  title: 'Components/Keyboard Shortcut',
  render: args => html`
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
  `,
  component,
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['activateCallback', 'target', 'key', 'anchorElement', 'scopeElement']
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

export const ScopedEditors: Story = {
  render: () => {
    const handleActivate = (evt: Event): void => {
      const shortcut = evt.target as IKeyboardShortcutComponent;
      const anchor = shortcut.anchorElement as HTMLElement | null;
      anchor?.click();
    };

    return html`
      <div style="display: flex; gap: 16px;">
        <div
          forge-keyboard-shortcut-scope
          tabindex="-1"
          style="border: 1px solid var(--forge-theme-outline); padding: 16px; flex: 1;"
          @forge-keyboard-shortcut-activate=${handleActivate}>
          <p>Editor 1 — press Ctrl+B / Cmd+B</p>
          <forge-button id="bold-1" variant="outlined" @click=${() => action('bold-1')('clicked')}>Bold</forge-button>
          <forge-keyboard-shortcut key="mod+b" anchor="bold-1"></forge-keyboard-shortcut>
        </div>
        <div
          forge-keyboard-shortcut-scope
          tabindex="-1"
          style="border: 1px solid var(--forge-theme-outline); padding: 16px; flex: 1;"
          @forge-keyboard-shortcut-activate=${handleActivate}>
          <p>Editor 2 — press Ctrl+B / Cmd+B</p>
          <forge-button id="bold-2" variant="outlined" @click=${() => action('bold-2')('clicked')}>Bold</forge-button>
          <forge-keyboard-shortcut key="mod+b" anchor="bold-2"></forge-keyboard-shortcut>
        </div>
      </div>
    `;
  }
};

export const GlobalShortcut: Story = {
  render: () => html`
    <div>
      <p>Press <kbd>/</kbd> anywhere on the page to focus the search field.</p>
      <forge-text-field>
        <label for="global-search">Search</label>
        <input type="text" id="global-search" />
      </forge-text-field>
      <forge-keyboard-shortcut
        key="/"
        anchor="global-search"
        global
        @forge-keyboard-shortcut-activate=${(evt: CustomEvent<KeyboardEvent>) => {
          const input = document.getElementById('global-search') as HTMLInputElement;
          input?.focus();
        }}>
      </forge-keyboard-shortcut>
    </div>
  `
};

export const KeySequence: Story = {
  render: () => {
    const handleComment = (): void => action('comment')('Ctrl+K > Ctrl+C');
    const handleUncomment = (): void => action('uncomment')('Ctrl+K > Ctrl+U');
    const handleToggle = (): void => action('toggle')('Ctrl+/');

    return html`
      <div forge-keyboard-shortcut-scope tabindex="-1" style="border: 1px solid var(--forge-theme-outline); padding: 16px; position: relative;">
        <p>Multi-step keyboard sequences using the <code>&gt;</code> separator:</p>
        <ul>
          <li><kbd>Ctrl+K</kbd> then <kbd>Ctrl+C</kbd> — Comment selection</li>
          <li><kbd>Ctrl+K</kbd> then <kbd>Ctrl+U</kbd> — Uncomment selection</li>
          <li><kbd>Ctrl+/</kbd> — Toggle comment (single chord alternative)</li>
        </ul>
        <p>After pressing the first chord, you have 1 second to press the second chord.</p>
        <forge-button id="seq-comment-btn" variant="outlined" @click=${handleComment}>Comment</forge-button>
        <forge-keyboard-shortcut
          key="Control+k>Control+c"
          anchor="seq-comment-btn"
          @forge-keyboard-shortcut-activate=${handleComment}></forge-keyboard-shortcut>

        <forge-button id="seq-uncomment-btn" variant="outlined" @click=${handleUncomment}>Uncomment</forge-button>
        <forge-keyboard-shortcut
          key="Control+k>Control+u"
          anchor="seq-uncomment-btn"
          @forge-keyboard-shortcut-activate=${handleUncomment}></forge-keyboard-shortcut>

        <forge-button id="seq-toggle-btn" variant="outlined" @click=${handleToggle}>Toggle</forge-button>
        <forge-keyboard-shortcut key="Control+/" anchor="seq-toggle-btn" @forge-keyboard-shortcut-activate=${handleToggle}></forge-keyboard-shortcut>
      </div>
    `;
  }
};
