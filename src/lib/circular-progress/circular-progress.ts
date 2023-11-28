import { CustomElement, attachShadowTemplate, FoundationProperty, coerceBoolean, coerceNumber } from '@tylertech/forge-core';

import { CircularProgressAdapter } from './circular-progress-adapter';
import { CircularProgressFoundation } from './circular-progress-foundation';
import { CircularProgressTheme, CIRCULAR_PROGRESS_CONSTANTS } from './circular-progress-constants';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { IBaseElementInternalsComponent, WithElementInternals } from '../core/base/base-element-internals';

import template from './circular-progress.html';
import styles from './circular-progress.scss';

export interface ICircularProgressComponent extends IBaseElementInternalsComponent {
  determinate: boolean;
  progress: number;
  theme: CircularProgressTheme;
  track: boolean;
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
 * @property {CircularProgressTheme} theme - Controls the theme of the progress indicator.
 * @property {boolean} track - Controls the visibility of the track background.
 * 
 * @attribute {boolean} determinate - Controls the determinate state.
 * @attribute {boolean} progress - Controls the progress while in a determinate state. Accepts values from `0` to `1`.
 * @attribute {CircularProgressTheme} theme - Controls the theme of the progress indicator.
 * @attribute {boolean} track - Controls the visibility of the track background.
 * 
 * @slot - The is the default/unnamed slot. Renders content at the center of the progress indicator.
 * 
 * @cssproperty --forge-circular-progress-size - The height and width of the indicator container.
 * @cssproperty --forge-circular-progress-padding - The padding inside the bounding box of the container.
 * @cssproperty --forge-circular-progress-track-width - The track indicator width.
 * @cssproperty --forge-circular-progress-track-color - The track background color.
 * @cssproperty --forge-circular-progress-indicator-color - The track indicator color.
 * @cssproperty --forge-circular-progress-arc-duration - The duration of the arc animation.
 * @cssproperty --forge-circular-progress-theme-transition-duration - The duration of the theme transition.
 * @cssproperty --forge-circular-progress-theme-transition-timing - The easing function to use for the theme transition.
 * 
 * @csspart progressbar - Styles the progress bar container element
 */
@CustomElement({
  name: CIRCULAR_PROGRESS_CONSTANTS.elementName
})
export class CircularProgressComponent extends WithElementInternals(BaseComponent) implements ICircularProgressComponent {
  public static get observedAttributes(): string[] {
    return [
      CIRCULAR_PROGRESS_CONSTANTS.attributes.DETERMINATE,
      CIRCULAR_PROGRESS_CONSTANTS.attributes.PROGRESS,
      CIRCULAR_PROGRESS_CONSTANTS.attributes.THEME,
      CIRCULAR_PROGRESS_CONSTANTS.attributes.TRACK
    ];
  }

  private _foundation: CircularProgressFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new CircularProgressFoundation(new CircularProgressAdapter(this));
  }

  public connectedCallback(): void {
    super.connectedCallback();
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
      case CIRCULAR_PROGRESS_CONSTANTS.attributes.THEME:
        this.theme = newValue as CircularProgressTheme;
        break;
      case CIRCULAR_PROGRESS_CONSTANTS.attributes.TRACK:
        this.track = coerceBoolean(newValue);
        break;
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }
  
  @FoundationProperty()
  public declare determinate: boolean;

  @FoundationProperty()
  public declare progress: number;

  @FoundationProperty()
  public declare theme: CircularProgressTheme;

  @FoundationProperty()
  public declare track: boolean;
}
