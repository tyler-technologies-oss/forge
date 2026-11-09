import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref, type Ref } from 'lit/directives/ref.js';
import { page } from 'vitest/browser';
import { renderFixture } from '../../testing/fixture.js';
import { ResizeController, type ResizeControllerOptions } from './resize-controller.js';

@customElement('resize-controller-test-host')
class ResizeControllerTestHost extends LitElement {
  public targetRef: Ref<HTMLElement> = createRef();
  public handleRef: Ref<HTMLElement> = createRef();
  public controller!: ResizeController;
  public updates = 0;

  public clearRef(name: 'targetRef' | 'handleRef'): void {
    (this[name] as { value?: HTMLElement }).value = undefined;
  }

  public setup(options: Partial<ResizeControllerOptions> = {}): ResizeController {
    this.controller = new ResizeController(this, { targetElementRef: this.targetRef, resizeHandleRef: this.handleRef, ...options });
    return this.controller;
  }

  public override updated(): void {
    this.updates++;
  }

  public override render(): TemplateResult {
    return html`<div ${ref(this.targetRef)}><div ${ref(this.handleRef)} tabindex="0"></div></div>`;
  }
}

function pointer(type: string, init: PointerEventInit = {}): PointerEvent {
  return new PointerEvent(type, { bubbles: true, cancelable: true, button: 0, pointerId: 1, clientX: 0, clientY: 0, ...init });
}

function key(name: string): KeyboardEvent {
  return new KeyboardEvent('keydown', { key: name, cancelable: true });
}

async function setup(options: Partial<ResizeControllerOptions> = {}): Promise<{ host: ResizeControllerTestHost; controller: ResizeController }> {
  const host = await renderFixture<ResizeControllerTestHost>(html`<resize-controller-test-host></resize-controller-test-host>`, 'resize-controller-test-host');
  const controller = host.setup(options);
  const handle = host.handleRef.value!;
  vi.spyOn(handle, 'setPointerCapture').mockImplementation(() => {});
  vi.spyOn(handle, 'releasePointerCapture').mockImplementation(() => {});
  return { host, controller };
}

describe('ResizeController', () => {
  beforeEach(async () => {
    await page.viewport(1280, 800);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('initial state', () => {
    it('should start at the default width and not be resizing', async () => {
      const { controller } = await setup();

      expect(controller.currentWidth).toBe(420);
      expect(controller.isResizing).toBe(false);
    });

    it('should start at a custom defaultWidth', async () => {
      const { controller } = await setup({ defaultWidth: 500 });

      expect(controller.currentWidth).toBe(500);
    });
  });

  describe('setWidth / resetWidth', () => {
    it('should set the width and call onResize', async () => {
      const onResize = vi.fn();
      const { controller } = await setup({ onResize });

      controller.setWidth(500);

      expect(controller.currentWidth).toBe(500);
      expect(onResize).toHaveBeenCalledWith(500);
    });

    it('should clamp to minWidth', async () => {
      const { controller } = await setup();

      controller.setWidth(10);

      expect(controller.currentWidth).toBe(360);
    });

    it('should clamp to maxWidth', async () => {
      const { controller } = await setup();

      controller.setWidth(5000);

      expect(controller.currentWidth).toBe(800);
    });

    it('should clamp to the available width when smaller than maxWidth', async () => {
      const { controller } = await setup({ getAvailableWidth: () => 600 });

      controller.setWidth(700);

      expect(controller.currentWidth).toBe(600);
    });

    it('should prefer minWidth when the available width is below it', async () => {
      const { controller } = await setup({ getAvailableWidth: () => 100 });

      controller.setWidth(500);

      expect(controller.currentWidth).toBe(360);
    });

    it('should default the available width to the window width minus a buffer', async () => {
      await page.viewport(700, 800);
      const { controller } = await setup();

      controller.setWidth(800);

      expect(controller.currentWidth).toBe(window.innerWidth - 100);
    });

    it('should request a host update', async () => {
      const { host, controller } = await setup();
      const before = host.updates;

      controller.setWidth(500);
      await host.updateComplete;

      expect(host.updates).toBeGreaterThan(before);
    });

    it('should return to the default width on resetWidth', async () => {
      const { controller } = await setup({ defaultWidth: 450 });
      controller.setWidth(700);

      controller.resetWidth();

      expect(controller.currentWidth).toBe(450);
    });
  });

  describe('pointer resizing', () => {
    it('should start resizing, capture the pointer, and call onResizeStart', async () => {
      const onResizeStart = vi.fn();
      const { host, controller } = await setup({ onResizeStart });
      const event = pointer('pointerdown', { clientX: 500 });

      controller.handlePointerDown(event);

      expect(controller.isResizing).toBe(true);
      expect(event.defaultPrevented).toBe(true);
      expect(host.handleRef.value!.setPointerCapture).toHaveBeenCalledWith(1);
      expect(onResizeStart).toHaveBeenCalledOnce();
    });

    it('should ignore non-primary buttons', async () => {
      const onResizeStart = vi.fn();
      const { controller } = await setup({ onResizeStart });

      controller.handlePointerDown(pointer('pointerdown', { button: 1 }));

      expect(controller.isResizing).toBe(false);
      expect(onResizeStart).not.toHaveBeenCalled();
    });

    it('should not start resizing when the handle ref is empty', async () => {
      const { host, controller } = await setup();
      host.clearRef('handleRef');

      controller.handlePointerDown(pointer('pointerdown', { clientX: 500 }));

      expect(controller.isResizing).toBe(false);
    });

    it('should grow when dragging left by default (growDirection left)', async () => {
      const onResize = vi.fn();
      const { controller } = await setup({ onResize });
      controller.handlePointerDown(pointer('pointerdown', { clientX: 500 }));

      document.dispatchEvent(pointer('pointermove', { clientX: 450 }));

      expect(controller.currentWidth).toBe(470);
      expect(onResize).toHaveBeenLastCalledWith(470);
    });

    it('should shrink when dragging right by default', async () => {
      const { controller } = await setup();
      controller.handlePointerDown(pointer('pointerdown', { clientX: 500 }));

      document.dispatchEvent(pointer('pointermove', { clientX: 530 }));

      expect(controller.currentWidth).toBe(390);
    });

    it('should grow when dragging right with growDirection right', async () => {
      const { controller } = await setup({ growDirection: () => 'right' });
      controller.handlePointerDown(pointer('pointerdown', { clientX: 500 }));

      document.dispatchEvent(pointer('pointermove', { clientX: 550 }));

      expect(controller.currentWidth).toBe(470);
    });

    it('should clamp the width while dragging', async () => {
      const { controller } = await setup();
      controller.handlePointerDown(pointer('pointerdown', { clientX: 500 }));

      document.dispatchEvent(pointer('pointermove', { clientX: -5000 }));
      expect(controller.currentWidth).toBe(800);

      document.dispatchEvent(pointer('pointermove', { clientX: 5000 }));
      expect(controller.currentWidth).toBe(360);
    });

    it('should end resizing, release capture, and commit the final width on pointer up', async () => {
      const onResizeEnd = vi.fn();
      const onCommit = vi.fn();
      const { host, controller } = await setup({ onResizeEnd, onCommit });
      controller.handlePointerDown(pointer('pointerdown', { clientX: 500 }));
      document.dispatchEvent(pointer('pointermove', { clientX: 450 }));

      document.dispatchEvent(pointer('pointerup', { clientX: 450 }));

      expect(controller.isResizing).toBe(false);
      expect(host.handleRef.value!.releasePointerCapture).toHaveBeenCalledWith(1);
      expect(onResizeEnd).toHaveBeenCalledOnce();
      expect(onCommit).toHaveBeenCalledWith(470);
    });

    it('should not commit when the width did not change during the drag', async () => {
      const onCommit = vi.fn();
      const onResizeEnd = vi.fn();
      const { controller } = await setup({ onCommit, onResizeEnd });
      controller.handlePointerDown(pointer('pointerdown', { clientX: 500 }));

      document.dispatchEvent(pointer('pointerup'));

      expect(onResizeEnd).toHaveBeenCalledOnce();
      expect(onCommit).not.toHaveBeenCalled();
    });

    it('should stop tracking moves after pointer up', async () => {
      const { controller } = await setup();
      controller.handlePointerDown(pointer('pointerdown', { clientX: 500 }));
      document.dispatchEvent(pointer('pointermove', { clientX: 450 }));
      document.dispatchEvent(pointer('pointerup'));

      document.dispatchEvent(pointer('pointermove', { clientX: 300 }));

      expect(controller.currentWidth).toBe(470);
    });

    it('should ignore pointer up when not resizing', async () => {
      const onResizeEnd = vi.fn();
      await setup({ onResizeEnd });
      const up = pointer('pointerup');

      document.dispatchEvent(up);

      expect(up.defaultPrevented).toBe(false);
      expect(onResizeEnd).not.toHaveBeenCalled();
    });

    it('should not register duplicate listeners when pointer down fires twice', async () => {
      const onResize = vi.fn();
      const { controller } = await setup({ onResize });
      controller.handlePointerDown(pointer('pointerdown', { clientX: 500 }));
      controller.handlePointerDown(pointer('pointerdown', { clientX: 500 }));

      document.dispatchEvent(pointer('pointermove', { clientX: 490 }));

      expect(onResize).toHaveBeenCalledOnce();
    });
  });

  describe('keyboard resizing', () => {
    it('should grow with ArrowLeft and shrink with ArrowRight by default', async () => {
      const { controller } = await setup();

      const left = key('ArrowLeft');
      controller.handleKeyDown(left);
      expect(controller.currentWidth).toBe(440);
      expect(left.defaultPrevented).toBe(true);

      controller.handleKeyDown(key('ArrowRight'));
      controller.handleKeyDown(key('ArrowRight'));
      expect(controller.currentWidth).toBe(400);
    });

    it('should invert direction with growDirection right', async () => {
      const { controller } = await setup({ growDirection: () => 'right' });

      controller.handleKeyDown(key('ArrowRight'));
      expect(controller.currentWidth).toBe(440);

      controller.handleKeyDown(key('ArrowLeft'));
      controller.handleKeyDown(key('ArrowLeft'));
      expect(controller.currentWidth).toBe(400);
    });

    it('should use a custom keyboardStep', async () => {
      const { controller } = await setup({ keyboardStep: 50 });

      controller.handleKeyDown(key('ArrowLeft'));

      expect(controller.currentWidth).toBe(470);
    });

    it('should call onResize and onCommit when the width changes', async () => {
      const onResize = vi.fn();
      const onCommit = vi.fn();
      const { controller } = await setup({ onResize, onCommit });

      controller.handleKeyDown(key('ArrowLeft'));

      expect(onResize).toHaveBeenCalledWith(440);
      expect(onCommit).toHaveBeenCalledWith(440);
    });

    it('should not commit when clamped at the limit', async () => {
      const onCommit = vi.fn();
      const { controller } = await setup({ onCommit, defaultWidth: 800 });

      controller.handleKeyDown(key('ArrowLeft'));

      expect(controller.currentWidth).toBe(800);
      expect(onCommit).not.toHaveBeenCalled();
    });

    it('should ignore other keys without preventing default', async () => {
      const onResize = vi.fn();
      const { controller } = await setup({ onResize });
      const event = key('ArrowUp');

      controller.handleKeyDown(event);

      expect(event.defaultPrevented).toBe(false);
      expect(onResize).not.toHaveBeenCalled();
    });
  });

  describe('lifecycle', () => {
    it('should stop resizing and detach listeners when the host disconnects', async () => {
      const onResize = vi.fn();
      const { host, controller } = await setup({ onResize });
      controller.handlePointerDown(pointer('pointerdown', { clientX: 500 }));

      host.remove();
      document.dispatchEvent(pointer('pointermove', { clientX: 400 }));

      expect(controller.isResizing).toBe(false);
      expect(onResize).not.toHaveBeenCalled();
    });
  });
});
