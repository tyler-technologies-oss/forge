import { customElement, attachShadowTemplate, coreProperty, coerceBoolean, coerceNumber } from '@tylertech/forge-core';

import { CircularProgressAdapter } from './circular-progress-adapter';
import { CircularProgressCore } from './circular-progress-core';
import { CircularProgressTheme, CIRCULAR_PROGRESS_CONSTANTS } from './circular-progress-constants';
import { BaseComponent } from '../core/base/base-component';
import { IWithElementInternals, WithElementInternals } from '../core/mixins/internals/with-element-internals';
import { IWithDefaultAria, WithDefaultAria } from '../core/mixins/internals/with-default-aria';

import template from './circular-progress.html';
import styles from './circular-progress.scss';

export interface ICircularProgressComponent extends IWithElementInternals, IWithDefaultAria {
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
 * @summary Circular progress indicators display progress by animating along a circular track in a clockwise direction. They can be used to represent both determinate and indeterminate progress.
 *
 * @description
 * Progress indicators inform users about the status of ongoing processes.
 * - Determinate indicators display how long a process will take.
 * - Indeterminate indicators express an unspecified amount of wait time.
 *
 *
 * @property {boolean} [determinate=false] - Controls the determinate state.
 * @property {number} [progress=0] - Controls the progress while in a determinate state. Accepts values from `0` to `1`.
 * @property {CircularProgressTheme} [theme="primary"] - Controls the theme of the progress indicator.
 * @property {boolean} [track=false] - Controls the visibility of the track background.
 *
 * @globalconfig track
 *
 * @attribute {boolean} [determinate=false] - Controls the determinate state.
 * @attribute {number} [progress=0] - Controls the progress while in a determinate state. Accepts values from `0` to `1`.
 * @attribute {CircularProgressTheme} [theme="primary"] - Controls the theme of the progress indicator.
 * @attribute {boolean} [track=false] - Controls the visibility of the track background.
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
@customElement({
  name: CIRCULAR_PROGRESS_CONSTANTS.elementName
})
export class CircularProgressComponent extends WithDefaultAria(WithElementInternals(BaseComponent)) implements ICircularProgressComponent {
  public static get observedAttributes(): string[] {
    return [
      CIRCULAR_PROGRESS_CONSTANTS.attributes.DETERMINATE,
      CIRCULAR_PROGRESS_CONSTANTS.attributes.PROGRESS,
      CIRCULAR_PROGRESS_CONSTANTS.attributes.THEME,
      CIRCULAR_PROGRESS_CONSTANTS.attributes.TRACK
    ];
  }

  private _core: CircularProgressCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new CircularProgressCore(new CircularProgressAdapter(this));
  }

  public connectedCallback(): void {
    this._core.initialize();
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
  }

  @coreProperty()
  declare public determinate: boolean;

  @coreProperty()
  declare public progress: number;

  @coreProperty()
  declare public theme: CircularProgressTheme;

  @coreProperty()
  declare public track: boolean;
}
