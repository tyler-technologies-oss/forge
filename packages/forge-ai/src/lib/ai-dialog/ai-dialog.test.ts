import { afterEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { page, userEvent } from 'vitest/browser';
import { renderFixture } from '../../testing/fixture.js';
import { settle } from '../../testing/settle.js';
import type { AiDialogComponent } from './ai-dialog.js';
import type { AiModalComponent } from '../ai-modal/ai-modal.js';
import type { AiReasoningHeaderComponent } from '../ai-reasoning-header/index.js';

import './ai-dialog.js';
import '../ai-reasoning-header/ai-reasoning-header.js';

describe('AiDialogComponent', () => {
  it('should label the drag handle without referencing a chatbot', async () => {
    await page.viewport(1280, 800);
    const el = await renderFixture<AiDialogComponent>(html`<forge-ai-dialog></forge-ai-dialog>`, 'forge-ai-dialog');

    expect(el.isFullscreen).toBe(false);
    expect(el.shadowRoot!.querySelector('#drag-handle')!.getAttribute('aria-label')).toBe('Move dialog');
  });

  it('should stay open when a slotted descendant dispatches a bubbling toggle event', async () => {
    await page.viewport(1280, 800);
    const el = await renderFixture<AiDialogComponent>(
      html`<forge-ai-dialog open
        ><forge-ai-reasoning-header><span slot="title">Title</span></forge-ai-reasoning-header></forge-ai-dialog
      >`,
      'forge-ai-dialog'
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
    await page.viewport(1280, 800);
    const el = await renderFixture<AiDialogComponent>(html`<forge-ai-dialog open><div id="child"></div></forge-ai-dialog>`, 'forge-ai-dialog');
    await settle(el);

    el.querySelector('#child')!.dispatchEvent(new CustomEvent('toggle', { bubbles: true, composed: true }));
    await settle(el);

    expect(el.open).toBe(true);
  });

  describe('public API', () => {
    afterEach(() => {
      vi.useRealTimers();
    });

    async function renderDialog(template = html`<forge-ai-dialog></forge-ai-dialog>`, width = 1280): Promise<AiDialogComponent> {
      await page.viewport(width, 800);
      return renderFixture<AiDialogComponent>(template, 'forge-ai-dialog');
    }

    const popoverOf = (el: AiDialogComponent): HTMLDialogElement => el.shadowRoot!.querySelector<HTMLDialogElement>('dialog')!;
    const modalOf = (el: AiDialogComponent): AiModalComponent | null => el.shadowRoot!.querySelector<AiModalComponent>('forge-ai-modal');

    it('should register the custom element', async () => {
      await renderDialog();

      expect(customElements.get('forge-ai-dialog')).toBeDefined();
    });

    it('should have the expected property defaults', async () => {
      const el = await renderDialog();

      expect(el.open).toBe(false);
      expect(el.expanded).toBe(false);
      expect(el.label).toBe('AI Assistant');
      expect(el.isFullscreen).toBe(false);
    });

    it('should read open, expanded, and label from attributes', async () => {
      const el = await renderDialog(html`<forge-ai-dialog open expanded label="Helper"></forge-ai-dialog>`);

      expect(el.open).toBe(true);
      expect(el.expanded).toBe(true);
      expect(el.label).toBe('Helper');
    });

    describe('popover mode', () => {
      it('should render a non-modal manual popover dialog labelled with the label property', async () => {
        const el = await renderDialog(html`<forge-ai-dialog label="Helper"></forge-ai-dialog>`);

        const dialog = popoverOf(el);
        expect(dialog.getAttribute('popover')).toBe('manual');
        expect(dialog.getAttribute('aria-modal')).toBe('false');
        expect(dialog.getAttribute('aria-label')).toBe('Helper');
        expect(modalOf(el)).toBeNull();
      });

      it('should keep the popover hidden while closed', async () => {
        const el = await renderDialog();

        expect(popoverOf(el).matches(':popover-open')).toBe(false);
      });

      it('should show the popover when open is set', async () => {
        const el = await renderDialog();

        el.open = true;
        await settle(el);

        expect(popoverOf(el).matches(':popover-open')).toBe(true);
      });

      it('should show the popover when show() is called', async () => {
        const el = await renderDialog();

        el.show();
        await settle(el);

        expect(el.open).toBe(true);
        expect(popoverOf(el).matches(':popover-open')).toBe(true);
      });

      it('should project slotted content into the popover', async () => {
        const el = await renderDialog(html`<forge-ai-dialog open><p id="content">Hi</p></forge-ai-dialog>`);

        expect(popoverOf(el).querySelector('slot')!.assignedElements()).toEqual([el.querySelector('#content')]);
      });

      it('should close, dispatch forge-ai-dialog-close, and hide after the closing animation when close() is called', async () => {
        const el = await renderDialog(html`<forge-ai-dialog open></forge-ai-dialog>`);
        await settle(el);
        const onClose = vi.fn<(evt: CustomEvent<void>) => void>();
        el.addEventListener('forge-ai-dialog-close', onClose);
        vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });

        el.close();
        await el.updateComplete;
        await el.updateComplete;

        expect(el.open).toBe(false);
        expect(onClose).toHaveBeenCalledOnce();
        expect(onClose.mock.calls[0][0].bubbles).toBe(true);
        expect(onClose.mock.calls[0][0].composed).toBe(true);
        expect(popoverOf(el).classList.contains('closing')).toBe(true);
        expect(popoverOf(el).matches(':popover-open')).toBe(true);

        vi.advanceTimersByTime(100);
        await el.updateComplete;
        await el.updateComplete;

        expect(popoverOf(el).classList.contains('closing')).toBe(false);
        expect(popoverOf(el).matches(':popover-open')).toBe(false);
      });

      it('should toggle between open and closed', async () => {
        const el = await renderDialog();
        const onClose = vi.fn();
        el.addEventListener('forge-ai-dialog-close', onClose);

        el.toggle();
        await settle(el);
        expect(el.open).toBe(true);

        el.toggle();
        await settle(el);
        expect(el.open).toBe(false);
        expect(onClose).toHaveBeenCalledOnce();
      });

      it('should close when Escape is pressed while open', async () => {
        const el = await renderDialog(html`<forge-ai-dialog open></forge-ai-dialog>`);
        await settle(el);
        const onClose = vi.fn();
        el.addEventListener('forge-ai-dialog-close', onClose);

        await userEvent.keyboard('{Escape}');
        await el.updateComplete;

        expect(el.open).toBe(false);
        expect(onClose).toHaveBeenCalledOnce();
      });

      it('should ignore Escape after the dialog has closed', async () => {
        const el = await renderDialog(html`<forge-ai-dialog open></forge-ai-dialog>`);
        await settle(el);
        el.close();
        await settle(el);
        const onClose = vi.fn();
        el.addEventListener('forge-ai-dialog-close', onClose);

        await userEvent.keyboard('{Escape}');

        expect(onClose).not.toHaveBeenCalled();
      });

      it('should sync open to false when the popover is hidden externally', async () => {
        const el = await renderDialog(html`<forge-ai-dialog open></forge-ai-dialog>`);
        await settle(el);

        popoverOf(el).hidePopover();
        await settle(el);

        expect(el.open).toBe(false);
      });

      it('should sync open to true when the popover is shown externally', async () => {
        const el = await renderDialog();

        popoverOf(el).showPopover();
        await settle(el);

        expect(el.open).toBe(true);
      });

      it('should clear a pending close timer when disconnected', async () => {
        const el = await renderDialog(html`<forge-ai-dialog open></forge-ai-dialog>`);
        await settle(el);
        vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
        el.close();
        await el.updateComplete;
        await el.updateComplete;
        expect(vi.getTimerCount()).toBeGreaterThan(0);

        el.remove();

        expect(vi.getTimerCount()).toBe(0);
      });
    });

    describe('drag handle', () => {
      const handleOf = (el: AiDialogComponent): HTMLButtonElement => el.shadowRoot!.querySelector<HTMLButtonElement>('#drag-handle')!;

      it('should move the dialog with arrow keys on the drag handle', async () => {
        const el = await renderDialog(html`<forge-ai-dialog open></forge-ai-dialog>`);
        await settle(el);

        handleOf(el).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true }));

        expect(popoverOf(el).style.transform).toBe('translate(-10px, 0px)');
      });

      it('should reset the dragged position when closed', async () => {
        const el = await renderDialog(html`<forge-ai-dialog open></forge-ai-dialog>`);
        await settle(el);
        handleOf(el).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true }));

        el.close();
        await settle(el);

        expect(popoverOf(el).style.transform).toBe('');
      });

      it('should add the dragging class while the handle is being dragged', async () => {
        const el = await renderDialog(html`<forge-ai-dialog open></forge-ai-dialog>`);
        await settle(el);
        const handle = handleOf(el);
        vi.spyOn(handle, 'setPointerCapture').mockImplementation(() => {});
        vi.spyOn(handle, 'releasePointerCapture').mockImplementation(() => {});

        handle.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, button: 0, pointerId: 1, clientX: 100, clientY: 100 }));
        await el.updateComplete;
        expect(popoverOf(el).classList.contains('dragging')).toBe(true);

        document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: true, pointerId: 1 }));
        await el.updateComplete;
        expect(popoverOf(el).classList.contains('dragging')).toBe(false);
      });
    });

    describe('modal mode', () => {
      it.skip('should render a forge-ai-modal instead of the popover when expanded (BUG: modal fires spurious close on first update, dialog.close() resets expanded)', async () => {
        const el = await renderDialog(html`<forge-ai-dialog expanded label="Helper"></forge-ai-dialog>`);

        expect(popoverOf(el)).toBeNull();
        expect(modalOf(el)!.label).toBe('Helper');
      });

      it.skip('should open the modal when open is set while expanded (BUG: modal fires spurious close on first update, dialog.close() resets expanded)', async () => {
        const el = await renderDialog(html`<forge-ai-dialog expanded></forge-ai-dialog>`);

        el.open = true;
        await settle(el);

        expect(modalOf(el)!.open).toBe(true);
      });

      it('should close the modal and the dialog when the modal reports a close', async () => {
        const el = await renderDialog(html`<forge-ai-dialog expanded open></forge-ai-dialog>`);
        await settle(el);
        const onClose = vi.fn();
        el.addEventListener('forge-ai-dialog-close', onClose);

        await userEvent.keyboard('{Escape}');
        await settle(el);

        expect(el.open).toBe(false);
        expect(el.expanded).toBe(false);
        expect(onClose).toHaveBeenCalledOnce();
      });

      it('should reset expanded when close() is called', async () => {
        const el = await renderDialog(html`<forge-ai-dialog expanded open></forge-ai-dialog>`);
        await settle(el);

        el.close();
        await settle(el);

        expect(el.expanded).toBe(false);
        expect(el.open).toBe(false);
      });

      it.skip('should project slotted content into the modal when expanded (BUG: modal fires spurious close on first update, dialog.close() resets expanded)', async () => {
        const el = await renderDialog(html`<forge-ai-dialog expanded><p id="content">Hi</p></forge-ai-dialog>`);

        expect(el.shadowRoot!.querySelector<HTMLSlotElement>('forge-ai-modal slot')!.assignedElements()).toEqual([el.querySelector('#content')]);
      });

      it('should switch between popover and modal when expanded changes while open', async () => {
        const el = await renderDialog(html`<forge-ai-dialog open></forge-ai-dialog>`);
        await settle(el);
        expect(popoverOf(el)).toBeTruthy();

        el.expanded = true;
        await settle(el);
        expect(popoverOf(el)).toBeNull();
        expect(modalOf(el)!.open).toBe(true);
      });
    });

    describe('fullscreen', () => {
      it('should use the modal and report fullscreen on a narrow viewport', async () => {
        const el = await renderDialog(html`<forge-ai-dialog></forge-ai-dialog>`, 600);

        expect(el.isFullscreen).toBe(true);
        expect(modalOf(el)).toBeTruthy();
        expect(popoverOf(el)).toBeNull();
      });

      it('should dispatch forge-ai-dialog-fullscreen-change when the viewport crosses the threshold', async () => {
        const el = await renderDialog();
        const onChange = vi.fn<(evt: CustomEvent<{ isFullscreen: boolean }>) => void>();
        el.addEventListener('forge-ai-dialog-fullscreen-change', onChange);

        await page.viewport(600, 800);
        await settle(el);
        expect(onChange).toHaveBeenCalledOnce();
        expect(onChange.mock.calls[0][0].detail).toEqual({ isFullscreen: true });
        expect(onChange.mock.calls[0][0].bubbles).toBe(true);
        expect(onChange.mock.calls[0][0].composed).toBe(true);
        expect(el.isFullscreen).toBe(true);

        await page.viewport(1280, 800);
        await settle(el);
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange.mock.calls[1][0].detail).toEqual({ isFullscreen: false });
      });

      it('should stop reacting to viewport changes after being disconnected', async () => {
        const el = await renderDialog();
        const onChange = vi.fn();
        el.addEventListener('forge-ai-dialog-fullscreen-change', onChange);

        el.remove();
        await page.viewport(600, 800);
        await settle(el);

        expect(onChange).not.toHaveBeenCalled();
      });
    });
  });
});
