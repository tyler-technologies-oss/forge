import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { BUTTON_AREA_CONSTANTS } from './button-area-constants';
import { IButtonAreaComponent } from './button-area';
import type { IStateLayerComponent } from '../state-layer';
import type { IFocusIndicatorComponent } from '../focus-indicator';

import './button-area';
import { ButtonAreaFoundation } from './button-area-foundation';
import { simulateHover } from '../core/testing/pointer';

const FULL_TEMPLATE = html`<forge-button-area>
<button slot="button" type="button">Go to detail</button>
<div class="content">
  <div>
    <span>Heading</span>
    <span>Content</span>
  </div>
  <forge-icon-button>
    <button type="button" aria-label="Favorite">
      <forge-icon name="favorite"></forge-icon>
    </button>
    <forge-tooltip>Favorite</forge-tooltip>
  </forge-icon-button>
  <forge-icon name="chevron_right"></forge-icon>
</div>
</forge-button-area>`;

const DATA_FORGE_IGNORE_TEMPLATE = html`<forge-button-area><button slot="button" data-forge-ignore type="button">Data forge ignore</button></forge-button-area>`;

describe('Button Area', () => {
  it('should initialize', async () => {
    const el = await fixture<IButtonAreaComponent>(html`<forge-button-area></forge-button-area>`);

    const rootEl = getRootEl(el);
    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);

    expect(el.shadowRoot).not.to.be.null;
    expect(rootEl.getAttribute('part')).to.equal('root');
    expect(rootEl.classList.contains(BUTTON_AREA_CONSTANTS.classes.ROOT)).to.be.true;
    expect(stateLayer.disabled).to.be.false;
    expect(focusIndicator).to.be.ok;
  });

  it('should defer attaching event listeners', async () => {
    const el = await fixture<IButtonAreaComponent>(FULL_TEMPLATE);
    const rootEl = getRootEl(el);
    const foundation = el['_foundation'] as ButtonAreaFoundation;
    await elementUpdated(rootEl);
    expect(foundation.isAttached).to.be.false;

    simulateHover(rootEl);
    await elementUpdated(rootEl);

    expect(foundation.isAttached).to.be.true;
  });

  it('should be accessible', async () => {
    const el = await fixture<IButtonAreaComponent>(FULL_TEMPLATE);

    await expect(el).to.be.accessible();
  });

  it('should handle click', async () => {
    const el = await fixture<IButtonAreaComponent>(FULL_TEMPLATE);
    const clickSpy = spy();
    el.addEventListener('click', clickSpy);

    el.click();

    expect(clickSpy.calledOnce).to.be.true;
  });

  it('should dispatch click event when button is clicked', async () => {
    const el = await fixture<IButtonAreaComponent>(FULL_TEMPLATE);
    const button = getButtonEl(el);
    const clickSpy = spy();
    el.addEventListener('click', clickSpy);

    button.click();

    expect(clickSpy.calledOnce).to.be.true;
  });

  it('should not dispatch click event when disabled', async () => {
    const el = await fixture<IButtonAreaComponent>(FULL_TEMPLATE);
    const button = getButtonEl(el);
    const clickSpy = spy();
    el.addEventListener('click', clickSpy);

    el.disabled = true;
    button.click();

    expect(clickSpy.called).to.be.false;
  });

  it('should not dispatch click event when ignored children are clicked', async () => {
    const el = await fixture<IButtonAreaComponent>(DATA_FORGE_IGNORE_TEMPLATE);
    const button = getButtonEl(el);
    const clickSpy = spy();
    el.addEventListener('click', clickSpy);

    button.click();

    expect(clickSpy.called).to.be.false;
  });

  function getRootEl(el: IButtonAreaComponent): HTMLElement {
    return el.shadowRoot?.firstElementChild as HTMLElement;
  }

  function getStateLayer(el: IButtonAreaComponent): IStateLayerComponent {
    return el.shadowRoot?.querySelector('forge-state-layer') as IStateLayerComponent
  }

  function getFocusIndicator(el: IButtonAreaComponent): IFocusIndicatorComponent {
    return el.shadowRoot?.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
  }

  function getButtonEl(el: IButtonAreaComponent): HTMLButtonElement {
    return el.querySelector('[slot=button]') as HTMLButtonElement;
  }
});
