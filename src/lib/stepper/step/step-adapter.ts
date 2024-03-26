import { addClass, getShadowElement, toggleAttribute, toggleClass } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../../core/base';
import { IStepComponent } from './step';
import { StepIcons, STEP_CONSTANTS } from './step-constants';
import { IIconComponent } from '../../icon';
import { IExpansionPanelComponent } from '../../expansion-panel';
import { ForgeRipple, ForgeRippleAdapter, ForgeRippleCapableSurface, ForgeRippleFoundation } from '../../ripple';

export interface IStepAdapter extends IBaseAdapter {
  component: IStepComponent;
  toggleDisabled(disabled: boolean): void;
  focusButton(): void;
  attachRipple: () => void;
  detatchRipple: () => void;
  setIndex(value: number): void;
  initialize(): void;
  toggleRootClass(className: string, on: boolean): void;
  setRootAttribute(attribute: string, value: string): void;
  setRootTabIndex(value: number): void;
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

export class StepAdapter extends BaseAdapter<IStepComponent> implements IStepAdapter, ForgeRippleCapableSurface {
  private _buttonElement: HTMLButtonElement;
  private _container: HTMLElement;
  private _rippleInstance: ForgeRipple;
  private _expansionSlot: HTMLSlotElement;
  private _expansionPanel: IExpansionPanelComponent;

  constructor(_component: IStepComponent) {
    super(_component);
    this._buttonElement = getShadowElement(_component, STEP_CONSTANTS.selectors.STEP) as HTMLButtonElement;
    this._container = getShadowElement(_component, STEP_CONSTANTS.selectors.STEP_CONTAINER) as HTMLElement;
  }

  // ForgeRippleCapableSurface
  public get root(): HTMLElement {
    return this._buttonElement;
  }
  public unbounded = false;
  public get disabled(): boolean {
    return this._buttonElement.disabled;
  }

  public get component(): IStepComponent {
    return this._component;
  }

  public setRootTabIndex(value: number): void {
    this._buttonElement.tabIndex = value;
  }

  public initialize(): void {
    this._component.setAttribute('role', 'tab');
  }

  public attachRipple(): void {
    this._rippleInstance = this.initializeRipple();
  }

  public detatchRipple(): void {
    if (this._rippleInstance) {
      this._rippleInstance.destroy();
    }
  }

  public initializeRipple(): ForgeRipple {
    return this._createRipple();
  }

  public setIndex(value: number): void {
    (this._buttonElement.querySelector(STEP_CONSTANTS.selectors.INDEX) as HTMLElement).innerHTML = (value + 1 || '').toString();
  }

  public toggleRootClass(className: string, on: boolean): void {
    toggleClass(this._buttonElement, on, className);
  }

  public setRootAttribute(attribute: string, value: string): void {
    this._buttonElement.setAttribute(attribute, value);
  }

  public focusButton(): void {
    this._buttonElement.focus();
  }

  public toggleDisabled(disabled: boolean): void {
    toggleClass(this._buttonElement, disabled, STEP_CONSTANTS.classes.DISABLED);
    toggleAttribute(this._buttonElement, disabled, 'aria-disabled');
    this._buttonElement.disabled = disabled;
  }

  public toggleIcon(name: StepIcons, show: boolean): void {
    const index = this._buttonElement.querySelector(STEP_CONSTANTS.selectors.INDEX) as HTMLElement;
    const icon = this._buttonElement.querySelector(STEP_CONSTANTS.selectors.ICON) as IIconComponent;
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
    this._buttonElement.addEventListener('click', listener);
  }

  public removeClickListener(listener: (evt: MouseEvent) => void): void {
    this._buttonElement.removeEventListener('click', listener);
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

    toggleClass(this._buttonElement, expanded, STEP_CONSTANTS.classes.EXPANDED);
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
    const icon = this._buttonElement.querySelector(STEP_CONSTANTS.selectors.EXPANSION_ICON);

    if (icon) {
      return;
    }

    this._buttonElement.appendChild(this._createExpansionIcon());
  }

  public removeExpansionIcon(): void {
    const icon = this._buttonElement.querySelector(STEP_CONSTANTS.selectors.EXPANSION_ICON);

    if (icon) {
      this._buttonElement.removeChild(icon);
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

  private _createRipple(): ForgeRipple {
    const adapter: ForgeRippleAdapter = {
      ...ForgeRipple.createAdapter(this),
      isSurfaceDisabled: () => this._buttonElement.disabled
    };
    const ripple = new ForgeRipple(this._buttonElement, new ForgeRippleFoundation(adapter));
    return ripple;
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
