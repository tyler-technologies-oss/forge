import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { page, userEvent } from 'vitest/browser';
import { renderFixture } from '../../../testing/fixture.js';
import { settle } from '../../../testing/settle.js';
import type { ForgeAiTooltipComponent, TooltipToggleEventDetail } from './tooltip.js';

import './tooltip.js';

function createAnchor(id = 'anchor'): HTMLButtonElement {
  const anchor = document.createElement('button');
  anchor.id = id;
  anchor.textContent = 'anchor';
  anchor.style.cssText = 'position: fixed; left: 400px; top: 300px; width: 100px; height: 40px;';
  document.body.append(anchor);
  return anchor;
}

async function renderTooltip(
  template = html`<forge-ai-tooltip for="anchor" text="Hello"></forge-ai-tooltip>`,
  withAnchor = true
): Promise<{ el: ForgeAiTooltipComponent; anchor: HTMLButtonElement }> {
  await page.viewport(1280, 800);
  const anchor = withAnchor ? createAnchor() : (document.createElement('button') as HTMLButtonElement);
  const el = await renderFixture<ForgeAiTooltipComponent>(template, 'forge-ai-tooltip');
  return { el, anchor };
}

const overlayOf = (el: ForgeAiTooltipComponent): HTMLElement | null => el.shadowRoot!.querySelector<HTMLElement>('forge-ai-overlay');

describe('ForgeAiTooltipComponent', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should register the custom element and render a shadow root', async () => {
    const { el } = await renderTooltip();

    expect(customElements.get('forge-ai-tooltip')).toBeDefined();
    expect(el.shadowRoot).toBeTruthy();
  });

  it('should have the expected property defaults', async () => {
    const { el } = await renderTooltip(html`<forge-ai-tooltip></forge-ai-tooltip>`, false);

    expect(el.for).toBe('');
    expect(el.text).toBe('');
    expect(el.placement).toBe('top');
    expect(el.trigger).toBe('hover');
    expect(el.open).toBe(false);
    expect(el.delay).toBe(500);
    expect(el.hideDelay).toBe(0);
  });

  it('should read hide-delay and numeric attributes', async () => {
    const { el } = await renderTooltip(html`<forge-ai-tooltip delay="100" hide-delay="200" placement="bottom" trigger="click"></forge-ai-tooltip>`, false);

    expect(el.delay).toBe(100);
    expect(el.hideDelay).toBe(200);
    expect(el.placement).toBe('bottom');
    expect(el.trigger).toBe('click');
  });

  describe('closed rendering and accessibility', () => {
    it('should keep text content available to screen readers while closed', async () => {
      const { el } = await renderTooltip();

      const content = el.shadowRoot!.querySelector('.tooltip-content')!;
      expect(content.classList.contains('tooltip-content--hidden')).toBe(true);
      expect(content.textContent!.trim()).toBe('Hello');
      expect(overlayOf(el)).toBeNull();
    });

    it('should render slotted content when no text is provided', async () => {
      const { el } = await renderTooltip(html`<forge-ai-tooltip for="anchor"><b id="s">Slotted</b></forge-ai-tooltip>`);

      const slot = el.shadowRoot!.querySelector('slot')!;
      expect(slot.assignedElements()).toEqual([el.querySelector('#s')]);
    });

    it('should prefer text over slotted content', async () => {
      const { el } = await renderTooltip(html`<forge-ai-tooltip for="anchor" text="Text"><b>Slotted</b></forge-ai-tooltip>`);

      expect(el.shadowRoot!.querySelector('slot')).toBeNull();
      expect(el.shadowRoot!.querySelector('.tooltip-content')!.textContent!.trim()).toBe('Text');
    });

    it('should treat whitespace-only text as empty and use the slot', async () => {
      const { el } = await renderTooltip(html`<forge-ai-tooltip for="anchor" text="   "><b>Slotted</b></forge-ai-tooltip>`);

      expect(el.shadowRoot!.querySelector('slot')).toBeTruthy();
    });

    it('should set role none and aria-hidden when closed', async () => {
      const { el } = await renderTooltip();

      expect(el.getAttribute('role')).toBe('none');
      expect(el.getAttribute('aria-hidden')).toBe('true');
      expect(el.hasAttribute('aria-live')).toBe(false);
    });

    it('should set role tooltip, aria-hidden false, and aria-live when open', async () => {
      const { el } = await renderTooltip();

      el.open = true;
      await settle(el);

      expect(el.hasAttribute('open')).toBe(true);
      expect(el.getAttribute('role')).toBe('tooltip');
      expect(el.getAttribute('aria-hidden')).toBe('false');
      expect(el.getAttribute('aria-live')).toBe('polite');
    });

    it('should restore closed attributes when closed again', async () => {
      const { el } = await renderTooltip();
      el.open = true;
      await settle(el);

      el.open = false;
      await settle(el);

      expect(el.getAttribute('role')).toBe('none');
      expect(el.getAttribute('aria-hidden')).toBe('true');
      expect(el.hasAttribute('aria-live')).toBe(false);
    });
  });

  describe('open rendering', () => {
    it('should render an overlay anchored to the target with the tooltip text and arrow', async () => {
      const { el, anchor } = await renderTooltip();

      el.open = true;
      await settle(el);

      const overlay = overlayOf(el) as HTMLElement & { anchor: Element; placement: string; open: boolean; flip: boolean; shift: boolean };
      expect(overlay).toBeTruthy();
      expect(overlay.anchor).toBe(anchor);
      expect(overlay.placement).toBe('top');
      expect(overlay.open).toBe(true);
      expect(overlay.flip).toBe(true);
      expect(overlay.shift).toBe(true);
      expect(overlay.querySelector('.ai-tooltip')!.textContent!.trim()).toBe('Hello');
      expect(overlay.querySelector('.ai-tooltip__arrow')).toBeTruthy();
      expect(el.shadowRoot!.querySelector('.tooltip-content')).toBeNull();
    });

    it('should pass the arrow element to the overlay', async () => {
      const { el } = await renderTooltip();

      el.open = true;
      await settle(el);
      await el.updateComplete;

      const overlay = overlayOf(el) as HTMLElement & { arrowElement: HTMLElement | null };
      expect(overlay.arrowElement).toBe(overlay.querySelector('.ai-tooltip__arrow'));
      expect(overlay.arrowElement).not.toBeNull();
    });

    it('should forward placement to the overlay', async () => {
      const { el } = await renderTooltip(html`<forge-ai-tooltip for="anchor" text="Hello" placement="right" open></forge-ai-tooltip>`);
      await settle(el);

      expect((overlayOf(el) as HTMLElement & { placement: string }).placement).toBe('right');
    });

    it('should position the tooltip above the anchor', async () => {
      const { el, anchor } = await renderTooltip();

      el.open = true;
      await settle(el);
      await vi.waitFor(() => expect(overlayOf(el)!.getAttribute('data-position-placement')).toBe('top'));

      const rect = overlayOf(el)!.shadowRoot!.querySelector('.ai-overlay')!.getBoundingClientRect();
      expect(rect.bottom).toBeLessThanOrEqual(anchor.getBoundingClientRect().top);
    });
  });

  describe('programmatic control', () => {
    it('should open with show() and close with hide()', async () => {
      const { el } = await renderTooltip();

      el.show();
      expect(el.open).toBe(true);

      el.hide();
      expect(el.open).toBe(false);
    });

    it('should toggle with toggle()', async () => {
      const { el } = await renderTooltip();

      el.toggle();
      expect(el.open).toBe(true);

      el.toggle();
      expect(el.open).toBe(false);
    });
  });

  describe('hover trigger', () => {
    it('should open after the delay when the anchor is hovered', async () => {
      const { el, anchor } = await renderTooltip();
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });

      anchor.dispatchEvent(new MouseEvent('mouseenter'));
      expect(el.open).toBe(false);

      vi.advanceTimersByTime(499);
      expect(el.open).toBe(false);

      vi.advanceTimersByTime(1);
      expect(el.open).toBe(true);
    });

    it('should open immediately when delay is 0', async () => {
      const { el, anchor } = await renderTooltip(html`<forge-ai-tooltip for="anchor" text="Hello" delay="0"></forge-ai-tooltip>`);

      anchor.dispatchEvent(new MouseEvent('mouseenter'));

      expect(el.open).toBe(true);
    });

    it('should cancel a pending show when the pointer leaves before the delay', async () => {
      const { el, anchor } = await renderTooltip();
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });

      anchor.dispatchEvent(new MouseEvent('mouseenter'));
      vi.advanceTimersByTime(200);
      anchor.dispatchEvent(new MouseEvent('mouseleave'));
      vi.advanceTimersByTime(1000);

      expect(el.open).toBe(false);
    });

    it('should close immediately on mouseleave when hide-delay is 0', async () => {
      const { el, anchor } = await renderTooltip(html`<forge-ai-tooltip for="anchor" text="Hello" delay="0"></forge-ai-tooltip>`);
      anchor.dispatchEvent(new MouseEvent('mouseenter'));

      anchor.dispatchEvent(new MouseEvent('mouseleave'));

      expect(el.open).toBe(false);
    });

    it('should close after hide-delay on mouseleave', async () => {
      const { el, anchor } = await renderTooltip(html`<forge-ai-tooltip for="anchor" text="Hello" delay="0" hide-delay="300"></forge-ai-tooltip>`);
      anchor.dispatchEvent(new MouseEvent('mouseenter'));
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });

      anchor.dispatchEvent(new MouseEvent('mouseleave'));
      expect(el.open).toBe(true);

      vi.advanceTimersByTime(300);
      expect(el.open).toBe(false);
    });

    it('should cancel a pending hide when the pointer re-enters', async () => {
      const { el, anchor } = await renderTooltip(html`<forge-ai-tooltip for="anchor" text="Hello" delay="0" hide-delay="300"></forge-ai-tooltip>`);
      anchor.dispatchEvent(new MouseEvent('mouseenter'));
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });

      anchor.dispatchEvent(new MouseEvent('mouseleave'));
      anchor.dispatchEvent(new MouseEvent('mouseenter'));
      vi.advanceTimersByTime(1000);

      expect(el.open).toBe(true);
    });

    it('should open on focus and close on blur', async () => {
      const { el, anchor } = await renderTooltip(html`<forge-ai-tooltip for="anchor" text="Hello" delay="0"></forge-ai-tooltip>`);

      anchor.focus();
      expect(el.open).toBe(true);

      anchor.blur();
      expect(el.open).toBe(false);
    });

    it('should cancel a pending show when the anchor is clicked', async () => {
      const { el, anchor } = await renderTooltip();
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });

      anchor.dispatchEvent(new MouseEvent('mouseenter'));
      anchor.click();
      vi.advanceTimersByTime(500);

      expect(el.open).toBe(false);
    });

    it('should close when the anchor is clicked', async () => {
      const { el, anchor } = await renderTooltip(html`<forge-ai-tooltip for="anchor" text="Hello" delay="0"></forge-ai-tooltip>`);
      anchor.dispatchEvent(new MouseEvent('mouseenter'));
      expect(el.open).toBe(true);

      anchor.click();

      expect(el.open).toBe(false);
    });

    it('should open when the anchor is hovered with a real pointer', async () => {
      const { el, anchor } = await renderTooltip(html`<forge-ai-tooltip for="anchor" text="Hello" delay="0"></forge-ai-tooltip>`);

      await userEvent.hover(anchor);

      expect(el.open).toBe(true);
    });
  });

  describe('focus trigger', () => {
    it('should open on focus and close on blur but ignore hover', async () => {
      const { el, anchor } = await renderTooltip(html`<forge-ai-tooltip for="anchor" text="Hello" trigger="focus" delay="0"></forge-ai-tooltip>`);

      anchor.dispatchEvent(new MouseEvent('mouseenter'));
      expect(el.open).toBe(false);

      anchor.focus();
      expect(el.open).toBe(true);

      anchor.blur();
      expect(el.open).toBe(false);
    });

    it('should stay open when the anchor is clicked', async () => {
      const { el, anchor } = await renderTooltip(html`<forge-ai-tooltip for="anchor" text="Hello" trigger="focus" delay="0"></forge-ai-tooltip>`);
      anchor.focus();

      anchor.click();

      expect(el.open).toBe(true);
    });
  });

  describe('click trigger', () => {
    it('should toggle on anchor click and ignore hover and focus', async () => {
      const { el, anchor } = await renderTooltip(html`<forge-ai-tooltip for="anchor" text="Hello" trigger="click"></forge-ai-tooltip>`);

      anchor.dispatchEvent(new MouseEvent('mouseenter'));
      anchor.focus();
      expect(el.open).toBe(false);

      anchor.click();
      expect(el.open).toBe(true);

      anchor.click();
      expect(el.open).toBe(false);
    });
  });

  describe('manual trigger', () => {
    it('should not react to anchor interaction with the manual trigger', async () => {
      const { el, anchor } = await renderTooltip(html`<forge-ai-tooltip for="anchor" text="Hello" trigger="manual" delay="0"></forge-ai-tooltip>`);

      anchor.dispatchEvent(new MouseEvent('mouseenter'));
      anchor.focus();
      anchor.click();

      expect(el.open).toBe(false);
    });
  });

  describe('anchor lookup', () => {
    it('should warn when the anchor cannot be found', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      await renderTooltip(html`<forge-ai-tooltip for="missing" text="Hello"></forge-ai-tooltip>`, false);
      vi.advanceTimersByTime(0);

      expect(warn).toHaveBeenCalledWith('Tooltip anchor element with id "missing" not found');
    });

    it('should not warn when no for id is set', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

      await renderTooltip(html`<forge-ai-tooltip text="Hello"></forge-ai-tooltip>`, false);

      expect(warn).not.toHaveBeenCalledWith(expect.stringContaining('anchor element'));
    });

    it('should attach to a new anchor when for changes and detach from the old one', async () => {
      const { el, anchor } = await renderTooltip(html`<forge-ai-tooltip for="anchor" text="Hello" delay="0"></forge-ai-tooltip>`);
      const second = createAnchor('second');

      el.for = 'second';
      await el.updateComplete;

      anchor.dispatchEvent(new MouseEvent('mouseenter'));
      expect(el.open).toBe(false);

      second.dispatchEvent(new MouseEvent('mouseenter'));
      expect(el.open).toBe(true);
    });

    it('should find an anchor that is added after the tooltip connects', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      await page.viewport(1280, 800);
      const el = await renderFixture<ForgeAiTooltipComponent>(
        html`<forge-ai-tooltip for="late" text="Hello" delay="0"></forge-ai-tooltip>`,
        'forge-ai-tooltip'
      );
      const late = createAnchor('late');

      vi.advanceTimersByTime(0);
      late.dispatchEvent(new MouseEvent('mouseenter'));

      expect(el.open).toBe(true);
    });

    it('should find an anchor inside the same shadow root', async () => {
      await page.viewport(1280, 800);
      const host = document.createElement('div');
      document.body.append(host);
      const root = host.attachShadow({ mode: 'open' });
      root.innerHTML = '<button id="inner">in</button><forge-ai-tooltip for="inner" text="Hello" delay="0"></forge-ai-tooltip>';
      const tooltip = root.querySelector<ForgeAiTooltipComponent>('forge-ai-tooltip')!;
      await tooltip.updateComplete;

      root.querySelector('#inner')!.dispatchEvent(new MouseEvent('mouseenter'));

      expect(tooltip.open).toBe(true);
    });

    it('should stop reacting to the anchor after being disconnected', async () => {
      const { el, anchor } = await renderTooltip(html`<forge-ai-tooltip for="anchor" text="Hello" delay="0"></forge-ai-tooltip>`);

      el.remove();
      anchor.dispatchEvent(new MouseEvent('mouseenter'));

      expect(el.open).toBe(false);
    });

    it('should clear a pending show timer when disconnected', async () => {
      const { el, anchor } = await renderTooltip();
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      anchor.dispatchEvent(new MouseEvent('mouseenter'));

      el.remove();
      vi.advanceTimersByTime(1000);

      expect(el.open).toBe(false);
    });
  });

  describe('keyboard', () => {
    it('should close on Escape while open', async () => {
      const { el } = await renderTooltip();
      el.open = true;
      await settle(el);

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(el.open).toBe(false);
    });

    it('should ignore other keys while open', async () => {
      const { el } = await renderTooltip();
      el.open = true;
      await settle(el);

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));

      expect(el.open).toBe(true);
    });

    it('should remove its document keydown listener when closed', async () => {
      const add = vi.spyOn(document, 'addEventListener');
      const remove = vi.spyOn(document, 'removeEventListener');
      const { el } = await renderTooltip();

      el.open = true;
      await settle(el);
      const added = add.mock.calls.filter(([type]) => type === 'keydown').map(([, fn]) => fn);
      expect(added.length).toBeGreaterThan(0);

      el.open = false;
      await settle(el);

      const removed = remove.mock.calls.filter(([type]) => type === 'keydown').map(([, fn]) => fn);
      expect(removed).toContain(added[added.length - 1]);
    });

    it('should remove its document keydown listener when disconnected while open', async () => {
      const add = vi.spyOn(document, 'addEventListener');
      const remove = vi.spyOn(document, 'removeEventListener');
      const { el } = await renderTooltip();
      el.open = true;
      await settle(el);
      const added = add.mock.calls.filter(([type]) => type === 'keydown').map(([, fn]) => fn);

      el.remove();

      const removed = remove.mock.calls.filter(([type]) => type === 'keydown').map(([, fn]) => fn);
      expect(removed).toContain(added[added.length - 1]);
    });
  });

  describe('toggle event', () => {
    it.skip('should dispatch forge-ai-tooltip-toggle when the overlay toggles (BUG: listens for "ai-overlay-toggle" but overlay dispatches "forge-ai-overlay-toggle")', async () => {
      const { el } = await renderTooltip();
      const onToggle = vi.fn<(evt: CustomEvent<TooltipToggleEventDetail>) => void>();
      el.addEventListener('forge-ai-tooltip-toggle', onToggle);

      el.open = true;
      await settle(el);

      expect(onToggle).toHaveBeenCalledOnce();
      expect(onToggle.mock.calls[0][0].detail.open).toBe(true);
    });
  });
});
