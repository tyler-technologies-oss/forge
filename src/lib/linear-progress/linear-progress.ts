import { CustomElement, coerceBoolean, coerceNumber, attachShadowTemplate, FoundationProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { LinearProgressAdapter } from './linear-progress-adapter';
import { LINEAR_PROGRESS_CONSTANTS } from './linear-progress-constants';
import { LinearProgressFoundation } from './linear-progress-foundation';

import template from './linear-progress.html';
import styles from './linear-progress.scss';

export interface ILinearProgressComponent extends IBaseComponent {
  open: boolean;
  determinate: boolean;
  progress: number;
  buffer: number;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-linear-progress': ILinearProgressComponent;
  }
}

@CustomElement({
  name: LINEAR_PROGRESS_CONSTANTS.elementName
})
export class LinearProgressComponent extends BaseComponent implements ILinearProgressComponent {
  public static get observedAttributes(): string[] {
    return [
      LINEAR_PROGRESS_CONSTANTS.attributes.OPEN,
      LINEAR_PROGRESS_CONSTANTS.attributes.DETERMINATE,
      LINEAR_PROGRESS_CONSTANTS.attributes.PROGRESS,
      LINEAR_PROGRESS_CONSTANTS.attributes.BUFFER,
      LINEAR_PROGRESS_CONSTANTS.attributes.PROGRESSBAR_ARIA_LABEL
    ];
  }

  private _foundation: LinearProgressFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new LinearProgressFoundation(new LinearProgressAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case LINEAR_PROGRESS_CONSTANTS.attributes.OPEN:
        this.open = coerceBoolean(newValue);
        break;
      case LINEAR_PROGRESS_CONSTANTS.attributes.DETERMINATE:
        this.determinate = coerceBoolean(newValue);
        break;
      case LINEAR_PROGRESS_CONSTANTS.attributes.PROGRESS:
        this.progress = coerceNumber(newValue);
        break;
      case LINEAR_PROGRESS_CONSTANTS.attributes.BUFFER:
        this.buffer = coerceNumber(newValue);
        break;
      case LINEAR_PROGRESS_CONSTANTS.attributes.PROGRESSBAR_ARIA_LABEL:
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

  @FoundationProperty()
  public buffer: number;
}
