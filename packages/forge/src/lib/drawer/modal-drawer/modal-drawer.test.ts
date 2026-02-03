import { nothing } from 'lit';
import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { styleMap } from 'lit/directives/style-map.js';
import { IModalDrawerComponent } from './modal-drawer';
import { BASE_DRAWER_CONSTANTS } from '../base/base-drawer-constants';
import { BACKDROP_CONSTANTS, IBackdropComponent } from '../../backdrop';

import './modal-drawer';
import { MODAL_DRAWER_CONSTANTS } from './modal-drawer-constants';

describe('Modal Drawer', () => {
  it('should contain shadow root', async () => {
    const harness = await createFixture();

    expect(harness.modalDrawerEl.shadowRoot).to.exist;
  });

  it('should show backdrop when defaulting to open', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.backdropElement).to.exist;
  });

  it('should close when backdrop is clicked', async () => {
    const harness = await createFixture({ open: true });

    harness.backdropElement.dispatchEvent(new PointerEvent('click'));
    await elementUpdated(harness.modalDrawerEl);

    expect(harness.modalDrawerEl.open).to.be.false;
  });

  it('should emit close event when backdrop is clicked', async () => {
    const harness = await createFixture({ open: true });

    const callback = sinon.spy();
    harness.modalDrawerEl.addEventListener(MODAL_DRAWER_CONSTANTS.events.CLOSE, callback);

    harness.backdropElement.dispatchEvent(new PointerEvent('click'));
    await elementUpdated(harness.modalDrawerEl);

    expect(harness.modalDrawerEl.open).to.be.false;
    expect(callback).to.have.been.calledOnce;
  });

  it('should not close backdrop when clicked if close event is cancelled', async () => {
    const harness = await createFixture({ open: true });

    const callback = sinon.spy((e: Event) => e.preventDefault());
    harness.modalDrawerEl.addEventListener(MODAL_DRAWER_CONSTANTS.events.CLOSE, callback);

    harness.backdropElement.dispatchEvent(new PointerEvent('click'));
    await elementUpdated(harness.modalDrawerEl);

    expect(harness.modalDrawerEl.open).to.be.true;
    expect(callback).to.have.been.calledOnce;
  });

  it('should not show backdrop when open is set to false by default', async () => {
    const harness = await createFixture();

    expect(harness.backdropElement.hidden).to.be.true;
  });

  it('should transition to open when modal opens', async () => {
    const harness = await createFixture({ open: false });

    harness.modalDrawerEl.open = true;
    await elementUpdated(harness.modalDrawerEl);

    expect(harness.modalDrawerEl.open).to.be.true;
  });

  it('should emit after open event when open animation completes', async () => {
    const harness = await createFixture({ open: false });

    expect(harness.modalDrawerEl.open).to.be.false;

    const spy = sinon.spy();
    harness.modalDrawerEl.addEventListener(BASE_DRAWER_CONSTANTS.events.AFTER_OPEN, spy);

    harness.modalDrawerEl.open = true;
    await harness.transitionComplete;

    expect(harness.modalDrawerEl.open).to.be.true;
    expect(spy.calledOnce).to.be.true;
  });

  it('should emit after close event when close animation completes', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.modalDrawerEl.open).to.be.true;

    const spy = sinon.spy();
    harness.modalDrawerEl.addEventListener(BASE_DRAWER_CONSTANTS.events.AFTER_CLOSE, spy);

    harness.modalDrawerEl.open = false;
    await harness.transitionComplete;

    expect(harness.modalDrawerEl.open).to.be.false;
    expect(spy.calledOnce).to.be.true;
  });

  it('should set inert when closed', async () => {
    const harness = await createFixture({ open: false });

    expect(harness.isInert).to.be.true;
  });

  it('should not be inert when open', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.isInert).to.be.false;
  });

  it('should remove inert when opening', async () => {
    const harness = await createFixture({ open: false });

    expect(harness.isInert).to.be.true;

    harness.modalDrawerEl.open = true;
    await elementUpdated(harness.modalDrawerEl);

    expect(harness.isInert).to.be.false;
  });

  it('should set inert when closing', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.isInert).to.be.false;

    harness.modalDrawerEl.open = false;
    await elementUpdated(harness.modalDrawerEl);

    expect(harness.isInert).to.be.true;
  });
});

class DrawerHarness {
  constructor(public readonly modalDrawerEl: IModalDrawerComponent) {}

  private get _rootElement(): HTMLElement {
    return this.modalDrawerEl.shadowRoot?.querySelector(BASE_DRAWER_CONSTANTS.selectors.DRAWER) as HTMLElement;
  }

  public hasRootClass(className: string): boolean {
    return this.modalDrawerEl.shadowRoot?.querySelector(BASE_DRAWER_CONSTANTS.selectors.DRAWER)?.classList.contains(className) ?? false;
  }

  public get backdropElement(): IBackdropComponent {
    return this.modalDrawerEl.shadowRoot?.querySelector(BACKDROP_CONSTANTS.elementName) as IBackdropComponent;
  }

  public get transitionComplete(): Promise<void> {
    return new Promise(resolve => {
      this._rootElement.addEventListener('transitionend', () => resolve(), { once: true });
    });
  }

  public get isInert(): boolean {
    return this._rootElement.inert;
  }
}

interface DrawerFixtureConfig extends Partial<IModalDrawerComponent> {}

async function createFixture({ open = false, direction }: DrawerFixtureConfig = {}): Promise<DrawerHarness> {
  const el = await fixture<IModalDrawerComponent>(html`
    <forge-modal-drawer .open=${open} direction=${direction ?? nothing}>
      <div style=${styleMap({ width: '256px', height: '5000px' })}>
    </forge-modal-drawer>
  `);
  return new DrawerHarness(el);
}
