import { describe, it, expect, vi, afterEach } from 'vitest';
import { task, frame } from '../../core/utils/utils.js';
import {
  clearState,
  getCursor,
  getHandleIcon,
  getPixelDimension,
  getSplitViewPanelSibling,
  handleBoundariesDuringResize,
  initState,
  keyboardResize,
  parseSize,
  pointerResize,
  setState,
  SPLIT_VIEW_PANEL_CONSTANTS
} from '../index.js';
import type { ISplitViewComponent, ISplitViewPanelAdapter, ISplitViewPanelComponent, ISplitViewPanelState } from '../index.js';
import type { IStateLayerComponent } from '../../state-layer/index.js';

import '../split-view-panel/split-view-panel.js';
import '../split-view/split-view.js';

interface SplitViewPanelCoreInternal {
  _adapter: ISplitViewPanelAdapter;
}

type SplitViewPanelComponentInternal = ISplitViewPanelComponent & {
  _core: SplitViewPanelCoreInternal;
};

interface ISplitViewPanelHarness {
  component: SplitViewPanelComponentInternal;
  panels: SplitViewPanelComponentInternal[];
  parent: ISplitViewComponent;
  adapter: ISplitViewPanelAdapter;
  getPart(part: string): HTMLElement | null;
  getStateLayer(): IStateLayerComponent;
  getOverlay(): HTMLElement | null;
  keyEvent(type: string, key: string, shiftKey?: boolean): void;
  pointerEvent(type: string, clientX: number, clientY: number, onDocument?: boolean, buttons?: number): void;
  append(): void;
  destroy(): void;
}

describe('SplitViewPanelComponent', () => {
  afterEach(() => {
    const fixtures = document.querySelectorAll('#split-view-panel-test-fixture');
    fixtures.forEach(el => el.remove());
    const overlays = document.querySelectorAll(`.${SPLIT_VIEW_PANEL_CONSTANTS.classes.OVERLAY}`);
    overlays.forEach(el => el.remove());
  });

  it('should instantiate component instance', () => {
    const harness = setupTestContext(true);
    expect(harness.component.isConnected).toBe(true);
  });

  describe('properties', () => {
    it('should not be resizable by default', () => {
      const harness = setupTestContext();
      expect(harness.component.resizable).toBe('off');
    });

    it('should be 200 pixels by default', () => {
      const harness = setupTestContext();
      expect(harness.component.size).toBe(200);
    });

    it('should have min set to 0 by default', () => {
      const harness = setupTestContext();
      expect(harness.component.min).toBe(0);
    });

    it('should not set max by default', () => {
      const harness = setupTestContext();
      expect(harness.component.max).toBeUndefined();
    });

    it('should have an accessible label by default', () => {
      const harness = setupTestContext();
      expect(harness.component.accessibleLabel).toBe('Split view panel');
    });

    it('should be open by default', () => {
      const harness = setupTestContext();
      expect(harness.component.open).toBe(true);
    });

    it('should not set disabled by default', () => {
      const harness = setupTestContext();
      expect(harness.component.disabled).toBeUndefined();
    });

    it('should not set allow close by default', () => {
      const harness = setupTestContext();
      expect(harness.component.allowClose).toBeUndefined();
    });

    it('should not set auto close by default', () => {
      const harness = setupTestContext();
      expect(harness.component.autoClose).toBeUndefined();
    });

    it('should not set auto close threshold by default', () => {
      const harness = setupTestContext();
      expect(harness.component.autoCloseThreshold).toBeUndefined();
    });
  });

  describe('attributes', () => {
    it('should set resizable', () => {
      const harness = setupTestContext();
      harness.component.setAttribute('resizable', 'end');
      expect(harness.component.resizable).toBe('end');
      harness.component.setAttribute('resizable', 'start');
      expect(harness.component.resizable).toBe('start');
    });

    it('should set size', () => {
      const harness = setupTestContext();
      harness.component.setAttribute('size', '50%');
      expect(harness.component.size).toBe('50%');
    });

    it('should set min', () => {
      const min = '100';
      const harness = setupTestContext();
      harness.component.setAttribute('min', min);
      expect(harness.component.min).toBe(min);
    });

    it('should set max', () => {
      const max = '400';
      const harness = setupTestContext();
      harness.component.setAttribute('max', max);
      expect(harness.component.max).toBe(max);
      harness.component.removeAttribute('max');
      expect(harness.component.max).toBeUndefined();
    });

    it('should set accessible label', () => {
      const harness = setupTestContext();
      const accessibleLabel = 'test';
      harness.component.setAttribute('accessible-label', accessibleLabel);
      expect(harness.component.accessibleLabel).toBe(accessibleLabel);
    });

    it('should set open', () => {
      const harness = setupTestContext();
      harness.component.setAttribute('open', 'false');
      expect(harness.component.open).toBe(false);
    });

    it('should set disabled', () => {
      const harness = setupTestContext();
      harness.component.setAttribute('disabled', 'true');
      expect(harness.component.disabled).toBe(true);
      harness.component.removeAttribute('disabled');
      expect(harness.component.disabled).toBeUndefined();
    });

    it('should set allow close', () => {
      const harness = setupTestContext();
      harness.component.setAttribute('allow-close', 'true');
      expect(harness.component.allowClose).toBe(true);
      harness.component.removeAttribute('allow-close');
      expect(harness.component.allowClose).toBeUndefined();
    });

    it('should set auto close', () => {
      const harness = setupTestContext();
      harness.component.setAttribute('auto-close', 'true');
      expect(harness.component.autoClose).toBe(true);
      harness.component.removeAttribute('auto-close');
      expect(harness.component.autoClose).toBeUndefined();
    });

    it('should set auto close threshold', () => {
      const autoCloseThreshold = 10;
      const harness = setupTestContext();
      harness.component.setAttribute('auto-close-threshold', autoCloseThreshold.toString());
      expect(harness.component.autoCloseThreshold).toBe(autoCloseThreshold);
      harness.component.removeAttribute('auto-close-threshold');
      expect(harness.component.autoCloseThreshold).toBeUndefined();
    });
  });

  describe('methods', () => {
    it('should get content size', () => {
      const harness = setupTestContext(true);
      const contentSize = harness.getPart('content')!.clientWidth;
      expect(harness.component.getContentSize()).toBe(contentSize);
    });

    it('should get collapsible size', () => {
      const harness = setupTestContext(true);
      const contentSize = harness.getPart('content')!.clientWidth;
      expect(harness.component.getCollapsibleSize()).toBe(contentSize);
      const min = 100;
      harness.component.min = min;
      expect(harness.component.getCollapsibleSize()).toBe(contentSize - min);
    });

    it('should set content size', () => {
      const harness = setupTestContext(true, 1, 1);
      const contentSize = 300;
      harness.component.setContentSize(contentSize);
      expect(harness.getPart('content')!.clientWidth).toBe(contentSize);
    });

    it('should set orientation', () => {
      const harness = setupTestContext();
      harness.component.update({ orientation: 'vertical' });
      expect(harness.getPart('root')!.getAttribute(SPLIT_VIEW_PANEL_CONSTANTS.attributes.ORIENTATION)).toBe('vertical');
    });

    it('should update accessibility', async () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      const availableSpace = harness.component.getContentSize() + harness.panels[1].getContentSize();
      harness.component.setContentSize(availableSpace / 2);
      harness.component.update({ accessibility: true });
      expect(harness.getPart('handle')!.getAttribute('aria-valuenow')).toBe('50.00');
    });
  });

  describe('keyboard interaction', () => {
    it('should do nothing if disabled', () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      harness.component.disabled = true;
      harness.keyEvent('keydown', 'Enter');
      expect(harness.component.open).toBe(true);

      const size = 200;
      harness.component.size = size;
      harness.keyEvent('keydown', 'Home');
      expect(harness.component.getContentSize()).toBe(size);

      harness.component.size = size;
      harness.component.max = 500;
      harness.keyEvent('keydown', 'End');
      expect(harness.component.getContentSize()).toBe(size);
    });

    it('should close panel on enter key down when closing is allowed', () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      harness.component.allowClose = true;
      harness.keyEvent('keydown', 'Enter');
      expect(harness.component.open).toBe(false);
    });

    it('should minimize panel on home key down', () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      harness.keyEvent('keydown', 'Home');
      expect(harness.component.getContentSize()).toBe(harness.component.min as number);
    });

    it('should maximize panel on end key down', () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      harness.component.max = 500;
      harness.keyEvent('keydown', 'End');
      expect(harness.component.getContentSize()).toBe(harness.component.max);
    });

    it('should do nothing when closing is disabled on enter key down', () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      harness.component.allowClose = false;
      harness.keyEvent('keydown', 'Enter');
      expect(harness.component.open).toBe(true);
    });

    describe('resizable end', () => {
      it('should increase size one pixel when right arrow key is pressed', () => {
        const harness = setupTestContext(true, 1);
        harness.component.resizable = 'end';
        const startSize = harness.component.getContentSize();
        harness.keyEvent('keydown', 'ArrowRight');
        expect(harness.component.getContentSize()).toBe(startSize + 1);
      });

      it('should increase size ten pixels when right arrow key is pressed with shift', () => {
        const harness = setupTestContext(true, 1);
        harness.component.resizable = 'end';
        const startSize = harness.component.getContentSize();
        harness.keyEvent('keydown', 'ArrowRight', true);
        expect(harness.component.getContentSize()).toBe(startSize + 10);
      });

      it('should decrease size one pixel when left arrow key is pressed', () => {
        const harness = setupTestContext(true, 1);
        harness.component.resizable = 'end';
        const startSize = harness.component.getContentSize();
        harness.keyEvent('keydown', 'ArrowLeft');
        expect(harness.component.getContentSize()).toBe(startSize - 1);
      });

      it('should decrease size ten pixels when left arrow key is pressed with shift', () => {
        const harness = setupTestContext(true, 1);
        harness.component.resizable = 'end';
        const startSize = harness.component.getContentSize();
        harness.keyEvent('keydown', 'ArrowLeft', true);
        expect(harness.component.getContentSize()).toBe(startSize - 10);
      });

      it('should do nothing when orientation is horizontal and up or down arrow key is pressed', () => {
        const harness = setupTestContext(true, 1);
        harness.component.resizable = 'end';
        const startSize = harness.component.getContentSize();
        harness.keyEvent('keydown', 'ArrowUp', true);
        expect(harness.component.getContentSize()).toBe(startSize);
        harness.keyEvent('keydown', 'ArrowDown', true);
        expect(harness.component.getContentSize()).toBe(startSize);
      });

      it('should increase size one pixel when orientation is vertical and down arrow key is pressed', () => {
        const harness = setupTestContext(true, 1);
        harness.parent.orientation = 'vertical';
        harness.component.resizable = 'end';
        const startSize = harness.component.getContentSize();
        harness.keyEvent('keydown', 'ArrowDown');
        expect(harness.component.getContentSize()).toBe(startSize + 1);
      });

      it('should increase size ten pixels when orientation is vertical and down arrow key is pressed with shift', () => {
        const harness = setupTestContext(true, 1);
        harness.parent.orientation = 'vertical';
        harness.component.resizable = 'end';
        const startSize = harness.component.getContentSize();
        harness.keyEvent('keydown', 'ArrowDown', true);
        expect(harness.component.getContentSize()).toBe(startSize + 10);
      });

      it('should decrease size one pixel when orientation is vertical and up arrow key is pressed', () => {
        const harness = setupTestContext(true, 1);
        harness.parent.orientation = 'vertical';
        harness.component.resizable = 'end';
        const startSize = harness.component.getContentSize();
        harness.keyEvent('keydown', 'ArrowUp');
        expect(harness.component.getContentSize()).toBe(startSize - 1);
      });

      it('should decrease size ten pixels when orientation is vertical and up arrow key is pressed with shift', () => {
        const harness = setupTestContext(true, 1);
        harness.parent.orientation = 'vertical';
        harness.component.resizable = 'end';
        const startSize = harness.component.getContentSize();
        harness.keyEvent('keydown', 'ArrowUp', true);
        expect(harness.component.getContentSize()).toBe(startSize - 10);
      });

      it('should do nothing when orientation is vertical and left or right arrow key is pressed', () => {
        const harness = setupTestContext(true, 1);
        harness.parent.orientation = 'vertical';
        harness.component.resizable = 'end';
        const startSize = harness.component.getContentSize();
        harness.keyEvent('keydown', 'ArrowRight', true);
        expect(harness.component.getContentSize()).toBe(startSize);
        harness.keyEvent('keydown', 'ArrowLeft', true);
        expect(harness.component.getContentSize()).toBe(startSize);
      });
    });

    describe('resizable start', () => {
      it('should increase size one pixel when left arrow key is pressed', () => {
        const harness = setupTestContext(true, 1);
        harness.component.resizable = 'start';
        const startSize = harness.component.getContentSize();
        harness.keyEvent('keydown', 'ArrowLeft');
        expect(harness.component.getContentSize()).toBe(startSize + 1);
      });

      it('should increase size ten pixels when left arrow key is pressed with shift', () => {
        const harness = setupTestContext(true, 1);
        harness.component.resizable = 'start';
        const startSize = harness.component.getContentSize();
        harness.keyEvent('keydown', 'ArrowLeft', true);
        expect(harness.component.getContentSize()).toBe(startSize + 10);
      });

      it('should decrease size one pixel when right arrow key is pressed', () => {
        const harness = setupTestContext(true, 1);
        harness.component.resizable = 'start';
        const startSize = harness.component.getContentSize();
        harness.keyEvent('keydown', 'ArrowRight');
        expect(harness.component.getContentSize()).toBe(startSize - 1);
      });

      it('should decrease size ten pixels when right arrow key is pressed with shift', () => {
        const harness = setupTestContext(true, 1);
        harness.component.resizable = 'start';
        const startSize = harness.component.getContentSize();
        harness.keyEvent('keydown', 'ArrowRight', true);
        expect(harness.component.getContentSize()).toBe(startSize - 10);
      });

      it('should do nothing when orientation is horizontal and up or down arrow key is pressed', () => {
        const harness = setupTestContext(true, 1);
        harness.component.resizable = 'start';
        const startSize = harness.component.getContentSize();
        harness.keyEvent('keydown', 'ArrowUp', true);
        expect(harness.component.getContentSize()).toBe(startSize);
        harness.keyEvent('keydown', 'ArrowDown', true);
        expect(harness.component.getContentSize()).toBe(startSize);
      });

      it('should increase size one pixel when orientation is vertical and up arrow key is pressed', () => {
        const harness = setupTestContext(true, 1);
        harness.parent.orientation = 'vertical';
        harness.component.resizable = 'start';
        const startSize = harness.component.getContentSize();
        harness.keyEvent('keydown', 'ArrowUp');
        expect(harness.component.getContentSize()).toBe(startSize + 1);
      });

      it('should increase size ten pixels when orientation is vertical and up arrow key is pressed with shift', () => {
        const harness = setupTestContext(true, 1);
        harness.parent.orientation = 'vertical';
        harness.component.resizable = 'start';
        const startSize = harness.component.getContentSize();
        harness.keyEvent('keydown', 'ArrowUp', true);
        expect(harness.component.getContentSize()).toBe(startSize + 10);
      });

      it('should decrease size one pixel when orientation is vertical and down arrow key is pressed', () => {
        const harness = setupTestContext(true, 1);
        harness.parent.orientation = 'vertical';
        harness.component.resizable = 'start';
        const startSize = harness.component.getContentSize();
        harness.keyEvent('keydown', 'ArrowDown');
        expect(harness.component.getContentSize()).toBe(startSize - 1);
      });

      it('should decrease size ten pixels when orientation is vertical and down arrow key is pressed with shift', () => {
        const harness = setupTestContext(true, 1);
        harness.parent.orientation = 'vertical';
        harness.component.resizable = 'start';
        const startSize = harness.component.getContentSize();
        harness.keyEvent('keydown', 'ArrowDown', true);
        expect(harness.component.getContentSize()).toBe(startSize - 10);
      });

      it('should do nothing when orientation is vertical and left or right arrow key is pressed', () => {
        const harness = setupTestContext(true, 1);
        harness.parent.orientation = 'vertical';
        harness.component.resizable = 'start';
        const startSize = harness.component.getContentSize();
        harness.keyEvent('keydown', 'ArrowRight', true);
        expect(harness.component.getContentSize()).toBe(startSize);
        harness.keyEvent('keydown', 'ArrowLeft', true);
        expect(harness.component.getContentSize()).toBe(startSize);
      });
    });

    it('should do nothing when resizable is off and an arrow key is pressed', () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'off';
      const startSize = harness.component.getContentSize();
      harness.keyEvent('keydown', 'ArrowRight', true);
      expect(harness.component.getContentSize()).toBe(startSize);
      harness.keyEvent('keydown', 'ArrowRight', true);
      expect(harness.component.getContentSize()).toBe(startSize);
      harness.keyEvent('keydown', 'ArrowUp', true);
      expect(harness.component.getContentSize()).toBe(startSize);
      harness.keyEvent('keydown', 'ArrowDown', true);
      expect(harness.component.getContentSize()).toBe(startSize);
    });
  });

  describe('pointer interaction', () => {
    it('should focus handle on pointer down', async () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      harness.pointerEvent('pointerdown', 0, 0);
      const focusedElement = harness.component.shadowRoot!.activeElement;
      expect(focusedElement).toBe(harness.getPart('handle'));
    });

    it('should set grabbed value on pointer down', () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      harness.pointerEvent('pointerdown', 0, 0);
      const handleGrabbed = harness.getPart('handle')!.getAttribute('aria-grabbed');
      expect(handleGrabbed).toBe('true');
    });

    it('should set horizontal overlay cursor on pointer down', () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      harness.pointerEvent('pointerdown', 0, 0);
      const overlayCursor = harness.getOverlay()?.style.getPropertyValue('cursor');
      expect(overlayCursor).toBe(getCursor('horizontal'));
    });

    it('should set vertical overlay cursor on pointer down', () => {
      const harness = setupTestContext(true, 1);
      harness.parent.orientation = 'vertical';
      harness.component.resizable = 'start';
      harness.pointerEvent('pointerdown', 0, 0);
      const overlayCursor = harness.getOverlay()?.style.getPropertyValue('cursor');
      expect(overlayCursor).toBe(getCursor('vertical'));
    });

    it('should set grabbed value on pointer up', () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      harness.pointerEvent('pointerdown', 0, 0);
      harness.pointerEvent('pointerup', 0, 0, true);
      const handleGrabbed = harness.getPart('handle')!.getAttribute('aria-grabbed');
      expect(handleGrabbed).toBe('false');
    });

    it('should do nothing on pointer down if disabled', () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      harness.component.disabled = true;
      const resizeStartSpy = vi.fn();
      harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE_START, resizeStartSpy);
      harness.pointerEvent('pointerdown', 0, 0);
      expect(resizeStartSpy).not.toHaveBeenCalled();
    });

    it('should do nothing on pointer up if disabled', () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      harness.component.disabled = true;
      const resizeEndSpy = vi.fn();
      harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE_END, resizeEndSpy);
      harness.pointerEvent('pointerup', 0, 0, true);
      expect(resizeEndSpy).not.toHaveBeenCalled();
    });

    it('should do nothing on pointer move if disabled', () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      const startSize = harness.component.getContentSize();
      harness.pointerEvent('pointerdown', 200, 0);
      harness.component.disabled = true;
      harness.pointerEvent('pointermove', 210, 0, true, 1);
      expect(harness.component.getContentSize()).toBe(startSize);
    });

    it('should set grabbed to false on pointer move with no buttons pressed', () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      harness.pointerEvent('pointerdown', 0, 0);
      harness.pointerEvent('pointermove', 10, 0, true);
      const handleGrabbed = harness.getPart('handle')!.getAttribute('aria-grabbed');
      expect(handleGrabbed).toBe('false');
    });

    it('should append overlay on pointer down', () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      harness.pointerEvent('pointerdown', 0, 0);
      expect(harness.getOverlay()).not.toBeNull();
    });

    it('should remove overlay on pointer up', () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      harness.pointerEvent('pointerdown', 0, 0);
      harness.pointerEvent('pointerup', 0, 0, true);
      expect(harness.getOverlay()).toBeNull();
    });

    describe('resizable end', () => {
      it('should increase in size when the pointer moves to the right', () => {
        const harness = setupTestContext(true, 1);
        harness.component.resizable = 'end';
        const startSize = harness.component.getContentSize();
        const delta = 10;
        harness.pointerEvent('pointerdown', 200, 0);
        harness.pointerEvent('pointermove', 200 + delta, 0, true, 1);
        expect(harness.component.getContentSize()).toBe(startSize + delta);
      });

      it('should decrease in size when the pointer moves to the left', () => {
        const harness = setupTestContext(true, 1);
        harness.component.resizable = 'end';
        const startSize = harness.component.getContentSize();
        const delta = -10;
        harness.pointerEvent('pointerdown', 200, 0);
        harness.pointerEvent('pointermove', 200 + delta, 0, true, 1);
        expect(harness.component.getContentSize()).toBe(startSize + delta);
      });

      it('should do nothing when orientation is horizontal and the pointer moves up or down', () => {
        const harness = setupTestContext(true, 1);
        harness.component.resizable = 'end';
        const startSize = harness.component.getContentSize();
        const delta = 10;
        harness.pointerEvent('pointerdown', 200, 200);
        harness.pointerEvent('pointermove', 200, 200 + delta, true, 1);
        expect(harness.component.getContentSize()).toBe(startSize);
        harness.pointerEvent('pointermove', 200, 200 - delta, true, 1);
        expect(harness.component.getContentSize()).toBe(startSize);
      });

      it('should increase in size when orientation is vertical and the pointer moves down', () => {
        const harness = setupTestContext(true, 1);
        harness.parent.orientation = 'vertical';
        harness.component.resizable = 'end';
        const startSize = harness.component.getContentSize();
        const delta = 10;
        harness.pointerEvent('pointerdown', 0, 200);
        harness.pointerEvent('pointermove', 0, 200 + delta, true, 1);
        expect(harness.component.getContentSize()).toBe(startSize + delta);
      });

      it('should decrease in size when orientation is vertical and the pointer moves up', () => {
        const harness = setupTestContext(true, 1);
        harness.parent.orientation = 'vertical';
        harness.component.resizable = 'end';
        const startSize = harness.component.getContentSize();
        const delta = -10;
        harness.pointerEvent('pointerdown', 0, 200);
        harness.pointerEvent('pointermove', 0, 200 + delta, true, 1);
        expect(harness.component.getContentSize()).toBe(startSize + delta);
      });

      it('should do nothing when orientation is vertical and the pointer moves left or right', () => {
        const harness = setupTestContext(true, 1);
        harness.parent.orientation = 'vertical';
        harness.component.resizable = 'end';
        const startSize = harness.component.getContentSize();
        const delta = 10;
        harness.pointerEvent('pointerdown', 200, 200);
        harness.pointerEvent('pointermove', 200 + delta, 200, true, 1);
        expect(harness.component.getContentSize()).toBe(startSize);
        harness.pointerEvent('pointermove', 200 - delta, 200, true, 1);
        expect(harness.component.getContentSize()).toBe(startSize);
      });
    });

    describe('resizable start', () => {
      it('should increase in size when the pointer moves to the left', () => {
        const harness = setupTestContext(true, 1, 1);
        harness.component.resizable = 'start';
        const startSize = harness.component.getContentSize();
        const delta = 10;
        harness.pointerEvent('pointerdown', 200, 0);
        harness.pointerEvent('pointermove', 200 - delta, 0, true, 1);
        expect(harness.component.getContentSize()).toBe(startSize + delta);
      });

      it('should decrease in size when the pointer moves to the right', () => {
        const harness = setupTestContext(true, 1, 1);
        harness.component.resizable = 'start';
        const startSize = harness.component.getContentSize();
        const delta = -10;
        harness.pointerEvent('pointerdown', 200, 0);
        harness.pointerEvent('pointermove', 200 - delta, 0, true, 1);
        expect(harness.component.getContentSize()).toBe(startSize + delta);
      });

      it('should do nothing when orientation is horizontal and the pointer moves up or down', () => {
        const harness = setupTestContext(true, 1, 1);
        harness.component.resizable = 'start';
        const startSize = harness.component.getContentSize();
        const delta = 10;
        harness.pointerEvent('pointerdown', 200, 200);
        harness.pointerEvent('pointermove', 200, 200 + delta, true, 1);
        expect(harness.component.getContentSize()).toBe(startSize);
        harness.pointerEvent('pointermove', 200, 200 - delta, true, 1);
        expect(harness.component.getContentSize()).toBe(startSize);
      });

      it('should increase in size when orientation is vertical and the pointer moves up', () => {
        const harness = setupTestContext(true, 1);
        harness.parent.orientation = 'vertical';
        harness.component.resizable = 'start';
        const startSize = harness.component.getContentSize();
        const delta = 10;
        harness.pointerEvent('pointerdown', 0, 200);
        harness.pointerEvent('pointermove', 0, 200 + delta, true, 1);
        expect(harness.component.getContentSize()).toBe(startSize - delta);
      });

      it('should decrease in size when orientation is vertical and the pointer moves down', () => {
        const harness = setupTestContext(true, 1);
        harness.parent.orientation = 'vertical';
        harness.component.resizable = 'start';
        const startSize = harness.component.getContentSize();
        const delta = -10;
        harness.pointerEvent('pointerdown', 0, 200);
        harness.pointerEvent('pointermove', 0, 200 + delta, true, 1);
        expect(harness.component.getContentSize()).toBe(startSize - delta);
      });

      it('should do nothing when orientation is vertical and the pointer moves left or right', () => {
        const harness = setupTestContext(true, 1, 1);
        harness.parent.orientation = 'vertical';
        harness.component.resizable = 'start';
        const startSize = harness.component.getContentSize();
        const delta = 10;
        harness.pointerEvent('pointerdown', 200, 200);
        harness.pointerEvent('pointermove', 200 + delta, 200, true, 1);
        expect(harness.component.getContentSize()).toBe(startSize);
        harness.pointerEvent('pointermove', 200 - delta, 200, true, 1);
        expect(harness.component.getContentSize()).toBe(startSize);
      });
    });
  });

  describe('events', () => {
    it('should emit will resize event before resizing', () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      harness.component.size = 200;
      const willResizeSpy = vi.fn();
      harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.WILL_RESIZE, willResizeSpy);
      harness.keyEvent('keydown', 'ArrowRight');
      expect(willResizeSpy).toHaveBeenCalled();
    });

    it('should allow will resize event to be cancelled', () => {
      const harness = setupTestContext(true, 1);
      const size = 200;
      harness.component.resizable = 'end';
      harness.component.size = size;
      harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.WILL_RESIZE, (evt: Event) => {
        evt.preventDefault();
      });
      harness.keyEvent('keydown', 'ArrowRight');
      expect(harness.component.getContentSize()).toBe(size);
    });

    it('should emit resize start event on arrow key down', () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      const resizeStartSpy = vi.fn();
      harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE_START, resizeStartSpy);
      harness.keyEvent('keydown', 'ArrowRight');
      expect(resizeStartSpy).toHaveBeenCalled();
    });

    it('should emit resize start event on pointer down', () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      const resizeStartSpy = vi.fn();
      harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE_START, resizeStartSpy);
      harness.pointerEvent('pointerdown', 0, 0);
      expect(resizeStartSpy).toHaveBeenCalled();
    });

    it('should emit resize end event on arrow key up', () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      const resizeEndSpy = vi.fn();
      harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE_END, resizeEndSpy);
      harness.keyEvent('keydown', 'ArrowRight');
      harness.keyEvent('keyup', 'ArrowRight');
      expect(resizeEndSpy).toHaveBeenCalled();
    });

    it('should emit resize end event on pointer up', () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      const resizeEndSpy = vi.fn();
      harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE_END, resizeEndSpy);
      harness.pointerEvent('pointerdown', 0, 0);
      harness.pointerEvent('pointerup', 0, 0, true);
      expect(resizeEndSpy).toHaveBeenCalled();
    });

    it('should emit resize event on arrow key down', () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      const startSize = harness.component.getContentSize();
      const resizeSpy = vi.fn();
      harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE, resizeSpy);
      harness.keyEvent('keydown', 'ArrowRight');
      expect(resizeSpy).toHaveBeenCalledOnce();
      expect(resizeSpy.mock.calls[0][0].detail).toBe(startSize + 1);
      harness.keyEvent('keydown', 'ArrowLeft');
      expect(resizeSpy.mock.calls[1][0].detail).toBe(startSize);
    });

    it('should emit resize event on pointer move', () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      const startSize = harness.component.getContentSize();
      const resizeSpy = vi.fn();
      harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE, resizeSpy);
      harness.pointerEvent('pointerdown', 0, 0);
      const delta = 10;
      harness.pointerEvent('pointermove', delta, 0, true, 1);
      expect(resizeSpy).toHaveBeenCalledOnce();
      expect(resizeSpy.mock.calls[0][0].detail).toBe(startSize + delta);
    });

    it('should emit will close event before closing', () => {
      const harness = setupTestContext(true);
      harness.component.resizable = 'end';
      const willCloseSpy = vi.fn();
      harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.WILL_CLOSE, willCloseSpy);
      harness.component.open = false;
      expect(willCloseSpy).toHaveBeenCalled();
    });

    it('should allow will close event to be cancelled', () => {
      const harness = setupTestContext(true);
      harness.component.resizable = 'end';
      harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.WILL_CLOSE, (evt: Event) => {
        evt.preventDefault();
      });
      harness.component.open = false;
      expect(harness.component.open).toBe(true);
    });

    it('should emit will open event before opening', () => {
      const harness = setupTestContext();
      harness.component.resizable = 'end';
      harness.component.open = false;
      harness.append();
      const willOpenSpy = vi.fn();
      harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.WILL_OPEN, willOpenSpy);
      harness.component.open = true;
      expect(willOpenSpy).toHaveBeenCalled();
    });

    it('should allow will open event to be cancelled', () => {
      const harness = setupTestContext();
      harness.component.resizable = 'end';
      harness.component.open = false;
      harness.append();
      harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.WILL_OPEN, (evt: Event) => {
        evt.preventDefault();
      });
      harness.component.open = true;
      expect(harness.component.open).toBe(false);
    });

    it('should emit did close event after the close animation completes', async () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      const didCloseSpy = vi.fn();
      harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.DID_CLOSE, didCloseSpy);
      harness.component.open = false;
      harness.getPart('root')!.dispatchEvent(new AnimationEvent('animationend'));
      await frame();
      expect(didCloseSpy).toHaveBeenCalledOnce();
    });

    it('should emit did open event after the open animation completes', async () => {
      const harness = setupTestContext(false, 1);
      harness.component.resizable = 'end';
      harness.component.open = false;
      harness.getPart('root')?.classList.add(SPLIT_VIEW_PANEL_CONSTANTS.classes.CLOSED);
      harness.append();
      const didOpenSpy = vi.fn();
      harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.DID_OPEN, didOpenSpy);
      harness.component.open = true;
      harness.getPart('root')!.dispatchEvent(new AnimationEvent('animationend'));
      await frame();
      expect(didOpenSpy).toHaveBeenCalledOnce();
    });
  });

  describe('resize', () => {
    it('should resize sibling', () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      const sibling = harness.panels[1];
      const startSize = sibling.getContentSize();
      harness.keyEvent('keydown', 'ArrowRight', true);
      expect(sibling.getContentSize()).toBe(startSize - 10);
    });

    it('should not resize sibling under sibling min', () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      const sibling = harness.panels[1];
      const startSize = sibling.getContentSize();
      sibling.min = startSize;
      harness.keyEvent('keydown', 'ArrowRight', true);
      expect(sibling.getContentSize()).toBe(startSize);
    });

    it('should not resize resizable sibling over sibling max', () => {
      const harness = setupTestContext(true, 2);
      harness.component.resizable = 'end';
      const sibling = harness.panels[1];
      sibling.resizable = 'end';
      const startSize = sibling.getContentSize();
      sibling.max = startSize;
      harness.keyEvent('keydown', 'ArrowLeft', true);
      expect(sibling.getContentSize()).toBe(startSize);
    });

    it('should close when size is equal to or under auto size threshold and auto close is enabled', () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      harness.component.autoClose = true;
      harness.component.size = 10;
      harness.keyEvent('keydown', 'ArrowLeft', true);
      harness.keyEvent('keyup', 'ArrowLeft');
      expect(harness.component.open).toBe(false);
    });

    it('should resize to fit under max', () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      harness.component.size = 400;
      const max = 300;
      harness.component.max = max;
      expect(harness.component.getContentSize()).toBe(max);
    });

    it('should resize to fit over min', () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      harness.component.size = 300;
      const min = 400;
      harness.component.min = min;
      expect(harness.component.getContentSize()).toBe(min);
    });

    it('should activate ripple when max size is reached', async () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      harness.component.size = 200;
      harness.component.max = 205;
      const playAnimationSpy = vi.spyOn(harness.getStateLayer(), 'playAnimation');
      harness.keyEvent('keydown', 'ArrowRight', true);
      harness.keyEvent('keyup', 'ArrowRight');
      harness.component.size = 200;
      harness.pointerEvent('pointerdown', 0, 0);
      harness.pointerEvent('pointermove', 10, 0, true, 1);
      await task(SPLIT_VIEW_PANEL_CONSTANTS.numbers.STATE_LAYER_ACTIVATION_WAIT);
      expect(playAnimationSpy).toHaveBeenCalledTimes(2);
    });

    it('should activate ripple when min size is reached', async () => {
      const harness = setupTestContext(true, 1);
      harness.component.resizable = 'end';
      harness.component.size = 5;
      const playAnimationSpy = vi.spyOn(harness.getStateLayer(), 'playAnimation');
      harness.keyEvent('keydown', 'ArrowLeft', true);
      harness.keyEvent('keyup', 'ArrowLeft');
      harness.component.size = 5;
      harness.pointerEvent('pointerdown', 10, 0);
      harness.pointerEvent('pointermove', 0, 0, true, 1);
      await task(SPLIT_VIEW_PANEL_CONSTANTS.numbers.STATE_LAYER_ACTIVATION_WAIT);
      expect(playAnimationSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('utils', () => {
    describe('state', () => {
      it('should init state', () => {
        const state = initState();
        const expected: ISplitViewPanelState = {
          orientation: 'horizontal',
          resizable: 'off',
          arrowKeyHeld: false,
          keyboardDelta: 0,
          isAtMin: false,
          isAtMax: false,
          min: 0
        };
        expect(state).toEqual(expected);
      });

      it('should set state', () => {
        const harness = setupTestContext(true, 1);
        let state = initState();
        harness.component.resizable = 'end';
        state.resizable = 'end';
        harness.component.parentElement?.style.setProperty('width', '400px');
        state = setState(harness.adapter, state);

        const currentSize = harness.component.getContentSize();
        const expected: ISplitViewPanelState = {
          orientation: 'horizontal',
          resizable: 'end',
          currentSize,
          startSize: currentSize,
          availableSpace: harness.adapter.getAvailableSpace('horizontal', 'end'),
          siblingSize: harness.adapter.getSiblingContentSize(),
          arrowKeyHeld: false,
          keyboardDelta: 0,
          isAtMin: false,
          isAtMax: false,
          min: 0
        };
        expect(state).toEqual(expected);
      });

      it('should clear state', () => {
        let state = initState();
        state.resizable = 'end';
        state.arrowKeyHeld = true;
        state.keyboardDelta = 1;
        state.isAtMin = true;
        state.isAtMax = true;
        state = clearState(state);
        const expected: ISplitViewPanelState = {
          orientation: 'horizontal',
          resizable: 'end',
          arrowKeyHeld: false,
          keyboardDelta: 0,
          isAtMin: false,
          isAtMax: false,
          min: 0
        };
        expect(state).toEqual(expected);
      });
    });

    describe('resize', () => {
      it('should not resize when start point or start size is undefined', () => {
        const harness = setupTestContext();
        const pointerEvt = new PointerEvent('pointermove');
        const state = initState();
        expect(pointerResize(harness.adapter, pointerEvt, state)).toBe(false);
        expect(keyboardResize(harness.adapter, 0, state)).toBe(false);
      });

      describe('handle boundaries during resize', () => {
        it('should return false if current size is missing', () => {
          const harness = setupTestContext();
          const state = initState();
          expect(handleBoundariesDuringResize(harness.adapter, state)).toBe(false);
        });

        it('should return false and set isAtMin to false if isAtMin is true and the panel is larger than min', () => {
          const harness = setupTestContext();
          const state = initState();
          state.currentSize = 200;
          state.min = 150;
          state.isAtMin = true;
          expect(handleBoundariesDuringResize(harness.adapter, state)).toBe(false);
          expect(state.isAtMin).toBe(false);
        });

        it('should return false and set isAtMax to false if isAtMax is true and the panel is smaller than max', () => {
          const harness = setupTestContext();
          const state = initState();
          state.currentSize = 200;
          state.max = 250;
          state.isAtMax = true;
          expect(handleBoundariesDuringResize(harness.adapter, state)).toBe(false);
          expect(state.isAtMax).toBe(false);
        });
      });
    });

    describe('cursor', () => {
      describe('horizontal', () => {
        it('should return col-resize cursor when not at min or max', () => {
          expect(getCursor('horizontal', { resizable: 'end', boundary: 'none' })).toBe('col-resize');
          expect(getCursor('horizontal', { resizable: 'start', boundary: 'none' })).toBe('col-resize');
        });

        it('should return correct cursor when at min', () => {
          expect(getCursor('horizontal', { resizable: 'end', boundary: 'min' })).toBe('e-resize');
          expect(getCursor('horizontal', { resizable: 'start', boundary: 'min' })).toBe('w-resize');
        });

        it('should return correct cursor when at max', () => {
          expect(getCursor('horizontal', { resizable: 'end', boundary: 'max' })).toBe('w-resize');
          expect(getCursor('horizontal', { resizable: 'start', boundary: 'max' })).toBe('e-resize');
        });
      });

      describe('vertical', () => {
        it('should return row-resize cursor when not at min or max', () => {
          expect(getCursor('vertical', { resizable: 'end', boundary: 'none' })).toBe('row-resize');
          expect(getCursor('vertical', { resizable: 'start', boundary: 'none' })).toBe('row-resize');
        });

        it('should return correct cursor when at min', () => {
          expect(getCursor('vertical', { resizable: 'end', boundary: 'min' })).toBe('s-resize');
          expect(getCursor('vertical', { resizable: 'start', boundary: 'min' })).toBe('n-resize');
        });

        it('should return correct cursor when at max', () => {
          expect(getCursor('vertical', { resizable: 'end', boundary: 'max' })).toBe('n-resize');
          expect(getCursor('vertical', { resizable: 'start', boundary: 'max' })).toBe('s-resize');
        });
      });
    });

    it('should get handle icon', () => {
      expect(getHandleIcon('horizontal')).toBe('drag_vertical_variant');
      expect(getHandleIcon('vertical')).toBe('drag_handle');
    });

    describe('parse size', () => {
      it('should parse a number value', () => {
        expect(parseSize(200)).toEqual({ amount: 200, unit: 'px' });
      });

      it('should parse a unitless string', () => {
        expect(parseSize('200')).toEqual({ amount: 200, unit: 'px' });
        expect(parseSize('200.5')).toEqual({ amount: 200.5, unit: 'px' });
      });

      it('should parse a pixel string', () => {
        expect(parseSize('200px')).toEqual({ amount: 200, unit: 'px' });
        expect(parseSize('200PX')).toEqual({ amount: 200, unit: 'px' });
        expect(parseSize('200 px')).toEqual({ amount: 200, unit: 'px' });
        expect(parseSize('200.5px')).toEqual({ amount: 200.5, unit: 'px' });
      });

      it('should parse a percentage string', () => {
        expect(parseSize('200%')).toEqual({ amount: 200, unit: '%' });
        expect(parseSize('200 %')).toEqual({ amount: 200, unit: '%' });
        expect(parseSize('200.5%')).toEqual({ amount: 200.5, unit: '%' });
      });

      it('should return an amount of -1 if the value is not a number', () => {
        expect(parseSize('value').amount).toBe(-1);
        expect(parseSize('valuepx').amount).toBe(-1);
        expect(parseSize('value%').amount).toBe(-1);
      });

      it('should return an empty string unit if the unit is invalid', () => {
        expect(parseSize('value').unit).toBe('');
        expect(parseSize('valuepx').unit).toBe('');
        expect(parseSize('value%').unit).toBe('');
      });
    });

    it('should get pixel dimension', () => {
      expect(getPixelDimension(200, 0)).toBe(200);
      expect(getPixelDimension('200', 0)).toBe(200);
      expect(getPixelDimension('200px', 0)).toBe(200);
      expect(getPixelDimension('50%', 100)).toBe(50);
    });

    describe('get panel sibling', () => {
      it('should return the next panel sibling when resizable is end', () => {
        const harness = setupTestContext(false, 1);
        harness.component.resizable = 'end';
        const sibling = getSplitViewPanelSibling(harness.component);
        expect(sibling).toBe(harness.panels[1]);
      });

      it('should return the previous panel sibling when resizable is start', () => {
        const harness = setupTestContext(false, 1, 1);
        harness.component.resizable = 'start';
        const sibling = getSplitViewPanelSibling(harness.component);
        expect(sibling).toBe(harness.panels[0]);
      });

      it('should return undefined when resizable is off', () => {
        const harness = setupTestContext(false);
        harness.component.resizable = 'off';
        const sibling = getSplitViewPanelSibling(harness.component);
        expect(sibling).toBeUndefined();
      });

      it('should skip closed panels', () => {
        const harness = setupTestContext(false, 2);
        harness.component.resizable = 'end';
        harness.panels[1].open = false;
        const sibling = getSplitViewPanelSibling(harness.component);
        expect(sibling).toBe(harness.panels[2]);
      });

      it('should skip non-panel siblings', () => {
        const harness = setupTestContext(false);
        harness.component.resizable = 'end';
        harness.component.parentElement?.appendChild(document.createElement('div'));
        const sibling = getSplitViewPanelSibling(harness.component);
        expect(sibling).toBeUndefined();
      });

      it('should return undefined if no panel siblings', () => {
        const harness = setupTestContext(false);
        harness.component.resizable = 'end';
        const sibling = getSplitViewPanelSibling(harness.component);
        expect(sibling).toBeUndefined();
      });
    });
  });

  describe('parent properties', () => {
    it('should apply parent disabled', () => {
      const harness = setupTestContext(true);
      harness.component.resizable = 'end';
      harness.parent.disabled = true;
      let rootHasDisabledClass = harness.getPart('root')!.classList.contains(SPLIT_VIEW_PANEL_CONSTANTS.classes.DISABLED);
      expect(rootHasDisabledClass).toBe(true);
      harness.parent.disabled = false;
      rootHasDisabledClass = harness.getPart('root')!.classList.contains(SPLIT_VIEW_PANEL_CONSTANTS.classes.DISABLED);
      expect(rootHasDisabledClass).toBe(false);
    });

    it('should apply parent allow close', () => {
      const harness = setupTestContext(true);
      harness.component.resizable = 'end';
      harness.parent.allowClose = false;
      harness.keyEvent('keydown', 'Enter');
      expect(harness.component.open).toBe(true);
      harness.parent.allowClose = true;
      harness.keyEvent('keydown', 'Enter');
      expect(harness.component.open).toBe(false);
    });

    it('should apply parent auto close', () => {
      const harness = setupTestContext(true);
      harness.component.resizable = 'end';
      harness.component.size = 5;
      harness.keyEvent('keydown', 'ArrowLeft', true);
      harness.parent.autoClose = true;
      expect(harness.component.open).toBe(false);
      harness.component.size = 5;
      harness.component.open = true;
      harness.parent.autoClose = false;
      harness.keyEvent('keydown', 'ArrowLeft', true);
      expect(harness.component.open).toBe(true);
    });

    it('should apply parent auto close threshold', () => {
      const harness = setupTestContext(true);
      harness.parent.autoCloseThreshold = 10;
      harness.component.resizable = 'end';
      harness.component.size = 15;
      harness.keyEvent('keydown', 'ArrowLeft', true);
      harness.parent.autoClose = true;
      expect(harness.component.open).toBe(false);
    });
  });

  function setupTestContext(append = false, numberOfSiblings = 0, position = 0): ISplitViewPanelHarness {
    const fixture = document.createElement('forge-split-view') as ISplitViewComponent;
    fixture.style.width = '600px';
    fixture.style.height = '600px';
    fixture.id = 'split-view-panel-test-fixture';

    const panels = new Array(numberOfSiblings + 1).fill(undefined).map(() => {
      const panel = document.createElement('forge-split-view-panel') as SplitViewPanelComponentInternal;
      fixture.appendChild(panel);
      return panel;
    });

    const component = panels[position];

    if (append) {
      document.body.appendChild(fixture);
    }

    return {
      component,
      panels,
      parent: fixture,
      adapter: component['_core']['_adapter'],
      getPart: (part: string): HTMLElement | null => component.shadowRoot!.querySelector(`[part=${part}]`),
      getStateLayer: () => component.shadowRoot!.querySelector('forge-state-layer') as IStateLayerComponent,
      getOverlay: () => document.body.querySelector(`.${SPLIT_VIEW_PANEL_CONSTANTS.classes.OVERLAY}`),
      keyEvent: (type: string, key: string, shiftKey = false) => {
        const handle = component.shadowRoot!.querySelector('[part=handle]') as Element;
        const event = new KeyboardEvent(type, { key, shiftKey });
        handle.dispatchEvent(event);
      },
      pointerEvent: (type: string, clientX: number, clientY: number, onDocument = false, buttons = 0) => {
        const target = onDocument ? document : (component.shadowRoot!.querySelector('[part=handle]') as Element);
        const event = new PointerEvent(type, { clientX, clientY, buttons });
        target.dispatchEvent(event);
      },
      append: () => document.body.appendChild(fixture),
      destroy: () => fixture.remove()
    };
  }
});
