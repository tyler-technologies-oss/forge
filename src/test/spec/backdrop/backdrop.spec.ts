import { getShadowElement, removeElement } from '@tylertech/forge-core';
import { createFixtureString, cssTimeToMilliseconds, tick, timer } from '@tylertech/forge-testing';
import { BackdropComponent, BACKDROP_CONSTANTS, defineBackdropComponent, IBackdropComponent } from '@tylertech/forge/backdrop';

const DELAY_VALUE = 250;

interface ITestContext {
  context: ITestBackdropContext;
}

interface ITestBackdropContext {
  component: IBackdropComponent;
  append(): void;
  destroy(): void;
}

describe('BackdropComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineBackdropComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  describe('created from string', function(this: ITestContext) {
    it('should be instantiated', function(this: ITestContext) {
      this.context = setupStringTestContext(true);
      expect(this.context.component instanceof BackdropComponent).toBe(true);
    });

    it('should set property values by default', function(this: ITestContext) {
      this.context = setupTestContext(true, DELAY_VALUE);
      expect(this.context.component.delay).toBe(DELAY_VALUE);
    });
  });

  describe('created from DOM API', function(this: ITestContext) {
    it('should instantiate both instances', function(this: ITestContext) {
      const contextString = setupStringTestContext(true);
      this.context = setupTestContext(true);
      expect(contextString.component).toEqual(this.context.component);
      contextString.destroy();
    });

    it('should be instantiated with 0% opacity', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const backdropElement = getShadowElement(this.context.component, BACKDROP_CONSTANTS.selectors.ROOT);
      expect(backdropElement.style.opacity).toBe('0');
    });

    it('should update opacity after delay', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const backdropElement = getShadowElement(this.context.component, BACKDROP_CONSTANTS.selectors.ROOT);

      await timer(BACKDROP_CONSTANTS.numbers.DELAY);
      expect(backdropElement.style.opacity).toBe(BACKDROP_CONSTANTS.numbers.OPACITY.toString());
    });

    it('should set opacity to 0 when fadeOut is called', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const backdropElement = getShadowElement(this.context.component, BACKDROP_CONSTANTS.selectors.ROOT);
      const timeoutDelay = cssTimeToMilliseconds(<string>getComputedStyle(backdropElement).transitionDuration);
      // need to wait for the fade in before attempting to fade out
      // TODO(BLJ): the backdrop component should probably handle this case
      await timer(BACKDROP_CONSTANTS.numbers.TRANSITION_DURATION + BACKDROP_CONSTANTS.numbers.DELAY);
      this.context.component.fadeOut();
      await timer(timeoutDelay);
      expect(backdropElement.style.opacity).toBe('0');
    });

    it('should mirror all properties when setting attributes', function(this: ITestContext) {
      const contextString = setupStringTestContext(true);
      this.context = setupTestContext(true);
      contextString.component.setAttribute(BACKDROP_CONSTANTS.attributes.DELAY, BACKDROP_CONSTANTS.numbers.DELAY.toString());
      expect(this.context.component.delay).toBe(BACKDROP_CONSTANTS.numbers.DELAY);
      contextString.destroy();
    });

    it('should mirror all attributes when setting properties', function(this: ITestContext) {
      const contextString = setupStringTestContext(true);
      this.context = setupTestContext(true);
      this.context.component.delay = BACKDROP_CONSTANTS.numbers.DELAY;
      expect(contextString.component.getAttribute(BACKDROP_CONSTANTS.attributes.DELAY)).toBe(BACKDROP_CONSTANTS.numbers.DELAY.toString());
      contextString.destroy();
    });

    it('should emit event when clicked', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const callback = jasmine.createSpy('callback');
      this.context.component.addEventListener(BACKDROP_CONSTANTS.events.BACKDROP_CLICK, callback);
      getShadowElement(this.context.component, BACKDROP_CONSTANTS.selectors.ROOT).click();
      expect(callback).toHaveBeenCalled();
    });
  });

  describe('maxOpacity', function(this: ITestContext) {
    it('should set the maxOpacity', async function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.component.maxOpacity = 0.8;
      expect(this.context.component.maxOpacity).toBe(0.8);
      this.context.append();
      await tick();

      const backdropElement = getShadowElement(this.context.component, BACKDROP_CONSTANTS.selectors.ROOT);
      
      await timer(BACKDROP_CONSTANTS.numbers.DELAY);
      expect(backdropElement.style.opacity).toBe('0.8');
    });
  });

  describe('appearance', function(this: ITestContext) {
    it('should apply background color when set to light', async function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.component.appearance = 'light';

      expect(this.context.component.appearance).toBe('light');

      this.context.append();
      const backdropElement = getShadowElement(this.context.component, BACKDROP_CONSTANTS.selectors.ROOT);
      await timer(BACKDROP_CONSTANTS.numbers.DELAY);

      const backgroundColor = getComputedStyle(backdropElement).backgroundColor;
      expect(backgroundColor).toBe('rgba(255, 255, 255, 0.54)');
    });

    it('should apply background color when set to dark', async function(this: ITestContext) {
      this.context = setupTestContext(false);
      this.context.component.appearance = 'dark';
      
      expect(this.context.component.appearance).toBe('dark');
      this.context.append();
      const backdropElement = getShadowElement(this.context.component, BACKDROP_CONSTANTS.selectors.ROOT);

      await timer(BACKDROP_CONSTANTS.numbers.DELAY);
      const backgroundColor = getComputedStyle(backdropElement).backgroundColor;
      expect(backgroundColor).toBe('rgba(0, 0, 0, 0.54)');
    });

    it('should not error when setting appearance to the same value', async function(this: ITestContext) {
      this.context = setupTestContext(true);

      const action = () => {
        this.context.component.appearance = 'dark';
        this.context.component.appearance = 'dark';
      };

      expect(action).not.toThrow();
    });
  });

  function setupTestContext(append = false, delay = BACKDROP_CONSTANTS.numbers.DELAY): ITestBackdropContext {
    const fixture = document.createElement('div');
    fixture.id = 'backdrop-test-fixture';
    const component = document.createElement(BACKDROP_CONSTANTS.elementName) as IBackdropComponent;
    component.delay = delay;
    fixture.appendChild(component);
    if (append) {
      document.body.appendChild(fixture);
    }
    return {
      component,
      append: () => document.body.appendChild(fixture),
      destroy: () => {
        removeElement(fixture);
      }
    }
  }

  function setupStringTestContext(append = false, delay = BACKDROP_CONSTANTS.numbers.DELAY): ITestBackdropContext {
    const fixture = document.createElement('div');
    fixture.id = 'backdrop-string-test-fixture';
    const attributes: any = { delay };
    const componentString = createFixtureString(BACKDROP_CONSTANTS.elementName, attributes);
    fixture.innerHTML = componentString;
    if (append) {
      document.body.appendChild(fixture);
    }
    return {
      component: document.querySelector(BACKDROP_CONSTANTS.elementName) as BackdropComponent,
      append: () => document.body.appendChild(fixture),
      destroy: () => {
        removeElement(fixture);
      }
    }
  }
});
