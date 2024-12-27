import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { IExpansionPanelComponent } from './expansion-panel';
import { EXPANSION_PANEL_CONSTANTS, emulateUserToggle } from './expansion-panel-constants';
import { task } from '../core/utils/utils';
import { IOpenIconComponent } from '../open-icon/open-icon';

import './expansion-panel';
import '../open-icon/open-icon';

describe('Expansion Panel', () => {
  it('should initialize', async () => {
    const el = await fixture<IExpansionPanelComponent>(html`<forge-expansion-panel></forge-expansion-panel>`);

    expect(el.shadowRoot).not.to.be.null;
  });

  it('should be accessible', async () => {
    const el = await fixture<IExpansionPanelComponent>(html`<forge-expansion-panel></forge-expansion-panel>`);

    await expect(el).to.be.accessible();
  });

  it('should be accessible with expected structure and ARIA attributes', async () => {
    const el = await fixture<IExpansionPanelComponent>(html`
      <forge-expansion-panel target-button="button-id">
        <button slot="header" id="button-id" aria-labelledby="label">
          <span id="label">Header</span>
        </button>
        <div>Content</div>
      </forge-expansion-panel>
    `);
    await expect(el).shadowDom.to.be.accessible();

    const button = el.querySelector('button') as HTMLElement;
    const content = el.querySelector('forge-expansion-panel>div') as HTMLElement;
    expect(button.getAttribute('aria-controls')).to.not.be.null;
    expect(button.getAttribute('aria-controls')).to.equal(content?.getAttribute('id'));
    expect(button.getAttribute('aria-expanded')).to.equal('false');
    el.open = true;
    expect(button.getAttribute('aria-expanded')).to.equal('true');
    await expect(el).shadowDom.to.be.accessible();
    el.open = false;
    expect(button.getAttribute('aria-expanded')).to.equal('false');
  });

  it('should not overwrite existing id of slotted content', async () => {
    const el = await fixture<IExpansionPanelComponent>(html`
      <forge-expansion-panel target-button="button-id">
        <button slot="header" id="button-id"></button>
        <div id="foo">Content</div>
      </forge-expansion-panel>
    `);
    const button = el.querySelector('button') as HTMLElement;
    const content = el.querySelector('#foo') as HTMLElement;
    expect(content.getAttribute('id')).to.equal('foo');
    expect(button.getAttribute('aria-controls')).to.equal(content.getAttribute('id'));
  });

  it('should have expected default values', async () => {
    const el = await fixture<IExpansionPanelComponent>(html`<forge-expansion-panel></forge-expansion-panel>`);

    expect(el.open).to.be.false;
    expect(el.orientation).to.equal('vertical');
    expect(el.animationType).to.equal('default');
  });

  it('should set open by default', async () => {
    const el = await fixture<IExpansionPanelComponent>(html`<forge-expansion-panel open></forge-expansion-panel>`);

    expect(el.open).to.be.true;
    expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).to.be.true;
  });

  it('should set open via attribute', async () => {
    const el = await fixture<IExpansionPanelComponent>(html`<forge-expansion-panel></forge-expansion-panel>`);
    const contentEl = getContentElement(el);

    expect(el.open).to.be.false;
    expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).to.be.false;
    expect(contentEl.classList.contains(EXPANSION_PANEL_CONSTANTS.classes.HIDDEN)).to.be.true;

    el.setAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN, '');

    expect(el.open).to.be.true;
    expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).to.be.true;
    expect(contentEl.classList.contains(EXPANSION_PANEL_CONSTANTS.classes.HIDDEN)).to.be.false;
  });

  it('should set open via property', async () => {
    const el = await fixture<IExpansionPanelComponent>(html`<forge-expansion-panel></forge-expansion-panel>`);
    const contentEl = getContentElement(el);

    expect(el.open).to.be.false;
    expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).to.be.false;
    expect(contentEl.classList.contains(EXPANSION_PANEL_CONSTANTS.classes.HIDDEN)).to.be.true;

    el.open = true;

    expect(el.open).to.be.true;
    expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).to.be.true;
    expect(contentEl.classList.contains(EXPANSION_PANEL_CONSTANTS.classes.HIDDEN)).to.be.false;
  });

  it('should set open attribute to true when toggle() is called', async () => {
    const el = await fixture<IExpansionPanelComponent>(html`<forge-expansion-panel></forge-expansion-panel>`);
    const contentEl = getContentElement(el);

    await elementUpdated(el);

    el.toggle();

    expect(el.open).to.be.true;
    expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).to.be.true;
    expect(contentEl.classList.contains(EXPANSION_PANEL_CONSTANTS.classes.HIDDEN)).to.be.false;
  });

  it('should set open attribute to false when toggle() is called', async () => {
    const el = await fixture<IExpansionPanelComponent>(html`<forge-expansion-panel open></forge-expansion-panel>`);
    const contentEl = getContentElement(el);

    await elementUpdated(el);

    el.toggle();

    expect(el.open).to.be.false;
    expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).to.be.false;
    expect(contentEl.classList.contains(EXPANSION_PANEL_CONSTANTS.classes.HIDDEN)).to.be.false;
  });

  it('should set opening state attribute while toggle animation is in progress', async () => {
    const el = await fixture<IExpansionPanelComponent>(html`<forge-expansion-panel><div>Test</div></forge-expansion-panel>`);

    await elementUpdated(el);
    el.toggle();
    await elementUpdated(el);

    expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPENING)).to.be.true;

    await task(500);

    expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPENING)).to.be.false;
  });

  it('should not set opening state attribute when animation type is set to none', async () => {
    const el = await fixture<IExpansionPanelComponent>(html`<forge-expansion-panel animation-type="none"><div>Test</div></forge-expansion-panel>`);

    await elementUpdated(el);
    el.toggle();
    await elementUpdated(el);

    expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPENING)).to.be.false;

    await task(500);

    expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPENING)).to.be.false;
  });

  it('should dispatch animation-complete event when toggle animation is complete', async () => {
    const el = await fixture<IExpansionPanelComponent>(html`<forge-expansion-panel><div>Test</div></forge-expansion-panel>`);

    await elementUpdated(el);

    const animationCompleteSpy = spy();
    el.addEventListener(EXPANSION_PANEL_CONSTANTS.events.ANIMATION_COMPLETE, animationCompleteSpy);

    el.toggle();

    await task(500);

    expect(animationCompleteSpy.calledOnce).to.be.true;
  });

  it('should not dispatch animation-complete event when animation type is set to none', async () => {
    const el = await fixture<IExpansionPanelComponent>(html`<forge-expansion-panel animation-type="none"><div>Test</div></forge-expansion-panel>`);

    await elementUpdated(el);

    const animationCompleteSpy = spy();
    el.addEventListener(EXPANSION_PANEL_CONSTANTS.events.ANIMATION_COMPLETE, animationCompleteSpy);

    el.toggle();

    await task(500);

    expect(animationCompleteSpy.called).to.be.false;
  });

  it('should set content visibility to hidden when toggled close', async () => {
    const el = await fixture<IExpansionPanelComponent>(html`<forge-expansion-panel open></forge-expansion-panel>`);
    const contentEl = getContentElement(el);

    await elementUpdated(el);

    el.toggle();

    await task(500);

    expect(contentEl.classList.contains(EXPANSION_PANEL_CONSTANTS.classes.HIDDEN)).to.be.true;
  });

  describe('orientation', () => {
    it('should set orientation via attribute', async () => {
      const el = await fixture<IExpansionPanelComponent>(html`<forge-expansion-panel orientation="horizontal"></forge-expansion-panel>`);

      expect(el.orientation).to.equal('horizontal');
    });

    it('should set orientation via property', async () => {
      const el = await fixture<IExpansionPanelComponent>(html`<forge-expansion-panel></forge-expansion-panel>`);

      expect(el.orientation).to.equal('vertical');

      el.orientation = 'horizontal';

      expect(el.orientation).to.equal('horizontal');
    });
  });

  describe('animation type', () => {
    it('should set animation type via attribute', async () => {
      const el = await fixture<IExpansionPanelComponent>(html`<forge-expansion-panel animation-type="none"></forge-expansion-panel>`);

      expect(el.animationType).to.equal('none');
    });

    it('should set animation type via property', async () => {
      const el = await fixture<IExpansionPanelComponent>(html`<forge-expansion-panel></forge-expansion-panel>`);

      expect(el.animationType).to.equal('default');

      el.animationType = 'none';

      expect(el.animationType).to.equal('none');
    });
  });

  describe('interactions', () => {
    it('should open when clicking header element', async () => {
      const el = await fixture<IExpansionPanelComponent>(html`
        <forge-expansion-panel>
          <button slot="header">Header</button>
          <div>Content</div>
        </forge-expansion-panel>
      `);
      const header = el.querySelector('button') as HTMLButtonElement;
      const contentEl = getContentElement(el);

      header.click();

      expect(el.open).to.be.true;
      expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).to.be.true;
      expect(contentEl.classList.contains(EXPANSION_PANEL_CONSTANTS.classes.HIDDEN)).to.be.false;
    });

    it('should close when clicking header element', async () => {
      const el = await fixture<IExpansionPanelComponent>(html`
        <forge-expansion-panel open>
          <button slot="header">Header</button>
          <div>Content</div>
        </forge-expansion-panel>
      `);
      const header = el.querySelector('button') as HTMLButtonElement;
      const contentEl = getContentElement(el);

      header.click();

      expect(el.open).to.be.false;
      expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).to.be.false;
      expect(contentEl.classList.contains(EXPANSION_PANEL_CONSTANTS.classes.HIDDEN)).to.be.false;
    });

    it('should dispatch toggle event when clicking header element', async () => {
      const el = await fixture<IExpansionPanelComponent>(html`
        <forge-expansion-panel>
          <button slot="header">Header</button>
          <div>Content</div>
        </forge-expansion-panel>
      `);
      const header = el.querySelector('button') as HTMLButtonElement;

      const toggleSpy = spy();
      el.addEventListener(EXPANSION_PANEL_CONSTANTS.events.TOGGLE, toggleSpy);

      header.click();

      expect(el.open).to.be.true;
      expect(toggleSpy.calledOnce).to.be.true;

      header.click();

      expect(el.open).to.be.false;
      expect(toggleSpy.calledTwice).to.be.true;
    });

    it('should not toggle when clicking header element if ignore attribute is set', async () => {
      const el = await fixture<IExpansionPanelComponent>(html`
        <forge-expansion-panel>
          <button slot="header" forge-ignore>Header</button>
          <div>Content</div>
        </forge-expansion-panel>
      `);
      const header = el.querySelector('button') as HTMLButtonElement;

      const toggleSpy = spy();
      el.addEventListener(EXPANSION_PANEL_CONSTANTS.events.TOGGLE, toggleSpy);

      header.click();

      expect(el.open).to.be.false;
      expect(toggleSpy.called).to.be.false;
    });

    it('should toggle when pressing enter key on header element', async () => {
      const el = await fixture<IExpansionPanelComponent>(html`
        <forge-expansion-panel>
          <button slot="header">Header</button>
          <div>Content</div>
        </forge-expansion-panel>
      `);
      const header = el.querySelector('button') as HTMLButtonElement;
      const contentEl = getContentElement(el);

      const toggleSpy = spy();
      el.addEventListener(EXPANSION_PANEL_CONSTANTS.events.TOGGLE, toggleSpy);

      header.focus();
      header.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

      expect(el.open).to.be.true;
      expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).to.be.true;
      expect(contentEl.classList.contains(EXPANSION_PANEL_CONSTANTS.classes.HIDDEN)).to.be.false;
      expect(toggleSpy.calledOnce).to.be.true;
    });

    it('should toggle when pressing space key on header element', async () => {
      const el = await fixture<IExpansionPanelComponent>(html`
        <forge-expansion-panel>
          <button slot="header">Header</button>
          <div>Content</div>
        </forge-expansion-panel>
      `);
      const header = el.querySelector('button') as HTMLButtonElement;
      const contentEl = getContentElement(el);

      const toggleSpy = spy();
      el.addEventListener(EXPANSION_PANEL_CONSTANTS.events.TOGGLE, toggleSpy);

      header.focus();
      header.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));

      expect(el.open).to.be.true;
      expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).to.be.true;
      expect(contentEl.classList.contains(EXPANSION_PANEL_CONSTANTS.classes.HIDDEN)).to.be.false;
      expect(toggleSpy.calledOnce).to.be.true;
    });

    it('should dispatch toggle event when calling internal emulateUserToggle symbol method', async () => {
      const el = await fixture<IExpansionPanelComponent>(html`<forge-expansion-panel></forge-expansion-panel>`);

      const toggleSpy = spy();
      el.addEventListener(EXPANSION_PANEL_CONSTANTS.events.TOGGLE, toggleSpy);

      el[emulateUserToggle](true);
      expect(toggleSpy.calledOnce).to.be.true;

      el[emulateUserToggle](false);
      expect(toggleSpy.calledTwice).to.be.true;
    });
  });

  describe('open icon', () => {
    it('should toggle open icon when toggled', async () => {
      const el = await fixture<IExpansionPanelComponent>(html`
        <forge-expansion-panel>
          <button slot="header">
            <span>Header</span>
            <forge-open-icon></forge-open-icon>
          </button>
          <div>Content</div>
        </forge-expansion-panel>
      `);

      await elementUpdated(el);

      const openIcon = el.querySelector('forge-open-icon') as IOpenIconComponent;

      expect(openIcon.open).to.be.false;

      el.toggle();

      expect(openIcon.open).to.be.true;
    });
  });

  describe('nested panels', () => {
    it('should not toggle parent panel when child panel is toggled', async () => {
      const el = await fixture<IExpansionPanelComponent>(html`
        <forge-expansion-panel open>
          <button slot="header">Header</button>
          <div>
            <forge-expansion-panel>
              <button slot="header">Header</button>
              <div>Content</div>
            </forge-expansion-panel>
          </div>
        </forge-expansion-panel>
      `);
      const contentEl = getContentElement(el);

      const childEl = el.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
      const childHeader = childEl.querySelector('button') as HTMLButtonElement;
      const childContentEl = getContentElement(childEl);

      expect(el.open).to.be.true;
      expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).to.be.true;
      expect(contentEl.classList.contains(EXPANSION_PANEL_CONSTANTS.classes.HIDDEN)).to.be.false;

      expect(childEl.open).to.be.false;
      expect(childEl.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).to.be.false;
      expect(childContentEl.classList.contains(EXPANSION_PANEL_CONSTANTS.classes.HIDDEN)).to.be.true;

      childHeader.click();

      await elementUpdated(childEl);

      expect(childEl.open).to.be.true;
      expect(childEl.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).to.be.true;
      expect(childContentEl.classList.contains(EXPANSION_PANEL_CONSTANTS.classes.HIDDEN)).to.be.false;

      expect(el.open).to.be.true;
      expect(el.hasAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPEN)).to.be.true;
      expect(contentEl.classList.contains(EXPANSION_PANEL_CONSTANTS.classes.HIDDEN)).to.be.false;
    });
  });

  describe('target button', () => {
    it('should be toggled by detached target button', async () => {
      const el = await fixture<IExpansionPanelComponent>(html`
        <div>
          <button id="button-id"></button>
          <forge-expansion-panel target-button="button-id">
            <div>Content</div>
          </forge-expansion-panel>
        </div>
      `);
      const targetButton = el.querySelector('#button-id') as HTMLElement;
      const expansionPanel = el.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
      targetButton.click();
      expect(expansionPanel.open).to.be.true;
      targetButton.click();
      expect(expansionPanel.open).to.be.false;
    });

    it('should manage ARIA attributes when using detached target button', async () => {
      const el = await fixture<IExpansionPanelComponent>(html`
        <div>
          <button id="button-id"></button>
          <forge-expansion-panel target-button="button-id">
            <div id="content">Content</div>
          </forge-expansion-panel>
        </div>
      `);
      const targetButton = el.querySelector('#button-id') as HTMLElement;
      const expansionPanel = el.querySelector('forge-expansion-panel') as IExpansionPanelComponent;
      const content = el.querySelector('#content') as HTMLElement;
      expect(targetButton.getAttribute('aria-controls')).to.not.be.null;
      expect(targetButton.getAttribute('aria-controls')).to.equal(content.getAttribute('id'));
      expect(targetButton.getAttribute('aria-expanded')).to.equal('false');
      expansionPanel.open = true;
      expect(targetButton.getAttribute('aria-expanded')).to.equal('true');
      expansionPanel.open = false;
      expect(targetButton.getAttribute('aria-expanded')).to.equal('false');
      expansionPanel.remove();
      expect(targetButton.getAttribute('aria-controls')).to.be.null;
      expect(targetButton.getAttribute('aria-expanded')).to.be.null;
    });

    it('should not error if no slotted content', async () => {
      await fixture<IExpansionPanelComponent>(html`
        <div>
          <button id="button-id"></button>
          <forge-expansion-panel target-button="button-id"></forge-expansion-panel>
        </div>
      `);
    });

    it('should not error if target button not found', async () => {
      await fixture<IExpansionPanelComponent>(html`<forge-expansion-panel target-button="button-id"></forge-expansion-panel>`);
    });
  });

  function getContentElement(el: IExpansionPanelComponent): HTMLElement {
    return el.shadowRoot?.querySelector(EXPANSION_PANEL_CONSTANTS.selectors.CONTENT) as HTMLElement;
  }
});
