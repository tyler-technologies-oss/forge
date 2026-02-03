import { isDefined } from '@tylertech/forge-core';

import { IViewSwitcherAdapter } from './view-switcher-adapter';
import { VIEW_SWITCHER_CONSTANTS, ViewAnimationDirection, ViewSwitcherAnimation } from './view-switcher-constants';

export interface IViewSwitcherCore {
  index: number;
  animationType: ViewSwitcherAnimation;
  next(): void;
  previous(): void;
  goToStart(): void;
  goToEnd(): void;
}

export class ViewSwitcherCore implements IViewSwitcherCore {
  private _viewCount = 0;
  private _viewIndex = 0;
  private _animationType: ViewSwitcherAnimation = 'none';
  private _viewsChangedListener: () => void;

  constructor(private _adapter: IViewSwitcherAdapter) {
    this._viewsChangedListener = () => this._onViewsChanged();
  }

  public initialize(): void {
    this._viewCount = this._adapter.getViewCount();
    this._adapter.startViewObserver(this._viewsChangedListener);
    this._adapter.setAnimationType(this._animationType);

    if (this._viewCount) {
      this._initializeAnimationType();
    }
  }

  public destroy(): void {
    this._adapter.stopViewObserver();
  }

  private _initializeAnimationType(): void {
    switch (this._animationType) {
      case 'slide':
        this._adapter.initializeSlideViews(this._viewIndex);
        break;
      case 'fade':
        this._adapter.initializeFadeViews(this._viewIndex);
        break;
      case 'none':
      default:
        this._adapter.hideInactiveViews(this._viewIndex);
        break;
    }
  }

  private _onViewsChanged(): void {
    this._viewCount = this._adapter.getViewCount();

    if (this._viewCount === 0) {
      this._viewIndex = 0;
    }

    if (this._viewCount) {
      this._initializeAnimationType();
    }

    // If the view index is higher than the number of views then we need to reset it
    if (this._viewCount > 0 && this._viewIndex >= this._viewCount) {
      const currIndex = this._viewIndex;
      this._viewIndex = this._viewCount > 0 ? this._viewCount - 1 : 0;
      this._goToView(currIndex, this._viewCount);
    }
  }

  private async _goToView(fromIndex: number, viewCount?: number): Promise<void> {
    this._viewCount = !isDefined(viewCount) ? this._adapter.getViewCount() : (viewCount as number);

    // If the index that we're trying to transition to is out of range, or is the same index, then we ignore the transition
    const isValidIndex = this._viewIndex >= 0 && this._viewIndex <= this._viewCount - 1;
    if (!isValidIndex || fromIndex === this._clampedViewIndex(this._viewIndex, this._viewCount)) {
      return;
    }

    switch (this._animationType) {
      case 'slide': {
        const animationDirection = this._viewIndex > fromIndex ? ViewAnimationDirection.Left : ViewAnimationDirection.Right;
        await this._adapter.transitionToView(fromIndex, this._viewIndex, 'slide', animationDirection);
        this._adapter.initializeSlideViews(this._viewIndex);
        break;
      }
      case 'fade':
        await this._adapter.transitionToView(fromIndex, this._viewIndex, 'fade');
        this._adapter.initializeFadeViews(this._viewIndex);
        break;
      case 'none':
      default:
        this._adapter.setActiveView(this._viewIndex);
        break;
    }
  }

  private _clampedViewIndex(viewIndex: number, viewCount: number): number {
    if (viewIndex < 0) {
      viewIndex = 0;
    } else if (viewIndex > viewCount - 1) {
      viewIndex = viewCount > 0 ? viewCount - 1 : 0;
    }
    return viewIndex;
  }

  public next(): void {
    this.index++;
  }

  public previous(): void {
    this.index--;
  }

  public goToStart(): void {
    this.index = 0;
  }

  public goToEnd(): void {
    this.index = this._viewCount - 1;
  }

  public get index(): number {
    return this._viewIndex;
  }
  public set index(value: number) {
    if (this._viewIndex !== value) {
      const currIndex = this._viewIndex;
      this._viewIndex = value;
      this._goToView(currIndex);
      this._adapter.setHostAttribute(VIEW_SWITCHER_CONSTANTS.attributes.INDEX, this._viewIndex.toString());
    }
  }

  public get animationType(): ViewSwitcherAnimation {
    return this._animationType;
  }
  public set animationType(value: ViewSwitcherAnimation) {
    if (this._animationType !== value) {
      this._animationType = value;
      this._initializeAnimationType();
      this._adapter.setAnimationType(this._animationType);
      this._adapter.setHostAttribute(VIEW_SWITCHER_CONSTANTS.attributes.ANIMATION_TYPE, this._animationType);
    }
  }
}
