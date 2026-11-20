import { afterEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { page, userEvent } from 'vitest/browser';
import { renderFixture } from '../../../testing/fixture.js';
import { settle } from '../../../testing/settle.js';
import type { ForgeAiPopoverComponent, PopoverToggleEventData } from './popover.js';
import type { ForgeAiOverlayComponent } from '../overlay/overlay.js';

import './popover.js';

type PopoverToggle = CustomEvent<PopoverToggleEventData>;

const overlayOf = (el: ForgeAiPopoverComponent): ForgeAiOverlayComponent => el.shadowRoot!.querySelector<ForgeAiOverlayComponent>('forge-ai-overlay')!;

async function renderPopover(
  template = html`<forge-ai-popover dismiss-mode="manual"><p id="c">Content</p></forge-ai-popover>`
): Promise<ForgeAiPopoverComponent> {
  await page.viewport(1280, 800);
  return renderFixture<ForgeAiPopoverComponent>(template, 'forge-ai-popover');
}

describe('ForgeAiPopoverComponent', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should register the custom element and render an overlay', async () => {
    const el = await renderPopover();

    expect(customElements.get('forge-ai-popover')).toBeDefined();
    expect(overlayOf(el)).toBeTruthy();
  });

  it('should have the expected property defaults', async () => {
    const el = await renderPopover(html`<forge-ai-popover></forge-ai-popover>`);

    expect(el.anchor).toBeNull();
    expect(el.placement).toBe('bottom-start');
    expect(el.flip).toBe(false);
    expect(overlayOf(el).flip).toBe(false);
    expect(el.shift).toBe(false);
    expect(el.autoSize).toBe(false);
    expect(el.open).toBe(false);
    expect(el.arrow).toBe(false);
    expect(el.offset).toBeUndefined();
    expect(el.dismissMode).toBe('auto');
  });

  it('should project default slot content', async () => {
    const el = await renderPopover();

    expect(overlayOf(el).querySelector('slot')!.assignedElements()).toEqual([el.querySelector('#c')]);
  });

  it('should read attributes for auto-size, dismiss-mode, and open', async () => {
    const el = await renderPopover(html`<forge-ai-popover auto-size dismiss-mode="manual" open></forge-ai-popover>`);

    expect(el.autoSize).toBe(true);
    expect(el.dismissMode).toBe('manual');
    expect(el.open).toBe(true);
  });

  it('should forward configuration properties to the overlay', async () => {
    const anchor = document.createElement('button');
    document.body.append(anchor);
    const el = await renderPopover();

    el.anchor = anchor;
    el.placement = 'top-end';
    el.flip = true;
    el.shift = true;
    el.autoSize = true;
    el.offset = { mainAxis: 4 };
    el.dismissMode = 'auto';
    await el.updateComplete;

    const overlay = overlayOf(el);
    expect(overlay.anchor).toBe(anchor);
    expect(overlay.placement).toBe('top-end');
    expect(overlay.flip).toBe(true);
    expect(overlay.shift).toBe(true);
    expect(overlay.autoSize).toBe(true);
    expect(overlay.offset).toEqual({ mainAxis: 4 });
    expect(overlay.dismissMode).toBe('auto');
  });

  describe('open state', () => {
    it('should reflect open to the attribute', async () => {
      const el = await renderPopover();

      el.open = true;
      await el.updateComplete;

      expect(el.hasAttribute('open')).toBe(true);
    });

    it('should open the overlay when open is set', async () => {
      const el = await renderPopover();

      el.open = true;
      await settle(el);

      expect(overlayOf(el).open).toBe(true);
      expect(overlayOf(el).shadowRoot!.querySelector('.ai-overlay')!.matches(':popover-open')).toBe(true);
    });

    it('should dispatch forge-ai-popover-toggle with the toggle detail', async () => {
      const el = await renderPopover();
      const onToggle = vi.fn<(evt: PopoverToggle) => void>();
      el.addEventListener('forge-ai-popover-toggle', onToggle);

      el.open = true;
      await settle(el);

      expect(onToggle).toHaveBeenCalledOnce();
      expect(onToggle.mock.calls[0][0].detail).toEqual({ open: true, newState: 'open', oldState: 'closed' });
      expect(onToggle.mock.calls[0][0].bubbles).toBe(true);
      expect(onToggle.mock.calls[0][0].composed).toBe(true);
    });

    it('should sync open to false and dispatch toggle when dismissed with Escape in auto mode', async () => {
      const el = await renderPopover(html`<forge-ai-popover open><p>Content</p></forge-ai-popover>`);
      await settle(el);
      const onToggle = vi.fn<(evt: PopoverToggle) => void>();
      el.addEventListener('forge-ai-popover-toggle', onToggle);

      await userEvent.keyboard('{Escape}');
      await settle(el);

      expect(el.open).toBe(false);
      expect(el.hasAttribute('open')).toBe(false);
      expect(onToggle).toHaveBeenCalledOnce();
      expect(onToggle.mock.calls[0][0].detail.open).toBe(false);
    });

    it('should stay open on Escape in manual mode', async () => {
      const el = await renderPopover(html`<forge-ai-popover open dismiss-mode="manual"><p>Content</p></forge-ai-popover>`);
      await settle(el);

      await userEvent.keyboard('{Escape}');
      await settle(el);

      expect(el.open).toBe(true);
    });

    it('should not re-dispatch a toggle event that originated from a slotted descendant', async () => {
      const el = await renderPopover(html`<forge-ai-popover open dismiss-mode="manual"><p id="c">Content</p></forge-ai-popover>`);
      await settle(el);
      const onToggle = vi.fn();
      el.addEventListener('forge-ai-popover-toggle', onToggle);

      el.querySelector('#c')!.dispatchEvent(new CustomEvent('toggle', { bubbles: true, composed: true }));
      await settle(el);

      expect(onToggle).not.toHaveBeenCalled();
      expect(el.open).toBe(true);
    });
  });

  describe('arrow', () => {
    it('should not render an arrow by default', async () => {
      const el = await renderPopover();

      expect(el.shadowRoot!.querySelector('.ai-popover__arrow')).toBeNull();
    });

    it('should render an arrow when arrow is set', async () => {
      const el = await renderPopover(html`<forge-ai-popover arrow dismiss-mode="manual"></forge-ai-popover>`);

      expect(el.arrow).toBe(true);
      expect(el.shadowRoot!.querySelector('.ai-popover__arrow')).toBeTruthy();
    });

    it('should pass the arrow element to the overlay once re-rendered with the arrow present', async () => {
      const el = await renderPopover(html`<forge-ai-popover arrow dismiss-mode="manual"></forge-ai-popover>`);

      el.open = true;
      await settle(el);

      expect(overlayOf(el).arrowElement).toBe(el.shadowRoot!.querySelector('.ai-popover__arrow'));
      expect(overlayOf(el).arrowElement).not.toBeNull();
    });

    it('should remove the arrow when arrow is turned off', async () => {
      const el = await renderPopover(html`<forge-ai-popover arrow dismiss-mode="manual"></forge-ai-popover>`);

      el.arrow = false;
      await el.updateComplete;

      expect(el.shadowRoot!.querySelector('.ai-popover__arrow')).toBeNull();
    });
  });

  describe('nesting', () => {
    it('should stay open when a nested popover closes inside it', async () => {
      const el = await renderPopover(
        html`<forge-ai-popover open dismiss-mode="manual"
          ><forge-ai-popover id="inner" open dismiss-mode="manual"><p>Inner</p></forge-ai-popover></forge-ai-popover
        >`
      );
      const inner = el.querySelector<ForgeAiPopoverComponent>('#inner')!;
      await settle(el);
      await settle(inner);
      expect(inner.open).toBe(true);

      inner.open = false;
      await settle(inner);
      await settle(el);

      expect(inner.open).toBe(false);
      expect(el.open).toBe(true);
      expect(overlayOf(el).open).toBe(true);
    });
  });

  describe('positioning', () => {
    it('should place the popover below the anchor', async () => {
      await page.viewport(1280, 800);
      const anchor = document.createElement('button');
      anchor.style.cssText = 'position: fixed; left: 300px; top: 200px; width: 100px; height: 40px;';
      document.body.append(anchor);
      const el = await renderFixture<ForgeAiPopoverComponent>(
        html`<forge-ai-popover dismiss-mode="manual"><p>Content</p></forge-ai-popover>`,
        'forge-ai-popover'
      );
      el.anchor = anchor;
      el.open = true;
      await settle(el);

      await vi.waitFor(() => expect(overlayOf(el).getAttribute('data-position-placement')).toBe('bottom-start'));
      const panel = overlayOf(el).shadowRoot!.querySelector('.ai-overlay')!.getBoundingClientRect();
      expect(Math.round(panel.top)).toBe(Math.round(anchor.getBoundingClientRect().bottom));
      expect(Math.round(panel.left)).toBe(Math.round(anchor.getBoundingClientRect().left));
    });
  });
});
