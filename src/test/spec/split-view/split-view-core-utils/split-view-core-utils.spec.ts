import { removeElement } from '@tylertech/forge-core';
import { defineSplitViewComponent, getCursor, getHandleIcon, getSplitViewPanelSibling, ISplitViewPanelComponent, parseSize, SplitViewPanelComponent } from '@tylertech/forge/split-view';

interface ITestContext {
  context: ITestSplitViewCoreUtilsContext;
}

interface ITestSplitViewCoreUtilsContext {
  panels: ISplitViewPanelComponent[];
  append(): void;
  destroy(): void;
}

describe('SplitViewCoreUtils', () => {
  it('should get cursor', () => {
    expect(getCursor('horizontal')).toBe('col-resize');
    expect(getCursor('vertical')).toBe('row-resize');
  });

  it('should get handle icon', () => {
    expect(getHandleIcon('horizontal')).toBe('drag_vertical_variant');
    expect(getHandleIcon('vertical')).toBe('drag_handle');
  });

  describe('parse size', () => {
    it('should parse a number value', () => {
      expect(parseSize(200)).toEqual({amount: 200, unit: 'px'});
    });

    it('should parse a unitless string', () => {
      expect(parseSize('200')).toEqual({amount: 200, unit: 'px'});
      expect(parseSize('200.5')).toEqual({amount: 200.5, unit: 'px'});
    });

    it('should parse a pixel string', () => {
      expect(parseSize('200px')).toEqual({amount: 200, unit: 'px'});
      expect(parseSize('200PX')).toEqual({amount: 200, unit: 'px'});
      expect(parseSize('200 px')).toEqual({amount: 200, unit: 'px'});
      expect(parseSize('200.5px')).toEqual({amount: 200.5, unit: 'px'});
    });

    it('should parse a percentage string', () => {
      expect(parseSize('200%')).toEqual({amount: 200, unit: '%'});
      expect(parseSize('200 %')).toEqual({amount: 200, unit: '%'});
      expect(parseSize('200.5%')).toEqual({amount: 200.5, unit: '%'});
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

  describe('get panel sibling', function(this: ITestContext) {
    beforeAll(function(this: ITestContext) {
      defineSplitViewComponent();
    });

    afterEach(function(this: ITestContext) {
      this.context.destroy();
    });

    it('should return the next panel sibling when position is start', function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.panels[0].position = 'start';
      const sibling = getSplitViewPanelSibling(this.context.panels[0]);
      expect(sibling).toBe(this.context.panels[1] as SplitViewPanelComponent);
    });

    it('should return the previous panel sibling when position is end', function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.panels[1].position = 'end';
      const sibling = getSplitViewPanelSibling(this.context.panels[1]);
      expect(sibling).toBe(this.context.panels[0] as SplitViewPanelComponent);
    });

    it('should return undefined when position is default', function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.panels[0].position = 'default';
      const sibling = getSplitViewPanelSibling(this.context.panels[0]);
      expect(sibling).toBeUndefined();
    });

    it('should skip closed panels', function(this: ITestContext) {
      this.context = setupTestContext(false, 3);
      this.context.panels[0].position = 'start';
      this.context.panels[1].open = false;
      const sibling = getSplitViewPanelSibling(this.context.panels[0]);
      expect(sibling).toBe(this.context.panels[2] as SplitViewPanelComponent);
    });

    it('should skip non-panel siblings', function(this: ITestContext) {
      this.context = setupTestContext(false, 1);
      this.context.panels[0].position = 'start';
      this.context.panels[0].parentElement?.appendChild(document.createElement('div'));
      const sibling = getSplitViewPanelSibling(this.context.panels[0]);
      expect(sibling).toBeUndefined();
    });

    it('should return undefined if no panel siblings', function(this: ITestContext) {
      this.context = setupTestContext(false, 1);
      this.context.panels[0].position = 'start';
      const sibling = getSplitViewPanelSibling(this.context.panels[0]);
      expect(sibling).toBeUndefined();
    });
  });

  function setupTestContext(append = false, numberOfPanels = 2): ITestSplitViewCoreUtilsContext {
    const fixture = document.createElement('div');
    fixture.id = 'split-view-core-utils-test-fixture';

    const panels = new Array(numberOfPanels).fill(undefined).map(() => {
      const panel = document.createElement('forge-split-view-panel');
      fixture.appendChild(panel);
      return panel;
    });

    
    if (append) {
      document.body.appendChild(fixture);
    }

    return {
      panels,
      append: () => document.body.appendChild(fixture),
      destroy: () => removeElement(fixture)
    }
  }
});
