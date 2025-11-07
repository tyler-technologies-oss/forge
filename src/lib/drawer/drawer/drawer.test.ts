import { nothing } from 'lit';
import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { IDrawerComponent } from './drawer';
import { styleMap } from 'lit/directives/style-map.js';
import { BASE_DRAWER_CONSTANTS } from '../base/base-drawer-constants';

import './drawer';

describe('Drawer', () => {
  it('should contain shadow root', async () => {
    const { drawerEl } = await createFixture();

    expect(drawerEl.shadowRoot).to.exist;
  });

  it('should be open by default', async () => {
    const { drawerEl } = await createFixture();

    expect(drawerEl.open).to.be.true;
  });

  it('should close drawer after defaulting to open', async () => {
    const { drawerEl } = await createFixture({ open: true });

    drawerEl.open = false;
    await elementUpdated(drawerEl);

    expect(drawerEl.open).to.be.false;
  });

  it('should open the drawer when closed', async () => {
    const harness = await createFixture({ open: false });

    harness.drawerEl.open = true;
    await elementUpdated(harness.drawerEl);

    expect(harness.drawerEl.open).to.be.true;
  });

  it('should default to left direction', async () => {
    const harness = await createFixture({ direction: 'left' });

    expect(harness.drawerEl.direction).to.equal('left');
    expect(harness.hasRootClass(BASE_DRAWER_CONSTANTS.classes.LEFT)).to.be.true;
    expect(harness.hasRootClass(BASE_DRAWER_CONSTANTS.classes.RIGHT)).to.be.false;
  });

  it('should render with right direction via property', async () => {
    const harness = await createFixture({ direction: 'right' });

    expect(harness.drawerEl.direction).to.equal('right');
    expect(harness.hasRootClass(BASE_DRAWER_CONSTANTS.classes.LEFT)).to.be.false;
    expect(harness.hasRootClass(BASE_DRAWER_CONSTANTS.classes.RIGHT)).to.be.true;
  });

  it('should render with right direction via attribute', async () => {
    const harness = await createFixture();

    harness.drawerEl.setAttribute(BASE_DRAWER_CONSTANTS.attributes.DIRECTION, 'right');
    await elementUpdated(harness.drawerEl);

    expect(harness.drawerEl.direction).to.equal('right');
    expect(harness.hasRootClass(BASE_DRAWER_CONSTANTS.classes.LEFT)).to.be.false;
    expect(harness.hasRootClass(BASE_DRAWER_CONSTANTS.classes.RIGHT)).to.be.true;
  });

  it('should change direction after initial direction', async () => {
    const harness = await createFixture({ direction: 'left' });

    expect(harness.drawerEl.direction).to.equal('left');

    harness.drawerEl.direction = 'right';
    await elementUpdated(harness.drawerEl);

    expect(harness.drawerEl.direction).to.equal('right');
    expect(harness.hasRootClass(BASE_DRAWER_CONSTANTS.classes.LEFT)).to.be.false;
    expect(harness.hasRootClass(BASE_DRAWER_CONSTANTS.classes.RIGHT)).to.be.true;
  });

  it('should emit after open event when open animation completes', async () => {
    const harness = await createFixture({ open: false });

    expect(harness.drawerEl.open).to.be.false;

    const spy = sinon.spy();
    harness.drawerEl.addEventListener(BASE_DRAWER_CONSTANTS.events.AFTER_OPEN, spy);

    harness.drawerEl.open = true;
    await harness.transitionComplete;

    expect(harness.drawerEl.open).to.be.true;
    expect(spy.calledOnce).to.be.true;
  });

  it('should emit after close event when close animation completes', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.drawerEl.open).to.be.true;

    const spy = sinon.spy();
    harness.drawerEl.addEventListener(BASE_DRAWER_CONSTANTS.events.AFTER_CLOSE, spy);

    harness.drawerEl.open = false;
    await harness.transitionComplete;

    expect(harness.drawerEl.open).to.be.false;
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

    harness.drawerEl.open = true;
    await elementUpdated(harness.drawerEl);

    expect(harness.isInert).to.be.false;
  });

  it('should set inert when closing', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.isInert).to.be.false;

    harness.drawerEl.open = false;
    await elementUpdated(harness.drawerEl);

    expect(harness.isInert).to.be.true;
  });
});

class DrawerHarness {
  constructor(public readonly drawerEl: IDrawerComponent) {}

  private get _rootElement(): HTMLElement {
    return this.drawerEl.shadowRoot?.querySelector(BASE_DRAWER_CONSTANTS.selectors.DRAWER) as HTMLElement;
  }

  public hasRootClass(className: string): boolean {
    return this._rootElement.classList.contains(className) ?? false;
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

interface DrawerFixtureConfig extends Partial<IDrawerComponent> {}

async function createFixture({ open = true, direction }: DrawerFixtureConfig = {}): Promise<DrawerHarness> {
  const el = await fixture<IDrawerComponent>(html`
    <forge-drawer .open=${open} direction=${direction ?? nothing}>
      <div style=${styleMap({ width: '256px', height: '5000px' })}>
    </forge-drawer>
  `);
  return new DrawerHarness(el);
}
