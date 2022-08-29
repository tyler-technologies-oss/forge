import { MDCLinearProgress } from '@material/linear-progress';
import { CustomElement, coerceBoolean, coerceNumber, attachShadowTemplate, getShadowElement, toggleAttribute } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { LINEAR_PROGRESS_CONSTANTS } from './linear-progress-constants';

import template from './linear-progress.html';
import styles from './linear-progress.scss';

export interface ILinearProgressComponent extends IBaseComponent {
  determinate: boolean;
  progress: number;
  buffer: number;
  visible: boolean;
  open(): void;
  close(): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-linear-progress': ILinearProgressComponent;
  }
}

/**
 * The web component class behind the `<forge-linear-progress>` custom element.
 * 
 * @tag forge-linear-progress
 */
@CustomElement({
  name: LINEAR_PROGRESS_CONSTANTS.elementName
})
export class LinearProgressComponent extends BaseComponent implements ILinearProgressComponent {
  public static get observedAttributes(): string[] {
    return [
      LINEAR_PROGRESS_CONSTANTS.attributes.DETERMINATE,
      LINEAR_PROGRESS_CONSTANTS.attributes.PROGRESS,
      LINEAR_PROGRESS_CONSTANTS.attributes.BUFFER,
      LINEAR_PROGRESS_CONSTANTS.attributes.VISIBLE,
      LINEAR_PROGRESS_CONSTANTS.attributes.PROGRESSBAR_ARIA_LABEL
    ];
  }

  private _mdcLinearProgress: MDCLinearProgress;
  private _determinate = false;
  private _progress = 0;
  private _buffer = 0;
  private _visible = true;
  private _progressbarElement: HTMLElement;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._progressbarElement = getShadowElement(this, LINEAR_PROGRESS_CONSTANTS.selectors.ROOT);
  }

  public connectedCallback(): void {
    this._initialize();
  }

  public disconnectedCallback(): void {
    if (this._mdcLinearProgress) {
      this._mdcLinearProgress.destroy();
    }
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case LINEAR_PROGRESS_CONSTANTS.attributes.DETERMINATE:
        this.determinate = coerceBoolean(newValue);
        break;
      case LINEAR_PROGRESS_CONSTANTS.attributes.PROGRESS:
        this.progress = coerceNumber(newValue);
        break;
      case LINEAR_PROGRESS_CONSTANTS.attributes.BUFFER:
        this.buffer = coerceNumber(newValue);
        break;
      case LINEAR_PROGRESS_CONSTANTS.attributes.VISIBLE:
        this.visible = coerceBoolean(newValue);
        break;
      case LINEAR_PROGRESS_CONSTANTS.attributes.PROGRESSBAR_ARIA_LABEL:
        toggleAttribute(this._progressbarElement, !!newValue, 'aria-label', newValue);
        break;
    }
  }

  public set determinate(value: boolean) {
    if (this._determinate !== value) {
      this._determinate = value;
      
      if (this._mdcLinearProgress) {
        this._mdcLinearProgress.determinate = value;
      }

      this.setAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.DETERMINATE, value.toString());
    }
  }
  public get determinate(): boolean {
    return this._determinate;
  }

  public set progress(value: number) {
    if (this._progress !== value) {
      this._progress = value;

      if (this._mdcLinearProgress) {
        this._mdcLinearProgress.progress = value;
      }

      this.setAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.PROGRESS, value.toString());
    }
  }
  public get progress(): number {
    return this._progress;
  }

  public set buffer(value: number) {
    if (this._buffer !== value) {
      this._buffer = value;

      if (this._mdcLinearProgress) {
        this._mdcLinearProgress.buffer = value;
      }

      this.setAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.BUFFER, value.toString());
    }
  }
  public get buffer(): number {
    return this._buffer;
  }

  public get visible(): boolean {
    return this._visible;
  }
  public set visible(value: boolean) {
    if (this._visible !== value) {
      this._visible = value;
      this._applyVisibility(value);
    }
  }

  public open(): void {
    this._visible = true;
    if (this._mdcLinearProgress) {
      this._mdcLinearProgress.open();
    }
  }

  public close(): void {
    this._visible = false;
    if (this._mdcLinearProgress) {
      this._mdcLinearProgress.close();
    }
  }

  private _initialize(): void {
    const root = this.shadowRoot?.querySelector(LINEAR_PROGRESS_CONSTANTS.selectors.ROOT) as HTMLElement;
    this._mdcLinearProgress = new MDCLinearProgress(root);
    this._mdcLinearProgress.initialize();
    this._mdcLinearProgress.determinate = this._determinate;
    this._mdcLinearProgress.progress = this._progress;
    this._mdcLinearProgress.buffer = this._buffer;

    // We are visible by default so we only apply initial visibility if otherwise
    if (!this._visible) {
      this._applyVisibility(this._visible);
    }
  }

  private _applyVisibility(value: boolean): void {
    if (value) {
      this.open();
    } else {
      this.close();
    }
  }
}
