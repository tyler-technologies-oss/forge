import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { TestHarness } from '../../core/testing/test-harness.js';
import { frame } from '../../core/utils/utils.js';
import type { ISplitViewPanelComponent } from '../split-view-panel/split-view-panel.js';
import { SPLIT_VIEW_PANEL_CONSTANTS, SplitViewAnimatingLayer } from '../split-view-panel/split-view-panel-constants.js';
import type { ISplitViewComponent } from './split-view.js';
import { SPLIT_VIEW_CONSTANTS } from './split-view-constants.js';

type SplitViewCoreInternal = ISplitViewCore & { _adapter: ISplitViewAdapter };
type SplitViewComponentInternal = ISplitViewComponent & { _core: SplitViewCoreInternal };

interface SplitViewPanelCoreInternal {
  _adapter: ISplitViewAdapter;
  _orientation: string;
}
type SplitViewPanelComponentInternal = ISplitViewPanelComponent & { _core: SplitViewPanelCoreInternal };

import '../split-view-panel/split-view-panel.js';
import './split-view.js';
import { ISplitViewCore } from './split-view-core.js';
import { ISplitViewAdapter } from './split-view-adapter.js';

describe('SplitView', () => {
  afterEach(() => {
    // Clean up any elements appended to body during tests
    const splitViews = document.body.querySelectorAll('forge-split-view');
    splitViews.forEach(el => el.remove());
  });

  it('should instantiate component instance', async () => {
    const harness = await createFixture({ appendToBody: true });

    expect(harness.element.isConnected).to.be.true;
  });

  it('should be oriented horizontally by default', async () => {
    const harness = await createFixture();

    expect(harness.element.orientation).to.equal('horizontal');
  });

  it('should be enabled by default', async () => {
    const harness = await createFixture();

    expect(harness.element.disabled).to.be.false;
  });

  it('should disable closing by default', async () => {
    const harness = await createFixture();

    expect(harness.element.allowClose).to.be.false;
  });

  it('should disable autoclose by default', async () => {
    const harness = await createFixture();

    expect(harness.element.autoClose).to.be.false;
  });

  describe('attributes', () => {
    it('should set orientation', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('orientation', 'vertical');

      expect(harness.element.orientation).to.equal('vertical');
    });

    it('should set disabled', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('disabled', 'true');

      expect(harness.element.disabled).to.be.true;
    });

    it('should set allow close', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('allow-close', 'true');

      expect(harness.element.allowClose).to.be.true;
    });

    it('should set auto close', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('auto-close', 'true');

      expect(harness.element.autoClose).to.be.true;
    });

    it('should set auto close threshold', async () => {
      const autoCloseThreshold = 10;
      const harness = await createFixture();

      harness.element.setAttribute('auto-close-threshold', autoCloseThreshold.toString());

      expect(harness.element.autoCloseThreshold).to.equal(autoCloseThreshold);
    });
  });

  describe('layering', () => {
    it('should arrange panels correctly when the target has resizable set to end', async () => {
      const harness = await createFixture({ appendToBody: false, numberOfPanels: 3 });

      harness.panels[1].resizable = 'end';
      harness.element.layerSlottedPanels(harness.panels[1]);

      const layerOne = harness.panels[0].style.getPropertyValue(SPLIT_VIEW_CONSTANTS.customCssProperties.ANIMATING_LAYER);
      const layerTwo = harness.panels[1].style.getPropertyValue(SPLIT_VIEW_CONSTANTS.customCssProperties.ANIMATING_LAYER);
      const layerThree = harness.panels[2].style.getPropertyValue(SPLIT_VIEW_CONSTANTS.customCssProperties.ANIMATING_LAYER);

      expect(layerOne).to.equal(SplitViewAnimatingLayer.Above.toString());
      expect(layerTwo).to.equal(SplitViewAnimatingLayer.Active.toString());
      expect(layerThree).to.equal(SplitViewAnimatingLayer.Under.toString());
    });

    it('should arrange panels correctly when the target has resizable set to start', async () => {
      const harness = await createFixture({ appendToBody: false, numberOfPanels: 3 });

      harness.panels[1].resizable = 'start';
      harness.element.layerSlottedPanels(harness.panels[1]);

      const layerOne = harness.panels[0].style.getPropertyValue(SPLIT_VIEW_CONSTANTS.customCssProperties.ANIMATING_LAYER);
      const layerTwo = harness.panels[1].style.getPropertyValue(SPLIT_VIEW_CONSTANTS.customCssProperties.ANIMATING_LAYER);
      const layerThree = harness.panels[2].style.getPropertyValue(SPLIT_VIEW_CONSTANTS.customCssProperties.ANIMATING_LAYER);

      expect(layerOne).to.equal(SplitViewAnimatingLayer.Under.toString());
      expect(layerTwo).to.equal(SplitViewAnimatingLayer.Active.toString());
      expect(layerThree).to.equal(SplitViewAnimatingLayer.Above.toString());
    });

    it('should remove animating layer properties', async () => {
      const harness = await createFixture({ appendToBody: false, numberOfPanels: 1 });

      harness.panels[0].resizable = 'end';
      harness.element.layerSlottedPanels(harness.panels[0]);
      harness.element.unlayerSlottedPanels();

      const layer = harness.panels[0].style.getPropertyValue(SPLIT_VIEW_CONSTANTS.customCssProperties.ANIMATING_LAYER);

      expect(layer).to.equal('');
    });
  });

  describe('panels', () => {
    it('should set orientation', async () => {
      const harness = await createFixture({ appendToBody: false, numberOfPanels: 1 });

      harness.element.orientation = 'vertical';

      expect((harness.panels[0] as any)['_core']._orientation).to.equal('vertical');
    });

    it('should layout when all have resizable set to off', async () => {
      const harness = await createFixture({ appendToBody: true, numberOfPanels: 3 });

      await frame();

      expect(harness.panels[0].resizable).to.equal('off');
      expect(harness.panels[1].resizable).to.equal('start');
      expect(harness.panels[2].resizable).to.equal('start');
    });

    it('should not layout when resizable is set to start or end', async () => {
      const harness = await createFixture({ appendToBody: false, numberOfPanels: 3 });

      harness.panels[0].resizable = 'end';
      harness.panels[2].resizable = 'start';
      harness.appendToBody();

      await frame();

      expect(harness.panels[0].resizable).to.equal('end');
      expect(harness.panels[1].resizable).to.equal('off');
      expect(harness.panels[2].resizable).to.equal('start');
    });

    it('should not layout one or fewer panels', async () => {
      const harness = await createFixture({ appendToBody: false, numberOfPanels: 1 });

      harness.appendToBody();

      await frame();

      expect(harness.panels[0].resizable).to.equal('off');
    });

    it('should update accessibility', async () => {
      const harness = await createFixture({ appendToBody: false, numberOfPanels: 2 });

      harness.panels[0].resizable = 'end';
      const updateSpy = spy(harness.panels[0], 'update');

      harness.element.update({ accessibility: true });

      expect(updateSpy.called).to.be.true;
    });

    it('should update accessibility on resize', async () => {
      const harness = await createFixture({ appendToBody: true, numberOfPanels: 2 });

      await frame();

      const updateSpy = spy(harness.panels[0], 'update');
      harness.panels[0].resizable = 'end';
      harness.element.style.width = '100%';
      harness.element.parentElement!.style.width = '400px';

      await frame();

      expect(updateSpy.called).to.be.true;
    });

    it('should not update size of closed panels on resize', async () => {
      const harness = await createFixture({ appendToBody: true, numberOfPanels: 2 });

      await frame();

      harness.element.style.width = '400px';
      harness.panels[1].size = '50%';
      harness.panels[1].open = false;

      await frame();

      harness.element.style.width = '200px';

      await frame();

      const size = harness.panels[1].style.getPropertyValue(SPLIT_VIEW_PANEL_CONSTANTS.customCssProperties.SIZE);

      expect(size).to.not.equal('0px');
    });

    it('should query only immediate child panels', async () => {
      const numberOfImmediateChildren = 2;
      const harness = await createFixture({ appendToBody: true, numberOfPanels: numberOfImmediateChildren });

      const div = document.createElement('div');
      const panel = document.createElement('forge-split-view-panel');
      div.appendChild(panel);
      harness.element.appendChild(div);

      const queriedComponents = (harness.element as any)['_core']['_adapter'].getSlottedPanels();

      expect(queriedComponents.length).to.equal(2);
    });
  });
});

interface IFixtureConfig {
  appendToBody?: boolean;
  numberOfPanels?: number;
}

async function createFixture({ appendToBody = false, numberOfPanels = 0 }: IFixtureConfig = {}): Promise<SplitViewTestHarness> {
  const component = document.createElement('forge-split-view') as SplitViewComponentInternal;

  let panels: SplitViewPanelComponentInternal[] = [];
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

  if (appendToBody) {
    document.body.appendChild(fixture);
  }

  return new SplitViewTestHarness(component, panels);
}

class SplitViewTestHarness extends TestHarness<ISplitViewComponent> {
  public panels: ISplitViewPanelComponent[];

  constructor(element: ISplitViewComponent, panels: ISplitViewPanelComponent[]) {
    super(element);
    this.panels = panels;
  }

  public initElementRefs(): void {
    // Split view uses shadow DOM, so we can get internal elements if needed
  }

  public appendToBody(): void {
    document.body.appendChild(this.element);
  }

  public removeFromBody(): void {
    if (this.element.parentElement === document.body) {
      document.body.removeChild(this.element);
    }
  }
}
