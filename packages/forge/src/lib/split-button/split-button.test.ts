import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { frame } from '../core/utils/utils.js';
import type { ISplitButtonComponent } from './split-button.js';
import { SPLIT_BUTTON_CONSTANTS } from './split-button-constants.js';

import './split-button.js';
import '../button/button.js';
import '../menu/menu.js';

describe('SplitButton', () => {
  it('should initialize', async () => {
    const screen = render(html`<forge-split-button></forge-split-button>`);
    const el = screen.container.querySelector('forge-split-button') as ISplitButtonComponent;
    expect(el.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const screen = render(html`<forge-split-button></forge-split-button>`);
    const el = screen.container.querySelector('forge-split-button') as ISplitButtonComponent;
    await expect(el).toBeAccessible();
  });

  it('should set default state on buttons', async () => {
    const screen = render(html`
      <forge-split-button>
        <forge-button>First</forge-button>
        <forge-button>Second</forge-button>
      </forge-split-button>
    `);
    const el = screen.container.querySelector('forge-split-button') as ISplitButtonComponent;
    await el.updateComplete;

    const buttons = el.querySelectorAll('forge-button');
    buttons.forEach(button => {
      expect(button.variant).toBe(SPLIT_BUTTON_CONSTANTS.defaults.DEFAULT_VARIANT);
      expect(button.theme).toBe(SPLIT_BUTTON_CONSTANTS.defaults.DEFAULT_THEME);
      expect(button.disabled).toBe(false);
      expect(button.dense).toBe(false);
      expect(button.pill).toBe(false);
    });
  });

  it('should initialize with new state on buttons', async () => {
    const screen = render(html`
      <forge-split-button variant="outlined" theme="error" dense disabled pill>
        <forge-button>First</forge-button>
        <forge-button>Second</forge-button>
      </forge-split-button>
    `);
    const el = screen.container.querySelector('forge-split-button') as ISplitButtonComponent;
    await el.updateComplete;

    expect(el.variant).toBe('outlined');
    expect(el.theme).toBe('error');
    expect(el.disabled).toBe(true);
    expect(el.dense).toBe(true);
    expect(el.pill).toBe(true);

    const buttons = el.querySelectorAll('forge-button');
    buttons.forEach(button => {
      expect(button.variant).toBe('outlined');
      expect(button.theme).toBe('error');
      expect(button.disabled).toBe(true);
      expect(button.dense).toBe(true);
      expect(button.pill).toBe(true);
    });
  });

  it('should update variant on buttons', async () => {
    const screen = render(html`
      <forge-split-button>
        <forge-button>First</forge-button>
        <forge-button>Second</forge-button>
      </forge-split-button>
    `);
    const el = screen.container.querySelector('forge-split-button') as ISplitButtonComponent;

    el.variant = 'raised';
    await el.updateComplete;

    expect(el.hasAttribute(SPLIT_BUTTON_CONSTANTS.attributes.VARIANT)).toBe(true);

    const buttons = el.querySelectorAll('forge-button');
    buttons.forEach(button => expect(button.variant).toBe('raised'));
  });

  it('should update theme on buttons', async () => {
    const screen = render(html`
      <forge-split-button>
        <forge-button>First</forge-button>
        <forge-button>Second</forge-button>
      </forge-split-button>
    `);
    const el = screen.container.querySelector('forge-split-button') as ISplitButtonComponent;

    el.theme = 'error';
    await el.updateComplete;

    expect(el.hasAttribute(SPLIT_BUTTON_CONSTANTS.attributes.THEME)).toBe(true);

    const buttons = el.querySelectorAll('forge-button');
    buttons.forEach(button => expect(button.theme).toBe('error'));
  });

  it('should update disabled on buttons', async () => {
    const screen = render(html`
      <forge-split-button>
        <forge-button>First</forge-button>
        <forge-button>Second</forge-button>
      </forge-split-button>
    `);
    const el = screen.container.querySelector('forge-split-button') as ISplitButtonComponent;

    el.disabled = true;
    await el.updateComplete;

    expect(el.hasAttribute(SPLIT_BUTTON_CONSTANTS.attributes.DISABLED)).toBe(true);

    const buttons = el.querySelectorAll('forge-button');
    buttons.forEach(button => expect(button.disabled).toBe(true));
  });

  it('should update dense on buttons', async () => {
    const screen = render(html`
      <forge-split-button>
        <forge-button>First</forge-button>
        <forge-button>Second</forge-button>
      </forge-split-button>
    `);
    const el = screen.container.querySelector('forge-split-button') as ISplitButtonComponent;

    el.dense = true;
    await el.updateComplete;

    const buttons = el.querySelectorAll('forge-button');
    buttons.forEach(button => expect(button.dense).toBe(true));
  });

  it('should update pill on buttons', async () => {
    const screen = render(html`
      <forge-split-button>
        <forge-button>First</forge-button>
        <forge-button>Second</forge-button>
      </forge-split-button>
    `);
    const el = screen.container.querySelector('forge-split-button') as ISplitButtonComponent;

    el.pill = true;
    await el.updateComplete;

    expect(el.hasAttribute(SPLIT_BUTTON_CONSTANTS.attributes.PILL)).toBe(true);

    const buttons = el.querySelectorAll('forge-button');
    buttons.forEach(button => expect(button.pill).toBe(true));
  });

  it('should update pill on only first and last buttons', async () => {
    const screen = render(html`
      <forge-split-button>
        <forge-button>First</forge-button>
        <forge-button>Middle</forge-button>
        <forge-button>Second</forge-button>
      </forge-split-button>
    `);
    const el = screen.container.querySelector('forge-split-button') as ISplitButtonComponent;

    el.pill = true;
    await el.updateComplete;

    const buttons = el.querySelectorAll('forge-button');
    expect(buttons[0].pill).toBe(true);
    expect(buttons[1].pill).toBe(false);
    expect(buttons[2].pill).toBe(true);
  });

  it('should set state on dynamically added buttons', async () => {
    const screen = render(html`
      <forge-split-button>
        <forge-button>First</forge-button>
      </forge-split-button>
    `);
    const el = screen.container.querySelector('forge-split-button') as ISplitButtonComponent;

    const button1 = document.createElement('forge-button');
    button1.textContent = 'Second';
    el.appendChild(button1);

    const button2 = document.createElement('forge-button');
    button2.textContent = 'Second';
    el.appendChild(button2);

    await frame();

    const buttons = el.querySelectorAll('forge-button');
    expect(buttons.length).toBe(3);
    buttons.forEach(button => {
      expect(button.variant).toBe(el.variant);
      expect(button.disabled).toBe(el.disabled);
      expect(button.dense).toBe(el.dense);
      expect(button.pill).toBe(el.pill);
    });
  });

  it('should update state on dynamically added nested buttons', async () => {
    const screen = render(html`
      <forge-split-button variant="outlined" dense disabled pill>
        <forge-button>First</forge-button>
      </forge-split-button>
    `);
    const el = screen.container.querySelector('forge-split-button') as ISplitButtonComponent;

    const menu = document.createElement('forge-menu');
    const button = document.createElement('forge-button');
    button.textContent = 'Second';
    menu.appendChild(button);
    el.appendChild(menu);

    await frame();

    expect(button.variant).toBe('outlined');
    expect(button.disabled).toBe(true);
    expect(button.dense).toBe(true);
    expect(button.pill).toBe(true);
  });

  it('should not set state on dynamic elements if they do not contain <forge-button> elements', async () => {
    const screen = render(html`
      <forge-split-button>
        <forge-button>First</forge-button>
      </forge-split-button>
    `);
    const el = screen.container.querySelector('forge-split-button') as ISplitButtonComponent;

    const button = document.createElement('button');
    button.textContent = 'Second';
    el.appendChild(button);

    await frame();

    expect('variant' in button).toBe(false);
    expect('pill' in button).toBe(false);
  });

  it('should not reflect default variant or theme', async () => {
    const screen = render(html`<forge-split-button variant="outlined" theme="error"></forge-split-button>`);
    const el = screen.container.querySelector('forge-split-button') as ISplitButtonComponent;

    el.variant = 'text';
    el.theme = 'primary';
    await el.updateComplete;

    expect(el.hasAttribute(SPLIT_BUTTON_CONSTANTS.attributes.VARIANT)).toBe(false);
    expect(el.hasAttribute(SPLIT_BUTTON_CONSTANTS.attributes.THEME)).toBe(false);
  });

  it('should fall back to defaults when variant and theme attributes are removed', async () => {
    const screen = render(html`<forge-split-button variant="outlined" theme="error"></forge-split-button>`);
    const el = screen.container.querySelector('forge-split-button') as ISplitButtonComponent;

    el.removeAttribute(SPLIT_BUTTON_CONSTANTS.attributes.VARIANT);
    el.removeAttribute(SPLIT_BUTTON_CONSTANTS.attributes.THEME);

    expect(el.variant).toBe(SPLIT_BUTTON_CONSTANTS.defaults.DEFAULT_VARIANT);
    expect(el.theme).toBe(SPLIT_BUTTON_CONSTANTS.defaults.DEFAULT_THEME);
  });

  it('should sync buttons and keep observing when reconnected', async () => {
    const screen = render(html`
      <forge-split-button variant="filled" dense>
        <forge-button>First</forge-button>
      </forge-split-button>
    `);
    const el = screen.container.querySelector('forge-split-button') as ISplitButtonComponent;
    await el.updateComplete;
    const parent = el.parentElement as HTMLElement;

    el.remove();
    const button = el.querySelector('forge-button') as HTMLElement & { variant: string; dense: boolean };
    button.variant = 'text';
    button.dense = false;
    parent.appendChild(el);
    await frame();

    expect(button.variant).toBe('filled');
    expect(button.dense).toBe(true);

    const added = document.createElement('forge-button');
    el.appendChild(added);
    await frame();

    expect(added.variant).toBe('filled');
    expect(added.dense).toBe(true);
  });
});
