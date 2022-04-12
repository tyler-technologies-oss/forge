import { ICheckboxComponent, CHECKBOX_CONSTANTS, defineCheckboxComponent, CheckboxComponent } from '@tylertech/forge/checkbox';
import { removeElement, getShadowElement } from '@tylertech/forge-core';
import { tick } from '@tylertech/forge-testing';

interface ITestContext {
  context: ITestCheckboxContext;
}

interface ITestCheckboxContext {
  component: ICheckboxComponent;
  destroy(): void;
}

describe('CheckboxComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineCheckboxComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should contain shadowroot', function(this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.component.shadowRoot).not.toBeNull();
  });

  describe('with unobserved attribute change', function(this: ITestContext) {
    it('should have no change on dense', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute('bogus', '');
      expect(this.context.component.dense).toBe(false, 'The alteration of an unobserved attribute has causes mayem');
      expect(getRootElement(this.context.component).classList.contains(CHECKBOX_CONSTANTS.classes.CHECKBOX_DENSE)).toBe(false, 'The alteration of an unobserved attribute has caused mayem');
    });
  });

  describe('unchecked by default', function(this: ITestContext) {
    it('should be unchecked by default', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(getCheckboxElement(this.context.component).checked).toBe(false);
    });

    it('should receive correct css classes', async function(this: ITestContext) {
      this.context = setupTestContext();
      await tick();

      expect(getRootElement(this.context.component).classList.contains(CHECKBOX_CONSTANTS.classes.CHECKBOX)).toBe(true, 'Expected the MDC checkbox class');
      expect(getRootElement(this.context.component).classList.contains(CHECKBOX_CONSTANTS.classes.UPGRADED)).toBe(true, 'Expected the checkbox upgraded class.');
    });

    it('should toggle checkbox when input is clicked', async function(this: ITestContext) {
      this.context = setupTestContext();
      await tick();

      expect(getCheckboxElement(this.context.component).checked).toBe(false);
      getCheckboxElement(this.context.component).click();
      expect(getCheckboxElement(this.context.component).checked).toBe(true);
    });

    it('should toggle checkbox when label is clicked', async function(this: ITestContext) {
      this.context = setupTestContext();
      await tick();
      expect(getCheckboxElement(this.context.component).checked).toBe(false);
      getLabelElement(this.context.component).click();
      expect(getCheckboxElement(this.context.component).checked).toBe(true);
    });

    describe('checked by default', function(this: ITestContext) {
      it('should be checked by default', function(this: ITestContext) {
        this.context = setupTestContext(true, true, true);
        expect(getCheckboxElement(this.context.component).checked).toBe(true);
      });

      it('should toggle checkbox when input is clicked', function(this: ITestContext) {
        this.context = setupTestContext(true, true, true);
        expect(getCheckboxElement(this.context.component).checked).toBe(true);
        getCheckboxElement(this.context.component).click();
        expect(getCheckboxElement(this.context.component).checked).toBe(false);
      });

      it('should toggle checkbox when label is clicked', function(this: ITestContext) {
        this.context = setupTestContext(true, true, true);
        expect(getCheckboxElement(this.context.component).checked).toBe(true);
        getLabelElement(this.context.component).click();
        expect(getCheckboxElement(this.context.component).checked).toBe(false);
      });
    });

    describe('incremental rendering', function(this: ITestContext) {
      it('should wait for child elements before initialization', async function(this: ITestContext) {
        this.context = setupTestContext(false, false);
        const checkboxElement = document.createElement('input');
        checkboxElement.type = 'checkbox';
        this.context.component.appendChild(checkboxElement);

        expect(getRootElement(this.context.component).classList.contains(CHECKBOX_CONSTANTS.classes.UPGRADED)).toBe(false, 'The Psudo checkbox element should not contain the .mdc-checkbox--upgraded class');

        await tick();

        expect(getRootElement(this.context.component).classList.contains(CHECKBOX_CONSTANTS.classes.UPGRADED)).toBe(true, 'The Psudo checkbox element should contain the .mdc-checkbox--upgraded class');

        expect(getRootElement(this.context.component).classList.contains(CHECKBOX_CONSTANTS.classes.CHECKBOX)).toBe(true);
      });

      it('should not initialize if input not specified', async function(this: ITestContext) {
        this.context = setupTestContext(false, false);
        const spanElement = document.createElement('span');
        this.context.component.appendChild(spanElement);
        await tick();
        expect(this.context.component.children.length).toBe(1, 'Too many damn kids');
        expect(getRootElement(this.context.component).classList.contains(CHECKBOX_CONSTANTS.classes.UPGRADED)).toBe(false);
      });
    });

    describe('density', function(this: ITestContext) {
      it('should be non-dense by default', async function(this: ITestContext) {
        this.context = setupTestContext();
        await tick();
        expect(this.context.component.dense).toBe(false, 'Dense was not false');
        expect(this.context.component.hasAttribute(CHECKBOX_CONSTANTS.attributes.DENSE)).toBe(false);
      });

      it('should set dense via property', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.dense = true;
        await tick();

        expect(this.context.component.dense).toBe(true, 'Dense was not updated to true correctly');
        expect(this.context.component.hasAttribute(CHECKBOX_CONSTANTS.attributes.DENSE)).toBe(true, 'the DENSE attribute was not applied to the host');
        expect(getRootElement(this.context.component).classList.contains(CHECKBOX_CONSTANTS.classes.CHECKBOX_DENSE)).toBe(true, 'Psudo checkbox element does not have the correct class');
      });

      it('should set dense via attribute', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.setAttribute(CHECKBOX_CONSTANTS.attributes.DENSE, '');
        await tick();
        expect(this.context.component.dense).toBe(true);
        expect(this.context.component.hasAttribute(CHECKBOX_CONSTANTS.attributes.DENSE)).toBe(true);
        expect(getRootElement(this.context.component).classList.contains(CHECKBOX_CONSTANTS.classes.CHECKBOX_DENSE)).toBe(true, 'The psudo checkbox element does not have the correct class');
      });
    });

    describe('when checked', function(this: ITestContext) {
      describe('not indeterminate', function(this: ITestContext) {
        it('should not contain the indeterminate class', async function(this: ITestContext) {
          this.context = setupTestContext();
          getCheckboxElement(this.context.component).checked = true;
          await tick();
          expect(getRootElement(this.context.component).classList.contains(CHECKBOX_CONSTANTS.classes.INDETERMINATE)).toBe(false, 'The psudo checkbox element contains the indeterminate class');
        });
      });

      describe('then set to indeterminate', function(this: ITestContext) {
        it('should only have the indeterminate class', async function(this: ITestContext) {
          this.context = setupTestContext();
          getCheckboxElement(this.context.component).checked = true;
          getCheckboxElement(this.context.component).indeterminate = true;
          await tick();
          expect(getRootElement(this.context.component).classList.contains(CHECKBOX_CONSTANTS.classes.INDETERMINATE)).toBe(true, 'The psudo checkbox element does not contain the indeterminate class');
          expect(getRootElement(this.context.component).classList.contains(CHECKBOX_CONSTANTS.classes.CHECKED)).toBe(false, 'The psudo checkbox element contains the checked class');
        });

        it('should be checked and indeterminate', async function(this: ITestContext) {
          this.context = setupTestContext();
          getCheckboxElement(this.context.component).checked = true;
          getCheckboxElement(this.context.component).indeterminate = true;
          await tick();
          expect(getCheckboxElement(this.context.component).checked).toBe(true, 'The checkbox is not checked');
          expect(getCheckboxElement(this.context.component).indeterminate).toBe(true, 'The checkbox is not checked');
          expect(getRootElement(this.context.component).classList.contains(CHECKBOX_CONSTANTS.classes.CHECKED)).toBe(false, 'the psudo element has the checked class');
          expect(getRootElement(this.context.component).classList.contains(CHECKBOX_CONSTANTS.classes.INDETERMINATE)).toBe(true, 'The psudo checkbox element does not have the indeterminate class');
        });
      });

      describe('then unchecked', function(this: ITestContext) {
        it('should not contain the checked class', async function(this: ITestContext) {
          this.context = setupTestContext();
          getCheckboxElement(this.context.component).checked = true;
          getCheckboxElement(this.context.component).click();
          await tick();
          expect(getCheckboxElement(this.context.component).checked).toBeFalse();
          expect(getRootElement(this.context.component).classList.contains(CHECKBOX_CONSTANTS.classes.CHECKED)).toBeFalse();
        });
      });
    });

    describe('when indeterminate', function(this: ITestContext) {
      describe('then clicked', function(this: ITestContext) {
        it('should be checked and not indeterminate', async function(this: ITestContext) {
          this.context = setupTestContext();
          getCheckboxElement(this.context.component).indeterminate = true;
          getCheckboxElement(this.context.component).click();
          await tick();
          expect(getCheckboxElement(this.context.component).checked).toBe(true);
          expect(getCheckboxElement(this.context.component).indeterminate).toBe(false);
        });

        it('should not be indeterminate', async function(this: ITestContext) {
          this.context = setupTestContext();
          getCheckboxElement(this.context.component).indeterminate = true;
          getCheckboxElement(this.context.component).click();
          await tick();
          expect(getCheckboxElement(this.context.component).checked).toBe(true);
          expect(getCheckboxElement(this.context.component).indeterminate).toBe(false);
        });
      });

      it('should have correct aria class', async function(this: ITestContext) {
        this.context = setupTestContext();
        getCheckboxElement(this.context.component).indeterminate = true;
        await tick();
        expect(getCheckboxElement(this.context.component).getAttribute(CHECKBOX_CONSTANTS.strings.ARIA_CHECKED_ATTR)).toBe(CHECKBOX_CONSTANTS.strings.ARIA_CHECKED_INDETERMINATE_VALUE);
      });

      it('should not contain the checked class when checked and set to indeterminate', async function(this: ITestContext) {
        this.context = setupTestContext();
        getCheckboxElement(this.context.component).indeterminate = true;
        getCheckboxElement(this.context.component).checked = false;
        await tick();
        getCheckboxElement(this.context.component).indeterminate = false;
        await tick();
        getCheckboxElement(this.context.component).checked = true;
        await tick();
        getCheckboxElement(this.context.component).indeterminate = true;
        await tick();

        expect(getCheckboxElement(this.context.component).getAttribute(CHECKBOX_CONSTANTS.classes.CHECKED)).toBe(null);
      });

      it('should contain the checked class when checked and indeterminate set from true to false', async function(this: ITestContext) {
        this.context = setupTestContext();
        getCheckboxElement(this.context.component).indeterminate = true;
        await tick();
        getCheckboxElement(this.context.component).checked = true;
        await tick();
        getCheckboxElement(this.context.component).indeterminate = true;
        await tick();
        getCheckboxElement(this.context.component).indeterminate = false;
        await tick();

        expect(getRootElement(this.context.component).classList.contains(CHECKBOX_CONSTANTS.classes.CHECKED)).toBeTrue();
      });
    });

    describe('when there is no input', function(this: ITestContext) {
      it('should not initialize', async function(this: ITestContext) {
        this.context = setupTestContext(false, true);
        await tick();
        expect(getCheckboxElement(this.context.component)).toBeNull();
        expect(getRootElement(this.context.component).classList.contains(CHECKBOX_CONSTANTS.classes.UPGRADED)).toBe(false, 'Should not have the upgraded class because it was not initialized');
      });

      describe('then input is added', function(this: ITestContext) {
        it('should have initialization classes', async function(this: ITestContext) {
          this.context = setupTestContext(false, true);
          const input = document.createElement('input');
          input.type = 'checkbox';
          this.context.component.appendChild(input);
          await tick();
          expect(getRootElement(this.context.component).classList.contains(CHECKBOX_CONSTANTS.classes.UPGRADED)).toBe(true, 'Should have the upgraded class because it was initialized');
          expect(getRootElement(this.context.component).classList.contains(CHECKBOX_CONSTANTS.classes.CHECKBOX)).toBe(true, 'Should have the checkbox class because it was initialized');
          expect(this.context.component.isConnected).toBeTrue();
        });
      });
    });
  });

  describe('disabled state', function(this: ITestContext) {
    it('should set psudo element disabled class when checkbox is set to disabled by member', async function(this: ITestContext) {
      this.context = setupTestContext();
      await tick();
      getCheckboxElement(this.context.component).disabled = true;
      await tick();
      expect(getRootElement(this.context.component).classList.contains(CHECKBOX_CONSTANTS.classes.DISABLED)).toBe(true);
    });

    it('should remove psudo element disabled class when checkbox is set to disabled then enabled by member', async function(this: ITestContext) {
      this.context = setupTestContext();
      await tick();
      getCheckboxElement(this.context.component).disabled = true;
      await tick();
      getCheckboxElement(this.context.component).disabled = false;
      await tick();

      expect(getRootElement(this.context.component).classList.contains(CHECKBOX_CONSTANTS.classes.DISABLED)).toBe(false);
    });

    it('should set psudo element disabled class when checkbox is set to disabled by attribute', async function(this: ITestContext) {
      this.context = setupTestContext();
      await tick();
      getCheckboxElement(this.context.component).setAttribute(CHECKBOX_CONSTANTS.attributes.DISABLED, '');
      await tick();
      expect(getRootElement(this.context.component).classList.contains(CHECKBOX_CONSTANTS.classes.DISABLED)).toBe(true);
    });

    it('should remove psudo element disabled class when checkbox is set to disabled then enabled by attribute', async function(this: ITestContext) {
      this.context = setupTestContext();
      await tick();
      getCheckboxElement(this.context.component).setAttribute(CHECKBOX_CONSTANTS.attributes.DISABLED, '');
      await tick();
      getCheckboxElement(this.context.component).removeAttribute(CHECKBOX_CONSTANTS.attributes.DISABLED);
      await tick();

      expect(getRootElement(this.context.component).classList.contains(CHECKBOX_CONSTANTS.classes.DISABLED)).toBe(false);
    });

    it('should add disabled color style to label', async function(this: ITestContext) {
      this.context = setupTestContext();
      const disabledColor = 'rgba(0, 0, 0, 0.38)';

      getCheckboxElement(this.context.component).disabled = false;
      await tick();
      expect(window.getComputedStyle(getLabelElement(this.context.component)).color).not.toBe(disabledColor, 'Label should not have the disabled text color');

      getCheckboxElement(this.context.component).disabled = true;
      await tick();
      expect(window.getComputedStyle(getLabelElement(this.context.component)).color).toBe(disabledColor, 'Label does not have the correct disabled text color');
    });

    it('should not be attached to the dom if not inserted', async function(this: ITestContext) {
      this.context = setupTestContext();
      const comp = new CheckboxComponent();
      const comp2 = document.createElement('forge-checkbox');
      await tick();

      expect(comp.parentNode).toBeNull();
      expect(comp2.parentNode).toBeNull();
    });
  });

  function setupTestContext(hasInput = true, hasLabel = true, isChecked = false): ITestCheckboxContext {
    const fixture = document.createElement('div');
    fixture.id = 'checkbox-test-fixture';
    const component = document.createElement(CHECKBOX_CONSTANTS.elementName) as ICheckboxComponent;
    if (hasInput) {
      const inputElement = document.createElement('input') as HTMLInputElement;
      inputElement.type = 'checkbox';
      inputElement.id = 'input-checkbox';
      if (isChecked) {
        inputElement.setAttribute('checked', '');
      }
      component.appendChild(inputElement);
    }
    if (hasLabel) {
      const labelElement = document.createElement('label') as HTMLLabelElement;
      labelElement.setAttribute('for', 'input-checkbox');
      labelElement.textContent = 'Checkbox input';
      component.appendChild(labelElement);
    }
    fixture.appendChild(component);
    document.body.appendChild(fixture);
    return {
      component,
      destroy: () => removeElement(fixture)
    };
  }

  function getRootElement(component: ICheckboxComponent): HTMLElement {
    return getShadowElement(component, CHECKBOX_CONSTANTS.selectors.ROOT);
  }

  function getCheckboxElement(component: ICheckboxComponent): HTMLInputElement {
    return component.querySelector('input') as HTMLInputElement;
  }

  function getLabelElement(component: ICheckboxComponent): HTMLLabelElement {
    return component.querySelector('label') as HTMLLabelElement;
  }
});
