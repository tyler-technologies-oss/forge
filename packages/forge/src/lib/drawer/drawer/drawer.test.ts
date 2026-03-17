import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { frame } from '../../core/utils/utils.js';
import type { IDrawerComponent } from './drawer.js';
import { BASE_DRAWER_CONSTANTS } from '../base/base-drawer-constants.js';

import './drawer.js';

describe('Drawer', () => {
  it('should contain shadow root', async () => {
    const { drawerEl } = await createFixture();

    expect(drawerEl.shadowRoot).toBeTruthy();
  });

  it('should be open by default', async () => {
    const { drawerEl } = await createFixture();

    expect(drawerEl.open).toBe(true);
  });

  it('should close drawer after defaulting to open', async () => {
    const { drawerEl } = await createFixture({ open: true });

    drawerEl.open = false;
    await frame();

    expect(drawerEl.open).toBe(false);
  });

  it('should open the drawer when closed', async () => {
    const harness = await createFixture({ open: false });

    harness.drawerEl.open = true;
    await frame();

    expect(harness.drawerEl.open).toBe(true);
  });

  it('should default to left direction', async () => {
    const harness = await createFixture({ direction: 'left' });

    expect(harness.drawerEl.direction).toBe('left');
    expect(harness.hasRootClass(BASE_DRAWER_CONSTANTS.classes.LEFT)).toBe(true);
    expect(harness.hasRootClass(BASE_DRAWER_CONSTANTS.classes.RIGHT)).toBe(false);
  });

  it('should render with right direction via property', async () => {
    const harness = await createFixture({ direction: 'right' });

    expect(harness.drawerEl.direction).toBe('right');
    expect(harness.hasRootClass(BASE_DRAWER_CONSTANTS.classes.LEFT)).toBe(false);
    expect(harness.hasRootClass(BASE_DRAWER_CONSTANTS.classes.RIGHT)).toBe(true);
  });

  it('should render with right direction via attribute', async () => {
    const harness = await createFixture();

    harness.drawerEl.setAttribute(BASE_DRAWER_CONSTANTS.attributes.DIRECTION, 'right');
    await frame();

    expect(harness.drawerEl.direction).toBe('right');
    expect(harness.hasRootClass(BASE_DRAWER_CONSTANTS.classes.LEFT)).toBe(false);
    expect(harness.hasRootClass(BASE_DRAWER_CONSTANTS.classes.RIGHT)).toBe(true);
  });

  it('should change direction after initial direction', async () => {
    const harness = await createFixture({ direction: 'left' });

    expect(harness.drawerEl.direction).toBe('left');

    harness.drawerEl.direction = 'right';
    await frame();

    expect(harness.drawerEl.direction).toBe('right');
    expect(harness.hasRootClass(BASE_DRAWER_CONSTANTS.classes.LEFT)).toBe(false);
    expect(harness.hasRootClass(BASE_DRAWER_CONSTANTS.classes.RIGHT)).toBe(true);
  });

  it('should emit after open event when open animation completes', async () => {
    const harness = await createFixture({ open: false });

    expect(harness.drawerEl.open).toBe(false);

    const spy = vi.fn();
    harness.drawerEl.addEventListener(BASE_DRAWER_CONSTANTS.events.AFTER_OPEN, spy);

    harness.drawerEl.open = true;
    await harness.transitionComplete;

    expect(harness.drawerEl.open).toBe(true);
    expect(spy).toHaveBeenCalledOnce();
  });

  it('should emit after close event when close animation completes', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.drawerEl.open).toBe(true);

    const spy = vi.fn();
    harness.drawerEl.addEventListener(BASE_DRAWER_CONSTANTS.events.AFTER_CLOSE, spy);

    harness.drawerEl.open = false;
    await harness.transitionComplete;

    expect(harness.drawerEl.open).toBe(false);
    expect(spy).toHaveBeenCalledOnce();
  });

  it('should set inert when closed', async () => {
    const harness = await createFixture({ open: false });

    expect(harness.isInert).toBe(true);
  });

  it('should not be inert when open', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.isInert).toBe(false);
  });

  it('should remove inert when opening', async () => {
    const harness = await createFixture({ open: false });

    expect(harness.isInert).toBe(true);

    harness.drawerEl.open = true;
    await frame();

    expect(harness.isInert).toBe(false);
  });

  it('should set inert when closing', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.isInert).toBe(false);

    harness.drawerEl.open = false;
    await frame();

    expect(harness.isInert).toBe(true);
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
  const screen = render(html`
    <forge-drawer .open=${open} direction=${direction ?? nothing}>
      <div style=${styleMap({ width: '256px', height: '5000px' })}></div>
    </forge-drawer>
  `);
  const el = screen.container.querySelector('forge-drawer') as IDrawerComponent;
  return new DrawerHarness(el);
}
