import { removeElement } from '@tylertech/forge-core';
import { frame } from '@tylertech/forge/core/utils/utils';
import { defineSplitViewComponent, ISplitViewAdapter, ISplitViewComponent, ISplitViewCore, ISplitViewPanelComponent, SPLIT_VIEW_CONSTANTS, SPLIT_VIEW_PANEL_CONSTANTS, SplitViewAnimatingLayer } from '@tylertech/forge/split-view';
;

interface ITestContext {
  context: ITestSplitViewContext;
}

type SplitViewCoreInternal = ISplitViewCore & { _adapter: ISplitViewAdapter };
type SplitViewComponentInternal = ISplitViewComponent & { _core: SplitViewCoreInternal };

interface SplitViewPanelCoreInternal { _adapter: ISplitViewAdapter, _orientation: string }
type SplitViewPanelComponentInternal = ISplitViewPanelComponent & { _core: SplitViewPanelCoreInternal };

interface ITestSplitViewContext {
  component: SplitViewComponentInternal;
  panels?: SplitViewPanelComponentInternal[];
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

  it('should disable closing by default', function(this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.component.allowClose).toBeFalse();
  })

  it('should disable autoclose by default', function(this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.component.autoClose).toBeFalse();
  })

  describe('attributes', function(this: ITestContext) {
    it('should set orientation', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute('orientation', 'vertical');
      expect(this.context.component.orientation).toBe('vertical');
    })

    it('should set disabled', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute('disabled', 'true');
      expect(this.context.component.disabled).toBeTrue();
    })

    it('should set allow close', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute('allow-close', 'true');
      expect(this.context.component.allowClose).toBeTrue();
    })

    it('should set auto close', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute('auto-close', 'true');
      expect(this.context.component.autoClose).toBeTrue();
    })

    it('should set auto close threshold', function(this: ITestContext) {
      const autoCloseThreshold = 10;
      this.context = setupTestContext();
      this.context.component.setAttribute('auto-close-threshold', autoCloseThreshold.toString());
      expect(this.context.component.autoCloseThreshold).toBe(autoCloseThreshold);
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
      expect(this.context.panels![0]['_core']._orientation).toBe('vertical');
    });

    it('should layout when all have resizable set to off', async function(this: ITestContext) {
      this.context = setupTestContext(true, 3);
      await frame();
      expect(this.context.panels![0].resizable).toBe('off');
      expect(this.context.panels![1].resizable).toBe('start');
      expect(this.context.panels![2].resizable).toBe('start');
    });

    it('should not layout when resizable is set to start or end', async function(this: ITestContext) {
      this.context = setupTestContext(false, 3);
      this.context.panels![0].resizable = 'end';
      this.context.panels![2].resizable = 'start';
      this.context.append();
      await frame();
      expect(this.context.panels![0].resizable).toBe('end');
      expect(this.context.panels![1].resizable).toBe('off');
      expect(this.context.panels![2].resizable).toBe('start');
    });

    it('should not layout one or fewer panels', async function(this: ITestContext) {
      this.context = setupTestContext(false, 1);
      this.context.append();
      await frame();
      expect(this.context.panels![0].resizable).toBe('off');
    });

    it('should update accessibility', function(this: ITestContext) {
      this.context = setupTestContext(false, 2);
      this.context.panels![0].resizable = 'end';
      const spy = spyOn(this.context.panels![0], 'update');
      this.context.component.update({ accessibility: true });
      expect(spy).toHaveBeenCalled();
    });

    it('should update accessibility on resize', async function(this: ITestContext) {
      this.context = setupTestContext(true, 2);
      await frame();
      const spy = spyOn(this.context.panels![0], 'update');
      this.context.panels![0].resizable = 'end';
      this.context.component.style.width = '100%';
      this.context.component.parentElement!.style.width = '400px';
      await frame();
      expect(spy).toHaveBeenCalled();
    });

    it('should not update size of closed panels on resize', async function(this: ITestContext) {
      this.context = setupTestContext(true, 2);
      await frame();
      this.context.component.style.width = '400px';
      this.context.panels![1].size = '50%'
      this.context.panels![1].open = false;
      await frame();
      this.context.component.style.width = '200px';
      await frame();
      const size = this.context.panels![1].style.getPropertyValue(SPLIT_VIEW_PANEL_CONSTANTS.customCssProperties.SIZE);
      expect(size).not.toBe('0px');
    });

    it('should query only immediate child panels', function(this: ITestContext) {
      const numberOfImmediateChildren = 2;
      this.context = setupTestContext(true, numberOfImmediateChildren);
      const div = document.createElement('div');
      const panel = document.createElement('forge-split-view-panel');
      div.appendChild(panel);
      this.context.component.appendChild(div);
      const queriedComponents = (this.context.component['_core']['_adapter'] as ISplitViewAdapter).getSlottedPanels();
      expect(queriedComponents.length).toBe(2);
    });
  });

  function setupTestContext(append = false, numberOfPanels = 0): ITestSplitViewContext {
    const component = document.createElement('forge-split-view') as SplitViewComponentInternal;

    let panels: SplitViewPanelComponentInternal[] | undefined;
    if (numberOfPanels) {
      panels = new Array(numberOfPanels).fill(undefined).map(() => {
        const panel = document.createElement('forge-split-view-panel') as SplitViewPanelComponentInternal;
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
