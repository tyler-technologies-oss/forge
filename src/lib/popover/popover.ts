import { attachShadowTemplate, coerceBoolean, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { PopoverAdapter } from './popover-adapter';
import { PopoverAnimationType, PopoverTriggerType, POPOVER_CONSTANTS } from './popover-constants';
import { IPopoverFoundation, PopoverFoundation } from './popover-foundation';
import { OverlayComponent, OVERLAY_CONSTANTS } from '../overlay';
import { IOverlayAware, OverlayAware } from '../overlay/base/overlay-aware';

import template from './popover.html';
import styles from './popover.scss';

export interface IPopoverComponent extends IOverlayAware {
  arrow: boolean;
  animationType: PopoverAnimationType;
  triggerType: PopoverTriggerType;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-popover': IPopoverComponent;
  }

  interface HTMLElementEventMap {
    'forge-popover-beforetoggle': CustomEvent;
    'forge-popover-toggle': CustomEvent;
  }
}

/**
 * @tag forge-popover
 */
@CustomElement({
  name: POPOVER_CONSTANTS.elementName,
  dependencies: [OverlayComponent]
})
export class PopoverComponent extends OverlayAware<IPopoverFoundation> implements IPopoverComponent {
  public static get observedAttributes(): string[] {
    return [
      ...Object.values(OVERLAY_CONSTANTS.observedAttributes),
      POPOVER_CONSTANTS.attributes.ARROW,
      POPOVER_CONSTANTS.attributes.ANIMATION_TYPE,
      POPOVER_CONSTANTS.attributes.TRIGGER_TYPE
    ];
  }

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new PopoverFoundation(new PopoverAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case POPOVER_CONSTANTS.attributes.ARROW:
        this.arrow = coerceBoolean(newValue);
        return;
      case POPOVER_CONSTANTS.attributes.ANIMATION_TYPE:
        this.animationType = newValue as PopoverAnimationType;
        return;
      case POPOVER_CONSTANTS.attributes.TRIGGER_TYPE:
        this.triggerType = newValue as PopoverTriggerType;
        return;
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  @FoundationProperty()
  public arrow: boolean;

  @FoundationProperty()
  public animationType: PopoverAnimationType;

  @FoundationProperty()
  public triggerType: PopoverTriggerType;
}
