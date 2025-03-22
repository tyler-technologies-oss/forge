import { tryDefine } from '@tylertech/forge-core';
import { CARD_TAG_NAME, CardComponent } from './card';

export * from './card-constants';
export * from './card';

export function defineCardComponent(): void {
  tryDefine(CARD_TAG_NAME, CardComponent);
}
