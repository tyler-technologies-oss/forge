import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,t as n}from"./lit-html-SpIZ5SkX.js";import{T as r,_ as i,g as a}from"./iframe-BbUsXXnT.js";import{t as o}from"./decorate-2OK4V6AF.js";import{d as s,l as c,o as l,p as u,t as d}from"./decorators-Ci1onliJ.js";import{t as f}from"./tooltip2-DY1gJCOv.js";import{n as p}from"./when-Daf2bbVy.js";import{r as m}from"./dom-C1zFLlWW.js";import{t as h}from"./ai-context-items-Cj3LvAcs.js";import{t as g}from"./ai-slash-command-menu2-DNrHDmJ3.js";var _;function v(){return(v=e((()=>{_=`/**
 * @license
 * Copyright Tyler Technologies, Inc.
 * License: Apache-2.0
 */
.forge-card {
  --_card-background:var(--forge-card-background, var(--forge-theme-surface, #ffffff));
  --_card-height:var(--forge-card-height, 100%);
  --_card-width:var(--forge-card-width, 100%);
  --_card-outline-color:var(--forge-card-outline-color, var(--forge-theme-outline, #e0e0e0));
  --_card-outline-width:var(--forge-card-outline-width, var(--forge-border-thin, 1px));
  --_card-outline-style:var(--forge-card-outline-style, solid);
  --_card-elevation:var(--forge-card-elevation, none);
  --_card-padding:var(--forge-card-padding, var(--forge-spacing-medium, 16px));
  --_card-shape:var(--forge-card-shape, calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1)));
  --_card-overflow:var(--forge-card-overflow, initial);
  --_card-raised-elevation:var(--forge-card-raised-elevation, 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12));
  --_card-raised-outline-width:var(--forge-card-raised-outline-width, 0);
  --_card-height:var(--forge-card-height, auto);
  --_card-width:var(--forge-card-width, auto);
}

.forge-card {
  background: var(--_card-background);
  border-color: var(--_card-outline-color);
  border-width: var(--_card-outline-width);
  border-style: var(--_card-outline-style);
  border-radius: var(--_card-shape);
  box-shadow: var(--_card-elevation);
  box-sizing: border-box;
  padding: var(--_card-padding);
  overflow: var(--_card-overflow);
  height: var(--_card-height);
  width: var(--_card-width);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.forge-card--raised {
  --_card-elevation:var(--_card-raised-elevation);
  --_card-outline-width:var(--_card-raised-outline-width);
}

/**
 * @license
 * Copyright Tyler Technologies, Inc.
 * License: Apache-2.0
 */
@keyframes float-in-label-animation {
  from {
    translate: 0;
    opacity: 40%;
  }
  to {
    translate: var(--_field-floating-label-translation);
    opacity: 100%;
  }
}
@keyframes float-out-label-animation {
  from {
    translate: var(--_field-floating-label-translation);
    opacity: 40%;
  }
  to {
    translate: 0;
    opacity: 100%;
  }
}
@keyframes multiline-inset-label-background-animation {
  from {
    opacity: 0%;
  }
  to {
    opacity: 100%;
  }
}
@layer base, textarea, density, invalid, disabled;
@layer base {
  .forge-field {
    --_field-shape:var(--forge-field-shape, calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1)));
    --_field-outline-style:var(--forge-field-outline-style, solid);
    --_field-outline-width:var(--forge-field-outline-width, var(--forge-border-thin, 1px));
    --_field-height:var(--forge-field-height, 40px);
    --_field-inset-height:var(--forge-field-inset-height, 48px);
    --_field-background:var(--forge-field-background, transparent);
    --_field-padding-inline:var(--forge-field-padding-inline, 12px);
    --_field-disabled-background:var(--forge-field-disabled-background, var(--forge-theme-surface-container-low, #ebebeb));
    --_field-disabled-opacity:var(--forge-field-disabled-opacity, 0.38);
    --_field-placeholder-color:var(--forge-field-placeholder-color, var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6)));
  }
  .forge-field {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--forge-spacing-xsmall, 8px);
    box-shadow: var(--_field-elevation);
    padding-inline: var(--_field-padding-inline);
    border-radius: var(--_field-shape);
    outline-style: var(--_field-outline-style);
    outline-width: var(--_field-outline-width);
    outline-color: var(--forge-theme-outline-low, #9e9e9e);
    outline-offset: calc(var(--_field-outline-width) * -1);
    background: var(--_field-background);
    opacity: var(--_field-disableable-opacity);
    cursor: var(--_field-disableable-cursor);
  }
  .forge-field:hover:not(:has(:where(input, textarea, select, .forge-field__input):disabled)) {
    outline-color: var(--forge-theme-outline-high, #212121);
  }
  .forge-field :where(input, textarea, select, .forge-field__input) {
    box-sizing: border-box;
    margin: 0;
    outline: none;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    padding-block: 0;
    padding-inline: 0;
    inline-size: 100%;
    block-size: 100%;
    color: inherit;
    font: inherit;
    font-size: var(--_field-font-size);
    text-overflow: ellipsis;
    padding-block-start: 0;
    padding-block-end: 0;
    transition: padding-block var(--_field-floating-animation-duration) var(--_field-floating-animation-timing);
    display: flex;
    block-size: var(--_field-height);
    inline-size: 100%;
    overflow: hidden;
    color: var(--forge-theme-text-high, rgba(0, 0, 0, 0.87));
    background: rgba(0, 0, 0, 0);
    appearance: none;
  }
  .forge-field :where(input, textarea, select, .forge-field__input)::placeholder {
    color: var(--_field-placeholder-color);
  }
  .forge-field--plain {
    --_field-multiline-inset-label-background:var(--forge-field-multiline-inset-label-background, var(--forge-theme-surface, #ffffff));
    --_field-multiline-inset-label-background-hover:var(--forge-field-multiline-inset-label-background-hover, var(--forge-theme-surface, #ffffff));
    --_field-outline-color:var(--forge-field-outline-color, transparent);
    --_field-outline-color-hover:var(--forge-field-outline-color-hover, transparent);
    --_field-inner-border-display:var(--forge-field-inner-border-display, none);
    --_field-padding-inline:var(--forge-field-padding-inline, 0);
    --_field-surface-display:var(--forge-field-surface-display, none);
    outline-width: 0;
  }
  .forge-field--tonal {
    --_field-outline-color:var(--forge-field-outline-color, transparent);
    --_field-outline-color-hover:var(--forge-field-outline-color-hover, transparent);
    --_field-inner-border-block-size:var(--forge-field-inner-border-block-size, calc(100% - 8px));
    --_field-background:var(--_field-tonal-background);
    --_field-multiline-inset-label-background:var(--forge-field-multiline-inset-label-background, var(--_field-background));
    --_field-hover-background:var(--forge-field-hover-background, tonal-background-hover);
    --_field-multiline-inset-label-background:var(--forge-field-multiline-inset-label-background, var(--_field-multiline-inset-label-tonal-background));
    outline-width: 0;
    background: var(--forge-theme-primary-container-low, #e8eaf6);
  }
  .forge-field--tonal:hover:not(:has(:where(input, textarea, select, .forge-field__input):disabled)) {
    background: var(--forge-theme-surface-container-minimum, #f5f5f5);
  }
  .forge-field--filled {
    --_field-background:var(--_field-filled-background);
    --_field-multiline-inset-label-background:var(--forge-field-multiline-inset-label-background, var(--_field-background));
    background: var(--forge-theme-surface-bright, #ffffff);
  }
  .forge-field--raised {
    --_field-elevation:var(--forge-field-elevation, 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12));
    --_field-elevation-active:var(--forge-field-elevation-active, 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12));
    --_field-outline-color:var(--forge-field-outline-color, transparent);
    --_field-outline-color-hover:var(--forge-field-outline-color-hover, transparent);
    --_field-inner-border-block-size:var(--forge-field-inner-border-block-size, calc(100% - 8px));
    --_field-background:var(--_field-filled-background);
    --_field-multiline-inset-label-background:var(--forge-field-multiline-inset-label-background, var(--_field-background));
    outline-width: 0;
  }
  .forge-field--raised:hover:not(:has(:where(input, textarea, select, .forge-field__input):disabled)) {
    box-shadow: var(--_field-elevation-active);
  }
  .forge-field--rounded {
    --_field-shape:var(--forge-field-shape, calc(var(--forge-shape-full, 9999px) * var(--forge-shape-factor, 1)));
    --_field-padding-inline:var(--forge-field-padding-inline, var(--_field-rounded-container-padding-inline-start));
  }
  .forge-field:has(label) {
    --_field-floating-label-translation:var(--forge-field-floating-label-translation, 0 calc(calc(calc(max(var(--forge-typography-body2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.375))), var(--forge-typography-label2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-line-height-scale, 1.25)))) / 2) + calc((var(--_field-height) - 56px) / 8)) * -1));
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 0;
    block-size: var(--_field-height);
    --_field-height:var(--forge-field-height, 48px);
  }
  .forge-field:has(label) label {
    position: absolute;
    grid-column: 2;
    pointer-events: none;
    color: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
  }
  .forge-field:has(label).forge-field--rounded {
    padding-inline: var(--forge-spacing-large, 24px);
  }
  @keyframes forge-field-float-label-in {
    from {
      transform: translateY(15%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .forge-field:has(label).forge-field--float-label-in label {
    animation: forge-field-float-label-in var(--forge-animation-duration-short4, 200ms) var(--forge-animation-easing-accelerate, cubic-bezier(0.3, 0, 1, 1)) forwards;
  }
  @keyframes forge-field-float-label-out {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .forge-field:has(label).forge-field--float-label-out label {
    animation: forge-field-float-label-out var(--forge-animation-duration-short4, 200ms) var(--forge-animation-easing-accelerate, cubic-bezier(0.3, 0, 1, 1)) forwards;
  }
  .forge-field:has(label).forge-field--float-label label, .forge-field:has(label):has(:where(:where(input, textarea, select, .forge-field__input):autofill, :where(input, textarea, select, .forge-field__input):placeholder-shown)) label {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: var(--forge-typography-label2-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
    font-size: var(--forge-typography-label2-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-font-size-scale, 0.8125)));
    font-weight: var(--forge-typography-label2-font-weight, 400);
    line-height: var(--forge-typography-label2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-line-height-scale, 1.25)));
    letter-spacing: var(--forge-typography-label2-letter-spacing, 0.0096153846em);
    text-transform: var(--forge-typography-label2-text-transform, inherit);
    text-decoration: var(--forge-typography-label2-text-decoration, inherit);
    translate: var(--_field-floating-label-translation);
  }
  .forge-field:has(label).forge-field--float-label:not(.forge-field--extra-small) :where(input, textarea, select, .forge-field__input), .forge-field:has(label):has(:where(:where(input, textarea, select, .forge-field__input):autofill, :where(input, textarea, select, .forge-field__input):placeholder-shown)):not(.forge-field--extra-small) :where(input, textarea, select, .forge-field__input) {
    padding-block-start: calc((max(var(--forge-typography-body2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.375))), var(--forge-typography-label2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-line-height-scale, 1.25)))) / 2 + (var(--_field-height) - 56px) / 8) * 2) !important;
  }
  .forge-field:has(label) :where(input, textarea, select, .forge-field__input) {
    grid-column: 2;
    block-size: var(--_field-height);
  }
  .forge-field:has(label) :where(input, textarea, select, .forge-field__input) ~ * {
    grid-column: 3;
    margin-inline-start: var(--forge-spacing-xsmall, 8px);
  }
  .forge-field:has(label) > :not(:where(input, textarea, select, .forge-field__input) ~ *, :where(input, textarea, select, .forge-field__input), label) {
    grid-column: 1;
    margin-inline-end: var(--forge-spacing-xsmall, 8px);
  }
  @keyframes forge-focus-indicator-outward-grow {
    from {
      outline-width: 0;
    }
    to {
      outline-width: var(--_focus-indicator-active-width);
    }
  }
  @keyframes forge-focus-indicator-outward-shrink {
    from {
      outline-width: var(--_focus-indicator-active-width);
    }
  }
  @keyframes forge-focus-indicator-inward-grow {
    from {
      border-width: 0;
    }
    to {
      border-width: var(--_focus-indicator-active-width);
    }
  }
  @keyframes forge-focus-indicator-inward-shrink {
    from {
      border-width: var(--_focus-indicator-active-width);
    }
  }
  .forge-field:has(:where(input, textarea, select, .forge-field__input):focus) {
    outline: none;
  }
  .forge-field:has(:where(input, textarea, select, .forge-field__input):focus)::after {
    --_focus-indicator-display:var(--forge-focus-indicator-display, flex);
    --_focus-indicator-width:var(--forge-focus-indicator-width, var(--forge-border-medium, 2px));
    --_focus-indicator-active-width:var(--forge-focus-indicator-active-width, 6px);
    --_focus-indicator-color:var(--forge-focus-indicator-color, var(--forge-theme-primary, #3f51b5));
    --_focus-indicator-shape:var(--forge-focus-indicator-shape, calc(var(--forge-shape-extra-small, 1px) * var(--forge-shape-factor, 1)));
    --_focus-indicator-duration:var(--forge-focus-indicator-duration, var(--forge-animation-duration-long4, 600ms));
    --_focus-indicator-easing:var(--forge-focus-indicator-easing, var(--forge-animation-easing-emphasized, cubic-bezier(0.2, 0, 0, 1)));
    --_focus-indicator-shape-start-start:var(--forge-focus-indicator-shape-start-start, var(--_focus-indicator-shape));
    --_focus-indicator-shape-start-end:var(--forge-focus-indicator-shape-start-end, var(--_focus-indicator-shape));
    --_focus-indicator-shape-end-end:var(--forge-focus-indicator-shape-end-end, var(--_focus-indicator-shape));
    --_focus-indicator-shape-end-start:var(--forge-focus-indicator-shape-end-start, var(--_focus-indicator-shape));
    --_focus-indicator-outward-offset:var(--forge-focus-indicator-outward-offset, var(--forge-spacing-xxsmall, 4px));
    --_focus-indicator-inward-offset:var(--forge-focus-indicator-inward-offset, 0px);
    --_focus-indicator-offset-block:var(--forge-focus-indicator-offset-block, 0);
    --_focus-indicator-offset-inline:var(--forge-focus-indicator-offset-inline, 0);
    animation-delay: 0s, calc(var(--_focus-indicator-duration) * 0.25);
    animation-duration: calc(var(--_focus-indicator-duration) * 0.25), calc(var(--_focus-indicator-duration) * 0.75);
    animation-timing-function: var(--_focus-indicator-easing);
    box-sizing: border-box;
    color: var(--_focus-indicator-color);
    display: none;
    pointer-events: none;
    position: absolute;
    margin-block: var(--_focus-indicator-offset-block);
    margin-inline: var(--_focus-indicator-offset-inline);
    animation-name: forge-focus-indicator-outward-grow, forge-focus-indicator-outward-shrink;
    border-end-end-radius: calc(var(--_focus-indicator-shape-end-end) + var(--_focus-indicator-outward-offset));
    border-end-start-radius: calc(var(--_focus-indicator-shape-end-start) + var(--_focus-indicator-outward-offset));
    border-start-end-radius: calc(var(--_focus-indicator-shape-start-end) + var(--_focus-indicator-outward-offset));
    border-start-start-radius: calc(var(--_focus-indicator-shape-start-start) + var(--_focus-indicator-outward-offset));
    inset: calc(-1 * var(--_focus-indicator-outward-offset));
    outline: var(--_focus-indicator-width) solid currentColor;
    content: "";
    display: block;
    border-radius: inherit;
  }
  .forge-field:has(:where(input, textarea, select, .forge-field__input):focus) {
    --forge-focus-indicator-color: var(--forge-theme-primary, #3f51b5);
    --forge-focus-indicator-outward-offset: 0px;
  }
}
@layer textarea {
  .forge-field:has(textarea:only-child) {
    padding-inline: 0;
  }
  .forge-field:has(textarea:only-child) textarea {
    padding-inline: var(--_field-padding-inline);
  }
  .forge-field:has(textarea) {
    align-items: start;
    block-size: fit-content;
  }
  .forge-field:has(textarea) textarea {
    padding-block-start: calc((var(--_field-height) - var(--forge-typography-body2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.375)))) / 2);
    padding-block-end: calc(max(var(--forge-typography-body2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.375))), var(--forge-typography-label2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-line-height-scale, 1.25)))) / 2 + (var(--_field-height) - 56px) / 8 + (var(--_field-height) - var(--forge-typography-body2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.375)))) / 2);
    resize: vertical;
    block-size: fit-content;
  }
  .forge-field:has(textarea) *:not(textarea) {
    margin-block-start: var(--forge-spacing-xsmall, 8px);
  }
}
@layer density {
  .forge-field--dense, .forge-field--extra-small {
    --_field-height:var(--forge-field-height, 24px);
    --_field-padding-inline-start:var(--forge-field-padding-inline-start, 8px);
    --_field-padding-inline-end:var(--forge-field-padding-inline-end, 4px);
  }
  .forge-field--dense:has(label) label, .forge-field--extra-small:has(label) label {
    display: none;
  }
  .forge-field--small {
    --_field-height:var(--forge-field-height, 32px);
  }
  .forge-field--small:has(label) {
    --_field-height:var(--forge-field-height, 40px);
  }
  .forge-field--large {
    --_field-height:var(--forge-field-height, 48px);
  }
  .forge-field--large:has(label) {
    --_field-height:var(--forge-field-height, 56px);
  }
  .forge-field--extra-large {
    --_field-height:var(--forge-field-height, 56px);
  }
  .forge-field--extra-large:has(label) {
    --_field-height:var(--forge-field-height, 64px);
  }
}
@layer disabled {
  .forge-field:has(:where(input, textarea, select, .forge-field__input):disabled) {
    --_field-background:var(--_field-disabled-background);
    --_field-disableable-cursor:var(--forge-field-disableable-cursor, not-allowed);
    --_field-disableable-opacity:var(--forge-field-disableable-opacity, var(--_field-disabled-opacity));
  }
  .forge-field:has(:where(input, textarea, select, .forge-field__input):disabled) :where(input, textarea, select, .forge-field__input):disabled {
    cursor: not-allowed;
  }
}
@layer invalid {
  .forge-field--invalid, .forge-field:has(:where(input, textarea, select, .forge-field__input):invalid) {
    outline-color: var(--forge-theme-error, #b00020);
  }
  .forge-field--invalid :not(:where(input, textarea, select, .forge-field__input)), .forge-field:has(:where(input, textarea, select, .forge-field__input):invalid) :not(:where(input, textarea, select, .forge-field__input)) {
    color: var(--forge-theme-on-error-container, #5f0011);
  }
  .forge-field--invalid.forge-field:has(:where(input, textarea, select, .forge-field__input):focus), .forge-field:has(:where(input, textarea, select, .forge-field__input):invalid).forge-field:has(:where(input, textarea, select, .forge-field__input):focus) {
    --forge-focus-indicator-color: var(--forge-theme-error, #b00020);
    --forge-focus-indicator-outward-offset: calc(var(--_field-outline-width) * -1);
  }
  .forge-field--invalid label, .forge-field:has(:where(input, textarea, select, .forge-field__input):invalid) label {
    color: var(--forge-theme-error, #b00020);
  }
  .forge-field--invalid.forge-field--tonal, .forge-field:has(:where(input, textarea, select, .forge-field__input):invalid).forge-field--tonal {
    background: var(--forge-theme-error-container-low, #f6e0e4);
  }
  .forge-field--invalid.forge-field--tonal:hover:not(:has(:where(input, textarea, select, .forge-field__input):disabled)), .forge-field:has(:where(input, textarea, select, .forge-field__input):invalid).forge-field--tonal:hover:not(:has(:where(input, textarea, select, .forge-field__input):disabled)) {
    background: var(--forge-theme-error-container-minimum, #fcf5f6);
  }
}
/**
 * @license
 * Copyright Tyler Technologies, Inc.
 * License: Apache-2.0
 */
.forge-divider {
  --_divider-color:var(--forge-divider-color, var(--forge-theme-outline, #e0e0e0));
  --_divider-width:var(--forge-divider-width, var(--forge-border-thin, 1px));
  --_divider-border-style:var(--forge-divider-border-style, solid);
  --_divider-margin:var(--forge-divider-margin, 0);
}

.forge-divider {
  display: block;
  margin: var(--_divider-margin);
  border: none;
  border-bottom-color: var(--_divider-color);
  border-bottom-width: var(--_divider-width);
  border-bottom-style: var(--_divider-border-style);
  height: 0;
}

/**
 * @license
 * Copyright Tyler Technologies, Inc.
 * License: Apache-2.0
 */
.forge-icon-button {
  --_icon-button-display:var(--forge-icon-button-display, inline-flex);
  --_icon-button-size:var(--forge-icon-button-size, 48px);
  --_icon-button-gap:var(--forge-icon-button-gap, 0);
  --_icon-button-icon-color:var(--forge-icon-button-icon-color, currentColor);
  --_icon-button-background-color:var(--forge-icon-button-background-color, none);
  --_icon-button-icon-size:var(--forge-icon-button-icon-size, calc(var(--forge-typography-font-size, 1rem) * 1.5));
  --_icon-button-cursor:var(--forge-icon-button-cursor, pointer);
  --_icon-button-padding:var(--forge-icon-button-padding, var(--forge-spacing-xxsmall, 4px));
  --_icon-button-border:var(--forge-icon-button-border, none);
  --_icon-button-shadow:var(--forge-icon-button-shadow, none);
  --_icon-button-transition-duration:var(--forge-icon-button-transition-duration, var(--forge-animation-duration-short3, 150ms));
  --_icon-button-transition-timing:var(--forge-icon-button-transition-timing, var(--forge-animation-easing-standard, cubic-bezier(0.2, 0, 0, 1)));
  --_icon-button-shape:var(--forge-icon-button-shape, calc(var(--forge-shape-full, 9999px) * var(--forge-shape-factor, 1)));
  --_icon-button-shape-start-start:var(--forge-icon-button-shape-start-start, var(--_icon-button-shape));
  --_icon-button-shape-start-end:var(--forge-icon-button-shape-start-end, var(--_icon-button-shape));
  --_icon-button-shape-end-start:var(--forge-icon-button-shape-end-start, var(--_icon-button-shape));
  --_icon-button-shape-end-end:var(--forge-icon-button-shape-end-end, var(--_icon-button-shape));
  --_icon-button-shape-squared:var(--forge-icon-button-shape-squared, calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1)));
  --_icon-button-outlined-border-width:var(--forge-icon-button-outlined-border-width, 1px);
  --_icon-button-outlined-border-style:var(--forge-icon-button-outlined-border-style, solid);
  --_icon-button-outlined-border-color:var(--forge-icon-button-outlined-border-color, var(--_icon-button-icon-color));
  --_icon-button-tonal-icon-color:var(--forge-icon-button-tonal-icon-color, var(--forge-theme-on-primary-container, #222c62));
  --_icon-button-tonal-background-color:var(--forge-icon-button-tonal-background-color, var(--forge-theme-primary-container, #d1d5ed));
  --_icon-button-filled-icon-color:var(--forge-icon-button-filled-icon-color, var(--forge-theme-on-primary, #ffffff));
  --_icon-button-filled-background-color:var(--forge-icon-button-filled-background-color, var(--forge-theme-primary, #3f51b5));
  --_icon-button-raised-shadow:var(--forge-icon-button-raised-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
  --_icon-button-raised-hover-shadow:var(--forge-icon-button-raised-hover-shadow, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12));
  --_icon-button-raised-active-shadow:var(--forge-icon-button-raised-active-shadow, 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12));
  --_icon-button-raised-disabled-shadow:var(--forge-icon-button-raised-disabled-shadow, none);
  --_icon-button-density-small-size:var(--forge-icon-button-density-small-size, 24px);
  --_icon-button-density-small-padding:var(--forge-icon-button-density-small-padding, var(--forge-spacing-xxxsmall, 2px));
  --_icon-button-density-small-icon-size:var(--forge-icon-button-density-small-icon-size, calc(var(--forge-typography-font-size, 1rem) * 1.125));
  --_icon-button-density-medium-size:var(--forge-icon-button-density-medium-size, 36px);
  --_icon-button-density-medium-padding:var(--forge-icon-button-density-medium-padding, var(--forge-spacing-xxsmall, 4px));
  --_icon-button-density-large-size:var(--forge-icon-button-density-large-size, var(--_icon-button-size));
  --_icon-button-toggle-on-background-color:var(--forge-icon-button-toggle-on-background-color, var(--forge-theme-primary-container, #d1d5ed));
  --_icon-button-toggle-on-icon-color:var(--forge-icon-button-toggle-on-icon-color, var(--forge-theme-primary, #3f51b5));
  --_icon-button-outlined-toggle-on-background-color:var(--forge-icon-button-outlined-toggle-on-background-color, var(--forge-theme-primary-container, #d1d5ed));
  --_icon-button-outlined-toggle-on-icon-color:var(--forge-icon-button-outlined-toggle-on-icon-color, var(--forge-theme-primary, #3f51b5));
  --_icon-button-tonal-toggle-background-color:var(--forge-icon-button-tonal-toggle-background-color, var(--forge-theme-surface-container-low, #ebebeb));
  --_icon-button-tonal-toggle-on-background-color:var(--forge-icon-button-tonal-toggle-on-background-color, var(--forge-theme-primary-container, #d1d5ed));
  --_icon-button-tonal-toggle-on-icon-color:var(--forge-icon-button-tonal-toggle-on-icon-color, var(--forge-theme-primary, #3f51b5));
  --_icon-button-filled-toggle-background-color:var(--forge-icon-button-filled-toggle-background-color, var(--forge-theme-surface-container-low, #ebebeb));
  --_icon-button-filled-toggle-icon-color:var(--forge-icon-button-filled-toggle-icon-color, var(--forge-theme-primary, #3f51b5));
  --_icon-button-filled-toggle-on-background-color:var(--forge-icon-button-filled-toggle-on-background-color, var(--forge-theme-primary, #3f51b5));
  --_icon-button-filled-toggle-on-icon-color:var(--forge-icon-button-filled-toggle-on-icon-color, var(--forge-theme-on-primary, #ffffff));
  --_icon-button-disabled-cursor:var(--forge-icon-button-disabled-cursor, not-allowed);
  --_icon-button-disabled-opacity:var(--forge-icon-button-disabled-opacity, 0.38);
  --_icon-button-popover-icon-padding:var(--forge-icon-button-popover-icon-padding, var(--forge-spacing-xsmall, 8px));
  --_icon-button-focus-indicator-color:var(--forge-icon-button-focus-indicator-color, var(--forge-theme-primary, #3f51b5));
}

.forge-icon-button {
  display: var(--_icon-button-display);
  position: relative;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  position: relative;
  z-index: 0;
  display: var(--_icon-button-display);
  align-items: center;
  justify-content: center;
  gap: var(--_icon-button-gap);
  box-sizing: border-box;
  height: var(--_icon-button-density-large-size);
  min-width: var(--_icon-button-density-large-size);
  border: var(--_icon-button-border);
  border-start-start-radius: var(--_icon-button-shape-start-start);
  border-start-end-radius: var(--_icon-button-shape-start-end);
  border-end-start-radius: var(--_icon-button-shape-end-start);
  border-end-end-radius: var(--_icon-button-shape-end-end);
  padding: var(--_icon-button-padding);
  box-shadow: var(--_icon-button-shadow);
  color: var(--_icon-button-icon-color);
  background: var(--_icon-button-background-color);
  font-size: var(--_icon-button-icon-size);
  cursor: var(--_icon-button-cursor);
  user-select: none;
  transition-property: box-shadow, background;
  transition-duration: var(--_icon-button-transition-duration);
  transition-timing-function: var(--_icon-button-transition-timing);
}

.forge-icon-button img, .forge-icon-button svg {
  height: var(--_icon-button-icon-size);
  width: var(--_icon-button-icon-size);
}

.forge-icon-button svg {
  fill: currentColor;
}

.forge-icon-button:not(:disabled) {
  --_state-layer-display:var(--forge-state-layer-display, flex);
  --_state-layer-color:var(--forge-state-layer-color, var(--forge-theme-on-surface, #000000));
  --_state-layer-hover-color:var(--forge-state-layer-hover-color, var(--_state-layer-color));
  --_state-layer-hover-opacity:var(--forge-state-layer-hover-opacity, 0.08);
  --_state-layer-pressed-color:var(--forge-state-layer-pressed-color, var(--_state-layer-color));
  --_state-layer-pressed-opacity:var(--forge-state-layer-pressed-opacity, 0.12);
  --_state-layer-hover-duration:var(--forge-state-layer-hover-duration, 15ms);
  --_state-layer-pressed-duration:var(--forge-state-layer-pressed-duration, 105ms);
  --_state-layer-animation-duration:var(--forge-state-layer-animation-duration, 375ms);
}

.forge-icon-button:not(:disabled)::before {
  opacity: 0;
  position: absolute;
  backface-visibility: hidden;
  transform: translateZ(0);
  background-color: var(--_state-layer-hover-color);
  inset: 0;
  transition: opacity var(--_state-layer-hover-duration) linear, background-color var(--_state-layer-hover-duration) linear;
  --_state-layer-hover-duration:var(--forge-state-layer-hover-duration, 100ms);
  content: "";
  opacity: 0;
  border-radius: inherit;
}

.forge-icon-button:not(:disabled):hover::before {
  background-color: var(--_state-layer-hover-color);
  opacity: var(--_state-layer-hover-opacity);
}

.forge-icon-button:not(:disabled):active::before {
  opacity: var(--_state-layer-pressed-opacity);
  transition-duration: var(--_state-layer-pressed-duration);
  --_state-layer-pressed-opacity:var(--forge-state-layer-pressed-opacity, 0.18);
}

.forge-icon-button:not(:disabled) {
  --forge-state-layer-color: var(--_icon-button-icon-color);
}

@keyframes forge-focus-indicator-outward-grow {
  from {
    outline-width: 0;
  }
  to {
    outline-width: var(--_focus-indicator-active-width);
  }
}
@keyframes forge-focus-indicator-outward-shrink {
  from {
    outline-width: var(--_focus-indicator-active-width);
  }
}
@keyframes forge-focus-indicator-inward-grow {
  from {
    border-width: 0;
  }
  to {
    border-width: var(--_focus-indicator-active-width);
  }
}
@keyframes forge-focus-indicator-inward-shrink {
  from {
    border-width: var(--_focus-indicator-active-width);
  }
}
.forge-icon-button:not(:disabled) {
  outline: none;
}

.forge-icon-button:not(:disabled):focus-visible::after {
  --_focus-indicator-display:var(--forge-focus-indicator-display, flex);
  --_focus-indicator-width:var(--forge-focus-indicator-width, var(--forge-border-medium, 2px));
  --_focus-indicator-active-width:var(--forge-focus-indicator-active-width, 6px);
  --_focus-indicator-color:var(--forge-focus-indicator-color, var(--forge-theme-primary, #3f51b5));
  --_focus-indicator-shape:var(--forge-focus-indicator-shape, calc(var(--forge-shape-extra-small, 1px) * var(--forge-shape-factor, 1)));
  --_focus-indicator-duration:var(--forge-focus-indicator-duration, var(--forge-animation-duration-long4, 600ms));
  --_focus-indicator-easing:var(--forge-focus-indicator-easing, var(--forge-animation-easing-emphasized, cubic-bezier(0.2, 0, 0, 1)));
  --_focus-indicator-shape-start-start:var(--forge-focus-indicator-shape-start-start, var(--_focus-indicator-shape));
  --_focus-indicator-shape-start-end:var(--forge-focus-indicator-shape-start-end, var(--_focus-indicator-shape));
  --_focus-indicator-shape-end-end:var(--forge-focus-indicator-shape-end-end, var(--_focus-indicator-shape));
  --_focus-indicator-shape-end-start:var(--forge-focus-indicator-shape-end-start, var(--_focus-indicator-shape));
  --_focus-indicator-outward-offset:var(--forge-focus-indicator-outward-offset, var(--forge-spacing-xxsmall, 4px));
  --_focus-indicator-inward-offset:var(--forge-focus-indicator-inward-offset, 0px);
  --_focus-indicator-offset-block:var(--forge-focus-indicator-offset-block, 0);
  --_focus-indicator-offset-inline:var(--forge-focus-indicator-offset-inline, 0);
}

.forge-icon-button:not(:disabled):focus-visible::after {
  animation-delay: 0s, calc(var(--_focus-indicator-duration) * 0.25);
  animation-duration: calc(var(--_focus-indicator-duration) * 0.25), calc(var(--_focus-indicator-duration) * 0.75);
  animation-timing-function: var(--_focus-indicator-easing);
  box-sizing: border-box;
  color: var(--_focus-indicator-color);
  display: none;
  pointer-events: none;
  position: absolute;
  margin-block: var(--_focus-indicator-offset-block);
  margin-inline: var(--_focus-indicator-offset-inline);
  animation-name: forge-focus-indicator-outward-grow, forge-focus-indicator-outward-shrink;
  border-end-end-radius: calc(var(--_focus-indicator-shape-end-end) + var(--_focus-indicator-outward-offset));
  border-end-start-radius: calc(var(--_focus-indicator-shape-end-start) + var(--_focus-indicator-outward-offset));
  border-start-end-radius: calc(var(--_focus-indicator-shape-start-end) + var(--_focus-indicator-outward-offset));
  border-start-start-radius: calc(var(--_focus-indicator-shape-start-start) + var(--_focus-indicator-outward-offset));
  inset: calc(-1 * var(--_focus-indicator-outward-offset));
  outline: var(--_focus-indicator-width) solid currentColor;
  content: "";
  display: block;
}

.forge-icon-button:not(:disabled) {
  --forge-focus-indicator-color: var(--_icon-button-focus-indicator-color);
  --forge-focus-indicator-shape: var(--_icon-button-shape);
}

.forge-icon-button:not(:disabled):where(.forge-icon-button--text, :not(:where(.forge-icon-button--outlined, .forge-icon-button--tonal, .forge-icon-button--filled, .forge-icon-button--raised))) {
  --forge-focus-indicator-outward-offset: 0px;
}

.forge-icon-button--outlined {
  border-width: var(--_icon-button-outlined-border-width);
  border-style: var(--_icon-button-outlined-border-style);
  border-color: var(--_icon-button-outlined-border-color);
}

.forge-icon-button--tonal {
  --_icon-button-icon-color:var(--_icon-button-tonal-icon-color);
  --_icon-button-background-color:var(--_icon-button-tonal-background-color);
}

.forge-icon-button--filled, .forge-icon-button--raised {
  --_icon-button-icon-color:var(--_icon-button-filled-icon-color);
  --_icon-button-background-color:var(--_icon-button-filled-background-color);
}

.forge-icon-button--raised {
  --_icon-button-shadow:var(--_icon-button-raised-shadow);
}

.forge-icon-button--raised:hover {
  --_icon-button-raised-shadow:var(--_icon-button-raised-hover-shadow);
}

.forge-icon-button--raised:active {
  --_icon-button-raised-shadow:var(--_icon-button-raised-active-shadow);
}

.forge-icon-button--squared {
  --_icon-button-shape:var(--_icon-button-shape-squared);
}

.forge-icon-button--small {
  --_icon-button-size:var(--_icon-button-density-small-size);
  --_icon-button-icon-size:var(--_icon-button-density-small-icon-size);
  --_icon-button-padding:var(--_icon-button-density-small-padding);
}

.forge-icon-button--small > * {
  font-size: var(--_icon-button-density-small-icon-size);
}

.forge-icon-button--medium {
  --_icon-button-size:var(--_icon-button-density-medium-size);
  --_icon-button-padding:var(--_icon-button-density-medium-padding);
}

.forge-icon-button:disabled {
  pointer-events: none;
  opacity: var(--_icon-button-disabled-opacity);
  pointer-events: auto;
  cursor: not-allowed;
}

.forge-icon-button forge-circular-progress {
  --forge-circular-progress-indicator-color: var(--_icon-button-icon-color);
  --forge-circular-progress-track-color: transparent;
  --forge-circular-progress-size: 1em;
}

:host {
  display: block;
}

.input-container .forge-card {
  --forge-card-padding: 0;
  --forge-card-shape: calc(var(--forge-shape-large, 8px) * var(--forge-shape-factor, 1));
  position: relative;
}
.input-container .forge-card:hover {
  --forge-card-outline-color: var(--forge-theme-outline-high, #212121);
}
.input-container .forge-field {
  --forge-theme-outline-low: transparent;
  --forge-field-height: auto;
  position: static;
  padding-inline-start: var(--forge-spacing-medium, 16px);
  min-height: 40px;
  align-items: center;
}
.input-container .forge-field:hover {
  outline: none;
}
.input-container .forge-field:has(textarea) *:not(textarea) {
  margin-block-start: initial;
}
.input-container .forge-field::after {
  border-radius: calc(var(--forge-shape-large, 8px) * var(--forge-shape-factor, 1));
}
.input-container textarea {
  field-sizing: content;
  resize: none;
  max-height: 150px;
  overflow-y: auto;
  outline: none;
  padding: var(--forge-spacing-small, 12px) 0;
}
.input-container textarea::-webkit-scrollbar {
  height: var(--forge-scrollbar-height, 16px);
  width: var(--forge-scrollbar-width, 16px);
}
.input-container textarea::-webkit-scrollbar-track {
  background-color: var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb));
}
.input-container textarea::-webkit-scrollbar-track:hover {
  background-color: var(--forge-scrollbar-track-container-hover, var(--forge-theme-surface-container-low, #ebebeb));
}
.input-container textarea::-webkit-scrollbar-corner {
  background-color: var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb));
}
.input-container textarea::-webkit-scrollbar-thumb {
  height: var(--forge-scrollbar-thumb-min-height, 32px);
  width: var(--forge-scrollbar-thumb-min-width, 32px);
  border-radius: var(--forge-scrollbar-border-radius, calc(var(--forge-shape-full, 9999px) * var(--forge-shape-factor, 1)));
  border-width: var(--forge-scrollbar-border-width, 3px);
  border-style: solid;
  border-color: transparent;
  background-color: var(--forge-scrollbar-thumb-container, var(--forge-theme-surface-container-medium, #c2c2c2));
  background-clip: content-box;
}
.input-container textarea::-webkit-scrollbar-thumb:hover {
  background-color: var(--forge-scrollbar-thumb-container-hover, var(--forge-theme-surface-container-high, #9e9e9e));
}
.input-container .debug-button {
  color: var(--forge-theme-on-error-container-low, #5f0011);
  --forge-icon-button-focus-indicator-color: var(--forge-theme-error, #b00020);
  --forge-icon-button-tonal-background-color: var(--forge-theme-error-container-low, #f6e0e4);
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--forge-spacing-xxsmall, 4px);
  padding-inline-start: var(--forge-spacing-xsmall, 8px);
  gap: var(--forge-spacing-xxsmall, 4px);
  overflow: visible;
}

.actions-start-container,
.actions-end-container {
  display: flex;
  align-items: center;
}

.send-button {
  margin-inline-end: var(--forge-spacing-xsmall, 8px);
}
.send-button svg {
  height: 18px;
  width: 18px;
}

:host(:state(stacked)) .vertical-divider {
  display: none;
}

:host(:state(inline)) .forge-field {
  --forge-field-height: 52px;
  padding-inline: var(--forge-spacing-xxsmall, 4px);
}
:host(:state(inline)) .actions {
  display: flex;
  align-items: center;
  overflow-x: visible;
  padding: var(--forge-spacing-xxsmall, 4px);
}
:host(:state(inline)) ::slotted([slot=actions]) {
  display: flex;
  align-items: center;
}
:host(:state(inline)) .vertical-divider {
  width: 1px;
  height: 32px;
  background-color: var(--forge-theme-outline, #e0e0e0);
  margin-inline-end: var(--forge-spacing-xsmall, 8px);
}
:host(:state(inline)) .forge-divider {
  display: none;
}
:host(:state(inline)) .send-button {
  margin-inline-end: var(--forge-spacing-xxsmall, 4px);
}`})))()}var y,b,x;function S(){return(S=e((()=>{f(),h(),v(),g(),a(),d(),y=50,b=`forge-ai-prompt`,x=class extends i{static{this.styles=r(_)}#e;#t;#n;#r;constructor(){super(),this.placeholder=`Ask a question...`,this.value=``,this.variant=`stacked`,this.sendDisabled=!1,this.autofocus=!1,this.inputDisabled=!1,this.cancelOnEscape=!0,this.running=!1,this.debugMode=!1,this.slashCommands=[],this.contextItems=[],this._slashMenuOpen=!1,this._slashMenuQuery=``,this.#t=[],this.#n=-1,this.#r=``,this.#p=t`<slot name="actions-start"></slot>`,this.#m=t`<slot name="actions-end"></slot>`,this.#e=this.attachInternals(),this.#i()}willUpdate(e){e.has(`variant`)&&this.#i()}firstUpdated(){this.autofocus&&this.focus()}#i(){m(this.#e,`inline`,this.variant===`inline`),m(this.#e,`stacked`,this.variant===`stacked`)}addToHistory(e){let t=e?.trim();t&&(this.#t[this.#t.length-1]===t||(this.#t.push(t),this.#t.length>y&&this.#t.shift()),this.#a())}setHistory(e){this.#t=e.map(e=>e?.trim()).filter(e=>e.length>0).slice(-50),this.#a()}getHistory(){return[...this.#t]}#a(){this.#n=-1,this.#r=``}#o(){let e=this._inputElement?.selectionStart??0;return!this.value.substring(0,e).includes(`
`)}#s(){let e=this._inputElement?.selectionStart??0;return!this.value.substring(e).includes(`
`)}#c(){return(this._inputElement?.selectionStart??0)===0}#l(){return(this._inputElement?.selectionStart??0)===this.value.length}#u(){this._inputElement?.setSelectionRange(0,0)}#d(){let e=this.value.length;this._inputElement?.setSelectionRange(e,e)}#f(e){if(this.#t.length===0||e>0&&this.#n===-1)return!1;if(e<0){if(this.#n===-1)this.#r=this.value,this.#n=this.#t.length-1;else if(this.#n>0)this.#n--;else return!1}else{let e=this.#n+1;if(e>=this.#t.length)return this.#n=-1,this.value=this.#r,this._inputElement&&(this._inputElement.value=this.#r),!0;this.#n=e}return this.value=this.#t[this.#n],this._inputElement&&(this._inputElement.value=this.#t[this.#n]),!0}#p;#m;get#h(){return this.running&&!this.value.trim()}get#g(){return t`
      <div class="actions">
        <div class="actions-start-container">${this.#p}</div>
        <div class="actions-end-container">${this.#m} ${this.#S}</div>
      </div>
      ${p(this.slashCommands.length,()=>t`<div class="vertical-divider"></div>`)}
    `}_handleSend(){if(this.sendDisabled||this.inputDisabled||!this.value.trim())return;let e=this.value,t=new Date,n=new CustomEvent(`forge-ai-prompt-send`,{detail:{value:e,time:t.toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`}),date:t},bubbles:!0,composed:!0,cancelable:!0});this.dispatchEvent(n),n.defaultPrevented||(this.addToHistory(e),this.value=``,this._slashMenuOpen=!1,this._slashMenuQuery=``)}_handleInput(e){this.value=e.target.value,this.#n!==-1&&(this.#r=this.value,this.#n=-1),this.slashCommands.length!==0&&(this.value===`/`?(this._slashMenuQuery=``,this._slashMenuOpen=!0):this.value.startsWith(`/`)&&this._slashMenuOpen?this._slashMenuQuery=this.value.slice(1):this._slashMenuOpen&&(this._slashMenuOpen=!1,this._slashMenuQuery=``))}_handleKeyDown(e){if(!(this._slashMenuOpen&&this._slashMenuElement&&this._slashMenuElement.handleKeyDown(e))){if(!(e.shiftKey||e.ctrlKey||e.metaKey)){if(e.key===`ArrowUp`&&this.#o()){if(this.#c()){if(this.#f(-1)){this.#u(),e.preventDefault();return}}else{this.#u(),e.preventDefault();return}}else if(e.key===`ArrowDown`&&this.#s()){if(this.#l()){if(this.#f(1)){e.preventDefault();return}}else{this.#d(),e.preventDefault();return}}}if(e.key===`Enter`&&!e.shiftKey){if(e.isComposing)return;if(e.preventDefault(),this._slashMenuOpen){this._slashMenuOpen=!1,this._slashMenuQuery=``,this._handleSend();return}this._slashMenuOpen||this._handleSend()}else e.key===`Escape`&&(this._slashMenuOpen?(e.preventDefault(),this._slashMenuOpen=!1,this._slashMenuQuery=``):this.cancelOnEscape&&(e.preventDefault(),this._handleEscape()))}}_handleStop(){let e=new CustomEvent(`forge-ai-prompt-stop`,{bubbles:!0,composed:!0,cancelable:!0});this.dispatchEvent(e)}_handleEscape(){let e=new CustomEvent(`forge-ai-prompt-cancel`,{bubbles:!0,composed:!0});this.dispatchEvent(e)}_handleDebugToggle(){let e=new CustomEvent(`forge-ai-prompt-debug-toggle`,{bubbles:!0,composed:!0});this.dispatchEvent(e)}_handlePaste(e){let t=Array.from(e.clipboardData?.files||[]);if(t.length>0){e.preventDefault();let n=new CustomEvent(`forge-ai-prompt-attachment`,{detail:{files:t},bubbles:!0,composed:!0});this.dispatchEvent(n)}}#_(e){let{command:t}=e.detail;this.dispatchEvent(new CustomEvent(`forge-ai-prompt-command`,{detail:{commandId:t.id,group:t.group,timestamp:new Date},bubbles:!0,composed:!0})),this.value=``,this._inputElement&&(this._inputElement.value=``),this._slashMenuOpen=!1,this._slashMenuQuery=``}#v(){this._slashMenuOpen=!1,this._slashMenuQuery=``}#y(e){this.dispatchEvent(new CustomEvent(`forge-ai-prompt-context-remove`,{detail:{id:e.detail.id,item:e.detail.item},bubbles:!0,composed:!0}))}get#b(){return this.contextItems.length===0?n:t`
      <forge-ai-context-items .items=${this.contextItems} @forge-ai-context-items-remove=${this.#y}> </forge-ai-context-items>
    `}get#x(){return t` <textarea
      id="chat-input"
      rows="1"
      .value=${this.value}
      placeholder=${this.placeholder}
      ?disabled=${this.inputDisabled}
      @input=${this._handleInput}
      @keydown=${this._handleKeyDown}
      @paste=${this._handlePaste}></textarea>`}get#S(){return t`
      <button
        id="send-btn"
        aria-label=${this.#h?`Stop`:`Send message`}
        class="forge-icon-button forge-icon-button--medium send-button"
        ?disabled=${this.sendDisabled||this.inputDisabled}
        @click=${this.#h?this._handleStop:this._handleSend}>
        ${this.#h?t`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 18H6V6h12z" />
            </svg>`:t`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
              <path d="m2 21 21-9L2 3v7l15 2-15 2z" />
            </svg>`}
        <forge-ai-tooltip for="send-btn" placement="top">${this.#h?`Stop`:`Send`}</forge-ai-tooltip>
      </button>
    `}get#C(){return t`
      <button
        id="debug-btn"
        aria-label="Exit debug mode"
        class="forge-icon-button forge-icon-button--small forge-icon-button--tonal ai-icon-button debug-button"
        @click=${this._handleDebugToggle}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M20 8h-2.81a5.985 5.985 0 0 0-1.82-1.96L17 4.41 15.59 3l-2.17 2.17a6.002 6.002 0 0 0-2.83 0L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z" />
        </svg>
        <forge-ai-tooltip for="debug-btn" placement="top">Exit debug mode</forge-ai-tooltip>
      </button>
    `}get#w(){return p(this.slashCommands.length,()=>t`
        <forge-ai-slash-command-menu
          .commands=${this.slashCommands}
          .filterQuery=${this._slashMenuQuery}
          .open=${this._slashMenuOpen}
          .anchor=${this._inputElement}
          .widthReference=${this}
          @forge-ai-slash-command-menu-select=${this.#_}
          @forge-ai-slash-command-menu-close=${this.#v}>
        </forge-ai-slash-command-menu>
      `)}closeSlashMenu(){this._slashMenuOpen=!1,this._slashMenuQuery=``}focus(){this._inputElement?.focus()}render(){return t`
      ${p(this.variant===`stacked`,()=>t`
          <div class="input-container">
            <div class="forge-card">
              ${this.#b}
              <div class="forge-field">${this.#x} ${p(this.debugMode,()=>t` ${this.#C} `)}</div>
              ${this.#g}
            </div>
          </div>
          ${this.#w}
        `)}
      ${p(this.variant===`inline`,()=>t`
          <div class="input-container">
            <div class="forge-card">
              ${this.#b}
              <div class="forge-field">
                ${this.#p} ${this.#x} ${p(this.debugMode,()=>t` ${this.#C} `)}
                <div class="actions-end-container">${this.#m} ${this.#S}</div>
              </div>
            </div>
          </div>
          ${this.#w}
        `)}
    `}},o([s()],x.prototype,`placeholder`,void 0),o([s()],x.prototype,`value`,void 0),o([s({type:String,attribute:`variant`})],x.prototype,`variant`,void 0),o([s({type:Boolean,attribute:`send-disabled`})],x.prototype,`sendDisabled`,void 0),o([s({type:Boolean})],x.prototype,`autofocus`,void 0),o([s({type:Boolean,attribute:`input-disabled`})],x.prototype,`inputDisabled`,void 0),o([s({type:Boolean,attribute:`cancel-on-escape`})],x.prototype,`cancelOnEscape`,void 0),o([s({type:Boolean})],x.prototype,`running`,void 0),o([s({type:Boolean,attribute:`debug-mode`})],x.prototype,`debugMode`,void 0),o([s({type:Array,attribute:!1})],x.prototype,`slashCommands`,void 0),o([s({attribute:!1})],x.prototype,`contextItems`,void 0),o([c()],x.prototype,`_slashMenuOpen`,void 0),o([c()],x.prototype,`_slashMenuQuery`,void 0),o([l(`#chat-input`)],x.prototype,`_inputElement`,void 0),o([l(`forge-ai-slash-command-menu`)],x.prototype,`_slashMenuElement`,void 0),x=o([u(b)],x)})))()}function C(){return(C=e((()=>{S()})))()}export{C as t};