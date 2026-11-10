import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{T as i,_ as a,g as o}from"./iframe-BbUsXXnT.js";import{t as s}from"./decorate-2OK4V6AF.js";import{d as c,l,o as u,p as d,t as f}from"./decorators-Ci1onliJ.js";import{n as p}from"./when-Daf2bbVy.js";import{t as m}from"./ai-icon2-DuX-CLU9.js";import{t as h}from"./ai-spinner2-3vV61SKj.js";import{t as g}from"./ai-modal2-gNN0mfE2.js";import{i as _,n as v,r as y,t as b}from"./infinite-scroll-controller-DtKS_IRe.js";import{t as x}from"./ai-error-message-B-OLhAZH.js";import{t as S}from"./ai-thread-actions-menu-DT2H7O27.js";import{t as C}from"./ai-edit-thread-CfImOYCV.js";var w;function T(){return(T=e((()=>{w=`/**
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
.forge-icon {
  --_icon-color:var(--forge-icon-color, currentColor);
  --_icon-size:var(--forge-icon-size, 1em);
  --_icon-width:var(--forge-icon-width, var(--_icon-size));
  --_icon-height:var(--forge-icon-height, var(--_icon-size));
  --_icon-font-size:var(--forge-icon-font-size, calc(var(--forge-typography-font-size, 1rem) * 1.5));
}

img.forge-icon, svg.forge-icon {
  display: inline-block;
  box-sizing: content-box;
  contain: content;
  font-size: var(--_icon-font-size);
  display: inline-block;
}

img.forge-icon {
  width: var(--_icon-width);
  height: var(--_icon-height);
}

svg {
  width: var(--_icon-width);
  height: var(--_icon-height);
  display: block;
  fill: var(--_icon-color);
  stroke: var(--_icon-color);
  stroke-width: 0;
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

/**
 * @license
 * Copyright Tyler Technologies, Inc.
 * License: Apache-2.0
 */
@layer list, list-item, navlist, with-start-end, two-line, three-line, dense, wrap, selected, indented, disabled, multicolumn;
@layer list {
  .forge-list {
    --_list-spacing:var(--forge-list-spacing, 0);
    --_list-container-color:var(--forge-list-container-color, transparent);
    --_list-column-width:var(--forge-list-column-width, 256px);
    --_list-column-spacing:var(--forge-list-column-spacing, var(--_list-spacing));
    --_list-navlist-spacing:var(--forge-list-navlist-spacing, var(--forge-spacing-xxsmall, 4px));
    --_list-navlist-margin:var(--forge-list-navlist-margin, var(--forge-spacing-xxsmall, 4px) var(--forge-spacing-xsmall, 8px));
    --_list-navlist-height:var(--forge-list-navlist-height, 40px);
    --_list-navlist-padding:var(--forge-list-navlist-padding, 0 var(--forge-spacing-xsmall, 8px));
    --_list-navlist-shape:var(--forge-list-navlist-shape, calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1)));
    --_list-navlist-font-size:var(--forge-list-navlist-font-size, calc(var(--forge-typography-font-size, 1rem) * 0.875));
    --_list-navlist-font-weight:var(--forge-list-navlist-font-weight, 500);
  }
  .forge-list {
    outline: none;
    background-color: var(--_list-container-color);
    margin: 0;
    border-radius: inherit;
    min-width: inherit;
  }
  .forge-list--dense .forge-list-item {
    --_list-item-gap:var(--_list-item-dense-gap);
    height: var(--_list-item-dense-one-line-height);
    min-height: var(--_list-item-dense-one-line-height);
  }
  .forge-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
@layer navlist {
  .forge-list--navlist {
    margin-block: var(--_list-navlist-spacing);
  }
  .forge-list--navlist .forge-list-item {
    --forge-list-item-height: var(--_list-navlist-height);
    --forge-list-item-margin: var(--_list-navlist-margin);
    --forge-list-item-padding: var(--_list-navlist-padding);
    --forge-list-item-shape: var(--_list-navlist-shape);
    --forge-list-item-text-font-size: var(--_list-navlist-font-size);
    --forge-list-item-text-font-weight: var(--_list-navlist-font-weight);
  }
}
@layer with-start-end {
  .forge-list-item:has(.forge-list-item__start, .forge-list-item__end) {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
  }
  .forge-list-item:has(.forge-list-item__start):not(:has(.forge-list-item__end)) {
    grid-template-columns: auto 1fr;
  }
  .forge-list-item:has(.forge-list-item__end):not(:has(.forge-list-item__start)) {
    grid-template-columns: 1fr auto;
  }
  .forge-list-item:has(.forge-list-item__start ~ .forge-list-item__end) {
    grid-template-columns: auto 1fr auto;
  }
  .forge-list-item__start, .forge-list-item__end {
    color: var(--_list-item-text-color);
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    fill: currentColor;
  }
}
@layer list-item {
  .forge-list-item {
    --_list-item-background:var(--forge-list-item-background, transparent);
    --_list-item-shape:var(--forge-list-item-shape, 0);
    --_list-item-padding:var(--forge-list-item-padding, 0 var(--forge-spacing-medium, 16px));
    --_list-item-margin:var(--forge-list-item-margin, 0);
    --_list-item-height:var(--forge-list-item-height, 48px);
    --_list-item-dense-height:var(--forge-list-item-dense-height, 32px);
    --_list-item-indent:var(--forge-list-item-indent, var(--forge-spacing-xxlarge, 48px));
    --_list-item-cursor:var(--forge-list-item-cursor, pointer);
    --_list-item-gap:var(--forge-list-item-gap, var(--forge-spacing-large, 24px));
    --_list-item-text-color:var(--forge-list-item-text-color, var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6)));
    --_list-item-text-font-size:var(--forge-list-item-text-font-size, var(--forge-typography-body2-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 1))));
    --_list-item-text-font-weight:var(--forge-list-item-text-font-weight, var(--forge-typography-body2-font-weight, 400));
    --_list-item-text-line-height:var(--forge-list-item-text-line-height, 1.5rem);
    --_list-item-selected-color:var(--forge-list-item-selected-color, var(--forge-theme-primary, #3f51b5));
    --_list-item-selected-background:var(--forge-list-item-selected-background, var(--_list-item-selected-color));
    --_list-item-selected-opacity:var(--forge-list-item-selected-opacity, 0.08);
    --_list-item-selected-start-color:var(--forge-list-item-selected-start-color, var(--_list-item-selected-color));
    --_list-item-selected-end-color:var(--forge-list-item-selected-end-color, var(--_list-item-selected-color));
    --_list-item-selected-text-color:var(--forge-list-item-selected-text-color, var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6)));
    --_list-item-disabled-opacity:var(--forge-list-item-disabled-opacity, 0.38);
    --_list-item-disabled-cursor:var(--forge-list-item-disabled-cursor, not-allowed);
    --_list-item-one-line-height:var(--forge-list-item-one-line-height, var(--_list-item-height));
    --_list-item-two-line-height:var(--forge-list-item-two-line-height, var(--forge-list-item-height, 72px));
    --_list-item-three-line-height:var(--forge-list-item-three-line-height, var(--forge-list-item-height, 88px));
    --_list-item-dense-one-line-height:var(--forge-list-item-dense-one-line-height, var(--_list-item-dense-height));
    --_list-item-dense-two-line-height:var(--forge-list-item-dense-two-line-height, var(--forge-list-item-dense-height, 56px));
    --_list-item-dense-three-line-height:var(--forge-list-item-dense-three-line-height, var(--forge-list-item-dense-height, 72px));
    --_list-item-dense-font-size:var(--forge-list-item-dense-font-size, 0.875rem);
    --_list-item-dense-indent:var(--forge-list-item-dense-indent, var(--forge-spacing-xxlarge, 48px));
    --_list-item-dense-gap:var(--forge-list-item-dense-gap, var(--forge-spacing-xsmall, 8px));
    --_list-item-start-selected-color:var(--forge-list-item-start-selected-color, var(--_list-item-selected-color));
    --_list-item-end-selected-color:var(--forge-list-item-end-selected-color, var(--_list-item-selected-color));
    --_list-item-wrap-padding:var(--forge-list-item-wrap-padding, var(--forge-spacing-xsmall, 8px) var(--forge-spacing-medium, 16px));
  }
  .forge-list-item {
    position: relative;
    display: flex;
    gap: var(--_list-item-gap);
    align-items: center;
    box-sizing: border-box;
    outline: none;
    text-decoration: none;
    border-radius: var(--_list-item-shape);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    background-color: var(--_list-item-background);
    height: var(--_list-item-height);
    min-height: var(--_list-item-height);
    padding: var(--_list-item-padding);
    margin: var(--_list-item-margin);
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: var(--forge-typography-body2-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
    letter-spacing: var(--forge-typography-body2-letter-spacing, 0.015625em);
    text-transform: var(--forge-typography-body2-text-transform, inherit);
    text-decoration: var(--forge-typography-body2-text-decoration, inherit);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
    isolation: isolate;
    font-size: var(--_list-item-text-font-size);
    font-weight: var(--_list-item-text-font-weight);
    line-height: var(--_list-item-text-line-height);
    flex: 1;
    contain: layout;
    display: block;
    align-content: center;
  }
  .forge-list-item button {
    appearance: none;
    cursor: var(--_list-item-cursor);
    border: none;
    padding-block: 0;
    padding-inline: 0;
    margin: 0;
    box-sizing: border-box;
    width: 100%;
    background: rgba(0, 0, 0, 0);
    color: inherit;
    outline: none;
    font: inherit;
    user-select: auto;
    text-align: inherit;
    letter-spacing: inherit;
    word-spacing: inherit;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;
  }
  .forge-list-item a {
    outline: none;
    color: inherit !important;
    text-decoration: none !important;
  }
  .forge-list-item--interactive:not(.forge-list-item--disabled), .forge-list-item button:not(:disabled), .forge-list-item a, .forge-list-item label {
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
  .forge-list-item--interactive:not(.forge-list-item--disabled)::before, .forge-list-item button:not(:disabled)::before, .forge-list-item a::before, .forge-list-item label::before {
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
  .forge-list-item--interactive:not(.forge-list-item--disabled):hover::before, .forge-list-item button:not(:disabled):hover::before, .forge-list-item a:hover::before, .forge-list-item label:hover::before {
    background-color: var(--_state-layer-hover-color);
    opacity: var(--_state-layer-hover-opacity);
  }
  .forge-list-item--interactive:not(.forge-list-item--disabled):active::before, .forge-list-item button:not(:disabled):active::before, .forge-list-item a:active::before, .forge-list-item label:active::before {
    opacity: var(--_state-layer-pressed-opacity);
    transition-duration: var(--_state-layer-pressed-duration);
    --_state-layer-pressed-opacity:var(--forge-state-layer-pressed-opacity, 0.18);
  }
  .forge-list-item :is(forge-checkbox, forge-radio, forge-switch, input):is(.forge-list-item__start, .forge-list-item__end):not([forge-ignore]) {
    --forge-focus-indicator-display: none;
    --forge-state-layer-display: none;
  }
  .forge-list-item:has(button:not(:disabled), a, label, .forge-list-item--interactive:not(.forge-list-item--disabled), :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled])) a, .forge-list-item:has(button:not(:disabled), a, label, .forge-list-item--interactive:not(.forge-list-item--disabled), :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled])) button, .forge-list-item:has(button:not(:disabled), a, label, .forge-list-item--interactive:not(.forge-list-item--disabled), :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled])) label, .forge-list-item:has(button:not(:disabled), a, label, .forge-list-item--interactive:not(.forge-list-item--disabled), :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled])) :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled]), .forge-list-item:has(button:not(:disabled), a, label, .forge-list-item--interactive:not(.forge-list-item--disabled), :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled])) .forge-list-item--interactive {
    cursor: pointer;
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
  .forge-list-item:has(button:not(:disabled), a, label, .forge-list-item--interactive:not(.forge-list-item--disabled), :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled])) a, .forge-list-item:has(button:not(:disabled), a, label, .forge-list-item--interactive:not(.forge-list-item--disabled), :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled])) button, .forge-list-item:has(button:not(:disabled), a, label, .forge-list-item--interactive:not(.forge-list-item--disabled), :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled])) label, .forge-list-item:has(button:not(:disabled), a, label, .forge-list-item--interactive:not(.forge-list-item--disabled), :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled])) :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled]), .forge-list-item:has(button:not(:disabled), a, label, .forge-list-item--interactive:not(.forge-list-item--disabled), :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled])) .forge-list-item--interactive {
    outline: none;
  }
  .forge-list-item:has(button:not(:disabled), a, label, .forge-list-item--interactive:not(.forge-list-item--disabled), :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled])) a:focus-visible::after, .forge-list-item:has(button:not(:disabled), a, label, .forge-list-item--interactive:not(.forge-list-item--disabled), :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled])) button:focus-visible::after, .forge-list-item:has(button:not(:disabled), a, label, .forge-list-item--interactive:not(.forge-list-item--disabled), :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled])) label:focus-visible::after, .forge-list-item:has(button:not(:disabled), a, label, .forge-list-item--interactive:not(.forge-list-item--disabled), :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled])) :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled]):focus-visible::after, .forge-list-item:has(button:not(:disabled), a, label, .forge-list-item--interactive:not(.forge-list-item--disabled), :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled])) .forge-list-item--interactive:focus-visible::after {
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
  .forge-list-item:has(button:not(:disabled), a, label, .forge-list-item--interactive:not(.forge-list-item--disabled), :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled])) a:focus-visible::after, .forge-list-item:has(button:not(:disabled), a, label, .forge-list-item--interactive:not(.forge-list-item--disabled), :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled])) button:focus-visible::after, .forge-list-item:has(button:not(:disabled), a, label, .forge-list-item--interactive:not(.forge-list-item--disabled), :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled])) label:focus-visible::after, .forge-list-item:has(button:not(:disabled), a, label, .forge-list-item--interactive:not(.forge-list-item--disabled), :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled])) :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled]):focus-visible::after, .forge-list-item:has(button:not(:disabled), a, label, .forge-list-item--interactive:not(.forge-list-item--disabled), :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled])) .forge-list-item--interactive:focus-visible::after {
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
    animation-name: forge-focus-indicator-inward-grow, forge-focus-indicator-inward-shrink;
    border-end-end-radius: calc(var(--_focus-indicator-shape-end-end) - var(--_focus-indicator-inward-offset));
    border-end-start-radius: calc(var(--_focus-indicator-shape-end-start) - var(--_focus-indicator-inward-offset));
    border-start-end-radius: calc(var(--_focus-indicator-shape-start-end) - var(--_focus-indicator-inward-offset));
    border-start-start-radius: calc(var(--_focus-indicator-shape-start-start) - var(--_focus-indicator-inward-offset));
    border: var(--_focus-indicator-width) solid currentColor;
    inset: var(--_focus-indicator-inward-offset);
    content: "";
    display: block;
  }
  .forge-list-item:has(button:not(:disabled), a, label, .forge-list-item--interactive:not(.forge-list-item--disabled), :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled])) a, .forge-list-item:has(button:not(:disabled), a, label, .forge-list-item--interactive:not(.forge-list-item--disabled), :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled])) button, .forge-list-item:has(button:not(:disabled), a, label, .forge-list-item--interactive:not(.forge-list-item--disabled), :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled])) label, .forge-list-item:has(button:not(:disabled), a, label, .forge-list-item--interactive:not(.forge-list-item--disabled), :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled])) :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled]), .forge-list-item:has(button:not(:disabled), a, label, .forge-list-item--interactive:not(.forge-list-item--disabled), :is(forge-checkbox, forge-radio, forge-switch, input):not([disabled])) .forge-list-item--interactive {
    --forge-focus-indicator-shape: calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1));
  }
  .forge-list-item__text {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: var(--forge-typography-body1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
    font-size: var(--forge-typography-body1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 0.875)));
    font-weight: var(--forge-typography-body1-font-weight, 400);
    line-height: var(--forge-typography-body1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.125)));
    letter-spacing: var(--forge-typography-body1-letter-spacing, 0.0357142857em);
    text-transform: var(--forge-typography-body1-text-transform, inherit);
    text-decoration: var(--forge-typography-body1-text-decoration, inherit);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--_list-item-text-color);
    display: block;
  }
}
@layer two-line {
  .forge-list--two-line .forge-list-item, .forge-list-item--two-line {
    height: var(--_list-item-two-line-height);
    min-height: var(--_list-item-two-line-height);
  }
  .forge-list--three-line .forge-list-item, .forge-list-item--three-line {
    height: var(--_list-item-three-line-height);
    min-height: var(--_list-item-three-line-height);
  }
}
@layer dense {
  .forge-list--dense .forge-list-item, .forge-list-item--dense {
    --_list-item-gap:var(--_list-item-dense-gap);
    height: var(--_list-item-dense-one-line-height);
    min-height: var(--_list-item-dense-one-line-height);
    font-size: var(--_list-item-dense-font-size);
  }
  .forge-list--dense.forge-list--two-line .forge-list-item, .forge-list--dense .forge-list-item--two-line, .forge-list-item--dense.forge-list-item--two-line {
    height: var(--_list-item-dense-two-line-height);
    min-height: var(--_list-item-dense-two-line-height);
  }
  .forge-list--dense.forge-list--three-line .forge-list-item, .forge-list--dense .forge-list-item--three-line, .forge-list-item--dense.forge-list-item--three-line {
    height: var(--_list-item-dense-three-line-height);
    min-height: var(--_list-item-dense-three-line-height);
  }
  .forge-list-dense.forge-list--indented .forge-list-item, .forge-list--dense .forge-list-item--indented, .forge-list-item--dense.forge-list-item--indented {
    margin-inline-start: var(--_list-item-dense-indent);
  }
}
@layer wrap {
  .forge-list--wrap .forge-list-item, .forge-list-item--wrap {
    --_list-item-padding:var(--_list-item-wrap-padding);
    height: auto;
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
    line-height: normal;
  }
  .forge-list--wrap .forge-list-item .forge-list-item__text, .forge-list-item--wrap .forge-list-item__text {
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
    line-height: normal;
  }
}
@layer selected {
  .forge-list-item--selected {
    color: var(--_list-item-selected-color);
  }
  .forge-list-item--selected::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    opacity: var(--_list-item-selected-opacity);
    background-color: var(--_list-item-selected-background);
    pointer-events: none;
  }
  .forge-list-item--selected {
    --forge-state-layer-color: var(--_list-item-selected-color);
  }
  .forge-list-item--selected .forge-list-item__start {
    color: var(--_list-item-start-selected-color);
  }
  .forge-list-item--selected .forge-list-item__end {
    color: var(--_list-item-end-selected-color);
  }
}
@layer indented {
  .forge-list--indented .forge-list-item, .forge-list-item--indented {
    margin-inline-start: var(--_list-item-indent);
  }
}
@layer disabled {
  .forge-list--disabled .forge-list-item, .forge-list-item--disabled, .forge-list-item button:disabled {
    cursor: var(--_list-item-disabled-cursor);
    opacity: var(--_list-item-disabled-opacity);
  }
}
@layer multicolumn {
  .forge-list--multicolumn {
    display: grid;
    gap: var(--_list-spacing);
    min-width: 0;
    grid-template-columns: repeat(auto-fit, minmax(var(--_list-column-width), 1fr));
    column-gap: var(--_list-column-spacing);
  }
}
/**
 * @license
 * Copyright Tyler Technologies, Inc.
 * License: Apache-2.0
 */
.forge-button {
  --_button-primary-color:var(--forge-button-primary-color, var(--forge-theme-primary, #3f51b5));
  --_button-text-color:var(--forge-button-text-color, var(--_button-primary-color));
  --_button-disabled-color:var(--forge-button-disabled-color, var(--forge-theme-surface-container, #e0e0e0));
  --_button-padding:var(--forge-button-padding, var(--forge-spacing-medium, 16px));
  --_button-display:var(--forge-button-display, inline-grid);
  --_button-justify:var(--forge-button-justify, center);
  --_button-shape:var(--forge-button-shape, calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1)));
  --_button-height:var(--forge-button-height, 36px);
  --_button-min-width:var(--forge-button-min-width, 64px);
  --_button-spacing:var(--forge-button-spacing, var(--forge-spacing-xsmall, 8px));
  --_button-border-width:var(--forge-button-border-width, medium);
  --_button-border-style:var(--forge-button-border-style, none);
  --_button-border-color:var(--forge-button-border-color, currentColor);
  --_button-shape-start-start-radius:var(--forge-button-shape-start-start-radius, var(--_button-shape));
  --_button-shape-start-end-radius:var(--forge-button-shape-start-end-radius, var(--_button-shape));
  --_button-shape-end-start-radius:var(--forge-button-shape-end-start-radius, var(--_button-shape));
  --_button-shape-end-end-radius:var(--forge-button-shape-end-end-radius, var(--_button-shape));
  --_button-padding-block:var(--forge-button-padding-block, var(--_button-0));
  --_button-padding-inline:var(--forge-button-padding-inline, var(--_button-padding));
  --_button-background:var(--forge-button-background, transparent);
  --_button-hover-background:var(--forge-button-hover-background, var(--_button-background));
  --_button-active-background:var(--forge-button-active-background, var(--_button-background));
  --_button-color:var(--forge-button-color, var(--_button-text-color));
  --_button-icon-size:var(--forge-button-icon-size, calc(var(--forge-typography-font-size, 1rem) * 1.125));
  --_button-shadow:var(--forge-button-shadow, none);
  --_button-hover-shadow:var(--forge-button-hover-shadow, none);
  --_button-active-shadow:var(--forge-button-active-shadow, none);
  --_button-cursor:var(--forge-button-cursor, pointer);
  --_button-transition-duration:var(--forge-button-transition-duration, var(--forge-animation-duration-short3, 150ms));
  --_button-transition-timing:var(--forge-button-transition-timing, var(--forge-animation-easing-standard, cubic-bezier(0.2, 0, 0, 1)));
  --_button-text-padding-inline:var(--forge-button-text-padding-inline, var(--forge-spacing-xsmall, 8px));
  --_button-outlined-background:var(--forge-button-outlined-background, transparent);
  --_button-outlined-color:var(--forge-button-outlined-color, var(--_button-primary-color));
  --_button-outlined-border-width:var(--forge-button-outlined-border-width, var(--forge-border-thin, 1px));
  --_button-outlined-border-style:var(--forge-button-outlined-border-style, solid);
  --_button-outlined-border-color:var(--forge-button-outlined-border-color, var(--_button-primary-color));
  --_button-tonal-background:var(--forge-button-tonal-background, var(--forge-theme-primary-container, #d1d5ed));
  --_button-tonal-disabled-background:var(--forge-button-tonal-disabled-background, var(--_button-disabled-color));
  --_button-tonal-color:var(--forge-button-tonal-color, var(--forge-theme-on-primary-container, #222c62));
  --_button-tonal-disabled-color:var(--forge-button-tonal-disabled-color, var(--_button-disabled-text-color));
  --_button-filled-background:var(--forge-button-filled-background, var(--_button-primary-color));
  --_button-filled-disabled-background:var(--forge-button-filled-disabled-background, var(--_button-disabled-color));
  --_button-filled-color:var(--forge-button-filled-color, var(--forge-theme-on-primary, #ffffff));
  --_button-filled-disabled-color:var(--forge-button-filled-disabled-color, var(--_button-disabled-text-color));
  --_button-raised-background:var(--forge-button-raised-background, var(--_button-primary-color));
  --_button-raised-disabled-background:var(--forge-button-raised-disabled-background, var(--_button-disabled-color));
  --_button-raised-color:var(--forge-button-raised-color, var(--forge-theme-on-primary, #ffffff));
  --_button-raised-disabled-color:var(--forge-button-raised-disabled-color, var(--_button-disabled-text-color));
  --_button-raised-shadow:var(--forge-button-raised-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
  --_button-raised-hover-shadow:var(--forge-button-raised-hover-shadow, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12));
  --_button-raised-active-shadow:var(--forge-button-raised-active-shadow, 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12));
  --_button-raised-disabled-shadow:var(--forge-button-raised-disabled-shadow, none);
  --_button-link-color:var(--forge-button-link-color, var(--_button-primary-color));
  --_button-link-text-decoration:var(--forge-button-link-text-decoration, underline);
  --_button-link-height:var(--forge-button-link-height, auto);
  --_button-link-padding:var(--forge-button-link-padding, 0);
  --_button-link-line-height:var(--forge-button-link-line-height, normal);
  --_button-link-width:var(--forge-button-link-width, auto);
  --_button-link-hover-text-decoration:var(--forge-button-link-hover-text-decoration, none);
  --_button-link-active-opacity:var(--forge-button-link-active-opacity, 0.65);
  --_button-link-transition-duration:var(--forge-button-link-transition-duration, var(--forge-animation-duration-short3, 150ms));
  --_button-link-transition-timing:var(--forge-button-link-transition-timing, var(--forge-animation-easing-standard, cubic-bezier(0.2, 0, 0, 1)));
  --_button-disabled-cursor:var(--forge-button-disabled-cursor, not-allowed);
  --_button-disabled-text-color:var(--forge-button-disabled-text-color, var(--forge-theme-text-low, rgba(0, 0, 0, 0.38)));
  --_button-disabled-background:var(--forge-button-disabled-background, transparent);
  --_button-disabled-border-color:var(--forge-button-disabled-border-color, var(--_button-disabled-color));
  --_button-disabled-shadow:var(--forge-button-disabled-shadow, none);
  --_button-dense-height:var(--forge-button-dense-height, 24px);
  --_button-pill-shape:var(--forge-button-pill-shape, calc(var(--forge-shape-full, 9999px) * var(--forge-shape-factor, 1)));
  --_button-pill-padding-inline:var(--forge-button-pill-padding-inline, var(--forge-spacing-small, 12px));
  --_button-focus-indicator-offset:var(--forge-button-focus-indicator-offset, 4px);
  --_button-text-focus-indicator-offset:var(--forge-button-text-focus-indicator-offset, 0px);
  --_button-link-focus-indicator-offset:var(--forge-button-link-focus-indicator-offset, 2px);
  --_button-popover-icon-transition-duration:var(--forge-button-popover-icon-transition-duration, var(--forge-animation-duration-short3, 150ms));
  --_button-popover-icon-transition-timing:var(--forge-button-popover-icon-transition-timing, var(--forge-animation-easing-standard, cubic-bezier(0.2, 0, 0, 1)));
  --_button-popover-icon-open-rotation:var(--forge-button-popover-icon-open-rotation, 180deg);
}

.forge-button {
  display: var(--_button-display);
  position: relative;
  outline: none;
  vertical-align: middle;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-button-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-button-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-button-font-size-scale, 0.875)));
  font-weight: var(--forge-typography-button-font-weight, 500);
  line-height: var(--forge-typography-button-line-height, normal);
  letter-spacing: var(--forge-typography-button-letter-spacing, 0.0714285714em);
  text-transform: var(--forge-typography-button-text-transform, inherit);
  text-decoration: var(--forge-typography-button-text-decoration, inherit);
  position: relative;
  display: var(--_button-display);
  grid-auto-flow: column;
  align-items: center;
  justify-content: var(--_button-justify);
  gap: var(--_button-spacing);
  z-index: 0;
  box-sizing: border-box;
  min-inline-size: var(--_button-min-width);
  height: var(--_button-height);
  inline-size: 100%;
  border-width: var(--_button-border-width);
  border-style: var(--_button-border-style);
  border-color: var(--_button-border-color);
  border-start-start-radius: var(--_button-shape-start-start-radius);
  border-start-end-radius: var(--_button-shape-start-end-radius);
  border-end-start-radius: var(--_button-shape-end-start-radius);
  border-end-end-radius: var(--_button-shape-end-end-radius);
  padding-block: var(--_button-padding-block);
  padding-inline: var(--_button-padding-inline);
  box-shadow: var(--_button-shadow);
  outline: none;
  user-select: none;
  -webkit-appearance: none;
  vertical-align: middle;
  text-decoration: none;
  white-space: nowrap;
  background: var(--_button-background);
  color: var(--_button-color);
  cursor: var(--_button-cursor);
  transition-property: box-shadow, background;
  transition-duration: var(--_button-transition-duration);
  transition-timing-function: var(--_button-transition-timing);
}

.forge-button::-moz-focus-inner {
  padding: 0;
  border: 0;
}

.forge-button:hover {
  --_button-shadow:var(--_button-hover-shadow);
  background: var(--_button-hover-background);
}

.forge-button:active {
  --_button-shadow:var(--_button-active-shadow);
  background: var(--_button-active-background);
}

.forge-button {
  position: relative;
  inline-size: auto;
}

.forge-button:not(:disabled):not(.forge-button--link) {
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

.forge-button:not(:disabled):not(.forge-button--link)::before {
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

.forge-button:not(:disabled):not(.forge-button--link):hover::before {
  background-color: var(--_state-layer-hover-color);
  opacity: var(--_state-layer-hover-opacity);
}

.forge-button:not(:disabled):not(.forge-button--link):active::before {
  opacity: var(--_state-layer-pressed-opacity);
  transition-duration: var(--_state-layer-pressed-duration);
  --_state-layer-pressed-opacity:var(--forge-state-layer-pressed-opacity, 0.18);
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
.forge-button:not(:disabled) {
  outline: none;
}

.forge-button:not(:disabled):focus-visible::after {
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

.forge-button:not(:disabled):focus-visible::after {
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

.forge-button:not(:disabled) {
  --forge-focus-indicator-color: var(--_button-primary-color);
}

.forge-button:disabled {
  cursor: var(--_button-disabled-cursor);
  --_button-background:var(--_button-disabled-background);
  --_button-color:var(--_button-disabled-text-color);
  --_button-shadow:var(--_button-disabled-shadow);
  pointer-events: none;
  pointer-events: initial;
}

.forge-button:where(:not(.forge-button--outlined, .forge-button--tonal, .forge-button--filled, .forge-button--raised, .forge-button--link)), .forge-button--text {
  --_button-padding-inline:var(--_button-text-padding-inline);
}

.forge-button--outlined {
  --_button-background:var(--_button-outlined-background);
  --_button-color:var(--_button-outlined-color);
  --_button-border-width:var(--_button-outlined-border-width);
  --_button-border-style:var(--_button-outlined-border-style);
  --_button-border-color:var(--_button-outlined-border-color);
}

.forge-button--outlined:disabled {
  --_button-border-color:var(--_button-disabled-border-color);
}

.forge-button--tonal {
  --_button-background:var(--_button-tonal-background);
  --_button-color:var(--_button-tonal-color);
}

.forge-button--tonal:disabled {
  --_button-background:var(--_button-tonal-disabled-background);
  --_button-color:var(--_button-tonal-disabled-color);
}

.forge-button--filled, .forge-button--raised {
  --_button-background:var(--_button-filled-background);
  --_button-color:var(--_button-filled-color);
  --forge-state-layer-color: var(--_button-filled-color);
}

.forge-button--filled:disabled, .forge-button--raised:disabled {
  --_button-background:var(--_button-filled-disabled-background);
  --_button-color:var(--_button-filled-disabled-color);
}

.forge-button--raised {
  --_button-background:var(--_button-raised-background);
  --_button-color:var(--_button-raised-color);
  --_button-shadow:var(--_button-raised-shadow);
}

.forge-button--raised:hover {
  --_button-shadow:var(--_button-raised-hover-shadow);
}

.forge-button--raised:active {
  --_button-shadow:var(--_button-raised-active-shadow);
}

.forge-button--raised:disabled {
  --_button-background:var(--_button-raised-disabled-background);
  --_button-color:var(--_button-raised-disabled-color);
  --_button-shadow:var(--_button-raised-disabled-shadow);
}

.forge-button--link {
  --_button-color:var(--_button-link-color);
  --_button-height:var(--_button-link-height);
  --_button-padding:var(--_button-link-padding);
  --_button-focus-indicator-offset:var(--_button-link-focus-indicator-offset);
  text-decoration: var(--_button-link-text-decoration);
  line-height: var(--_button-link-line-height);
  transition: opacity var(--_button-link-transition-duration) var(--_button-link-transition-timing);
  inline-size: var(--_button-link-width);
}

.forge-button--link:hover {
  text-decoration: var(--_button-link-hover-text-decoration);
}

.forge-button--link:active {
  opacity: var(--_button-link-active-opacity);
}

.forge-button--pill {
  --_button-shape:var(--_button-pill-shape);
  --_button-padding-inline:var(--_button-pill-padding-inline);
  --forge-focus-indicator-shape: var(--_button-pill-shape);
}

.forge-button {
  --forge-icon-font-size: var(--_button-icon-size);
}

.forge-button--dense {
  --_button-height:var(--_button-dense-height);
}

:host {
  display: grid;
  min-height: 0;
  height: 100%;
}

.conversations-panel {
  display: grid;
  grid-template-rows: auto auto auto auto 1fr;
  min-height: 0;
  padding: var(--forge-spacing-medium, 16px);
  background-color: var(--forge-theme-surface, #ffffff);
  position: relative;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--forge-spacing-medium, 16px);
}
.header--search {
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
}
.header--search .search-header-end {
  justify-self: end;
}

.back-button {
  margin-inline-start: calc(var(--forge-spacing-xsmall, 8px) * -1);
}

.close-button {
  margin-inline-end: calc(var(--forge-spacing-xsmall, 8px) * -1);
}

.chats-label {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-label1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-label1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-font-size-scale, 0.75)));
  font-weight: var(--forge-typography-label1-font-weight, 400);
  line-height: var(--forge-typography-label1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-line-height-scale, 1.25)));
  letter-spacing: var(--forge-typography-label1-letter-spacing, 0.0357142857em);
  text-transform: var(--forge-typography-label1-text-transform, inherit);
  text-decoration: var(--forge-typography-label1-text-decoration, inherit);
  margin-block-start: var(--forge-spacing-xsmall, 8px);
  font-weight: 500;
}

.new-chat-item button {
  display: flex;
  align-items: center;
  gap: var(--forge-spacing-small, 12px);
}
.new-chat-item .forge-icon {
  width: 18px;
  height: 18px;
}

.thread-list-container::-webkit-scrollbar {
  height: var(--forge-scrollbar-height, 16px);
  width: var(--forge-scrollbar-width, 16px);
}
.thread-list-container::-webkit-scrollbar-track {
  background-color: var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb));
}
.thread-list-container::-webkit-scrollbar-track:hover {
  background-color: var(--forge-scrollbar-track-container-hover, var(--forge-theme-surface-container-low, #ebebeb));
}
.thread-list-container::-webkit-scrollbar-corner {
  background-color: var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb));
}
.thread-list-container::-webkit-scrollbar-thumb {
  height: var(--forge-scrollbar-thumb-min-height, 32px);
  width: var(--forge-scrollbar-thumb-min-width, 32px);
  border-radius: var(--forge-scrollbar-border-radius, calc(var(--forge-shape-full, 9999px) * var(--forge-shape-factor, 1)));
  border-width: var(--forge-scrollbar-border-width, 3px);
  border-style: solid;
  border-color: transparent;
  background-color: var(--forge-scrollbar-thumb-container, var(--forge-theme-surface-container-medium, #c2c2c2));
  background-clip: content-box;
}
.thread-list-container::-webkit-scrollbar-thumb:hover {
  background-color: var(--forge-scrollbar-thumb-container-hover, var(--forge-theme-surface-container-high, #9e9e9e));
}
.thread-list-container {
  overflow-y: auto;
  min-height: 0;
}
.thread-list-container forge-ai-dropdown-menu {
  display: flex;
}

.forge-list--navlist .forge-list-item {
  font-weight: normal;
  margin-inline: 0;
}
.forge-list--navlist .forge-list-item--selected {
  font-weight: bold;
}
.forge-list--navlist .forge-icon {
  color: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
}

.search-field {
  position: relative;
  margin-block: var(--forge-spacing-small, 12px) var(--forge-spacing-xxsmall, 4px);
}
.search-field input::placeholder {
  font-size: 0.875rem;
}
.search-field .forge-icon {
  color: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
}
.search-field .search-spinner {
  position: absolute;
  inset-inline-end: var(--forge-spacing-small, 12px);
  inset-block-start: 50%;
  transform: translateY(-50%);
}

.empty-state {
  display: flex;
  color: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
  margin-block-start: var(--forge-spacing-xsmall, 8px);
}
.empty-state p {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-body1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-body1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 0.875)));
  font-weight: var(--forge-typography-body1-font-weight, 400);
  line-height: var(--forge-typography-body1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.125)));
  letter-spacing: var(--forge-typography-body1-letter-spacing, 0.0357142857em);
  text-transform: var(--forge-typography-body1-text-transform, inherit);
  text-decoration: var(--forge-typography-body1-text-decoration, inherit);
  margin: 0;
}

.loading-more-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-block: var(--forge-spacing-medium, 16px);
  margin-block-start: var(--forge-spacing-xxsmall, 4px);
}

.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-block: var(--forge-spacing-xsmall, 8px);
  margin-inline-start: var(--forge-spacing-xsmall, 8px);
}

.error-state {
  margin-block-start: var(--forge-spacing-xsmall, 8px);
}
.error-state__message {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-body2-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-body2-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 1)));
  font-weight: var(--forge-typography-body2-font-weight, 400);
  line-height: var(--forge-typography-body2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.375)));
  letter-spacing: var(--forge-typography-body2-letter-spacing, 0.015625em);
  text-transform: var(--forge-typography-body2-text-transform, inherit);
  text-decoration: var(--forge-typography-body2-text-decoration, inherit);
  margin: 0;
}
.error-state__retry {
  --forge-button-primary-color: var(--forge-theme-error, #b00020);
  margin-block-start: var(--forge-spacing-xsmall, 8px);
}

.compact-error {
  margin-inline: var(--forge-spacing-xsmall, 8px);
  margin-block: var(--forge-spacing-xsmall, 8px);
}
.compact-error__body {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-body1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-body1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 0.875)));
  font-weight: var(--forge-typography-body1-font-weight, 400);
  line-height: var(--forge-typography-body1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.125)));
  letter-spacing: var(--forge-typography-body1-letter-spacing, 0.0357142857em);
  text-transform: var(--forge-typography-body1-text-transform, inherit);
  text-decoration: var(--forge-typography-body1-text-decoration, inherit);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--forge-spacing-xsmall, 8px);
}
.compact-error__retry {
  --forge-button-primary-color: var(--forge-theme-error, #b00020);
  flex: none;
}

.forge-list-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--forge-spacing-xxsmall, 4px);
}
.forge-list-item button {
  flex: 1;
  min-width: 0;
}
.forge-list-item .thread-item-actions {
  display: none;
  align-items: center;
  gap: var(--forge-spacing-xxsmall, 4px);
}
.forge-list-item:hover .thread-item-actions, .forge-list-item:focus-within .thread-item-actions, .forge-list-item.forge-list-item--menu-open .thread-item-actions {
  display: flex;
}

forge-ai-modal {
  --forge-ai-modal-width: fit-content;
  --forge-ai-modal-height: fit-content;
}

.delete-confirmation {
  display: flex;
  flex-direction: column;
  gap: var(--forge-spacing-medium, 16px);
  padding: var(--forge-spacing-medium, 16px);
  max-width: 90vw;
}
.delete-confirmation__title {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-heading4-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-heading4-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading4-font-size-scale, 1.25)));
  font-weight: var(--forge-typography-heading4-font-weight, 500);
  line-height: var(--forge-typography-heading4-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading4-line-height-scale, 1.5)));
  letter-spacing: var(--forge-typography-heading4-letter-spacing, 0.005em);
  text-transform: var(--forge-typography-heading4-text-transform, inherit);
  text-decoration: var(--forge-typography-heading4-text-decoration, inherit);
  margin: 0;
}
.delete-confirmation__text {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-body1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-body1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 0.875)));
  font-weight: var(--forge-typography-body1-font-weight, 400);
  line-height: var(--forge-typography-body1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.125)));
  letter-spacing: var(--forge-typography-body1-letter-spacing, 0.0357142857em);
  text-transform: var(--forge-typography-body1-text-transform, inherit);
  text-decoration: var(--forge-typography-body1-text-decoration, inherit);
}
.delete-confirmation__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--forge-spacing-small, 12px);
}`})))()}var E,D;function O(){return(O=e((()=>{h(),m(),g(),_(),v(),x(),S(),C(),T(),o(),f(),E=`forge-ai-conversations-panel`,D=class extends a{constructor(...e){super(...e),this.threads=[],this.totalChats=0,this.selectedThreadId=null,this.showThreadRename=!1,this.showThreadDelete=!1,this.loading=!1,this._viewState=`main`,this._isSearching=!1,this._searchResults=[],this._searchQuery=``,this._editingThreadId=null,this._hiddenThreadIds=new Set,this._openMenuThreadId=null,this.#t=new y(this,{onConfirm:e=>{let t=new CustomEvent(`forge-ai-conversations-panel-delete`,{detail:{id:e.id,thread:e,onSuccess:()=>{this._hiddenThreadIds.add(e.id),this.requestUpdate()},onError:t=>{this._hiddenThreadIds.delete(e.id),this.requestUpdate(),t&&console.error(`Delete failed:`,t)}},bubbles:!0,composed:!0,cancelable:!0});this.dispatchEvent(t)&&(this._hiddenThreadIds.add(e.id),this.requestUpdate())}}),this.#n=new b(this,{onLoadMore:()=>this.#u()}),this.#r=new b(this,{onLoadMore:()=>this.#d()}),this.#E=n`
    <div class="header">
      <forge-ai-icon></forge-ai-icon>
      <button class="close-button forge-icon-button forge-icon-button--medium" @click=${this.#v} aria-label="Close conversations panel">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </button>
    </div>
  `,this.#O=n`<div class="chats-label">Recent chats</div>`,this.#N=n`
    <div class="loading-indicator">
      <forge-ai-spinner size="small"></forge-ai-spinner>
    </div>
  `,this.#B=n`
    <ul class="forge-list forge-list--dense forge-list--navlist chat-actions-list" role="list">
      <li class="forge-list-item new-chat-item" role="listitem">
        <button @click=${this.#g}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon" aria-hidden="true">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 14H5.2L4 17.2V4h16zm-4-7v2h-3v3h-2v-3H8V9h3V6h2v3z" />
          </svg>
          <span>New chat</span>
        </button>
      </li>
      <li class="forge-list-item new-chat-item" role="listitem">
        <button @click=${this.#_}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon" aria-hidden="true">
            <path
              d="M9 6v2H2V6zm0 5v2H2v-2zm9 5v2H2v-2zm1.31-4.5c.44-.68.69-1.5.69-2.39 0-2.5-2-4.5-4.5-4.5s-4.5 2-4.5 4.5 2 4.5 4.5 4.5c.87 0 1.69-.25 2.38-.68L21 16l1.39-1.39zm-3.81.11c-1.38 0-2.5-1.11-2.5-2.5s1.12-2.5 2.5-2.5a2.5 2.5 0 0 1 0 5" />
          </svg>
          <span>Search chats</span>
        </button>
      </li>
    </ul>
  `}static{this.styles=i(w)}#e;#t;#n;#r;get#i(){return this.totalChats<=0?!1:this.threads.filter(e=>!this._hiddenThreadIds.has(e.id)).length<this.totalChats}get#a(){return this.totalChats<=0?!1:this._searchResults.filter(e=>!this._hiddenThreadIds.has(e.id)).length<this.totalChats}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{this._viewState===`main`&&this.threads.length?this._searchInputMain?.focus():this._viewState===`search`&&this._searchInputSearch?.focus()})}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.#e)}firstUpdated(){this.#o()}updated(e){(e.has(`_viewState`)||e.has(`threads`)||e.has(`totalChats`))&&((e.has(`threads`)||e.has(`totalChats`))&&(this.#n.reset(),this.#r.reset()),this.#o())}#o(){this._threadListContainer&&(this.#n.detach(),this.#r.detach(),this._viewState===`main`&&this.#i?this.#n.attach(this._threadListContainer):this._viewState===`search`&&this.#a&&this.#r.attach(this._threadListContainer))}resetToMainView(){this.#p(),this._editingThreadId=null}get#s(){return(this._viewState===`search`?this._searchResults:this.threads).filter(e=>!this._hiddenThreadIds.has(e.id))}#c(e){this._searchQuery=e,this.#r.reset();let t=new CustomEvent(`forge-ai-conversations-panel-search`,{detail:{query:e,setResults:e=>{this._searchResults=e,this._isSearching=!1}},bubbles:!0,composed:!0,cancelable:!0});this.dispatchEvent(t)?(this._isSearching=!1,this._searchResults=this.threads.filter(t=>t.title.toLowerCase().includes(e.toLowerCase()))):this._isSearching=!0}#l(e){let t=e.target.value;clearTimeout(this.#e),t.trim()?this.#e=window.setTimeout(()=>{this.#c(t)},300):(this._searchQuery=``,this._searchResults=this.threads,this._isSearching=!1)}#u(){let e=new CustomEvent(`forge-ai-conversations-panel-load-more`,{detail:{query:``,appendResults:e=>{e.length===0?this.#n.setHasMore(!1):this.threads=[...this.threads,...e],this.#n.setLoadingState(!1)}},bubbles:!0,composed:!0});this.dispatchEvent(e)}#d(){let e=new CustomEvent(`forge-ai-conversations-panel-load-more`,{detail:{query:this._searchQuery,appendResults:e=>{e.length===0?this.#r.setHasMore(!1):this._searchResults=[...this._searchResults,...e],this.#r.setLoadingState(!1)}},bubbles:!0,composed:!0});this.dispatchEvent(e)}#f(){this._viewState!==`search`&&(this._viewState=`search`,this._searchQuery=``,this._searchResults=this.threads,this._isSearching=!1,this._editingThreadId=null,this.#n.reset(),this.#r.reset(),this.updateComplete.then(()=>this._searchInputSearch?.focus()))}#p(){this._viewState!==`main`&&(this._viewState=`main`,this._searchQuery=``,this._searchResults=[],this._isSearching=!1,this._editingThreadId=null,this.#n.reset(),this.#r.reset(),clearTimeout(this.#e))}#m(){this.#p()}#h(e){let t=new CustomEvent(`forge-ai-conversations-panel-select`,{detail:{id:e.id,title:e.title},bubbles:!0,composed:!0});this.dispatchEvent(t)}#g(){let e=new CustomEvent(`forge-ai-conversations-panel-new-chat`,{bubbles:!0,composed:!0,cancelable:!0});this.dispatchEvent(e)}#_(){this.#f()}#v(){let e=new CustomEvent(`forge-ai-conversations-panel-close`,{bubbles:!0,composed:!0});this.dispatchEvent(e)}#y(){let e=new CustomEvent(`forge-ai-conversations-panel-retry`,{bubbles:!0,composed:!0});this.dispatchEvent(e)}#b(e){this._editingThreadId=e.detail.id,this._openMenuThreadId=null}#x(e){this._openMenuThreadId=e.detail.id}#S(){this._openMenuThreadId=null}#C(e){let{id:t}=e.detail,n=this.#s.find(e=>e.id===t);n&&this.#t.show(n)}#w(e){let{id:t,oldTitle:n,newTitle:r}=e.detail,i=this.#s.find(e=>e.id===t);if(!i)return;let a=new CustomEvent(`forge-ai-conversations-panel-rename`,{detail:{id:t,oldTitle:n,newTitle:r,onSuccess:()=>{i.title=r,this.requestUpdate()},onError:e=>{i.title=n,this.requestUpdate(),e&&console.error(`Rename failed:`,e)}},bubbles:!0,composed:!0,cancelable:!0});this.dispatchEvent(a)&&(i.title=r,this.requestUpdate()),this._editingThreadId=null}#T(){this._editingThreadId=null}#E;get#D(){return n`
      <div class="header header--search">
        <button class="back-button forge-icon-button forge-icon-button--medium" @click=${this.#m} aria-label="Back to recent chats">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z" />
          </svg>
        </button>
        <forge-ai-icon></forge-ai-icon>
        <div class="search-header-end">
          <button class="close-button forge-icon-button forge-icon-button--medium" @click=${this.#v} aria-label="Close conversations panel">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>
      </div>
    `}#O;get#k(){return n`
      <div class="forge-field forge-field--small search-field">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon" aria-hidden="true">
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14" />
        </svg>
        <input
          type="text"
          id="search-input-search"
          aria-label="Search"
          placeholder="Find a chat"
          autocomplete="off"
          .value=${this._searchQuery}
          @input=${this.#l} />
        ${p(this._isSearching,()=>n`<forge-ai-spinner size="small" class="search-spinner"></forge-ai-spinner>`)}
      </div>
    `}get#A(){let e=this._viewState===`search`&&this._searchQuery.trim()?`No chats found`:`No chats yet`;return n`
      <div class="empty-state">
        <p>${e}</p>
      </div>
    `}get#j(){return this._viewState===`search`?this.#r:this.#n}get#M(){return this.#j.isLoadingMore?n`
      <div class="loading-more-indicator">
        <forge-ai-spinner size="small"></forge-ai-spinner>
      </div>
    `:r}#N;get#P(){return n`
      <div class="error-state">
        <forge-ai-error-message density="small">
          <span slot="title">Error</span>
          <p class="error-state__message">${this.errorMessage}</p>
          <button class="forge-button forge-button--outlined forge-button--dense error-state__retry" type="button" @click=${this.#y}>
            Retry
          </button>
        </forge-ai-error-message>
      </div>
    `}get#F(){return n`
      <forge-ai-error-message class="compact-error" density="small">
        <div class="compact-error__body">
          <span>${this.errorMessage}</span>
          <button class="forge-button forge-button--outlined forge-button--dense compact-error__retry" type="button" @click=${this.#y}>
            Retry
          </button>
        </div>
      </forge-ai-error-message>
    `}get#I(){return!this.errorMessage||this.#s.length===0?`none`:this.#j.isLoadingMore?`list-footer`:`above-list`}get#L(){return this.#s.length===0?this.errorMessage?this.#P:this.loading&&this._viewState===`main`?this.#N:this.#A:this.#R}get#R(){let e=this.#s;return n`
      <ul class="forge-list forge-list--dense forge-list--navlist" role="list">
        ${e.map(e=>{let t=this.selectedThreadId===e.id,i=this._editingThreadId===e.id,a=this._openMenuThreadId===e.id;return n`
            <li class="forge-list-item ${t?`forge-list-item--selected`:``} ${a?`forge-list-item--menu-open`:``}" role="listitem">
              ${p(i,()=>n`
                  <forge-ai-edit-thread
                    .thread=${e}
                    .value=${e.title}
                    @forge-ai-edit-thread-save=${this.#w}
                    @forge-ai-edit-thread-cancel=${this.#T}>
                  </forge-ai-edit-thread>
                `,()=>n`
                  <button @click=${()=>this.#h(e)} aria-current=${t?`true`:r}>
                    <span>${e.title}</span>
                  </button>
                  ${p(this.showThreadRename||this.showThreadDelete,()=>n`
                      <div class="thread-item-actions">
                        <forge-ai-thread-actions-menu
                          .thread=${e}
                          ?show-rename=${this.showThreadRename}
                          ?show-delete=${this.showThreadDelete}
                          @forge-ai-thread-actions-menu-rename=${this.#b}
                          @forge-ai-thread-actions-menu-delete-click=${this.#C}
                          @forge-ai-thread-actions-menu-open=${this.#x}
                          @forge-ai-thread-actions-menu-close=${this.#S}>
                        </forge-ai-thread-actions-menu>
                      </div>
                    `)}
                `)}
            </li>
          `})}
      </ul>
      ${this.#I===`list-footer`?this.#F:this.#M}
    `}get#z(){return n` <div class="thread-list-container">${this.#L}</div> `}#B;render(){let e=this._viewState===`main`,t=this._viewState===`search`;return n`
      <aside class="conversations-panel" role="complementary" aria-label="Conversation history">
        ${p(e,()=>this.#E)} ${p(t,()=>this.#D)} ${p(e,()=>this.#B)}
        ${p(e,()=>this.#O)} ${p(t,()=>this.#k)}
        ${p(this.#I===`above-list`,()=>this.#F)} ${this.#z}
      </aside>
      ${this.#t.template}
    `}},s([c({type:Array})],D.prototype,`threads`,void 0),s([c({type:Number,attribute:`total-chats`})],D.prototype,`totalChats`,void 0),s([c({type:String,attribute:`selected-thread-id`})],D.prototype,`selectedThreadId`,void 0),s([c({type:Boolean,attribute:`show-thread-rename`})],D.prototype,`showThreadRename`,void 0),s([c({type:Boolean,attribute:`show-thread-delete`})],D.prototype,`showThreadDelete`,void 0),s([c({type:Boolean,reflect:!0})],D.prototype,`loading`,void 0),s([c({type:String,attribute:`error-message`})],D.prototype,`errorMessage`,void 0),s([l()],D.prototype,`_viewState`,void 0),s([l()],D.prototype,`_isSearching`,void 0),s([l()],D.prototype,`_searchResults`,void 0),s([l()],D.prototype,`_searchQuery`,void 0),s([l()],D.prototype,`_editingThreadId`,void 0),s([l()],D.prototype,`_hiddenThreadIds`,void 0),s([l()],D.prototype,`_openMenuThreadId`,void 0),s([u(`#search-input-main`)],D.prototype,`_searchInputMain`,void 0),s([u(`#search-input-search`)],D.prototype,`_searchInputSearch`,void 0),s([u(`.thread-list-container`)],D.prototype,`_threadListContainer`,void 0),D=s([d(E)],D)})))()}function k(){return(k=e((()=>{O()})))()}var A=t({Demo:()=>L,EmptyState:()=>z,ErrorAboveList:()=>U,ErrorState:()=>V,ErrorStateWhileLoading:()=>H,LoadMoreErrorState:()=>W,Loading:()=>B,WithAsyncSearch:()=>K,WithInfiniteScroll:()=>J,WithLocalSearch:()=>G,WithNoRecentThreads:()=>q,WithSelectedThread:()=>R,__namedExportsOrder:()=>Y,default:()=>I}),j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y;function X(){return(X=e((()=>{o(),k(),{action:j}=__STORYBOOK_MODULE_ACTIONS__,M=`forge-ai-conversations-panel`,N=n`<style>
  .conversations-panel-story-host {
    inline-size: 400px;
    block-size: 600px;
    border: 1px solid var(--forge-theme-outline);
  }
  .conversations-panel-story-notes {
    margin-block-start: var(--forge-spacing-medium);
  }
  .conversations-panel-story-notes-narrow {
    margin-block-start: var(--forge-spacing-medium);
    max-inline-size: 400px;
  }
</style>`,P=(e,t=0)=>{let n=[`TypeScript`,`Web Components`,`React`,`Angular`,`Vue`,`CSS Grid`,`Flexbox`,`JavaScript`,`Performance`,`Testing`],r=[`best practices`,`tutorial`,`comparison`,`explained`,`patterns`,`optimization`,`debugging`];return Array.from({length:e},(e,i)=>{let a=t+i,o=n[a%n.length],s=r[Math.floor(a/n.length)%r.length],c=Math.floor(a/5)+1,l=a*7%20+1;return{id:`thread-${a+1}`,title:`${o} ${s}`,createdAt:new Date(Date.now()-c*24*60*60*1e3).toISOString(),messageCount:l}})},F=[{id:`thread-1`,title:`TypeScript best practices`,createdAt:new Date(Date.now()-72e5).toISOString(),messageCount:8},{id:`thread-2`,title:`Web component architecture`,createdAt:new Date(Date.now()-18e6).toISOString(),messageCount:15},{id:`thread-3`,title:`How to use localStorage?`,createdAt:new Date(Date.now()-864e5).toISOString(),messageCount:3},{id:`thread-4`,title:`Lit reactive controllers explained`,createdAt:new Date(Date.now()-1296e5).toISOString(),messageCount:12},{id:`thread-5`,title:`CSS Grid vs Flexbox comparison`,createdAt:new Date(Date.now()-1728e5).toISOString(),messageCount:6},{id:`thread-6`,title:`JavaScript async/await patterns`,createdAt:new Date(Date.now()-2592e5).toISOString(),messageCount:9},{id:`thread-7`,title:`React hooks vs Lit reactive properties`,createdAt:new Date(Date.now()-3456e5).toISOString(),messageCount:7},{id:`thread-8`,title:`Testing web components`,createdAt:new Date(Date.now()-432e6).toISOString(),messageCount:11}],I={title:`AI/Components/Conversations/Conversations Panel`,component:M,argTypes:{threads:{control:`object`,description:`Array of recent conversation threads to display`},totalChats:{control:{type:`number`},description:`Total number of chats available for pagination. Set to 0 to disable infinite scroll.`},selectedThreadId:{control:`text`,description:`ID of the currently selected thread`},showThreadRename:{control:`boolean`,description:`Show rename option in conversations panel`},showThreadDelete:{control:`boolean`,description:`Show delete option in conversations panel`},loading:{control:`boolean`,description:`Show a loading indicator in the recent chats list while threads are loading`},errorMessage:{control:`text`,description:`Message describing a failed thread load. Replaces the empty state and loading indicator with a retry banner when nothing is loaded. When threads are already on screen the list stays visible and the message shows as a compact single line with a retry - at the bottom of the list if a page was in flight, otherwise above it`}},args:{threads:F,totalChats:0,selectedThreadId:null,showThreadRename:!0,showThreadDelete:!0,loading:!1,errorMessage:void 0},render:e=>n`
    ${N}
    <div class="conversations-panel-story-host">
      <forge-ai-conversations-panel
        .threads=${e.threads}
        total-chats=${e.totalChats}
        .selectedThreadId=${e.selectedThreadId}
        ?show-thread-rename=${e.showThreadRename}
        ?show-thread-delete=${e.showThreadDelete}
        ?loading=${e.loading}
        .errorMessage=${e.errorMessage}
        @forge-ai-conversations-panel-retry=${e=>{j(`forge-ai-conversations-panel-retry`)(e);let t=e.target;t.errorMessage=void 0}}
        @forge-ai-conversations-panel-select=${j(`forge-ai-conversations-panel-select`)}
        @forge-ai-conversations-panel-new-chat=${j(`forge-ai-conversations-panel-new-chat`)}
        @forge-ai-conversations-panel-close=${j(`forge-ai-conversations-panel-close`)}
        @forge-ai-conversations-panel-search=${j(`forge-ai-conversations-panel-search`)}
        @forge-ai-conversations-panel-load-more=${e=>{j(`forge-ai-conversations-panel-load-more`)(e),setTimeout(()=>{e.detail.appendResults([])},1e3)}}
        @forge-ai-conversations-panel-rename=${j(`forge-ai-conversations-panel-rename`)}
        @forge-ai-conversations-panel-delete=${j(`forge-ai-conversations-panel-delete`)}>
      </forge-ai-conversations-panel>
    </div>
  `},L={},R={args:{selectedThreadId:`thread-2`}},z={args:{threads:[]}},B={args:{threads:[],loading:!0}},V={args:{threads:[],errorMessage:`Could not load your chats.`}},H={args:{threads:[],loading:!0,errorMessage:`Could not load your chats.`}},U={args:{threads:F,errorMessage:`403 Forbidden - access to this chat was revoked.`}},W={args:{threads:P(20),totalChats:120},render:e=>n`
    ${N}
    <div class="conversations-panel-story-host">
      <forge-ai-conversations-panel
        .threads=${e.threads}
        total-chats=${e.totalChats}
        @forge-ai-conversations-panel-retry=${e=>{j(`forge-ai-conversations-panel-retry`)(e);let t=e.target;t.errorMessage=void 0}}
        @forge-ai-conversations-panel-load-more=${e=>{j(`forge-ai-conversations-panel-load-more`)(e);let t=e.target;setTimeout(()=>{t.errorMessage=`Could not load more chats.`},800)}}
        @forge-ai-conversations-panel-select=${j(`forge-ai-conversations-panel-select`)}
        @forge-ai-conversations-panel-new-chat=${j(`forge-ai-conversations-panel-new-chat`)}
        @forge-ai-conversations-panel-close=${j(`forge-ai-conversations-panel-close`)}>
      </forge-ai-conversations-panel>
    </div>
  `},G={args:{threads:F},render:e=>n`
    ${N}
    <div class="conversations-panel-story-host">
      <forge-ai-conversations-panel
        .threads=${e.threads}
        .selectedThreadId=${e.selectedThreadId}
        ?show-thread-rename=${e.showThreadRename}
        ?show-thread-delete=${e.showThreadDelete}
        @forge-ai-conversations-panel-select=${j(`forge-ai-conversations-panel-select`)}
        @forge-ai-conversations-panel-new-chat=${j(`forge-ai-conversations-panel-new-chat`)}
        @forge-ai-conversations-panel-close=${j(`forge-ai-conversations-panel-close`)}
        @forge-ai-conversations-panel-search=${e=>{j(`forge-ai-conversations-panel-search`)(e)}}
        @forge-ai-conversations-panel-rename=${j(`forge-ai-conversations-panel-rename`)}
        @forge-ai-conversations-panel-delete=${j(`forge-ai-conversations-panel-delete`)}>
      </forge-ai-conversations-panel>
    </div>
    <div class="conversations-panel-story-notes">
      <p><strong>Local Search (Default)</strong></p>
      <p>Click "Search chats" to enter search chats. Type in the search field - results are filtered locally from recent threads with 300ms debounce.</p>
    </div>
  `},K={args:{threads:F},render:e=>{let t=[...F,{id:`thread-9`,title:`Advanced TypeScript generics tutorial`,createdAt:new Date(Date.now()-6048e5).toISOString(),messageCount:18},{id:`thread-10`,title:`Building custom Lit directives`,createdAt:new Date(Date.now()-6912e5).toISOString(),messageCount:5},{id:`thread-11`,title:`TypeScript utility types explained`,createdAt:new Date(Date.now()-12096e5).toISOString(),messageCount:14},{id:`thread-12`,title:`Performance optimization techniques`,createdAt:new Date(Date.now()-1296e6).toISOString(),messageCount:22}];return n`
      ${N}
      <div class="conversations-panel-story-host">
        <forge-ai-conversations-panel
          .threads=${e.threads}
          .selectedThreadId=${e.selectedThreadId}
          ?show-thread-rename=${e.showThreadRename}
          ?show-thread-delete=${e.showThreadDelete}
          @forge-ai-conversations-panel-select=${j(`forge-ai-conversations-panel-select`)}
          @forge-ai-conversations-panel-new-chat=${j(`forge-ai-conversations-panel-new-chat`)}
          @forge-ai-conversations-panel-close=${j(`forge-ai-conversations-panel-close`)}
          @forge-ai-conversations-panel-search=${e=>{j(`forge-ai-conversations-panel-search`)(e),e.preventDefault();let{query:n,setResults:r}=e.detail;setTimeout(()=>{let e=t.filter(e=>e.title.toLowerCase().includes(n.toLowerCase()));r(e)},1e3)}}
          @forge-ai-conversations-panel-rename=${j(`forge-ai-conversations-panel-rename`)}
          @forge-ai-conversations-panel-delete=${j(`forge-ai-conversations-panel-delete`)}>
        </forge-ai-conversations-panel>
      </div>
      <div class="conversations-panel-story-notes-narrow">
        <p><strong>Async Search (preventDefault)</strong></p>
        <p>
          Click "Search chats" and type in the search field. This story simulates an async search by calling
          <code>preventDefault()</code> on the search event and returning results via the <code>setResults</code>
          callback after 1 second.
        </p>
        <p>
          The component shows a loading spinner while waiting. Results include threads beyond the recent 8 shown in recent chats (12 total searchable threads).
        </p>
      </div>
    `}},q={args:{threads:[]},render:e=>{let t=[{id:`thread-1`,title:`Old conversation about TypeScript`,createdAt:new Date(Date.now()-18144e5).toISOString(),messageCount:25},{id:`thread-2`,title:`Archived discussion on web components`,createdAt:new Date(Date.now()-2592e6).toISOString(),messageCount:19}];return n`
      ${N}
      <div class="conversations-panel-story-host">
        <forge-ai-conversations-panel
          .threads=${e.threads}
          .selectedThreadId=${e.selectedThreadId}
          ?show-thread-rename=${e.showThreadRename}
          ?show-thread-delete=${e.showThreadDelete}
          @forge-ai-conversations-panel-select=${j(`forge-ai-conversations-panel-select`)}
          @forge-ai-conversations-panel-new-chat=${j(`forge-ai-conversations-panel-new-chat`)}
          @forge-ai-conversations-panel-close=${j(`forge-ai-conversations-panel-close`)}
          @forge-ai-conversations-panel-search=${e=>{j(`forge-ai-conversations-panel-search`)(e),e.preventDefault();let{query:n,setResults:r}=e.detail;setTimeout(()=>{let e=t.filter(e=>e.title.toLowerCase().includes(n.toLowerCase()));r(e)},800)}}
          @forge-ai-conversations-panel-rename=${j(`forge-ai-conversations-panel-rename`)}
          @forge-ai-conversations-panel-delete=${j(`forge-ai-conversations-panel-delete`)}>
        </forge-ai-conversations-panel>
      </div>
      <div class="conversations-panel-story-notes-narrow">
        <p><strong>No Recent Threads + Async Search</strong></p>
        <p>No recent threads are shown in recent chats. Click "Search chats" to search through older archived conversations.</p>
      </div>
    `}},J={args:{threads:P(20)},render:e=>{let t=P(120),r=0,i=1;return n`
      ${N}
      <div class="conversations-panel-story-host">
        <forge-ai-conversations-panel
          .threads=${e.threads}
          total-chats=${120}
          .selectedThreadId=${e.selectedThreadId}
          ?show-thread-rename=${e.showThreadRename}
          ?show-thread-delete=${e.showThreadDelete}
          @forge-ai-conversations-panel-select=${j(`forge-ai-conversations-panel-select`)}
          @forge-ai-conversations-panel-new-chat=${j(`forge-ai-conversations-panel-new-chat`)}
          @forge-ai-conversations-panel-close=${j(`forge-ai-conversations-panel-close`)}
          @forge-ai-conversations-panel-search=${e=>{j(`forge-ai-conversations-panel-search`)(e.detail),e.preventDefault();let{query:n,setResults:i}=e.detail;setTimeout(()=>{let e=t.filter(e=>e.title.toLowerCase().includes(n.toLowerCase()));i(e.slice(0,20)),r=0},500)}}
          @forge-ai-conversations-panel-load-more=${e=>{j(`forge-ai-conversations-panel-load-more`)(e.detail);let{query:n,appendResults:a}=e.detail;setTimeout(()=>{if(n===``){i++;let e=i*20,n=e+20,r=t.slice(e,n);a(r)}else{r++;let e=t.filter(e=>e.title.toLowerCase().includes(n.toLowerCase())),i=r*20,o=i+20,s=e.slice(i,o);a(s)}},500)}}
          @forge-ai-conversations-panel-rename=${j(`forge-ai-conversations-panel-rename`)}
          @forge-ai-conversations-panel-delete=${j(`forge-ai-conversations-panel-delete`)}>
        </forge-ai-conversations-panel>
      </div>
      <div class="conversations-panel-story-notes-narrow">
        <p><strong>Infinite Scroll Demo</strong></p>
        <p>
          Demonstrates infinite scroll for both recent chats and search chats. Scroll to the bottom of the list to load more results. Results load 20 at a time
          with a 500ms delay to simulate async loading.
        </p>
        <p><strong>Features:</strong></p>
        <ul>
          <li>Recent chats: Scroll recent chats list to load more</li>
          <li>Search chats: Click "Search chats", enter a term (try "TypeScript"), and scroll to load more results</li>
          <li>Single load-more event handles both contexts (distinguished by query field)</li>
          <li>Loading spinner shows during fetch</li>
          <li>Pagination stops when all results loaded</li>
          <li>Total dataset: ${120} threads</li>
        </ul>
      </div>
    `}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    selectedThreadId: 'thread-2'
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    threads: []
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    threads: [],
    loading: true
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    threads: [],
    errorMessage: 'Could not load your chats.'
  }
}`,...V.parameters?.docs?.source},description:{story:`A failed load with nothing to fall back on - the error replaces the empty state.`,...V.parameters?.docs?.description}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    threads: [],
    loading: true,
    errorMessage: 'Could not load your chats.'
  }
}`,...H.parameters?.docs?.source},description:{story:"An error supersedes the loading indicator, so a host that leaves `loading` set does not end up\nwith a spinner hiding the failure.",...H.parameters?.docs?.description}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    threads: sampleThreads,
    errorMessage: '403 Forbidden - access to this chat was revoked.'
  }
}`,...U.parameters?.docs?.source},description:{story:`A failure that is not tied to the end of the list - a rejected thread selection, for instance. Threads
stay on screen and the message reads as a compact single line above them.`,...U.parameters?.docs?.description}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    threads: generateThreads(20),
    totalChats: 120
  },
  render: args => html\`
    \${storyStyles}
    <div class="conversations-panel-story-host">
      <forge-ai-conversations-panel
        .threads=\${args.threads}
        total-chats=\${args.totalChats}
        @forge-ai-conversations-panel-retry=\${(e: CustomEvent) => {
    action('forge-ai-conversations-panel-retry')(e);
    const panel = e.target as AiConversationsPanelComponent;
    panel.errorMessage = undefined;
  }}
        @forge-ai-conversations-panel-load-more=\${(e: CustomEvent) => {
    action('forge-ai-conversations-panel-load-more')(e);
    const panel = e.target as AiConversationsPanelComponent;
    // The page never resolves, which is what keeps the failure at the bottom of the list.
    setTimeout(() => {
      panel.errorMessage = 'Could not load more chats.';
    }, 800);
  }}
        @forge-ai-conversations-panel-select=\${action('forge-ai-conversations-panel-select')}
        @forge-ai-conversations-panel-new-chat=\${action('forge-ai-conversations-panel-new-chat')}
        @forge-ai-conversations-panel-close=\${action('forge-ai-conversations-panel-close')}>
      </forge-ai-conversations-panel>
    </div>
  \`
}`,...W.parameters?.docs?.source},description:{story:`A failed "load more" - scroll to the bottom of the list to trigger it. The page was in flight, so the
failure reads at the bottom where the load-more spinner would have been.`,...W.parameters?.docs?.description}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
    threads: sampleThreads
  },
  render: args => html\`
    \${storyStyles}
    <div class="conversations-panel-story-host">
      <forge-ai-conversations-panel
        .threads=\${args.threads}
        .selectedThreadId=\${args.selectedThreadId}
        ?show-thread-rename=\${args.showThreadRename}
        ?show-thread-delete=\${args.showThreadDelete}
        @forge-ai-conversations-panel-select=\${action('forge-ai-conversations-panel-select')}
        @forge-ai-conversations-panel-new-chat=\${action('forge-ai-conversations-panel-new-chat')}
        @forge-ai-conversations-panel-close=\${action('forge-ai-conversations-panel-close')}
        @forge-ai-conversations-panel-search=\${(e: CustomEvent<ForgeAiConversationsPanelSearchEventData>) => {
    action('forge-ai-conversations-panel-search')(e);
  }}
        @forge-ai-conversations-panel-rename=\${action('forge-ai-conversations-panel-rename')}
        @forge-ai-conversations-panel-delete=\${action('forge-ai-conversations-panel-delete')}>
      </forge-ai-conversations-panel>
    </div>
    <div class="conversations-panel-story-notes">
      <p><strong>Local Search (Default)</strong></p>
      <p>Click "Search chats" to enter search chats. Type in the search field - results are filtered locally from recent threads with 300ms debounce.</p>
    </div>
  \`
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    threads: sampleThreads
  },
  render: args => {
    const allThreads: Thread[] = [...sampleThreads, {
      id: 'thread-9',
      title: 'Advanced TypeScript generics tutorial',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      messageCount: 18
    }, {
      id: 'thread-10',
      title: 'Building custom Lit directives',
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      messageCount: 5
    }, {
      id: 'thread-11',
      title: 'TypeScript utility types explained',
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      messageCount: 14
    }, {
      id: 'thread-12',
      title: 'Performance optimization techniques',
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      messageCount: 22
    }];
    const handleSearch = (e: CustomEvent<ForgeAiConversationsPanelSearchEventData>): void => {
      action('forge-ai-conversations-panel-search')(e);
      e.preventDefault();
      const {
        query,
        setResults
      } = e.detail;
      setTimeout(() => {
        const results = allThreads.filter(thread => thread.title.toLowerCase().includes(query.toLowerCase()));
        setResults(results);
      }, 1000);
    };
    return html\`
      \${storyStyles}
      <div class="conversations-panel-story-host">
        <forge-ai-conversations-panel
          .threads=\${args.threads}
          .selectedThreadId=\${args.selectedThreadId}
          ?show-thread-rename=\${args.showThreadRename}
          ?show-thread-delete=\${args.showThreadDelete}
          @forge-ai-conversations-panel-select=\${action('forge-ai-conversations-panel-select')}
          @forge-ai-conversations-panel-new-chat=\${action('forge-ai-conversations-panel-new-chat')}
          @forge-ai-conversations-panel-close=\${action('forge-ai-conversations-panel-close')}
          @forge-ai-conversations-panel-search=\${handleSearch}
          @forge-ai-conversations-panel-rename=\${action('forge-ai-conversations-panel-rename')}
          @forge-ai-conversations-panel-delete=\${action('forge-ai-conversations-panel-delete')}>
        </forge-ai-conversations-panel>
      </div>
      <div class="conversations-panel-story-notes-narrow">
        <p><strong>Async Search (preventDefault)</strong></p>
        <p>
          Click "Search chats" and type in the search field. This story simulates an async search by calling
          <code>preventDefault()</code> on the search event and returning results via the <code>setResults</code>
          callback after 1 second.
        </p>
        <p>
          The component shows a loading spinner while waiting. Results include threads beyond the recent 8 shown in recent chats (12 total searchable threads).
        </p>
      </div>
    \`;
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    threads: []
  },
  render: args => {
    const searchableThreads: Thread[] = [{
      id: 'thread-1',
      title: 'Old conversation about TypeScript',
      createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      messageCount: 25
    }, {
      id: 'thread-2',
      title: 'Archived discussion on web components',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      messageCount: 19
    }];
    const handleSearch = (e: CustomEvent<ForgeAiConversationsPanelSearchEventData>): void => {
      action('forge-ai-conversations-panel-search')(e);
      e.preventDefault();
      const {
        query,
        setResults
      } = e.detail;
      setTimeout(() => {
        const results = searchableThreads.filter(thread => thread.title.toLowerCase().includes(query.toLowerCase()));
        setResults(results);
      }, 800);
    };
    return html\`
      \${storyStyles}
      <div class="conversations-panel-story-host">
        <forge-ai-conversations-panel
          .threads=\${args.threads}
          .selectedThreadId=\${args.selectedThreadId}
          ?show-thread-rename=\${args.showThreadRename}
          ?show-thread-delete=\${args.showThreadDelete}
          @forge-ai-conversations-panel-select=\${action('forge-ai-conversations-panel-select')}
          @forge-ai-conversations-panel-new-chat=\${action('forge-ai-conversations-panel-new-chat')}
          @forge-ai-conversations-panel-close=\${action('forge-ai-conversations-panel-close')}
          @forge-ai-conversations-panel-search=\${handleSearch}
          @forge-ai-conversations-panel-rename=\${action('forge-ai-conversations-panel-rename')}
          @forge-ai-conversations-panel-delete=\${action('forge-ai-conversations-panel-delete')}>
        </forge-ai-conversations-panel>
      </div>
      <div class="conversations-panel-story-notes-narrow">
        <p><strong>No Recent Threads + Async Search</strong></p>
        <p>No recent threads are shown in recent chats. Click "Search chats" to search through older archived conversations.</p>
      </div>
    \`;
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    threads: generateThreads(20)
  },
  render: args => {
    const TOTAL_THREADS = 120;
    const PAGE_SIZE = 20;
    const allThreads = generateThreads(TOTAL_THREADS);
    let searchChatsCurrentPage = 0;
    let recentChatsCurrentPage = 1;
    const handleSearch = (e: CustomEvent<ForgeAiConversationsPanelSearchEventData>): void => {
      action('forge-ai-conversations-panel-search')(e.detail);
      e.preventDefault();
      const {
        query,
        setResults
      } = e.detail;
      setTimeout(() => {
        const filtered = allThreads.filter(t => t.title.toLowerCase().includes(query.toLowerCase()));
        setResults(filtered.slice(0, PAGE_SIZE));
        searchChatsCurrentPage = 0;
      }, 500);
    };
    const handleLoadMore = (e: CustomEvent<ForgeAiConversationsPanelLoadMoreEventData>): void => {
      action('forge-ai-conversations-panel-load-more')(e.detail);
      const {
        query,
        appendResults
      } = e.detail;
      setTimeout(() => {
        if (query === '') {
          recentChatsCurrentPage++;
          const start = recentChatsCurrentPage * PAGE_SIZE;
          const end = start + PAGE_SIZE;
          const nextPage = allThreads.slice(start, end);
          appendResults(nextPage);
        } else {
          searchChatsCurrentPage++;
          const filtered = allThreads.filter(t => t.title.toLowerCase().includes(query.toLowerCase()));
          const start = searchChatsCurrentPage * PAGE_SIZE;
          const end = start + PAGE_SIZE;
          const nextPage = filtered.slice(start, end);
          appendResults(nextPage);
        }
      }, 500);
    };
    return html\`
      \${storyStyles}
      <div class="conversations-panel-story-host">
        <forge-ai-conversations-panel
          .threads=\${args.threads}
          total-chats=\${TOTAL_THREADS}
          .selectedThreadId=\${args.selectedThreadId}
          ?show-thread-rename=\${args.showThreadRename}
          ?show-thread-delete=\${args.showThreadDelete}
          @forge-ai-conversations-panel-select=\${action('forge-ai-conversations-panel-select')}
          @forge-ai-conversations-panel-new-chat=\${action('forge-ai-conversations-panel-new-chat')}
          @forge-ai-conversations-panel-close=\${action('forge-ai-conversations-panel-close')}
          @forge-ai-conversations-panel-search=\${handleSearch}
          @forge-ai-conversations-panel-load-more=\${handleLoadMore}
          @forge-ai-conversations-panel-rename=\${action('forge-ai-conversations-panel-rename')}
          @forge-ai-conversations-panel-delete=\${action('forge-ai-conversations-panel-delete')}>
        </forge-ai-conversations-panel>
      </div>
      <div class="conversations-panel-story-notes-narrow">
        <p><strong>Infinite Scroll Demo</strong></p>
        <p>
          Demonstrates infinite scroll for both recent chats and search chats. Scroll to the bottom of the list to load more results. Results load 20 at a time
          with a 500ms delay to simulate async loading.
        </p>
        <p><strong>Features:</strong></p>
        <ul>
          <li>Recent chats: Scroll recent chats list to load more</li>
          <li>Search chats: Click "Search chats", enter a term (try "TypeScript"), and scroll to load more results</li>
          <li>Single load-more event handles both contexts (distinguished by query field)</li>
          <li>Loading spinner shows during fetch</li>
          <li>Pagination stops when all results loaded</li>
          <li>Total dataset: \${TOTAL_THREADS} threads</li>
        </ul>
      </div>
    \`;
  }
}`,...J.parameters?.docs?.source}}},Y=[`Demo`,`WithSelectedThread`,`EmptyState`,`Loading`,`ErrorState`,`ErrorStateWhileLoading`,`ErrorAboveList`,`LoadMoreErrorState`,`WithLocalSearch`,`WithAsyncSearch`,`WithNoRecentThreads`,`WithInfiniteScroll`]})))()}export{X as i,L as n,V as r,A as t};