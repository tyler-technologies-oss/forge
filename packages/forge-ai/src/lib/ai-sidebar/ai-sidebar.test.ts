import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { page } from 'vitest/browser';
import { renderFixture } from '../../testing/fixture.js';
import { settle } from '../../testing/settle.js';
import type { AiSidebarComponent, ForgeAiSidebarResizeEventData } from './ai-sidebar.js';

import './ai-sidebar.js';

describe('AiSidebarComponent', () => {
  it('should label the resize handle without referencing a chatbot', async () => {
    const el = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar open></forge-ai-sidebar>`, 'forge-ai-sidebar');

    const handle = el.shadowRoot!.querySelector('[role="slider"]')!;
    expect(handle.getAttribute('aria-label')).toBe('Resize sidebar, use left and right arrow keys');
  });

  describe('public API', () => {
    const STORAGE_KEY = 'forge-ai-sidebar-width';

    beforeEach(async () => {
      window.localStorage.removeItem(STORAGE_KEY);
      window.sessionStorage.removeItem(STORAGE_KEY);
      await page.viewport(1280, 800);
    });

    afterEach(() => {
      window.localStorage.removeItem(STORAGE_KEY);
      window.sessionStorage.removeItem(STORAGE_KEY);
      vi.restoreAllMocks();
    });

    const asideOf = (el: AiSidebarComponent): HTMLElement => el.shadowRoot!.querySelector('aside')!;
    const handleOf = (el: AiSidebarComponent): HTMLElement | null => el.shadowRoot!.querySelector<HTMLElement>('[role="slider"]');
    const containerOf = (el: AiSidebarComponent): HTMLElement => el.shadowRoot!.querySelector<HTMLElement>('.animation-container')!;

    function key(name: string): KeyboardEvent {
      return new KeyboardEvent('keydown', { key: name, bubbles: true, cancelable: true });
    }

    function pointer(type: string, init: PointerEventInit = {}): PointerEvent {
      return new PointerEvent(type, { bubbles: true, cancelable: true, button: 0, pointerId: 1, clientX: 0, ...init });
    }

    it('should register the custom element and render a shadow root', async () => {
      const el = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar></forge-ai-sidebar>`, 'forge-ai-sidebar');

      expect(customElements.get('forge-ai-sidebar')).toBeDefined();
      expect(el.shadowRoot).toBeTruthy();
    });

    it('should have the expected property defaults', async () => {
      const el = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar></forge-ai-sidebar>`, 'forge-ai-sidebar');

      expect(el.open).toBe(false);
      expect(el.resizable).toBe('on');
      expect(el.width).toBe(420);
    });

    describe('open state and accessibility', () => {
      it('should be hidden from assistive technology while closed', async () => {
        const el = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar></forge-ai-sidebar>`, 'forge-ai-sidebar');

        expect(asideOf(el).getAttribute('aria-hidden')).toBe('true');
        expect(asideOf(el).getAttribute('role')).toBe('complementary');
        expect(asideOf(el).hasAttribute('open')).toBe(false);
      });

      it('should be exposed when open', async () => {
        const el = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar open></forge-ai-sidebar>`, 'forge-ai-sidebar');

        expect(asideOf(el).getAttribute('aria-hidden')).toBe('false');
        expect(asideOf(el).hasAttribute('open')).toBe(true);
      });

      it('should project slotted content', async () => {
        const el = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar open><p id="c">Hi</p></forge-ai-sidebar>`, 'forge-ai-sidebar');

        expect(asideOf(el).querySelector('slot')!.assignedElements()).toEqual([el.querySelector('#c')]);
      });
    });

    describe('show / close / toggle', () => {
      it('should open and dispatch forge-ai-sidebar-open when show() is called', async () => {
        const el = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar></forge-ai-sidebar>`, 'forge-ai-sidebar');
        const onOpen = vi.fn<(evt: CustomEvent<void>) => void>();
        el.addEventListener('forge-ai-sidebar-open', onOpen);

        el.show();
        await el.updateComplete;

        expect(el.open).toBe(true);
        expect(onOpen).toHaveBeenCalledOnce();
        expect(onOpen.mock.calls[0][0].bubbles).toBe(true);
        expect(onOpen.mock.calls[0][0].composed).toBe(true);
        expect(containerOf(el).classList.contains('animation-container--open')).toBe(true);
      });

      it('should not dispatch forge-ai-sidebar-open when already open', async () => {
        const el = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar open></forge-ai-sidebar>`, 'forge-ai-sidebar');
        const onOpen = vi.fn();
        el.addEventListener('forge-ai-sidebar-open', onOpen);

        el.show();

        expect(onOpen).not.toHaveBeenCalled();
      });

      it('should stay open until the drawer transition ends, then close and dispatch forge-ai-sidebar-close', async () => {
        const el = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar open></forge-ai-sidebar>`, 'forge-ai-sidebar');
        const onClose = vi.fn<(evt: CustomEvent<void>) => void>();
        el.addEventListener('forge-ai-sidebar-close', onClose);

        el.close();
        await el.updateComplete;
        expect(el.open).toBe(true);
        expect(containerOf(el).classList.contains('animation-container--closing')).toBe(true);
        expect(asideOf(el).classList.contains('forge-drawer--closing')).toBe(true);
        expect(onClose).not.toHaveBeenCalled();

        asideOf(el).dispatchEvent(new TransitionEvent('transitionend', { bubbles: true }));
        await el.updateComplete;

        expect(el.open).toBe(false);
        expect(onClose).toHaveBeenCalledOnce();
        expect(onClose.mock.calls[0][0].bubbles).toBe(true);
        expect(onClose.mock.calls[0][0].composed).toBe(true);
        expect(asideOf(el).classList.contains('forge-drawer--closed')).toBe(true);
      });

      it('should clear the container closing state when its own transition ends', async () => {
        const el = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar open></forge-ai-sidebar>`, 'forge-ai-sidebar');
        el.close();
        await el.updateComplete;

        containerOf(el).dispatchEvent(new TransitionEvent('transitionend'));
        await el.updateComplete;

        expect(containerOf(el).classList.contains('animation-container--closing')).toBe(false);
      });

      it('should ignore bubbled transitionend events from children', async () => {
        const el = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar open><div id="c"></div></forge-ai-sidebar>`, 'forge-ai-sidebar');
        const onClose = vi.fn();
        el.addEventListener('forge-ai-sidebar-close', onClose);
        el.close();
        await el.updateComplete;

        handleOf(el)!.dispatchEvent(new TransitionEvent('transitionend', { bubbles: true }));
        await el.updateComplete;

        expect(el.open).toBe(true);
        expect(onClose).not.toHaveBeenCalled();
      });

      it('should do nothing when close() is called while already closed or closing', async () => {
        const closed = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar></forge-ai-sidebar>`, 'forge-ai-sidebar');
        closed.close();
        await closed.updateComplete;
        expect(containerOf(closed).classList.contains('animation-container--closing')).toBe(false);

        const open = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar open></forge-ai-sidebar>`, 'forge-ai-sidebar');
        open.close();
        open.close();
        await open.updateComplete;
        expect(containerOf(open).classList.contains('animation-container--closing')).toBe(true);
      });

      it('should cancel an in-progress close when show() is called again', async () => {
        const el = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar open></forge-ai-sidebar>`, 'forge-ai-sidebar');
        el.close();
        await el.updateComplete;

        el.open = false;
        el.show();
        await el.updateComplete;

        expect(containerOf(el).classList.contains('animation-container--closing')).toBe(false);
        expect(asideOf(el).classList.contains('forge-drawer--closing')).toBe(false);
      });

      it('should toggle between open and closing', async () => {
        const el = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar></forge-ai-sidebar>`, 'forge-ai-sidebar');

        el.toggle();
        await el.updateComplete;
        expect(el.open).toBe(true);

        el.toggle();
        await el.updateComplete;
        expect(containerOf(el).classList.contains('animation-container--closing')).toBe(true);
      });
    });

    describe('width', () => {
      it('should apply width to the drawer width variable and the slider value', async () => {
        const el = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar open width="500"></forge-ai-sidebar>`, 'forge-ai-sidebar');

        expect(el.width).toBe(500);
        expect(containerOf(el).style.getPropertyValue('--forge-drawer-width')).toBe('500px');
        expect(handleOf(el)!.getAttribute('aria-valuenow')).toBe('500');
        expect(handleOf(el)!.getAttribute('aria-valuetext')).toBe('500 pixels');
      });

      it('should expose min and max on the slider', async () => {
        const el = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar open></forge-ai-sidebar>`, 'forge-ai-sidebar');

        const handle = handleOf(el)!;
        expect(handle.getAttribute('aria-valuemin')).toBe('360');
        expect(handle.getAttribute('aria-valuemax')).toBe('800');
        expect(handle.getAttribute('aria-orientation')).toBe('vertical');
        expect(handle.getAttribute('tabindex')).toBe('0');
      });

      it('should clamp width to the maximum', async () => {
        const el = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar open width="5000"></forge-ai-sidebar>`, 'forge-ai-sidebar');
        await settle(el);

        expect(el.width).toBe(800);
      });

      it('should clamp width to the minimum', async () => {
        const el = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar open width="100"></forge-ai-sidebar>`, 'forge-ai-sidebar');
        await settle(el);

        expect(el.width).toBe(360);
      });

      it('should restore a persisted width from sessionStorage in preference to localStorage', async () => {
        window.sessionStorage.setItem(STORAGE_KEY, '500');
        window.localStorage.setItem(STORAGE_KEY, '600');

        const el = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar open></forge-ai-sidebar>`, 'forge-ai-sidebar');

        expect(el.width).toBe(500);
      });

      it('should fall back to the persisted localStorage width', async () => {
        window.localStorage.setItem(STORAGE_KEY, '600');

        const el = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar open></forge-ai-sidebar>`, 'forge-ai-sidebar');

        expect(el.width).toBe(600);
      });
    });

    describe('resizing', () => {
      it('should grow with ArrowLeft, commit, dispatch forge-ai-sidebar-resize, and persist', async () => {
        const el = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar open></forge-ai-sidebar>`, 'forge-ai-sidebar');
        const onResize = vi.fn<(evt: CustomEvent<ForgeAiSidebarResizeEventData>) => void>();
        el.addEventListener('forge-ai-sidebar-resize', onResize);

        const event = key('ArrowLeft');
        handleOf(el)!.dispatchEvent(event);
        await el.updateComplete;

        expect(event.defaultPrevented).toBe(true);
        expect(el.width).toBe(440);
        expect(onResize).toHaveBeenCalledOnce();
        expect(onResize.mock.calls[0][0].detail).toEqual({ width: 440 });
        expect(onResize.mock.calls[0][0].bubbles).toBe(true);
        expect(onResize.mock.calls[0][0].composed).toBe(true);
        expect(window.sessionStorage.getItem(STORAGE_KEY)).toBe('440');
        expect(window.localStorage.getItem(STORAGE_KEY)).toBe('440');
        expect(handleOf(el)!.getAttribute('aria-valuenow')).toBe('440');
      });

      it('should shrink with ArrowRight', async () => {
        const el = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar open width="500"></forge-ai-sidebar>`, 'forge-ai-sidebar');

        handleOf(el)!.dispatchEvent(key('ArrowRight'));
        await el.updateComplete;

        expect(el.width).toBe(480);
      });

      it('should not dispatch forge-ai-sidebar-resize when already at the limit', async () => {
        const el = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar open width="360"></forge-ai-sidebar>`, 'forge-ai-sidebar');
        const onResize = vi.fn();
        el.addEventListener('forge-ai-sidebar-resize', onResize);

        handleOf(el)!.dispatchEvent(key('ArrowRight'));

        expect(onResize).not.toHaveBeenCalled();
      });

      it('should ignore unrelated keys', async () => {
        const el = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar open></forge-ai-sidebar>`, 'forge-ai-sidebar');
        const onResize = vi.fn();
        el.addEventListener('forge-ai-sidebar-resize', onResize);

        handleOf(el)!.dispatchEvent(key('Enter'));

        expect(el.width).toBe(420);
        expect(onResize).not.toHaveBeenCalled();
      });

      it('should resize by dragging the handle and commit on release', async () => {
        const el = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar open></forge-ai-sidebar>`, 'forge-ai-sidebar');
        const handle = handleOf(el)!;
        vi.spyOn(handle, 'setPointerCapture').mockImplementation(() => {});
        vi.spyOn(handle, 'releasePointerCapture').mockImplementation(() => {});
        const onResize = vi.fn<(evt: CustomEvent<ForgeAiSidebarResizeEventData>) => void>();
        el.addEventListener('forge-ai-sidebar-resize', onResize);

        handle.dispatchEvent(pointer('pointerdown', { clientX: 800 }));
        await el.updateComplete;
        expect(containerOf(el).classList.contains('animation-container--resizing')).toBe(true);
        expect(handle.classList.contains('resize-handle--active')).toBe(true);

        document.dispatchEvent(pointer('pointermove', { clientX: 750 }));
        await el.updateComplete;
        expect(el.width).toBe(470);
        expect(onResize).not.toHaveBeenCalled();

        document.dispatchEvent(pointer('pointerup', { clientX: 750 }));
        await el.updateComplete;

        expect(containerOf(el).classList.contains('animation-container--resizing')).toBe(false);
        expect(onResize).toHaveBeenCalledOnce();
        expect(onResize.mock.calls[0][0].detail).toEqual({ width: 470 });
        expect(window.localStorage.getItem(STORAGE_KEY)).toBe('470');
      });

      it('should not render the resize handle when resizable is off', async () => {
        const el = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar open resizable="off"></forge-ai-sidebar>`, 'forge-ai-sidebar');

        expect(el.resizable).toBe('off');
        expect(handleOf(el)).toBeNull();
      });

      it('should reset to the default width and clear persisted width when resizable becomes off', async () => {
        const el = await renderFixture<AiSidebarComponent>(html`<forge-ai-sidebar open width="600"></forge-ai-sidebar>`, 'forge-ai-sidebar');
        window.sessionStorage.setItem(STORAGE_KEY, '600');
        window.localStorage.setItem(STORAGE_KEY, '600');

        el.resizable = 'off';
        await settle(el);

        expect(el.width).toBe(420);
        expect(window.sessionStorage.getItem(STORAGE_KEY)).toBeNull();
        expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
      });
    });
  });
});
