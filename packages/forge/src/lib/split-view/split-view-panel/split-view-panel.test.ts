import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { removeElement } from '@tylertech/forge-core';
import { task, frame } from '../../core/utils/utils';
import {
  clearState,
  defineSplitViewComponent,
  getCursor,
  getHandleIcon,
  getPixelDimension,
  getSplitViewPanelSibling,
  handleBoundariesDuringResize,
  initState,
  ISplitViewComponent,
  ISplitViewPanelAdapter,
  ISplitViewPanelComponent,
  ISplitViewPanelState,
  keyboardResize,
  parseSize,
  pointerResize,
  setState,
  SPLIT_VIEW_PANEL_CONSTANTS
} from '../';
import { IStateLayerComponent } from '../../state-layer';

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

describe('SplitViewPanelComponent', function () {
  before(function () {
    defineSplitViewComponent();
  });

  afterEach(function () {
    if (this.currentTest?.ctx?.harness) {
      this.currentTest.ctx.harness.destroy();
    }
  });

  it('should instantiate component instance', function () {
    this.harness = setupTestContext(true);
    expect(this.harness.component.isConnected).to.be.true;
  });

  describe('properties', function () {
    it('should not be resizable by default', function () {
      this.harness = setupTestContext();
      expect(this.harness.component.resizable).to.equal('off');
    });

    it('should not be 200 pixels by default', function () {
      this.harness = setupTestContext();
      expect(this.harness.component.size).to.equal(200);
    });

    it('should have min set to 0 by default', function () {
      this.harness = setupTestContext();
      expect(this.harness.component.min).to.equal(0);
    });

    it('should not set max by default', function () {
      this.harness = setupTestContext();
      expect(this.harness.component.max).to.be.undefined;
    });

    it('should have an accessible label by default', function () {
      this.harness = setupTestContext();
      expect(this.harness.component.accessibleLabel).to.equal('Split view panel');
    });

    it('should be open by default', function () {
      this.harness = setupTestContext();
      expect(this.harness.component.open).to.be.true;
    });

    it('should not set disabled by default', function () {
      this.harness = setupTestContext();
      expect(this.harness.component.disabled).to.be.undefined;
    });

    it('should not set allow close by default', function () {
      this.harness = setupTestContext();
      expect(this.harness.component.allowClose).to.be.undefined;
    });

    it('should not set auto close by default', function () {
      this.harness = setupTestContext();
      expect(this.harness.component.autoClose).to.be.undefined;
    });

    it('should not set auto close threshold by default', function () {
      this.harness = setupTestContext();
      expect(this.harness.component.autoCloseThreshold).to.be.undefined;
    });
  });

  describe('attributes', function () {
    it('should set resizable', function () {
      this.harness = setupTestContext();
      this.harness.component.setAttribute('resizable', 'end');
      expect(this.harness.component.resizable).to.equal('end');
      this.harness.component.setAttribute('resizable', 'start');
      expect(this.harness.component.resizable).to.equal('start');
    });

    it('should set size', function () {
      this.harness = setupTestContext();
      this.harness.component.setAttribute('size', '50%');
      expect(this.harness.component.size).to.equal('50%');
    });

    it('should set min', function () {
      const min = '100';
      this.harness = setupTestContext();
      this.harness.component.setAttribute('min', min);
      expect(this.harness.component.min).to.equal(min);
    });

    it('should set max', function () {
      const max = '400';
      this.harness = setupTestContext();
      this.harness.component.setAttribute('max', max);
      expect(this.harness.component.max).to.equal(max);
      this.harness.component.removeAttribute('max');
      expect(this.harness.component.max).to.be.undefined;
    });

    it('should set accessible label', function () {
      this.harness = setupTestContext();
      const accessibleLabel = 'test';
      this.harness.component.setAttribute('accessible-label', accessibleLabel);
      expect(this.harness.component.accessibleLabel).to.equal(accessibleLabel);
    });

    it('should set open', function () {
      this.harness = setupTestContext();
      this.harness.component.setAttribute('open', 'false');
      expect(this.harness.component.open).to.be.false;
    });

    it('should set disabled', function () {
      this.harness = setupTestContext();
      this.harness.component.setAttribute('disabled', 'true');
      expect(this.harness.component.disabled).to.be.true;
      this.harness.component.removeAttribute('disabled');
      expect(this.harness.component.disabled).to.be.undefined;
    });

    it('should set allow close', function () {
      this.harness = setupTestContext();
      this.harness.component.setAttribute('allow-close', 'true');
      expect(this.harness.component.allowClose).to.be.true;
      this.harness.component.removeAttribute('allow-close');
      expect(this.harness.component.allowClose).to.be.undefined;
    });

    it('should set auto close', function () {
      this.harness = setupTestContext();
      this.harness.component.setAttribute('auto-close', 'true');
      expect(this.harness.component.autoClose).to.be.true;
      this.harness.component.removeAttribute('auto-close');
      expect(this.harness.component.autoClose).to.be.undefined;
    });

    it('should set auto close threshold', function () {
      const autoCloseThreshold = 10;
      this.harness = setupTestContext();
      this.harness.component.setAttribute('auto-close-threshold', autoCloseThreshold.toString());
      expect(this.harness.component.autoCloseThreshold).to.equal(autoCloseThreshold);
      this.harness.component.removeAttribute('auto-close-threshold');
      expect(this.harness.component.autoCloseThreshold).to.be.undefined;
    });
  });

  describe('methods', function () {
    it('should get content size', function () {
      this.harness = setupTestContext(true);
      const contentSize = this.harness.getPart('content')!.clientWidth;
      expect(this.harness.component.getContentSize()).to.equal(contentSize);
    });

    it('should get collapsible size', function () {
      this.harness = setupTestContext(true);
      const contentSize = this.harness.getPart('content')!.clientWidth;
      expect(this.harness.component.getCollapsibleSize()).to.equal(contentSize);
      const min = 100;
      this.harness.component.min = min;
      expect(this.harness.component.getCollapsibleSize()).to.equal(contentSize - min);
    });

    it('should set content size', function () {
      this.harness = setupTestContext(true, 1, 1);
      const contentSize = 300;
      this.harness.component.setContentSize(contentSize);
      expect(this.harness.getPart('content')!.clientWidth).to.equal(contentSize);
    });

    it('should set orientation', function () {
      this.harness = setupTestContext();
      this.harness.component.update({ orientation: 'vertical' });
      expect(this.harness.getPart('root')!.getAttribute(SPLIT_VIEW_PANEL_CONSTANTS.attributes.ORIENTATION)).to.equal('vertical');
    });

    it('should update accessibility', async function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      const availableSpace = this.harness.component.getContentSize() + this.harness.panels[1].getContentSize();
      this.harness.component.setContentSize(availableSpace / 2);
      this.harness.component.update({ accessibility: true });
      expect(this.harness.getPart('handle')!.getAttribute('aria-valuenow')).to.equal('50.00');
    });
  });

  describe('keyboard interaction', function () {
    it('should do nothing if disabled', function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      this.harness.component.disabled = true;
      this.harness.keyEvent('keydown', 'Enter');
      expect(this.harness.component.open).to.be.true;

      const size = 200;
      this.harness.component.size = size;
      this.harness.keyEvent('keydown', 'Home');
      expect(this.harness.component.getContentSize()).to.equal(size);

      this.harness.component.size = size;
      this.harness.component.max = 500;
      this.harness.keyEvent('keydown', 'End');
      expect(this.harness.component.getContentSize()).to.equal(size);
    });

    it('should close panel on enter key down when closing is allowed', function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      this.harness.component.allowClose = true;
      this.harness.keyEvent('keydown', 'Enter');
      expect(this.harness.component.open).to.be.false;
    });

    it('should minimize panel on home key down', function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      this.harness.keyEvent('keydown', 'Home');
      expect(this.harness.component.getContentSize()).to.equal(this.harness.component.min as number);
    });

    it('should maximize panel on end key down', function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      this.harness.component.max = 500;
      this.harness.keyEvent('keydown', 'End');
      expect(this.harness.component.getContentSize()).to.equal(this.harness.component.max);
    });

    it('should do nothing when closing is disabled on enter key down', function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      this.harness.component.allowClose = false;
      this.harness.keyEvent('keydown', 'Enter');
      expect(this.harness.component.open).to.be.true;
    });

    describe('resizable end', function () {
      it('should increase size one pixel when right arrow key is pressed', function () {
        this.harness = setupTestContext(true, 1);
        this.harness.component.resizable = 'end';
        const startSize = this.harness.component.getContentSize();
        this.harness.keyEvent('keydown', 'ArrowRight');
        expect(this.harness.component.getContentSize()).to.equal(startSize + 1);
      });

      it('should increase size ten pixels when right arrow key is pressed with shift', function () {
        this.harness = setupTestContext(true, 1);
        this.harness.component.resizable = 'end';
        const startSize = this.harness.component.getContentSize();
        this.harness.keyEvent('keydown', 'ArrowRight', true);
        expect(this.harness.component.getContentSize()).to.equal(startSize + 10);
      });

      it('should decrease size one pixel when left arrow key is pressed', function () {
        this.harness = setupTestContext(true, 1);
        this.harness.component.resizable = 'end';
        const startSize = this.harness.component.getContentSize();
        this.harness.keyEvent('keydown', 'ArrowLeft');
        expect(this.harness.component.getContentSize()).to.equal(startSize - 1);
      });

      it('should decrease size ten pixels when left arrow key is pressed with shift', function () {
        this.harness = setupTestContext(true, 1);
        this.harness.component.resizable = 'end';
        const startSize = this.harness.component.getContentSize();
        this.harness.keyEvent('keydown', 'ArrowLeft', true);
        expect(this.harness.component.getContentSize()).to.equal(startSize - 10);
      });

      it('should do nothing when orientation is horizontal and up or down arrow key is pressed', function () {
        this.harness = setupTestContext(true, 1);
        this.harness.component.resizable = 'end';
        const startSize = this.harness.component.getContentSize();
        this.harness.keyEvent('keydown', 'ArrowUp', true);
        expect(this.harness.component.getContentSize()).to.equal(startSize);
        this.harness.keyEvent('keydown', 'ArrowDown', true);
        expect(this.harness.component.getContentSize()).to.equal(startSize);
      });

      it('should increase size one pixel when orientation is vertical and down arrow key is pressed', function () {
        this.harness = setupTestContext(true, 1);
        this.harness.parent.orientation = 'vertical';
        this.harness.component.resizable = 'end';
        const startSize = this.harness.component.getContentSize();
        this.harness.keyEvent('keydown', 'ArrowDown');
        expect(this.harness.component.getContentSize()).to.equal(startSize + 1);
      });

      it('should increase size one pixel when orientation is vertical and down arrow key is pressed with shift', function () {
        this.harness = setupTestContext(true, 1);
        this.harness.parent.orientation = 'vertical';
        this.harness.component.resizable = 'end';
        const startSize = this.harness.component.getContentSize();
        this.harness.keyEvent('keydown', 'ArrowDown', true);
        expect(this.harness.component.getContentSize()).to.equal(startSize + 10);
      });

      it('should decrease size one pixel when orientation is vertical and up arrow key is pressed', function () {
        this.harness = setupTestContext(true, 1);
        this.harness.parent.orientation = 'vertical';
        this.harness.component.resizable = 'end';
        const startSize = this.harness.component.getContentSize();
        this.harness.keyEvent('keydown', 'ArrowUp');
        expect(this.harness.component.getContentSize()).to.equal(startSize - 1);
      });

      it('should decrease size one pixel when orientation is vertical and up arrow key is pressed with shift', function () {
        this.harness = setupTestContext(true, 1);
        this.harness.parent.orientation = 'vertical';
        this.harness.component.resizable = 'end';
        const startSize = this.harness.component.getContentSize();
        this.harness.keyEvent('keydown', 'ArrowUp', true);
        expect(this.harness.component.getContentSize()).to.equal(startSize - 10);
      });

      it('should do nothing when orientation is vertical and left or right arrow key is pressed', function () {
        this.harness = setupTestContext(true, 1);
        this.harness.parent.orientation = 'vertical';
        this.harness.component.resizable = 'end';
        const startSize = this.harness.component.getContentSize();
        this.harness.keyEvent('keydown', 'ArrowRight', true);
        expect(this.harness.component.getContentSize()).to.equal(startSize);
        this.harness.keyEvent('keydown', 'ArrowLeft', true);
        expect(this.harness.component.getContentSize()).to.equal(startSize);
      });
    });

    describe('resizable start', function () {
      it('should increase size one pixel when left arrow key is pressed', function () {
        this.harness = setupTestContext(true, 1);
        this.harness.component.resizable = 'start';
        const startSize = this.harness.component.getContentSize();
        this.harness.keyEvent('keydown', 'ArrowLeft');
        expect(this.harness.component.getContentSize()).to.equal(startSize + 1);
      });

      it('should increase size ten pixels when left arrow key is pressed with shift', function () {
        this.harness = setupTestContext(true, 1);
        this.harness.component.resizable = 'start';
        const startSize = this.harness.component.getContentSize();
        this.harness.keyEvent('keydown', 'ArrowLeft', true);
        expect(this.harness.component.getContentSize()).to.equal(startSize + 10);
      });

      it('should decrease size one pixel when right arrow key is pressed', function () {
        this.harness = setupTestContext(true, 1);
        this.harness.component.resizable = 'start';
        const startSize = this.harness.component.getContentSize();
        this.harness.keyEvent('keydown', 'ArrowRight');
        expect(this.harness.component.getContentSize()).to.equal(startSize - 1);
      });

      it('should decrease size ten pixels when right arrow key is pressed with shift', function () {
        this.harness = setupTestContext(true, 1);
        this.harness.component.resizable = 'start';
        const startSize = this.harness.component.getContentSize();
        this.harness.keyEvent('keydown', 'ArrowRight', true);
        expect(this.harness.component.getContentSize()).to.equal(startSize - 10);
      });

      it('should do nothing when orientation is horizontal and up or down arrow key is pressed', function () {
        this.harness = setupTestContext(true, 1);
        this.harness.component.resizable = 'start';
        const startSize = this.harness.component.getContentSize();
        this.harness.keyEvent('keydown', 'ArrowUp', true);
        expect(this.harness.component.getContentSize()).to.equal(startSize);
        this.harness.keyEvent('keydown', 'ArrowDown', true);
        expect(this.harness.component.getContentSize()).to.equal(startSize);
      });

      it('should increase size one pixel when orientation is vertical and up arrow key is pressed', function () {
        this.harness = setupTestContext(true, 1);
        this.harness.parent.orientation = 'vertical';
        this.harness.component.resizable = 'start';
        const startSize = this.harness.component.getContentSize();
        this.harness.keyEvent('keydown', 'ArrowUp');
        expect(this.harness.component.getContentSize()).to.equal(startSize + 1);
      });

      it('should increase size one pixel when orientation is vertical and up arrow key is pressed with shift', function () {
        this.harness = setupTestContext(true, 1);
        this.harness.parent.orientation = 'vertical';
        this.harness.component.resizable = 'start';
        const startSize = this.harness.component.getContentSize();
        this.harness.keyEvent('keydown', 'ArrowUp', true);
        expect(this.harness.component.getContentSize()).to.equal(startSize + 10);
      });

      it('should decrease size one pixel when orientation is vertical and down arrow key is pressed', function () {
        this.harness = setupTestContext(true, 1);
        this.harness.parent.orientation = 'vertical';
        this.harness.component.resizable = 'start';
        const startSize = this.harness.component.getContentSize();
        this.harness.keyEvent('keydown', 'ArrowDown');
        expect(this.harness.component.getContentSize()).to.equal(startSize - 1);
      });

      it('should decrease size one pixel when orientation is vertical and down arrow key is pressed with shift', function () {
        this.harness = setupTestContext(true, 1);
        this.harness.parent.orientation = 'vertical';
        this.harness.component.resizable = 'start';
        const startSize = this.harness.component.getContentSize();
        this.harness.keyEvent('keydown', 'ArrowDown', true);
        expect(this.harness.component.getContentSize()).to.equal(startSize - 10);
      });

      it('should do nothing when orientation is vertical and left or right arrow key is pressed', function () {
        this.harness = setupTestContext(true, 1);
        this.harness.parent.orientation = 'vertical';
        this.harness.component.resizable = 'start';
        const startSize = this.harness.component.getContentSize();
        this.harness.keyEvent('keydown', 'ArrowRight', true);
        expect(this.harness.component.getContentSize()).to.equal(startSize);
        this.harness.keyEvent('keydown', 'ArrowLeft', true);
        expect(this.harness.component.getContentSize()).to.equal(startSize);
      });
    });

    it('should do nothing when resizable is off and an arrow key is pressed', function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'off';
      const startSize = this.harness.component.getContentSize();
      this.harness.keyEvent('keydown', 'ArrowRight', true);
      expect(this.harness.component.getContentSize()).to.equal(startSize);
      this.harness.keyEvent('keydown', 'ArrowRight', true);
      expect(this.harness.component.getContentSize()).to.equal(startSize);
      this.harness.keyEvent('keydown', 'ArrowUp', true);
      expect(this.harness.component.getContentSize()).to.equal(startSize);
      this.harness.keyEvent('keydown', 'ArrowDown', true);
      expect(this.harness.component.getContentSize()).to.equal(startSize);
    });
  });

  describe('pointer interaction', function () {
    it('should focus handle on pointer down', async function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      this.harness.pointerEvent('pointerdown', 0, 0);
      const focusedElement = this.harness.component.shadowRoot!.activeElement;
      expect(focusedElement).to.equal(this.harness.getPart('handle'));
    });

    it('should set grabbed value on pointer down', function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      this.harness.pointerEvent('pointerdown', 0, 0);
      const handleGrabbed = this.harness.getPart('handle')!.getAttribute('aria-grabbed');
      expect(handleGrabbed).to.equal('true');
    });

    it('should set horizontal overlay cursor on pointer down', function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      this.harness.pointerEvent('pointerdown', 0, 0);
      const overlayCursor = this.harness.getOverlay()?.style.getPropertyValue('cursor');
      expect(overlayCursor).to.equal(getCursor('horizontal'));
    });

    it('should set vertical overlay cursor on pointer down', function () {
      this.harness = setupTestContext(true, 1);
      this.harness.parent.orientation = 'vertical';
      this.harness.component.resizable = 'start';
      this.harness.pointerEvent('pointerdown', 0, 0);
      const overlayCursor = this.harness.getOverlay()?.style.getPropertyValue('cursor');
      expect(overlayCursor).to.equal(getCursor('vertical'));
    });

    it('should set grabbed value on pointer up', function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      this.harness.pointerEvent('pointerdown', 0, 0);
      this.harness.pointerEvent('pointerup', 0, 0, true);
      const handleGrabbed = this.harness.getPart('handle')!.getAttribute('aria-grabbed');
      expect(handleGrabbed).to.equal('false');
    });

    it('should do nothing on pointer down if disabled', function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      this.harness.component.disabled = true;
      const resizeStartSpy = spy();
      this.harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE_START, resizeStartSpy);
      this.harness.pointerEvent('pointerdown', 0, 0);
      expect(resizeStartSpy.called).to.be.false;
    });

    it('should do nothing on pointer up if disabled', function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      this.harness.component.disabled = true;
      const resizeEndSpy = spy();
      this.harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE_END, resizeEndSpy);
      this.harness.pointerEvent('pointerup', 0, 0, true);
      expect(resizeEndSpy.called).to.be.false;
    });

    it('should do nothing on pointer move if disabled', function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      const startSize = this.harness.component.getContentSize();
      this.harness.pointerEvent('pointerdown', 200, 0);
      this.harness.component.disabled = true;
      this.harness.pointerEvent('pointermove', 210, 0, true, 1);
      expect(this.harness.component.getContentSize()).to.equal(startSize);
    });

    it('should set grabbed to false on pointer move with no buttons pressed', function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      this.harness.pointerEvent('pointerdown', 0, 0);
      this.harness.pointerEvent('pointermove', 10, 0, true);
      const handleGrabbed = this.harness.getPart('handle')!.getAttribute('aria-grabbed');
      expect(handleGrabbed).to.equal('false');
    });

    it('should append overlay on pointer down', function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      this.harness.pointerEvent('pointerdown', 0, 0);
      expect(this.harness.getOverlay()).to.not.be.null;
    });

    it('should remove overlay on pointer up', function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      this.harness.pointerEvent('pointerdown', 0, 0);
      this.harness.pointerEvent('pointerup', 0, 0, true);
      expect(this.harness.getOverlay()).to.be.null;
    });

    describe('resizable end', function () {
      it('should increase in size when the pointer moves to the right', function () {
        this.harness = setupTestContext(true, 1);
        this.harness.component.resizable = 'end';
        const startSize = this.harness.component.getContentSize();
        const delta = 10;
        this.harness.pointerEvent('pointerdown', 200, 0);
        this.harness.pointerEvent('pointermove', 200 + delta, 0, true, 1);
        expect(this.harness.component.getContentSize()).to.equal(startSize + delta);
      });

      it('should decrease in size when the pointer moves to the left', function () {
        this.harness = setupTestContext(true, 1);
        this.harness.component.resizable = 'end';
        const startSize = this.harness.component.getContentSize();
        const delta = -10;
        this.harness.pointerEvent('pointerdown', 200, 0);
        this.harness.pointerEvent('pointermove', 200 + delta, 0, true, 1);
        expect(this.harness.component.getContentSize()).to.equal(startSize + delta);
      });

      it('should do nothing when orientation is horizontal and the pointer moves up or down', function () {
        this.harness = setupTestContext(true, 1);
        this.harness.component.resizable = 'end';
        const startSize = this.harness.component.getContentSize();
        const delta = 10;
        this.harness.pointerEvent('pointerdown', 200, 200);
        this.harness.pointerEvent('pointermove', 200, 200 + delta, true, 1);
        expect(this.harness.component.getContentSize()).to.equal(startSize);
        this.harness.pointerEvent('pointermove', 200, 200 - delta, true, 1);
        expect(this.harness.component.getContentSize()).to.equal(startSize);
      });

      it('should increase in size when orientation is vertical and the pointer moves down', function () {
        this.harness = setupTestContext(true, 1);
        this.harness.parent.orientation = 'vertical';
        this.harness.component.resizable = 'end';
        const startSize = this.harness.component.getContentSize();
        const delta = 10;
        this.harness.pointerEvent('pointerdown', 0, 200);
        this.harness.pointerEvent('pointermove', 0, 200 + delta, true, 1);
        expect(this.harness.component.getContentSize()).to.equal(startSize + delta);
      });

      it('should decrease in size when orientation is vertical and the pointer moves up', function () {
        this.harness = setupTestContext(true, 1);
        this.harness.parent.orientation = 'vertical';
        this.harness.component.resizable = 'end';
        const startSize = this.harness.component.getContentSize();
        const delta = -10;
        this.harness.pointerEvent('pointerdown', 0, 200);
        this.harness.pointerEvent('pointermove', 0, 200 + delta, true, 1);
        expect(this.harness.component.getContentSize()).to.equal(startSize + delta);
      });

      it('should do nothing when orientation is vertical and the pointer moves left or right', function () {
        this.harness = setupTestContext(true, 1);
        this.harness.parent.orientation = 'vertical';
        this.harness.component.resizable = 'end';
        const startSize = this.harness.component.getContentSize();
        const delta = 10;
        this.harness.pointerEvent('pointerdown', 200, 200);
        this.harness.pointerEvent('pointermove', 200 + delta, 200, true, 1);
        expect(this.harness.component.getContentSize()).to.equal(startSize);
        this.harness.pointerEvent('pointermove', 200 - delta, 200, true, 1);
        expect(this.harness.component.getContentSize()).to.equal(startSize);
      });
    });

    describe('resizable start', function () {
      it('should increase in size when the pointer moves to the left', function () {
        this.harness = setupTestContext(true, 1, 1);
        this.harness.component.resizable = 'start';
        const startSize = this.harness.component.getContentSize();
        const delta = 10;
        this.harness.pointerEvent('pointerdown', 200, 0);
        this.harness.pointerEvent('pointermove', 200 - delta, 0, true, 1);
        expect(this.harness.component.getContentSize()).to.equal(startSize + delta);
      });

      it('should decrease in size when the pointer moves to the right', function () {
        this.harness = setupTestContext(true, 1, 1);
        this.harness.component.resizable = 'start';
        const startSize = this.harness.component.getContentSize();
        const delta = -10;
        this.harness.pointerEvent('pointerdown', 200, 0);
        this.harness.pointerEvent('pointermove', 200 - delta, 0, true, 1);
        expect(this.harness.component.getContentSize()).to.equal(startSize + delta);
      });

      it('should do nothing when orientation is horizontal and the pointer moves up or down', function () {
        this.harness = setupTestContext(true, 1, 1);
        this.harness.component.resizable = 'start';
        const startSize = this.harness.component.getContentSize();
        const delta = 10;
        this.harness.pointerEvent('pointerdown', 200, 200);
        this.harness.pointerEvent('pointermove', 200, 200 + delta, true, 1);
        expect(this.harness.component.getContentSize()).to.equal(startSize);
        this.harness.pointerEvent('pointermove', 200, 200 - delta, true, 1);
        expect(this.harness.component.getContentSize()).to.equal(startSize);
      });

      it('should increase in size when orientation is vertical and the pointer moves up', function () {
        this.harness = setupTestContext(true, 1);
        this.harness.parent.orientation = 'vertical';
        this.harness.component.resizable = 'start';
        const startSize = this.harness.component.getContentSize();
        const delta = 10;
        this.harness.pointerEvent('pointerdown', 0, 200);
        this.harness.pointerEvent('pointermove', 0, 200 + delta, true, 1);
        expect(this.harness.component.getContentSize()).to.equal(startSize - delta);
      });

      it('should decrease in size when orientation is vertical and the pointer moves down', function () {
        this.harness = setupTestContext(true, 1);
        this.harness.parent.orientation = 'vertical';
        this.harness.component.resizable = 'start';
        const startSize = this.harness.component.getContentSize();
        const delta = -10;
        this.harness.pointerEvent('pointerdown', 0, 200);
        this.harness.pointerEvent('pointermove', 0, 200 + delta, true, 1);
        expect(this.harness.component.getContentSize()).to.equal(startSize - delta);
      });

      it('should do nothing when orientation is vertical and the pointer moves left or right', function () {
        this.harness = setupTestContext(true, 1, 1);
        this.harness.parent.orientation = 'vertical';
        this.harness.component.resizable = 'start';
        const startSize = this.harness.component.getContentSize();
        const delta = 10;
        this.harness.pointerEvent('pointerdown', 200, 200);
        this.harness.pointerEvent('pointermove', 200 + delta, 200, true, 1);
        expect(this.harness.component.getContentSize()).to.equal(startSize);
        this.harness.pointerEvent('pointermove', 200 - delta, 200, true, 1);
        expect(this.harness.component.getContentSize()).to.equal(startSize);
      });
    });
  });

  describe('events', function () {
    it('should emit will resize event before resizing', function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      this.harness.component.size = 200;
      const willResizeSpy = spy();
      this.harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.WILL_RESIZE, willResizeSpy);
      this.harness.keyEvent('keydown', 'ArrowRight');
      expect(willResizeSpy.called).to.be.true;
    });

    it('should will resize event to be cancelled', function () {
      this.harness = setupTestContext(true, 1);
      const size = 200;
      this.harness.component.resizable = 'end';
      this.harness.component.size = size;
      this.harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.WILL_RESIZE, (evt: CustomEvent) => {
        evt.preventDefault();
      });
      this.harness.keyEvent('keydown', 'ArrowRight');
      expect(this.harness.component.getContentSize()).to.equal(size);
    });

    it('should emit resize start event on arrow key down', function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      const resizeStartSpy = spy();
      this.harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE_START, resizeStartSpy);
      this.harness.keyEvent('keydown', 'ArrowRight');
      expect(resizeStartSpy.called).to.be.true;
    });

    it('should emit resize start event on pointer down', function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      const resizeStartSpy = spy();
      this.harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE_START, resizeStartSpy);
      this.harness.pointerEvent('pointerdown', 0, 0);
      expect(resizeStartSpy.called).to.be.true;
    });

    it('should emit resize end event on arrow key up', function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      const resizeEndSpy = spy();
      this.harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE_END, resizeEndSpy);
      this.harness.keyEvent('keydown', 'ArrowRight');
      this.harness.keyEvent('keyup', 'ArrowRight');
      expect(resizeEndSpy.called).to.be.true;
    });

    it('should emit resize end event on pointer up', function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      const resizeEndSpy = spy();
      this.harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE_END, resizeEndSpy);
      this.harness.pointerEvent('pointerdown', 0, 0);
      this.harness.pointerEvent('pointerup', 0, 0, true);
      expect(resizeEndSpy.called).to.be.true;
    });

    it('should emit resize event on arrow key down', function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      const startSize = this.harness.component.getContentSize();
      const resizeSpy = spy();
      this.harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE, resizeSpy);
      this.harness.keyEvent('keydown', 'ArrowRight');
      expect(resizeSpy.calledOnce).to.be.true;
      expect(resizeSpy.getCall(0).args[0].detail).to.equal(startSize + 1);
      this.harness.keyEvent('keydown', 'ArrowLeft');
      expect(resizeSpy.getCall(1).args[0].detail).to.equal(startSize);
    });

    it('should emit resize event on pointer move', function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      const startSize = this.harness.component.getContentSize();
      const resizeSpy = spy();
      this.harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE, resizeSpy);
      this.harness.pointerEvent('pointerdown', 0, 0);
      const delta = 10;
      this.harness.pointerEvent('pointermove', delta, 0, true, 1);
      expect(resizeSpy.calledOnce).to.be.true;
      expect(resizeSpy.getCall(0).args[0].detail).to.equal(startSize + delta);
    });

    it('should emit will close event before closing', function () {
      this.harness = setupTestContext(true);
      this.harness.component.resizable = 'end';
      const willCloseSpy = spy();
      this.harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.WILL_CLOSE, willCloseSpy);
      this.harness.component.open = false;
      expect(willCloseSpy.called).to.be.true;
    });

    it('should allow will close event to be cancelled', function () {
      this.harness = setupTestContext(true);
      this.harness.component.resizable = 'end';
      this.harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.WILL_CLOSE, (evt: CustomEvent) => {
        evt.preventDefault();
      });
      this.harness.component.open = false;
      expect(this.harness.component.open).to.be.true;
    });

    it('should emit will open event before opening', function () {
      this.harness = setupTestContext();
      this.harness.component.resizable = 'end';
      this.harness.component.open = false;
      this.harness.append();
      const willOpenSpy = spy();
      this.harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.WILL_OPEN, willOpenSpy);
      this.harness.component.open = true;
      expect(willOpenSpy.called).to.be.true;
    });

    it('should allow will open event to be cancelled', function () {
      this.harness = setupTestContext();
      this.harness.component.resizable = 'end';
      this.harness.component.open = false;
      this.harness.append();
      this.harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.WILL_OPEN, (evt: CustomEvent) => {
        evt.preventDefault();
      });
      this.harness.component.open = true;
      expect(this.harness.component.open).to.be.false;
    });

    it('should emit did close event after the close animation completes', async function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      const didCloseSpy = spy();
      this.harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.DID_CLOSE, didCloseSpy);
      this.harness.component.open = false;
      this.harness.getPart('root')!.dispatchEvent(new TransitionEvent('animationend'));
      await frame();
      expect(didCloseSpy.calledOnce).to.be.true;
    });

    it('should emit did open event after the open animation completes', async function () {
      this.harness = setupTestContext(false, 1);
      this.harness.component.resizable = 'end';
      this.harness.component.open = false;
      this.harness.getPart('root')?.classList.add(SPLIT_VIEW_PANEL_CONSTANTS.classes.CLOSED);
      this.harness.append();
      const didOpenSpy = spy();
      this.harness.component.addEventListener(SPLIT_VIEW_PANEL_CONSTANTS.events.DID_OPEN, didOpenSpy);
      this.harness.component.open = true;
      this.harness.getPart('root')!.dispatchEvent(new TransitionEvent('animationend'));
      await frame();
      expect(didOpenSpy.calledOnce).to.be.true;
    });
  });

  describe('resize', function () {
    it('should resize sibling', function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      const sibling = this.harness.panels[1];
      const startSize = sibling.getContentSize();
      this.harness.keyEvent('keydown', 'ArrowRight', true);
      expect(sibling.getContentSize()).to.equal(startSize - 10);
    });

    it('should not resize sibling under sibling min', function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      const sibling = this.harness.panels[1];
      const startSize = sibling.getContentSize();
      sibling.min = startSize;
      this.harness.keyEvent('keydown', 'ArrowRight', true);
      expect(sibling.getContentSize()).to.equal(startSize);
    });

    it('should not resize resizable sibling over sibling max', function () {
      this.harness = setupTestContext(true, 2);
      this.harness.component.resizable = 'end';
      const sibling = this.harness.panels[1];
      sibling.resizable = 'end';
      const startSize = sibling.getContentSize();
      sibling.max = startSize;
      this.harness.keyEvent('keydown', 'ArrowLeft', true);
      expect(sibling.getContentSize()).to.equal(startSize);
    });

    it('should close when size is equal to or under auto size threshold and auto close is enabled', function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      this.harness.component.autoClose = true;
      this.harness.component.size = 10;
      this.harness.keyEvent('keydown', 'ArrowLeft', true);
      this.harness.keyEvent('keyup', 'ArrowLeft');
      expect(this.harness.component.open).to.equal(false);
    });

    it('should resize to fit under max', function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      this.harness.component.size = 400;
      const max = 300;
      this.harness.component.max = max;
      expect(this.harness.component.getContentSize()).to.equal(max);
    });

    it('should resize to fit over min', function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      this.harness.component.size = 300;
      const min = 400;
      this.harness.component.min = min;
      expect(this.harness.component.getContentSize()).to.equal(min);
    });

    it('should activate ripple when max size is reached', async function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      this.harness.component.size = 200;
      this.harness.component.max = 205;
      const playAnimationSpy = spy(this.harness.getStateLayer(), 'playAnimation');
      this.harness.keyEvent('keydown', 'ArrowRight', true);
      this.harness.keyEvent('keyup', 'ArrowRight');
      this.harness.component.size = 200;
      this.harness.pointerEvent('pointerdown', 0, 0);
      this.harness.pointerEvent('pointermove', 10, 0, true, 1);
      await task(SPLIT_VIEW_PANEL_CONSTANTS.numbers.STATE_LAYER_ACTIVATION_WAIT);
      expect(playAnimationSpy.calledTwice).to.be.true;
    });

    it('should activate ripple when min size is reached', async function () {
      this.harness = setupTestContext(true, 1);
      this.harness.component.resizable = 'end';
      this.harness.component.size = 5;
      const playAnimationSpy = spy(this.harness.getStateLayer(), 'playAnimation');
      this.harness.keyEvent('keydown', 'ArrowLeft', true);
      this.harness.keyEvent('keyup', 'ArrowLeft');
      this.harness.component.size = 5;
      this.harness.pointerEvent('pointerdown', 10, 0);
      this.harness.pointerEvent('pointermove', 0, 0, true, 1);
      await task(SPLIT_VIEW_PANEL_CONSTANTS.numbers.STATE_LAYER_ACTIVATION_WAIT);
      expect(playAnimationSpy.calledTwice).to.be.true;
    });
  });

  describe('utils', function () {
    describe('state', function () {
      it('should init state', function () {
        this.harness = setupTestContext();
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
        expect(state).to.deep.equal(expected);
      });

      it('should set state', function () {
        this.harness = setupTestContext(true, 1);
        let state = initState();
        this.harness.component.resizable = 'end';
        state.resizable = 'end';
        this.harness.component.parentElement?.style.setProperty('width', '400px');
        state = setState(this.harness.adapter, state);

        const currentSize = this.harness.component.getContentSize();
        const expected: ISplitViewPanelState = {
          orientation: 'horizontal',
          resizable: 'end',
          currentSize,
          startSize: currentSize,
          availableSpace: this.harness.adapter.getAvailableSpace('horizontal', 'end'),
          siblingSize: this.harness.adapter.getSiblingContentSize(),
          arrowKeyHeld: false,
          keyboardDelta: 0,
          isAtMin: false,
          isAtMax: false,
          min: 0
        };
        expect(state).to.deep.equal(expected);
      });

      it('should clear state', function () {
        this.harness = setupTestContext();
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
        expect(state).to.deep.equal(expected);
      });
    });

    describe('resize', function () {
      it('should not resize when start point or start size is undefined', function () {
        this.harness = setupTestContext();
        const pointerEvt = new PointerEvent('pointermove');
        const state = initState();
        expect(pointerResize(this.harness.adapter, pointerEvt, state)).to.be.false;
        expect(keyboardResize(this.harness.adapter, 0, state)).to.be.false;
      });

      describe('handle boundaries during resize', function () {
        it('should return false if current size is missing', function () {
          this.harness = setupTestContext();
          const state = initState();
          expect(handleBoundariesDuringResize(this.harness.adapter, state)).to.be.false;
        });

        it('should return false and set isAtMin to false if isAtMin is true and the panel is larger than min', function () {
          this.harness = setupTestContext();
          const state = initState();
          state.currentSize = 200;
          state.min = 150;
          state.isAtMin = true;
          expect(handleBoundariesDuringResize(this.harness.adapter, state)).to.be.false;
          expect(state.isAtMin).to.be.false;
        });

        it('should return false and set isAtMax to false if isAtMax is true and the panel is smaller than max', function () {
          this.harness = setupTestContext();
          const state = initState();
          state.currentSize = 200;
          state.max = 250;
          state.isAtMax = true;
          expect(handleBoundariesDuringResize(this.harness.adapter, state)).to.be.false;
          expect(state.isAtMax).to.be.false;
        });
      });
    });

    describe('cursor', function () {
      describe('horizontal', function () {
        it('should return col-resize cursor when not at min or max', function () {
          this.harness = setupTestContext();
          expect(getCursor('horizontal', { resizable: 'end', boundary: 'none' })).to.equal('col-resize');
          expect(getCursor('horizontal', { resizable: 'start', boundary: 'none' })).to.equal('col-resize');
        });

        it('should return correct cursor when at min', function () {
          this.harness = setupTestContext();
          expect(getCursor('horizontal', { resizable: 'end', boundary: 'min' })).to.equal('e-resize');
          expect(getCursor('horizontal', { resizable: 'start', boundary: 'min' })).to.equal('w-resize');
        });

        it('should return correct cursor when at max', function () {
          this.harness = setupTestContext();
          expect(getCursor('horizontal', { resizable: 'end', boundary: 'max' })).to.equal('w-resize');
          expect(getCursor('horizontal', { resizable: 'start', boundary: 'max' })).to.equal('e-resize');
        });
      });

      describe('vertical', function () {
        it('should return row-resize cursor when not at min or max', function () {
          this.harness = setupTestContext();
          expect(getCursor('vertical', { resizable: 'end', boundary: 'none' })).to.equal('row-resize');
          expect(getCursor('vertical', { resizable: 'start', boundary: 'none' })).to.equal('row-resize');
        });

        it('should return correct cursor when at min', function () {
          this.harness = setupTestContext();
          expect(getCursor('vertical', { resizable: 'end', boundary: 'min' })).to.equal('s-resize');
          expect(getCursor('vertical', { resizable: 'start', boundary: 'min' })).to.equal('n-resize');
        });

        it('should return correct cursor when at max', function () {
          this.harness = setupTestContext();
          expect(getCursor('vertical', { resizable: 'end', boundary: 'max' })).to.equal('n-resize');
          expect(getCursor('vertical', { resizable: 'start', boundary: 'max' })).to.equal('s-resize');
        });
      });
    });

    it('should get handle icon', function () {
      this.harness = setupTestContext();
      expect(getHandleIcon('horizontal')).to.equal('drag_vertical_variant');
      expect(getHandleIcon('vertical')).to.equal('drag_handle');
    });

    describe('parse size', function () {
      it('should parse a number value', function () {
        this.harness = setupTestContext();
        expect(parseSize(200)).to.deep.equal({ amount: 200, unit: 'px' });
      });

      it('should parse a unitless string', function () {
        this.harness = setupTestContext();
        expect(parseSize('200')).to.deep.equal({ amount: 200, unit: 'px' });
        expect(parseSize('200.5')).to.deep.equal({ amount: 200.5, unit: 'px' });
      });

      it('should parse a pixel string', function () {
        this.harness = setupTestContext();
        expect(parseSize('200px')).to.deep.equal({ amount: 200, unit: 'px' });
        expect(parseSize('200PX')).to.deep.equal({ amount: 200, unit: 'px' });
        expect(parseSize('200 px')).to.deep.equal({ amount: 200, unit: 'px' });
        expect(parseSize('200.5px')).to.deep.equal({ amount: 200.5, unit: 'px' });
      });

      it('should parse a percentage string', function () {
        this.harness = setupTestContext();
        expect(parseSize('200%')).to.deep.equal({ amount: 200, unit: '%' });
        expect(parseSize('200 %')).to.deep.equal({ amount: 200, unit: '%' });
        expect(parseSize('200.5%')).to.deep.equal({ amount: 200.5, unit: '%' });
      });

      it('should return an amount of -1 if the value is not a number', function () {
        this.harness = setupTestContext();
        expect(parseSize('value').amount).to.equal(-1);
        expect(parseSize('valuepx').amount).to.equal(-1);
        expect(parseSize('value%').amount).to.equal(-1);
      });

      it('should return an empty string unit if the unit is invalid', function () {
        this.harness = setupTestContext();
        expect(parseSize('value').unit).to.equal('');
        expect(parseSize('valuepx').unit).to.equal('');
        expect(parseSize('value%').unit).to.equal('');
      });
    });

    it('should get pixel dimension', function () {
      this.harness = setupTestContext();
      expect(getPixelDimension(200, 0)).to.equal(200);
      expect(getPixelDimension('200', 0)).to.equal(200);
      expect(getPixelDimension('200px', 0)).to.equal(200);
      expect(getPixelDimension('50%', 100)).to.equal(50);
    });

    describe('get panel sibling', function () {
      it('should return the next panel sibling when resizable is end', function () {
        this.harness = setupTestContext(false, 1);
        this.harness.component.resizable = 'end';
        const sibling = getSplitViewPanelSibling(this.harness.component) as any;
        expect(sibling).to.equal(this.harness.panels[1]);
      });

      it('should return the previous panel sibling when resizable is start', function () {
        this.harness = setupTestContext(false, 1, 1);
        this.harness.component.resizable = 'start';
        const sibling = getSplitViewPanelSibling(this.harness.component) as any;
        expect(sibling).to.equal(this.harness.panels[0]);
      });

      it('should return undefined when resizable is off', function () {
        this.harness = setupTestContext(false);
        this.harness.component.resizable = 'off';
        const sibling = getSplitViewPanelSibling(this.harness.component);
        expect(sibling).to.be.undefined;
      });

      it('should skip closed panels', function () {
        this.harness = setupTestContext(false, 2);
        this.harness.component.resizable = 'end';
        this.harness.panels[1].open = false;
        const sibling = getSplitViewPanelSibling(this.harness.component) as any;
        expect(sibling).to.equal(this.harness.panels[2]);
      });

      it('should skip non-panel siblings', function () {
        this.harness = setupTestContext(false);
        this.harness.component.resizable = 'end';
        this.harness.component.parentElement?.appendChild(document.createElement('div'));
        const sibling = getSplitViewPanelSibling(this.harness.component);
        expect(sibling).to.be.undefined;
      });

      it('should return undefined if no panel siblings', function () {
        this.harness = setupTestContext(false);
        this.harness.component.resizable = 'end';
        const sibling = getSplitViewPanelSibling(this.harness.component);
        expect(sibling).to.be.undefined;
      });
    });
  });

  describe('parent properties', function () {
    it('should apply parent disabled', function () {
      this.harness = setupTestContext(true);
      this.harness.component.resizable = 'end';
      this.harness.parent.disabled = true;
      let rootHasDisabledClass = this.harness.getPart('root')!.classList.contains(SPLIT_VIEW_PANEL_CONSTANTS.classes.DISABLED);
      expect(rootHasDisabledClass).to.be.true;
      this.harness.parent.disabled = false;
      rootHasDisabledClass = this.harness.getPart('root')!.classList.contains(SPLIT_VIEW_PANEL_CONSTANTS.classes.DISABLED);
      expect(rootHasDisabledClass).to.be.false;
    });

    it('should apply parent allow close', function () {
      this.harness = setupTestContext(true);
      this.harness.component.resizable = 'end';
      this.harness.parent.allowClose = false;
      this.harness.keyEvent('keydown', 'Enter');
      expect(this.harness.component.open).to.be.true;
      this.harness.parent.allowClose = true;
      this.harness.keyEvent('keydown', 'Enter');
      expect(this.harness.component.open).to.be.false;
    });

    it('should apply parent auto close', function () {
      this.harness = setupTestContext(true);
      this.harness.component.resizable = 'end';
      this.harness.component.size = 5;
      this.harness.keyEvent('keydown', 'ArrowLeft', true);
      this.harness.parent.autoClose = true;
      expect(this.harness.component.open).to.be.false;
      this.harness.component.size = 5;
      this.harness.component.open = true;
      this.harness.parent.autoClose = false;
      this.harness.keyEvent('keydown', 'ArrowLeft', true);
      expect(this.harness.component.open).to.be.true;
    });

    it('should apply parent auto close threshold', function () {
      this.harness = setupTestContext(true);
      this.harness.parent.autoCloseThreshold = 10;
      this.harness.component.resizable = 'end';
      this.harness.component.size = 15;
      this.harness.keyEvent('keydown', 'ArrowLeft', true);
      this.harness.parent.autoClose = true;
      expect(this.harness.component.open).to.be.false;
    });
  });

  function setupTestContext(append = false, numberOfSiblings = 0, position = 0): ISplitViewPanelHarness {
    const fixture = document.createElement('forge-split-view');
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
      destroy: () => removeElement(fixture)
    };
  }
});
