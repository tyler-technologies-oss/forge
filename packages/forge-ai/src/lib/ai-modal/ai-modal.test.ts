import { afterEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { page, userEvent } from 'vitest/browser';
import { renderFixture } from '../../testing/fixture.js';
import { settle } from '../../testing/settle.js';
import type { AiModalComponent } from './ai-modal.js';

import './ai-modal.js';

type CloseReason = 'backdrop' | 'escape' | 'programmatic';

function dialogOf(el: AiModalComponent): HTMLDialogElement {
  return el.shadowRoot!.querySelector('dialog')!;
}

async function renderModal(template = html`<forge-ai-modal></forge-ai-modal>`): Promise<AiModalComponent> {
  await page.viewport(1280, 800);
  return renderFixture<AiModalComponent>(template, 'forge-ai-modal');
}

describe('AiModalComponent', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should register the custom element and render a dialog in a shadow root', async () => {
    const el = await renderModal();

    expect(customElements.get('forge-ai-modal')).toBeDefined();
    expect(dialogOf(el)).toBeTruthy();
  });

  it('should have the expected property defaults', async () => {
    const el = await renderModal();

    expect(el.open).toBe(false);
    expect(el.fullscreen).toBeUndefined();
    expect(el.sizeStrategy).toBe('auto');
    expect(el.label).toBe('AI Assistant');
    expect(dialogOf(el).open).toBe(false);
  });

  describe('accessibility', () => {
    it('should label the dialog with the default label', async () => {
      const el = await renderModal();

      expect(dialogOf(el).getAttribute('aria-label')).toBe('AI Assistant');
    });

    it('should label the dialog with a custom label', async () => {
      const el = await renderModal(html`<forge-ai-modal label="Chat"></forge-ai-modal>`);

      expect(dialogOf(el).getAttribute('aria-label')).toBe('Chat');
    });

    it('should update the dialog label when label changes', async () => {
      const el = await renderModal();

      el.label = 'Other';
      await el.updateComplete;

      expect(dialogOf(el).getAttribute('aria-label')).toBe('Other');
    });
  });

  describe('opening and closing', () => {
    it('should show the dialog modally when open is set and dispatch forge-ai-modal-open', async () => {
      const el = await renderModal();
      const onOpen = vi.fn<(evt: CustomEvent<void>) => void>();
      el.addEventListener('forge-ai-modal-open', onOpen);

      el.open = true;
      await el.updateComplete;

      expect(dialogOf(el).open).toBe(true);
      expect(dialogOf(el).matches(':modal')).toBe(true);
      expect(onOpen).toHaveBeenCalledOnce();
      expect(onOpen.mock.calls[0][0].bubbles).toBe(true);
      expect(onOpen.mock.calls[0][0].composed).toBe(true);
    });

    it('should open from the attribute on first render', async () => {
      const el = await renderModal(html`<forge-ai-modal open></forge-ai-modal>`);

      expect(dialogOf(el).open).toBe(true);
    });

    it('should open when show() is called', async () => {
      const el = await renderModal();

      el.show();
      await el.updateComplete;

      expect(el.open).toBe(true);
      expect(dialogOf(el).open).toBe(true);
    });

    it('should mark itself as handling escape while open', async () => {
      const el = await renderModal();

      el.show();
      await el.updateComplete;
      expect(el.hasAttribute('data-handles-escape')).toBe(true);

      el.close();
      await el.updateComplete;
      expect(el.hasAttribute('data-handles-escape')).toBe(false);
    });

    it('should close the dialog and dispatch a programmatic close when close() is called', async () => {
      const el = await renderModal(html`<forge-ai-modal open></forge-ai-modal>`);
      const onClose = vi.fn<(evt: CustomEvent<{ reason: CloseReason }>) => void>();
      el.addEventListener('forge-ai-modal-close', onClose);

      el.close();
      await el.updateComplete;

      expect(el.open).toBe(false);
      expect(dialogOf(el).open).toBe(false);
      expect(onClose).toHaveBeenCalledOnce();
      expect(onClose.mock.calls[0][0].detail).toEqual({ reason: 'programmatic' });
      expect(onClose.mock.calls[0][0].bubbles).toBe(true);
      expect(onClose.mock.calls[0][0].composed).toBe(true);
    });

    it('should close with reason "escape" when the user presses Escape', async () => {
      const el = await renderModal(html`<forge-ai-modal open></forge-ai-modal>`);
      const onClose = vi.fn<(evt: CustomEvent<{ reason: CloseReason }>) => void>();
      el.addEventListener('forge-ai-modal-close', onClose);

      await userEvent.keyboard('{Escape}');
      await settle(el);

      expect(el.open).toBe(false);
      expect(onClose).toHaveBeenCalledOnce();
      expect(onClose.mock.calls[0][0].detail).toEqual({ reason: 'escape' });
    });

    it('should close with reason "backdrop" when the backdrop is clicked', async () => {
      const el = await renderModal(html`<forge-ai-modal open><p>Hi</p></forge-ai-modal>`);
      const onClose = vi.fn<(evt: CustomEvent<{ reason: CloseReason }>) => void>();
      el.addEventListener('forge-ai-modal-close', onClose);

      dialogOf(el).dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
      await settle(el);

      expect(el.open).toBe(false);
      expect(onClose).toHaveBeenCalledOnce();
      expect(onClose.mock.calls[0][0].detail).toEqual({ reason: 'backdrop' });
    });

    it('should not close when slotted content inside the dialog is clicked', async () => {
      const el = await renderModal(html`<forge-ai-modal open><button id="inner">Inner</button></forge-ai-modal>`);

      await userEvent.click(el.querySelector('#inner')!);
      await settle(el);

      expect(el.open).toBe(true);
    });

    it('should reset the close reason to programmatic after an escape close', async () => {
      const el = await renderModal(html`<forge-ai-modal open></forge-ai-modal>`);
      const reasons: CloseReason[] = [];
      el.addEventListener('forge-ai-modal-close', evt => {
        reasons.push(evt.detail.reason);
      });

      await userEvent.keyboard('{Escape}');
      await settle(el);
      el.show();
      await el.updateComplete;
      el.close();
      await el.updateComplete;

      expect(reasons).toEqual(['escape', 'programmatic']);
    });

    it('should stop Escape keydown from propagating out of the dialog', async () => {
      const el = await renderModal(html`<forge-ai-modal open></forge-ai-modal>`);
      const onKeydown = vi.fn();
      document.addEventListener('keydown', onKeydown);

      dialogOf(el).dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true }));
      document.removeEventListener('keydown', onKeydown);

      expect(onKeydown).not.toHaveBeenCalled();
    });

    it('should allow non-Escape keydown events to propagate', async () => {
      const el = await renderModal(html`<forge-ai-modal open></forge-ai-modal>`);
      const onKeydown = vi.fn();
      document.addEventListener('keydown', onKeydown);

      dialogOf(el).dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true, composed: true }));
      document.removeEventListener('keydown', onKeydown);

      expect(onKeydown).toHaveBeenCalledOnce();
    });

    it('should not dispatch forge-ai-modal-close on initial render when closed', async () => {
      await page.viewport(1280, 800);
      const onClose = vi.fn();
      document.addEventListener('forge-ai-modal-close', onClose);

      await renderFixture<AiModalComponent>(html`<forge-ai-modal></forge-ai-modal>`, 'forge-ai-modal');
      document.removeEventListener('forge-ai-modal-close', onClose);

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('fullscreen', () => {
    it('should not be fullscreen on a wide viewport by default', async () => {
      const el = await renderModal();

      expect(dialogOf(el).classList.contains('forge-dialog--fullscreen')).toBe(false);
      expect(el.matches(':state(fullscreen)')).toBe(false);
    });

    it('should be fullscreen on a narrow viewport when sizeStrategy is auto', async () => {
      await page.viewport(600, 800);
      const el = await renderFixture<AiModalComponent>(html`<forge-ai-modal></forge-ai-modal>`, 'forge-ai-modal');

      expect(dialogOf(el).classList.contains('forge-dialog--fullscreen')).toBe(true);
      expect(el.matches(':state(fullscreen)')).toBe(true);
    });

    it('should force fullscreen when the fullscreen property is true regardless of viewport', async () => {
      const el = await renderModal(html`<forge-ai-modal fullscreen></forge-ai-modal>`);

      expect(el.fullscreen).toBe(true);
      expect(dialogOf(el).classList.contains('forge-dialog--fullscreen')).toBe(true);
      expect(el.matches(':state(fullscreen)')).toBe(true);
    });

    it('should update fullscreen presentation when the property changes', async () => {
      const el = await renderModal();

      el.fullscreen = true;
      await el.updateComplete;
      expect(el.matches(':state(fullscreen)')).toBe(true);

      el.fullscreen = false;
      await el.updateComplete;
      expect(dialogOf(el).classList.contains('forge-dialog--fullscreen')).toBe(false);
      expect(el.matches(':state(fullscreen)')).toBe(false);
    });

    it('should never auto-fullscreen on a narrow viewport when sizeStrategy is fixed', async () => {
      await page.viewport(600, 800);
      const el = await renderFixture<AiModalComponent>(html`<forge-ai-modal size-strategy="fixed"></forge-ai-modal>`, 'forge-ai-modal');

      expect(el.sizeStrategy).toBe('fixed');
      expect(dialogOf(el).classList.contains('forge-dialog--fullscreen')).toBe(false);
      expect(el.matches(':state(fullscreen)')).toBe(false);
    });

    it('should honor fullscreen when sizeStrategy is fixed', async () => {
      const el = await renderModal(html`<forge-ai-modal size-strategy="fixed" fullscreen></forge-ai-modal>`);

      expect(dialogOf(el).classList.contains('forge-dialog--fullscreen')).toBe(true);
      expect(el.matches(':state(fullscreen)')).toBe(true);
    });

    it('should dispatch forge-ai-modal-fullscreen-change when the viewport crosses the threshold', async () => {
      const el = await renderModal();
      const onChange = vi.fn<(evt: CustomEvent<{ isFullscreen: boolean }>) => void>();
      el.addEventListener('forge-ai-modal-fullscreen-change', onChange);

      await page.viewport(600, 800);
      await settle(el);

      expect(onChange).toHaveBeenCalledOnce();
      expect(onChange.mock.calls[0][0].detail).toEqual({ isFullscreen: true });
      expect(el.matches(':state(fullscreen)')).toBe(true);

      await page.viewport(1280, 800);
      await settle(el);

      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange.mock.calls[1][0].detail).toEqual({ isFullscreen: false });
    });

    it('should not dispatch forge-ai-modal-fullscreen-change when fullscreen is explicitly set', async () => {
      const el = await renderModal(html`<forge-ai-modal fullscreen></forge-ai-modal>`);
      const onChange = vi.fn();
      el.addEventListener('forge-ai-modal-fullscreen-change', onChange);

      await page.viewport(600, 800);
      await settle(el);

      expect(onChange).not.toHaveBeenCalled();
    });

    it('should stop reacting to viewport changes after it is disconnected', async () => {
      const el = await renderModal();
      const onChange = vi.fn();
      el.addEventListener('forge-ai-modal-fullscreen-change', onChange);

      el.remove();
      await page.viewport(600, 800);
      await settle(el);

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('slots', () => {
    it('should project default slot content into the dialog', async () => {
      const el = await renderModal(html`<forge-ai-modal><p id="content">Hello</p></forge-ai-modal>`);

      const slot = dialogOf(el).querySelector('slot')!;
      expect(slot.assignedElements()).toEqual([el.querySelector('#content')]);
    });
  });
});
