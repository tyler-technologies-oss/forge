import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,t as n}from"./lit-html-SpIZ5SkX.js";import{T as r,_ as i,g as a}from"./iframe-BbUsXXnT.js";import{t as o}from"./decorate-2OK4V6AF.js";import{d as s,p as c,t as l}from"./decorators-Ci1onliJ.js";import{n as u}from"./when-Daf2bbVy.js";var d;function f(){return(f=e((()=>{d=`/**
 * @license
 * Copyright Tyler Technologies, Inc.
 * License: Apache-2.0
 */
.forge-inline-message {
  --_inline-message-background:var(--forge-inline-message-background, var(--forge-theme-info-container-low, #e3edf7));
  --_inline-message-color:var(--forge-inline-message-color, var(--forge-theme-text-high, rgba(0, 0, 0, 0.87)));
  --_inline-message-shape:var(--forge-inline-message-shape, calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1)));
  --_inline-message-padding:var(--forge-inline-message-padding, var(--forge-spacing-small, 12px));
  --_inline-message-padding-inline:var(--forge-inline-message-padding-inline, var(--_inline-message-padding));
  --_inline-message-padding-block:var(--forge-inline-message-padding-block, var(--_inline-message-padding));
  --_inline-message-border-width:var(--forge-inline-message-border-width, var(--forge-border-thin, 1px));
  --_inline-message-border-style:var(--forge-inline-message-border-style, none);
  --_inline-message-border-color:var(--forge-inline-message-border-color, var(--forge-theme-info-container, #c7daf0));
  --_inline-message-gap:var(--forge-inline-message-gap, var(--forge-spacing-small, 12px));
  --_inline-message-icon-gap:var(--forge-inline-message-icon-gap, var(--_inline-message-gap));
  --_inline-message-content-gap:var(--forge-inline-message-content-gap, var(--_inline-message-gap));
  --_inline-message-icon-color:var(--forge-inline-message-icon-color, var(--forge-theme-on-info-container-low, #0b3768));
}

.forge-inline-message {
  display: block;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-body1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-body1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 0.875)));
  font-weight: var(--forge-typography-body1-font-weight, 400);
  line-height: var(--forge-typography-body1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.125)));
  letter-spacing: var(--forge-typography-body1-letter-spacing, 0.0357142857em);
  text-transform: var(--forge-typography-body1-text-transform, inherit);
  text-decoration: var(--forge-typography-body1-text-decoration, inherit);
  background: var(--_inline-message-background);
  color: var(--_inline-message-color);
  border-radius: var(--_inline-message-shape);
  border-width: var(--_inline-message-border-width);
  border-style: var(--_inline-message-border-style);
  border-color: var(--_inline-message-border-color);
  display: flex;
  align-items: center;
  gap: var(--_inline-message-icon-gap);
  box-sizing: border-box;
  padding-inline: var(--_inline-message-padding-inline);
  padding-block: var(--_inline-message-padding-block);
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
}

.forge-inline-message:not(:has(.forge-inline-message__icon)) {
  grid-template-columns: 1fr;
}

.forge-inline-message__title {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-heading1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-heading1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading1-font-size-scale, 0.875)));
  font-weight: var(--forge-typography-heading1-font-weight, 500);
  line-height: var(--forge-typography-heading1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading1-line-height-scale, 1.125)));
  letter-spacing: var(--forge-typography-heading1-letter-spacing, 0.0178571429em);
  text-transform: var(--forge-typography-heading1-text-transform, inherit);
  text-decoration: var(--forge-typography-heading1-text-decoration, inherit);
}

.forge-inline-message__icon {
  color: var(--_inline-message-icon-color);
  align-self: start;
  grid-row: 1/span 2;
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
  display: block;
}

.forge-inline-message {
  --forge-inline-message-border-style: solid;
}
.forge-inline-message__title {
  font-weight: bold;
}
.forge-inline-message__content {
  display: flex;
  flex-direction: column;
  gap: var(--forge-spacing-xsmall, 8px);
  overflow-wrap: anywhere;
}
.forge-inline-message:not(:has(.forge-inline-message__title)) .forge-inline-message__icon {
  align-self: center;
}
.forge-inline-message:not(:has(.forge-inline-message__title)) .forge-inline-message__content {
  grid-row: 1/-1;
  align-self: center;
}

:host([kind=info]) .forge-inline-message {
  --forge-inline-message-background: var(--forge-theme-info-container-low, #e3edf7);
  --forge-inline-message-color: var(--forge-theme-on-info-container-low, #0b3768);
  --forge-inline-message-icon-color: var(--forge-theme-on-info-container-low, #0b3768);
  --forge-inline-message-border-color: var(--forge-theme-info-container, #c7daf0);
}

:host([kind=warning]) .forge-inline-message {
  --forge-inline-message-background: var(--forge-theme-warning-container-low, #f9e9e0);
  --forge-inline-message-color: var(--forge-theme-on-warning-container-low, #712700);
  --forge-inline-message-icon-color: var(--forge-theme-on-warning-container-low, #712700);
  --forge-inline-message-border-color: var(--forge-theme-warning-container, #f4d3c2);
}

:host([kind=error]) .forge-inline-message {
  --forge-inline-message-background: var(--forge-theme-error-container-low, #f6e0e4);
  --forge-inline-message-color: var(--forge-theme-on-error-container-low, #5f0011);
  --forge-inline-message-icon-color: var(--forge-theme-on-error-container-low, #5f0011);
  --forge-inline-message-border-color: var(--forge-theme-error-container, #ecc2c9);
}

:host([kind=success]) .forge-inline-message {
  --forge-inline-message-background: var(--forge-theme-success-container-low, #e6efe6);
  --forge-inline-message-color: var(--forge-theme-on-success-container-low, #19441b);
  --forge-inline-message-icon-color: var(--forge-theme-on-success-container-low, #19441b);
  --forge-inline-message-border-color: var(--forge-theme-success-container, #cde0ce);
}

.client-message--text {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-subheading2-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-subheading2-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-subheading2-font-size-scale, 1)));
  font-weight: var(--forge-typography-subheading2-font-weight, 400);
  line-height: var(--forge-typography-subheading2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-subheading2-line-height-scale, 1.25)));
  letter-spacing: var(--forge-typography-subheading2-letter-spacing, normal);
  text-transform: var(--forge-typography-subheading2-text-transform, inherit);
  text-decoration: var(--forge-typography-subheading2-text-decoration, inherit);
  display: flex;
  flex-direction: column;
  gap: var(--forge-spacing-xxsmall, 4px);
  padding-block: var(--forge-spacing-small, 12px);
  color: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
  font-style: italic;
}

.client-message__actions {
  display: flex;
  gap: var(--forge-spacing-xsmall, 8px);
  font-style: normal;
}
.client-message__actions .forge-button {
  --forge-button-outlined-color: currentColor;
  --forge-button-outlined-border-color: currentColor;
}`})))()}var p,m,h;function g(){return(g=e((()=>{f(),a(),l(),p=`forge-ai-client-message`,m={info:`M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8`,warning:`M12 2 1 21h22zm0 3.99L19.53 19H4.47zM11 10v4h2v-4zm0 6v2h2v-2z`,error:`M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 15h-2v-2h2zm0-4h-2V7h2z`,success:`M21 7 9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59z`},h=class extends i{constructor(...e){super(...e),this.kind=`text`,this.content=``,this.actions=[]}static{this.styles=r(d)}get#e(){return this.kind===`text`?n:t`
      <svg
        class="forge-inline-message__icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height="24"
        width="24"
        fill="currentColor"
        aria-hidden="true">
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="${m[this.kind]}" />
      </svg>
    `}get#t(){return u(this.actions.length>0,()=>t`
        <div class="client-message__actions">
          ${this.actions.map(e=>t`<button type="button" class="forge-button forge-button--outlined forge-button--dense" @click=${()=>e.onClick()}>
                ${e.label}
              </button>`)}
        </div>
      `)}render(){return this.kind===`text`?t`
        <div class="client-message--text">
          <span>${this.content}</span>
          ${this.#t}
        </div>
      `:t`
      <div class="forge-inline-message">
        ${this.#e} ${u(this.header,()=>t`<div class="forge-inline-message__title">${this.header}</div>`)}
        <div class="forge-inline-message__content">
          <span>${this.content}</span>
          ${this.#t}
        </div>
      </div>
    `}},o([s({type:String,reflect:!0})],h.prototype,`kind`,void 0),o([s({type:String})],h.prototype,`header`,void 0),o([s({type:String})],h.prototype,`content`,void 0),o([s({attribute:!1})],h.prototype,`actions`,void 0),h=o([c(p)],h)})))()}function _(){return(_=e((()=>{g()})))()}export{_ as t};