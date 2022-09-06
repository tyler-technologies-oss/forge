import { removeElement } from '@tylertech/forge-core';
import { tick } from '@tylertech/forge-testing';
import { defineSplitViewComponent, ISplitViewComponent, ISplitViewPanelComponent, SplitViewAnimatingLayer, SPLIT_VIEW_CONSTANTS } from '@tylertech/forge/split-view';

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
    it('should arrange panels correctly when the target has resizable set to end', function(this: ITestContext) {
      this.context = setupTestContext(false, 3);
      this.context.panels![1].resizable = 'end';
      this.context.component.layerSlottedPanels(this.context.panels![1]);
      const layerOne = this.context.panels![0].style.getPropertyValue(SPLIT_VIEW_CONSTANTS.customCssProperties.ANIMATING_LAYER);
      const layerTwo = this.context.panels![1].style.getPropertyValue(SPLIT_VIEW_CONSTANTS.customCssProperties.ANIMATING_LAYER);
      const layerThree = this.context.panels![2].style.getPropertyValue(SPLIT_VIEW_CONSTANTS.customCssProperties.ANIMATING_LAYER);
      expect(layerOne).toBe(SplitViewAnimatingLayer.Above.toString());
      expect(layerTwo).toBe(SplitViewAnimatingLayer.Active.toString());
      expect(layerThree).toBe(SplitViewAnimatingLayer.Under.toString());
    });

    it('should arrange panels correctly when the target has resizable set to start', function(this: ITestContext) {
      this.context = setupTestContext(false, 3);
      this.context.panels![1].resizable = 'start';
      this.context.component.layerSlottedPanels(this.context.panels![1]);
      const layerOne = this.context.panels![0].style.getPropertyValue(SPLIT_VIEW_CONSTANTS.customCssProperties.ANIMATING_LAYER);
      const layerTwo = this.context.panels![1].style.getPropertyValue(SPLIT_VIEW_CONSTANTS.customCssProperties.ANIMATING_LAYER);
      const layerThree = this.context.panels![2].style.getPropertyValue(SPLIT_VIEW_CONSTANTS.customCssProperties.ANIMATING_LAYER);
      expect(layerOne).toBe(SplitViewAnimatingLayer.Under.toString());
      expect(layerTwo).toBe(SplitViewAnimatingLayer.Active.toString());
      expect(layerThree).toBe(SplitViewAnimatingLayer.Above.toString());
    });

    it('should remove animating layer properties', function(this: ITestContext) {
      this.context = setupTestContext(false, 1);
      this.context.panels![0].resizable = 'end';
      this.context.component.layerSlottedPanels(this.context.panels![0]);
      this.context.component.unlayerSlottedPanels();
      const layer = this.context.panels![0].style.getPropertyValue(SPLIT_VIEW_CONSTANTS.customCssProperties.ANIMATING_LAYER);
      expect(layer).toBe('');
    });
  });

  describe('panels', function(this: ITestContext) {
    it('should set orientation', function(this: ITestContext) {
      this.context = setupTestContext(false, 1);
      this.context.component.orientation = 'vertical';
      expect(this.context.panels![0]['_foundation']._orientation).toBe('vertical');
    });

    it('should set disabled', function(this: ITestContext) {
      this.context = setupTestContext(false, 1);
      this.context.component.disabled = true;
      expect(this.context.panels![0].disabled).toBeTrue();
    });

    it('should set disable close', function(this: ITestContext) {
      this.context = setupTestContext(false, 1);
      this.context.component.disableClose = true;
      expect(this.context.panels![0].disableClose).toBeTrue();
    });

    it('should set auto close', function(this: ITestContext) {
      this.context = setupTestContext(false, 1);
      this.context.component.autoClose = true;
      expect(this.context.panels![0].autoClose).toBeTrue();
    });

    it('should layout when all have resizable set to none', async function(this: ITestContext) {
      this.context = setupTestContext(true, 3);
      await tick();
      expect(this.context.panels![0].resizable).toBe('none');
      expect(this.context.panels![1].resizable).toBe('start');
      expect(this.context.panels![2].resizable).toBe('start');
    });

    it('should not layout when resizable is set to start or end', async function(this: ITestContext) {
      this.context = setupTestContext(false, 3);
      this.context.panels![0].resizable = 'end';
      this.context.panels![2].resizable = 'start';
      this.context.append();
      await tick();
      expect(this.context.panels![0].resizable).toBe('end');
      expect(this.context.panels![1].resizable).toBe('none');
      expect(this.context.panels![2].resizable).toBe('start');
    });

    it('should not layout one or fewer panels', async function(this: ITestContext) {
      this.context = setupTestContext(false, 1);
      this.context.append();
      await tick();
      expect(this.context.panels![0].resizable).toBe('none');
    });

    it('should update accessibility', function(this: ITestContext) {
      this.context = setupTestContext(false, 2);
      this.context.panels![0].resizable = 'end';
      const spy = spyOn(this.context.panels![0], 'update');
      // this.context.component.update(this.context.panels![1]);
      this.context.component.update({ accessibility: true });
      expect(spy).toHaveBeenCalled();
    });

    it('should not update target accessibility', function(this: ITestContext) {
      this.context = setupTestContext(false, 2);
      this.context.panels![0].resizable = 'end';
      const spy = spyOn(this.context.panels![0], 'update');
      this.context.component.update({ accessibility: true });
      expect(spy).not.toHaveBeenCalled();
    });

    it('should not update accessibility when resizable is none', function(this: ITestContext) {
      this.context = setupTestContext(false, 2);
      this.context.panels![0].resizable = 'none';
      const spy = spyOn(this.context.panels![0], 'update');
      // this.context.component.update(this.context.panels![1]);
      this.context.component.update({ accessibility: true });
      expect(spy).not.toHaveBeenCalled();
    });

    it('should update accessibility on resize', async function(this: ITestContext) {
      this.context = setupTestContext(true, 2);
      await tick();
      const spy = spyOn(this.context.panels![0], 'update');
      this.context.panels![0].resizable = 'end';
      this.context.component.style.width = '100%';
      this.context.component.parentElement!.style.width = '400px';
      await tick();
      expect(spy).toHaveBeenCalled();
    });
  });

  function setupTestContext(append = false, numberOfPanels = 0): ITestSplitViewContext {
    const component = document.createElement('forge-split-view');

    let panels: ISplitViewPanelComponent[] | undefined = undefined;
    if (numberOfPanels) {
      panels = new Array(numberOfPanels).fill(undefined).map(() => {
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
