import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';

import './split-button';
import { ISplitButtonComponent } from './split-button';
import { SPLIT_BUTTON_CONSTANTS } from './split-button-constants';

describe('SplitButton', () => {
  it('should initialize', async () => {
    const el = await fixture(html`<forge-split-button></forge-split-button>`);
    expect(el.shadowRoot).not.to.be.null;
  });

  it('should be accessible', async () => {
    const el = await fixture<ISplitButtonComponent>(html`<forge-split-button></forge-split-button>`);
    await expect(el).to.be.accessible();
  });

  it('should set default state on buttons', async () => {
    const el = await fixture<ISplitButtonComponent>(html`
      <forge-split-button>
        <forge-button>First</forge-button>
        <forge-button>Second</forge-button>
      </forge-split-button>
    `);

    const buttons = el.querySelectorAll('forge-button');
    buttons.forEach(button => {
      expect(button.variant).to.equal(SPLIT_BUTTON_CONSTANTS.defaults.DEFAULT_VARIANT);
      expect(button.theme).to.equal(SPLIT_BUTTON_CONSTANTS.defaults.DEFAULT_THEME);
      expect(button.disabled).to.be.false;
      expect(button.dense).to.be.false;
      expect(button.pill).to.be.false;
    });
  });

  it('should initialize with new state on buttons', async () => {
    const el = await fixture<ISplitButtonComponent>(html`
      <forge-split-button variant="outlined" theme="error" dense disabled pill>
        <forge-button>First</forge-button>
        <forge-button>Second</forge-button>
      </forge-split-button>
    `);

    expect(el.variant).to.equal('outlined');
    expect(el.theme).to.equal('error');
    expect(el.disabled).to.be.true;
    expect(el.dense).to.be.true;
    expect(el.pill).to.be.true;

    const buttons = el.querySelectorAll('forge-button');
    buttons.forEach(button => {
      expect(button.variant).to.equal('outlined');
      expect(button.theme).to.equal('error');
      expect(button.disabled).to.be.true;
      expect(button.dense).to.be.true;
      expect(button.pill).to.be.true;
    });
  });

  it('should update variant on buttons', async () => {
    const el = await fixture<ISplitButtonComponent>(html`
      <forge-split-button>
        <forge-button>First</forge-button>
        <forge-button>Second</forge-button>
      </forge-split-button>
    `);

    el.variant = 'raised';

    expect(el.hasAttribute(SPLIT_BUTTON_CONSTANTS.attributes.VARIANT)).to.be.true;

    const buttons = el.querySelectorAll('forge-button');
    buttons.forEach(button => expect(button.variant).to.equal('raised'));
  });

  it('should update theme on buttons', async () => {
    const el = await fixture<ISplitButtonComponent>(html`
      <forge-split-button>
        <forge-button>First</forge-button>
        <forge-button>Second</forge-button>
      </forge-split-button>
    `);

    el.theme = 'error';

    expect(el.hasAttribute(SPLIT_BUTTON_CONSTANTS.attributes.THEME)).to.be.true;

    const buttons = el.querySelectorAll('forge-button');
    buttons.forEach(button => expect(button.theme).to.equal('error'));
  });

  it('should update disabled on buttons', async () => {
    const el = await fixture<ISplitButtonComponent>(html`
      <forge-split-button>
        <forge-button>First</forge-button>
        <forge-button>Second</forge-button>
      </forge-split-button>
    `);

    el.disabled = true;

    expect(el.hasAttribute(SPLIT_BUTTON_CONSTANTS.attributes.DISABLED)).to.be.true;

    const buttons = el.querySelectorAll('forge-button');
    buttons.forEach(button => expect(button.disabled).to.be.true);
  });

  it('should update dense on buttons', async () => {
    const el = await fixture<ISplitButtonComponent>(html`
      <forge-split-button>
        <forge-button>First</forge-button>
        <forge-button>Second</forge-button>
      </forge-split-button>
    `);

    el.dense = true;

    const buttons = el.querySelectorAll('forge-button');
    buttons.forEach(button => expect(button.dense).to.be.true);
  });

  it('should update pill on buttons', async () => {
    const el = await fixture<ISplitButtonComponent>(html`
      <forge-split-button>
        <forge-button>First</forge-button>
        <forge-button>Second</forge-button>
      </forge-split-button>
    `);

    el.pill = true;

    expect(el.hasAttribute(SPLIT_BUTTON_CONSTANTS.attributes.PILL)).to.be.true;

    const buttons = el.querySelectorAll('forge-button');
    buttons.forEach(button => expect(button.pill).to.be.true);
  });

  it('should update pill on only first and last buttons', async () => {
    const el = await fixture<ISplitButtonComponent>(html`
      <forge-split-button>
        <forge-button>First</forge-button>
        <forge-button>Middle</forge-button>
        <forge-button>Second</forge-button>
      </forge-split-button>
    `);

    el.pill = true;

    const buttons = el.querySelectorAll('forge-button');
    expect(buttons[0].pill).to.be.true;
    expect(buttons[1].pill).to.be.false;
    expect(buttons[2].pill).to.be.true;
  });

  it('should set state on dynamically added buttons', async () => {
    const el = await fixture<ISplitButtonComponent>(html`
      <forge-split-button>
        <forge-button>First</forge-button>
      </forge-split-button>
    `);

    const button1 = document.createElement('forge-button');
    button1.textContent = 'Second';
    el.appendChild(button1);

    const button2 = document.createElement('forge-button');
    button2.textContent = 'Second';
    el.appendChild(button2);

    await elementUpdated(el);

    const buttons = el.querySelectorAll('forge-button');
    expect(buttons.length).to.equal(3);
    buttons.forEach(button => {
      expect(button.variant).to.equal(el.variant);
      expect(button.disabled).to.equal(el.disabled);
      expect(button.dense).to.equal(el.dense);
      expect(button.pill).to.equal(el.pill);
    });
  });

  it('should update state on dynamically added nested buttons', async () => {
    const el = await fixture<ISplitButtonComponent>(html`
      <forge-split-button variant="outlined" dense disabled pill>
        <forge-button>First</forge-button>
      </forge-split-button>
    `);

    const menu = document.createElement('forge-menu');
    const button = document.createElement('forge-button');
    button.textContent = 'Second';
    menu.appendChild(button);
    el.appendChild(menu);

    await elementUpdated(el);

    expect(button.variant).to.equal('outlined');
    expect(button.disabled).to.true;
    expect(button.dense).to.true;
    expect(button.pill).to.true;
  });

  it('should not set state on dynamic elements if they do not contain <forge-button> elements', async () => {
    const el = await fixture<ISplitButtonComponent>(html`
      <forge-split-button>
        <forge-button>First</forge-button>
      </forge-split-button>
    `);

    const button = document.createElement('button');
    button.textContent = 'Second';
    el.appendChild(button);

    await elementUpdated(el);

    expect('variant' in button).to.be.false;
    expect('pill' in button).to.be.false;
  });
});
