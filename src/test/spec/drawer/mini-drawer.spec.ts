import { removeElement } from '@tylertech/forge-core';
import { defineMiniDrawerComponent, IMiniDrawerComponent } from '@tylertech/forge/drawer';

interface ITestContext {
  context: ITestMiniDrawerContext;
}

interface ITestMiniDrawerContext {
  component: IMiniDrawerComponent;
  append(): void;
  destroy(): void;
}

describe('MiniDrawerComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineMiniDrawerComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should instantiate drawer instance', function (this: ITestContext) {
    this.context = setupTestContext(true);

    expect(this.context.component.isConnected).toBe(true);
  });

  function setupTestContext(append = false): ITestMiniDrawerContext {
    const content = document.createElement('div');
    content.style.width = '256px';
    content.style.height = '5000px';

    const component = document.createElement('forge-mini-drawer');
    component.appendChild(content);

    const fixture = document.createElement('div');
    fixture.id = 'drawer-test-fixture';
    fixture.appendChild(component);

    if (append) {
      document.body.appendChild(fixture);
    }

    return {
      component,
      append: () => document.body.appendChild(fixture),
      destroy: () => removeElement(fixture)
    };
  }
});
