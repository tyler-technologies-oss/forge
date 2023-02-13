import { defineSwitchComponent, ISwitchComponent, SWITCH_CONSTANTS } from '@tylertech/forge/switch';
import { removeElement, getShadowElement } from '@tylertech/forge-core';
import { MDCSwitch } from '@material/switch';
import { tick } from '@tylertech/forge-testing';
interface ITestContext {
  context: ISwitchTextContext;
}

interface ISwitchTextContext {
  component: ISwitchComponent;
  containerElement: HTMLElement;
  buttonElement: HTMLButtonElement;
  slotElement: HTMLSlotElement;
  getMDCSwitch(): MDCSwitch;
  append(): void;
  destroy(): void;
}

describe('SwitchComponent', function (this: ITestContext) {
  beforeAll(function (this: ITestContext) {
    defineSwitchComponent();
  });

  afterEach(function (this: ITestContext) {
    this.context.destroy();
  });

  it('should contain shadowroot', function (this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.component.shadowRoot).not.toBeNull();
  });

  it('should be unselected by default', function (this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.component.selected).withContext('Expected selected property to be false').toBeFalse();
    expect(this.context.getMDCSwitch().selected).withContext('Expected MDCSwitch.selected to be false').toBeFalse();
  });

  it('should set selected by default via property', function (this: ITestContext) {
    this.context = setupTestContext(true, { selected: true });
    expect(this.context.component.selected).withContext('Expected selected property to be true').toBeTrue();
    expect(this.context.getMDCSwitch().selected).withContext('Expected MDCSwitch.selected to be true').toBeTrue();
  });

  it('should set selected dynamically via property', async function (this: ITestContext) {
    this.context = setupTestContext(true);

    await tick();
    this.context.component.selected = true;
    await tick();

    expect(this.context.component.selected).withContext('Expected selected property to be true').toBeTrue();
    expect(this.context.getMDCSwitch().selected).withContext('Expected MDCSwitch.selected to be true').toBeTrue();
  });

  it('should unselect dynamically via property', async function (this: ITestContext) {
    this.context = setupTestContext(true, { selected: true });

    await tick();
    this.context.component.selected = false;
    await tick();

    expect(this.context.component.selected).withContext('Expected selected property to be false').toBeFalse();
    expect(this.context.getMDCSwitch().selected).withContext('Expected MDCSwitch.selected to be false').toBeFalse();
  });

  it('should set selected by default via attribute', async function (this: ITestContext) {
    this.context = setupTestContext(false);
    this.context.component.setAttribute(SWITCH_CONSTANTS.attributes.SELECTED, '');
    this.context.append();
    await tick();

    expect(this.context.component.selected).withContext('Expected selected property to be true').toBeTrue();
    expect(this.context.getMDCSwitch().selected).withContext('Expected MDCSwitch.selected to be true').toBeTrue();
  });

  it('should properly synchronize selected state with display when reattached', async function (this: ITestContext) {
    this.context = setupTestContext(false);
    this.context.component.setAttribute(SWITCH_CONSTANTS.attributes.SELECTED, '');
    this.context.append();
    await tick();
    this.context.component.remove();

    this.context.component.selected = false;
    document.body.appendChild(this.context.component);

    expect(this.context.component.selected).withContext('Expected selected property to be false').toBeFalse();
    expect(this.context.getMDCSwitch().selected).withContext('Expected MDCSwitch.selected to be false').toBeFalse();
  });

  it('should be enabled by default', function (this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.component.disabled).withContext('Expected disabled property to be false').toBeFalse();
    expect(this.context.getMDCSwitch().disabled).withContext('Expected MDCSwitch.disabled to be false').toBeFalse();
  });

  it('should set disabled by default via property', function (this: ITestContext) {
    this.context = setupTestContext(true, { disabled: true });
    expect(this.context.component.disabled).withContext('Expected disabled property to be true').toBeTrue();
    expect(this.context.getMDCSwitch().disabled).withContext('Expected MDCSwitch.disabled to be true').toBeTrue();
  });

  it('should set disabled dynamically via property', async function (this: ITestContext) {
    this.context = setupTestContext(true);
    
    await tick();
    this.context.component.disabled = true;
    await tick();

    expect(this.context.component.disabled).withContext('Expected disabled property to be true').toBeTrue();
    expect(this.context.getMDCSwitch().disabled).withContext('Expected MDCSwitch.disabled to be true').toBeTrue();
  });

  it('should set enabled dynamically via property', async function (this: ITestContext) {
    this.context = setupTestContext(true, { disabled: true });
    
    await tick();
    this.context.component.disabled = false;
    await tick();

    expect(this.context.component.disabled).withContext('Expected disabled property to be false').toBeFalse();
    expect(this.context.getMDCSwitch().disabled).withContext('Expected MDCSwitch.disabled to be false').toBeFalse();
  });

  it('should set disabled by default via attribute', async function (this: ITestContext) {
    this.context = setupTestContext(false);
    this.context.component.setAttribute(SWITCH_CONSTANTS.attributes.DISABLED, '');
    this.context.append();
    await tick();

    expect(this.context.component.disabled).withContext('Expected disabled property to be true').toBeTrue();
    expect(this.context.getMDCSwitch().disabled).withContext('Expected MDCSwitch.disabled to be true').toBeTrue();
  });

  it('should properly synchronize disabled state with display when reattached', async function (this: ITestContext) {
    this.context = setupTestContext(false);
    this.context.component.setAttribute(SWITCH_CONSTANTS.attributes.DISABLED, '');
    this.context.append();
    await tick();
    this.context.component.remove();

    this.context.component.disabled = false;
    document.body.appendChild(this.context.component);

    expect(this.context.component.disabled).withContext('Expected disabled property to be false').toBeFalse();
    expect(this.context.getMDCSwitch().disabled).withContext('Expected MDCSwitch.disabled to be false').toBeFalse();
  });

  it('should not be dense by default', function (this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.component.dense).withContext('Expected dense property to be false').toBeFalse();
    expect(this.context.component.hasAttribute(SWITCH_CONSTANTS.attributes.DENSE)).withContext('Expected to have no dense attribute').toBeFalse();
  });

  it('should set dense by default via property', function (this: ITestContext) {
    this.context = setupTestContext(true, { dense: true });
    expect(this.context.component.dense).withContext('Expected dense property to be true').toBeTrue();
    expect(this.context.component.hasAttribute(SWITCH_CONSTANTS.attributes.DENSE)).withContext('Expected dense attribute').toBeTrue();
  });

  it('should set dense by default via attribute', async function (this: ITestContext) {
    this.context = setupTestContext(false);
    this.context.component.setAttribute(SWITCH_CONSTANTS.attributes.DENSE, '');
    this.context.append();
    await tick();

    expect(this.context.component.dense).withContext('Expected dense property to be true').toBeTrue();
    expect(this.context.component.hasAttribute(SWITCH_CONSTANTS.attributes.DENSE)).withContext('Expected dense attribute').toBeTrue();
  });

  it('should use end label position by default', function (this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.component.labelPosition).withContext('Expected labelPosition property to be "end"').toBe('end');
  });

  it('should set labelPosition by default via property', function (this: ITestContext) {
    this.context = setupTestContext(true, { labelPosition: 'start' });
    expect(this.context.component.labelPosition).withContext('Expected labelPosition property to be "start"').toBe('start');
    expect(this.context.containerElement.classList.contains(SWITCH_CONSTANTS.classes.LABEL_START)).withContext('Expected label start class on container element').toBeTrue();
  });

  it('should set labelPosition by default via attribute', async function (this: ITestContext) {
    this.context = setupTestContext(false);
    this.context.component.setAttribute(SWITCH_CONSTANTS.attributes.LABEL_POSITION, 'start');
    this.context.append();
    await tick();

    expect(this.context.component.labelPosition).withContext('Expected labelPosition property to be "start"').toBe('start');
    expect(this.context.containerElement.classList.contains(SWITCH_CONSTANTS.classes.LABEL_START)).withContext('Expected label start class on container element').toBeTrue();
  });

 it('should dispatch select event when clicking button', function(this: ITestContext) {
    this.context = setupTestContext();
    const selectSpy = jasmine.createSpy('select event spy');
    this.context.component.addEventListener(SWITCH_CONSTANTS.events.SELECT, selectSpy);
    this.context.buttonElement.dispatchEvent(new MouseEvent('click'));

    expect(selectSpy).toHaveBeenCalledOnceWith(jasmine.objectContaining({ detail: true }));
    expect(this.context.component.selected).toBeTrue();
    expect(this.context.getMDCSwitch().selected).toBeTrue();
  });

  it('should dispatch select event when clicking button when selected', function(this: ITestContext) {
    this.context = setupTestContext(true, { selected: true });
    const selectSpy = jasmine.createSpy('select event spy');
    this.context.component.addEventListener(SWITCH_CONSTANTS.events.SELECT, selectSpy);
    this.context.buttonElement.dispatchEvent(new MouseEvent('click'));

    expect(selectSpy).toHaveBeenCalledOnceWith(jasmine.objectContaining({ detail: false }));
    expect(this.context.component.selected).toBeFalse();
    expect(this.context.getMDCSwitch().selected).toBeFalse();
  });

  it('should dispatch select event when clicking label', function(this: ITestContext) {
    this.context = setupTestContext();
    const selectSpy = jasmine.createSpy('select event spy');
    this.context.component.addEventListener(SWITCH_CONSTANTS.events.SELECT, selectSpy);
    this.context.slotElement.click();

    expect(selectSpy).toHaveBeenCalledTimes(1);
    expect(this.context.component.selected).toBeTrue();
    expect(this.context.getMDCSwitch().selected).toBeTrue();
  });

  it('should not dispatch select event if clicked when disabled', function(this: ITestContext) {
    this.context = setupTestContext(true, { disabled: true });
    const selectSpy = jasmine.createSpy('select event spy');
    this.context.component.addEventListener(SWITCH_CONSTANTS.events.SELECT, selectSpy);
    this.context.component['_onClick'](new MouseEvent('click')); // Calling method directly since the disabled attribute doesn't allow for click events in HTML

    expect(selectSpy).not.toHaveBeenCalled();
  });

  it('should cancel select event', function(this: ITestContext) {
    this.context = setupTestContext(true);
    const mdcSwitchSpy = spyOn(this.context.getMDCSwitch()['foundation'], 'handleClick').and.callThrough();
    const selectSpy = jasmine.createSpy('select event spy', (evt: MouseEvent) => evt.preventDefault()).and.callThrough();
    this.context.component.addEventListener(SWITCH_CONSTANTS.events.SELECT, selectSpy);
    this.context.buttonElement.dispatchEvent(new MouseEvent('click'));

    expect(mdcSwitchSpy).not.toHaveBeenCalled();
    expect(this.context.component.selected).withContext('Expected selected state to stay unchanged').toBeFalse();
    expect(this.context.getMDCSwitch().selected).withContext('Expected MDCSwitch selected state to stay unchanged').toBeFalse();
  });

  /**
   * It is common for developers to hold their own state that is bound to a select, and they often times toggle the value
   * and bind it to the select within event listeners. This test ensures that the internal state does not toggle incorrectly
   * to avoid the UI incorrectly reflecting the opposite state value.
   */
  it('should always set selected state to value provided in select event if not cancelled', function(this: ITestContext) {
    this.context = setupTestContext(true);
    let switchState = false;
    const selectSpy = jasmine.createSpy('select event spy', (evt: CustomEvent<boolean>) => {
      switchState = !switchState; // Simulate a developer updating their own state (in reality it would be more correct to use `evt.detail` here though...)
      this.context.component.selected = switchState; // Developer updating the state (they in theory should not be doing this, but the component is smart enough to handle it)
    }).and.callThrough();
    this.context.component.addEventListener(SWITCH_CONSTANTS.events.SELECT, selectSpy);
    this.context.buttonElement.dispatchEvent(new MouseEvent('click'));

    expect(this.context.component.selected).withContext('Expected selected state to be correct').toBeTrue();
    expect(this.context.getMDCSwitch().selected).withContext('Expected MDCSwitch selected state to match').toBeTrue();
  });

  function setupTestContext(append = true, config?: Partial<ISwitchComponent>): ISwitchTextContext {
    const component = document.createElement('forge-switch');
    component.textContent = 'Label text';

    const containerElement = getShadowElement(component, SWITCH_CONSTANTS.selectors.CONTAINER);
    const buttonElement = getShadowElement(component, SWITCH_CONSTANTS.selectors.BUTTON) as HTMLButtonElement;
    const slotElement = getShadowElement(component, 'slot:not([name])') as HTMLSlotElement;

    if (config) {
      Object.assign(component, config);
    }

    if (append) {
      document.body.appendChild(component);
    }

    return {
      component,
      containerElement,
      buttonElement,
      slotElement,
      getMDCSwitch: () => component['_mdcSwitch'],
      append: () => document.body.appendChild(component),
      destroy: () => removeElement(component)
    };
  }
});
