import { LabelValueComponent, LABEL_VALUE_CONSTANTS, defineLabelValueComponent, LabelValueAlignment, ILabelValueComponent } from '@tylertech/forge/label-value';
import { getShadowElement, removeElement } from '@tylertech/forge-core';

const labelAlignments: { [K in LabelValueAlignment]: LabelValueAlignment } = { center: 'center', left: 'left', right: 'right' };
const attributes = LABEL_VALUE_CONSTANTS.attributes;
const classes = LABEL_VALUE_CONSTANTS.classes;

interface ITestContext {
  context: ITestLabelValueContext
}

interface ITestLabelValueContext {
  component: ILabelValueComponent;
  getRootElement(): HTMLElement;
  destroy(): void;
}

describe('LabelValueComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineLabelValueComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should instantiate component instance', function(this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.component.shadowRoot).not.toBeNull();
  });

  it('should have the correct observed attributes', function(this: ITestContext) {
    this.context = setupTestContext();
    const _attributes = LabelValueComponent.observedAttributes;

    expect(_attributes.length).toBe(4);
    expect(_attributes).toContain(attributes.ALIGN);
    expect(_attributes).toContain(attributes.ELLIPSIS);
    expect(_attributes).toContain(attributes.DENSITY);
    expect(_attributes).toContain(attributes.EMPTY);
  });

  describe('with default state', function(this: ITestContext) {
    it('should have empty be false', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.empty).withContext('The default empty state was not false').toBeFalse();
    });

    it('should have ellipsis be false', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.ellipsis).withContext('The default ellipsis state was not false').toBeFalse();
    });

    it(`should not have density set by default`, function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.density).withContext('The default density state was not dense').toBe('default');
    });

    it(`should have align be ${labelAlignments.left} by default`, function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.align).withContext('The default align state was left').toBe(labelAlignments.left);
    });

    it('should have the correct attributes', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.hasAttribute(attributes.EMPTY)).withContext('The component incorrectly has the empty attribute').toBeFalse();
      expect(this.context.component.hasAttribute(attributes.ALIGN)).withContext('The component incorrectly has the the align attribute').toBeFalse();
      expect(this.context.component.hasAttribute(attributes.ELLIPSIS)).withContext('The component incorrectly has the the ellipsis attribute').toBeFalse();
      expect(this.context.component.hasAttribute(attributes.DENSITY)).withContext('The component incorrectly has the the density attribute').toBeFalse();
    });

    it('should have the correct classes on the root element', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.getRootElement().classList.contains(classes.EMPTY)).withContext(`The root element incorrectly has ${classes.EMPTY} class`).toBeFalse();
      expect(this.context.getRootElement().classList.contains(classes.ALIGN_CENTER)).withContext(`The root element incorrectly has the ${classes.ALIGN_CENTER} class`).toBeFalse();
      expect(this.context.getRootElement().classList.contains(classes.ALIGN_RIGHT)).withContext(`The root element incorrectly has the ${classes.ALIGN_RIGHT} class`).toBeFalse();
      expect(this.context.getRootElement().classList.contains(classes.DENSE)).withContext(`The root element incorrectly has the ${classes.DENSE} class`).toBeFalse();
      expect(this.context.getRootElement().classList.contains(classes.ELLIPSIS)).withContext(`The root element incorrectly has the ${classes.ELLIPSIS} class`).toBeFalse();
    });
  });

  describe(`with ${attributes.EMPTY} altered by attribute`, function(this: ITestContext) {
    it('should add attributes and classes when set', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(attributes.EMPTY, '');

      expect(this.context.component.getAttribute(attributes.EMPTY)).not.toBeUndefined();
      expect(this.context.getRootElement().classList.contains(classes.EMPTY)).toBeTrue();
    });

    it('should remove attributes and classs when added then removed', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(attributes.EMPTY, '');
      this.context.component.removeAttribute(attributes.EMPTY);

      expect(this.context.component.getAttribute(attributes.EMPTY)).toBeFalsy();
      expect(this.context.getRootElement().classList.contains(classes.EMPTY)).toBeFalse();
    });
  });

  describe(`with ${attributes.EMPTY} altered by member`, function(this: ITestContext) {
    it('should add attributes and classes when set', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.empty = true;

      expect(this.context.component.getAttribute(attributes.EMPTY)).not.toBeNull();
      expect(this.context.getRootElement().classList.contains(classes.EMPTY)).toBeTrue();
    });

    it('should remove attributes and classs when added then removed', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.empty = true;

      expect(this.context.component.getAttribute(attributes.EMPTY)).not.toBeNull();
      expect(this.context.getRootElement().classList.contains(classes.EMPTY)).toBeTrue();

      this.context.component.empty = false;

      expect(this.context.component.getAttribute(attributes.EMPTY)).toBeFalsy();
      expect(this.context.getRootElement().classList.contains(classes.EMPTY)).toBeFalse();
    });
  });

  describe(`with density is altered by attribute`, function(this: ITestContext) {
    it(`should add attributes and classes when dense set to true`, function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(attributes.DENSITY, 'dense');
      const densityAttr = this.context.component.getAttribute(attributes.DENSITY);

      expect(densityAttr).withContext(`The attribute density was correctly set to dense`).toBe('dense');
      expect(this.context.getRootElement().classList.contains(classes.DENSE)).withContext(`The class "${classes.DENSE}" was was found on the root element`).toBeTrue();
    });

    it('should and classes add and remove classes density is changed', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(attributes.DENSITY, 'dense');
      this.context.component.setAttribute(attributes.DENSITY, 'default');

      expect(this.context.component.getAttribute(attributes.DENSITY)).toBe('default');
      expect(this.context.getRootElement().classList.contains(classes.DENSE)).toBeFalse();
    });
  });

  describe(`with density altered by member`, function(this: ITestContext) {
    it(`should add attributes and classes when dense set to true`, function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.density = 'roomy';
      const densityAttr = this.context.component.getAttribute(attributes.DENSITY);

      expect(densityAttr).withContext(`The attribute density was correctly set to roomy`).toBe('roomy');
      expect(this.context.getRootElement().classList.contains(classes.ROOMY)).withContext(`The class "${classes.ROOMY}" was was found on the root element`).toBeTrue();
    });

    it('should remove classes when added then removed', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.density = 'roomy';
      this.context.component.density = 'default';

      expect(this.context.getRootElement().classList.contains(classes.ROOMY)).toBeFalse();
    });
  });

  describe(`with ${attributes.ALIGN} altered by attribute`, function(this: ITestContext) {
    it(`should add attributes and classes when density set to ${labelAlignments.center}`, function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(attributes.ALIGN, labelAlignments.center);
      const alignAttr = this.context.component.getAttribute(attributes.ALIGN);

      expect(alignAttr).toBe(labelAlignments.center, `The attribute ${attributes.ALIGN} was not incorrectly set to "${alignAttr}"`);
      expect(this.context.getRootElement().classList.contains(classes.ALIGN_CENTER)).toBe(true, `The class "${classes.ALIGN_CENTER}" was was found on the root element`);
    });

    it(`should add attributes and classes when density set to ${labelAlignments.right}`, function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(attributes.ALIGN, labelAlignments.right);
      const alignAttr = this.context.component.getAttribute(attributes.ALIGN);

      expect(alignAttr).toBe(labelAlignments.right, `The attribute ${attributes.ALIGN} was not incorrectly set to "${alignAttr}"`);
      expect(this.context.getRootElement().classList.contains(classes.ALIGN_RIGHT)).toBe(true, `The class "${classes.ALIGN_RIGHT}" was was found on the root element`);
    });

    it('should remove attributes and classs when added then removed', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(attributes.ALIGN, labelAlignments.left);
      this.context.component.removeAttribute(attributes.ALIGN);

      expect(this.context.component.getAttribute(attributes.ALIGN)).toBeNull();
      expect(this.context.getRootElement().classList.contains(classes.ALIGN_RIGHT)).toBeFalse();
      expect(this.context.getRootElement().classList.contains(classes.ALIGN_CENTER)).toBeFalse();
    });
  });

  describe(`with ${attributes.ALIGN} altered by member`, function(this: ITestContext) {
    it(`should add attributes and classes when density set to ${labelAlignments.center}`, function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.align = labelAlignments.center;
      const alignAttr = this.context.component.getAttribute(attributes.ALIGN);

      expect(alignAttr).toBe(labelAlignments.center, `The attribute ${attributes.ALIGN} was not incorrectly set to "${alignAttr}"`);
      expect(this.context.getRootElement().classList.contains(classes.ALIGN_CENTER)).toBe(true, `The class "${classes.ALIGN_CENTER}" was was found on the root element`);
    });

    it(`should add attributes and classes when density set to ${labelAlignments.right}`, function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.align = labelAlignments.right;

      const alignAttr = this.context.component.getAttribute(attributes.ALIGN);

      expect(alignAttr).toBe(labelAlignments.right, `The attribute ${attributes.ALIGN} was not incorrectly set to "${alignAttr}"`);
      expect(this.context.getRootElement().classList.contains(classes.ALIGN_RIGHT)).toBe(true, `The class "${classes.ALIGN_RIGHT}" was was found on the root element`);
    });

    it('should remove right and center classes when set back to left aligned', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.align = labelAlignments.right;
      this.context.component.align = labelAlignments.center;
      this.context.component.align = labelAlignments.left;

      expect(this.context.component.getAttribute(attributes.ALIGN)).toBe(labelAlignments.left);
      expect(this.context.getRootElement().classList.contains(classes.ALIGN_RIGHT)).toBeFalse();
      expect(this.context.getRootElement().classList.contains(classes.ALIGN_CENTER)).toBeFalse();
    });
  });

  describe(`with ${attributes.ELLIPSIS} altered by attribute`, function(this: ITestContext) {
    it('should add attributes and classes when set', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(attributes.ELLIPSIS, '');

      expect(this.context.component.getAttribute(attributes.ELLIPSIS)).not.toBeUndefined();
      expect(this.context.getRootElement().classList.contains(classes.ELLIPSIS)).toBeTrue();
    });

    it('should remove attributes and classs when added then removed', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(attributes.ELLIPSIS, '');
      this.context.component.removeAttribute(attributes.ELLIPSIS);

      expect(this.context.component.getAttribute(attributes.ELLIPSIS)).toBeFalsy();
      expect(this.context.getRootElement().classList.contains(classes.ELLIPSIS)).toBeFalse();
    });
  });

  describe(`with ${attributes.ELLIPSIS} altered by member`, function(this: ITestContext) {
    it('should add attributes and classes when set', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.ellipsis = true;

      expect(this.context.component.getAttribute(attributes.ELLIPSIS)).not.toBeNull();
      expect(this.context.getRootElement().classList.contains(classes.ELLIPSIS)).toBeTrue();
    });

    it('should remove attributes and classes when added then removed', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.ellipsis = true;

      expect(this.context.component.getAttribute(attributes.ELLIPSIS)).not.toBeNull();
      expect(this.context.getRootElement().classList.contains(classes.ELLIPSIS)).toBeTrue();

      this.context.component.ellipsis = false;

      expect(this.context.component.getAttribute(attributes.ELLIPSIS)).toBeFalsy();
      expect(this.context.getRootElement().classList.contains(classes.ELLIPSIS)).toBeFalse();
    });
  });

  function setupTestContext(): ITestLabelValueContext {
    const fixture = document.createElement('div');
    fixture.id = 'label-value-test-fixture';
    const component = document.createElement(LABEL_VALUE_CONSTANTS.elementName) as ILabelValueComponent;
    fixture.appendChild(component);
    document.body.appendChild(fixture);
    return {
      component,
      getRootElement: () => getShadowElement(component, LABEL_VALUE_CONSTANTS.selectors.ROOT),
      destroy: () => removeElement(fixture)
    };
  }  
});
