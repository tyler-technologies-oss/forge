import { defineProductIconComponent, IProductIconComponent, PRODUCT_ICON_CONSTANTS } from '@tylertech/forge';
import { removeElement, getShadowElement, Platform } from '@tylertech/forge-core';
import { tick } from '@tylertech/forge-testing';

interface ITestContext {
  context: ITestProductIconContext;
}

interface ITestProductIconContext {
  component: IProductIconComponent;
  iconElement: HTMLElement;
  textElement: HTMLElement;
  attach(...elements: HTMLElement[]): void;
  destroy(): void;
}

const defaultPrimaryColorRgb = 'rgb(63, 81, 181)';
const black = 'rgb(0, 0, 0)';
const white = 'rgb(255, 255, 255)';
const testFontSize = 100;
const iterations = 200;

function setupTestContext(color?: string): ITestProductIconContext {
  const component = document.createElement(PRODUCT_ICON_CONSTANTS.elementName) as IProductIconComponent;
  component.color = color === undefined ? component.color : color;
  const iconElement = getShadowElement(component, PRODUCT_ICON_CONSTANTS.selectors.PRODUCT_ICON);
  const textElement = getShadowElement(component, PRODUCT_ICON_CONSTANTS.selectors.PRODUCT_TEXT);
  document.body.appendChild(component);
  
  return {
    component,
    iconElement,
    textElement,
    attach: (...elements: HTMLElement[]) => {
      if (elements) {
        elements.forEach(e => component.appendChild(e));
      }  
    },
    destroy: () => {
      removeElement(component);
    }
  }
}

describe('ProductIconComponent', function(this: ITestContext) {

  beforeAll(function(this: ITestContext) {
    defineProductIconComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  describe('size configuration', function(this: ITestContext) {
    it('should have the host attribute when set by member', function(this: ITestContext) {
      this.context = setupTestContext();
      const { component } = this.context;
      component.size = testFontSize;
      expect(component.hasAttribute(PRODUCT_ICON_CONSTANTS.attributes.SIZE)).toBe(true, 'The component does not contain the size attribute after being set');
      expect(component.size).toBe(100, `The component did not set the size to ${testFontSize} correctly`);
    });

    it('should have the host attribute when set by attribute', function(this: ITestContext) {
      this.context = setupTestContext();
      const { component } = this.context;
      component.setAttribute(PRODUCT_ICON_CONSTANTS.attributes.SIZE, `${testFontSize}`);
      expect(component.hasAttribute(PRODUCT_ICON_CONSTANTS.attributes.SIZE)).toBe(true, 'The component does not contain the size attribute after being set');
      expect(component.size).toBe(testFontSize, `The component did not set the size to ${testFontSize} correctly`);
    });

    it(`should set the icon font size to ${PRODUCT_ICON_CONSTANTS.numbers.ICON_FONT_SIZE_MODIFIER} of the size `, async function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, iconElement } = this.context;
      this.context.attach(createProductIconIcon());
      // attach(createProductIconIcon());
      component.setAttribute(PRODUCT_ICON_CONSTANTS.attributes.SIZE, `${testFontSize}`);
      await tick();
      const styles = getComputedStyle(iconElement);

      expect(styles.fontSize).toBe(`${testFontSize * PRODUCT_ICON_CONSTANTS.numbers.ICON_FONT_SIZE_MODIFIER}px`, `The icon font size was not correctly modified`);
    });

    it(`should set the text font size to ${PRODUCT_ICON_CONSTANTS.numbers.TEXT_FONT_SIZE_MODIFIER} of the size `, async function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, textElement } = this.context;
      this.context.attach(createProductIconText());
      component.setAttribute(PRODUCT_ICON_CONSTANTS.attributes.SIZE, `${testFontSize}`);
      await tick();
      const styles = getComputedStyle(textElement);

      expect(styles.fontSize).toBe(`${testFontSize * PRODUCT_ICON_CONSTANTS.numbers.TEXT_FONT_SIZE_MODIFIER}px`, `The text font size was not correctly modified`);
    });

    describe('with Trident', function(this: ITestContext) {
      const originalDescriptor = Object.getOwnPropertyDescriptor(Platform, 'TRIDENT') as PropertyDescriptor;

      beforeEach(function(this: ITestContext) {
        Object.defineProperty(Platform, 'TRIDENT', { get: () => true });
      });

      afterEach(function(this: ITestContext) {
        Object.defineProperty(Platform, 'TRIDENT', originalDescriptor);
      });
      it('should have the host attribute when set by member', function(this: ITestContext) {
        this.context = setupTestContext();
        const { component } = this.context;
        component.size = testFontSize;
        expect(component.hasAttribute(PRODUCT_ICON_CONSTANTS.attributes.SIZE)).toBe(true, 'The component does not contain the size attribute after being set');
        expect(component.size).toBe(100, `The component did not set the size to ${testFontSize} correctly`);
      });

      it('should have the host attribute when set by attribute', function(this: ITestContext) {
        this.context = setupTestContext();
        const { component } = this.context;
        component.setAttribute(PRODUCT_ICON_CONSTANTS.attributes.SIZE, `${testFontSize}`);
        expect(component.hasAttribute(PRODUCT_ICON_CONSTANTS.attributes.SIZE)).toBe(true, 'The component does not contain the size attribute after being set');
        expect(component.size).toBe(testFontSize, `The component did not set the size to ${testFontSize} correctly`);
      });

      it(`should set the icon font size to ${PRODUCT_ICON_CONSTANTS.numbers.ICON_FONT_SIZE_MODIFIER} of the size `, async function(this: ITestContext) {
        this.context = setupTestContext();
        const { component, iconElement } = this.context;
        this.context.attach(createProductIconIcon());
        component.setAttribute(PRODUCT_ICON_CONSTANTS.attributes.SIZE, `${testFontSize}`);
        await tick();
        const styles = getComputedStyle(iconElement);

        expect(styles.fontSize).toBe(`${testFontSize * PRODUCT_ICON_CONSTANTS.numbers.ICON_FONT_SIZE_MODIFIER}px`, `The icon font size was not correctly modified`);
      });

      it(`should set the text font size to ${PRODUCT_ICON_CONSTANTS.numbers.TEXT_FONT_SIZE_MODIFIER} of the size `, async function(this: ITestContext) {
        this.context = setupTestContext();
        const { component, iconElement, textElement } = this.context;
        this.context.attach(createProductIconText());
        component.setAttribute(PRODUCT_ICON_CONSTANTS.attributes.SIZE, `${testFontSize}`);
        await tick();
        const styles = getComputedStyle(textElement);

        expect(styles.fontSize).toBe(`${testFontSize * PRODUCT_ICON_CONSTANTS.numbers.TEXT_FONT_SIZE_MODIFIER}px`, `The text font size was not correctly modified`);
      });
    });
  });

  describe('color configuration', function(this: ITestContext) {

    it('should have the host attribute when set by member',  function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, iconElement, textElement } = this.context;
      const color = 'purple';
      component.color = color;
      expect(component.hasAttribute(PRODUCT_ICON_CONSTANTS.attributes.COLOR)).toBe(true, 'The component does not contain the color attribute after being set');
      expect(component.color).toBe(color, `The component did not set the color to ${color} correctly`);
    });

    it('should have the host attribute when set by attribute', function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, iconElement, textElement } = this.context;
      const color = 'purple';
      component.setAttribute(PRODUCT_ICON_CONSTANTS.attributes.COLOR, `${color}`);
      expect(component.hasAttribute(PRODUCT_ICON_CONSTANTS.attributes.COLOR)).toBe(true, 'The component does not contain the color attribute after being set');
      expect(component.color).toBe(color, `The component did not set the color to ${color} correctly`);
    });

    it('should have default background color when invalid color set', function(this: ITestContext) {
      this.context = setupTestContext('NOTACOLOR');
      const { component, iconElement, textElement } = this.context;
      const iconBackground = getShadowElement(component, PRODUCT_ICON_CONSTANTS.selectors.PRODUCT_ICON_BACKGROUND);
      const backgroundStyles = getComputedStyle(iconBackground);

      expect(backgroundStyles.backgroundColor).toBe(defaultPrimaryColorRgb);
    });

    // must be set before attached to dom
    it('should not render when color is set to empty ', async function(this: ITestContext) {
      this.context = setupTestContext('');
      const { component, iconElement, textElement } = this.context;
      const styles = getComputedStyle(getShadowElement(this.context.component, PRODUCT_ICON_CONSTANTS.selectors.PRODUCT_ICON_BACKGROUND));
      expect(styles.backgroundColor).toBe('rgba(0, 0, 0, 0)');
    });

    it('should not render shadow if color is set  and shadow is false', async function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, iconElement, textElement } = this.context;
      component.shadow = false;
      component.color = 'indigo-500';
      const textShadow = getComputedStyle(getShadowElement(this.context.component, PRODUCT_ICON_CONSTANTS.selectors.PRODUCT_ICON)).textShadow;
      expect(textShadow).toBe('none');
    });

    it('should render dark text color with low shade number is in the color', async function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, iconElement, textElement } = this.context;
      component.shadow = false;
      component.color = 'indigo-100';
      await tick();
      const textColor = getComputedStyle(getShadowElement(component, PRODUCT_ICON_CONSTANTS.selectors.PRODUCT_TEXT)).color;
      expect(textColor).toBe(black);
    });

    it('should render light text color with low shade number is in the color', async function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, iconElement, textElement } = this.context;
      component.shadow = false;
      component.color = 'indigo-800';
      await tick();
      const textColor = getComputedStyle(getShadowElement(component, PRODUCT_ICON_CONSTANTS.selectors.PRODUCT_TEXT)).color;
      expect(textColor).toBe(white);
    });
  });

  describe('shadow configuration', function(this: ITestContext) {
    
    it('should have the host attribute when set by attribute set to true', function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, iconElement, textElement } = this.context;
      const shadow = true;
      component.setAttribute(PRODUCT_ICON_CONSTANTS.attributes.SHADOW, `${shadow}`);
      expect(component.hasAttribute(PRODUCT_ICON_CONSTANTS.attributes.SHADOW)).toBe(true, 'The component does not contain the shadow attribute after being set');
      expect(component.shadow).toBe(true, `The component did not set the shadow to ${shadow} correctly`);
    });

    it('should have the host attribute removed when set by attribute to false', function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, iconElement, textElement } = this.context;
      const shadow = false;
      component.setAttribute(PRODUCT_ICON_CONSTANTS.attributes.SHADOW, `${shadow}`);
      expect(component.getAttribute(PRODUCT_ICON_CONSTANTS.attributes.SHADOW)).toBe('false', 'The component does contain the shadow attribute after being set');
      expect(component.shadow).toBe(shadow, `The component did not set the shadow to ${shadow} correctly`);
    });
  });

  describe('iterations configuration', function(this: ITestContext) {

    it('should have the host attribute when set by member', function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, iconElement, textElement } = this.context;
      component.iterations = iterations;
      expect(component.hasAttribute(PRODUCT_ICON_CONSTANTS.attributes.ITERATIONS)).toBe(true, 'The component does not contain the iterations attribute after being set');
      expect(component.iterations).toBe(iterations, `The component did not set the iterations to ${iterations} correctly`);
    });

    it('should have the host attribute when set by attribute', function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, iconElement, textElement } = this.context;
      component.setAttribute(PRODUCT_ICON_CONSTANTS.attributes.ITERATIONS, `${iterations}`);
      expect(component.hasAttribute(PRODUCT_ICON_CONSTANTS.attributes.ITERATIONS)).toBe(true, 'The component does not contain the iterations attribute after being set');
      expect(component.iterations).toBe(iterations, `The component did not set the iterations to ${iterations} correctly`);
    });

    it('should set iterations to half the size by default', function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, iconElement, textElement } = this.context;
      component.setAttribute(PRODUCT_ICON_CONSTANTS.attributes.SIZE, `${testFontSize}`);

      expect(component.iterations).toBe(testFontSize / 2, `The component did not set the iterations to ${testFontSize / 2} correctly`);
    });

    it('should ignore size when iteration are set', function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, iconElement, textElement } = this.context;
      component.setAttribute(PRODUCT_ICON_CONSTANTS.attributes.ITERATIONS, `${iterations}`);
      component.setAttribute(PRODUCT_ICON_CONSTANTS.attributes.SIZE, `${testFontSize}`);

      expect(component.iterations).toBe(iterations, `The component did not set the iterations to ${iterations} correctly`);
    });

    it('should something ', function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, iconElement, textElement } = this.context;
      component.shadow = false;
      component.iterations = iterations;

      expect(component.iterations).toBe(iterations, `The component did not set the iterations to ${iterations} correctly`);
    });
  });

  function createProductIconIcon() {
    const icon = document.createElement('span');
    icon.classList.add('tyler-icons');
    icon.innerText = 'arrow_right';

    return icon;
  }

  function createProductIconText() {
    const text = document.createElement('span');
    text.setAttribute('slot', 'text');
    text.innerText = 'PL';

    return text;
  }
});
