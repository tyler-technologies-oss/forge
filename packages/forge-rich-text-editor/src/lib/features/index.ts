import { defineCustomElement } from '@tylertech/forge-core';

import { RteAlignComponent } from './rte-align.js';
import { RteBoldComponent } from './rte-bold.js';
import { RteBulletListComponent } from './rte-bullet-list.js';
import { RteCodeComponent } from './rte-code.js';
import { RteFeatureDividerComponent } from './rte-feature-divider.js';
import { RteHeadingComponent } from './rte-heading.js';
import { RteItalicComponent } from './rte-italic.js';
import { RteLinkComponent } from './rte-link.js';
import { RteOrderedListComponent } from './rte-ordered-list.js';
import { RteStandardToolsComponent } from './rte-standard-tools.js';
import { RteStrikeComponent } from './rte-strike.js';
import { RteToolButtonComponent } from './core/rte-tool-button.js';
import { RteUnderlineComponent } from './rte-underline.js';
import { RteUndoRedoComponent } from './rte-undo-redo.js';

export * from './rich-text-editor-feature.js';
export * from './core/rte-tool-button.js';
export * from './rte-bold.js';
export * from './rte-italic.js';
export * from './rte-underline.js';
export * from './rte-strike.js';
export * from './rte-code.js';
export * from './rte-bullet-list.js';
export * from './rte-ordered-list.js';
export * from './rte-undo-redo.js';
export * from './rte-feature-divider.js';
export * from './rte-heading.js';
export * from './rte-align.js';
export * from './rte-standard-tools.js';
export * from './rte-link.js';

export function defineRteAlignComponent(): void {
  defineCustomElement(RteAlignComponent);
}

export function defineRteBoldComponent(): void {
  defineCustomElement(RteBoldComponent);
}

export function defineRteBulletListComponent(): void {
  defineCustomElement(RteBulletListComponent);
}

export function defineRteCodeComponent(): void {
  defineCustomElement(RteCodeComponent);
}

export function defineRteFeatureDividerComponent(): void {
  defineCustomElement(RteFeatureDividerComponent);
}

export function defineRteHeadingComponent(): void {
  defineCustomElement(RteHeadingComponent);
}

export function defineRteItalicComponent(): void {
  defineCustomElement(RteItalicComponent);
}

export function defineRteLinkComponent(): void {
  defineCustomElement(RteLinkComponent);
}

export function defineRteOrderedListComponent(): void {
  defineCustomElement(RteOrderedListComponent);
}

export function defineRteStandardToolsComponent(): void {
  defineCustomElement(RteStandardToolsComponent);
}

export function defineRteStrikeComponent(): void {
  defineCustomElement(RteStrikeComponent);
}

export function defineRteToolButtonComponent(): void {
  defineCustomElement(RteToolButtonComponent);
}

export function defineRteUnderlineComponent(): void {
  defineCustomElement(RteUnderlineComponent);
}

export function defineRteUndoRedoComponent(): void {
  defineCustomElement(RteUndoRedoComponent);
}

/**
 * Registers every rich text editor feature component with the browser.
 */
export function defineRteFeatureComponents(): void {
  defineRteAlignComponent();
  defineRteBoldComponent();
  defineRteBulletListComponent();
  defineRteCodeComponent();
  defineRteFeatureDividerComponent();
  defineRteHeadingComponent();
  defineRteItalicComponent();
  defineRteLinkComponent();
  defineRteOrderedListComponent();
  defineRteStandardToolsComponent();
  defineRteStrikeComponent();
  defineRteToolButtonComponent();
  defineRteUnderlineComponent();
  defineRteUndoRedoComponent();
}
