import { CustomElement, attachShadowTemplate, FoundationProperty, coerceBoolean, coerceNumber } from '@tylertech/forge-core';

import { CircularProgressAdapter } from './circular-progress-adapter';
import { CircularProgressFoundation } from './circular-progress-foundation';
import { CIRCULAR_PROGRESS_CONSTANTS } from './circular-progress-constants';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import template from './circular-progress.html';
import styles from './circular-progress.scss';

export interface ICircularProgressComponent extends IBaseComponent {
  open: boolean;
  determinate: boolean;
  progress: number;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-circular-progress': ICircularProgressComponent;
  }
}

@CustomElement({
  name: CIRCULAR_PROGRESS_CONSTANTS.elementName
})
export class CircularProgressComponent extends BaseComponent implements ICircularProgressComponent {
  public static get observedAttributes(): string[] {
    return [
      CIRCULAR_PROGRESS_CONSTANTS.attributes.OPEN,
      CIRCULAR_PROGRESS_CONSTANTS.attributes.DETERMINATE,
      CIRCULAR_PROGRESS_CONSTANTS.attributes.PROGRESS,
      CIRCULAR_PROGRESS_CONSTANTS.attributes.PROGRESSBAR_ARIA_LABEL
    ];
  }

  private _foundation: CircularProgressFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new CircularProgressFoundation(new CircularProgressAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case CIRCULAR_PROGRESS_CONSTANTS.attributes.OPEN:
        this.open = coerceBoolean(newValue);
        break;
      case CIRCULAR_PROGRESS_CONSTANTS.attributes.DETERMINATE:
        this.determinate = coerceBoolean(newValue);
        break;
      case CIRCULAR_PROGRESS_CONSTANTS.attributes.PROGRESS:
        this.progress = coerceNumber(newValue);
        break;
      case CIRCULAR_PROGRESS_CONSTANTS.attributes.PROGRESSBAR_ARIA_LABEL:
        this._foundation.ariaLabel = newValue;
        break;
    }
  }

  @FoundationProperty()
  public open: boolean;
  
  @FoundationProperty()
  public determinate: boolean;

  @FoundationProperty()
  public progress: number;
}
