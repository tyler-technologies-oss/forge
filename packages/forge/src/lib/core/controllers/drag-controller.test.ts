import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { DragDropManager } from '../utils/drag-drop-manager.js';
import { DragController, DragControllerConfig } from './drag-controller.js';

@customElement('test-drag-host')
class TestDragHost extends LitElement {
  public render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

function dispatchDragStart(el: HTMLElement, options: Partial<DragEventInit> = {}): DragEvent {
  const evt = new DragEvent('dragstart', {
    bubbles: true,
    cancelable: true,
    composed: true,
    dataTransfer: options.dataTransfer ?? new DataTransfer(),
    clientX: options.clientX ?? 5,
    clientY: options.clientY ?? 5
  });
  el.dispatchEvent(evt);
  return evt;
}

function dispatchDragEnd(el: HTMLElement): DragEvent {
  const evt = new DragEvent('dragend', { bubbles: true, composed: true });
  el.dispatchEvent(evt);
  return evt;
}

async function createFixture(
  config?: DragControllerConfig
): Promise<{ host: TestDragHost; controller: DragController; item1: HTMLElement; item2: HTMLElement }> {
  const screen = render(html`
    <test-drag-host>
      <div id="item1" draggable="true">
        Item 1
        <span id="handle" draggable="true">Handle</span>
      </div>
      <div id="item2" draggable="true">Item 2</div>
    </test-drag-host>
  `);
  const host = screen.container.querySelector('test-drag-host') as TestDragHost;
  await host.updateComplete;
  const controller = new DragController(host, config);
  const item1 = host.querySelector('#item1') as HTMLElement;
  const item2 = host.querySelector('#item2') as HTMLElement;
  return { host, controller, item1, item2 };
}

describe('DragController', () => {
  afterEach(() => {
    DragDropManager.instance.endOperation();
  });

  it('should be enabled by default', async () => {
    const { controller } = await createFixture();
    expect(controller.enabled).toBe(true);
  });

  describe('dragstart', () => {
    it('should set the manager item and source to the draggable element and host by default', async () => {
      const { host, item1 } = await createFixture();
      dispatchDragStart(item1);

      expect(DragDropManager.instance.item).toBe(item1);
      expect(DragDropManager.instance.source).toBe(host);
      expect(DragDropManager.instance.currentOperation).not.toBeNull();
    });

    it('should call getDragItem with the draggable element and the event', async () => {
      const getDragItem = vi.fn(({ draggableElement }) => draggableElement);
      const { item1 } = await createFixture({ getDragItem });
      dispatchDragStart(item1);

      expect(getDragItem).toHaveBeenCalledOnce();
      expect(getDragItem.mock.calls[0][0].draggableElement).toBe(item1);
      expect(getDragItem.mock.calls[0][0].event.type).toBe('dragstart');
    });

    it('should use the value returned by getDragItem as the manager item', async () => {
      const { host, item1 } = await createFixture({
        getDragItem: ({ draggableElement }) => draggableElement.closest('#item1')
      });
      const handle = host.querySelector('#handle') as HTMLElement;
      dispatchDragStart(handle);

      expect(DragDropManager.instance.item).toBe(item1);
    });

    it('should fall back to the draggable element when getDragItem returns null', async () => {
      const { item1 } = await createFixture({ getDragItem: () => null });
      dispatchDragStart(item1);

      expect(DragDropManager.instance.item).toBe(item1);
    });

    it('should call getSourceElement with the event, item, and controller', async () => {
      const getSourceElement = vi.fn(({ item }) => item.parentElement);
      const { host, item1 } = await createFixture({ getSourceElement });
      dispatchDragStart(item1);

      expect(getSourceElement).toHaveBeenCalledOnce();
      expect(getSourceElement.mock.calls[0][0].item).toBe(item1);
      expect(getSourceElement.mock.calls[0][0].controller).toBeInstanceOf(DragController);
      expect(DragDropManager.instance.source).toBe(host);
    });

    it('should fall back to the host as the source when getSourceElement is not provided', async () => {
      const { host, item1 } = await createFixture();
      dispatchDragStart(item1);

      expect(DragDropManager.instance.source).toBe(host);
    });

    it('should set a default drag image using the item and event offsets', async () => {
      const { item1 } = await createFixture();
      const dataTransfer = new DataTransfer();
      const setDragImageSpy = vi.spyOn(dataTransfer, 'setDragImage');

      dispatchDragStart(item1, { dataTransfer });

      expect(setDragImageSpy).toHaveBeenCalledOnce();
      expect(setDragImageSpy.mock.calls[0][0]).toBe(item1);
    });

    it('should use a custom drag image when setDragImage is provided', async () => {
      const { host, item1 } = await createFixture({
        setDragImage: () => ({ image: host.querySelector('#item2') as HTMLElement, x: 10, y: 20 })
      });
      const dataTransfer = new DataTransfer();
      const setDragImageSpy = vi.spyOn(dataTransfer, 'setDragImage');

      dispatchDragStart(item1, { dataTransfer });

      expect(setDragImageSpy).toHaveBeenCalledWith(host.querySelector('#item2'), 10, 20);
    });

    it('should default effectAllowed to "move"', async () => {
      const { item1 } = await createFixture();
      const dataTransfer = new DataTransfer();
      const effectAllowedSpy = vi.spyOn(dataTransfer, 'effectAllowed', 'set');

      dispatchDragStart(item1, { dataTransfer });

      expect(effectAllowedSpy).toHaveBeenCalledWith('move');
    });

    it('should use a custom effectAllowed when provided', async () => {
      const { item1 } = await createFixture({ effectAllowed: 'copy' });
      const dataTransfer = new DataTransfer();
      const effectAllowedSpy = vi.spyOn(dataTransfer, 'effectAllowed', 'set');

      dispatchDragStart(item1, { dataTransfer });

      expect(effectAllowedSpy).toHaveBeenCalledWith('copy');
    });

    it('should call onDragStart with the event, item, and controller after transfer data is set', async () => {
      const onDragStart = vi.fn();
      const { item1 } = await createFixture({ onDragStart });

      dispatchDragStart(item1);

      expect(onDragStart).toHaveBeenCalledOnce();
      expect(onDragStart.mock.calls[0][0].item).toBe(item1);
      expect(onDragStart.mock.calls[0][0].controller).toBeInstanceOf(DragController);
    });

    it('should not throw when no dataTransfer is present on the event', async () => {
      const onDragStart = vi.fn();
      const { item1 } = await createFixture({ onDragStart });
      const evt = new DragEvent('dragstart', { bubbles: true, cancelable: true, composed: true });

      expect(() => item1.dispatchEvent(evt)).not.toThrow();
      expect(onDragStart).toHaveBeenCalledOnce();
    });

    it('should cancel a second concurrent drag operation and warn', async () => {
      const onDragStart = vi.fn();
      const { item1, item2 } = await createFixture({ onDragStart });
      dispatchDragStart(item1);

      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const secondEvt = dispatchDragStart(item2);

      expect(secondEvt.defaultPrevented).toBe(true);
      expect(warnSpy).toHaveBeenCalledOnce();
      expect(onDragStart).toHaveBeenCalledOnce();
      expect(DragDropManager.instance.item).toBe(item1);
      warnSpy.mockRestore();
    });
  });

  describe('dragend', () => {
    it('should call onDragEnd with the event and manager item when the operation is valid', async () => {
      const onDragEnd = vi.fn();
      const { item1 } = await createFixture({ onDragEnd });
      dispatchDragStart(item1);

      dispatchDragEnd(item1);

      expect(onDragEnd).toHaveBeenCalledOnce();
      expect(onDragEnd.mock.calls[0][0].item).toBe(item1);
    });

    it('should clear the manager state after dragend', async () => {
      const { item1 } = await createFixture();
      dispatchDragStart(item1);

      dispatchDragEnd(item1);

      expect(DragDropManager.instance.item).toBeNull();
      expect(DragDropManager.instance.source).toBeNull();
      expect(DragDropManager.instance.currentOperation).toBeNull();
    });

    it('should not call onDragEnd when disabled', async () => {
      const onDragEnd = vi.fn();
      const { controller, item1 } = await createFixture({ onDragEnd });
      dispatchDragStart(item1);
      controller.setEnabled(false);

      dispatchDragEnd(item1);

      expect(onDragEnd).not.toHaveBeenCalled();
    });

    it('should not call onDragEnd if the tracked operation was already ended externally', async () => {
      const onDragEnd = vi.fn();
      const { item1 } = await createFixture({ onDragEnd });
      dispatchDragStart(item1);
      DragDropManager.instance.endOperation();

      dispatchDragEnd(item1);

      expect(onDragEnd).not.toHaveBeenCalled();
    });
  });

  describe('setEnabled', () => {
    it('should detach dragstart/dragend listeners when disabled', async () => {
      const onDragStart = vi.fn();
      const { controller, item1 } = await createFixture({ onDragStart });
      controller.setEnabled(false);

      dispatchDragStart(item1);

      expect(onDragStart).not.toHaveBeenCalled();
    });

    it('should end any in-progress operation when disabled', async () => {
      const { controller, item1 } = await createFixture();
      dispatchDragStart(item1);
      expect(DragDropManager.instance.item).toBe(item1);

      controller.setEnabled(false);

      expect(DragDropManager.instance.item).toBeNull();
    });

    it('should reattach listeners when re-enabled', async () => {
      const onDragStart = vi.fn();
      const { controller, item1 } = await createFixture({ onDragStart });
      controller.setEnabled(false);
      controller.setEnabled(true);

      dispatchDragStart(item1);

      expect(onDragStart).toHaveBeenCalledOnce();
    });

    it('should be a no-op when set to the same value', async () => {
      const onDragStart = vi.fn();
      const { controller, item1 } = await createFixture({ onDragStart });

      controller.setEnabled(true);
      dispatchDragStart(item1);

      expect(onDragStart).toHaveBeenCalledOnce();
    });
  });

  describe('updateConfig', () => {
    it('should merge new configuration with existing configuration', async () => {
      const onDragStart = vi.fn();
      const onDragEnd = vi.fn();
      const { controller, item1 } = await createFixture({ onDragStart });
      controller.updateConfig({ onDragEnd });

      dispatchDragStart(item1);
      dispatchDragEnd(item1);

      expect(onDragStart).toHaveBeenCalledOnce();
      expect(onDragEnd).toHaveBeenCalledOnce();
    });

    it('should override a previously configured callback', async () => {
      const originalOnDragStart = vi.fn();
      const newOnDragStart = vi.fn();
      const { controller, item1 } = await createFixture({ onDragStart: originalOnDragStart });
      controller.updateConfig({ onDragStart: newOnDragStart });

      dispatchDragStart(item1);

      expect(originalOnDragStart).not.toHaveBeenCalled();
      expect(newOnDragStart).toHaveBeenCalledOnce();
    });
  });

  describe('host disconnection', () => {
    it('should detach listeners and end any in-progress operation when the host disconnects', async () => {
      const onDragStart = vi.fn();
      const { host, item1 } = await createFixture({ onDragStart });
      dispatchDragStart(item1);
      expect(DragDropManager.instance.item).toBe(item1);

      host.remove();

      expect(DragDropManager.instance.item).toBeNull();
    });
  });
});
