import { IStateLayerComponent } from '@tylertech/forge';
import { removeElement } from '@tylertech/forge-core';
import { tick, timer } from '@tylertech/forge-testing';
import { clearState, defineSplitViewComponent, getCursor, getHandleIcon, getPixelDimension, getSplitViewPanelSibling, handleBoundariesDuringResize, initState, ISplitViewComponent, ISplitViewPanelAdapter, ISplitViewPanelComponent, ISplitViewPanelState, keyboardResize, parseSize, pointerResize, setState, SplitViewPanelComponent, SPLIT_VIEW_PANEL_CONSTANTS } from '@tylertech/forge/split-view';

interface ITestContext {
  context: ITestSplitViewPanelContext;
}

interface ITestSplitViewPanelContext {
  component: ISplitViewPanelComponent;
  panels: ISplitViewPanelComponent[];
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

describe('SplitViewPanelComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineSplitViewComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should instantiate component instance', function(this: ITestContext) {
    this.context = setupTestContext(true);
    expect(this.context.component.isConnected).toBeTrue();
  });

  describe('properties', function(this: ITestContext) {
    it('should not be resizable by default', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.resizable).toBe('off');
    });
    
    it('should not be 200 pixels by default', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.size).toBe(200);
    });
    
    it('should have min set to 0 by default', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.min).toBe(0);
    });
    
    it('should not set max by default', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.max).toBeUndefined();
    });
    
    it('should have an accessible label by default', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.accessibleLabel).toBe('Split view panel');
    });
    
    it('should be open by default', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.open).toBeTrue();
    });
    
    it('should not set disabled by default', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.disabled).toBeUndefined();
    });
    
    it('should not set allow close by default', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.allowClose).toBeUndefined();
    });
    
    it('should not set auto close by default', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.autoClose).toBeUndefined();
    });
    
    it('should not set auto close threshold by default', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.autoCloseThreshold).toBeUndefined();
    });
  });

  describe('attributes', function(this: ITestContext) {
    it('should set resizable', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute('resizable', 'end');
      expect(this.context.component.resizable).toBe('end');
      this.context.component.setAttribute('resizable', 'start');
      expect(this.context.component.resizable).toBe('start');
    });

    it('should set size', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute('size', '50%');
      expect(this.context.component.size).toBe('50%');
    });

    it('should set min', function(this: ITestContext) {
      const min = '100';
      this.context = setupTestContext();
      this.context.component.setAttribute('min', min);
      expect(this.context.component.min).toBe(min);
    });

    it('should set max', function(this: ITestContext) {
      const max = '400';
      this.context = setupTestContext();
      this.context.component.setAttribute('max', max);
      expect(this.context.component.max).toBe(max);
      this.context.component.removeAttribute('max');
      expect(this.context.component.max).toBeUndefined();
    });

    it('should set accessible label', function(this: ITestContext) {
      this.context = setupTestContext();
      const accessibleLabel = 'test';
      this.context.component.setAttribute('accessible-label', accessibleLabel);
      expect(this.context.component.accessibleLabel).toBe(accessibleLabel);
    });

    it('should set open', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute('open', 'false');
      expect(this.context.component.open).toBeFalse();
    });

    it('should set disabled', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute('disabled', 'true');
      expect(this.context.component.disabled).toBeTrue();
      this.context.component.removeAttribute('disabled');
      expect(this.context.component.disabled).toBeUndefined();
    });

    it('should set allow close', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute('allow-close', 'true');
      expect(this.context.component.allowClose).toBeTrue();
      this.context.component.removeAttribute('allow-close');
      expect(this.context.component.allowClose).toBeUndefined();
    });

    it('should set auto close', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute('auto-close', 'true');
      expect(this.context.component.autoClose).toBeTrue();
      this.context.component.removeAttribute('auto-close');
      expect(this.context.component.autoClose).toBeUndefined();
    });

    it('should set auto close threshold', function(this: ITestContext) {
      const autoCloseThreshold = 10;
      this.context = setupTestContext();
      this.context.component.setAttribute('auto-close-threshold', autoCloseThreshold.toString());
      expect(this.context.component.autoCloseThreshold).toBe(autoCloseThreshold);
      this.context.component.removeAttribute('auto-close-threshold');
      expect(this.context.component.autoCloseThreshold).toBeUndefined();
    });
  });

  describe('methods', function(this: ITestContext) {
    it('should get content size', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const contentSize = this.context.getPart('content')!.clientWidth;
      expect(this.context.component.getContentSize()).toBe(contentSize);
    });

    it('should get collapsible size', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const contentSize = this.context.getPart('content')!.clientWidth;
      expect(this.context.component.getCollapsibleSize()).toBe(contentSize);
      const min = 100;
      this.context.component.min = min;
      expect(this.context.component.getCollapsibleSize()).toBe(contentSize - min);
    });

    it('should set content size', function(this: ITestContext) {
      this.context = setupTestContext(true, 1, 1);
      const contentSize = 300;
      this.context.component.setContentSize(contentSize)
      expect(this.context.getPart('content')!.clientWidth).toBe(contentSize);
    });

    it('should set orientation', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.update({orientation: 'vertical'})
      expect(this.context.getPart('root')!.getAttribute(SPLIT_VIEW_PANEL_CONSTANTS.attributes.ORIENTATION)).toBe('vertical');
    });

    it('should update accessibility', async function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      const availableSpace = this.context.component.getContentSize() + this.context.panels[1].getContentSize();
      this.context.component.setContentSize(availableSpace / 2);
      this.context.component.update({ accessibility: true });
      expect(this.context.getPart('handle')!.getAttribute('aria-valuenow')).toBe('50.00');
    });
  });

  describe('keyboard interaction', function(this: ITestContext) {
    it('should do nothing if disabled', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      this.context.component.disabled = true;
      this.context.keyEvent('keydown', 'Enter');
      expect(this.context.component.open).toBeTrue();

      const size = 200;
      this.context.component.size = size
      this.context.keyEvent('keydown', 'Home');
      expect(this.context.component.getContentSize()).toBe(size);

      this.context.component.size = size;
      this.context.component.max = 500;
      this.context.keyEvent('keydown', 'End');
      expect(this.context.component.getContentSize()).toBe(size);
    });

    it('should close panel on enter key down when closing is allowed', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      this.context.component.allowClose = true;
      this.context.keyEvent('keydown', 'Enter');
      expect(this.context.component.open).toBeFalse();
    });

    it('should minimize panel on home key down', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      this.context.keyEvent('keydown', 'Home');
      expect(this.context.component.getContentSize()).toBe(this.context.component.min as number);
    });

    it('should maximize panel on end key down', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      this.context.component.max = 500;
      this.context.keyEvent('keydown', 'End');
      expect(this.context.component.getContentSize()).toBe(this.context.component.max);
    });

    it('should do nothing when closing is disabled on enter key down', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      this.context.component.allowClose = false;
      this.context.keyEvent('keydown', 'Enter');
      expect(this.context.component.open).toBeTrue();
    });

    describe('resizable end', function(this: ITestContext) {
      it('should increase size one pixel when right arrow key is pressed', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.component.resizable = 'end';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowRight');
        expect(this.context.component.getContentSize()).toBe(startSize + 1);
      });

      it('should increase size ten pixels when right arrow key is pressed with shift', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.component.resizable = 'end';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowRight', true);
        expect(this.context.component.getContentSize()).toBe(startSize + 10);
      });

      it('should decrease size one pixel when left arrow key is pressed', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.component.resizable = 'end';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowLeft');
        expect(this.context.component.getContentSize()).toBe(startSize - 1);
      });

      it('should decrease size ten pixels when left arrow key is pressed with shift', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.component.resizable = 'end';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowLeft', true);
        expect(this.context.component.getContentSize()).toBe(startSize - 10);
      });

      it('should do nothing when orientation is horizontal and up or down arrow key is pressed', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.component.resizable = 'end';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowUp', true);
        expect(this.context.component.getContentSize()).toBe(startSize);
        this.context.keyEvent('keydown', 'ArrowDown', true);
        expect(this.context.component.getContentSize()).toBe(startSize);
      });

      it('should increase size one pixel when orientation is vertical and down arrow key is pressed', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.resizable = 'end';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowDown');
        expect(this.context.component.getContentSize()).toBe(startSize + 1);
      });

      it('should increase size one pixel when orientation is vertical and down arrow key is pressed with shift', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.resizable = 'end';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowDown', true);
        expect(this.context.component.getContentSize()).toBe(startSize + 10);
      });

      it('should decrease size one pixel when orientation is vertical and up arrow key is pressed', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.resizable = 'end';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowUp');
        expect(this.context.component.getContentSize()).toBe(startSize - 1);
      });

      it('should decrease size one pixel when orientation is vertical and up arrow key is pressed with shift', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.resizable = 'end';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowUp', true);
        expect(this.context.component.getContentSize()).toBe(startSize - 10);
      });

      it('should do nothing when orientation is vertical and left or right arrow key is pressed', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.resizable = 'end';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowRight', true);
        expect(this.context.component.getContentSize()).toBe(startSize);
        this.context.keyEvent('keydown', 'ArrowLeft', true);
        expect(this.context.component.getContentSize()).toBe(startSize);
      });
    });

    describe('resizable start', function(this: ITestContext) {
      it('should increase size one pixel when left arrow key is pressed', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.component.resizable = 'start';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowLeft');
        expect(this.context.component.getContentSize()).toBe(startSize + 1);
      });

      it('should increase size ten pixels when left arrow key is pressed with shift', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.component.resizable = 'start';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowLeft', true);
        expect(this.context.component.getContentSize()).toBe(startSize + 10);
      });

      it('should decrease size one pixel when right arrow key is pressed', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.component.resizable = 'start';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowRight');
        expect(this.context.component.getContentSize()).toBe(startSize - 1);
      });

      it('should decrease size ten pixels when right arrow key is pressed with shift', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.component.resizable = 'start';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowRight', true);
        expect(this.context.component.getContentSize()).toBe(startSize - 10);
      });

      it('should do nothing when orientation is horizontal and up or down arrow key is pressed', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.component.resizable = 'start';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowUp', true);
        expect(this.context.component.getContentSize()).toBe(startSize);
        this.context.keyEvent('keydown', 'ArrowDown', true);
        expect(this.context.component.getContentSize()).toBe(startSize);
      });

      it('should increase size one pixel when orientation is vertical and up arrow key is pressed', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.resizable = 'start';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowUp');
        expect(this.context.component.getContentSize()).toBe(startSize + 1);
      });

      it('should increase size one pixel when orientation is vertical and up arrow key is pressed with shift', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.resizable = 'start';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowUp', true);
        expect(this.context.component.getContentSize()).toBe(startSize + 10);
      });

      it('should decrease size one pixel when orientation is vertical and down arrow key is pressed', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.resizable = 'start';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowDown');
        expect(this.context.component.getContentSize()).toBe(startSize - 1);
      });

      it('should decrease size one pixel when orientation is vertical and down arrow key is pressed with shift', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.resizable = 'start';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowDown', true);
        expect(this.context.component.getContentSize()).toBe(startSize - 10);
      });

      it('should do nothing when orientation is vertical and left or right arrow key is pressed', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.resizable = 'start';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowRight', true);
        expect(this.context.component.getContentSize()).toBe(startSize);
        this.context.keyEvent('keydown', 'ArrowLeft', true);
        expect(this.context.component.getContentSize()).toBe(startSize);
      });
    });

    it('should do nothing when resizable is off and an arrow key is pressed', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'off';
      const startSize = this.context.component.getContentSize();
      this.context.keyEvent('keydown', 'ArrowRight', true);
      expect(this.context.component.getContentSize()).toBe(startSize);
      this.context.keyEvent('keydown', 'ArrowRight', true);
      expect(this.context.component.getContentSize()).toBe(startSize);
      this.context.keyEvent('keydown', 'ArrowUp', true);
      expect(this.context.component.getContentSize()).toBe(startSize);
      this.context.keyEvent('keydown', 'ArrowDown', true);
      expect(this.context.component.getContentSize()).toBe(startSize);
    });
  });

  describe('pointer interaction', function(this: ITestContext) {
    it('should focus handle on pointer down', async function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      this.context.pointerEvent('pointerdown', 0, 0);
      const focusedElement = this.context.component.shadowRoot!.activeElement;
      expect(focusedElement).toBe(this.context.getPart('handle'));
    });

    it('should set grabbed value on pointer down', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      this.context.pointerEvent('pointerdown', 0, 0);
      const handleGrabbed = this.context.getPart('handle')!.getAttribute('aria-grabbed');
      expect(handleGrabbed).toBe('true');
    });

    it('should set horizontal overlay cursor on pointer down', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      this.context.pointerEvent('pointerdown', 0, 0);
      const overlayCursor = this.context.getOverlay()?.style.getPropertyValue('cursor');
      expect(overlayCursor).toBe(getCursor('horizontal'));
    });

    it('should set vertical overlay cursor on pointer down', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.parent.orientation = 'vertical';
      this.context.component.resizable = 'start';
      this.context.pointerEvent('pointerdown', 0, 0);
      const overlayCursor = this.context.getOverlay()?.style.getPropertyValue('cursor');
      expect(overlayCursor).toBe(getCursor('vertical'));
    });

    it('should set grabbed value on pointer up', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      this.context.pointerEvent('pointerdown', 0, 0);
      this.context.pointerEvent('pointerup', 0, 0, true);
      const handleGrabbed = this.context.getPart('handle')!.getAttribute('aria-grabbed');
      expect(handleGrabbed).toBe('false');
    });

    it('should do nothing on pointer down if disabled', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      this.context.component.disabled = true;
      const spy = jasmine.createSpy('resize start');
      this.context.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE_START, spy);
      this.context.pointerEvent('pointerdown', 0, 0);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should do nothing on pointer up if disabled', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      this.context.component.disabled = true;
      const spy = jasmine.createSpy('resize end');
      this.context.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE_END, spy);
      this.context.pointerEvent('pointerup', 0, 0, true);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should do nothing on pointer move if disabled', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      const startSize = this.context.component.getContentSize();
      this.context.pointerEvent('pointerdown', 200, 0);
      this.context.component.disabled = true;
      this.context.pointerEvent('pointermove', 210, 0, true, 1);
      expect(this.context.component.getContentSize()).toBe(startSize);
    });

    it('should set grabbed to false on pointer move with no buttons pressed', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      this.context.pointerEvent('pointerdown', 0, 0);
      this.context.pointerEvent('pointermove', 10, 0, true);
      const handleGrabbed = this.context.getPart('handle')!.getAttribute('aria-grabbed');
      expect(handleGrabbed).toBe('false');
    });

    it('should append overlay on pointer down', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      this.context.pointerEvent('pointerdown', 0, 0);
      expect(this.context.getOverlay()).toBeDefined();
    });

   it('should remove overlay on pointer up', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      this.context.pointerEvent('pointerdown', 0, 0);
      this.context.pointerEvent('pointerup', 0, 0, true);
      expect(this.context.getOverlay()).toBeNull();
    });

    describe('resizable end', function(this: ITestContext) {
      it('should increase in size when the pointer moves to the right', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.component.resizable = 'end';
        const startSize = this.context.component.getContentSize();
        const delta = 10;
        this.context.pointerEvent('pointerdown', 200, 0);
        this.context.pointerEvent('pointermove', 200 + delta, 0, true, 1);
        expect(this.context.component.getContentSize()).toBe(startSize + delta);
      });

      it('should decrease in size when the pointer moves to the left', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.component.resizable = 'end';
        const startSize = this.context.component.getContentSize();
        const delta = -10;
        this.context.pointerEvent('pointerdown', 200, 0);
        this.context.pointerEvent('pointermove', 200 + delta, 0, true, 1);
        expect(this.context.component.getContentSize()).toBe(startSize + delta);
      });

      it('should do nothing when orientation is horizontal and the pointer moves up or down', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.component.resizable = 'end';
        const startSize = this.context.component.getContentSize();
        const delta = 10;
        this.context.pointerEvent('pointerdown', 200, 200);
        this.context.pointerEvent('pointermove', 200, 200 + delta, true, 1);
        expect(this.context.component.getContentSize()).toBe(startSize);
        this.context.pointerEvent('pointermove', 200, 200 - delta, true, 1);
        expect(this.context.component.getContentSize()).toBe(startSize);
      });

      it('should increase in size when orientation is vertical and the pointer moves down', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.resizable = 'end';
        const startSize = this.context.component.getContentSize();
        const delta = 10;
        this.context.pointerEvent('pointerdown', 0, 200);
        this.context.pointerEvent('pointermove', 0, 200 + delta, true, 1);
        expect(this.context.component.getContentSize()).toBe(startSize + delta);
      });

      it('should decrease in size when orientation is vertical and the pointer moves up', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.resizable = 'end';
        const startSize = this.context.component.getContentSize();
        const delta = -10;
        this.context.pointerEvent('pointerdown', 0, 200);
        this.context.pointerEvent('pointermove', 0, 200 + delta, true, 1);
        expect(this.context.component.getContentSize()).toBe(startSize + delta);
      });

      it('should do nothing when orientation is vertical and the pointer moves left or right', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.resizable = 'end';
        const startSize = this.context.component.getContentSize();
        const delta = 10;
        this.context.pointerEvent('pointerdown', 200, 200);
        this.context.pointerEvent('pointermove', 200 + delta, 200, true, 1);
        expect(this.context.component.getContentSize()).toBe(startSize);
        this.context.pointerEvent('pointermove', 200 - delta, 200, true, 1);
        expect(this.context.component.getContentSize()).toBe(startSize);
      });
    });

    describe('resizable start', function(this: ITestContext) {
      it('should increase in size when the pointer moves to the left', function(this: ITestContext) {
        this.context = setupTestContext(true, 1, 1);
        this.context.component.resizable = 'start';
        const startSize = this.context.component.getContentSize();
        const delta = 10;
        this.context.pointerEvent('pointerdown', 200, 0);
        this.context.pointerEvent('pointermove', 200 - delta, 0, true, 1);
        expect(this.context.component.getContentSize()).toBe(startSize + delta);
      });

      it('should decrease in size when the pointer moves to the right', function(this: ITestContext) {
        this.context = setupTestContext(true, 1, 1);
        this.context.component.resizable = 'start';
        const startSize = this.context.component.getContentSize();
        const delta = -10;
        this.context.pointerEvent('pointerdown', 200, 0);
        this.context.pointerEvent('pointermove', 200 - delta, 0, true, 1);
        expect(this.context.component.getContentSize()).toBe(startSize + delta);
      });

      it('should do nothing when orientation is horizontal and the pointer moves up or down', function(this: ITestContext) {
        this.context = setupTestContext(true, 1, 1);
        this.context.component.resizable = 'start';
        const startSize = this.context.component.getContentSize();
        const delta = 10;
        this.context.pointerEvent('pointerdown', 200, 200);
        this.context.pointerEvent('pointermove', 200, 200 + delta, true, 1);
        expect(this.context.component.getContentSize()).toBe(startSize);
        this.context.pointerEvent('pointermove', 200, 200 - delta, true, 1);
        expect(this.context.component.getContentSize()).toBe(startSize);
      });

      it('should increase in size when orientation is vertical and the pointer moves up', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.resizable = 'start';
        const startSize = this.context.component.getContentSize();
        const delta = 10;
        this.context.pointerEvent('pointerdown', 0, 200);
        this.context.pointerEvent('pointermove', 0, 200 + delta, true, 1);
        expect(this.context.component.getContentSize()).toBe(startSize - delta);
      });

      it('should decrease in size when orientation is vertical and the pointer moves down', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.resizable = 'start';
        const startSize = this.context.component.getContentSize();
        const delta = -10;
        this.context.pointerEvent('pointerdown', 0, 200);
        this.context.pointerEvent('pointermove', 0, 200 + delta, true, 1);
        expect(this.context.component.getContentSize()).toBe(startSize - delta);
      });

      it('should do nothing when orientation is vertical and the pointer moves left or right', function(this: ITestContext) {
        this.context = setupTestContext(true, 1, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.resizable = 'start';
        const startSize = this.context.component.getContentSize();
        const delta = 10;
        this.context.pointerEvent('pointerdown', 200, 200);
        this.context.pointerEvent('pointermove', 200 + delta, 200, true, 1);
        expect(this.context.component.getContentSize()).toBe(startSize);
        this.context.pointerEvent('pointermove', 200 - delta, 200, true, 1);
        expect(this.context.component.getContentSize()).toBe(startSize);
      });
    });
  });

  describe('events', function(this: ITestContext) {
    it('should emit will resize event before resizing', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      this.context.component.size = 200;
      const spy = jasmine.createSpy('will resize');
      this.context.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.WILL_RESIZE, spy);
      this.context.keyEvent('keydown', 'ArrowRight');
      expect(spy).toHaveBeenCalled();
    });

    it('should will resize event to be cancelled', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      const size = 200;
      this.context.component.resizable = 'end';
      this.context.component.size = size;
      this.context.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.WILL_RESIZE, evt => {
        evt.preventDefault();
      });
      this.context.keyEvent('keydown', 'ArrowRight');
      expect(this.context.component.getContentSize()).toBe(size);
    });

    it('should emit resize start event on arrow key down', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      const spy = jasmine.createSpy('resize start');
      this.context.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE_START, spy);
      this.context.keyEvent('keydown', 'ArrowRight');
      expect(spy).toHaveBeenCalled();
    });

    it('should emit resize start event on pointer down', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      const spy = jasmine.createSpy('resize start');
      this.context.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE_START, spy);
      this.context.pointerEvent('pointerdown', 0, 0);
      expect(spy).toHaveBeenCalled();
    });

    it('should emit resize end event on arrow key up', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      const spy = jasmine.createSpy('resize end');
      this.context.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE_END, spy);
      this.context.keyEvent('keydown', 'ArrowRight');
      this.context.keyEvent('keyup', 'ArrowRight');
      expect(spy).toHaveBeenCalled();
    });

    it('should emit resize end event on pointer up', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      const spy = jasmine.createSpy('resize end');
      this.context.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE_END, spy);
      this.context.pointerEvent('pointerdown', 0, 0);
      this.context.pointerEvent('pointerup', 0, 0, true);
      expect(spy).toHaveBeenCalled();
    });

    it('should emit resize event on arrow key down', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      const startSize = this.context.component.getContentSize();
      const spy = jasmine.createSpy('resize');
      this.context.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE, spy);
      this.context.keyEvent('keydown', 'ArrowRight');
      expect(spy).toHaveBeenCalledOnceWith(jasmine.objectContaining({detail: startSize + 1}));
      this.context.keyEvent('keydown', 'ArrowLeft');
      expect(spy).toHaveBeenCalledWith(jasmine.objectContaining({detail: startSize}));
    });

    it('should emit resize event on pointer move', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      const startSize = this.context.component.getContentSize();
      const spy = jasmine.createSpy('resize');
      this.context.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE, spy);
      this.context.pointerEvent('pointerdown', 0, 0);
      const delta = 10;
      this.context.pointerEvent('pointermove', delta, 0, true, 1);
      expect(spy).toHaveBeenCalledOnceWith(jasmine.objectContaining({detail: startSize + delta}));
    });

    it('should emit will close event before closing', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.resizable = 'end';
      const spy = jasmine.createSpy('will close');
      this.context.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.WILL_CLOSE, spy);
      this.context.component.open = false;
      expect(spy).toHaveBeenCalled();
    });

    it('should allow will close event to be cancelled', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.resizable = 'end';
      this.context.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.WILL_CLOSE, evt => {
        evt.preventDefault();
      });
      this.context.component.open = false;
      expect(this.context.component.open).toBeTrue();
    });

    it('should emit will open event before opening', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.resizable = 'end';
      this.context.component.open = false;
      this.context.append();
      const spy = jasmine.createSpy('will open');
      this.context.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.WILL_OPEN, spy);
      this.context.component.open = true;
      expect(spy).toHaveBeenCalled();
    });

    it('should allow will open event to be cancelled', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.resizable = 'end';
      this.context.component.open = false;
      this.context.append();
      this.context.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.WILL_OPEN, evt => {
        evt.preventDefault();
      });
      this.context.component.open = true;
      expect(this.context.component.open).toBeFalse();
    });

    it('should emit did close event after the close animation completes', async function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      const spy = jasmine.createSpy('did close');
      this.context.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.DID_CLOSE, spy);
      this.context.component.open = false;
      this.context.getPart('root')!.dispatchEvent(new TransitionEvent('animationend'));
      await tick();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should emit did open event after the open animation completes', async function(this: ITestContext) {
      this.context = setupTestContext(false, 1);
      this.context.component.resizable = 'end';
      this.context.component.open = false;
      this.context.getPart('root')?.classList.add(SPLIT_VIEW_PANEL_CONSTANTS.classes.CLOSED)
      this.context.append();
      const spy = jasmine.createSpy('did open');
      this.context.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.DID_OPEN, spy);
      this.context.component.open = true;
      this.context.getPart('root')!.dispatchEvent(new TransitionEvent('animationend'));
      await tick();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('resize', function(this: ITestContext) {
    it('should resize sibling', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      const sibling = this.context.panels[1];
      const startSize = sibling.getContentSize();
      this.context.keyEvent('keydown', 'ArrowRight', true);
      expect(sibling.getContentSize()).toBe(startSize - 10);
    });

    it('should not resize sibling under sibling min', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      const sibling = this.context.panels[1];
      const startSize = sibling.getContentSize();
      sibling.min = startSize;
      this.context.keyEvent('keydown', 'ArrowRight', true);
      expect(sibling.getContentSize()).toBe(startSize);
    });

    it('should not resize resizable sibling over sibling max', function(this: ITestContext) {
      this.context = setupTestContext(true, 2);
      this.context.component.resizable = 'end';
      const sibling = this.context.panels[1];
      sibling.resizable = 'end';
      const startSize = sibling.getContentSize();
      sibling.max = startSize;
      this.context.keyEvent('keydown', 'ArrowLeft', true);
      expect(sibling.getContentSize()).toBe(startSize);
    });

    it('should close when size is equal to or under auto size threshold and auto close is enabled', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      this.context.component.autoClose = true;
      this.context.component.size = 10;
      this.context.keyEvent('keydown', 'ArrowLeft', true);
      this.context.keyEvent('keyup', 'ArrowLeft');
      expect(this.context.component.open).toBe(false);
    });

    it('should resize to fit under max', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      this.context.component.size = 400;
      const max = 300;
      this.context.component.max = max;
      expect(this.context.component.getContentSize()).toBe(max);
    });

    it('should resize to fit over min', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      this.context.component.size = 300;
      const min = 400;
      this.context.component.min = min;
      expect(this.context.component.getContentSize()).toBe(min);
    });

    it('should activate ripple when max size is reached', async function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      this.context.component.size = 200;
      this.context.component.max = 205;
      const spy = spyOn(this.context.getStateLayer(), 'playAnimation');
      this.context.keyEvent('keydown', 'ArrowRight', true);
      this.context.keyEvent('keyup', 'ArrowRight');
      this.context.component.size = 200;
      this.context.pointerEvent('pointerdown', 0, 0);
      this.context.pointerEvent('pointermove', 10, 0, true, 1);
      await timer(SPLIT_VIEW_PANEL_CONSTANTS.numbers.STATE_LAYER_ACTIVATION_WAIT);
      expect(spy).toHaveBeenCalledTimes(2);
    });

    it('should activate ripple when min size is reached', async function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.resizable = 'end';
      this.context.component.size = 5;
      const spy = spyOn(this.context.getStateLayer(), 'playAnimation');
      this.context.keyEvent('keydown', 'ArrowLeft', true);
      this.context.keyEvent('keyup', 'ArrowLeft');
      this.context.component.size = 5;
      this.context.pointerEvent('pointerdown', 10, 0);
      this.context.pointerEvent('pointermove', 0, 0, true, 1);
      await timer(SPLIT_VIEW_PANEL_CONSTANTS.numbers.STATE_LAYER_ACTIVATION_WAIT);
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  describe('utils', function(this: ITestContext) {
    describe('state', function(this: ITestContext) {
      it('should init state', function(this: ITestContext) {
        this.context = setupTestContext();
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

      it('should set state', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        let state = initState();
        this.context.component.resizable = 'end';
        state.resizable = 'end';
        this.context.component.parentElement?.style.setProperty('width', '400px');
        state = setState(this.context.adapter, state);

        const currentSize = this.context.component.getContentSize();
        const expected: ISplitViewPanelState = {
          orientation: 'horizontal',
          resizable: 'end',
          currentSize,
          startSize: currentSize,
          availableSpace: this.context.adapter.getAvailableSpace('horizontal', 'end'),
          siblingSize: this.context.adapter.getSiblingContentSize(),
          arrowKeyHeld: false,
          keyboardDelta: 0,
          isAtMin: false,
          isAtMax: false,
          min: 0
        };
        expect(state).toEqual(expected);
      });

      it('should clear state', function(this: ITestContext) {
        this.context = setupTestContext();
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

    describe('resize', function(this: ITestContext) {
      it('should not resize when start point or start size is undefined', function(this: ITestContext) {
        this.context = setupTestContext();
        const pointerEvt = new PointerEvent('pointermove');
        let state = initState();
        expect(pointerResize(this.context.adapter, pointerEvt, state)).toBeFalse();
        expect(keyboardResize(this.context.adapter, 0, state)).toBeFalse();
      });

      describe('handle boundaries during resize', function(this: ITestContext) {
        it('should return false if current size is missing', function(this: ITestContext) {
          this.context = setupTestContext();
          const state = initState();
          expect(handleBoundariesDuringResize(this.context.adapter, state)).toBeFalse();
        });

        it('should return false and set isAtMin to false if isAtMin is true and the panel is larger than min', function(this: ITestContext) {
          this.context = setupTestContext();
          const state = initState();
          state.currentSize = 200;
          state.min = 150;
          state.isAtMin = true;
          expect(handleBoundariesDuringResize(this.context.adapter, state)).toBeFalse();
          expect(state.isAtMin).toBeFalse();
        });

        it('should return false and set isAtMax to false if isAtMax is true and the panel is smaller than max', function(this: ITestContext) {
          this.context = setupTestContext();
          const state = initState();
          state.currentSize = 200;
          state.max = 250;
          state.isAtMax = true;
          expect(handleBoundariesDuringResize(this.context.adapter, state)).toBeFalse();
          expect(state.isAtMax).toBeFalse();
        });
      });
    });

    describe('cursor', function(this: ITestContext) {
      describe('horizontal', function(this: ITestContext) {
        it('should return col-resize cursor when not at min or max', function(this: ITestContext) {
          this.context = setupTestContext();
          expect(getCursor('horizontal', {resizable: 'end', boundary: 'none'})).toBe('col-resize');
          expect(getCursor('horizontal', {resizable: 'start', boundary: 'none'})).toBe('col-resize');
        });

        it('should return correct cursor when at min', function(this: ITestContext) {
          this.context = setupTestContext();
          expect(getCursor('horizontal', {resizable: 'end', boundary: 'min'})).toBe('e-resize');
          expect(getCursor('horizontal', {resizable: 'start', boundary: 'min'})).toBe('w-resize');
        });

        it('should return correct cursor when at max', function(this: ITestContext) {
          this.context = setupTestContext();
          expect(getCursor('horizontal', {resizable: 'end', boundary: 'max'})).toBe('w-resize');
          expect(getCursor('horizontal', {resizable: 'start', boundary: 'max'})).toBe('e-resize');
        });
      });

      describe('vertical', function(this: ITestContext) {
        it('should return row-resize cursor when not at min or max', function(this: ITestContext) {
          this.context = setupTestContext();
          expect(getCursor('vertical', {resizable: 'end', boundary: 'none'})).toBe('row-resize');
          expect(getCursor('vertical', {resizable: 'start', boundary: 'none'})).toBe('row-resize');
        });

        it('should return correct cursor when at min', function(this: ITestContext) {
          this.context = setupTestContext();
          expect(getCursor('vertical', {resizable: 'end', boundary: 'min'})).toBe('s-resize');
          expect(getCursor('vertical', {resizable: 'start', boundary: 'min'})).toBe('n-resize');
        });

        it('should return correct cursor when at max', function(this: ITestContext) {
          this.context = setupTestContext();
          expect(getCursor('vertical', {resizable: 'end', boundary: 'max'})).toBe('n-resize');
          expect(getCursor('vertical', {resizable: 'start', boundary: 'max'})).toBe('s-resize');
        });
      });
    });

    it('should get handle icon', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(getHandleIcon('horizontal')).toBe('drag_vertical_variant');
      expect(getHandleIcon('vertical')).toBe('drag_handle');
    });

    describe('parse size', function(this: ITestContext) {
      it('should parse a number value', function(this: ITestContext) {
        this.context = setupTestContext();
        expect(parseSize(200)).toEqual({amount: 200, unit: 'px'});
      });
  
      it('should parse a unitless string', function(this: ITestContext) {
        this.context = setupTestContext();
        expect(parseSize('200')).toEqual({amount: 200, unit: 'px'});
        expect(parseSize('200.5')).toEqual({amount: 200.5, unit: 'px'});
      });
  
      it('should parse a pixel string', function(this: ITestContext) {
        this.context = setupTestContext();
        expect(parseSize('200px')).toEqual({amount: 200, unit: 'px'});
        expect(parseSize('200PX')).toEqual({amount: 200, unit: 'px'});
        expect(parseSize('200 px')).toEqual({amount: 200, unit: 'px'});
        expect(parseSize('200.5px')).toEqual({amount: 200.5, unit: 'px'});
      });
  
      it('should parse a percentage string', function(this: ITestContext) {
        this.context = setupTestContext();
        expect(parseSize('200%')).toEqual({amount: 200, unit: '%'});
        expect(parseSize('200 %')).toEqual({amount: 200, unit: '%'});
        expect(parseSize('200.5%')).toEqual({amount: 200.5, unit: '%'});
      });
  
      it('should return an amount of -1 if the value is not a number', function(this: ITestContext) {
        this.context = setupTestContext();
        expect(parseSize('value').amount).toBe(-1);
        expect(parseSize('valuepx').amount).toBe(-1);
        expect(parseSize('value%').amount).toBe(-1);
      });
  
      it('should return an empty string unit if the unit is invalid', function(this: ITestContext) {
        this.context = setupTestContext();
        expect(parseSize('value').unit).toBe('');
        expect(parseSize('valuepx').unit).toBe('');
        expect(parseSize('value%').unit).toBe('');
      });
    });

    it('should get pixel dimension', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(getPixelDimension(200, 0)).toBe(200);
      expect(getPixelDimension('200', 0)).toBe(200);
      expect(getPixelDimension('200px', 0)).toBe(200);
      expect(getPixelDimension('50%', 100)).toBe(50);
    });

    describe('get panel sibling', function(this: ITestContext) {
      it('should return the next panel sibling when resizable is end', function(this: ITestContext) {
        this.context = setupTestContext(false, 1);
        this.context.component.resizable = 'end';
        const sibling = getSplitViewPanelSibling(this.context.component);
        expect(sibling).toBe(this.context.panels[1] as SplitViewPanelComponent);
      });
  
      it('should return the previous panel sibling when resizable is start', function(this: ITestContext) {
        this.context = setupTestContext(false, 1, 1);
        this.context.component.resizable = 'start';
        const sibling = getSplitViewPanelSibling(this.context.component);
        expect(sibling).toBe(this.context.panels[0] as SplitViewPanelComponent);
      });
  
      it('should return undefined when resizable is off', function(this: ITestContext) {
        this.context = setupTestContext(false);
        this.context.component.resizable = 'off';
        const sibling = getSplitViewPanelSibling(this.context.component);
        expect(sibling).toBeUndefined();
      });
  
      it('should skip closed panels', function(this: ITestContext) {
        this.context = setupTestContext(false, 2);
        this.context.component.resizable = 'end';
        this.context.panels[1].open = false;
        const sibling = getSplitViewPanelSibling(this.context.component);
        expect(sibling).toBe(this.context.panels[2] as SplitViewPanelComponent);
      });
  
      it('should skip non-panel siblings', function(this: ITestContext) {
        this.context = setupTestContext(false);
        this.context.component.resizable = 'end';
        this.context.component.parentElement?.appendChild(document.createElement('div'));
        const sibling = getSplitViewPanelSibling(this.context.component);
        expect(sibling).toBeUndefined();
      });
  
      it('should return undefined if no panel siblings', function(this: ITestContext) {
        this.context = setupTestContext(false);
        this.context.component.resizable = 'end';
        const sibling = getSplitViewPanelSibling(this.context.component);
        expect(sibling).toBeUndefined();
      });
    });
  });

  describe('parent properties', function(this: ITestContext) {
    it('should apply parent disabled', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.resizable = 'end';
      this.context.parent.disabled = true;
      let rootHasDisabledClass = this.context.getPart('root')!.classList.contains(SPLIT_VIEW_PANEL_CONSTANTS.classes.DISABLED);
      expect(rootHasDisabledClass).toBeTrue();
      this.context.parent.disabled = false;
      rootHasDisabledClass = this.context.getPart('root')!.classList.contains(SPLIT_VIEW_PANEL_CONSTANTS.classes.DISABLED);
      expect(rootHasDisabledClass).toBeFalse();
    });

    it('should apply parent allow close', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.resizable = 'end';
      this.context.parent.allowClose = false;
      this.context.keyEvent('keydown', 'Enter');
      expect(this.context.component.open).toBeTrue();
      this.context.parent.allowClose = true;
      this.context.keyEvent('keydown', 'Enter');
      expect(this.context.component.open).toBeFalse();
    });

    it('should apply parent auto close', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.resizable = 'end';
      this.context.component.size = 5;
      this.context.keyEvent('keydown', 'ArrowLeft', true);
      this.context.parent.autoClose = true;
      expect(this.context.component.open).toBeFalse();
      this.context.component.size = 5;
      this.context.component.open = true;
      this.context.parent.autoClose = false;
      this.context.keyEvent('keydown', 'ArrowLeft', true);
      expect(this.context.component.open).toBeTrue();
    });

    it('should apply parent auto close threshold', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.parent.autoCloseThreshold = 10;
      this.context.component.resizable = 'end';
      this.context.component.size = 15;
      this.context.keyEvent('keydown', 'ArrowLeft', true);
      this.context.parent.autoClose = true;
      expect(this.context.component.open).toBeFalse();
    });
  });

  function setupTestContext(append = false, numberOfSiblings = 0, position = 0): ITestSplitViewPanelContext {
    const fixture = document.createElement('forge-split-view');
    fixture.style.width = '600px'
    fixture.style.height = '600px';
    fixture.id = 'split-view-panel-test-fixture';

    const panels = new Array(numberOfSiblings + 1).fill(undefined).map(() => {
      const panel = document.createElement('forge-split-view-panel');
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
        const event = new KeyboardEvent(type, {key, shiftKey})
        handle.dispatchEvent(event);
      },
      pointerEvent: (type: string, clientX: number, clientY: number, onDocument = false, buttons = 0) => {
        const target = onDocument ? document : component.shadowRoot!.querySelector('[part=handle]') as Element;
        const event = new PointerEvent(type, {clientX, clientY, buttons});
        target.dispatchEvent(event);
      },
      append: () => document.body.appendChild(fixture),
      destroy: () => removeElement(fixture)
    }
  }
});
