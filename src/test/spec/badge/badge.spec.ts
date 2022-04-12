import { defineBadgeComponent, BADGE_CONSTANTS, IBadgeComponent, BadgeComponent } from '@tylertech/forge/badge';
import { removeElement, getShadowElement } from '@tylertech/forge-core';

interface ITestContext {
  context: ITestBadgeContext;
}

interface ITestBadgeContext {
  component: IBadgeComponent;
  appendToBody(): void;
  appendToFixture(): void;
  destroy(): void;
}

describe('BadgeComponent', function(this: ITestContext) {
  const bogusAttribute = 'BOGUS_ATTRIBUTE';

  beforeAll(function(this: ITestContext) {
    defineBadgeComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should instantiate component instance', function(this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.component.shadowRoot).not.toBeNull();
  });

  describe('with default values', function(this: ITestContext) {
    it('should instantiate dot to false', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.dot).toBeFalse();
    });
    it('should instantiate open to true', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.open).toBeTrue();
    });
  });

  describe('with dot set to true', function(this: ITestContext) {
    it('should add the dot class to the root element', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.dot = true;
      const rootElement = getShadowElement(this.context.component, BADGE_CONSTANTS.selectors.ROOT);

      const thatTheElementContainmentOfTheDotClass = rootElement.classList.contains(
        BADGE_CONSTANTS.classes.DOT
      );

      expect(thatTheElementContainmentOfTheDotClass).toBe(true);
    });

    it('should add the dot attriute to the component', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.dot = true;

      const thatTheDotAttributeDefinition = this.context.component.getAttribute(
        BADGE_CONSTANTS.attributes.DOT
      );
      expect(thatTheDotAttributeDefinition).not.toBeNull();
    });
  });

  describe('with dot set to false', function(this: ITestContext) {
    it('should not add the dot class to the root element', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.dot = false;
      const rootElement = getShadowElement(this.context.component, BADGE_CONSTANTS.selectors.ROOT);

      const theClassContainsTheDotClass = rootElement.classList.contains(
        BADGE_CONSTANTS.classes.DOT
      );

      expect(theClassContainsTheDotClass).toBe(false);
    });

    it('should not add the dot attribute to the component', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.dot = false;

      const theDotAttributeIsDefined = this.context.component.getAttribute(
        BADGE_CONSTANTS.attributes.DOT
      );
      expect(theDotAttributeIsDefined).toBeNull();
    });
  });

  describe('with open set to true', function(this: ITestContext) {
    it('should add the open class to the root element', function(this: ITestContext) {
      this.context = setupTestContext(false, false);
      this.context.component.open = true;
      this.context.appendToFixture();
      const rootElement = getShadowElement(this.context.component, BADGE_CONSTANTS.selectors.ROOT);

      const theClassContainsTheOpenClass = rootElement.classList.contains(
        BADGE_CONSTANTS.classes.OPEN
      );

      expect(theClassContainsTheOpenClass).toBe(true);
    });

    it('should add the open attribute to the component', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.open = true;

      const theOpenAttributeIsDefined = this.context.component.getAttribute(
        BADGE_CONSTANTS.attributes.OPEN
      );

      expect(theOpenAttributeIsDefined).not.toBeNull();
    });
  });

  describe('with open set to false', function(this: ITestContext) {
    it('should not add the open class to the root element', function(this: ITestContext) {
      this.context = setupTestContext(false, false);
      this.context.component.open = false;
      this.context.appendToFixture();
      const rootElement = getShadowElement(this.context.component, BADGE_CONSTANTS.selectors.ROOT);

      const theClassContainsTheOpenClass = rootElement.classList.contains(
        BADGE_CONSTANTS.classes.OPEN
      );

      expect(theClassContainsTheOpenClass).toBe(false);
    });

    it('should not add the open attribute to the component', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.open = false;
      this.context.appendToFixture();

      const theOpenAttributeIsDefined = this.context.component.getAttribute(
        BADGE_CONSTANTS.attributes.OPEN
      );

      expect(theOpenAttributeIsDefined).toBeNull();
    });
  });

  it('should observe the dot attribute', function(this: ITestContext) {
    this.context = setupTestContext();
    const componentDefinedAttributes = BadgeComponent.observedAttributes;
    const dotAttributeName = componentDefinedAttributes.find(
      (a) => a === BADGE_CONSTANTS.attributes.DOT
    );

    expect(dotAttributeName).toEqual(BADGE_CONSTANTS.attributes.DOT);
  });

  it('should observe the open attribute', function(this: ITestContext) {
    this.context = setupTestContext();
    const componentDefinedAttributes = BadgeComponent.observedAttributes;

    const openAttributeName = componentDefinedAttributes.find(
      (a) => a === BADGE_CONSTANTS.attributes.OPEN
    );

    expect(openAttributeName).toEqual(BADGE_CONSTANTS.attributes.OPEN);
  });

  describe('with non-observed attribute set', function(this: ITestContext) {
    it('should have no change to the open property', function(this: ITestContext) {
      this.context = setupTestContext();
      const open = this.context.component.open;
      this.context.component.setAttribute(bogusAttribute, bogusAttribute);

      expect(open).toEqual(this.context.component.open);
    });

    it('should have no change to dot property', function(this: ITestContext) {
      this.context = setupTestContext();
      const dot = this.context.component.dot;
      this.context.component.setAttribute(bogusAttribute, bogusAttribute);

      expect(dot).toEqual(this.context.component.dot);
    });
  });

  function setupTestContext(appendToBody = false, appendToFixture = true): ITestBadgeContext {
    const fixture = document.createElement('div');
    fixture.id = 'badge-test-fixture';
    const component = document.createElement(BADGE_CONSTANTS.elementName) as IBadgeComponent;
    if (appendToFixture) {
      fixture.appendChild(component);
    }    
    if (appendToBody) {
      document.body.appendChild(fixture);
    }
    return {
      component,
      appendToFixture: () => document.body.appendChild(fixture),
      appendToBody: () => fixture.appendChild(component),
      destroy: () => removeElement(fixture)
    };
  }
});
