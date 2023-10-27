import { removeElement } from '@tylertech/forge-core';
import { tick } from '@tylertech/forge-testing';
import { IKeyboardShortcutComponent, KEYBOARD_SHORTCUT_CONSTANTS, KeyboardShortcutActivateCallback, defineKeyboardShortcutComponent } from '@tylertech/forge/keyboard-shortcut';

interface ITestContext {
  context: IKeyboardShortcutTestContext
}

interface IKeyboardShortcutTestContext {
  component: IKeyboardShortcutComponent;
  containerElement: HTMLElement;
  targetElement: HTMLElement;
  attach(): void;
  appendTarget(): void;
  setTargetType(type: string): void;
  dispatchKeydownEvent(event: KeyboardEventInit): void;
  spyOnActivateEvent(): jasmine.Spy;
  destroy(): void;
}

describe('KeyboardShortcutComponent', function(this: ITestContext) {

  beforeAll(function(this: ITestContext) {
    defineKeyboardShortcutComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });
  
  it('should emit an event on a matching target keydown event', function(this: ITestContext) {
    const key = 'a';
    this.context = setupTestContext();
    this.context.component.key = key;

    this.context.attach();

    const spy = this.context.spyOnActivateEvent();
    this.context.dispatchKeydownEvent({key});
    expect(spy).toHaveBeenCalled();
  });

  it('should invoke the callback function on a matching target keydown event', function(this: ITestContext) {
    const key = 'a';
    const callback = jasmine.createSpy();
    this.context = setupTestContext();
    this.context.component.key = key;
    this.context.component.activateCallback = callback;

    this.context.attach();

    this.context.dispatchKeydownEvent({key});
    expect(callback).toHaveBeenCalled();
  });

  describe('attributes', function(this: ITestContext) {

    it('should set key when a key attribute is provided', function(this: ITestContext) {
      const key = 'a';
      this.context = setupTestContext(true);
      this.context.component.setAttribute('key', key);
      expect(this.context.component.key).toBe(key);
    });

    it('should set target when a target attribute is provided', function(this: ITestContext) {
      const targetId = 'test-target';
      this.context = setupTestContext(true);
      this.context.targetElement.setAttribute('id', targetId);
      this.context.component.setAttribute('target', '#' + targetId);
      expect(this.context.component.target).toBe('#' + targetId);
    });

    it('should set global when a global attribute is provided', function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.component.setAttribute('global', 'true');
      expect(this.context.component.global).toBeTrue();
    });

    it('should set allowWhileTyping when a allow-while-typing attribute is provided', function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.component.setAttribute('allow-while-typing', 'true');
      expect(this.context.component.allowWhileTyping).toBeTrue();
    });

    it('should set preventDefault when a prevent-default attribute is provided', function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.component.setAttribute('prevent-default', 'true');
      expect(this.context.component.preventDefault).toBeTrue();
    });

    it('should set capture when a capture attribute is provided', function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.component.setAttribute('capture', 'true');
      expect(this.context.component.capture).toBeTrue();
    });

    it('should set useCode when a use-code attribute is provided', function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.component.setAttribute('use-code', 'true');
      expect(this.context.component.useCode).toBeTrue();
    });

    it('should set disabled when a disabled attribute is provided', function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.component.setAttribute('disabled', 'true');
      expect(this.context.component.disabled).toBeTrue();
    });

  });

  describe('key binding', function(this: ITestContext) {

    it('should treat capital and lowercase characters identically', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.attach();
      const spy = this.context.spyOnActivateEvent();

      this.context.component.key = 'A';
      this.context.dispatchKeydownEvent({key: 'a'});
      this.context.component.key = 'a';
      this.context.dispatchKeydownEvent({key: 'A'});

      expect(spy).toHaveBeenCalledTimes(2);
    });

    it('should treat capital characters and keys with shift differently', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.attach();
      const spy = this.context.spyOnActivateEvent();

      this.context.component.key = 'Shift+a';
      this.context.dispatchKeydownEvent({key: 'A'});
      this.context.component.key = 'A';
      this.context.dispatchKeydownEvent({key: 'a', shiftKey: true});

      expect(spy).not.toHaveBeenCalled();
    });

    it('should activate when Alt is pressed', function(this: ITestContext) {
      const key = 'Alt+a';
      this.context = setupTestContext();
      this.context.component.key = key;

      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.dispatchKeydownEvent({key: 'a', altKey: true});
      expect(spy).toHaveBeenCalled();
    });
  
    it('should activate when Control is pressed', function(this: ITestContext) {
      const key = 'Control+a';
      this.context = setupTestContext();
      this.context.component.key = key;

      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.dispatchKeydownEvent({key: 'a', ctrlKey: true});
      expect(spy).toHaveBeenCalled();
    });
  
    it('should activate when Meta is pressed', function(this: ITestContext) {
      const key = 'Meta+a';
      this.context = setupTestContext();
      this.context.component.key = key;

      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.dispatchKeydownEvent({key: 'a', metaKey: true});
      expect(spy).toHaveBeenCalled();
    });
  
    it('should activate when Shift is pressed', function(this: ITestContext) {
      const key = 'Shift+a';
      this.context = setupTestContext();
      this.context.component.key = key;

      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.dispatchKeydownEvent({key: 'a', shiftKey: true});
      expect(spy).toHaveBeenCalled();
    });
  
    it('should activate when multiple modifier keys are pressed', function(this: ITestContext) {
      const key = 'Shift+Alt+a';
      this.context = setupTestContext();
      this.context.component.key = key;

      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.dispatchKeydownEvent({key: 'a', shiftKey: true, altKey: true});
      expect(spy).toHaveBeenCalled();
    });
  
    it('should activate when + is pressed', function(this: ITestContext) {
      const key = 'plus';
      this.context = setupTestContext();
      this.context.component.key = key;

      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.dispatchKeydownEvent({key: '+'});
      expect(spy).toHaveBeenCalled();
    });
  
    it('should activate when space is pressed', function(this: ITestContext) {
      const key = 'space';
      this.context = setupTestContext();
      this.context.component.key = key;

      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.dispatchKeydownEvent({key: ' '});
      expect(spy).toHaveBeenCalled();
    });
  
    it('should activate when multiple key bindings are provided', function(this: ITestContext) {
      const key = 'a b';
      this.context = setupTestContext();
      this.context.component.key = key;

      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.dispatchKeydownEvent({key: 'a'});
      this.context.dispatchKeydownEvent({key: 'b'});
      expect(spy).toHaveBeenCalledTimes(2);
    });
  
    it('should not activate when no keys are specified', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.key = null;

      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.dispatchKeydownEvent({key: 'a'});
      expect(spy).not.toHaveBeenCalled();
    });
  
    it('should activate when a code is provided and useCode is true', function(this: ITestContext) {
      const code = 'Digit1';
      this.context = setupTestContext();
      this.context.component.useCode = true;
      this.context.component.key = code;

      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.dispatchKeydownEvent({code});
      expect(spy).toHaveBeenCalled();
    });

  });
  
  describe('target element', function(this: ITestContext) {

    it('should connect to a target element by selector', function(this: ITestContext) {
      const key = 'a';
      const targetId = 'test-target';
      this.context = setupTestContext(false);
      this.context.targetElement.setAttribute('id', targetId);
      this.context.appendTarget();
      
      this.context.component.key = key;
      this.context.component.target = '#' + targetId;
      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.dispatchKeydownEvent({key});
      expect(spy).toHaveBeenCalled();
    });

    it('should not activate when an event is emitted from a text input element by default', function(this: ITestContext) {
      const key = 'a';
      this.context = setupTestContext(true, true);
      this.context.component.key = key;

      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.dispatchKeydownEvent({key});
      expect(spy).not.toHaveBeenCalled();
    });
    
    it('should not activate when an event is emitted from a date input element by default', function(this: ITestContext) {
      const key = 'a';
      this.context = setupTestContext(true, true);
      this.context.setTargetType('date');
      this.context.component.key = key;

      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.dispatchKeydownEvent({key});
      expect(spy).not.toHaveBeenCalled();
    });
    
    it('should not activate when an event is emitted from a datetime input element by default', function(this: ITestContext) {
      const key = 'a';
      this.context = setupTestContext(true, true);
      this.context.setTargetType('datetime');
      this.context.component.key = key;

      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.dispatchKeydownEvent({key});
      expect(spy).not.toHaveBeenCalled();
    });
    
    it('should not activate when an event is emitted from a datetime-local input element by default', function(this: ITestContext) {
      const key = 'a';
      this.context = setupTestContext(true, true);
      this.context.setTargetType('datetime-local');
      this.context.component.key = key;

      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.dispatchKeydownEvent({key});
      expect(spy).not.toHaveBeenCalled();
    });
    
    it('should not activate when an event is emitted from an email input element by default', function(this: ITestContext) {
      const key = 'a';
      this.context = setupTestContext(true, true);
      this.context.setTargetType('email');
      this.context.component.key = key;

      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.dispatchKeydownEvent({key});
      expect(spy).not.toHaveBeenCalled();
    });
    
    it('should not activate when an event is emitted from a month input element by default', function(this: ITestContext) {
      const key = 'a';
      this.context = setupTestContext(true, true);
      this.context.setTargetType('month');
      this.context.component.key = key;

      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.dispatchKeydownEvent({key});
      expect(spy).not.toHaveBeenCalled();
    });
    
    it('should not activate when an event is emitted from a number input element by default', function(this: ITestContext) {
      const key = 'a';
      this.context = setupTestContext(true, true);
      this.context.setTargetType('number');
      this.context.component.key = key;

      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.dispatchKeydownEvent({key});
      expect(spy).not.toHaveBeenCalled();
    });
    
    it('should not activate when an event is emitted from a password input element by default', function(this: ITestContext) {
      const key = 'a';
      this.context = setupTestContext(true, true);
      this.context.setTargetType('password');
      this.context.component.key = key;

      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.dispatchKeydownEvent({key});
      expect(spy).not.toHaveBeenCalled();
    });
    
    it('should not activate when an event is emitted from a search input element by default', function(this: ITestContext) {
      const key = 'a';
      this.context = setupTestContext(true, true);
      this.context.setTargetType('search');
      this.context.component.key = key;

      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.dispatchKeydownEvent({key});
      expect(spy).not.toHaveBeenCalled();
    });
    
    it('should not activate when an event is emitted from a tel input element by default', function(this: ITestContext) {
      const key = 'a';
      this.context = setupTestContext(true, true);
      this.context.setTargetType('tel');
      this.context.component.key = key;

      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.dispatchKeydownEvent({key});
      expect(spy).not.toHaveBeenCalled();
    });
    
    it('should not activate when an event is emitted from a time input element by default', function(this: ITestContext) {
      const key = 'a';
      this.context = setupTestContext(true, true);
      this.context.setTargetType('time');
      this.context.component.key = key;

      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.dispatchKeydownEvent({key});
      expect(spy).not.toHaveBeenCalled();
    });
    
    it('should not activate when an event is emitted from a url input element by default', function(this: ITestContext) {
      const key = 'a';
      this.context = setupTestContext(true, true);
      this.context.setTargetType('url');
      this.context.component.key = key;

      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.dispatchKeydownEvent({key});
      expect(spy).not.toHaveBeenCalled();
    });
    
    it('should not activate when an event is emitted from a week input element by default', function(this: ITestContext) {
      const key = 'a';
      this.context = setupTestContext(true, true);
      this.context.setTargetType('week');
      this.context.component.key = key;

      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.dispatchKeydownEvent({key});
      expect(spy).not.toHaveBeenCalled();
    });

    it('should activate when an event is emitted from an input element allowWhileTyping is set to true', function(this: ITestContext) {
      const key = 'a';
      this.context = setupTestContext(true, true);
      this.context.component.key = key;
      this.context.component.allowWhileTyping = true;

      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.dispatchKeydownEvent({key});
      expect(spy).toHaveBeenCalled();
    });

    it('should skip tooltip elements when searching for a target', function(this: ITestContext) {
      const key = 'a';
      this.context = setupTestContext();
      this.context.component.key = key;

      const tooltip = document.createElement(KEYBOARD_SHORTCUT_CONSTANTS.selectors.TOOLTIP);
      this.context.containerElement.appendChild(tooltip);
      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.dispatchKeydownEvent({key});
      expect(spy).toHaveBeenCalled();
    });

    it('should connect to the parent element when no previous siblings exist and a selector is not provided', function(this: ITestContext) {
      const key = 'a';
      this.context = setupTestContext(false);
      this.context.component.key = key;

      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.containerElement.dispatchEvent(new KeyboardEvent('keydown', {key}));
      expect(spy).toHaveBeenCalled();
    });

    it('should connect to the parent element if it matches the selector', function(this: ITestContext) {
      const key = 'a';
      const targetId = 'test-target';
      this.context = setupTestContext();
      this.context.component.key = key;
      this.context.component.target = '#' + targetId;
      this.context.containerElement.setAttribute('id', targetId);

      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.containerElement.dispatchEvent(new KeyboardEvent('keydown', {key}));
      expect(spy).toHaveBeenCalled();
    });

    it('should throw when unable to find target element', function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.component.target = '#test-target';
      const action = () => {
        // Accessing the foundation to get to this exception
        this.context.component['_foundation'].initializeTargetElement();
        this.context.attach();
      };
      expect(action).toThrow();
    });

    it('should activate on events on the document element when global is true', function(this: ITestContext) {
      const key = 'a';
      this.context = setupTestContext();
      this.context.component.key = key;
      this.context.component.global = true;
      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      document.documentElement.dispatchEvent(new KeyboardEvent('keydown', {key}));
      expect(spy).toHaveBeenCalled();
    });

  });

  describe('properties', function(this: ITestContext) {

    it('should not activate when disabled is set to true', function(this: ITestContext) {
      const key = 'a';
      this.context = setupTestContext();
      this.context.component.key = key;
      this.context.component.disabled = true;

      this.context.attach();

      const spy = this.context.spyOnActivateEvent();
      this.context.dispatchKeydownEvent({key});
      expect(spy).not.toHaveBeenCalled();
    });

    it('should not invoke the callback when disabled is set to true', function(this: ITestContext) {
      const key = 'a';
      const callback = jasmine.createSpy();
      this.context = setupTestContext();
      this.context.component.key = key;
      this.context.component.activateCallback = callback;
      this.context.component.disabled = true;

      this.context.attach();

      this.context.dispatchKeydownEvent({key});
      expect(callback).not.toHaveBeenCalled();
    });

    it('should connect target element when disabled is set to false', function(this: ITestContext) {
      const key = 'a';
      this.context = setupTestContext();
      this.context.component.key = key;
      this.context.component.disabled = true;

      this.context.attach();
      this.context.component.disabled = false;

      const spy = this.context.spyOnActivateEvent();
      this.context.dispatchKeydownEvent({key});
      expect(spy).toHaveBeenCalled();
    });

    it('should prevent default on the keydown event by default', function(this: ITestContext) {
      const key = 'a';
      this.context = setupTestContext(true, true);
      this.context.component.key = key;
      this.context.component.allowWhileTyping = true;
      this.context.component.preventDefault = true;

      this.context.attach();

      const event = new KeyboardEvent('keydown', {key});
      spyOn(event, 'preventDefault');
      this.context.targetElement.dispatchEvent(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should allow default on the keydown event when prevent default is false', async function(this: ITestContext) {
      const key = 'a';
      this.context = setupTestContext(true, true);
      this.context.component.key = key;
      this.context.component.allowWhileTyping = true;
      this.context.component.preventDefault = false;

      this.context.attach();

      const event = new KeyboardEvent('keydown', {key});
      spyOn(event, 'preventDefault');
      this.context.targetElement.dispatchEvent(event);

      await tick();
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

  });

  function setupTestContext(appendTarget = true, inputElementTarget = false): IKeyboardShortcutTestContext {
    const component = document.createElement('forge-keyboard-shortcut') as IKeyboardShortcutComponent;
    const containerElement = document.createElement('div');
    const targetElement: HTMLElement = document.createElement(inputElementTarget ? 'input' : 'button');

    document.body.appendChild(containerElement);

    if (appendTarget) {
      containerElement.appendChild(targetElement);
    }

    return {
      component,
      containerElement,
      targetElement,
      attach: () => {
        containerElement.appendChild(component);
      },
      appendTarget: () => {
        containerElement.appendChild(targetElement);
      },
      setTargetType: (type: string) => {
        targetElement.setAttribute('type', type);
      },
      dispatchKeydownEvent: (event: KeyboardEventInit, global?: boolean) => {
        if (global) {
          document.dispatchEvent(new KeyboardEvent('keydown', event));
        }
        targetElement.dispatchEvent(new KeyboardEvent('keydown', event));
      },
      spyOnActivateEvent: () => {
        const spy = jasmine.createSpy('activateCallback');
        component.addEventListener(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, () => spy());
        return spy;
      },
      destroy: () => {
        removeElement(targetElement);
        removeElement(component);
        removeElement(containerElement);
      }
    }
  }
});
