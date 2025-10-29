import { tryDefine } from '@tylertech/forge-core';
import { LABEL_VALUE_TAG_NAME, LabelValueComponent } from './label-value';

export * from './label-value-component-delegate';
export * from './label-value-constants';
export * from './label-value';

export function defineLabelValueComponent(): void {
  tryDefine(LABEL_VALUE_TAG_NAME, LabelValueComponent);
}
