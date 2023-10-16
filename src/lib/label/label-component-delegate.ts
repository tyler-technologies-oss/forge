import { BaseComponentDelegate, IBaseComponentDelegateConfig, IBaseComponentDelegateOptions } from '../core';
import { ILabelComponent } from './label';
import { LABEL_CONSTANTS } from './label-constants';

export type LabelComponentDelegateProps = Partial<ILabelComponent>;
export interface ILabelComponentDelegateOptions extends IBaseComponentDelegateOptions {}
export interface ILabelComponentDelegateConfig extends IBaseComponentDelegateConfig<ILabelComponent, ILabelComponentDelegateOptions> {}

export class LabelComponentDelegate extends BaseComponentDelegate<ILabelComponent, ILabelComponentDelegateOptions> {
  constructor(config?: ILabelComponentDelegateConfig) {
    super(config);
  }

  protected _build(): ILabelComponent {
    const label = document.createElement(LABEL_CONSTANTS.elementName);
    return label;
  }
}
