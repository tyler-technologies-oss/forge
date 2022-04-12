import { removeElement } from '@tylertech/forge-core';
import { INLINE_MESSAGE_CONSTANTS, IInlineMessageComponent, defineInlineMessageComponent, InlineMessageComponent } from '@tylertech/forge/inline-message';

interface ITestContext {
  context: ITestInlineMessageContext
}

interface ITestInlineMessageContext {
  component: IInlineMessageComponent;
  destroy(): void;
}

describe('InlineMessageComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineInlineMessageComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  describe('Instantiation', function(this: ITestContext) {
    it('should be connected', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.isConnected).toBe(true);
    });

    it('should instantiate component with shadow dom', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.shadowRoot).toBeDefined();
    });

    it('should instantiate component as InlineMessageComponent', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component instanceof InlineMessageComponent).toBe(true);
    });

  });

  function setupTestContext(): ITestInlineMessageContext {
    const fixture = document.createElement('div');
    fixture.id = 'inline-message-test-fixture';
    const component = document.createElement(INLINE_MESSAGE_CONSTANTS.elementName) as IInlineMessageComponent;
    const icon = document.createElement('i') as HTMLElement;
    icon.classList.add('tyler-icons');
    icon.slot = 'icon';
    icon.textContent = 'notifications';
    component.appendChild(icon);
    const title = document.createElement('div');
    title.slot = 'title';
    title.textContent = 'Mollit id in est sit';
    component.appendChild(title);
    const body = document.createElement('div');
    body.setAttribute('slot', '');
    body.textContent = 'Irure quis enim labore qui deserunt ea fugiat. Mollit id in est sit in mollit.';
    component.appendChild(body);
    fixture.appendChild(component);
    document.body.appendChild(fixture);
    return {
      component,
      destroy: () => removeElement(fixture)
    };
  }
  
});
