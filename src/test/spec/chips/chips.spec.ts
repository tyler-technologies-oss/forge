import { 
  defineChipComponent,
  defineChipSetComponent,
  IChipSetComponent,
  IChipComponent,
  CHIP_SET_CONSTANTS,
  ChipSetComponent,
  ChipComponent,
  CHIP_CONSTANTS,
  ChipType,
  IChipSelectEventData,
  IChipDeleteEventData
} from '@tylertech/forge/chips';
import { removeElement, getShadowElement } from '@tylertech/forge-core';
import { dispatchKeyEvent, tick, appendElement } from '@tylertech/forge-testing';

interface ITestContext {
  context: ITestChipsContext
}

interface ITestChipsContext {
  chipSet: IChipSetComponent;
  chips: IChipComponent[];
  append(): void;
  destroy(): void;
}

const DEFAULT_CHIPS = [
  { text: 'One', value: 'one' },
  { text: 'Two', value: 'two' },
  { text: 'Three', value: 'three' }
];

describe('ChipComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineChipComponent();
    defineChipSetComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  })

  describe('with imperative creation', function(this: ITestContext) {
    it('should not set disabled before being placed in DOM', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.chipSet.disabled = true;

      expect(getChipButtonElement(this.context.chips[0]).disabled).toBe(false);
      
      this.context.append();

      expect(getChipButtonElement(this.context.chips[0]).disabled).toBe(true);
    });

    it('should not set dense before being placed in DOM', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.chipSet.dense = true;

      expect(getChipButtonElement(this.context.chips[0]).classList.contains(CHIP_CONSTANTS.classes.DENSE)).toBe(false);
      
      this.context.append();

      expect(getChipButtonElement(this.context.chips[0]).classList.contains(CHIP_CONSTANTS.classes.DENSE)).toBe(true);
    });

    it('should not set selected before being placed in DOM', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.chips[0].selected = true;

      expect(getChipButtonElement(this.context.chips[0]).classList.contains(CHIP_CONSTANTS.classes.SELECTED)).toBe(false);
      
      this.context.chipSet.type = 'choice';
      this.context.append();

      expect(this.context.chips[0].hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).toBe(true);
      expect(this.context.chips[0].selected).toBe(true);
      expect(getChipButtonElement(this.context.chips[0]).classList.contains(CHIP_CONSTANTS.classes.SELECTED)).toBe(true);
    });

    it('should allow chip to be used without chip-set parent', function(this: ITestContext) {
      this.context = setupTestContext();
      
      const chip = document.createElement(CHIP_CONSTANTS.elementName) as IChipComponent;
      chip.type = 'filter';
      document.body.appendChild(chip);
      clickChip(chip);

      expectChipType(chip, 'filter');
      expectChipSelected(chip, true);
      removeElement(chip);
    });

    it('should add and remove chip properly', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.chipSet.type = 'choice';
      this.context.append();
      this.context.chips[0].selected = true;

      removeElement(this.context.chips[0]);
      expect(this.context.chips[0].selected).toBe(true);
      await tick();
      this.context.chipSet.appendChild(this.context.chips[0]);

      expectChipSelected(this.context.chips[0], true);
    });

    it('should add new chip with filter type', async function(this: ITestContext) {
      this.context = setupTestContext();
      const newChip = document.createElement(CHIP_CONSTANTS.elementName) as IChipComponent;
      newChip.selected = true;

      this.context.chipSet.type = 'filter';
      this.context.append();
      await tick();
      this.context.chipSet.appendChild(newChip);

      expectChipSelected(newChip, true);
      expectChipCheckmarkState(newChip, true);
    });

    it('should not select chip if added dynamically with action type', async function(this: ITestContext) {
      this.context = setupTestContext();
      const newChip = document.createElement(CHIP_CONSTANTS.elementName) as IChipComponent;
      newChip.selected = true;
      newChip.textContent = 'New chip';

      this.context.append();
      await tick();
      this.context.chipSet.appendChild(newChip);

      expectChipSelected(newChip, false);
    });

    it('should toggle between types for dynamic chips', async function(this: ITestContext) {
      this.context = setupTestContext();
      
      const newChip = document.createElement(CHIP_CONSTANTS.elementName) as IChipComponent;
      newChip.textContent = 'New chip';
      document.body.appendChild(newChip);
      await tick();
      
      newChip.type = 'choice';
      newChip.selected = true;
      expectChipSelected(newChip, true);

      newChip.type = 'filter';
      expectChipSelected(newChip, true);

      newChip.type = 'input';
      expectChipSelected(newChip, true);
      
      newChip.type = 'action';
      expectChipSelected(newChip, false);
      removeElement(newChip);
    });

    it('should support adding chips dynamically to chip-set with dynamic type', async function(this: ITestContext) {
      this.context = setupTestContext();
      
      const newChip = document.createElement(CHIP_CONSTANTS.elementName) as IChipComponent;
      newChip.textContent = 'New chip';
      this.context.chipSet.appendChild(newChip);
      this.context.append();
      await tick();
      
      this.context.chipSet.type = 'choice';
      newChip.selected = true;

      expectChipSelected(newChip, true);
    });
  });

  describe('as static HTML', function(this: ITestContext) {
    it('should be instantiated', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expect(this.context.chipSet.isConnected).toBe(true);
      expect(this.context.chipSet instanceof ChipSetComponent).toBe(true);
      expect(this.context.chips.every(chip => chip instanceof ChipComponent)).toBe(true);
    });

    it('should apply default type to all child chips', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chips.forEach(chip => expectChipType(chip, CHIP_CONSTANTS.defaults.TYPE as ChipType));
    });

    it('should set value for individual chip via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chips[0].setAttribute(CHIP_CONSTANTS.attributes.VALUE, 'new value');

      expect(this.context.chips[0].value).toBe('new value');
    });

    it('should have proper values', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chips.forEach((chip, index) => expect(chip.value).toEqual(DEFAULT_CHIPS[index].value));
    });

    it('should apply type from chip-set to all child chips', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chipSet.type = 'choice';
      this.context.chips.forEach(chip => expectChipType(chip, 'choice'));
    });

    it('should not select chips by default', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chips.forEach(chip => expectChipSelected(chip, false));
    });

    it('should not select chip when using default type of "action"', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chips[0].selected = true;
      expectChipSelected(this.context.chips[0], false);
    });

    it('should select chip when using "input" type', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chipSet.type = 'input';
      this.context.chips[0].selected = true;
      expectChipSelected(this.context.chips[0], true);
    });

    it('should select chip when using "choice" type', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chipSet.type = 'choice';
      this.context.chips[0].selected = true;
      expectChipSelected(this.context.chips[0], true);
    });

    it('should select chip when using "filter" type', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chipSet.type = 'filter';
      this.context.chips[0].selected = true;
      expectChipSelected(this.context.chips[0], true);
    });

    it('should emit select event when clicking', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const selectSpy = jasmine.createSpy('select spy');
      this.context.chipSet.addEventListener(CHIP_CONSTANTS.events.SELECT, selectSpy);

      clickChip(this.context.chips[0]);
      
      const detail: IChipSelectEventData = { value: DEFAULT_CHIPS[0].value, selected: true };
      expect(selectSpy).toHaveBeenCalledTimes(1);
      expect(selectSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail }));
    });

    it('should not set selected when type is `action`', function(this: ITestContext) {
      this.context = setupTestContext(true);
      clickChip(this.context.chips[0]);
      clickChip(this.context.chips[1]);
      clickChip(this.context.chips[2]);
      
      expectChipSelected(this.context.chips[0], false);
      expectChipSelected(this.context.chips[1], false);
      expectChipSelected(this.context.chips[2], false);
    });

    it('should set selected when type is `choice`', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chipSet.type = 'choice';
      
      clickChip(this.context.chips[0]);
      
      expectChipSelected(this.context.chips[0], true);
    });

    it('should set selected when type is `filter`', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chipSet.type = 'filter';

      clickChip(this.context.chips[0]);
      
      expectChipSelected(this.context.chips[0], true);
      expectChipCheckmarkState(this.context.chips[0], true);
    });

    it('should set selected when type is `input`', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chipSet.type = 'input';

      clickChip(this.context.chips[0]);
      
      expectChipSelected(this.context.chips[0], true);
      expectNoCheckmark(this.context.chips[0]);
    });

    it('should toggle selected when type is `choice`', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chipSet.type = 'choice';
      
      clickChip(this.context.chips[0]);
      clickChip(this.context.chips[0]);
      
      expectChipSelected(this.context.chips[0], false);
      expectNoCheckmark(this.context.chips[0]);
    });

    it('should toggle selected when type is `filter`', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chipSet.type = 'filter';
      
      clickChip(this.context.chips[0]);
      clickChip(this.context.chips[0]);
      
      expectChipSelected(this.context.chips[0], false);
      expectChipCheckmarkState(this.context.chips[0], false);
    });

    it('should toggle selected when type is `input`', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chipSet.type = 'input';
      
      clickChip(this.context.chips[0]);
      clickChip(this.context.chips[0]);
      
      expectChipSelected(this.context.chips[0], false);
    });

    it('should not set selected if default prevented in select event', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const selectSpy = jasmine.createSpy('select spy', (evt: CustomEvent) => evt.preventDefault()).and.callThrough();
      this.context.chipSet.addEventListener(CHIP_CONSTANTS.events.SELECT, selectSpy);

      clickChip(this.context.chips[0]);
      
      expectChipSelected(this.context.chips[0], false);
    });

    it('should emit delete event when pressing delete key for input type', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chipSet.type = 'input';

      const deleteSpy = jasmine.createSpy('delete spy');
      this.context.chipSet.addEventListener(CHIP_CONSTANTS.events.DELETE, deleteSpy);

      dispatchChipKeydown(this.context.chips[0], 'Delete');

      const detail: IChipDeleteEventData = { value: DEFAULT_CHIPS[0].value };
      expect(deleteSpy).toHaveBeenCalledTimes(1);
      expect(deleteSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail }));
    });

    it('should emit delete event when pressing backspace key for input type', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chipSet.type = 'input';

      const deleteSpy = jasmine.createSpy('delete spy');
      this.context.chipSet.addEventListener(CHIP_CONSTANTS.events.DELETE, deleteSpy);

      dispatchChipKeydown(this.context.chips[1], 'Backspace');

      const detail: IChipDeleteEventData = { value: DEFAULT_CHIPS[1].value };
      expect(deleteSpy).toHaveBeenCalledTimes(1);
      expect(deleteSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail }));
    });

    it('should not emit delete event when pressing delete key when type is not input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const deleteSpy = jasmine.createSpy('delete spy');
      this.context.chipSet.addEventListener(CHIP_CONSTANTS.events.DELETE, deleteSpy);

      dispatchChipKeydown(this.context.chips[0], 'Delete');

      this.context.chipSet.type = 'choice';
      dispatchChipKeydown(this.context.chips[0], 'Delete');
      
      this.context.chipSet.type = 'filter';
      dispatchChipKeydown(this.context.chips[0], 'Delete');

      expect(deleteSpy).not.toHaveBeenCalled();
    });

    it('should emit delete event when clicking delete button', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chipSet.type = 'input';

      const deleteSpy = jasmine.createSpy('delete spy');
      this.context.chipSet.addEventListener(CHIP_CONSTANTS.events.DELETE, deleteSpy);

      clickDeleteButton(this.context.chips[1]);

      const detail: IChipDeleteEventData = { value: DEFAULT_CHIPS[1].value };
      expect(deleteSpy).toHaveBeenCalledTimes(1);
      expect(deleteSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail }));
    });

    it('should emit delete event when pressing enter key on delete button', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chipSet.type = 'input';

      const deleteSpy = jasmine.createSpy('delete spy');
      this.context.chipSet.addEventListener(CHIP_CONSTANTS.events.DELETE, deleteSpy);

      dispatchDeleteButtonKeydown(this.context.chips[2], 'Enter');

      const detail: IChipDeleteEventData = { value: DEFAULT_CHIPS[2].value };
      expect(deleteSpy).toHaveBeenCalledTimes(1);
      expect(deleteSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail }));
    });

    it('should set single chip disabled', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chips[0].disabled = true;

      expectChipDisabled(this.context.chips[0], true);
    });

    it('should set single chip disabled via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chips[0].setAttribute(CHIP_CONSTANTS.attributes.DISABLED, '');

      expectChipDisabled(this.context.chips[0], true);
    });

    it('should set all chips disabled', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chipSet.disabled = true;

      expect(this.context.chipSet.disabled).toBe(true);
      this.context.chips.forEach(chip => expectChipDisabled(chip, true));
    });

    it('should set single chip dense', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chips[0].dense = true;

      expectChipDense(this.context.chips[0], true);
    });

    it('should set single chip dense via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chips[0].setAttribute(CHIP_CONSTANTS.attributes.DENSE, '');

      expectChipDense(this.context.chips[0], true);
    });

    it('should set all chips dense', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chipSet.dense = true;

      this.context.chips.forEach(chip => expectChipDense(chip, true));
    });

    it('should reset to "action" type if invalid type is specified', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chips[0].type = 'test' as any;
      this.context.chips[1].type = 'test' as any;
      this.context.chips[2].type = 'test' as any;
      this.context.chipSet.type = 'test' as any;
      
      this.context.chips.forEach(chip => expectChipType(chip, 'action'));
    });

    it('should remove checkmark when changing type', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chipSet.type = 'filter';
      this.context.chipSet.type = 'action';

      expectNoCheckmark(this.context.chips[0]);
      expectNoCheckmark(this.context.chips[1]);
      expectNoCheckmark(this.context.chips[2]);
    });

    it('should remove delete button when changing type', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chipSet.type = 'input';
      this.context.chipSet.type = 'action';

      expectNoDeleteButton(this.context.chips[0]);
      expectNoDeleteButton(this.context.chips[1]);
      expectNoDeleteButton(this.context.chips[2]);
    });

    it('should set chip set vertical', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chipSet.vertical = true;

      expect(this.context.chipSet.vertical).toBe(true);
      expect(this.context.chipSet.hasAttribute(CHIP_SET_CONSTANTS.attributes.VERTICAL)).toBe(true);
      expect(getRootElement(this.context.chipSet).classList.contains(CHIP_SET_CONSTANTS.classes.VERTICAL)).toBe(true);
    });

    it('should toggle chip set vertical via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.chipSet.vertical = true;
      this.context.chipSet.removeAttribute(CHIP_SET_CONSTANTS.attributes.VERTICAL);

      expect(this.context.chipSet.vertical).toBe(false);
      expect(this.context.chipSet.hasAttribute(CHIP_SET_CONSTANTS.attributes.VERTICAL)).toBe(false);
      expect(getRootElement(this.context.chipSet).classList.contains(CHIP_SET_CONSTANTS.classes.VERTICAL)).toBe(false);
    });
  });

  function setupTestContext(append = false): ITestChipsContext {
    const fixture = document.createElement('div');
    fixture.id = 'chips-test-fixture';
    const chipSet = document.createElement(CHIP_SET_CONSTANTS.elementName) as IChipSetComponent;
    const chips: IChipComponent[] = DEFAULT_CHIPS.map(chipConfig => {
      const chip = document.createElement(CHIP_CONSTANTS.elementName) as IChipComponent;
      chip.textContent = chipConfig.text;
      chip.value = chipConfig.value;
      chipSet.appendChild(chip);
      return chip;
    });
    fixture.appendChild(chipSet);
    if (append) {
      document.body.appendChild(fixture);
    }
    return { 
      chipSet: chipSet, 
      chips: chips,
      append: () => document.body.appendChild(fixture),
      destroy: () => removeElement(fixture)
    };
  }

  function getRootElement(chipSet: IChipSetComponent): HTMLElement {
    return getShadowElement(chipSet, CHIP_SET_CONSTANTS.selectors.ROOT);
  }

  function expectChipSelected(chip: IChipComponent, isSelected: boolean): void {
    const buttonElement = getShadowElement(chip, CHIP_CONSTANTS.selectors.BUTTON) as HTMLButtonElement;
    expect(chip.selected).toBe(isSelected);
    expect(buttonElement.classList.contains(CHIP_CONSTANTS.classes.SELECTED)).toBe(isSelected);
  }

  function getCheckmarkElement(chip: IChipComponent): HTMLElement {
    return getShadowElement(chip, '.forge-chip__checkmark');
  }

  function expectChipCheckmarkState(chip: IChipComponent, isSelected: boolean): void {
    const checkmarkElement = getCheckmarkElement(chip);
    const svgElement = getShadowElement(chip, '.forge-chip__checkmark-svg');
    const svgWidth = svgElement.getBoundingClientRect().width;
    
    expect(checkmarkElement).not.toBeNull();

    if (isSelected) {
      expect(svgWidth).toBeGreaterThan(0);
    } else {
      expect(svgWidth).toBe(0);
    }
  }
  
  function expectNoCheckmark(chip: IChipComponent): void {
    const checkmarkElement = getCheckmarkElement(chip);
    expect(checkmarkElement).toBeNull();
  }

  function expectNoDeleteButton(chip: IChipComponent): void {
    const deleteButton = getDeleteButtonElement(chip);
    expect(deleteButton).toBeNull();
  }

  function expectChipType(chip: IChipComponent, type: ChipType): void {
    const buttonElement = getShadowElement(chip, CHIP_CONSTANTS.selectors.BUTTON) as HTMLButtonElement;
    expect(chip.type).toBe(type);

    let chipTypeClass: string;
    switch (type) {
      case 'input':
        chipTypeClass = CHIP_CONSTANTS.classes.INPUT;
        break;
      case 'filter':
        chipTypeClass = CHIP_CONSTANTS.classes.FILTER;
        break;
      case 'action':
        chipTypeClass = CHIP_CONSTANTS.classes.ACTION;
        break;
      case 'choice':
        chipTypeClass = CHIP_CONSTANTS.classes.CHOICE;
        break;
      default:
        chipTypeClass = '';
    }

    expect(buttonElement.classList.contains(chipTypeClass)).toBe(true);
  }

  function getChipButtonElement(chip: IChipComponent): HTMLButtonElement {
    return getShadowElement(chip, CHIP_CONSTANTS.selectors.BUTTON) as HTMLButtonElement;
  }

  function clickChip(chip: IChipComponent): void {
    const buttonElement = getChipButtonElement(chip);
    buttonElement.click();
  }

  function dispatchChipKeydown(chip: IChipComponent, key: string): void {
    const buttonElement = getChipButtonElement(chip);
    chip.focus();
    dispatchKeyEvent(buttonElement, 'keydown', key);
  }

  function getDeleteButtonElement(chip: IChipComponent): HTMLElement {
    return getShadowElement(chip, `.${CHIP_CONSTANTS.classes.DELETE_BUTTON}`);
  }

  function clickDeleteButton(chip: IChipComponent): void {
    const deleteButton = getDeleteButtonElement(chip);
    if (deleteButton) {
      deleteButton.click();
    }
  }

  function dispatchDeleteButtonKeydown(chip: IChipComponent, key: string): void {
    const deleteButton = getDeleteButtonElement(chip);
    chip.focus();
    dispatchKeyEvent(deleteButton, 'keydown', key);
  }

  function expectChipDisabled(chip: IChipComponent, isDisabled: boolean): void {
    const buttonElement = getChipButtonElement(chip);
    
    expect(chip.disabled).toBe(isDisabled);
    expect(buttonElement.disabled).toBe(isDisabled);
  }

  function expectChipDense(chip: IChipComponent, isDense: boolean): void {
    const buttonElement = getChipButtonElement(chip);

    expect(chip.dense).toBe(isDense);
    expect(buttonElement.classList.contains(CHIP_CONSTANTS.classes.DENSE)).toBe(isDense);
  }
});
