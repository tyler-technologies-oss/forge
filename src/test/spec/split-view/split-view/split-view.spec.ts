import { removeElement } from '@tylertech/forge-core';
import { tick } from '@tylertech/forge-testing';
import { SplitViewComponent, SPLIT_VIEW_CONSTANTS, defineSplitViewComponent, ISplitViewComponent, ISplitViewPanelComponent, SPLIT_VIEW_PANEL_CONSTANTS, SplitViewAnimatingLayer } from '@tylertech/forge/split-view';

interface ITestContext {
  context: ITestSplitViewContext;
}

interface ITestSplitViewContext {
  component: ISplitViewComponent;
  panels?: ISplitViewPanelComponent[];
  append(): void;
  destroy(): void;
}

describe('SplitViewComponent', function(this: ITestContext) {
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

  it('should be oriented horizontally by default', function(this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.component.orientation).toBe('horizontal');
  })

  it('should be enabled by default', function(this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.component.disabled).toBeFalse();
  })

  it('should enable closing by default', function(this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.component.disableClose).toBeFalse();
  })

  it('should disable autoclose by default', function(this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.component.autoClose).toBeFalse();
  })

  describe('attributes', function(this: ITestContext) {
      it('should set disabled', function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.setAttribute('disabled', 'true');
        expect(this.context.component.disabled).toBeTrue();
      })

      it('should set disable close', function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.setAttribute('disable-close', 'true');
        expect(this.context.component.disableClose).toBeTrue();
      })

      it('should set auto close', function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.setAttribute('auto-close', 'true');
        expect(this.context.component.autoClose).toBeTrue();
      })
  });

  describe('layering', function(this: ITestContext) {
    it('should arrange panels correctly when the target has position set to start', function(this: ITestContext) {
      this.context = setupTestContext(false, true);
      this.context.panels![1].position = 'start';
      this.context.component.layerSlottedPanels(this.context.panels![1]);
      const layerOne = this.context.panels![0].style.getPropertyValue(SPLIT_VIEW_CONSTANTS.customCssProperties.ANIMATING_LAYER);
      const layerTwo = this.context.panels![1].style.getPropertyValue(SPLIT_VIEW_CONSTANTS.customCssProperties.ANIMATING_LAYER);
      const layerThree = this.context.panels![2].style.getPropertyValue(SPLIT_VIEW_CONSTANTS.customCssProperties.ANIMATING_LAYER);
      expect(layerOne).toBe(SplitViewAnimatingLayer.Above.toString());
      expect(layerTwo).toBe(SplitViewAnimatingLayer.Active.toString());
      expect(layerThree).toBe(SplitViewAnimatingLayer.Under.toString());
    });

    it('should arrange panels correctly when the target has position set to end', function(this: ITestContext) {
      this.context = setupTestContext(false, true);
      this.context.panels![1].position = 'end';
      this.context.component.layerSlottedPanels(this.context.panels![1]);
      const layerOne = this.context.panels![0].style.getPropertyValue(SPLIT_VIEW_CONSTANTS.customCssProperties.ANIMATING_LAYER);
      const layerTwo = this.context.panels![1].style.getPropertyValue(SPLIT_VIEW_CONSTANTS.customCssProperties.ANIMATING_LAYER);
      const layerThree = this.context.panels![2].style.getPropertyValue(SPLIT_VIEW_CONSTANTS.customCssProperties.ANIMATING_LAYER);
      expect(layerOne).toBe(SplitViewAnimatingLayer.Under.toString());
      expect(layerTwo).toBe(SplitViewAnimatingLayer.Active.toString());
      expect(layerThree).toBe(SplitViewAnimatingLayer.Above.toString());
    });

    it('should remove animating layer properties', function(this: ITestContext) {
      this.context = setupTestContext(false, true);
      this.context.panels![1].position = 'start';
      this.context.component.layerSlottedPanels(this.context.panels![1]);
      this.context.component.unlayerSlottedPanels();
      const layerOne = this.context.panels![0].style.getPropertyValue(SPLIT_VIEW_CONSTANTS.customCssProperties.ANIMATING_LAYER);
      const layerTwo = this.context.panels![1].style.getPropertyValue(SPLIT_VIEW_CONSTANTS.customCssProperties.ANIMATING_LAYER);
      const layerThree = this.context.panels![2].style.getPropertyValue(SPLIT_VIEW_CONSTANTS.customCssProperties.ANIMATING_LAYER);
      expect(layerOne).toBe('');
      expect(layerTwo).toBe('');
      expect(layerThree).toBe('');
    });
  });

  describe('panels', function(this: ITestContext) {
    it('should set orientation', function(this: ITestContext) {
      this.context = setupTestContext(false, true);
      this.context.component.orientation = 'vertical';
      expect(this.context.panels![0]['_foundation']._orientation).toBe('vertical');
      expect(this.context.panels![1]['_foundation']._orientation).toBe('vertical');
      expect(this.context.panels![2]['_foundation']._orientation).toBe('vertical');
    });

    it('should set disabled', function(this: ITestContext) {
      this.context = setupTestContext(false, true);
      this.context.component.disabled = true;
      expect(this.context.panels![0].disabled).toBeTrue();
      expect(this.context.panels![1].disabled).toBeTrue();
      expect(this.context.panels![2].disabled).toBeTrue();
    });

    it('should set disable close', function(this: ITestContext) {
      this.context = setupTestContext(false, true);
      this.context.component.disableClose = true;
      expect(this.context.panels![0].disableClose).toBeTrue();
      expect(this.context.panels![1].disableClose).toBeTrue();
      expect(this.context.panels![2].disableClose).toBeTrue();
    });

    it('should set auto close', function(this: ITestContext) {
      this.context = setupTestContext(false, true);
      this.context.component.autoClose = true;
      expect(this.context.panels![0].autoClose).toBeTrue();
      expect(this.context.panels![1].autoClose).toBeTrue();
      expect(this.context.panels![2].autoClose).toBeTrue();
    });

    it('should layout when all have default positions', async function(this: ITestContext) {
      this.context = setupTestContext(true, true);
      await tick();
      expect(this.context.panels![0].position).toBe('default');
      expect(this.context.panels![1].position).toBe('end');
      expect(this.context.panels![2].position).toBe('end');
    });

    it('should not layout when a non-default position is set', async function(this: ITestContext) {
      this.context = setupTestContext(false, true);
      this.context.panels![0].position = 'start';
      this.context.panels![2].position = 'end';
      this.context.append();
      await tick();
      expect(this.context.panels![0].position).toBe('start');
      expect(this.context.panels![1].position).toBe('default');
      expect(this.context.panels![2].position).toBe('end');
    });

    it('should not layout one or fewer panels', async function(this: ITestContext) {
      this.context = setupTestContext(false);
      const panel = document.createElement('forge-split-view-panel');
      this.context.component.appendChild(panel);
      this.context.append();
      await tick();
      expect(panel.position).toBe('default');
    });

    it('should update accessibility', function(this: ITestContext) {
      this.context = setupTestContext(false, true);
      this.context.panels![0].position = 'start';
      const spy = spyOn(this.context.panels![0], 'updateAccessibility');
      this.context.component.updateSlottedPanelsAccessibility(this.context.panels![1]);
      expect(spy).toHaveBeenCalled();
    });

    it('should not update target accessibility', function(this: ITestContext) {
      this.context = setupTestContext(false, true);
      this.context.panels![0].position = 'start';
      const spy = spyOn(this.context.panels![0], 'updateAccessibility');
      this.context.component.updateSlottedPanelsAccessibility(this.context.panels![0]);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should not update accessibility when position is default', function(this: ITestContext) {
      this.context = setupTestContext(false, true);
      this.context.panels![0].position = 'default';
      const spy = spyOn(this.context.panels![0], 'updateAccessibility');
      this.context.component.updateSlottedPanelsAccessibility(this.context.panels![1]);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should update accessibility on resize', async function(this: ITestContext) {
      this.context = setupTestContext(true, true);
      await tick();
      const spy = spyOn(this.context.panels![0], 'updateAccessibility');
      this.context.panels![0].position = 'start';
      this.context.component.style.width = '100%';
      this.context.component.parentElement!.style.width = '400px';
      await tick();
      expect(spy).toHaveBeenCalled();
    });
  });

  function setupTestContext(append = false, withPanels = false): ITestSplitViewContext {
    const component = document.createElement('forge-split-view');

    let panels: ISplitViewPanelComponent[] | undefined = undefined;
    if (withPanels) {
      panels = new Array(3).fill(undefined).map(() => {
        const panel = document.createElement('forge-split-view-panel');
        component.appendChild(panel);
        return panel;
      });
    }

    const fixture = document.createElement('div');
    fixture.id = 'split-view-test-fixture';
    fixture.appendChild(component);

    if (append) {
      document.body.appendChild(fixture);
    }

    return {
      component,
      panels,
      append: () => document.body.appendChild(fixture),
      destroy: () => removeElement(fixture)
    }
  }
});
