import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { getShadowElement } from '@tylertech/forge-core';
import { TestHarness } from '../core/testing/test-harness.js';
import type { IResponsiveToolbarComponent } from './responsive-toolbar.js';

import './responsive-toolbar.js';

describe('Responsive Toolbar', () => {
  it('should contain shadow root', async () => {
    const harness = await createFixture();

    expect(harness.element.shadowRoot).not.toBeNull();
  });

  it('should have expected default state', async () => {
    const harness = await createFixture();

    expect(harness.element.noBorder).toBe(false);
    expect(harness.element.inverted).toBe(false);
    expect(harness.element.resizeDelay).toBe(100);
  });

  it('should set large state', async () => {
    const harness = await createFixture({ width: '1440px' });

    await new Promise(resolve => setTimeout(resolve, 200));

    expect(harness.element.matches(':state(large)')).toBe(true);
  });

  it('should set small state', async () => {
    const harness = await createFixture({ width: '300px' });

    await new Promise(resolve => setTimeout(resolve, 200));

    expect(harness.element.matches(':state(small)')).toBe(true);
  });

  it('content should project into the before-start slot', async () => {
    const harness = await createFixture();

    expect(harness.beforeStartSlot.assignedNodes().length).toBeGreaterThanOrEqual(1);
  });

  it('should update the inverted property when the attribute is set', async () => {
    const harness = await createFixture();
    harness.element.setAttribute('inverted', '');

    expect(harness.element.inverted).toBe(true);
  });

  it('should update the noBorder property when the attribute is set', async () => {
    const harness = await createFixture();
    harness.element.setAttribute('no-border', '');

    expect(harness.element.noBorder).toBe(true);
  });

  it('should update the resizeDelay property when the attribute is set', async () => {
    const harness = await createFixture();
    harness.element.setAttribute('resize-delay', '200');

    expect(harness.element.resizeDelay).toBe(200);
  });

  it('should dispatch update event on resize to small', async () => {
    const harness = await createFixture();
    const spy = vi.fn();

    harness.element.addEventListener('forge-responsive-toolbar-update', spy);
    harness.element.style.width = '300px';

    await new Promise(resolve => setTimeout(resolve, 200));

    expect(spy).toHaveBeenCalled();
  });

  it('should dispatch update event on resize to large', async () => {
    const harness = await createFixture({ width: '300px' });
    const spy = vi.fn();

    harness.element.addEventListener('forge-responsive-toolbar-update', spy);
    harness.element.style.width = '1440px';

    await new Promise(resolve => setTimeout(resolve, 200));

    expect(spy).toHaveBeenCalled();
  });

  it('should not dispatch update event on resize if the state does not change', async () => {
    const harness = await createFixture();
    const spy = vi.fn();

    harness.element.addEventListener('forge-responsive-toolbar-update', spy);
    harness.element.style.width = '1340px';

    await new Promise(resolve => setTimeout(resolve, 200));

    expect(spy).not.toHaveBeenCalled();
  });

  it('should dispatch update event after resize delay', async () => {
    const harness = await createFixture();

    const spy = vi.fn();
    harness.element.addEventListener('forge-responsive-toolbar-update', spy);
    harness.element.style.width = '300px';

    expect(spy).not.toHaveBeenCalled();

    await new Promise(resolve => setTimeout(resolve, 200));
    expect(spy).toHaveBeenCalledOnce();
  });

  it('should dispatch update event after changing resize delay', async () => {
    const harness = await createFixture();

    const spy = vi.fn();
    harness.element.addEventListener('forge-responsive-toolbar-update', spy);
    harness.element.setAttribute('resize-delay', '200');
    harness.element.style.width = '300px';

    expect(spy).not.toHaveBeenCalled();

    await new Promise(resolve => setTimeout(resolve, 300));
    expect(spy).toHaveBeenCalledOnce();
  });
});

class ResponsiveToolbarHarness extends TestHarness<IResponsiveToolbarComponent> {
  public initElementRefs(): void {
    // Elements are queried lazily via getters below since they change based on component state.
  }

  public get beforeStartSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="before-start"]') as HTMLSlotElement;
  }
}

interface ResponsiveToolbarFixtureConfig {
  noBorder?: boolean;
  inverted?: boolean;
  width?: string;
}

async function createFixture({ noBorder = false, inverted = false, width = '1440px' }: ResponsiveToolbarFixtureConfig = {}): Promise<ResponsiveToolbarHarness> {
  const screen = render(html`
    <forge-responsive-toolbar ?no-border=${noBorder} ?inverted=${inverted} style="width: ${width}">
      <forge-icon-button aria-label="Icon button demo" slot="before-start">
        <forge-icon name="arrow_back" external></forge-icon>
      </forge-icon-button>
      <div slot="start" class="forge-typography--heading4">Community Services Directory</div>
      <div slot="end-large">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
      <div slot="end-small">Mobile actions</div>
      <div slot="after-end">After end</div>
    </forge-responsive-toolbar>
  `);
  const el = screen.container.querySelector('forge-responsive-toolbar') as IResponsiveToolbarComponent;
  await el.updateComplete;

  // Let the initial ResizeObserver notification (guaranteed on first observe) settle before
  // tests start asserting on subsequent, explicit resizes.
  await new Promise(resolve => setTimeout(resolve, 150));

  return new ResponsiveToolbarHarness(el);
}
