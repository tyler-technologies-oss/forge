import { CustomElement, attachShadowTemplate } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { SKELETON_CONSTANTS } from './skeleton-constants';

import template from './skeleton.html';
import styles from './skeleton.scss';

export interface ISkeletonComponent extends IBaseComponent {}

declare global {
  interface HTMLElementTagNameMap {
    'forge-skeleton': ISkeletonComponent;
  }
}

@CustomElement({
  name: SKELETON_CONSTANTS.elementName
})
export class SkeletonComponent extends BaseComponent implements ISkeletonComponent {
  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
  }
}
