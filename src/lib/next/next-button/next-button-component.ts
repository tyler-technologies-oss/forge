import { attachShadowTemplate, coerceBoolean, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { RippleComponent } from '@tylertech/forge/ripple';
import { NEXT_BASE_BUTTON_CONSTANTS, NextButtonType } from '../core/button/base-button-constants';
import { INextBaseButtonElement, NextBaseButtonElement } from '../core/button/base-button-element';
import { NextButtonAdapter } from './next-button-adapter';
import { NextButtonVariant, NEXT_BUTTON_CONSTANTS } from './next-button-constants';
import { INextButtonFoundation, NextButtonFoundation } from './next-button-foundation';

export interface INextButtonComponent extends INextBaseButtonElement {
  variant: NextButtonVariant;
  dense: boolean;
}

export abstract class NextButtonComponent extends NextBaseButtonElement implements INextButtonComponent {
  /** Controls the button decoration variant. */
  @FoundationProperty() public variant: NextButtonVariant;

  /** Controls the dense state. */
  @FoundationProperty() public dense: boolean;

  protected abstract _foundation: INextButtonFoundation;
}

