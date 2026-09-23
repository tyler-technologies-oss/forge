import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';
import { generateCustomElementArgTypes } from '../../utils.js';

import '@tylertech/forge/button';
import '@tylertech/forge/keyboard-shortcut';
import { formatKeyboardShortcutBinding, IKeyboardShortcutComponent } from '@tylertech/forge/keyboard-shortcut';
import '@tylertech/forge/text-field';

const component = 'forge-keyboard-shortcut';

const SEQUENCE_TIMEOUT = 5000;
const MODIFIER_KEYS = ['Alt', 'AltGraph', 'CapsLock', 'Control', 'Meta', 'NumLock', 'ScrollLock', 'Shift'];

const isModifierKeyEvent = (evt: KeyboardEvent): boolean => MODIFIER_KEYS.includes(evt.key);

const activateAction = action('forge-keyboard-shortcut-activate');
const activateCallbackAction = action('activateCallback');

/** Stories that ignore the meta args and demonstrate a fixed markup pattern instead. */
const patternStoryParams = {
  parameters: {
    controls: { disable: true }
  }
};

const createStatus = (initial: string): HTMLElement => {
  const el = document.createElement('div');
  el.setAttribute('aria-live', 'polite');
  el.textContent = initial;
  return el;
};

const clickAnchor = (evt: Event): void => {
  (evt.target as IKeyboardShortcutComponent).anchorElement?.click();
};

const meta = {
  title: 'Components/Keyboard Shortcut',
  render: args => {
    const status = createStatus('Not activated yet.');

    let activationCount = 0;
    const handleTargetClick = (): void => {
      activationCount += 1;
      status.textContent = `Shortcut target clicked ${activationCount} time(s).`;
    };

    const handleActivate = (evt: CustomEvent<KeyboardEvent>): void => {
      activateAction(evt);
      clickAnchor(evt);
    };

    const handleFocusIn = (evt: FocusEvent): void => {
      if (args.allowWhileTyping || !(evt.target instanceof HTMLInputElement)) {
        return;
      }
      status.textContent = 'Focus is in the text field, where the shortcut stays suppressed while allowWhileTyping is off.';
    };

    return html`
      <div
        forge-keyboard-shortcut-scope
        tabindex="-1"
        style="border: 1px solid var(--forge-theme-outline); border-radius: 4px; padding: 16px; display: flex; flex-direction: column; align-items: flex-start; gap: 16px;"
        @forge-keyboard-shortcut-activate=${handleActivate}
        @focusin=${handleFocusIn}>
        <p style="margin: 0;">
          Click inside this panel to focus the scope, then press <kbd>${formatKeyboardShortcutBinding(args.key) || 'no binding'}</kbd>. Turn on
          <code>global</code> to listen on the whole document instead, so the shortcut fires without focusing the panel first.
        </p>
        <p style="margin: 0;">
          The text field is exempt until <code>allowWhileTyping</code> is on — with <code>preventDefault</code> also on, the character is then swallowed instead
          of typed. <code>useCode</code> expects a <code>KeyboardEvent.code</code> value such as <code>KeyA</code>.
        </p>
        <forge-button id="demo-shortcut-target" variant="raised" @click=${handleTargetClick}>Shortcut target</forge-button>
        <forge-text-field>
          <label for="demo-shortcut-input">Type here</label>
          <input type="text" id="demo-shortcut-input" />
        </forge-text-field>
        ${status}
        <forge-keyboard-shortcut
          anchor="demo-shortcut-target"
          .activateCallback=${activateCallbackAction}
          .key=${args.key}
          .global=${args.global}
          .allowWhileTyping=${args.allowWhileTyping}
          .allowRepeat=${args.allowRepeat}
          .fallthrough=${args.fallthrough}
          .preventDefault=${args.preventDefault}
          .capture=${args.capture}
          .useCode=${args.useCode}
          .disabled=${args.disabled}
          .anchorAccessibility=${args.anchorAccessibility}>
        </forge-keyboard-shortcut>
      </div>
    `;
  },
  component,
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['activateCallback', 'keyBinding', 'target', 'anchor', 'anchorElement', 'scope', 'scopeElement'],
      controls: {
        anchorAccessibility: { control: 'select', options: ['auto', 'none'] }
      }
    })
  },
  args: {
    key: 'a',
    global: false,
    allowWhileTyping: false,
    allowRepeat: false,
    fallthrough: false,
    preventDefault: true,
    capture: false,
    useCode: false,
    disabled: false,
    anchorAccessibility: 'auto'
  }
} satisfies Meta<Partial<IKeyboardShortcutComponent>>;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const ScopedEditors: Story = {
  ...patternStoryParams,
  render: () => {
    const status = createStatus('Focus an editor, then press Ctrl+B / Cmd+B.');
    const handleBold = (label: string) => (): void => {
      action(label)('clicked');
      status.textContent = `${label} activated.`;
    };

    return html`
      <div>
        <div style="display: flex; gap: 16px;">
          <div
            forge-keyboard-shortcut-scope
            tabindex="-1"
            style="border: 1px solid var(--forge-theme-outline); padding: 16px; flex: 1;"
            @forge-keyboard-shortcut-activate=${clickAnchor}>
            <p>Editor 1 — press Ctrl+B / Cmd+B</p>
            <forge-text-field>
              <label>Editor 1 Content</label>
              <textarea></textarea>
            </forge-text-field>
            <br />
            <forge-button id="bold-1" variant="outlined" @click=${handleBold('bold-1')}>Bold</forge-button>
            <forge-keyboard-shortcut key="mod+b" anchor="bold-1" allow-while-typing></forge-keyboard-shortcut>
          </div>
          <div
            forge-keyboard-shortcut-scope
            tabindex="-1"
            style="border: 1px solid var(--forge-theme-outline); padding: 16px; flex: 1;"
            @forge-keyboard-shortcut-activate=${clickAnchor}>
            <p>Editor 2 — press Ctrl+B / Cmd+B</p>
            <forge-text-field>
              <label>Editor 2 Content</label>
              <textarea></textarea>
            </forge-text-field>
            <br />
            <forge-button id="bold-2" variant="outlined" @click=${handleBold('bold-2')}>Bold</forge-button>
            <forge-keyboard-shortcut key="mod+b" anchor="bold-2" allow-while-typing></forge-keyboard-shortcut>
          </div>
        </div>
        <p>${status}</p>
      </div>
    `;
  }
};

export const GlobalShortcut: Story = {
  ...patternStoryParams,
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
        @forge-keyboard-shortcut-activate=${() => {
          const input = document.getElementById('global-search') as HTMLInputElement;
          input?.focus();
        }}>
      </forge-keyboard-shortcut>
    </div>
  `
};

export const KeySequence: Story = {
  ...patternStoryParams,
  render: () => {
    const UNFOCUSED = 'Click inside the panel to enable the shortcuts.';
    const FOCUSED = 'Panel focused — press one of the sequences above.';
    const status = createStatus(UNFOCUSED);

    let pendingTimer: ReturnType<typeof setTimeout> | undefined;
    let activatingEvent: KeyboardEvent | undefined;
    let pending = false;

    const setStatus = (text: string): void => {
      clearTimeout(pendingTimer);
      pending = false;
      status.textContent = text;
    };

    const handleSequence = (name: string, binding: string) => (): void => {
      action(name)(binding);
      setStatus(`${name} — ${binding}`);
    };

    const recordActivation = (evt: CustomEvent<KeyboardEvent>): void => {
      activatingEvent = evt.detail;
    };

    // Runs after the scope has handled the key: prevented but not activated means a chord is being held open,
    // while an unhandled non-modifier key is what drops one
    const handleChordProgress = (evt: KeyboardEvent): void => {
      if (isModifierKeyEvent(evt)) {
        return;
      }

      // Storybook relays preview keydowns to its manager shortcuts from `window.onkeydown` without
      // checking `defaultPrevented`, so Ctrl+K would open its search and pull focus out of the panel
      if (evt.defaultPrevented) {
        evt.stopPropagation();
      }

      if (evt === activatingEvent) {
        return;
      }

      if (evt.defaultPrevented) {
        setStatus(`First chord registered — press the second chord within ${SEQUENCE_TIMEOUT / 1000}s.`);
        pending = true;
        pendingTimer = setTimeout(() => {
          pending = false;
          status.textContent = 'Sequence timed out — press the first chord again.';
        }, SEQUENCE_TIMEOUT);
        return;
      }

      if (pending) {
        setStatus('Sequence cancelled.');
      }
    };

    const handleFocusOut = (evt: FocusEvent): void => {
      if ((evt.currentTarget as HTMLElement).contains(evt.relatedTarget as Node | null)) {
        return;
      }
      setStatus(UNFOCUSED);
    };

    const handleComment = handleSequence('comment', 'Ctrl+K > Ctrl+C');
    const handleUncomment = handleSequence('uncomment', 'Ctrl+K > Ctrl+U');
    const handleToggle = handleSequence('toggle', 'Ctrl+/');

    return html`
      <div @keydown=${handleChordProgress}>
        <div
          forge-keyboard-shortcut-scope
          tabindex="-1"
          style="border: 1px solid var(--forge-theme-outline); padding: 16px;"
          @forge-keyboard-shortcut-activate=${recordActivation}
          @focusin=${() => setStatus(FOCUSED)}
          @focusout=${handleFocusOut}>
          <p>Multi-step keyboard sequences using the <code>&gt;</code> separator:</p>
          <ul>
            <li><kbd>Ctrl+K</kbd> then <kbd>Ctrl+C</kbd> — Comment selection</li>
            <li><kbd>Ctrl+K</kbd> then <kbd>Ctrl+U</kbd> — Uncomment selection</li>
            <li><kbd>Ctrl+/</kbd> — Toggle comment (single chord alternative)</li>
          </ul>
          <p>After pressing the first chord, you have 1 second to press the second chord.</p>
          <div style="display: flex; gap: 8px;">
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
          <p>${status}</p>
        </div>
      </div>
    `;
  }
};
