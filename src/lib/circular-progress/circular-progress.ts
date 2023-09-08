import { CustomElement, attachShadowTemplate, FoundationProperty, coerceBoolean, coerceNumber } from '@tylertech/forge-core';

import { CircularProgressAdapter } from './circular-progress-adapter';
import { CircularProgressFoundation } from './circular-progress-foundation';
import { CIRCULAR_PROGRESS_CONSTANTS } from './circular-progress-constants';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import template from './circular-progress.html';
import styles from './circular-progress.scss';

export interface ICircularProgressComponent extends IBaseComponent {
  determinate: boolean;
  progress: number;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-circular-progress': ICircularProgressComponent;
  }
}

/**
 * @tag forge-circular-progress
 * 
 * @summary
 * Circular progress indicators display progress by animating along a circular track in a clockwise direction.
 * 
 * @description
 * Progress indicators inform users about the status of ongoing processes.
 * - Determinate indicators display how long a process will take.
 * - Indeterminate indicators express an unspecified amount of wait time.
 *
 * @property {boolean} determinate - Controls the determinate state.
 * @property {boolean} progress - Controls the progress while in a determinate state. Accepts values from `0` to `1`.
 * 
 * @attribute {boolean} determinate - Controls the determinate state.
 * @attribute {string} data-aria-label - Propagates an `aria-label` to the underlying progressbar element.
 * 
 * @slot - The is the default/unnamed slot. Renders content at the center of the progress indicator.
 * 
 * @cssproperty --forge-circular-progress-size - The height and width of the indicator container.
 * @cssproperty --forge-circular-progress-padding - The padding inside the bounding box of the container.
 * @cssproperty --forge-circular-progress-track-width - The track indicator width.
 * @cssproperty --forge-circular-progress-track-color - The track indicator color.
 * @cssproperty --forge-circular-progress-track-background - The track background color.
 * 
 * @csspart progressbar - Styles the progress bar container element
 */
@CustomElement({
  name: CIRCULAR_PROGRESS_CONSTANTS.elementName
})
export class CircularProgressComponent extends BaseComponent implements ICircularProgressComponent {
  public static get observedAttributes(): string[] {
    return [
      CIRCULAR_PROGRESS_CONSTANTS.attributes.DETERMINATE,
      CIRCULAR_PROGRESS_CONSTANTS.attributes.PROGRESS,
      CIRCULAR_PROGRESS_CONSTANTS.attributes.ARIA_LABEL
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
      case CIRCULAR_PROGRESS_CONSTANTS.attributes.DETERMINATE:
        this.determinate = coerceBoolean(newValue);
        break;
      case CIRCULAR_PROGRESS_CONSTANTS.attributes.PROGRESS:
        this.progress = coerceNumber(newValue);
        break;
      case CIRCULAR_PROGRESS_CONSTANTS.attributes.ARIA_LABEL:
        this._foundation.ariaLabel = newValue;
        break;
    }
  }
  
  @FoundationProperty()
  public declare determinate: boolean;

  @FoundationProperty()
  public declare progress: number;
}
