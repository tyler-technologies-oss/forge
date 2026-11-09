import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref, type Ref } from 'lit/directives/ref.js';
import { page } from 'vitest/browser';
import { renderFixture } from '../../testing/fixture.js';
import { DragController, type DragControllerOptions } from './drag-controller.js';

@customElement('drag-controller-test-host')
class DragControllerTestHost extends LitElement {
  public targetRef: Ref<HTMLElement> = createRef();
  public handleRef: Ref<HTMLElement> = createRef();
  public controller!: DragController;
  public updates = 0;

  public clearRef(name: 'targetRef' | 'handleRef'): void {
    (this[name] as { value?: HTMLElement }).value = undefined;
  }

  public setup(options: Partial<DragControllerOptions> = {}): DragController {
    this.controller = new DragController(this, { targetElementRef: this.targetRef, dragHandleRef: this.handleRef, ...options });
    return this.controller;
  }

  public override updated(): void {
    this.updates++;
  }

  public override render(): TemplateResult {
    return html`
      <div ${ref(this.targetRef)} id="target" style="position: fixed; left: 100px; top: 100px; width: 200px; height: 100px;">
        <button ${ref(this.handleRef)} id="handle" @pointerdown=${(e: PointerEvent) => this.controller?.handlePointerDown(e)}>drag</button>
      </div>
    `;
  }
}

function pointer(type: string, init: PointerEventInit = {}): PointerEvent {
  return new PointerEvent(type, { bubbles: true, cancelable: true, button: 0, pointerId: 1, clientX: 0, clientY: 0, ...init });
}

async function setup(options: Partial<DragControllerOptions> = {}): Promise<{ host: DragControllerTestHost; controller: DragController; target: HTMLElement }> {
  const host = await renderFixture<DragControllerTestHost>(html`<drag-controller-test-host></drag-controller-test-host>`, 'drag-controller-test-host');
  const controller = host.setup(options);
  const handle = host.handleRef.value!;
  vi.spyOn(handle, 'setPointerCapture').mockImplementation(() => {});
  vi.spyOn(handle, 'releasePointerCapture').mockImplementation(() => {});
  return { host, controller, target: host.targetRef.value! };
}

function startDrag(controller: DragController, x = 150, y = 120): PointerEvent {
  const event = pointer('pointerdown', { clientX: x, clientY: y });
  controller.handlePointerDown(event);
  return event;
}

describe('DragController', () => {
  beforeEach(async () => {
    await page.viewport(1280, 800);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('initial state', () => {
    it('should not be dragging and have a zero transform', async () => {
      const { controller } = await setup();

      expect(controller.isDragging).toBe(false);
      expect(controller.currentTransform).toEqual({ x: 0, y: 0 });
    });
  });

  describe('pointer dragging', () => {
    it('should start dragging, prevent default, and capture the pointer on primary button down', async () => {
      const { host, controller } = await setup();
      const handle = host.handleRef.value!;

      const event = startDrag(controller);

      expect(controller.isDragging).toBe(true);
      expect(event.defaultPrevented).toBe(true);
      expect(handle.setPointerCapture).toHaveBeenCalledWith(1);
    });

    it('should request a host update when dragging starts', async () => {
      const { host, controller } = await setup();
      const before = host.updates;

      startDrag(controller);
      await host.updateComplete;

      expect(host.updates).toBeGreaterThan(before);
    });

    it('should ignore non-primary buttons', async () => {
      const { controller } = await setup();
      const event = pointer('pointerdown', { button: 2 });

      controller.handlePointerDown(event);

      expect(controller.isDragging).toBe(false);
      expect(event.defaultPrevented).toBe(false);
    });

    it('should not start dragging when the target ref is empty', async () => {
      const { host, controller } = await setup();
      host.clearRef('targetRef');

      startDrag(controller);

      expect(controller.isDragging).toBe(false);
    });

    it('should not start dragging when the handle ref is empty', async () => {
      const { host, controller } = await setup();
      host.clearRef('handleRef');

      startDrag(controller);

      expect(controller.isDragging).toBe(false);
    });

    it('should translate the target by the pointer movement', async () => {
      const { controller, target } = await setup();
      startDrag(controller, 150, 120);

      document.dispatchEvent(pointer('pointermove', { clientX: 250, clientY: 170 }));

      expect(target.style.transform).toBe('translate(100px, 50px)');
      expect(controller.currentTransform).toEqual({ x: 100, y: 50 });
    });

    it('should prevent default on pointer move while dragging', async () => {
      const { controller } = await setup();
      startDrag(controller);
      const move = pointer('pointermove', { clientX: 160, clientY: 130 });

      document.dispatchEvent(move);

      expect(move.defaultPrevented).toBe(true);
    });

    it('should allow dragging outside the viewport and then snap back on release by default', async () => {
      vi.useFakeTimers({ toFake: ['setTimeout'] });
      const { controller, target } = await setup({ snapAnimationDuration: 50 });
      startDrag(controller, 150, 120);

      document.dispatchEvent(pointer('pointermove', { clientX: -500, clientY: -500 }));
      expect(controller.currentTransform.x).toBeLessThan(-100);

      document.dispatchEvent(pointer('pointerup', { clientX: -500, clientY: -500 }));

      expect(controller.isDragging).toBe(false);
      expect(controller.currentTransform).toEqual({ x: -100, y: -100 });
      expect(target.style.transform).toBe('translate(-100px, -100px)');
      expect(target.style.transition).toContain('transform 50ms');

      vi.advanceTimersByTime(50);
      expect(target.style.transition).toBe('');
    });

    it('should clamp only the vertical axis and animate when dragged straight down', async () => {
      const { controller, target } = await setup();
      startDrag(controller, 150, 120);

      document.dispatchEvent(pointer('pointermove', { clientX: 150, clientY: 5000 }));
      document.dispatchEvent(pointer('pointerup', { clientX: 150, clientY: 5000 }));

      expect(controller.currentTransform).toEqual({ x: 0, y: 800 - 100 - 100 });
      expect(target.style.transform).toBe(`translate(0px, ${800 - 100 - 100}px)`);
      expect(target.style.transition).toContain('transform');
    });

    it('should snap back from the bottom-right viewport edges', async () => {
      const { controller, target } = await setup();
      startDrag(controller, 150, 120);

      document.dispatchEvent(pointer('pointermove', { clientX: 5000, clientY: 5000 }));
      document.dispatchEvent(pointer('pointerup'));

      expect(controller.currentTransform).toEqual({ x: 1280 - 200 - 100, y: 800 - 100 - 100 });
      expect(target.style.transform).toBe(`translate(${1280 - 200 - 100}px, ${800 - 100 - 100}px)`);
    });

    it('should not animate when released inside the viewport', async () => {
      const { controller, target } = await setup();
      startDrag(controller, 150, 120);

      document.dispatchEvent(pointer('pointermove', { clientX: 200, clientY: 200 }));
      document.dispatchEvent(pointer('pointerup'));

      expect(target.style.transition).toBe('');
      expect(controller.currentTransform).toEqual({ x: 50, y: 80 });
    });

    it('should not snap back on release when snapToViewport is false', async () => {
      const { controller } = await setup({ snapToViewport: false });
      startDrag(controller, 150, 120);

      document.dispatchEvent(pointer('pointermove', { clientX: -500, clientY: -500 }));
      const outOfBounds = controller.currentTransform;
      document.dispatchEvent(pointer('pointerup'));

      expect(controller.currentTransform).toEqual(outOfBounds);
      expect(controller.isDragging).toBe(false);
    });

    it('should release pointer capture and stop tracking moves after pointer up', async () => {
      const { host, controller, target } = await setup();
      startDrag(controller, 150, 120);
      document.dispatchEvent(pointer('pointermove', { clientX: 200, clientY: 140 }));

      document.dispatchEvent(pointer('pointerup'));
      document.dispatchEvent(pointer('pointermove', { clientX: 400, clientY: 400 }));

      expect(host.handleRef.value!.releasePointerCapture).toHaveBeenCalledWith(1);
      expect(target.style.transform).toBe('translate(50px, 20px)');
    });

    it('should ignore pointer up when not dragging', async () => {
      const { host, controller } = await setup();
      const up = pointer('pointerup');

      controller.handlePointerDown(pointer('pointerdown', { button: 2 }));
      document.dispatchEvent(up);

      expect(up.defaultPrevented).toBe(false);
      expect(host.handleRef.value!.releasePointerCapture).not.toHaveBeenCalled();
    });

    it('should continue from the existing transform when a new drag starts', async () => {
      const { controller, target } = await setup();
      startDrag(controller, 150, 120);
      document.dispatchEvent(pointer('pointermove', { clientX: 200, clientY: 120 }));
      document.dispatchEvent(pointer('pointerup'));
      expect(target.style.transform).toBe('translate(50px, 0px)');

      startDrag(controller, 200, 120);
      document.dispatchEvent(pointer('pointermove', { clientX: 210, clientY: 130 }));

      expect(controller.currentTransform).toEqual({ x: 60, y: 10 });
    });

    it('should not register duplicate move listeners when pointer down fires twice', async () => {
      const { host, controller } = await setup();
      startDrag(controller);
      startDrag(controller);
      const before = host.updates;

      document.dispatchEvent(pointer('pointermove', { clientX: 160, clientY: 130 }));

      expect(controller.currentTransform).toEqual({ x: 10, y: 10 });
      expect(host.updates).toBe(before);
    });
  });

  describe('edge cases', () => {
    it('should ignore pointer moves when the target ref is cleared mid-drag', async () => {
      const { host, controller } = await setup();
      startDrag(controller);
      host.clearRef('targetRef');

      document.dispatchEvent(pointer('pointermove', { clientX: 300, clientY: 300 }));

      expect(controller.currentTransform).toEqual({ x: 0, y: 0 });
    });

    it('should still end the drag on pointer up when the handle ref is cleared mid-drag', async () => {
      const { host, controller } = await setup();
      startDrag(controller);
      host.clearRef('handleRef');

      document.dispatchEvent(pointer('pointerup'));

      expect(controller.isDragging).toBe(false);
    });

    it('should not throw on pointer up when the target ref is cleared mid-drag', async () => {
      const { host, controller } = await setup();
      startDrag(controller);
      host.clearRef('targetRef');

      expect(() => document.dispatchEvent(pointer('pointerup'))).not.toThrow();
      expect(controller.isDragging).toBe(false);
    });

    it('should compute bounds from right and bottom offsets for an element anchored to the bottom-right', async () => {
      const { controller, target } = await setup();
      target.style.left = 'auto';
      target.style.top = 'auto';
      target.style.right = '50px';
      target.style.bottom = '50px';
      startDrag(controller, 1000, 600);

      document.dispatchEvent(pointer('pointermove', { clientX: 5000, clientY: 5000 }));
      document.dispatchEvent(pointer('pointerup'));

      expect(controller.currentTransform).toEqual({ x: 50, y: 50 });
    });
  });

  describe('keyboard navigation', () => {
    it.each([
      ['ArrowRight', 'translate(10px, 0px)'],
      ['ArrowLeft', 'translate(-10px, 0px)'],
      ['ArrowDown', 'translate(0px, 10px)'],
      ['ArrowUp', 'translate(0px, -10px)']
    ])('should move the target by the default step when %s is pressed', async (key, expected) => {
      const { controller, target } = await setup();
      const event = new KeyboardEvent('keydown', { key, cancelable: true });

      controller.handleKeyDown(event);

      expect(target.style.transform).toBe(expected);
      expect(event.defaultPrevented).toBe(true);
    });

    it('should use a custom keyboardStep', async () => {
      const { controller, target } = await setup({ keyboardStep: 25 });

      controller.handleKeyDown(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

      expect(target.style.transform).toBe('translate(25px, 0px)');
    });

    it('should accumulate moves across key presses', async () => {
      const { controller, target } = await setup();

      controller.handleKeyDown(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      controller.handleKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      controller.handleKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

      expect(target.style.transform).toBe('translate(10px, 20px)');
    });

    it('should ignore other keys without preventing default', async () => {
      const { controller, target } = await setup();
      const event = new KeyboardEvent('keydown', { key: 'a', cancelable: true });

      controller.handleKeyDown(event);

      expect(target.style.transform).toBe('');
      expect(event.defaultPrevented).toBe(false);
    });

    it('should do nothing when the target ref is empty', async () => {
      const { host, controller } = await setup();
      host.clearRef('targetRef');
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true });

      controller.handleKeyDown(event);

      expect(event.defaultPrevented).toBe(true);
      expect(controller.currentTransform).toEqual({ x: 0, y: 0 });
    });

    it('should constrain keyboard movement to the viewport by default', async () => {
      const { controller, target } = await setup();

      for (let i = 0; i < 20; i++) {
        controller.handleKeyDown(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      }

      expect(target.style.transform).toBe('translate(-100px, 0px)');
    });

    it('should allow keyboard movement outside the viewport when constrainKeyboardNavigation is false', async () => {
      const { controller, target } = await setup({ constrainKeyboardNavigation: false });

      for (let i = 0; i < 20; i++) {
        controller.handleKeyDown(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      }

      expect(target.style.transform).toBe('translate(-200px, 0px)');
    });
  });

  describe('resetPosition', () => {
    it('should clear the transform and transition on the target', async () => {
      const { controller, target } = await setup();
      controller.handleKeyDown(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      target.style.transition = 'transform 1s';

      controller.resetPosition();

      expect(target.style.transform).toBe('');
      expect(target.style.transition).toBe('');
      expect(controller.currentTransform).toEqual({ x: 0, y: 0 });
    });

    it('should leave the transform unchanged when the target ref is empty', async () => {
      const { host, controller } = await setup();
      controller.handleKeyDown(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      host.clearRef('targetRef');

      controller.resetPosition();

      expect(controller.currentTransform).toEqual({ x: 10, y: 0 });
    });
  });

  describe('cleanup', () => {
    it('should stop dragging and detach document listeners', async () => {
      const { controller, target } = await setup();
      startDrag(controller);

      controller.cleanup();
      document.dispatchEvent(pointer('pointermove', { clientX: 300, clientY: 300 }));

      expect(controller.isDragging).toBe(false);
      expect(target.style.transform).toBe('');
    });

    it('should clean up when the host disconnects', async () => {
      const { host, controller } = await setup();
      startDrag(controller);

      host.remove();

      expect(controller.isDragging).toBe(false);
    });

    it('should be safe to call when nothing is active', async () => {
      const { controller } = await setup();

      expect(() => controller.cleanup()).not.toThrow();
    });
  });
});
