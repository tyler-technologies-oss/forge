import { customElement } from '@tylertech/forge-core';
import { html, TemplateResult } from 'lit';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { BaseFocusGroup, createFocusGroupRef, focusGroup, FocusGroupController, FocusGroupRef } from './focus-group.js';

describe('BaseFocusGroup', () => {
  let container: HTMLElement;
  let focusGroupInstance: BaseFocusGroup;

  beforeEach(() => {
    container = document.createElement('div');
    container.innerHTML = `
      <button id="btn1">Button 1</button>
      <button id="btn2">Button 2</button>
      <button id="btn3">Button 3</button>
    `;
    document.body.appendChild(container);

    focusGroupInstance = new BaseFocusGroup(container, {
      selector: 'button',
      orientation: 'horizontal'
    });
    focusGroupInstance.connect();
  });

  afterEach(() => {
    focusGroupInstance.disconnect();
    document.body.removeChild(container);
  });

  describe('initialization', () => {
    it('should set orientation to horizontal by default', () => {
      expect(focusGroupInstance.orientation).toBe('horizontal');
    });

    it('should set wrap to false by default', () => {
      expect(focusGroupInstance.wrap).toBe(false);
    });

    it('should apply custom orientation when provided', () => {
      const instance = new BaseFocusGroup(container, {
        selector: 'button',
        orientation: 'vertical'
      });
      expect(instance.orientation).toBe('vertical');
    });

    it('should apply wrap when configured', () => {
      const instance = new BaseFocusGroup(container, {
        selector: 'button',
        wrap: true
      });
      expect(instance.wrap).toBe(true);
    });
  });

  describe('selector', () => {
    it('should update selector', () => {
      focusGroupInstance.selector = 'button#btn1';
      expect(focusGroupInstance.selector).toBe('button#btn1');
    });
  });

  describe('currentElement', () => {
    it('should set and get current element', () => {
      const btn2 = container.querySelector('#btn2') as HTMLButtonElement;

      focusGroupInstance.currentElement = btn2;

      expect(focusGroupInstance.currentElement).toBe(btn2);
    });

    it('should ignore setting non-matching elements', () => {
      const div = document.createElement('div');
      container.appendChild(div);

      focusGroupInstance.currentElement = div;

      expect(focusGroupInstance.currentElement).toBeNull();
    });

    it('should focus element when group has focus', () => {
      const btn1 = container.querySelector('#btn1') as HTMLButtonElement;
      const btn2 = container.querySelector('#btn2') as HTMLButtonElement;

      btn1.focus();
      focusGroupInstance.currentElement = btn2;

      expect(document.activeElement).toBe(btn2);
    });
  });

  describe('connect', () => {
    it('should set root tabIndex to 0', () => {
      expect(container.tabIndex).toBe(0);
    });

    it('should set tab indices on child elements', () => {
      const buttons = container.querySelectorAll('button');

      buttons.forEach(btn => {
        expect(btn.tabIndex).toBe(-1);
      });
    });
  });

  describe('keyboard navigation', () => {
    describe('horizontal orientation', () => {
      it('should handle ArrowRight key', () => {
        const btn1 = container.querySelector('#btn1') as HTMLButtonElement;
        const btn2 = container.querySelector('#btn2') as HTMLButtonElement;

        btn1.focus();
        const handled = focusGroupInstance.fromKey('ArrowRight');

        expect(handled).toBe(true);
        expect(document.activeElement).toBe(btn2);
      });

      it('should handle ArrowLeft key', () => {
        const btn2 = container.querySelector('#btn2') as HTMLButtonElement;
        const btn1 = container.querySelector('#btn1') as HTMLButtonElement;

        btn2.focus();
        const handled = focusGroupInstance.fromKey('ArrowLeft');

        expect(handled).toBe(true);
        expect(document.activeElement).toBe(btn1);
      });

      it('should not handle ArrowUp key', () => {
        const btn1 = container.querySelector('#btn1') as HTMLButtonElement;

        btn1.focus();
        const handled = focusGroupInstance.fromKey('ArrowUp');

        expect(handled).toBe(false);
      });

      it('should not handle ArrowDown key', () => {
        const btn1 = container.querySelector('#btn1') as HTMLButtonElement;

        btn1.focus();
        const handled = focusGroupInstance.fromKey('ArrowDown');

        expect(handled).toBe(false);
      });
    });

    describe('vertical orientation', () => {
      beforeEach(() => {
        focusGroupInstance.disconnect();
        focusGroupInstance = new BaseFocusGroup(container, {
          selector: 'button',
          orientation: 'vertical'
        });
        focusGroupInstance.connect();
      });

      it('should handle ArrowDown key', () => {
        const btn1 = container.querySelector('#btn1') as HTMLButtonElement;
        const btn2 = container.querySelector('#btn2') as HTMLButtonElement;

        btn1.focus();
        const handled = focusGroupInstance.fromKey('ArrowDown');

        expect(handled).toBe(true);
        expect(document.activeElement).toBe(btn2);
      });

      it('should handle ArrowUp key', () => {
        const btn2 = container.querySelector('#btn2') as HTMLButtonElement;
        const btn1 = container.querySelector('#btn1') as HTMLButtonElement;

        btn2.focus();
        const handled = focusGroupInstance.fromKey('ArrowUp');

        expect(handled).toBe(true);
        expect(document.activeElement).toBe(btn1);
      });

      it('should not handle ArrowLeft key', () => {
        const btn1 = container.querySelector('#btn1') as HTMLButtonElement;

        btn1.focus();
        const handled = focusGroupInstance.fromKey('ArrowLeft');

        expect(handled).toBe(false);
      });

      it('should not handle ArrowRight key', () => {
        const btn1 = container.querySelector('#btn1') as HTMLButtonElement;

        btn1.focus();
        const handled = focusGroupInstance.fromKey('ArrowRight');

        expect(handled).toBe(false);
      });
    });

    describe('both orientation', () => {
      beforeEach(() => {
        focusGroupInstance.disconnect();
        focusGroupInstance = new BaseFocusGroup(container, {
          selector: 'button',
          orientation: 'both'
        });
        focusGroupInstance.connect();
      });

      it('should handle all arrow keys', () => {
        const keys = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'];

        keys.forEach(key => {
          const btn1 = container.querySelector('#btn1') as HTMLButtonElement;
          btn1.focus();
          const handled = focusGroupInstance.fromKey(key);
          expect(handled).toBe(true);
        });
      });
    });

    describe('Home and End keys', () => {
      it('should handle Home key to focus first element', () => {
        const btn3 = container.querySelector('#btn3') as HTMLButtonElement;
        const btn1 = container.querySelector('#btn1') as HTMLButtonElement;

        btn3.focus();
        const handled = focusGroupInstance.fromKey('Home');

        expect(handled).toBe(true);
        expect(document.activeElement).toBe(btn1);
      });

      it('should handle End key to focus last element', () => {
        const btn1 = container.querySelector('#btn1') as HTMLButtonElement;
        const btn3 = container.querySelector('#btn3') as HTMLButtonElement;

        btn1.focus();
        const handled = focusGroupInstance.fromKey('End');

        expect(handled).toBe(true);
        expect(document.activeElement).toBe(btn3);
      });
    });

    describe('wrap behavior', () => {
      it('should not wrap focus from last to first when wrap is false', () => {
        const btn3 = container.querySelector('#btn3') as HTMLButtonElement;

        btn3.focus();
        focusGroupInstance.focusNext();

        expect(document.activeElement).toBe(btn3);
      });

      it('should wrap focus from last to first when wrap is true', () => {
        focusGroupInstance.disconnect();
        focusGroupInstance = new BaseFocusGroup(container, {
          selector: 'button',
          wrap: true
        });
        focusGroupInstance.connect();

        const btn3 = container.querySelector('#btn3') as HTMLButtonElement;
        const btn1 = container.querySelector('#btn1') as HTMLButtonElement;

        btn3.focus();
        focusGroupInstance.focusNext();

        expect(document.activeElement).toBe(btn1);
      });

      it('should not wrap focus from first to last when wrap is false', () => {
        const btn1 = container.querySelector('#btn1') as HTMLButtonElement;

        btn1.focus();
        focusGroupInstance.focusPrevious();

        expect(document.activeElement).toBe(btn1);
      });

      it('should wrap focus from first to last when wrap is true', () => {
        focusGroupInstance.disconnect();
        focusGroupInstance = new BaseFocusGroup(container, {
          selector: 'button',
          wrap: true
        });
        focusGroupInstance.connect();

        const btn1 = container.querySelector('#btn1') as HTMLButtonElement;
        const btn3 = container.querySelector('#btn3') as HTMLButtonElement;

        btn1.focus();
        focusGroupInstance.focusPrevious();

        expect(document.activeElement).toBe(btn3);
      });
    });
  });

  describe('fromEvent', () => {
    it('should handle keyboard event and prevent default', () => {
      const btn1 = container.querySelector('#btn1') as HTMLButtonElement;
      btn1.focus();

      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      const handled = focusGroupInstance.fromEvent(event);

      expect(handled).toBe(true);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should not prevent default for unhandled keys', () => {
      const btn1 = container.querySelector('#btn1') as HTMLButtonElement;
      btn1.focus();

      const event = new KeyboardEvent('keydown', { key: 'Tab' });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      const handled = focusGroupInstance.fromEvent(event);

      expect(handled).toBe(false);
      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });
  });

  describe('focus methods', () => {
    it('should focus next element', () => {
      const btn1 = container.querySelector('#btn1') as HTMLButtonElement;
      const btn2 = container.querySelector('#btn2') as HTMLButtonElement;

      btn1.focus();
      focusGroupInstance.focusNext();

      expect(document.activeElement).toBe(btn2);
    });

    it('should focus previous element', () => {
      const btn2 = container.querySelector('#btn2') as HTMLButtonElement;
      const btn1 = container.querySelector('#btn1') as HTMLButtonElement;

      btn2.focus();
      focusGroupInstance.focusPrevious();

      expect(document.activeElement).toBe(btn1);
    });

    it('should focus first element', () => {
      const btn3 = container.querySelector('#btn3') as HTMLButtonElement;
      const btn1 = container.querySelector('#btn1') as HTMLButtonElement;

      btn3.focus();
      focusGroupInstance.focusFirst();

      expect(document.activeElement).toBe(btn1);
    });

    it('should focus last element', () => {
      const btn1 = container.querySelector('#btn1') as HTMLButtonElement;
      const btn3 = container.querySelector('#btn3') as HTMLButtonElement;

      btn1.focus();
      focusGroupInstance.focusLast();

      expect(document.activeElement).toBe(btn3);
    });

    it('should focus element at specific index', () => {
      const btn2 = container.querySelector('#btn2') as HTMLButtonElement;

      focusGroupInstance.focusAt(1);

      expect(document.activeElement).toBe(btn2);
    });

    it('should focus specific element', () => {
      const btn2 = container.querySelector('#btn2') as HTMLButtonElement;

      focusGroupInstance.focus(btn2);

      expect(document.activeElement).toBe(btn2);
    });

    it('should focus root when focusing invalid element', () => {
      const div = document.createElement('div');
      container.appendChild(div);

      focusGroupInstance.focus(div);

      // When invalid element is passed, it focuses root which then advances to first button
      expect(document.activeElement).toBe(container.querySelector('#btn1'));
    });

    it('should focus root and then first element when focusing invalid index', () => {
      focusGroupInstance.focusAt(99);

      // focusAt with invalid index calls focusRoot, which advances to first element
      expect(document.activeElement).toBe(container.querySelector('#btn1'));
    });
  });

  describe('focusRoot', () => {
    it('should trigger focus on root which advances to first element', () => {
      const btn1 = container.querySelector('#btn1') as HTMLButtonElement;

      focusGroupInstance.focusRoot();

      // Focusing root triggers focusin handler which focuses first element
      expect(document.activeElement).toBe(btn1);
    });

    it('should restore focus to last focused element when root gains focus', () => {
      const btn2 = container.querySelector('#btn2') as HTMLButtonElement;

      btn2.focus();
      document.body.focus();
      container.focus();

      expect(document.activeElement).toBe(btn2);
    });
  });

  describe('hasFocus', () => {
    it('should return true when an element in the group has focus', () => {
      const btn1 = container.querySelector('#btn1') as HTMLButtonElement;

      btn1.focus();

      expect(focusGroupInstance.hasFocus()).toBe(true);
    });

    it('should return false when no element in the group has focus', () => {
      expect(focusGroupInstance.hasFocus()).toBe(false);
    });
  });

  describe('onFocusChange callback', () => {
    it('should call onFocusChange when focus changes', () => {
      const onFocusChange = vi.fn();
      focusGroupInstance.disconnect();
      focusGroupInstance = new BaseFocusGroup(container, {
        selector: 'button',
        onFocusChange
      });
      focusGroupInstance.connect();

      const btn1 = container.querySelector('#btn1') as HTMLButtonElement;
      btn1.focus();

      expect(onFocusChange).toHaveBeenCalledWith(expect.any(FocusEvent), btn1);
    });
  });

  describe('getFirstChild callback', () => {
    it('should use custom getFirstChild callback', () => {
      const btn3 = container.querySelector('#btn3') as HTMLButtonElement;
      const getFirstChild = vi.fn(() => btn3);

      focusGroupInstance.disconnect();
      focusGroupInstance = new BaseFocusGroup(container, {
        selector: 'button',
        getFirstChild
      });
      focusGroupInstance.connect();

      container.focus();

      expect(getFirstChild).toHaveBeenCalled();
      expect(document.activeElement).toBe(btn3);
    });
  });

  describe('slotted elements', () => {
    it('should include slotted elements in focus group', () => {
      const shadowHost = document.createElement('div');
      shadowHost.attachShadow({ mode: 'open' });
      shadowHost.shadowRoot!.innerHTML = `
        <slot></slot>
      `;
      shadowHost.innerHTML = `
        <button id="slotted1">Slotted 1</button>
        <button id="slotted2">Slotted 2</button>
      `;
      document.body.appendChild(shadowHost);

      const instance = new BaseFocusGroup(shadowHost, {
        selector: 'button'
      });
      instance.connect();

      const slottedBtn1 = shadowHost.querySelector('#slotted1') as HTMLButtonElement;
      const slottedBtn2 = shadowHost.querySelector('#slotted2') as HTMLButtonElement;

      slottedBtn1.focus();
      instance.focusNext();

      expect(document.activeElement).toBe(slottedBtn2);

      instance.disconnect();
      document.body.removeChild(shadowHost);
    });
  });

  describe('disabled element handling', () => {
    it('should restore root tabIndex when focused element becomes disabled', () => {
      const btn1 = container.querySelector('#btn1') as HTMLButtonElement;

      btn1.focus();

      btn1.disabled = true;
      btn1.dispatchEvent(new FocusEvent('focusout', { relatedTarget: null, bubbles: true }));

      expect(container.tabIndex).toBe(0);
    });
  });

  describe('tab index management', () => {
    it('should set tabIndex to 0 for root when focus leaves group', () => {
      const btn1 = container.querySelector('#btn1') as HTMLButtonElement;
      const externalButton = document.createElement('button');
      document.body.appendChild(externalButton);

      btn1.focus();

      externalButton.focus();
      container.dispatchEvent(new FocusEvent('focusout', { relatedTarget: externalButton, bubbles: true }));

      expect(container.tabIndex).toBe(0);

      document.body.removeChild(externalButton);
    });

    it('should maintain tabIndex -1 on root when focus moves within group', () => {
      const btn1 = container.querySelector('#btn1') as HTMLButtonElement;
      const btn2 = container.querySelector('#btn2') as HTMLButtonElement;

      btn1.focus();
      btn2.focus();

      expect(container.tabIndex).toBe(-1);
    });
  });
});

describe('FocusGroupController', () => {
  @customElement({ name: 'test-focus-group-controller' })
  class TestFocusGroupController extends BaseLitElement {
    public focusGroup = new FocusGroupController(this, {
      selector: 'button',
      orientation: 'horizontal'
    });

    public render(): TemplateResult {
      return html`
        <button id="btn1">Button 1</button>
        <button id="btn2">Button 2</button>
        <button id="btn3">Button 3</button>
      `;
    }
  }

  function setupTest(): TestFocusGroupController {
    const screen = render(html`<test-focus-group-controller></test-focus-group-controller>`);
    return screen.container.querySelector('test-focus-group-controller') as TestFocusGroupController;
  }

  it('should initialize controller on host', () => {
    const element = setupTest();

    expect(element.focusGroup).toBeDefined();
    expect(element.focusGroup.host).toBe(element);
  });

  it('should connect when host is connected', () => {
    const element = setupTest();

    expect(element.tabIndex).toBe(0);
  });

  it('should disconnect when host is disconnected', () => {
    const element = setupTest();
    const disconnectSpy = vi.spyOn(element.focusGroup, 'disconnect');

    element.remove();

    expect(disconnectSpy).toHaveBeenCalled();
  });

  it('should have focus group controller instance', () => {
    const element = setupTest();

    expect(element.focusGroup).toBeDefined();
    expect(element.focusGroup.orientation).toBe('horizontal');
    expect(element.focusGroup.wrap).toBe(false);
  });
});

describe('FocusGroupRef and focusGroup directive', () => {
  @customElement({ name: 'test-focus-group-directive' })
  class TestFocusGroupDirective extends BaseLitElement {
    public focusGroupRef = createFocusGroupRef({
      selector: 'button',
      orientation: 'horizontal',
      wrap: true
    });

    public render(): TemplateResult {
      return html`
        <div ${focusGroup(this.focusGroupRef)}>
          <button id="btn1">Button 1</button>
          <button id="btn2">Button 2</button>
          <button id="btn3">Button 3</button>
        </div>
      `;
    }
  }

  function setupTest(): TestFocusGroupDirective {
    const screen = render(html`<test-focus-group-directive></test-focus-group-directive>`);
    return screen.container.querySelector('test-focus-group-directive') as TestFocusGroupDirective;
  }

  it('should create focus group ref with createFocusGroupRef', () => {
    const ref = createFocusGroupRef({
      selector: 'button',
      orientation: 'vertical'
    });

    expect(ref).toBeInstanceOf(FocusGroupRef);
  });

  it('should initialize focus group ref', () => {
    const element = setupTest();

    expect(element.focusGroupRef).toBeDefined();
    expect(element.focusGroupRef).toBeInstanceOf(FocusGroupRef);
  });

  it('should have programmatic focus control methods on ref', () => {
    const element = setupTest();

    expect(element.focusGroupRef.focusNext).toBeDefined();
    expect(element.focusGroupRef.focusPrevious).toBeDefined();
    expect(element.focusGroupRef.focusFirst).toBeDefined();
    expect(element.focusGroupRef.focusLast).toBeDefined();
    expect(typeof element.focusGroupRef.focusNext).toBe('function');
  });

  it('should have disconnect method available', () => {
    const element = setupTest();

    expect(element.focusGroupRef.disconnect).toBeDefined();
    expect(typeof element.focusGroupRef.disconnect).toBe('function');
  });
});

describe('edge cases', () => {
  it('should handle empty focus group', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const instance = new BaseFocusGroup(container, {
      selector: 'button'
    });
    instance.connect();

    // Focusing next with no elements focuses root
    instance.focusNext();
    expect(document.activeElement).toBe(container);

    instance.disconnect();
    document.body.removeChild(container);
  });

  it('should handle single element focus group', () => {
    const container = document.createElement('div');
    container.innerHTML = '<button id="btn1">Button 1</button>';
    document.body.appendChild(container);

    const instance = new BaseFocusGroup(container, {
      selector: 'button'
    });
    instance.connect();

    const btn1 = container.querySelector('#btn1') as HTMLButtonElement;
    btn1.focus();

    instance.focusNext();
    expect(document.activeElement).toBe(btn1);

    instance.focusPrevious();
    expect(document.activeElement).toBe(btn1);

    instance.disconnect();
    document.body.removeChild(container);
  });

  it('should handle uninitialized BaseFocusGroup', () => {
    const instance = new BaseFocusGroup();

    expect(() => instance.connect()).not.toThrow();
    expect(() => instance.disconnect()).not.toThrow();
    expect(instance.hasFocus()).toBe(false);
  });
});
