// import { sendKeys } from '@web/test-runner-commands';
// import { expect } from '@esm-bundle/chai';
// import { elementUpdated, fixture, html } from '@open-wc/testing';
// import { spy } from 'sinon';
// import { getShadowElement } from '@tylertech/forge-core';
// import { TestHarness } from '../../test/utils/test-harness';
// import type { IStateLayerComponent } from '../state-layer/state-layer';
// import { IFocusIndicatorComponent } from '../focus-indicator/focus-indicator';

// import './slider';
// import { STATE_LAYER_CONSTANTS } from '../state-layer';
// import { ISwitchComponent } from './switch';
// import { SWITCH_CONSTANTS } from './switch-constants';

// class SwitchHarness extends TestHarness<ISwitchComponent> {
//   public rootElement: HTMLLabelElement;
//   public inputContainerElement: HTMLElement;
//   public inputElement: HTMLInputElement;
//   public trackElement: HTMLElement;
//   public handleElement: HTMLElement;
//   public iconOffElement: HTMLElement;
//   public iconOffSvgElement: SVGElement;
//   public iconOnElement: HTMLElement;
//   public iconOnSvgElement: HTMLElement;
//   public labelElement: HTMLElement;
//   public stateLayer: IStateLayerComponent;
//   public focusIndicator: IFocusIndicatorComponent;
  
//   constructor(el: ISwitchComponent) {
//     super(el);
//   }
  
//   public initElementRefs(): void {
//     this.rootElement = getShadowElement(this.element, SWITCH_CONSTANTS.selectors.ROOT) as HTMLLabelElement;
//     this.inputContainerElement: HTMLElement;
//     this.inputElement: HTMLInputElement;
//     this.trackElement: HTMLElement;
//     this.handleElement: HTMLElement;
//     this.iconOffElement: HTMLElement;
//     this.iconOffSvgElement: SVGElement;
//     this.iconOnElement: HTMLElement;
//     this.iconOnSvgElement: HTMLElement;
//     this.labelElement: HTMLElement;
//     this.stateLayer: IStateLayerComponent;
//     this.focusIndicator: IFocusIndicatorComponent;

//     this.rootElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.ROOT);
//     this.trackElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.TRACK);
//     this.handleContainerElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.HANDLE_CONTAINER);
//     this.endInputElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.END_INPUT) as HTMLInputElement;
//     this.endHandleElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.END_HANDLE);
//     this.endHandleThumbElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.END_HANDLE_THUMB);
//     this.endLabelElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.END_LABEL);
//     this.endLabelContentElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.END_LABEL_CONTENT);
//     this.endStateLayer = getShadowElement(this.element, '.handle.end forge-state-layer') as IStateLayerComponent;
//     this.startInputElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.START_INPUT) as HTMLInputElement;
//     this.startHandleElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.START_HANDLE);
//     this.startHandleThumbElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.START_HANDLE_THUMB);
//     this.startLabelElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.START_LABEL);
//     this.startLabelContentElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.START_LABEL_CONTENT);
//     this.startStateLayer = getShadowElement(this.element, '.handle.start forge-state-layer') as IStateLayerComponent;
//   }
  
//   public focusStart(): void {
//     this.startInputElement.focus();
//   }
  
//   public focusEnd(): void {
//     this.endInputElement.focus();
//   }
  
//   public async pressArrowKey(key: 'ArrowLeft' | 'ArrowRight'): Promise<void> {
//     await sendKeys({ press: key });
//   }
  
//   public async simulateEndInteraction(type: 'input' | 'change', value: number): Promise<void> {
//     this.endInputElement.focus();
//     this.endInputElement.valueAsNumber = value;
//     this.endInputElement.dispatchEvent(new InputEvent(type, { bubbles: true, composed: true }));
//   }
  
//   public simulateStartInteraction(type: 'input' | 'change', value: number): void {
//     this.endInputElement.focus();
//     this.startInputElement.valueAsNumber = value;
//     this.startInputElement.dispatchEvent(new InputEvent(type, { bubbles: true, composed: true }));
//   }
  
//   public simulateStartEnter(): void {
//     let { x, y, width, height } = this.startHandleThumbElement.getBoundingClientRect();
//     x = x + (width / 2);
//     y = y + (height / 2);
//     this.startInputElement.dispatchEvent(new PointerEvent('pointerenter', { clientX: x, clientY: y, screenX: x, screenY: y }));
//   }
  
//   public simulateStartMove(divisor = 2): void {
//     let { x, y, width, height } = this.startInputElement.getBoundingClientRect();
//     x = x + (width / divisor);
//     y = y + (height / divisor);
//     this.startInputElement.dispatchEvent(new PointerEvent('pointermove', { clientX: x, clientY: y, screenX: x, screenY: y }));
//   }

//   public simulateStartLeave(): void {
//     this.startInputElement.dispatchEvent(new PointerEvent('pointerleave'));
//   }
  
//   public simulateEndEnter(): void {
//     let { x, y, width, height } = this.endHandleThumbElement.getBoundingClientRect();
//     x = x + (width / 2);
//     y = y + (height / 2);
//     this.endInputElement.dispatchEvent(new PointerEvent('pointerenter', { clientX: x, clientY: y, screenX: x, screenY: y }));
//   }
  
//   public simulateEndMove(divisor = 2): void {
//     let { x, y, width, height } = this.endInputElement.getBoundingClientRect();
//     x = x + (width / divisor);
//     y = y + (height / divisor);
//     this.endInputElement.dispatchEvent(new PointerEvent('pointermove', { clientX: x, clientY: y, screenX: x, screenY: y }));
//   }

//   public simulateEndLeave(): void {
//     this.endInputElement.dispatchEvent(new PointerEvent('pointerleave'));
//   }
// }

// });
