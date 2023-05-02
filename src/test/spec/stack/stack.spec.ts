import { removeElement } from '@tylertech/forge-core';
import { IStackComponent, STACK_CONSTANTS, StackAlignMode, defineStackComponent } from '@tylertech/forge';

interface ITestContext {
  context: IStackTestContext;
}

interface IStackTestContext {
  fixture: HTMLElement;
  component: IStackComponent;
  append(): void;
  destroy(): void;
}

describe('StackComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineStackComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should instantiate component with shadow dom', function(this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.component.shadowRoot).toBeTruthy();
  });

  describe('with default attribute values', function(this: ITestContext) {
    it('should set the inline property to false when the attribute is not applied', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.inline).toBe(false);
    });
    it('should set the wrap property to false when the attribute is not applied', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.wrap).toBe(false);
    });
    it('should set the stretch property to false when the attribute is not applied', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.stretch).toBe(false);
    });
    it('should set the align property to start when the attribute is not applied', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.alignment).toBe(StackAlignMode.Start);
    });
    it('should set the gap property to 16 when the attribute is not applied', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.gap).toBe('16');
    });
  });
  

  describe('without default values', function(this: ITestContext) {
    it('should set the inline property to true when the attribute is set to true', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(STACK_CONSTANTS.attributes.INLINE, 'true');
      expect(this.context.component.inline).toBe(true);
    });

    it('should set the inline property to false when the attribute is set to false', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(STACK_CONSTANTS.attributes.INLINE, 'false');
      expect(this.context.component.inline).toBe(false);
    });

    it('should set the wrap property to true when the attribute is set to true', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(STACK_CONSTANTS.attributes.WRAP, 'true');
      expect(this.context.component.wrap).toBe(true);
    });

    it('should set the wrap property to false when the attribute is set to false', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(STACK_CONSTANTS.attributes.WRAP, 'false');
      expect(this.context.component.wrap).toBe(false);
    });

    it('should set the stretch property to true when the attribute is set to true', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(STACK_CONSTANTS.attributes.STRETCH, 'true');
      expect(this.context.component.stretch).toBe(true);
    });

    it('should set the stretch property to false when the attribute is set to false', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(STACK_CONSTANTS.attributes.STRETCH, 'false');
      expect(this.context.component.stretch).toBe(false);
    });

    it('should set the gap property to 100px when the attribute is set to 100', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(STACK_CONSTANTS.attributes.GAP, '100');
      expect(this.context.component.gap).toBe('100px');
    });

    it('should set the gap property to 64px when the attribute is set to 64px', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(STACK_CONSTANTS.attributes.GAP, '64px');
      expect(this.context.component.gap).toBe('64px');
    });

    it('should set the alignment property to start when the attribute is set to start', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(STACK_CONSTANTS.attributes.ALIGNMENT, 'start');
      expect(this.context.component.alignment).toBe(StackAlignMode.Start);
    });

    it('should set the align property to center when the attribute is set to center', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(STACK_CONSTANTS.attributes.ALIGNMENT, 'center');
      expect(this.context.component.alignment).toBe(StackAlignMode.Center);
    });

    it('should set the align property to end when the attribute is set to end', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(STACK_CONSTANTS.attributes.ALIGNMENT, 'end');
      expect(this.context.component.alignment).toBe(StackAlignMode.End);
    });
  });

  function setupTestContext(append = true): IStackTestContext {
    const fixture = document.createElement('div');
    const component = document.createElement('forge-stack');
    fixture.appendChild(component);

    if (append) {
      document.body.appendChild(fixture);
    }

    return {
      fixture,
      component,
      append: () => document.body.appendChild(fixture),
      destroy: () => removeElement(fixture)
    };
  }
});
