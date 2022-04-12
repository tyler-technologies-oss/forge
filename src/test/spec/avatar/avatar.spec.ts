import { IAvatarComponent, AVATAR_CONSTANTS, defineAvatarComponent } from '@tylertech/forge/avatar';
import { tick, appendElement, timer } from '@tylertech/forge-testing';
import { removeElement, getShadowElement } from '@tylertech/forge-core';

const DEFAULT_TEXT = 'Tom Brady';
const DEFAULT_LETTER_COUNT = 1;

interface ITestContext {
  context: ITestAvatarContext;
}

interface ITestAvatarContext {
  component: IAvatarComponent;
  destroy(): void;
}

describe('AvatarComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineAvatarComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  describe('with default attribute values', function(this: ITestContext) {
    it('should set slot text to first character of text', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const defaultSlot = getShadowElement(this.context.component, AVATAR_CONSTANTS.selectors.DEFAULT_SLOT);
      expect(defaultSlot.textContent).toBe('T');
    });

    it('should change background image when set via attribute', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();

      const url = 'https://empower.tylertech.com/rs/015-NUU-525/images/tyler-logo-color.svg';
      this.context.component.setAttribute(AVATAR_CONSTANTS.attributes.IMAGE_URL, url);
      const root = getShadowElement(this.context.component, AVATAR_CONSTANTS.selectors.ROOT);
      // Give enough time for the image to load
      await timer(2000);
      expect(root.hasAttribute('style')).toBe(true);
      expect(root.getAttribute('style')).toContain('background-image');
      expect(root.getAttribute('style')).toContain(url);
    });

    it('should change text content when set via attribute', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      this.context.component.setAttribute(AVATAR_CONSTANTS.attributes.TEXT, 'New Text');
      const defaultSlot = getShadowElement(this.context.component, AVATAR_CONSTANTS.selectors.DEFAULT_SLOT);
      expect(defaultSlot.textContent).toBe('N');
    });

    it('should change text content when letter count is set via attribute', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      this.context.component.setAttribute(AVATAR_CONSTANTS.attributes.LETTER_COUNT, '3');
      const defaultSlot = getShadowElement(this.context.component, AVATAR_CONSTANTS.selectors.DEFAULT_SLOT);
      expect(defaultSlot.textContent).toBe('TB');
    });
  });

  describe('without default values', function(this: ITestContext) {
    it('should have proper default values', function(this: ITestContext) {
      this.context = setupTestContext(true, false);
      expect(this.context.component.text).toBe('');
      expect(this.context.component.letterCount).toBe(AVATAR_CONSTANTS.numbers.DEFAULT_LETTER_COUNT);
      expect(this.context.component.imageUrl).toBeUndefined();
      expect(this.context.component.autoColor).toBeFalse();
    });

    it('should have not have any content by default', function(this: ITestContext) {
      this.context = setupTestContext(true, false);
      const defaultSlot = getShadowElement(this.context.component, AVATAR_CONSTANTS.selectors.DEFAULT_SLOT);
      expect(defaultSlot.textContent).toBe('');
    });

    it('should not set background-color when text is not set', async function(this: ITestContext) {
      this.context = setupTestContext(true, false);
      const root = getShadowElement(this.context.component, AVATAR_CONSTANTS.selectors.ROOT);
      expect(root.style.backgroundColor).toBe(`var(${AVATAR_CONSTANTS.strings.BACKGROUND_VARNAME}, ${AVATAR_CONSTANTS.strings.DEFAULT_COLOR})`);
    });

    it('should set text content properly using default letter count', function(this: ITestContext) {
      this.context = setupTestContext(true, false);
      const defaultSlot = getShadowElement(this.context.component, AVATAR_CONSTANTS.selectors.DEFAULT_SLOT);
      this.context.component.text = DEFAULT_TEXT;
      expect(defaultSlot.innerText.length).toBe(AVATAR_CONSTANTS.numbers.DEFAULT_LETTER_COUNT);
      expect(defaultSlot.textContent).toBe('TB');
    });

    it('should set background-color when text is set', function(this: ITestContext) {
      this.context = setupTestContext(true, false);
      const root = getShadowElement(this.context.component, AVATAR_CONSTANTS.selectors.ROOT);
      this.context.component.text = DEFAULT_TEXT;

      expect(root.hasAttribute('style')).toBe(true);
      expect(root.getAttribute('style')).toContain('background-color');
      expect(root.style.backgroundColor).not.toBeNull();
      expect(root.style.backgroundColor).not.toBe('');
      expect(root.style.backgroundColor!.length).toBeGreaterThan(0);
    });

    it('should set background-color when text is set and autoColor is false', function(this: ITestContext) {
      this.context = setupTestContext(true, false);
      this.context.component.autoColor = false;

      const root = getShadowElement(this.context.component, AVATAR_CONSTANTS.selectors.ROOT);
      this.context.component.text = DEFAULT_TEXT;

      expect(root.style.backgroundColor).toBe(`var(${AVATAR_CONSTANTS.strings.BACKGROUND_VARNAME}, ${AVATAR_CONSTANTS.strings.DEFAULT_COLOR})`);
    });

    it('should render slotted content in place of text content', function(this: ITestContext) {
      this.context = setupTestContext(true, false);
      const defaultSlot = getShadowElement(this.context.component, AVATAR_CONSTANTS.selectors.DEFAULT_SLOT) as HTMLSlotElement;

      this.context.component.text = DEFAULT_TEXT;

      const node = document.createTextNode('Test Text');
      this.context.component.appendChild(node);

      expect(defaultSlot.textContent).toBe('TB');
      expect(defaultSlot.assignedNodes().length).toBe(1);
    });

    xit('should render background-image when image URL is set', async function(this: ITestContext) {
      this.context = setupTestContext(true, false);
      const url = 'https://empower.tylertech.com/rs/015-NUU-525/images/tyler-logo-color.svg';
      this.context.component.imageUrl = url;

      const root = getShadowElement(this.context.component, AVATAR_CONSTANTS.selectors.ROOT);

      // Give enough time for the image to load
      await timer(2000);

      expect(root.hasAttribute('style')).toBe(true);
      expect(root.getAttribute('style')).toContain('background-image');
      expect(root.getAttribute('style')).toContain(url);
    });

    it('should update text content when letter count changes', async function(this: ITestContext) {
      this.context = setupTestContext(true, false);
      const defaultSlot = getShadowElement(this.context.component, AVATAR_CONSTANTS.selectors.DEFAULT_SLOT) as HTMLSlotElement;
      this.context.component.text = DEFAULT_TEXT;
      await tick();
      expect(defaultSlot.textContent).toBe('TB');
      await tick();
      this.context.component.letterCount = 1;
      expect(defaultSlot.textContent).toBe('T');
    });

    it('should render first character of each word when letter count is greater than number of words', function(this: ITestContext) {
      this.context = setupTestContext(true, false);
      const defaultSlot = getShadowElement(this.context.component, AVATAR_CONSTANTS.selectors.DEFAULT_SLOT) as HTMLSlotElement;
      this.context.component.text = 'some long string with spaces';
      this.context.component.letterCount = 6; // One greater than the number of words in the string
      expect(defaultSlot.textContent).toBe('SLSWS');
    });

    it('should render text when image url fails to load an image with 500 error', async function(this: ITestContext) {
      this.context = setupTestContext(true, false);
      const defaultSlot = getShadowElement(this.context.component, AVATAR_CONSTANTS.selectors.DEFAULT_SLOT) as HTMLSlotElement;

      this.context.component.text = 'Invalid Url';
      // Url that will return a 500 error
      this.context.component.imageUrl = 'https://httpstat.us/500';
      await timer(300);
      expect(defaultSlot.textContent).toBe('IU');
    });

    it('should render text when image url fails to load an image', async function(this: ITestContext) {
      this.context = setupTestContext(true, false);
      const defaultSlot = getShadowElement(this.context.component, AVATAR_CONSTANTS.selectors.DEFAULT_SLOT) as HTMLSlotElement;
      const root = getShadowElement(this.context.component, AVATAR_CONSTANTS.selectors.ROOT);

      this.context.component.text = 'Invalid Url';
      // Url that will return a 404 error
      this.context.component.imageUrl = 'https://httpstat.us/404';
      await timer(300);
      expect(defaultSlot.textContent).toBe('IU');
      expect(root.getAttribute('style')).not.toContain('background-image');
    });
  });

  function setupTestContext(append = false, useDefaultValues = true): ITestAvatarContext {
    const fixture = document.createElement('div');
    fixture.id = 'avatar-test-fixture';
    const component = document.createElement(AVATAR_CONSTANTS.elementName) as IAvatarComponent;
    if (useDefaultValues) {
      component.text = DEFAULT_TEXT;
      component.letterCount = DEFAULT_LETTER_COUNT;
    }
    fixture.appendChild(component);
    if (append) {
      document.body.appendChild(fixture);
    }
    return {
      component,
      destroy: () => removeElement(fixture)
    };
  }
});
