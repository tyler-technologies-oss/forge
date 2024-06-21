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
  attachRipple: () => void;
  detatchRipple: () => void;
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

class StepRippleSurface implements ForgeRippleCapableSurface {
  constructor(private _root: IStepComponent) {}

  public get root(): Element {
    return this._root;
  }

  public get unbounded(): boolean | undefined {
    return false;
  }

  public get disabled(): boolean | undefined {
    return this._root.disabled;
  }
}

export class StepAdapter extends BaseAdapter<IStepComponent> implements IStepAdapter {
  private _rootElement: HTMLElement;
  private _rippleElement: HTMLElement;
  private _container: HTMLElement;
  private _rippleInstance: ForgeRipple;
  private _expansionSlot: HTMLSlotElement;
  private _expansionPanel: IExpansionPanelComponent;

  constructor(_component: IStepComponent) {
    super(_component);
    this._rootElement = getShadowElement(_component, STEP_CONSTANTS.selectors.STEP) as HTMLElement;
    this._rippleElement = getShadowElement(_component, STEP_CONSTANTS.selectors.STEP_RIPPLE) as HTMLElement;
    this._container = getShadowElement(_component, STEP_CONSTANTS.selectors.STEP_CONTAINER) as HTMLElement;
  }

  public get component(): IStepComponent {
    return this._component;
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
    (this._rootElement.querySelector(STEP_CONSTANTS.selectors.INDEX) as HTMLElement).innerHTML = (value + 1 || '').toString();
  }

  public toggleRootClass(className: string, on: boolean): void {
    toggleClass(this._rootElement, on, className);
  }

  public toggleDisabled(disabled: boolean): void {
    toggleClass(this._rootElement, disabled, STEP_CONSTANTS.classes.DISABLED);
    toggleAttribute(this._component, disabled, 'aria-disabled');
  }

  public toggleIcon(name: StepIcons, show: boolean): void {
    const index = this._rootElement.querySelector(STEP_CONSTANTS.selectors.INDEX) as HTMLElement;
    const icon = this._rootElement.querySelector(STEP_CONSTANTS.selectors.ICON) as IIconComponent;
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

    toggleClass(this._rootElement, expanded, STEP_CONSTANTS.classes.EXPANDED);
  }

  public setExpansionPanelAnimations(animate: boolean): void {
    this._expansionPanel.useAnimations = animate;
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
    const icon = this._rootElement.querySelector(STEP_CONSTANTS.selectors.EXPANSION_ICON);

    if (icon) {
      return;
    }

    this._rootElement.appendChild(this._createExpansionIcon());
  }

  public removeExpansionIcon(): void {
    const icon = this._rootElement.querySelector(STEP_CONSTANTS.selectors.EXPANSION_ICON);

    if (icon) {
      this._rootElement.removeChild(icon);
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
    const rippleCapableSurface = new StepRippleSurface(this._component);
    const rippleAdapter = {
      ...ForgeRipple.createAdapter(rippleCapableSurface),
      addClass: (className: string) => this._rippleElement.classList.add(className),
      removeClass: (className: string) => this._rippleElement.classList.remove(className),
      updateCssVariable: (varName: string, value: string) => this._rippleElement.style.setProperty(varName, value)
    };
    const rippleFoundation = new ForgeRippleFoundation(rippleAdapter);
    this._rippleInstance = new ForgeRipple(this._component, rippleFoundation);

    return this._rippleInstance;
  }

  private _createExpansionPanel(): IExpansionPanelComponent {
    const panel = document.createElement('forge-expansion-panel');
    panel.useAnimations = false;
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
