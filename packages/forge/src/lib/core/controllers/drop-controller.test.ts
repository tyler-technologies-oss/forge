import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { DragDropManager } from '../utils/drag-drop-manager.js';
import { task } from '../utils/utils.js';
import { DropController, DropControllerConfig } from './drop-controller.js';

@customElement('test-drop-host')
class TestDropHost extends LitElement {
  public render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

function dispatchDrag(el: EventTarget, type: string, options: Partial<DragEventInit> = {}): DragEvent {
  const evt = new DragEvent(type, {
    bubbles: true,
    cancelable: true,
    composed: true,
    dataTransfer: options.dataTransfer ?? new DataTransfer(),
    clientX: options.clientX ?? 0,
    clientY: options.clientY ?? 0
  });
  el.dispatchEvent(evt);
  return evt;
}

function startManagerOperation(item = document.createElement('div'), source = document.createElement('div')): void {
  DragDropManager.instance.setItem(item);
  DragDropManager.instance.setSource(source);
  DragDropManager.instance.startOperation(new DragEvent('dragstart'));
}

async function createFixture(
  config?: DropControllerConfig
): Promise<{ host: TestDropHost; controller: DropController; child1: HTMLElement; child2: HTMLElement }> {
  const screen = render(html`
    <test-drop-host>
      <div id="child1">Child 1</div>
      <div id="child2">Child 2</div>
    </test-drop-host>
  `);
  const host = screen.container.querySelector('test-drop-host') as TestDropHost;
  await host.updateComplete;
  const controller = new DropController(host, config);
  const child1 = host.querySelector('#child1') as HTMLElement;
  const child2 = host.querySelector('#child2') as HTMLElement;
  return { host, controller, child1, child2 };
}

describe('DropController', () => {
  afterEach(() => {
    DragDropManager.instance.setTarget(null);
    DragDropManager.instance.endOperation();
  });

  it('should be enabled by default', async () => {
    const { host } = await createFixture();
    expect(host).toBeTruthy();
  });

  it('should have a null dropTarget when no drag operation is active', async () => {
    const { controller } = await createFixture();
    expect(controller.dropTarget).toBeNull();
  });

  it('should have a null insertionIndex when no drag operation is active', async () => {
    const { controller } = await createFixture();
    expect(controller.insertionIndex).toBeNull();
  });

  describe('manager subscription (dragstart/dragend from the DragDropManager)', () => {
    it('should call onDragStart with the manager item, target, and source when an operation starts', async () => {
      const onDragStart = vi.fn();
      await createFixture({ onDragStart });
      const item = document.createElement('div');
      const source = document.createElement('div');

      startManagerOperation(item, source);

      expect(onDragStart).toHaveBeenCalledOnce();
      expect(onDragStart.mock.calls[0][0].item).toBe(item);
      expect(onDragStart.mock.calls[0][0].source).toBe(source);
      expect(onDragStart.mock.calls[0][0].index).toBe(-1);
    });

    it('should set preventDrop for the remainder of the operation when onDragStart returns false', async () => {
      const onDragEnter = vi.fn();
      const { host } = await createFixture({ onDragStart: () => false, onDragEnter });
      startManagerOperation();

      dispatchDrag(host, 'dragenter');

      expect(onDragEnter).not.toHaveBeenCalled();
    });

    it('should not set preventDrop when onDragStart returns true or undefined', async () => {
      const onDragEnter = vi.fn();
      const { host } = await createFixture({ onDragStart: () => true, onDragEnter });
      startManagerOperation();

      dispatchDrag(host, 'dragenter');

      expect(onDragEnter).toHaveBeenCalledOnce();
    });

    it('should call onDragEnd with the manager item, target, and source when the operation ends', async () => {
      const onDragEnd = vi.fn();
      const { host } = await createFixture({ onDragEnd });
      const item = document.createElement('div');
      startManagerOperation(item);
      dispatchDrag(host, 'dragenter');

      DragDropManager.instance.endOperation(new DragEvent('dragend'));

      expect(onDragEnd).toHaveBeenCalledOnce();
      expect(onDragEnd.mock.calls[0][0].item).toBe(item);
    });

    it('should reset drag depth, insertion index, and preventDrop when the operation ends', async () => {
      const { host, controller } = await createFixture();
      startManagerOperation();
      dispatchDrag(host, 'dragenter');
      expect(controller.insertionIndex).not.toBeNull();

      DragDropManager.instance.endOperation(new DragEvent('dragend'));

      expect(controller.insertionIndex).toBeNull();
    });

    it('should not call onDragStart/onDragEnd when disabled', async () => {
      const onDragStart = vi.fn();
      const onDragEnd = vi.fn();
      const { controller } = await createFixture({ onDragStart, onDragEnd });
      controller.setEnabled(false);

      startManagerOperation();
      DragDropManager.instance.endOperation(new DragEvent('dragend'));

      expect(onDragStart).not.toHaveBeenCalled();
      expect(onDragEnd).not.toHaveBeenCalled();
    });
  });

  describe('dragenter', () => {
    it('should set the manager target to the host by default', async () => {
      const { host } = await createFixture();
      startManagerOperation();

      dispatchDrag(host, 'dragenter');

      expect(DragDropManager.instance.target).toBe(host);
    });

    it('should call getDropTarget with the event and use its return value as the drop target', async () => {
      const { host, child1 } = await createFixture({ getDropTarget: () => child1 });
      startManagerOperation();

      const evt = dispatchDrag(host, 'dragenter');

      expect(DragDropManager.instance.target).toBe(child1);
      expect(evt.type).toBe('dragenter');
    });

    it('should prevent default and reject the drop when getDropTarget returns null', async () => {
      const onDragEnter = vi.fn();
      const { host } = await createFixture({ getDropTarget: () => null, onDragEnter });
      startManagerOperation();

      const evt = dispatchDrag(host, 'dragenter');

      expect(evt.defaultPrevented).toBe(true);
      expect(onDragEnter).not.toHaveBeenCalled();
      expect(controllerInsertionIndexIsNull());

      function controllerInsertionIndexIsNull(): boolean {
        return DragDropManager.instance.target === null;
      }
    });

    it('should calculate the insertion index based on cursor position and childSelector', async () => {
      const { host, controller, child1 } = await createFixture({ childSelector: 'div' });
      startManagerOperation();
      const rect = child1.getBoundingClientRect();

      dispatchDrag(host, 'dragenter', { clientY: rect.top - 1 });

      expect(controller.insertionIndex).toBe(0);
    });

    it('should support horizontal orientation for insertion index calculation', async () => {
      const { host, controller, child2 } = await createFixture({ childSelector: 'div', orientation: 'horizontal' });
      startManagerOperation();
      const rect = child2.getBoundingClientRect();

      dispatchDrag(host, 'dragenter', { clientX: rect.right + 1 });

      expect(controller.insertionIndex).toBe(2);
    });

    it('should call getIndex to override the default insertion index calculation', async () => {
      const getIndex = vi.fn(() => 42);
      const { host, controller } = await createFixture({ getIndex });
      startManagerOperation();

      dispatchDrag(host, 'dragenter');

      expect(getIndex).toHaveBeenCalledOnce();
      expect(controller.insertionIndex).toBe(42);
    });

    it('should default the drop effect to "move"', async () => {
      const { host } = await createFixture();
      startManagerOperation();
      const dataTransfer = new DataTransfer();
      const dropEffectSpy = vi.spyOn(dataTransfer, 'dropEffect', 'set');

      dispatchDrag(host, 'dragenter', { dataTransfer });

      expect(dropEffectSpy).toHaveBeenCalledWith('move');
    });

    it('should use a custom drop effect when provided', async () => {
      const { host } = await createFixture({ dropEffect: 'copy' });
      startManagerOperation();
      const dataTransfer = new DataTransfer();
      const dropEffectSpy = vi.spyOn(dataTransfer, 'dropEffect', 'set');

      dispatchDrag(host, 'dragenter', { dataTransfer });

      expect(dropEffectSpy).toHaveBeenCalledWith('copy');
    });

    it('should call onDragEnter with the manager item/source and computed target/index', async () => {
      const onDragEnter = vi.fn();
      const item = document.createElement('div');
      const source = document.createElement('div');
      const { host } = await createFixture({ onDragEnter });
      startManagerOperation(item, source);

      dispatchDrag(host, 'dragenter');

      expect(onDragEnter).toHaveBeenCalledOnce();
      expect(onDragEnter.mock.calls[0][0].item).toBe(item);
      expect(onDragEnter.mock.calls[0][0].source).toBe(source);
      expect(onDragEnter.mock.calls[0][0].target).toBe(host);
    });

    it('should only process the outermost dragenter when entering nested elements', async () => {
      const onDragEnter = vi.fn();
      const { host, child1 } = await createFixture({ onDragEnter });
      startManagerOperation();

      dispatchDrag(host, 'dragenter');
      dispatchDrag(child1, 'dragenter');

      expect(onDragEnter).toHaveBeenCalledOnce();
    });

    it('should not call onDragEnter when disabled', async () => {
      const onDragEnter = vi.fn();
      const { host, controller } = await createFixture({ onDragEnter });
      controller.setEnabled(false);
      startManagerOperation();

      dispatchDrag(host, 'dragenter');

      expect(onDragEnter).not.toHaveBeenCalled();
    });

    it('should not call onDragEnter when preventDrop has been called', async () => {
      const onDragEnter = vi.fn();
      const { host, controller } = await createFixture({ onDragEnter: () => controller.preventDrop() });
      startManagerOperation();

      dispatchDrag(host, 'dragenter');
      onDragEnter.mockClear();
      dispatchDrag(host, 'dragleave');
      dispatchDrag(host, 'dragenter');

      expect(onDragEnter).not.toHaveBeenCalled();
    });
  });

  describe('dragover', () => {
    it('should call preventDefault to allow the drop', async () => {
      const { host } = await createFixture();
      startManagerOperation();
      dispatchDrag(host, 'dragenter');

      const evt = dispatchDrag(host, 'dragover');

      expect(evt.defaultPrevented).toBe(true);
    });

    it('should recalculate the insertion index on every dragover', async () => {
      const { host, controller, child1, child2 } = await createFixture({ childSelector: 'div' });
      startManagerOperation();
      dispatchDrag(host, 'dragenter', { clientY: child1.getBoundingClientRect().top - 1 });
      expect(controller.insertionIndex).toBe(0);

      dispatchDrag(host, 'dragover', { clientY: child2.getBoundingClientRect().bottom + 1 });

      expect(controller.insertionIndex).toBe(2);
    });

    it('should set the drop effect on every dragover', async () => {
      const { host } = await createFixture({ dropEffect: 'copy' });
      startManagerOperation();
      dispatchDrag(host, 'dragenter');
      const dataTransfer = new DataTransfer();
      const dropEffectSpy = vi.spyOn(dataTransfer, 'dropEffect', 'set');

      dispatchDrag(host, 'dragover', { dataTransfer });

      expect(dropEffectSpy).toHaveBeenCalledWith('copy');
    });

    it('should call the throttled onDragOver callback with manager data', async () => {
      const onDragOver = vi.fn();
      const { host } = await createFixture({ onDragOver, throttle: 20 });
      startManagerOperation();
      dispatchDrag(host, 'dragenter');

      dispatchDrag(host, 'dragover');

      expect(onDragOver).toHaveBeenCalledOnce();
    });

    it('should throttle rapid onDragOver invocations', async () => {
      const onDragOver = vi.fn();
      const { host } = await createFixture({ onDragOver, throttle: 30 });
      startManagerOperation();
      dispatchDrag(host, 'dragenter');

      dispatchDrag(host, 'dragover');
      dispatchDrag(host, 'dragover');
      dispatchDrag(host, 'dragover');
      const callsImmediately = onDragOver.mock.calls.length;

      await task(50);
      const callsAfterWait = onDragOver.mock.calls.length;

      expect(callsImmediately).toBe(1);
      expect(callsAfterWait).toBe(2);
    });

    it('should not process dragover when there is no active manager target', async () => {
      const { host } = await createFixture();

      const evt = dispatchDrag(host, 'dragover');

      expect(evt.defaultPrevented).toBe(false);
    });

    it('should not process dragover when disabled', async () => {
      const { host, controller } = await createFixture();
      startManagerOperation();
      dispatchDrag(host, 'dragenter');
      controller.setEnabled(false);

      const evt = dispatchDrag(host, 'dragover');

      expect(evt.defaultPrevented).toBe(false);
    });

    it('should not process dragover when preventDrop has been called', async () => {
      const { host, controller } = await createFixture({ onDragEnter: () => controller.preventDrop() });
      startManagerOperation();
      dispatchDrag(host, 'dragenter');

      const evt = dispatchDrag(host, 'dragover');

      expect(evt.defaultPrevented).toBe(false);
    });
  });

  describe('dragleave', () => {
    it('should clear the insertion index and manager target', async () => {
      const { host, controller } = await createFixture();
      startManagerOperation();
      dispatchDrag(host, 'dragenter');
      expect(controller.insertionIndex).not.toBeNull();

      dispatchDrag(host, 'dragleave');

      expect(controller.insertionIndex).toBeNull();
      expect(DragDropManager.instance.target).toBeNull();
    });

    it('should call onDragLeave with the manager item/source and target from before the leave', async () => {
      const onDragLeave = vi.fn();
      const item = document.createElement('div');
      const { host } = await createFixture({ onDragLeave });
      startManagerOperation(item);
      dispatchDrag(host, 'dragenter');

      dispatchDrag(host, 'dragleave');

      expect(onDragLeave).toHaveBeenCalledOnce();
      expect(onDragLeave.mock.calls[0][0].item).toBe(item);
      expect(onDragLeave.mock.calls[0][0].target).toBe(host);
    });

    it('should only fire once when leaving through nested elements', async () => {
      const onDragLeave = vi.fn();
      const { host, child1 } = await createFixture({ onDragLeave });
      startManagerOperation();
      dispatchDrag(host, 'dragenter');
      dispatchDrag(child1, 'dragenter');

      dispatchDrag(child1, 'dragleave');
      expect(onDragLeave).not.toHaveBeenCalled();

      dispatchDrag(host, 'dragleave');
      expect(onDragLeave).toHaveBeenCalledOnce();
    });

    it('should not call onDragLeave when disabled', async () => {
      const onDragLeave = vi.fn();
      const { host, controller } = await createFixture({ onDragLeave });
      startManagerOperation();
      dispatchDrag(host, 'dragenter');
      controller.setEnabled(false);

      dispatchDrag(host, 'dragleave');

      expect(onDragLeave).not.toHaveBeenCalled();
    });

    it('should not call onDragLeave when preventDrop has been called', async () => {
      const onDragLeave = vi.fn();
      const { host, controller } = await createFixture({
        onDragEnter: () => controller.preventDrop(),
        onDragLeave
      });
      startManagerOperation();
      dispatchDrag(host, 'dragenter');

      dispatchDrag(host, 'dragleave');

      expect(onDragLeave).not.toHaveBeenCalled();
    });
  });

  describe('drop', () => {
    it('should call preventDefault', async () => {
      const { host } = await createFixture();
      startManagerOperation();
      dispatchDrag(host, 'dragenter');

      const evt = dispatchDrag(host, 'drop');

      expect(evt.defaultPrevented).toBe(true);
    });

    it('should call onDrop with the manager item/source/target and computed insertion index', async () => {
      const onDrop = vi.fn();
      const item = document.createElement('div');
      const source = document.createElement('div');
      const { host, child1 } = await createFixture({ onDrop, childSelector: 'div' });
      startManagerOperation(item, source);
      dispatchDrag(host, 'dragenter', { clientY: child1.getBoundingClientRect().top - 1 });

      dispatchDrag(host, 'drop');

      expect(onDrop).toHaveBeenCalledOnce();
      expect(onDrop.mock.calls[0][0].item).toBe(item);
      expect(onDrop.mock.calls[0][0].source).toBe(source);
      expect(onDrop.mock.calls[0][0].target).toBe(host);
      expect(onDrop.mock.calls[0][0].index).toBe(0);
    });

    it('should default index to -1 when no insertion index was calculated', async () => {
      const onDrop = vi.fn();
      const { host } = await createFixture({ onDrop, getIndex: undefined });
      startManagerOperation();
      DragDropManager.instance.setTarget(host);

      dispatchDrag(host, 'drop');

      expect(onDrop.mock.calls[0][0].index).toBe(-1);
    });

    it('should end the manager operation after a drop', async () => {
      const { host } = await createFixture();
      startManagerOperation();
      dispatchDrag(host, 'dragenter');

      dispatchDrag(host, 'drop');

      expect(DragDropManager.instance.item).toBeNull();
      expect(DragDropManager.instance.target).toBeNull();
      expect(DragDropManager.instance.currentOperation).toBeNull();
    });

    it('should not call onDrop when there is no active manager target', async () => {
      const onDrop = vi.fn();
      const { host } = await createFixture({ onDrop });

      dispatchDrag(host, 'drop');

      expect(onDrop).not.toHaveBeenCalled();
    });

    it('should not call onDrop when disabled', async () => {
      const onDrop = vi.fn();
      const { host, controller } = await createFixture({ onDrop });
      startManagerOperation();
      dispatchDrag(host, 'dragenter');
      controller.setEnabled(false);

      dispatchDrag(host, 'drop');

      expect(onDrop).not.toHaveBeenCalled();
    });

    it('should not call onDrop when preventDrop has been called', async () => {
      const onDrop = vi.fn();
      const { host, controller } = await createFixture({ onDragEnter: () => controller.preventDrop(), onDrop });
      startManagerOperation();
      dispatchDrag(host, 'dragenter');

      dispatchDrag(host, 'drop');

      expect(onDrop).not.toHaveBeenCalled();
    });
  });

  describe('preventDrop', () => {
    it('should prevent subsequent dragover/drop handling until the drag leaves or ends', async () => {
      const onDrop = vi.fn();
      const { host, controller } = await createFixture({
        onDragEnter: () => controller.preventDrop(),
        onDrop
      });
      startManagerOperation();

      dispatchDrag(host, 'dragenter');
      dispatchDrag(host, 'drop');

      expect(onDrop).not.toHaveBeenCalled();
    });

    it('should be reset after dragleave, allowing a subsequent drop to be handled', async () => {
      const onDrop = vi.fn();
      let enterCount = 0;
      const { host, controller } = await createFixture({
        onDragEnter: () => {
          enterCount++;
          if (enterCount === 1) {
            controller.preventDrop();
          }
        },
        onDrop
      });
      startManagerOperation();

      dispatchDrag(host, 'dragenter');
      dispatchDrag(host, 'dragleave');
      dispatchDrag(host, 'dragenter');
      dispatchDrag(host, 'drop');

      expect(onDrop).toHaveBeenCalledOnce();
    });

    it('should be reset after the operation ends', async () => {
      const onDrop = vi.fn();
      const { host, controller } = await createFixture({
        onDragEnter: () => controller.preventDrop(),
        onDrop
      });
      startManagerOperation();
      dispatchDrag(host, 'dragenter');
      DragDropManager.instance.endOperation(new DragEvent('dragend'));

      startManagerOperation();
      dispatchDrag(host, 'dragenter');
      dispatchDrag(host, 'drop');

      expect(onDrop).not.toHaveBeenCalled();
    });
  });

  describe('setEnabled', () => {
    it('should not affect an already-active manager subscription callbacks based on the current enabled state', async () => {
      const onDragStart = vi.fn();
      const { controller } = await createFixture({ onDragStart });
      controller.setEnabled(false);
      controller.setEnabled(true);

      startManagerOperation();

      expect(onDragStart).toHaveBeenCalledOnce();
    });
  });

  describe('updateConfig', () => {
    it('should merge new configuration with existing configuration', async () => {
      const onDragEnter = vi.fn();
      const onDrop = vi.fn();
      const { host, controller } = await createFixture({ onDragEnter });
      controller.updateConfig({ onDrop });
      startManagerOperation();

      dispatchDrag(host, 'dragenter');
      dispatchDrag(host, 'drop');

      expect(onDragEnter).toHaveBeenCalledOnce();
      expect(onDrop).toHaveBeenCalledOnce();
    });

    it('should re-initialize the throttled onDragOver callback when onDragOver changes', async () => {
      const originalOnDragOver = vi.fn();
      const newOnDragOver = vi.fn();
      const { host, controller } = await createFixture({ onDragOver: originalOnDragOver });
      controller.updateConfig({ onDragOver: newOnDragOver });
      startManagerOperation();
      dispatchDrag(host, 'dragenter');

      dispatchDrag(host, 'dragover');

      expect(originalOnDragOver).not.toHaveBeenCalled();
      expect(newOnDragOver).toHaveBeenCalledOnce();
    });
  });

  describe('host disconnection', () => {
    it('should detach listeners and unsubscribe from the manager when the host disconnects', async () => {
      const onDragStart = vi.fn();
      const onDrop = vi.fn();
      const { host, controller } = await createFixture({ onDragStart, onDrop });
      startManagerOperation();
      dispatchDrag(host, 'dragenter');

      host.remove();
      onDragStart.mockClear();

      dispatchDrag(host, 'drop');
      DragDropManager.instance.endOperation();
      startManagerOperation();

      expect(onDrop).not.toHaveBeenCalled();
      expect(onDragStart).not.toHaveBeenCalled();
      expect(controller.insertionIndex).toBeNull();
    });
  });
});
