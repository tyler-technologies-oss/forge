import { IFloatingLabel, FloatingLabel, FLOATING_LABEL_CONSTANTS } from '@tylertech/forge/floating-label';
import { tick } from '@tylertech/forge-testing';
import { removeElement } from '@tylertech/forge-core';

interface ITestContext {
  context: ITestFloatingLabelContext;
}

interface ITestFloatingLabelContext {
  floatingLabel: IFloatingLabel;
  labelElement: HTMLLabelElement,
  destroy(): void;
}

describe('FloatingLabelComponent', function(this: ITestContext) {  
  
  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  describe('when label is attached to parent element', function(this: ITestContext) {  
    it('should initialize', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expect(this.context.labelElement.classList.contains(FLOATING_LABEL_CONSTANTS.classes.FLOATING_LABEL)).toBe(true);
    });
  
    it('should set floating via property', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.floatingLabel.float(true);
      expect(this.context.labelElement.classList.contains(FLOATING_LABEL_CONSTANTS.classes.FLOAT)).toBe(true);
      this.context.floatingLabel.float(false);
      expect(this.context.labelElement.classList.contains(FLOATING_LABEL_CONSTANTS.classes.FLOAT)).toBe(false);
    });
  
    it('should get scroll width of label', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const scrollWidth = this.context.floatingLabel.getWidth();
      expect(scrollWidth).toBe(0);
    });

    it('should get destroyed', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.floatingLabel.destroy();
      expect(this.context.labelElement.classList.contains(FLOATING_LABEL_CONSTANTS.classes.FLOATING_LABEL)).toBe(false);
    })
  });

  describe('when label is unattached', function(this: ITestContext) {
    it('should get scroll width of label', async function(this: ITestContext) {
      this.context = setupTestContext(false);
      await tick();
      const scrollWidth = this.context.floatingLabel.getWidth();
  
      expect(scrollWidth).toBeGreaterThan(0);
    });
  });
});

function setupTestContext(append = false): ITestFloatingLabelContext {
  let fixture = document.createElement('div');
  if (append) {
    fixture.id = 'floating-label-test-fixture';
    fixture.style.setProperty('width', '200px');
  }
  const createLabelElement = () => document.createElement('label') as HTMLLabelElement;
  const labelElement = createLabelElement();
  labelElement.innerHTML = 'Test Label';
  const floatingLabel = new FloatingLabel(labelElement);
  let destroy = () => {};
  if (append) {
    fixture.appendChild(labelElement);
    document.body.appendChild(fixture);
    destroy = () => removeElement(fixture);
  }
  return {
    floatingLabel,
    labelElement,
    destroy
  };
}
