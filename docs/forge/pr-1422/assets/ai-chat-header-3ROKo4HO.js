import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t}from"./lit-html-SpIZ5SkX.js";import{T as n,_ as r,g as i}from"./iframe-BbUsXXnT.js";import{t as a}from"./decorate-2OK4V6AF.js";import{d as o,l as s,p as c,t as l}from"./decorators-Ci1onliJ.js";import{t as u}from"./tooltip2-DY1gJCOv.js";import{n as d}from"./when-Daf2bbVy.js";import{t as f}from"./ai-agent-info2-DL4hLVg_.js";import{t as p}from"./ai-agent-selector2-DGyAN3S6.js";import{t as m}from"./ai-icon2-DuX-CLU9.js";import{i as h,n as g,t as _}from"./ref-CKV-hb40.js";import{i as v,r as y,t as b}from"./static-html-iYeS79sO.js";import{r as x,t as S}from"./ai-dropdown-menu2-DmqD-B7h.js";import{t as C}from"./ai-dropdown-menu-item2-DngFzoLY.js";import{t as w}from"./ai-modal2-gNN0mfE2.js";var T;function E(){return(E=e((()=>{T=`/**
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
.forge-scaffold {
  --_scaffold-height:var(--forge-scaffold-height, 100%);
  --_scaffold-width:var(--forge-scaffold-width, 100%);
  --_scaffold-overflow:var(--forge-scaffold-overflow, initial);
  --_scaffold-body-position:var(--forge-scaffold-body-position, relative);
}

.forge-scaffold {
  position: relative;
  display: grid;
  grid-template-areas: "left header right" "left body right" "left footer right";
  grid-template-rows: auto 1fr auto;
  grid-template-columns: auto 1fr auto;
  height: var(--_scaffold-height);
  width: var(--_scaffold-width);
  overflow: var(--_scaffold-overflow);
}

.forge-scaffold--viewport {
  --_scaffold-height:var(--forge-scaffold-height, 100dvh);
  --_scaffold-width:var(--forge-scaffold-width, 100dvw);
}

.forge-scaffold__left {
  grid-area: left;
}

.forge-scaffold__right {
  grid-area: right;
}

.forge-scaffold__header {
  grid-area: header;
  min-width: 0;
  min-height: 0;
}

.forge-scaffold__body {
  position: var(--_scaffold-body-position);
  grid-area: body;
  min-width: 0;
  min-height: 0;
  overflow: var(--_scaffold-overflow);
}

.forge-scaffold__body > * {
  overflow: auto;
}

.forge-scaffold__footer {
  grid-area: footer;
}

.forge-scaffold__left > *, .forge-scaffold__right > *, .forge-scaffold__header > *, .forge-scaffold__body > *, .forge-scaffold__footer > * {
  min-width: 0;
  min-height: 0;
}

/**
 * @license
 * Copyright Tyler Technologies, Inc.
 * License: Apache-2.0
 */
.forge-toolbar {
  --_toolbar-background:var(--forge-toolbar-background, var(--forge-theme-surface, #ffffff));
  --_toolbar-height:var(--forge-toolbar-height, 56px);
  --_toolbar-min-height:var(--forge-toolbar-min-height, var(--_toolbar-height));
  --_toolbar-divider-width:var(--forge-toolbar-divider-width, var(--forge-border-thin, 1px));
  --_toolbar-divider-style:var(--forge-toolbar-divider-style, solid);
  --_toolbar-divider-color:var(--forge-toolbar-divider-color, var(--forge-theme-outline, #e0e0e0));
  --_toolbar-shape:var(--forge-toolbar-shape, calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1)));
  --_toolbar-start-start-shape:var(--forge-toolbar-start-start-shape, var(--_toolbar-shape));
  --_toolbar-start-end-shape:var(--forge-toolbar-start-end-shape, var(--_toolbar-shape));
  --_toolbar-end-start-shape:var(--forge-toolbar-end-start-shape, 0);
  --_toolbar-end-end-shape:var(--forge-toolbar-end-end-shape, 0);
  --_toolbar-padding:var(--forge-toolbar-padding, var(--forge-spacing-medium, 16px));
  --_toolbar-padding-block:var(--forge-toolbar-padding-block, 0);
  --_toolbar-padding-inline:var(--forge-toolbar-padding-inline, var(--_toolbar-padding));
  --_toolbar-columns:var(--forge-toolbar-columns, auto 1fr auto);
}

.forge-toolbar {
  display: grid;
  grid-template-columns: var(--_toolbar-columns);
  height: var(--_toolbar-height);
  min-height: var(--_toolbar-min-height);
  box-sizing: border-box;
  padding-inline: 0;
  border-block-end-width: var(--_toolbar-divider-width);
  border-block-end-style: var(--_toolbar-divider-style);
  border-block-end-color: var(--_toolbar-divider-color);
  border-start-start-radius: var(--_toolbar-start-start-shape);
  border-start-end-radius: var(--_toolbar-start-end-shape);
  border-end-start-radius: var(--_toolbar-end-start-shape);
  border-end-end-radius: var(--_toolbar-end-end-shape);
  background: var(--_toolbar-background);
  grid-template-columns: 1fr;
  grid-template-areas: "start";
}

.forge-toolbar:has(.forge-toolbar__center), .forge-toolbar:has(.forge-toolbar__end) {
  grid-template-columns: auto 1fr auto;
  grid-template-areas: "start center end";
}

.forge-toolbar:has(.forge-toolbar__end):not(:has(.forge-toolbar__center)) {
  grid-template-columns: 1fr auto;
  grid-template-areas: "start end";
}

.forge-toolbar--inverted {
  --_toolbar-start-start-shape:var(--forge-toolbar-start-start-shape, 0);
  --_toolbar-start-end-shape:var(--forge-toolbar-start-end-shape, 0);
  --_toolbar-end-start-shape:var(--_toolbar-shape);
  --_toolbar-end-end-shape:var(--_toolbar-shape);
  border-block-end: none;
  border-block-start-width: var(--_toolbar-divider-width);
  border-block-start-style: var(--_toolbar-divider-style);
  border-block-start-color: var(--_toolbar-divider-color);
}

.forge-toolbar--no-divider {
  border: none;
}

.forge-toolbar--auto-height {
  --_toolbar-height:var(--forge-toolbar-height, auto);
}

.forge-toolbar :where(h1, h2, h3, h4, h5, h6) {
  margin: 0;
}

.forge-toolbar__start, .forge-toolbar__center, .forge-toolbar__end {
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}

.forge-toolbar__start {
  grid-area: start;
}

.forge-toolbar__center {
  justify-content: center;
  min-width: 0;
  grid-area: center;
}

.forge-toolbar__end {
  justify-content: end;
  grid-area: end;
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

/**
 * @license
 * Copyright Tyler Technologies, Inc.
 * License: Apache-2.0
 */
.forge-badge {
  --_badge-background:var(--forge-badge-background, var(--forge-theme-secondary, #ffc107));
  --_badge-color:var(--forge-badge-color, var(--forge-theme-on-secondary, #000000));
  --_badge-shape:var(--forge-badge-shape, calc(var(--forge-shape-full, 9999px) * var(--forge-shape-factor, 1)));
  --_badge-height:var(--forge-badge-height, 20px);
  --_badge-min-width:var(--forge-badge-min-width, 0);
  --_badge-max-width:var(--forge-badge-max-width, auto);
  --_badge-padding-inline:var(--forge-badge-padding-inline, var(--forge-spacing-xsmall, 8px));
  --_badge-padding-block:var(--forge-badge-padding-block, 0);
  --_badge-border-width:var(--forge-badge-border-width, var(--forge-border-thin, 1px));
  --_badge-border-style:var(--forge-badge-border-style, none);
  --_badge-border-color:var(--forge-badge-border-color, var(--_badge-color));
  --_badge-gap:var(--forge-badge-gap, var(--forge-spacing-xxsmall, 4px));
  --_badge-font-weight:var(--forge-badge-font-weight, bold);
  --_badge-dot-size:var(--forge-badge-dot-size, 8px);
  --_badge-dot-height:var(--forge-badge-dot-height, var(--_badge-dot-size));
  --_badge-dot-width:var(--forge-badge-dot-width, var(--_badge-dot-size));
  --_badge-dot-padding:var(--forge-badge-dot-padding, 0);
  --_badge-transition-duration:var(--forge-badge-transition-duration, var(--forge-animation-duration-short4, 200ms));
  --_badge-transition-easing:var(--forge-badge-transition-easing, var(--forge-animation-easing-decelerate, cubic-bezier(0, 0, 0, 1)));
}

.forge-badge {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-label1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-label1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-font-size-scale, 0.75)));
  font-weight: var(--forge-typography-label1-font-weight, 400);
  line-height: var(--forge-typography-label1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-line-height-scale, 1.25)));
  letter-spacing: var(--forge-typography-label1-letter-spacing, 0.0357142857em);
  text-transform: var(--forge-typography-label1-text-transform, inherit);
  text-decoration: var(--forge-typography-label1-text-decoration, inherit);
  background: var(--_badge-background);
  color: var(--_badge-color);
  height: var(--_badge-height);
  min-width: var(--_badge-min-width);
  max-width: var(--_badge-max-width);
  border-width: var(--_badge-border-width);
  border-style: var(--_badge-border-style);
  border-color: var(--_badge-border-color);
  display: inline-flex;
  align-items: center;
  gap: var(--_badge-gap);
  border-radius: var(--_badge-shape);
  padding-inline: var(--_badge-padding-inline);
  padding-block: var(--_badge-padding-block);
  overflow: hidden;
  box-sizing: border-box;
  pointer-events: none;
  transition: transform var(--_badge-transition-duration) var(--_badge-transition-easing);
  font-weight: var(--_badge-font-weight);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.forge-badge--dot {
  --_badge-height:var(--_badge-dot-height);
  --_badge-min-width:var(--forge-badge-min-width, auto);
  padding: var(--_badge-dot-padding);
  width: var(--_badge-dot-width);
}

.forge-badge forge-icon, .forge-badge .forge-icon, .forge-badge .forge-badge__icon {
  font-size: inherit;
}

:host {
  display: block;
}

.ai-icon-button,
.ai-icon-button > svg {
  fill: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
}

.header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  min-height: 56px;
  padding-inline: var(--forge-spacing-medium, 16px) var(--forge-spacing-xsmall, 8px);
}

.start {
  display: flex;
  align-items: center;
  gap: var(--forge-spacing-medium, 16px);
  overflow: visible;
  min-width: 0;
  --_ai-chat-header-icon-shape: var(--forge-ai-chat-header-icon-shape, calc(var(--forge-shape-round, 50%) * var(--forge-shape-factor, 1)));
}
.start ::slotted([slot=icon]) {
  border-radius: var(--_ai-chat-header-icon-shape);
  display: block;
}
.start .conversations-button {
  position: relative;
  margin-inline: calc(var(--forge-spacing-xxsmall, 4px) * -1) calc(var(--forge-spacing-small, 12px) * -1);
}
.start .conversations-button__error-badge {
  --forge-badge-background: var(--forge-theme-error, #b00020);
  position: absolute;
  inset-block-start: 5px;
  inset-inline-end: 5px;
  box-shadow: 0 0 0 2px var(--forge-theme-surface, #ffffff);
}
.start .title {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-heading3-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-heading3-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading3-font-size-scale, 1.125)));
  font-weight: var(--forge-typography-heading3-font-weight, 500);
  line-height: var(--forge-typography-heading3-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading3-line-height-scale, 1.375)));
  letter-spacing: var(--forge-typography-heading3-letter-spacing, 0.0083333333em);
  text-transform: var(--forge-typography-heading3-text-transform, inherit);
  text-decoration: var(--forge-typography-heading3-text-decoration, inherit);
  color: var(--forge-ai-chat-header-title-color, currentColor);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: normal;
}
.start forge-ai-agent-selector {
  min-width: 0;
  flex: 1;
}

.end {
  display: flex;
  align-items: center;
  justify-content: end;
}

forge-ai-dropdown-menu-item > svg[slot=start].forge-icon {
  width: 20px;
  height: 20px;
}

forge-ai-modal {
  --forge-ai-modal-width: fit-content;
  --forge-ai-modal-height: fit-content;
}

.forge-scaffold {
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 600px;
  max-width: 90vw;
  max-height: 80vh;
}

.forge-scaffold__header,
.forge-scaffold__footer {
  flex-shrink: 0;
}

.forge-scaffold__body {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

.agent-info-title {
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
  margin-inline-start: var(--forge-spacing-medium, 16px);
}

.agent-info-content {
  padding: var(--forge-spacing-medium, 16px);
}

.forge-scaffold__footer .forge-toolbar {
  justify-content: flex-end;
  align-items: center;
  padding-inline: var(--forge-spacing-small, 12px);
}

forge-ai-modal:state(fullscreen) .forge-scaffold {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
}
forge-ai-modal:state(fullscreen) .forge-scaffold__body {
  display: flex;
  flex-direction: column;
}
forge-ai-modal:state(fullscreen) .agent-info-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
forge-ai-modal:state(fullscreen) forge-ai-agent-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.close-button {
  margin-inline-end: var(--forge-spacing-xsmall, 8px);
}`})))()}var D,O;function k(){return(k=e((()=>{u(),f(),p(),m(),x(),C(),S(),w(),E(),i(),l(),_(),b(),D=`forge-ai-chat-header`,O=class extends r{constructor(...e){super(...e),this.showExpandButton=!1,this.showMinimizeButton=!1,this.expanded=!1,this.minimizeIcon=`default`,this.options=`enabled`,this.exportOption=`enabled`,this.clearOption=`enabled`,this.headingLevel=2,this.titleText=`AI Assistant`,this.agents=[],this.disableAgentSelector=!1,this.showConversationsButton=!1,this.hasConversationsError=!1,this.#e=g(),this._isTitleOverflowing=!1}static{this.styles=n(T)}#e;updated(e){(e.has(`titleText`)||e.has(`headingLevel`))&&this.agents.length===0&&this.#r()}get#t(){return this.exportOption===`enabled`||this.clearOption===`enabled`||!!this.agentInfo}get#n(){if(this.agents.length)return t`
        <forge-ai-agent-selector
          .agents=${this.agents}
          .selectedAgentId=${this.selectedAgentId}
          .titleText=${this.titleText}
          ?disabled=${this.disableAgentSelector}
          @forge-ai-agent-selector-change=${this.#c}>
          <slot name="icon" slot="icon">
            <forge-ai-icon></forge-ai-icon>
          </slot>
        </forge-ai-agent-selector>
      `;let e=y(`h${this.headingLevel}`);return v`
      <slot name="icon" slot="icon">
        <forge-ai-icon></forge-ai-icon>
      </slot>
      <${e} class="title" id="title-container">${this.titleText}</${e}>
      ${d(this._isTitleOverflowing,()=>t`<forge-ai-tooltip for="title-container" placement="bottom">${this.titleText}</forge-ai-tooltip>`)}
    `}render(){return t`
      <div class="header">
        <div class="start" id="title-container">
          ${d(this.showConversationsButton,()=>t`
              <button
                id="conversations-button"
                @click=${this.#l}
                aria-label=${this.hasConversationsError?`Toggle conversations panel - Failed to load`:`Toggle conversations panel`}
                class="conversations-button forge-icon-button forge-icon-button--medium ai-icon-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
                </svg>
                ${d(this.hasConversationsError,()=>t`<span class="forge-badge forge-badge--dot conversations-button__error-badge"></span>`)}
              </button>
            `)}
          ${this.#n}
          <slot name="thread-name"></slot>
        </div>
        <div class="end">
          <slot name="header-actions"></slot>
          ${d(this.showMinimizeButton,()=>t`
              <button
                id="minimize-button"
                @click=${this.#a}
                aria-label="Minimize chat window"
                class="forge-icon-button forge-icon-button--medium ai-icon-button">
                ${d(this.minimizeIcon==="default",()=>t`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M6 19h12v2H6z" />
                    </svg>
                  `,()=>t`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                      <defs>
                        <style>
                          .cls-1 {
                            fill: none;
                          }
                        </style>
                      </defs>
                      <path d="M0 0h24v24H0Z" class="cls-1" />
                      <path d="M0 0h24v24H0Z" class="cls-1" />
                      <path d="M0 0h24v24H0Z" class="cls-1" />
                      <path d="M15.89 5H3v14h12.89ZM7.65 15.46l2.58-2.59H4.56v-2h5.67L7.65 8.28l1.41-1.41 5 5-5 5ZM17.89 4.98H21v14.04h-3.11z" class="cls-1" />
                      <path d="M9.06 6.87 7.65 8.28l2.58 2.59H4.56v2h5.67l-2.58 2.59 1.41 1.41 5-5z" />
                      <path d="M21 3H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2M3 5h12.89v14H3Zm18 14h-3.11V5H21Z" />
                    </svg>
                  `)}
              </button>
              <forge-ai-tooltip id="minimize-tooltip" for="minimize-button" placement="bottom"> Minimize chat to taskbar </forge-ai-tooltip>
            `)}
          ${d(this.showExpandButton,()=>t`
              <button
                id="expand-button"
                @click=${this.#i}
                aria-label=${this.expanded?`Collapse chat window`:`Expand chat window`}
                class="forge-icon-button forge-icon-button--medium ai-icon-button">
                ${d(this.expanded,()=>t`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M14 14h5v2h-3v3h-2zm-9 0h5v5H8v-3H5zm3-9h2v5H5V8h3zm11 3v2h-5V5h2v3z" />
                    </svg>
                  `,()=>t`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 5h5v2H7v3H5zm9 0h5v5h-2V7h-3zm3 9h2v5h-5v-2h3zm-7 3v2H5v-5h2v3z" />
                    </svg>
                  `)}
              </button>
              <forge-ai-tooltip id="expand-tooltip" for="expand-button" placement="bottom">
                ${this.expanded?`Collapse to smaller window`:`Expand to full window`}
              </forge-ai-tooltip>
            `)}
          ${d(this.options===`enabled`&&this.#t,()=>t`
              <forge-ai-dropdown-menu
                variant="icon-button"
                popover-placement="bottom-end"
                selection-mode="none"
                trigger-label="More options"
                @forge-ai-dropdown-menu-change=${this.#o}>
                <svg slot="trigger-content" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" class="forge-icon ai-icon-button">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2" />
                </svg>
                ${d(this.exportOption===`enabled`,()=>t`
                    <forge-ai-dropdown-menu-item value="export">
                      <svg slot="start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon" aria-hidden="true">
                        <path d="m15.61 8.92 1.41-1.41-5-5-5 5 1.41 1.41 2.59-2.58v9.67h2V6.34z" />
                        <path d="M19.05 14.06V19h-14v-4.94h-2V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4.94z" />
                      </svg>
                      <span>Export current chat</span>
                    </forge-ai-dropdown-menu-item>
                  `)}
                ${d(this.agentInfo,()=>t`
                    <forge-ai-dropdown-menu-item value="info">
                      <svg slot="start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon" aria-hidden="true">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                          d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8" />
                      </svg>
                      <span>Info</span>
                    </forge-ai-dropdown-menu-item>
                  `)}
                ${d(this.clearOption===`enabled`&&(this.agentInfo||this.exportOption===`enabled`),()=>t`<forge-ai-dropdown-menu-separator></forge-ai-dropdown-menu-separator>`)}
                ${d(this.clearOption===`enabled`,()=>t`
                    <forge-ai-dropdown-menu-item value="clear-chat">
                      <svg slot="start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon" aria-hidden="true">
                        <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5-1-1h-5l-1 1H5v2h14V4z" />
                      </svg>
                      <span>Clear chat</span>
                    </forge-ai-dropdown-menu-item>
                  `)}
              </forge-ai-dropdown-menu>
            `)}
        </div>
      </div>
      ${d(this.agentInfo,()=>t`
          <forge-ai-modal ${h(this.#e)} label="Agent Information">
            <div class="forge-scaffold">
              <div class="forge-scaffold__header">
                <div class="forge-toolbar">
                  <h2 class="forge-toolbar__start agent-info-title">Agent Information</h2>
                  <div class="forge-toolbar__end">
                    <button
                      class="forge-icon-button forge-icon-button--medium ai-icon-button close-button"
                      @click=${this.#s}
                      aria-label="Close agent information dialog">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div class="forge-scaffold__body">
                <div class="agent-info-content">
                  <forge-ai-agent-info .agentInfo=${this.agentInfo}></forge-ai-agent-info>
                </div>
              </div>
              <div class="forge-scaffold__footer">
                <div class="forge-toolbar forge-toolbar--inverted">
                  <button class="forge-button forge-button--filled forge-toolbar__end" autofocus @click=${this.#s}>Close</button>
                </div>
              </div>
            </div>
          </forge-ai-modal>
        `)}
    `}#r(){let e=this.shadowRoot?.querySelector(`.title`);if(e){let t=e.scrollWidth>e.offsetWidth;this._isTitleOverflowing!==t&&(this._isTitleOverflowing=t)}}#i(){let e=new CustomEvent(`forge-ai-chat-header-expand`,{bubbles:!0,composed:!0});this.dispatchEvent(e)}#a(){let e=new CustomEvent(`forge-ai-chat-header-minimize`,{bubbles:!0,composed:!0});this.dispatchEvent(e)}#o(e){switch(e.detail.value){case`export`:this.dispatchEvent(new CustomEvent(`forge-ai-chat-header-export`,{bubbles:!0,composed:!0}));break;case`info`:this.#e.value?.show();break;case`clear-chat`:this.dispatchEvent(new CustomEvent(`forge-ai-chat-header-clear`,{bubbles:!0,composed:!0}))}}#s(){this.#e.value?.close()}#c(e){this.dispatchEvent(new CustomEvent(`forge-ai-chat-header-agent-change`,{detail:e.detail,bubbles:!0,composed:!0}))}#l(){this.dispatchEvent(new CustomEvent(`forge-ai-chat-header-conversations-toggle`,{bubbles:!0,composed:!0}))}showAgentInfo(){this.#e.value?.show()}},a([o({type:Boolean,attribute:`show-expand-button`})],O.prototype,`showExpandButton`,void 0),a([o({type:Boolean,attribute:`show-minimize-button`})],O.prototype,`showMinimizeButton`,void 0),a([o({type:Boolean})],O.prototype,`expanded`,void 0),a([o({attribute:`minimize-icon`})],O.prototype,`minimizeIcon`,void 0),a([o({type:Object,attribute:!1})],O.prototype,`agentInfo`,void 0),a([o()],O.prototype,`options`,void 0),a([o({attribute:`export-option`})],O.prototype,`exportOption`,void 0),a([o({attribute:`clear-option`})],O.prototype,`clearOption`,void 0),a([o({attribute:`heading-level`,type:Number})],O.prototype,`headingLevel`,void 0),a([o({attribute:`title-text`})],O.prototype,`titleText`,void 0),a([o({attribute:!1})],O.prototype,`agents`,void 0),a([o({attribute:`selected-agent-id`})],O.prototype,`selectedAgentId`,void 0),a([o({type:Boolean,attribute:`disable-agent-selector`})],O.prototype,`disableAgentSelector`,void 0),a([o({type:Boolean,attribute:`show-conversations-button`})],O.prototype,`showConversationsButton`,void 0),a([o({type:Boolean,attribute:`has-conversations-error`})],O.prototype,`hasConversationsError`,void 0),a([s()],O.prototype,`_isTitleOverflowing`,void 0),O=a([c(D)],O)})))()}function A(){return(A=e((()=>{k()})))()}export{A as t};