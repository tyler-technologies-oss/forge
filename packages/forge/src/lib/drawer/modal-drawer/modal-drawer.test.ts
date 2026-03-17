import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { frame } from '../../core/utils/utils.js';
import type { IModalDrawerComponent } from './modal-drawer.js';
import { BASE_DRAWER_CONSTANTS } from '../base/base-drawer-constants.js';
import { BACKDROP_CONSTANTS, IBackdropComponent } from '../../backdrop/index.js';

import './modal-drawer.js';
import { MODAL_DRAWER_CONSTANTS } from './modal-drawer-constants.js';

describe('Modal Drawer', () => {
  it('should contain shadow root', async () => {
    const harness = await createFixture();

    expect(harness.modalDrawerEl.shadowRoot).toBeTruthy();
  });

  it('should show backdrop when defaulting to open', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.backdropElement).toBeTruthy();
  });

  it('should close when backdrop is clicked', async () => {
    const harness = await createFixture({ open: true });

    harness.backdropElement.dispatchEvent(new PointerEvent('click'));
    await frame();

    expect(harness.modalDrawerEl.open).toBe(false);
  });

  it('should emit close event when backdrop is clicked', async () => {
    const harness = await createFixture({ open: true });

    const callback = vi.fn();
    harness.modalDrawerEl.addEventListener(MODAL_DRAWER_CONSTANTS.events.CLOSE, callback);

    harness.backdropElement.dispatchEvent(new PointerEvent('click'));
    await frame();

    expect(harness.modalDrawerEl.open).toBe(false);
    expect(callback).toHaveBeenCalledOnce();
  });

  it('should not close backdrop when clicked if close event is cancelled', async () => {
    const harness = await createFixture({ open: true });

    const callback = vi.fn((e: Event) => e.preventDefault());
    harness.modalDrawerEl.addEventListener(MODAL_DRAWER_CONSTANTS.events.CLOSE, callback);

    harness.backdropElement.dispatchEvent(new PointerEvent('click'));
    await frame();

    expect(harness.modalDrawerEl.open).toBe(true);
    expect(callback).toHaveBeenCalledOnce();
  });

  it('should not show backdrop when open is set to false by default', async () => {
    const harness = await createFixture();

    expect(harness.backdropElement.hidden).toBe(true);
  });

  it('should transition to open when modal opens', async () => {
    const harness = await createFixture({ open: false });

    harness.modalDrawerEl.open = true;
    await frame();

    expect(harness.modalDrawerEl.open).toBe(true);
  });

  it('should emit after open event when open animation completes', async () => {
    const harness = await createFixture({ open: false });

    expect(harness.modalDrawerEl.open).toBe(false);

    const spy = vi.fn();
    harness.modalDrawerEl.addEventListener(BASE_DRAWER_CONSTANTS.events.AFTER_OPEN, spy);

    harness.modalDrawerEl.open = true;
    await harness.transitionComplete;

    expect(harness.modalDrawerEl.open).toBe(true);
    expect(spy).toHaveBeenCalledOnce();
  });

  it('should emit after close event when close animation completes', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.modalDrawerEl.open).toBe(true);

    const spy = vi.fn();
    harness.modalDrawerEl.addEventListener(BASE_DRAWER_CONSTANTS.events.AFTER_CLOSE, spy);

    harness.modalDrawerEl.open = false;
    await harness.transitionComplete;

    expect(harness.modalDrawerEl.open).toBe(false);
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

    harness.modalDrawerEl.open = true;
    await frame();

    expect(harness.isInert).toBe(false);
  });

  it('should set inert when closing', async () => {
    const harness = await createFixture({ open: true });

    expect(harness.isInert).toBe(false);

    harness.modalDrawerEl.open = false;
    await frame();

    expect(harness.isInert).toBe(true);
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
  const screen = render(html`
    <forge-modal-drawer .open=${open} direction=${direction ?? nothing}>
      <div style=${styleMap({ width: '256px', height: '5000px' })}></div>
    </forge-modal-drawer>
  `);
  const el = screen.container.querySelector('forge-modal-drawer') as IModalDrawerComponent;
  return new DrawerHarness(el);
}
