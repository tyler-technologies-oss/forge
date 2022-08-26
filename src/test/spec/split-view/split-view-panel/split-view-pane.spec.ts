import { removeElement } from '@tylertech/forge-core';
import { tick } from '@tylertech/forge-testing';
import { defineSplitViewComponent, getCursor, ISplitViewComponent, ISplitViewPanelComponent, SPLIT_VIEW_PANEL_CONSTANTS } from '@tylertech/forge/split-view';

interface ITestContext {
  context: ITestSplitViewPanelContext;
}

interface ITestSplitViewPanelContext {
  component: ISplitViewPanelComponent;
  panels: ISplitViewPanelComponent[];
  parent: ISplitViewComponent;
  getPart(part: string): HTMLElement | null;
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

  describe('attributes', function(this: ITestContext) {
    it('should set position', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute('position', 'start');
      expect(this.context.component.position).toBe('start');
      this.context.component.setAttribute('position', 'end');
      expect(this.context.component.position).toBe('end');
    });

    it('should set size', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute('size', '50%');
      expect(this.context.component.size).toBe('50%');
    });

    it('should set min', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute('min', '100');
      expect(this.context.component.min).toBe(100);
    });

    it('should set max', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute('max', '400');
      expect(this.context.component.max).toBe(400);
      this.context.component.removeAttribute('max');
      expect(this.context.component.max).toBeUndefined();
    });

    it('should set label', function(this: ITestContext) {
      this.context = setupTestContext();
      const label = 'test';
      this.context.component.setAttribute('label', label);
      expect(this.context.component.label).toBe(label);
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
    });

    it('should set disable close', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute('disable-close', 'true');
      expect(this.context.component.disableClose).toBeTrue();
    });

    it('should set auto close', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute('auto-close', 'true');
      expect(this.context.component.autoClose).toBeTrue();
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
      this.context.component.setOrientation('vertical')
      expect(this.context.getPart('root')!.getAttribute(SPLIT_VIEW_PANEL_CONSTANTS.attributes.ORIENTATION)).toBe('vertical');
    });

    it('should update accessibility', async function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.position = 'start';
      const availableSpace = this.context.component.getContentSize() + this.context.panels[1].getContentSize();
      this.context.component.setContentSize(availableSpace / 2);
      this.context.component.updateAccessibility();
      expect(this.context.getPart('handle')!.getAttribute('aria-valuenow')).toBe('50.00');
    });
  });

  describe('keyboard interaction', function(this: ITestContext) {
    it('should do nothing if disabled', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.position = 'start';
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

    it('should close panel on enter key down', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.position = 'start';
      this.context.keyEvent('keydown', 'Enter');
      expect(this.context.component.open).toBeFalse();
    });

    it('should minimize panel on home key down', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.position = 'start';
      this.context.keyEvent('keydown', 'Home');
      expect(this.context.component.getContentSize()).toBe(this.context.component.min);
    });

    it('should maximize panel on end key down', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.position = 'start';
      this.context.component.max = 500;
      this.context.keyEvent('keydown', 'End');
      expect(this.context.component.getContentSize()).toBe(this.context.component.max);
    });

    it('should do nothing when close is disabled on enter key down', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.position = 'start';
      this.context.component.disableClose = true;
      this.context.keyEvent('keydown', 'Enter');
      expect(this.context.component.open).toBeTrue();
    });

    describe('position start', function(this: ITestContext) {
      it('should increase size one pixel when right arrow key is pressed', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.component.position = 'start';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowRight');
        expect(this.context.component.getContentSize()).toBe(startSize + 1);
      });

      it('should increase size ten pixels when right arrow key is pressed with shift', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.component.position = 'start';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowRight', true);
        expect(this.context.component.getContentSize()).toBe(startSize + 10);
      });

      it('should decrease size one pixel when left arrow key is pressed', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.component.position = 'start';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowLeft');
        expect(this.context.component.getContentSize()).toBe(startSize - 1);
      });

      it('should decrease size ten pixels when left arrow key is pressed with shift', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.component.position = 'start';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowLeft', true);
        expect(this.context.component.getContentSize()).toBe(startSize - 10);
      });

      it('should do nothing when orientation is horizontal and up or down arrow key is pressed', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.component.position = 'start';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowUp', true);
        expect(this.context.component.getContentSize()).toBe(startSize);
        this.context.keyEvent('keydown', 'ArrowDown', true);
        expect(this.context.component.getContentSize()).toBe(startSize);
      });

      it('should increase size one pixel when orientation is vertical and down arrow key is pressed', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.position = 'start';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowDown');
        expect(this.context.component.getContentSize()).toBe(startSize + 1);
      });

      it('should increase size one pixel when orientation is vertical and down arrow key is pressed with shift', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.position = 'start';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowDown', true);
        expect(this.context.component.getContentSize()).toBe(startSize + 10);
      });

      it('should decrease size one pixel when orientation is vertical and up arrow key is pressed', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.position = 'start';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowUp');
        expect(this.context.component.getContentSize()).toBe(startSize - 1);
      });

      it('should decrease size one pixel when orientation is vertical and up arrow key is pressed with shift', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.position = 'start';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowUp', true);
        expect(this.context.component.getContentSize()).toBe(startSize - 10);
      });

      it('should do nothing when orientation is vertical and left or right arrow key is pressed', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.position = 'start';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowRight', true);
        expect(this.context.component.getContentSize()).toBe(startSize);
        this.context.keyEvent('keydown', 'ArrowLeft', true);
        expect(this.context.component.getContentSize()).toBe(startSize);
      });
    });

    describe('position end', function(this: ITestContext) {
      it('should increase size one pixel when left arrow key is pressed', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.component.position = 'end';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowLeft');
        expect(this.context.component.getContentSize()).toBe(startSize + 1);
      });

      it('should increase size ten pixels when left arrow key is pressed with shift', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.component.position = 'end';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowLeft', true);
        expect(this.context.component.getContentSize()).toBe(startSize + 10);
      });

      it('should decrease size one pixel when right arrow key is pressed', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.component.position = 'end';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowRight');
        expect(this.context.component.getContentSize()).toBe(startSize - 1);
      });

      it('should decrease size ten pixels when right arrow key is pressed with shift', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.component.position = 'end';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowRight', true);
        expect(this.context.component.getContentSize()).toBe(startSize - 10);
      });

      it('should do nothing when orientation is horizontal and up or down arrow key is pressed', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.component.position = 'end';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowUp', true);
        expect(this.context.component.getContentSize()).toBe(startSize);
        this.context.keyEvent('keydown', 'ArrowDown', true);
        expect(this.context.component.getContentSize()).toBe(startSize);
      });

      it('should increase size one pixel when orientation is vertical and up arrow key is pressed', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.position = 'end';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowUp');
        expect(this.context.component.getContentSize()).toBe(startSize + 1);
      });

      it('should increase size one pixel when orientation is vertical and up arrow key is pressed with shift', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.position = 'end';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowUp', true);
        expect(this.context.component.getContentSize()).toBe(startSize + 10);
      });

      it('should decrease size one pixel when orientation is vertical and down arrow key is pressed', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.position = 'end';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowDown');
        expect(this.context.component.getContentSize()).toBe(startSize - 1);
      });

      it('should decrease size one pixel when orientation is vertical and down arrow key is pressed with shift', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.position = 'end';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowDown', true);
        expect(this.context.component.getContentSize()).toBe(startSize - 10);
      });

      it('should do nothing when orientation is vertical and left or right arrow key is pressed', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.position = 'end';
        const startSize = this.context.component.getContentSize();
        this.context.keyEvent('keydown', 'ArrowRight', true);
        expect(this.context.component.getContentSize()).toBe(startSize);
        this.context.keyEvent('keydown', 'ArrowLeft', true);
        expect(this.context.component.getContentSize()).toBe(startSize);
      });
    });

    it('should do nothing when position is default and an arrow key is pressed', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.position = 'default';
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
    it('should set grabbed value on pointer down', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.position = 'start';
      this.context.pointerEvent('pointerdown', 0, 0);
      const handleGrabbed = this.context.getPart('handle')!.getAttribute('aria-grabbed');
      expect(handleGrabbed).toBe('true');
    });

    it('should set horizontal body cursor on pointer down', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.position = 'start';
      this.context.pointerEvent('pointerdown', 0, 0);
      const documentCursor = document.body.style.getPropertyValue('cursor');
      expect(documentCursor).toBe(getCursor('horizontal'));
    });

    it('should set vertical body cursor on pointer down', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.parent.orientation = 'vertical';
      this.context.component.position = 'start';
      this.context.pointerEvent('pointerdown', 0, 0);
      const documentCursor = document.body.style.getPropertyValue('cursor');
      expect(documentCursor).toBe(getCursor('vertical'));
    });

    it('should set grabbed value on pointer up', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.position = 'start';
      this.context.pointerEvent('pointerdown', 0, 0);
      this.context.pointerEvent('pointerup', 0, 0, true);
      const handleGrabbed = this.context.getPart('handle')!.getAttribute('aria-grabbed');
      expect(handleGrabbed).toBe('false');
    });

    it('should unset horizontal body cursor on pointer down', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.position = 'start';
      this.context.pointerEvent('pointerdown', 0, 0);
      this.context.pointerEvent('pointerup', 0, 0, true);
      const documentCursor = document.body.style.getPropertyValue('cursor');
      expect(documentCursor).toBe('');
    });

    it('should unset vertical body cursor on pointer down', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.parent.orientation = 'vertical';
      this.context.component.position = 'start';
      this.context.pointerEvent('pointerdown', 0, 0);
      this.context.pointerEvent('pointerup', 0, 0, true);
      const documentCursor = document.body.style.getPropertyValue('cursor');
      expect(documentCursor).toBe('');
    });

    it('should do nothing on pointer down if disabled', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.position = 'start';
      this.context.component.disabled = true;
      const spy = jasmine.createSpy('resize start');
      this.context.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE_START, spy);
      this.context.pointerEvent('pointerdown', 0, 0);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should do nothing on pointer up if disabled', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.position = 'start';
      this.context.component.disabled = true;
      const spy = jasmine.createSpy('resize end');
      this.context.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE_END, spy);
      this.context.pointerEvent('pointerup', 0, 0, true);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should do nothing on pointer move is disabled', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.position = 'start';
      this.context.component.disabled = true;
      const startSize = this.context.component.getContentSize();
      this.context.pointerEvent('pointerdown', 200, 0);
      this.context.pointerEvent('pointermove', 210, 0, true, 1);
      expect(this.context.component.getContentSize()).toBe(startSize);
    });

    it('should set grabbed to false on pointer move with no buttons pressed', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.position = 'start';
      this.context.pointerEvent('pointerdown', 0, 0);
      this.context.pointerEvent('pointermove', 10, 0, true);
      const handleGrabbed = this.context.getPart('handle')!.getAttribute('aria-grabbed');
      expect(handleGrabbed).toBe('false');
    });

    describe('position start', function(this: ITestContext) {
      it('should increase in size when the pointer moves to the right', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.component.position = 'start';
        const startSize = this.context.component.getContentSize();
        const delta = 10;
        this.context.pointerEvent('pointerdown', 200, 0);
        this.context.pointerEvent('pointermove', 200 + delta, 0, true, 1);
        expect(this.context.component.getContentSize()).toBe(startSize + delta);
      });

      it('should decrease in size when the pointer moves to the left', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.component.position = 'start';
        const startSize = this.context.component.getContentSize();
        const delta = -10;
        this.context.pointerEvent('pointerdown', 200, 0);
        this.context.pointerEvent('pointermove', 200 + delta, 0, true, 1);
        expect(this.context.component.getContentSize()).toBe(startSize + delta);
      });

      it('should do nothing when orientation is horizontal and the pointer moves up or down', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.component.position = 'start';
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
        this.context.component.position = 'start';
        const startSize = this.context.component.getContentSize();
        const delta = 10;
        this.context.pointerEvent('pointerdown', 0, 200);
        this.context.pointerEvent('pointermove', 0, 200 + delta, true, 1);
        expect(this.context.component.getContentSize()).toBe(startSize + delta);
      });

      it('should decrease in size when orientation is vertical and the pointer moves up', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.position = 'start';
        const startSize = this.context.component.getContentSize();
        const delta = -10;
        this.context.pointerEvent('pointerdown', 0, 200);
        this.context.pointerEvent('pointermove', 0, 200 + delta, true, 1);
        expect(this.context.component.getContentSize()).toBe(startSize + delta);
      });

      it('should do nothing when orientation is vertical and the pointer moves left or right', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.position = 'start';
        const startSize = this.context.component.getContentSize();
        const delta = 10;
        this.context.pointerEvent('pointerdown', 200, 200);
        this.context.pointerEvent('pointermove', 200 + delta, 200, true, 1);
        expect(this.context.component.getContentSize()).toBe(startSize);
        this.context.pointerEvent('pointermove', 200 - delta, 200, true, 1);
        expect(this.context.component.getContentSize()).toBe(startSize);
      });
    });

    describe('position end', function(this: ITestContext) {
      it('should increase in size when the pointer moves to the left', function(this: ITestContext) {
        this.context = setupTestContext(true, 1, 1);
        this.context.component.position = 'end';
        const startSize = this.context.component.getContentSize();
        const delta = 10;
        this.context.pointerEvent('pointerdown', 200, 0);
        this.context.pointerEvent('pointermove', 200 - delta, 0, true, 1);
        expect(this.context.component.getContentSize()).toBe(startSize + delta);
      });

      it('should decrease in size when the pointer moves to the right', function(this: ITestContext) {
        this.context = setupTestContext(true, 1, 1);
        this.context.component.position = 'end';
        const startSize = this.context.component.getContentSize();
        const delta = -10;
        this.context.pointerEvent('pointerdown', 200, 0);
        this.context.pointerEvent('pointermove', 200 - delta, 0, true, 1);
        expect(this.context.component.getContentSize()).toBe(startSize + delta);
      });

      it('should do nothing when orientation is horizontal and the pointer moves up or down', function(this: ITestContext) {
        this.context = setupTestContext(true, 1, 1);
        this.context.component.position = 'end';
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
        this.context.component.position = 'end';
        const startSize = this.context.component.getContentSize();
        const delta = 10;
        this.context.pointerEvent('pointerdown', 0, 200);
        this.context.pointerEvent('pointermove', 0, 200 + delta, true, 1);
        expect(this.context.component.getContentSize()).toBe(startSize - delta);
      });

      it('should decrease in size when orientation is vertical and the pointer moves down', function(this: ITestContext) {
        this.context = setupTestContext(true, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.position = 'end';
        const startSize = this.context.component.getContentSize();
        const delta = -10;
        this.context.pointerEvent('pointerdown', 0, 200);
        this.context.pointerEvent('pointermove', 0, 200 + delta, true, 1);
        expect(this.context.component.getContentSize()).toBe(startSize - delta);
      });

      it('should do nothing when orientation is vertical and the pointer moves left or right', function(this: ITestContext) {
        this.context = setupTestContext(true, 1, 1);
        this.context.parent.orientation = 'vertical';
        this.context.component.position = 'end';
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
    it('should emit resize start event on arrow key down', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.position = 'start';
      const spy = jasmine.createSpy('resize start');
      this.context.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE_START, spy);
      this.context.keyEvent('keydown', 'ArrowRight');
      expect(spy).toHaveBeenCalled();
    });

    it('should emit resize start event on pointer down', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.position = 'start';
      const spy = jasmine.createSpy('resize start');
      this.context.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE_START, spy);
      this.context.pointerEvent('pointerdown', 0, 0);
      expect(spy).toHaveBeenCalled();
    });

    it('should emit resize end event on arrow key up', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.position = 'start';
      const spy = jasmine.createSpy('resize end');
      this.context.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE_END, spy);
      this.context.keyEvent('keyup', 'ArrowRight');
      expect(spy).toHaveBeenCalled();
    });

    it('should emit resize end event on pointer up', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.position = 'start';
      const spy = jasmine.createSpy('resize end');
      this.context.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE_END, spy);
      this.context.pointerEvent('pointerdown', 0, 0);
      this.context.pointerEvent('pointerup', 0, 0, true);
      expect(spy).toHaveBeenCalled();
    });

    it('should emit resize event on arrow key down', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.position = 'start';
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
      this.context.component.position = 'start';
      const startSize = this.context.component.getContentSize();
      const spy = jasmine.createSpy('resize');
      this.context.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE, spy);
      this.context.pointerEvent('pointerdown', 0, 0);
      const delta = 10;
      this.context.pointerEvent('pointermove', delta, 0, true, 1);
      expect(spy).toHaveBeenCalledOnceWith(jasmine.objectContaining({detail: startSize + delta}));
    });

    it('should emit did close event after the close animation completes', async function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.position = 'start';
      const spy = jasmine.createSpy('did close');
      this.context.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.DID_CLOSE, spy);
      this.context.component.open = false;
      this.context.getPart('root')!.dispatchEvent(new TransitionEvent('animationend'));
      await tick();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should emit did open event after the open animation completes', async function(this: ITestContext) {
      this.context = setupTestContext(false, 1);
      this.context.component.position = 'start';
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
      this.context.component.position = 'start';
      const sibling = this.context.panels[1];
      const startSize = sibling.getContentSize();
      this.context.keyEvent('keydown', 'ArrowRight', true);
      expect(sibling.getContentSize()).toBe(startSize - 10);
    });

    it('should not resize sibling under sibling min', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.position = 'start';
      const sibling = this.context.panels[1];
      const startSize = sibling.getContentSize();
      sibling.min = startSize;
      this.context.keyEvent('keydown', 'ArrowRight', true);
      expect(sibling.getContentSize()).toBe(startSize);
    });

    it('should not resize positioned sibling over sibling max', function(this: ITestContext) {
      this.context = setupTestContext(true, 2);
      this.context.component.position = 'start';
      const sibling = this.context.panels[1];
      sibling.position = 'start';
      const startSize = sibling.getContentSize();
      sibling.max = startSize;
      this.context.keyEvent('keydown', 'ArrowLeft', true);
      expect(sibling.getContentSize()).toBe(startSize);
    });

    it('should close when size is equal to or under auto size threshold and auto close is anabled', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.position = 'start';
      this.context.component.autoClose = true;
      this.context.component.size = 10;
      this.context.keyEvent('keydown', 'ArrowLeft', true);
      this.context.keyEvent('keyup', 'ArrowLeft');
      expect(this.context.component.open).toBe(false);
    });

    it('should resize to fit under max', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.position = 'start';
      this.context.component.size = 400;
      const max = 300;
      this.context.component.max = max;
      expect(this.context.component.getContentSize()).toBe(max);
    });

    it('should resize to fit over min', function(this: ITestContext) {
      this.context = setupTestContext(true, 1);
      this.context.component.size = 300;
      const min = 400;
      this.context.component.min = min;
      expect(this.context.component.getContentSize()).toBe(min);
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
      getPart: (part: string): HTMLElement | null => component.shadowRoot!.querySelector(`[part=${part}]`),
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
