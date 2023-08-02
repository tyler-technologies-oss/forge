import { getShadowElement, requireParent, toggleAttribute } from '@tylertech/forge-core';
import { IStateLayerComponent, STATE_LAYER_CONSTANTS } from '../../state-layer';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { TAB_BAR_CONSTANTS } from '../tab-bar/tab-bar-constants';
import type { ITabComponent } from './tab';
import { TAB_CONSTANTS } from './tab-constants';

export interface ITabAdapter extends IBaseAdapter {
  initialize(): void;
  addInteractionListener(type: string, listener: EventListener): void;
  setDisabled(value: boolean): void;
  setSelected(value: boolean): void;
  animateSelected(): void;
  animateStateLayer(): void;
}

export class TabAdapter extends BaseAdapter<ITabComponent> implements ITabAdapter {
  private readonly _tabIndicatorElement: HTMLElement;
  private readonly _stateLayerElement: IStateLayerComponent;

  constructor(component: ITabComponent) {
    super(component);
    this._tabIndicatorElement = getShadowElement(this._component, TAB_CONSTANTS.selectors.INDICATOR);
    this._stateLayerElement = getShadowElement(this._component, STATE_LAYER_CONSTANTS.elementName) as IStateLayerComponent;
  }

  public initialize(): void {
    this._component.tabIndex = this._component.selected ? 0 : -1;
    this._component.setAttribute('role', 'tab');
    this._component.setAttribute('aria-selected', this._component.selected ? 'true' : 'false');
  }

  public addInteractionListener(type: string, listener: EventListener): void {
    this._component.addEventListener(type, listener);
  }

  public setDisabled(value: boolean): void {
    this._stateLayerElement.disabled = value;
    this._component.tabIndex = value ? -1 : this._component.selected ? 0 : -1;
    this._component.setAttribute('aria-disabled', String(value));
    toggleAttribute(this._component, value, TAB_CONSTANTS.attributes.DISABLED, String(value));
  }

  public setSelected(value: boolean): void {
    this._component.tabIndex = value ? 0 : -1;
    this._component.setAttribute('aria-selected', String(value));
  }

  public animateSelected(): void {
    this._tabIndicatorElement.getAnimations().forEach(a => a.cancel());
    const frames = this._getKeyframes();
    if (frames) {
      this._tabIndicatorElement.animate(frames, { duration: TAB_CONSTANTS.numbers.ANIMATION_DURATION, easing: TAB_CONSTANTS.strings.EASING });
    }
  }

  public animateStateLayer(): void {
    this._stateLayerElement.playAnimation();
  }

  private _getKeyframes(): Keyframe[] | null {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!this._component.selected) {
      return reduceMotion ? [{ opacity: 1 }, { transform: 'none' }] : null;
    }

    const from: Keyframe = {};
    const isVertical = this._component.vertical;
    const selectedTabIndicator = this._getSelectedTabIndicator();
    const fromRect = selectedTabIndicator?.getBoundingClientRect() ?? {} as DOMRect;
    const fromPos = isVertical ? fromRect.top : fromRect.left;
    const fromExtent = isVertical ? fromRect.height : fromRect.width;
    const toRect = this._tabIndicatorElement.getBoundingClientRect();
    const toPos = isVertical ? toRect.top : toRect.left;
    const toExtent = isVertical ? toRect.height : toRect.width;
    const axis = isVertical ? 'Y' : 'X';
    const scale = fromExtent / toExtent;

    if (!reduceMotion && fromPos !== undefined && toPos !== undefined && !isNaN(scale)) {
      from.transform = `translate${axis}(${(fromPos - toPos).toFixed(4)}px) scale${axis}(${scale.toFixed(4)})`;
    } else {
      from.opacity = 0;
    }

    return [from, { transform: 'none' }];
  }

  private _getSelectedTabIndicator(): HTMLElement | null {
    const tabsEl = requireParent(this._component, TAB_BAR_CONSTANTS.elementName);
    if (tabsEl) {
      const tabChildren = Array.from(tabsEl.querySelectorAll(TAB_CONSTANTS.elementName)) as ITabComponent[];
      const selectedTab = tabChildren.find(tab => tab.hasAttribute(TAB_CONSTANTS.attributes.SELECTED));
      if (selectedTab) {
        return getShadowElement(selectedTab, TAB_CONSTANTS.selectors.INDICATOR);
      }
    }
    return null;
  }
}
