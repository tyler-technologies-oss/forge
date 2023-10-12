import { sendKeys, sendMouse } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { spy } from 'sinon';
import { getShadowElement } from '@tylertech/forge-core';
import { TestHarness } from '../../test/utils/test-harness';
import { IFocusIndicatorComponent } from '../focus-indicator';
import { IStateLayerComponent } from '../state-layer';
import { ICheckboxComponent, CHECKBOX_CONSTANTS } from '../checkbox';

class CheckboxHarness extends TestHarness<ICheckboxComponent> {
  public rootElement: HTMLElement;
  public containerElement: HTMLElement;
  public inputElement: HTMLInputElement;
  public backgroundElement: HTMLElement;
  public checkmarkElement: HTMLElement;
  public checkmarkPathElement: HTMLElement;
  public mixedmarkElement: HTMLElement;
  public mixedmarkPathElement: HTMLElement;
  public labelElement: HTMLElement;
  public stateLayer: IStateLayerComponent;
  public focusIndicator: IFocusIndicatorComponent;

  constructor(el: ICheckboxComponent) {
    super(el);
  }

  public initElementRefs(): void {
    this.rootElement = getShadowElement(this.element, CHECKBOX_CONSTANTS.selectors.ROOT);
    this.containerElement = getShadowElement(this.element, '[part="input-container"]');
    this.inputElement = getShadowElement(this.element, CHECKBOX_CONSTANTS.selectors.INPUT) as HTMLInputElement;
    this.backgroundElement = getShadowElement(this.element, '[part="background"]');
    this.checkmarkElement = getShadowElement(this.element, '[part="checkmark"]');
    this.checkmarkPathElement = getShadowElement(this.element, '[part="checkmark-path"]');
    this.mixedmarkElement = getShadowElement(this.element, '[part="mixedmark"]');
    this.mixedmarkPathElement = getShadowElement(this.element, '[part="mixedmark-path"]');
    this.labelElement = getShadowElement(this.element, CHECKBOX_CONSTANTS.selectors.LABEL);
    this.stateLayer = getShadowElement(this.element, '[part="state-layer"]') as IStateLayerComponent;
    this.focusIndicator = getShadowElement(this.element, '[part="focus-indicator"]') as IFocusIndicatorComponent;
  }

  public async pressSpaceKey(): Promise<void> {
    await sendKeys({ press: ' ' });
  }

  public async clickElement(el: HTMLElement): Promise<void> {
    const { x, y, width, height } = el.getBoundingClientRect();

    await sendMouse({ type: 'click', position: [
      Math.floor(x + window.scrollX + width / 2),
      Math.floor(y + window.scrollY + height / 2),
    ]});
  }
}