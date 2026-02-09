import { addClass, getShadowElement, toggleAttribute, toggleClass } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../../core/base/index.js';
import { IStepComponent } from './step.js';
import { StepIcons, STEP_CONSTANTS } from './step-constants.js';
import { IIconComponent } from '../../icon/index.js';
import { IExpansionPanelComponent } from '../../expansion-panel/index.js';
import { IStateLayerComponent, STATE_LAYER_CONSTANTS } from '../../state-layer/index.js';

export interface IStepAdapter extends IBaseAdapter {
  component: IStepComponent;
  toggleDisabled(disabled: boolean): void;
  setIndex(value: number): void;
  initialize(): void;
  toggleRootClass(className: string, on: boolean): void;
  toggleIcon(name: StepIcons, show: boolean): void;
  setClickListener(listener: (evt: MouseEvent) => void): void;
  removeClickListener(listener: (evt: MouseEvent) => void): void;
  slotHasContent(): boolean;
  setExpanded(expanded: boolean): void;
  setSlotListener(listener: (evt: MouseEvent) => void): void;
  removeSlotListener(listener: (evt: MouseEvent) => void): void;
  setExpansionPanelAnimations: (animate: boolean) => void;
  addExpansionPanel: () => void;
  removeExpansionPanel: () => void;
  addExpansionIcon: () => void;
  removeExpansionIcon: () => void;
  addExpansionPanelListener(event: string, listener: EventListener): void;
  removeExpansionPanelListener(event: string, listener: EventListener): void;
  isExpandedContentInFocus(checkElement?: HTMLElement): boolean;
}

export class StepAdapter extends BaseAdapter<IStepComponent> implements IStepAdapter {
  private _stepContainer: HTMLElement;
  private _container: HTMLElement;
  private _expansionSlot: HTMLSlotElement;
  private _expansionPanel: IExpansionPanelComponent;
  private readonly _stateLayerElement: IStateLayerComponent;

  constructor(_component: IStepComponent) {
    super(_component);
    this._stepContainer = getShadowElement(_component, STEP_CONSTANTS.selectors.STEP);
    this._container = getShadowElement(_component, STEP_CONSTANTS.selectors.STEP_CONTAINER) as HTMLElement;
    this._stateLayerElement = getShadowElement(this._component, STATE_LAYER_CONSTANTS.elementName) as IStateLayerComponent;
  }

  public get component(): IStepComponent {
    return this._component;
  }

  public initialize(): void {
    if (!this._component.hasAttribute('role')) {
      this._component.setAttribute('role', 'tab');
    }
  }

  public setIndex(value: number): void {
    (this._stepContainer.querySelector(STEP_CONSTANTS.selectors.INDEX) as HTMLElement).innerHTML = (value + 1 || '').toString();
  }

  public toggleRootClass(className: string, on: boolean): void {
    toggleClass(this._stepContainer, on, className);
  }

  public toggleDisabled(disabled: boolean): void {
    toggleClass(this._stepContainer, disabled, STEP_CONSTANTS.classes.DISABLED);
    toggleAttribute(this._component, disabled, 'aria-disabled');
    this._stateLayerElement.disabled = disabled;
  }

  public toggleIcon(name: StepIcons, show: boolean): void {
    const index = this._stepContainer.querySelector(STEP_CONSTANTS.selectors.INDEX) as HTMLElement;
    const icon = this._stepContainer.querySelector(STEP_CONSTANTS.selectors.ICON) as IIconComponent;
    if (!show) {
      index.style.display = 'inherit';
      icon.style.display = 'none';
      return;
    }

    index.style.display = 'none';
    icon.style.display = 'inherit';
    icon.name = name;
  }

  public slotHasContent(): boolean {
    return this._expansionSlot.assignedElements({ flatten: true }).length > 0;
  }

  public setClickListener(listener: (evt: MouseEvent) => void): void {
    this._component.addEventListener('click', listener);
  }

  public removeClickListener(listener: (evt: MouseEvent) => void): void {
    this._component.removeEventListener('click', listener);
  }

  public setSlotListener(listener: (evt: MouseEvent) => void): void {
    this._expansionSlot.addEventListener('slotchange', listener);
  }

  public removeSlotListener(listener: (evt: MouseEvent) => void): void {
    if (this._expansionSlot) {
      this._expansionSlot.removeEventListener('slotchange', listener);
    }
  }

  public setExpanded(expanded: boolean): void {
    if (this._expansionPanel) {
      this._expansionPanel.open = expanded;
      toggleAttribute(this._expansionPanel, !expanded, 'tabindex', '-1');
    }

    toggleClass(this._stepContainer, expanded, STEP_CONSTANTS.classes.EXPANDED);
  }

  public setExpansionPanelAnimations(animate: boolean): void {
    this._expansionPanel.animationType = animate ? 'default' : 'none';
  }

  public addExpansionPanel(): void {
    const panel = this._container.querySelector(STEP_CONSTANTS.selectors.EXPANSION_PANEL);

    if (panel) {
      return;
    }

    this._expansionPanel = this._container.appendChild(this._createExpansionPanel());
    this._expansionSlot = this._expansionPanel.querySelector(STEP_CONSTANTS.selectors.EXPANSION_SLOT) as HTMLSlotElement;
  }

  public removeExpansionPanel(): void {
    const panel = this._container.querySelector(STEP_CONSTANTS.selectors.EXPANSION_PANEL);

    if (panel) {
      this._container.removeChild(panel);
    }
  }

  public addExpansionIcon(): void {
    const icon = this._stepContainer.querySelector(STEP_CONSTANTS.selectors.EXPANSION_ICON);

    if (icon) {
      return;
    }

    this._stepContainer.appendChild(this._createExpansionIcon());
  }

  public removeExpansionIcon(): void {
    const icon = this._stepContainer.querySelector(STEP_CONSTANTS.selectors.EXPANSION_ICON);

    if (icon) {
      this._stepContainer.removeChild(icon);
    }
  }

  public addExpansionPanelListener(event: string, listener: EventListener): void {
    this._expansionPanel.addEventListener(event, listener);
  }

  public removeExpansionPanelListener(event: string, listener: EventListener): void {
    if (this._expansionPanel) {
      this._expansionPanel.removeEventListener(event, listener);
    }
  }

  public isExpandedContentInFocus(checkElement?: HTMLElement): boolean {
    return this._expansionSlot.assignedElements().some(element => element.contains(checkElement || document.activeElement));
  }

  private _createExpansionPanel(): IExpansionPanelComponent {
    const panel = document.createElement('forge-expansion-panel');
    panel.animationType = 'none';
    panel.setAttribute('part', 'expansion-panel');
    addClass(STEP_CONSTANTS.classes.EXPANSION_PANEL, panel);

    const slot = document.createElement('slot');

    slot.setAttribute('name', 'expansion-content');
    addClass(STEP_CONSTANTS.classes.EXPANSION_CONTENT, slot);
    panel.appendChild(slot);

    return panel;
  }

  private _createExpansionIcon(): IIconComponent {
    const icon = document.createElement('forge-icon');
    addClass(STEP_CONSTANTS.classes.EXPANSION_ICON, icon);
    icon.name = 'keyboard_arrow_down';
    icon.setAttribute('part', 'expanded-icon');
    return icon;
  }
}
