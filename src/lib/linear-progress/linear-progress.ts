import { attachShadowTemplate, coerceBoolean, coerceNumber, customElement, coreProperty } from '@tylertech/forge-core';
import { BaseComponent } from '../core/base/base-component';
import { IWithDefaultAria, WithDefaultAria } from '../core/mixins/internals/with-default-aria';
import { IWithElementInternals, WithElementInternals } from '../core/mixins/internals/with-element-internals';
import { LinearProgressAdapter } from './linear-progress-adapter';
import { LinearProgressTheme, LINEAR_PROGRESS_CONSTANTS } from './linear-progress-constants';
import { LinearProgressCore } from './linear-progress-core';

import template from './linear-progress.html';
import styles from './linear-progress.scss';

export interface ILinearProgressComponent extends IWithElementInternals, IWithDefaultAria {
  determinate: boolean;
  progress: number;
  buffer: number;
  theme: LinearProgressTheme;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-linear-progress': ILinearProgressComponent;
  }
}

/**
 * @tag forge-linear-progress
 *
 * @summary
 * Linear progress indicators display progress by animating along a linear track in a horizontal direction.
 *
 * @description
 * Progress indicators inform users about the status of ongoing processes.
 * - Determinate indicators display how long a process will take.
 * - Indeterminate indicators express an unspecified amount of wait time.
 *
 * @property {boolean} [determinate=false] - Controls the determinate state.
 * @property {number} [progress=0] - Controls the progress while in a determinate state. Accepts values from `0` to `1`.
 * @property {number} [buffer=1] - Controls the buffer progress while in a determinate state. Accepts values from `0` to `1`.
 * @property {string} [theme=primary] - Sets the theme.
 *
 * @attribute {boolean} [determinate=false] - Controls the determinate state.
 * @attribute {number} [progress=0] - Controls the progress while in a determinate state. Accepts values from `0` to `1`.
 * @attribute {number} [buffer=1] - Controls the buffer progress while in a determinate state. Accepts values from `0` to `1`.
 * @attribute {string} [theme=primary] - Sets the theme.
 *
 * @cssproperty --forge-linear-progress-height - The height of the element.
 * @cssproperty --forge-linear-progress-track-color - The background color of the indicator.
 * @cssproperty --forge-linear-progress-track-shape - The shape of the indicator.
 * @cssproperty --forge-linear-progress-indicator-color - The color of the indicator.
 * @cssproperty --forge-linear-progress-indicator-height - The height of the indicator only.
 * @cssproperty --forge-linear-progress-determinate-duration - The duration of the determinate animation.
 * @cssproperty --forge-linear-progress-indeterminate-duration - The duration of the indeterminate animation.
 * @cssproperty --forge-linear-progress-determinate-easing - The easing function to use for the determinate animation.
 * @cssproperty --forge-linear-progress-theme-transition-duration - The duration of the theme transition.
 * @cssproperty --forge-linear-progress-theme-transition-timing - The easing function to use for the theme transition.
 *
 * @csspart progressbar - Styles the progress bar container element
 */
@customElement({
  name: LINEAR_PROGRESS_CONSTANTS.elementName
})
export class LinearProgressComponent extends WithElementInternals(WithDefaultAria(BaseComponent)) implements ILinearProgressComponent {
  public static get observedAttributes(): string[] {
    return Object.values(LINEAR_PROGRESS_CONSTANTS.observedAttributes);
  }

  private _core: LinearProgressCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new LinearProgressCore(new LinearProgressAdapter(this));
  }

  public connectedCallback(): void {
    this._core.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case LINEAR_PROGRESS_CONSTANTS.observedAttributes.DETERMINATE:
        this.determinate = coerceBoolean(newValue);
        break;
      case LINEAR_PROGRESS_CONSTANTS.observedAttributes.PROGRESS:
        this.progress = coerceNumber(newValue);
        break;
      case LINEAR_PROGRESS_CONSTANTS.observedAttributes.BUFFER:
        this.buffer = coerceNumber(newValue);
        break;
      case LINEAR_PROGRESS_CONSTANTS.observedAttributes.THEME:
        this.theme = newValue as LinearProgressTheme;
        break;
    }
  }

  @coreProperty()
  public declare determinate: boolean;

  @coreProperty()
  public declare progress: number;

  @coreProperty()
  public declare buffer: number;

  @coreProperty()
  public declare theme: LinearProgressTheme;
}
