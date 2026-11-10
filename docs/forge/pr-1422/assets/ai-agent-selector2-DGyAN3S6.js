import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,t as n}from"./lit-html-SpIZ5SkX.js";import{T as r,_ as i,g as a}from"./iframe-BbUsXXnT.js";import{t as o}from"./decorate-2OK4V6AF.js";import{d as s,l as c,o as l,p as u,t as d}from"./decorators-Ci1onliJ.js";import{t as f}from"./tooltip2-DY1gJCOv.js";import{n as p}from"./when-Daf2bbVy.js";import{t as m}from"./class-map-DEew1OiS.js";import{t as h}from"./class-map-8zp5OV2u.js";import{r as g}from"./dom-C1zFLlWW.js";import{t as _}from"./popover2-D6Q2Bx2Y.js";var v;function y(){return(y=e((()=>{v=`/**
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
:host {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  min-width: 0;
  position: relative;
}

.title-text,
.trigger-text {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-heading3-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-heading3-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading3-font-size-scale, 1.125)));
  font-weight: var(--forge-typography-heading3-font-weight, 500);
  line-height: var(--forge-typography-heading3-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading3-line-height-scale, 1.375)));
  letter-spacing: var(--forge-typography-heading3-letter-spacing, 0.0083333333em);
  text-transform: var(--forge-typography-heading3-text-transform, inherit);
  text-decoration: var(--forge-typography-heading3-text-decoration, inherit);
  font-weight: 500;
  color: var(--forge-theme-on-surface, #000000);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

.title-text {
  display: block;
}

.trigger-button {
  --forge-state-layer-hover-opacity: 0.04;
  --forge-focus-indicator-outward-offset: 0px;
}

.dropdown-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  fill: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
  transition: transform 150ms ease;
  margin-inline-end: -6px;
}
:host(:state(open)) .dropdown-icon {
  transform: rotate(180deg);
}

.agent-list::-webkit-scrollbar {
  height: var(--forge-scrollbar-height, 16px);
  width: var(--forge-scrollbar-width, 16px);
}
.agent-list::-webkit-scrollbar-track {
  background-color: var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb));
}
.agent-list::-webkit-scrollbar-track:hover {
  background-color: var(--forge-scrollbar-track-container-hover, var(--forge-theme-surface-container-low, #ebebeb));
}
.agent-list::-webkit-scrollbar-corner {
  background-color: var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb));
}
.agent-list::-webkit-scrollbar-thumb {
  height: var(--forge-scrollbar-thumb-min-height, 32px);
  width: var(--forge-scrollbar-thumb-min-width, 32px);
  border-radius: var(--forge-scrollbar-border-radius, calc(var(--forge-shape-full, 9999px) * var(--forge-shape-factor, 1)));
  border-width: var(--forge-scrollbar-border-width, 3px);
  border-style: solid;
  border-color: transparent;
  background-color: var(--forge-scrollbar-thumb-container, var(--forge-theme-surface-container-medium, #c2c2c2));
  background-clip: content-box;
}
.agent-list::-webkit-scrollbar-thumb:hover {
  background-color: var(--forge-scrollbar-thumb-container-hover, var(--forge-theme-surface-container-high, #9e9e9e));
}
.agent-list {
  min-width: 256px;
  max-width: 400px;
  max-height: 300px;
  overflow-y: auto;
  padding: var(--forge-spacing-xxsmall, 4px) 0 var(--forge-spacing-xxsmall, 4px);
}

.agent-item {
  --_list-item-background: var(--forge-list-item-background, transparent);
  --_list-item-shape: var(--forge-list-item-shape, 0);
  --_list-item-padding: var(--forge-list-item-padding, 0 var(--forge-spacing-medium, 16px));
  --_list-item-margin: var(--forge-list-item-margin, 0);
  --_list-item-height: var(--forge-list-item-height, 48px);
  --_list-item-dense-height: var(--forge-list-item-dense-height, 32px);
  --_list-item-indent: var(--forge-list-item-indent, var(--forge-spacing-xxlarge, 48px));
  --_list-item-cursor: var(--forge-list-item-cursor, pointer);
  --_list-item-gap: var(--forge-list-item-gap, var(--forge-spacing-large, 24px));
  --_list-item-text-color: var(--forge-list-item-text-color, var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6)));
  --_list-item-text-font-size: var(--forge-list-item-text-font-size, var(--forge-typography-body2-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 1))));
  --_list-item-text-font-weight: var(--forge-list-item-text-font-weight, var(--forge-typography-body2-font-weight, 400));
  --_list-item-text-line-height: var(--forge-list-item-text-line-height, 1.5rem);
  --_list-item-selected-color: var(--forge-list-item-selected-color, var(--forge-theme-primary, #3f51b5));
  --_list-item-selected-background: var(--forge-list-item-selected-background, var(--_list-item-selected-color));
  --_list-item-selected-opacity: var(--forge-list-item-selected-opacity, 0.08);
  --_list-item-selected-start-color: var(--forge-list-item-selected-start-color, var(--_list-item-selected-color));
  --_list-item-selected-end-color: var(--forge-list-item-selected-end-color, var(--_list-item-selected-color));
  --_list-item-selected-text-color: var(--forge-list-item-selected-text-color, var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6)));
  --_list-item-disabled-opacity: var(--forge-list-item-disabled-opacity, 0.38);
  --_list-item-disabled-cursor: var(--forge-list-item-disabled-cursor, not-allowed);
  --_list-item-one-line-height: var(--forge-list-item-one-line-height, var(--_list-item-height));
  --_list-item-two-line-height: var(--forge-list-item-two-line-height, var(--forge-list-item-height, 72px));
  --_list-item-three-line-height: var(--forge-list-item-three-line-height, var(--forge-list-item-height, 88px));
  --_list-item-dense-one-line-height: var(--forge-list-item-dense-one-line-height, var(--_list-item-dense-height));
  --_list-item-dense-two-line-height: var(--forge-list-item-dense-two-line-height, var(--forge-list-item-dense-height, 56px));
  --_list-item-dense-three-line-height: var(--forge-list-item-dense-three-line-height, var(--forge-list-item-dense-height, 72px));
  --_list-item-dense-font-size: var(--forge-list-item-dense-font-size, 0.875rem);
  --_list-item-dense-indent: var(--forge-list-item-dense-indent, var(--forge-spacing-xxlarge, 48px));
  --_list-item-dense-gap: var(--forge-list-item-dense-gap, var(--forge-spacing-xsmall, 8px));
  --_list-item-start-selected-color: var(--forge-list-item-start-selected-color, var(--_list-item-selected-color));
  --_list-item-end-selected-color: var(--forge-list-item-end-selected-color, var(--_list-item-selected-color));
  --_list-item-wrap-padding: var(--forge-list-item-wrap-padding, var(--forge-spacing-xsmall, 8px) var(--forge-spacing-medium, 16px));
  position: relative;
  display: flex;
  gap: var(--_list-item-gap);
  align-items: center;
  box-sizing: border-box;
  outline: none;
  text-decoration: none;
  border-radius: var(--_list-item-shape);
  -webkit-tap-highlight-color: transparent;
  background-color: var(--_list-item-background);
  height: var(--_list-item-height);
  min-height: var(--_list-item-height);
  padding: var(--_list-item-padding);
  margin: var(--_list-item-margin);
  --_list-item-gap: var(--_list-item-dense-gap);
  height: var(--_list-item-dense-one-line-height);
  min-height: var(--_list-item-dense-one-line-height);
  --_state-layer-display: var(--forge-state-layer-display, flex);
  --_state-layer-color: var(--forge-state-layer-color, var(--forge-theme-on-surface, #000000));
  --_state-layer-hover-color: var(--forge-state-layer-hover-color, var(--_state-layer-color));
  --_state-layer-hover-opacity: var(--forge-state-layer-hover-opacity, 0.08);
  --_state-layer-pressed-color: var(--forge-state-layer-pressed-color, var(--_state-layer-color));
  --_state-layer-pressed-opacity: var(--forge-state-layer-pressed-opacity, 0.12);
  --_state-layer-hover-duration: var(--forge-state-layer-hover-duration, 15ms);
  --_state-layer-pressed-duration: var(--forge-state-layer-pressed-duration, 105ms);
  --_state-layer-animation-duration: var(--forge-state-layer-animation-duration, 375ms);
}
.agent-item::before {
  opacity: 0;
  position: absolute;
  backface-visibility: hidden;
  transform: translateZ(0);
  background-color: var(--_state-layer-hover-color);
  inset: 0;
  transition: opacity var(--_state-layer-hover-duration) linear, background-color var(--_state-layer-hover-duration) linear;
  --_state-layer-hover-duration: var(--forge-state-layer-hover-duration, 100ms);
  content: "";
  opacity: 0;
  border-radius: inherit;
}
.agent-item:hover::before {
  background-color: var(--_state-layer-hover-color);
  opacity: var(--_state-layer-hover-opacity);
}
.agent-item:active::before {
  opacity: var(--_state-layer-pressed-opacity);
  transition-duration: var(--_state-layer-pressed-duration);
  --_state-layer-pressed-opacity: var(--forge-state-layer-pressed-opacity, 0.18);
}
.agent-item {
  --forge-list-item-padding: 0 var(--forge-spacing-xxsmall, 4px);
  cursor: pointer;
}
.agent-item:focus-visible {
  outline: 2px solid var(--forge-theme-primary, #3f51b5);
  outline-offset: -2px;
}
.agent-item--focused {
  background-color: var(--forge-theme-surface-container-low, #ebebeb);
}
.agent-item--selected {
  color: var(--_list-item-selected-color);
}
.agent-item--selected::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: var(--_list-item-selected-opacity);
  background-color: var(--_list-item-selected-background);
  pointer-events: none;
}
.agent-item--selected {
  --forge-state-layer-color: var(--_list-item-selected-color);
}
.agent-item--selected .agent-name {
  font-weight: 500;
}
.agent-item__selection-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: var(--forge-spacing-medium, 16px);
}

.selection-icon {
  fill: currentColor;
  width: 16px;
  height: 16px;
}

.agent-list-separator {
  height: 1px;
  background-color: var(--forge-theme-outline, #e0e0e0);
  margin: var(--forge-spacing-xxsmall, 4px) 0;
}

.agent-name {
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
  font-size: var(--_list-item-dense-font-size);
}

.dropdown-header {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-heading1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-heading1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading1-font-size-scale, 0.875)));
  font-weight: var(--forge-typography-heading1-font-weight, 500);
  line-height: var(--forge-typography-heading1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading1-line-height-scale, 1.125)));
  letter-spacing: var(--forge-typography-heading1-letter-spacing, 0.0178571429em);
  text-transform: var(--forge-typography-heading1-text-transform, inherit);
  text-decoration: var(--forge-typography-heading1-text-decoration, inherit);
  padding: var(--forge-spacing-small, 12px) var(--forge-spacing-small, 12px) var(--forge-spacing-xxsmall, 4px);
}

.filter-field {
  padding: var(--forge-spacing-xsmall, 8px) var(--forge-spacing-small, 12px) var(--forge-spacing-small, 12px);
  border-bottom: 1px solid var(--forge-theme-outline, #e0e0e0);
}

.search-icon {
  width: 24px;
  height: 24px;
  fill: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
}

.no-results {
  padding: var(--forge-spacing-small, 12px);
  color: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
  text-align: center;
}`})))()}var b,x,S;function C(){return(C=e((()=>{f(),_(),y(),a(),d(),h(),b=`forge-ai-agent-selector`,x=5,S=class extends i{static{this.styles=r(v)}#e;constructor(){super(),this.agents=[],this.titleText=`AI Assistant`,this.disabled=!1,this._open=!1,this._focusedIndex=-1,this._isTextOverflowing=!1,this._filterValue=``,this.#e=this.attachInternals()}get#t(){return this.agents.find(e=>e.id===this.selectedAgentId)}get#n(){return this.titleText||`AI Assistant`}get#r(){return this.#t?.name??this.#n}get#i(){return this.agents.length>0}get#a(){return this.agents.length>x}get#o(){if(!this._filterValue.trim())return this.agents;let e=this._filterValue.toLowerCase();return this.agents.filter(t=>t.name.toLowerCase().includes(e))}get#s(){let e=this.#t;return e?e.description?`${e.name}\n${e.description}`:e.name:this.#n}willUpdate(e){e.has(`_open`)&&g(this.#e,`open`,this._open)}updated(e){(e.has(`selectedAgentId`)||e.has(`titleText`)||e.has(`agents`))&&this.#c()}#c(){requestAnimationFrame(()=>{let e=this.shadowRoot?.querySelector(`.trigger-text, .title-text`);if(e){let t=e.scrollWidth>e.offsetWidth;this._isTextOverflowing!==t&&(this._isTextOverflowing=t)}})}#l(){this.disabled||(this._open=!this._open,this._open&&(this._focusedIndex=-1))}#u(e){this._open=e.detail.open,this._open?(this.#g(),this.#h()):(this._focusedIndex=-1,this._filterValue=``,this._triggerButton?.focus())}#d(e){this._filterValue=e.target.value,this._focusedIndex=-1}#f(e){if(!this.disabled)switch(e.key){case`Enter`:case` `:e.target===this._triggerButton?(e.preventDefault(),this._open=!0):e.key===`Enter`&&this._open&&(e.preventDefault(),this._focusedIndex===-1?this.#y():this._focusedIndex>=0&&this.#_(this.#o[this._focusedIndex]));break;case`Escape`:this._open&&(e.preventDefault(),e.stopPropagation(),this._open=!1,this._triggerButton?.focus());break;case`ArrowDown`:e.preventDefault(),this._open?this.#p(1):e.target===this._triggerButton&&(this._open=!0);break;case`ArrowUp`:e.preventDefault(),this._open&&this.#p(-1);break;case`Home`:this._open&&(e.preventDefault(),this._focusedIndex=-1,this.#m());break;case`End`:this._open&&(e.preventDefault(),this._focusedIndex=this.#o.length-1,this.#m())}}#p(e){let t=this.#o,n=this._focusedIndex+e;n<-1?n=t.length-1:n>=t.length&&(n=-1),this._focusedIndex=n,this.#m()}#m(){let e=this._agentList?.querySelectorAll(`.agent-item`),t=this.shadowRoot?.activeElement===this._filterInput,n=this._focusedIndex+1;e?.forEach((e,r)=>{e.setAttribute(`tabindex`,r===n?`0`:`-1`),r===n&&(e.scrollIntoView({block:`nearest`}),t||e.focus())})}#h(){requestAnimationFrame(()=>{this.#a&&this._filterInput?this._filterInput.focus():(this._focusedIndex=-1,this.#m())})}async#g(){if(await this.updateComplete,!this._agentList)return;let e=this._agentList.querySelector(`.agent-item--selected`);e?e.scrollIntoView({block:`nearest`}):this._agentList.scrollTop=0}#_(e){let t=this.selectedAgentId;e.id===t||this.dispatchEvent(new CustomEvent(`forge-ai-agent-selector-change`,{detail:{agent:e,previousAgentId:t},bubbles:!0,composed:!0})),this._open=!1}#v(e){this.#_(e)}#y(){this.#C||this.dispatchEvent(new CustomEvent(`forge-ai-agent-selector-change`,{detail:{agent:void 0,previousAgentId:this.selectedAgentId},bubbles:!0,composed:!0})),this._open=!1}get#b(){return t`
      <button
        class="forge-button trigger-button"
        id="agent-selector-trigger"
        ?disabled=${this.disabled}
        aria-haspopup="listbox"
        aria-expanded=${this._open}
        @click=${this.#l}
        @keydown=${this.#f}>
        <slot name="icon"></slot>
        <span class="trigger-text">${this.#r}</span>
        <svg class="dropdown-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>
    `}get#x(){return this._isTextOverflowing?t` <forge-ai-tooltip for="agent-selector-trigger" placement="bottom"> ${this.#s} </forge-ai-tooltip> `:n}get#S(){return t`
      <div class="filter-field">
        <div class="forge-field forge-field--small">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="search-icon" aria-hidden="true">
            <path
              d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14" />
          </svg>
          <input
            type="text"
            class="filter-input"
            placeholder="Search agents..."
            .value=${this._filterValue}
            @input=${this.#d}
            @keydown=${this.#f} />
        </div>
      </div>
    `}get#C(){return this.selectedAgentId===void 0}get#w(){let e=this._focusedIndex===-1&&this._open;return t`
      <div
        class=${m({"agent-item":!0,"agent-item--default":!0,"agent-item--focused":e,"agent-item--selected":this.#C})}
        role="option"
        tabindex=${e?`0`:`-1`}
        aria-selected=${this.#C}
        @click=${this.#y}>
        <span class="agent-item__selection-icon">
          ${p(this.#C,()=>t`
              <svg class="selection-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21 7 9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59z" />
              </svg>
            `)}
        </span>
        <span class="agent-name">${this.#n} (default)</span>
      </div>
      <div class="agent-list-separator" aria-hidden="true"></div>
    `}get#T(){let e=this.#o;return e.length===0?t`<div class="no-results">No agents found</div>`:t`
      ${e.map((e,n)=>t`
          <div
            class=${m({"agent-item":!0,"agent-item--focused":n===this._focusedIndex,"agent-item--selected":e.id===this.selectedAgentId})}
            role="option"
            tabindex=${n===this._focusedIndex?`0`:`-1`}
            aria-selected=${e.id===this.selectedAgentId}
            @click=${()=>this.#v(e)}>
            <span class="agent-item__selection-icon">
              ${p(e.id===this.selectedAgentId,()=>t`
                  <svg class="selection-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21 7 9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59z" />
                  </svg>
                `)}
            </span>
            <span class="agent-name">${e.name}</span>
          </div>
        `)}
    `}get#E(){return t`
      <forge-ai-popover
        .anchor=${this._triggerButton??null}
        placement="bottom-start"
        ?open=${this._open}
        .offset=${{mainAxis:4}}
        flip
        shift
        @forge-ai-popover-toggle=${this.#u}>
        <div class="dropdown-header">Switch to another agent</div>
        ${p(this.#a,()=>this.#S)}
        <div class="agent-list" role="listbox" aria-label="Select an agent" @keydown=${this.#f}>
          ${this.#w} ${this.#T}
        </div>
      </forge-ai-popover>
    `}get#D(){return t`<span class="title-text" id="agent-selector-trigger">${this.titleText}</span>`}render(){return t`
      ${p(this.#i,()=>t` ${this.#b} ${this.#x} ${this.#E} `,()=>this.#D)}
    `}},o([s({attribute:!1})],S.prototype,`agents`,void 0),o([s({attribute:`selected-agent-id`})],S.prototype,`selectedAgentId`,void 0),o([s({attribute:`title-text`})],S.prototype,`titleText`,void 0),o([s({type:Boolean,reflect:!0})],S.prototype,`disabled`,void 0),o([c()],S.prototype,`_open`,void 0),o([c()],S.prototype,`_focusedIndex`,void 0),o([c()],S.prototype,`_isTextOverflowing`,void 0),o([c()],S.prototype,`_filterValue`,void 0),o([l(`#agent-selector-trigger`)],S.prototype,`_triggerButton`,void 0),o([l(`.agent-list`)],S.prototype,`_agentList`,void 0),o([l(`.filter-input`)],S.prototype,`_filterInput`,void 0),S=o([u(b)],S)})))()}export{C as t};