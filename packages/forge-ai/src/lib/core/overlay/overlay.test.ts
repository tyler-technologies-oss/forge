import { afterEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { page, userEvent } from 'vitest/browser';
import { renderFixture } from '../../../testing/fixture.js';
import { settle } from '../../../testing/settle.js';
import type { ForgeAiOverlayComponent } from './overlay.js';
import type { AiReasoningHeaderComponent } from '../../ai-reasoning-header/index.js';

import './overlay.js';
import '../../ai-reasoning-header/ai-reasoning-header.js';

describe('ForgeAiOverlayComponent', () => {
  it('should stay open when a slotted descendant dispatches a bubbling toggle event', async () => {
    const el = await renderFixture<ForgeAiOverlayComponent>(
      html`<forge-ai-overlay open dismiss-mode="manual"
        ><forge-ai-reasoning-header><span slot="title">Title</span></forge-ai-reasoning-header></forge-ai-overlay
      >`,
      'forge-ai-overlay'
    );
    await settle(el);
    expect(el.open).toBe(true);

    const header = el.querySelector<AiReasoningHeaderComponent>('forge-ai-reasoning-header')!;
    header.shadowRoot!.querySelector<HTMLButtonElement>('button')!.click();
    await settle(el);

    expect(header.expanded).toBe(true);
    expect(el.open).toBe(true);
  });

  it('should stay open when a slotted descendant dispatches a plain toggle CustomEvent', async () => {
    const el = await renderFixture<ForgeAiOverlayComponent>(
      html`<forge-ai-overlay open dismiss-mode="manual"><div id="child"></div></forge-ai-overlay>`,
      'forge-ai-overlay'
    );
    await settle(el);

    el.querySelector('#child')!.dispatchEvent(new CustomEvent('toggle', { bubbles: true, composed: true }));
    await settle(el);

    expect(el.open).toBe(true);
  });

  describe('public API', () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    type OverlayToggle = CustomEvent<{ open: boolean; newState: string; oldState: string }>;

    const popoverOf = (el: ForgeAiOverlayComponent): HTMLElement => el.shadowRoot!.querySelector<HTMLElement>('.ai-overlay')!;

    async function renderWithAnchor(extra: Partial<ForgeAiOverlayComponent> = {}): Promise<{ el: ForgeAiOverlayComponent; anchor: HTMLElement }> {
      await page.viewport(1280, 800);
      const anchor = document.createElement('button');
      anchor.textContent = 'anchor';
      anchor.style.cssText = 'position: fixed; left: 400px; top: 300px; width: 100px; height: 40px;';
      document.body.append(anchor);
      const el = await renderFixture<ForgeAiOverlayComponent>(
        html`<forge-ai-overlay dismiss-mode="manual"><div id="content" style="width: 120px; height: 60px">Content</div></forge-ai-overlay>`,
        'forge-ai-overlay'
      );
      Object.assign(el, extra);
      el.anchor = anchor;
      await el.updateComplete;
      return { el, anchor };
    }

    async function until(predicate: () => boolean): Promise<void> {
      await vi.waitFor(() => expect(predicate()).toBe(true));
    }

    it('should register the custom element and render a popover container with a default slot', async () => {
      const el = await renderFixture<ForgeAiOverlayComponent>(html`<forge-ai-overlay><p id="c">hi</p></forge-ai-overlay>`, 'forge-ai-overlay');

      expect(customElements.get('forge-ai-overlay')).toBeDefined();
      expect(popoverOf(el).querySelector('slot')!.assignedElements()).toEqual([el.querySelector('#c')]);
    });

    it('should have the expected property defaults', async () => {
      const el = await renderFixture<ForgeAiOverlayComponent>(html`<forge-ai-overlay></forge-ai-overlay>`, 'forge-ai-overlay');

      expect(el.anchor).toBeNull();
      expect(el.placement).toBe('bottom-start');
      expect(el.flip).toBe(true);
      expect(el.shift).toBe(false);
      expect(el.autoSize).toBe(false);
      expect(el.open).toBe(false);
      expect(el.arrowElement).toBeNull();
      expect(el.offset).toBeUndefined();
      expect(el.dismissMode).toBe('auto');
    });

    it('should map dismiss-mode to the popover attribute', async () => {
      const auto = await renderFixture<ForgeAiOverlayComponent>(html`<forge-ai-overlay></forge-ai-overlay>`, 'forge-ai-overlay');
      expect(popoverOf(auto).getAttribute('popover')).toBe('auto');

      const manual = await renderFixture<ForgeAiOverlayComponent>(html`<forge-ai-overlay dismiss-mode="manual"></forge-ai-overlay>`, 'forge-ai-overlay');
      expect(manual.dismissMode).toBe('manual');
      expect(popoverOf(manual).getAttribute('popover')).toBe('manual');
    });

    it('should read auto-size from the kebab-case attribute', async () => {
      const el = await renderFixture<ForgeAiOverlayComponent>(html`<forge-ai-overlay auto-size></forge-ai-overlay>`, 'forge-ai-overlay');

      expect(el.autoSize).toBe(true);
    });

    it('should show and hide the popover when open changes and reflect open to the attribute', async () => {
      const { el } = await renderWithAnchor();

      el.open = true;
      await settle(el);
      expect(el.hasAttribute('open')).toBe(true);
      expect(popoverOf(el).matches(':popover-open')).toBe(true);

      el.open = false;
      await settle(el);
      expect(el.hasAttribute('open')).toBe(false);
      expect(popoverOf(el).matches(':popover-open')).toBe(false);
    });

    it('should open on first render when the open attribute is present', async () => {
      await page.viewport(1280, 800);
      const el = await renderFixture<ForgeAiOverlayComponent>(html`<forge-ai-overlay open dismiss-mode="manual"></forge-ai-overlay>`, 'forge-ai-overlay');
      await settle(el);

      expect(popoverOf(el).matches(':popover-open')).toBe(true);
    });

    it('should dispatch forge-ai-overlay-toggle with the new and old state', async () => {
      const { el } = await renderWithAnchor();
      const onToggle = vi.fn<(evt: OverlayToggle) => void>();
      el.addEventListener('forge-ai-overlay-toggle', onToggle);

      el.open = true;
      await settle(el);

      expect(onToggle).toHaveBeenCalledOnce();
      expect(onToggle.mock.calls[0][0].detail).toEqual({ open: true, newState: 'open', oldState: 'closed' });
      expect(onToggle.mock.calls[0][0].bubbles).toBe(true);
      expect(onToggle.mock.calls[0][0].composed).toBe(true);

      el.open = false;
      await settle(el);

      expect(onToggle).toHaveBeenCalledTimes(2);
      expect(onToggle.mock.calls[1][0].detail).toEqual({ open: false, newState: 'closed', oldState: 'open' });
    });

    it('should close on Escape and sync open when dismiss-mode is auto', async () => {
      await page.viewport(1280, 800);
      const el = await renderFixture<ForgeAiOverlayComponent>(html`<forge-ai-overlay open></forge-ai-overlay>`, 'forge-ai-overlay');
      await settle(el);
      const onToggle = vi.fn<(evt: OverlayToggle) => void>();
      el.addEventListener('forge-ai-overlay-toggle', onToggle);

      await userEvent.keyboard('{Escape}');
      await settle(el);

      expect(el.open).toBe(false);
      expect(onToggle).toHaveBeenCalledOnce();
      expect(onToggle.mock.calls[0][0].detail.open).toBe(false);
    });

    it('should stay open on Escape when dismiss-mode is manual', async () => {
      await page.viewport(1280, 800);
      const el = await renderFixture<ForgeAiOverlayComponent>(html`<forge-ai-overlay open dismiss-mode="manual"></forge-ai-overlay>`, 'forge-ai-overlay');
      await settle(el);

      await userEvent.keyboard('{Escape}');
      await settle(el);

      expect(el.open).toBe(true);
    });

    describe('positioning', () => {
      it('should position the popover relative to the anchor and expose the actual placement', async () => {
        const { el, anchor } = await renderWithAnchor({ placement: 'bottom-start', flip: false });

        el.open = true;
        await settle(el);
        await until(() => el.hasAttribute('data-position-placement'));

        const anchorRect = anchor.getBoundingClientRect();
        const overlayRect = popoverOf(el).getBoundingClientRect();
        expect(el.getAttribute('data-position-placement')).toBe('bottom-start');
        expect(Math.round(overlayRect.left)).toBe(Math.round(anchorRect.left));
        expect(Math.round(overlayRect.top)).toBe(Math.round(anchorRect.bottom));
      });

      it('should apply a numeric offset along the main axis', async () => {
        const { el, anchor } = await renderWithAnchor({ placement: 'bottom-start', flip: false, offset: 20 });

        el.open = true;
        await settle(el);
        await until(() => el.hasAttribute('data-position-placement'));

        expect(Math.round(popoverOf(el).getBoundingClientRect().top)).toBe(Math.round(anchor.getBoundingClientRect().bottom + 20));
      });

      it('should apply an object offset with cross axis', async () => {
        const { el, anchor } = await renderWithAnchor({ placement: 'bottom-start', flip: false, offset: { mainAxis: 5, crossAxis: 10 } });

        el.open = true;
        await settle(el);
        await until(() => el.hasAttribute('data-position-placement'));

        const rect = popoverOf(el).getBoundingClientRect();
        expect(Math.round(rect.top)).toBe(Math.round(anchor.getBoundingClientRect().bottom + 5));
        expect(Math.round(rect.left)).toBe(Math.round(anchor.getBoundingClientRect().left + 10));
      });

      it('should reposition when placement changes while open', async () => {
        const { el, anchor } = await renderWithAnchor({ placement: 'bottom-start', flip: false });
        el.open = true;
        await settle(el);
        await until(() => el.getAttribute('data-position-placement') === 'bottom-start');

        el.placement = 'top-start';
        await settle(el);
        await until(() => el.getAttribute('data-position-placement') === 'top-start');

        expect(Math.round(popoverOf(el).getBoundingClientRect().bottom)).toBe(Math.round(anchor.getBoundingClientRect().top));
      });

      it('should flip to the opposite side when there is no room and flip is enabled', async () => {
        const { el, anchor } = await renderWithAnchor({ placement: 'bottom-start', flip: true });
        anchor.style.top = '760px';

        el.open = true;
        await settle(el);
        await until(() => el.getAttribute('data-position-placement')?.startsWith('top') ?? false);

        expect(el.getAttribute('data-position-placement')).toBe('top-start');
      });

      it('should not flip when flip is disabled', async () => {
        const { el, anchor } = await renderWithAnchor({ placement: 'bottom-start', flip: false });
        anchor.style.top = '760px';

        el.open = true;
        await settle(el);
        await until(() => el.hasAttribute('data-position-placement'));

        expect(el.getAttribute('data-position-placement')).toBe('bottom-start');
      });

      it('should shift the popover to stay inside the viewport when shift is enabled', async () => {
        const { el, anchor } = await renderWithAnchor({ placement: 'bottom-start', flip: false, shift: true });
        anchor.style.left = '1250px';

        el.open = true;
        await settle(el);
        await until(() => el.hasAttribute('data-position-placement'));

        expect(popoverOf(el).getBoundingClientRect().right).toBeLessThanOrEqual(1280);
      });

      it('should expose available width and height custom properties when autoSize is enabled', async () => {
        const { el } = await renderWithAnchor({ autoSize: true });

        el.open = true;
        await settle(el);
        await until(() => popoverOf(el).style.getPropertyValue('--ai-overlay-available-width') !== '');

        expect(popoverOf(el).style.getPropertyValue('--ai-overlay-available-width')).toMatch(/^\d+(\.\d+)?px$/);
        expect(popoverOf(el).style.getPropertyValue('--ai-overlay-available-height')).toMatch(/^\d+(\.\d+)?px$/);
      });

      it('should not set available size custom properties when autoSize is disabled', async () => {
        const { el } = await renderWithAnchor();

        el.open = true;
        await settle(el);
        await until(() => el.hasAttribute('data-position-placement'));

        expect(popoverOf(el).style.getPropertyValue('--ai-overlay-available-width')).toBe('');
      });

      it('should position an arrow element when provided', async () => {
        const arrow = document.createElement('div');
        arrow.style.cssText = 'position: absolute; width: 10px; height: 10px;';
        const { el } = await renderWithAnchor({ arrowElement: arrow, placement: 'bottom', flip: false });
        popoverOf(el).append(arrow);

        el.open = true;
        await settle(el);
        await until(() => arrow.style.left !== '');

        expect(arrow.style.left).toMatch(/px$/);
      });

      it('should remove the placement attribute when closed', async () => {
        const { el } = await renderWithAnchor();
        el.open = true;
        await settle(el);
        await until(() => el.hasAttribute('data-position-placement'));

        el.open = false;
        await settle(el);

        expect(el.hasAttribute('data-position-placement')).toBe(false);
      });

      it('should remove the placement attribute when disconnected', async () => {
        const { el } = await renderWithAnchor();
        el.open = true;
        await settle(el);
        await until(() => el.hasAttribute('data-position-placement'));

        el.remove();

        expect(el.hasAttribute('data-position-placement')).toBe(false);
      });

      it('should not position anything when open without an anchor', async () => {
        await page.viewport(1280, 800);
        const el = await renderFixture<ForgeAiOverlayComponent>(html`<forge-ai-overlay open dismiss-mode="manual"></forge-ai-overlay>`, 'forge-ai-overlay');
        await settle(el);

        expect(el.hasAttribute('data-position-placement')).toBe(false);
        expect(popoverOf(el).matches(':popover-open')).toBe(true);
      });
    });
  });
});
