import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,t as n}from"./lit-html-SpIZ5SkX.js";import{T as r,_ as i,g as a}from"./iframe-BbUsXXnT.js";import{t as o}from"./decorate-2OK4V6AF.js";import{d as s,p as c,t as l}from"./decorators-Ci1onliJ.js";import{r as u,t as d}from"./if-defined-B1ve8lTA.js";import{t as f}from"./ai-tool-call2-bfR1ACt5.js";import{r as p,t as m}from"./markdown-CMYSPfDT.js";import{t as h}from"./ai-response-message-toolbar-CBn7pGuW.js";import{t as g}from"./ai-tool-call-indicator-Dn8R-dvy.js";import{r as _,t as v}from"./unsafe-html-DLpnvkX2.js";import{t as y}from"./ai-thinking-indicator-ChrmcsO8.js";var b;function x(){return(x=e((()=>{m(),b=class{#e;#t;#n=new Map;constructor(e){this.#e=e,e.addController(this)}hostConnected(){}hostDisconnected(){this.#t&&=(cancelAnimationFrame(this.#t),void 0),this.#n.clear()}#r(e,t,{streaming:n=!0}){return`${e}:${n}:${t}`}getCachedHtml(e,t,n={}){let r=String(t??``),i=this.#r(e,r,n),a=this.#n.get(i);if(!a&&(a=p(r,n),this.#n.set(i,a),this.#n.size>100)){let e=this.#n.keys().next().value;e&&this.#n.delete(e)}return a}scheduleUpdate(){this.#t||=requestAnimationFrame(()=>{this.#t=void 0,this.#e.requestUpdate()})}}})))()}var S;function C(){return(C=e((()=>{S=`/**
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

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
:host {
  display: block;
  box-sizing: border-box;
}

:host(:state(empty)) {
  display: none;
}

.assistant-response {
  position: relative;
}

.text-chunk {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-body1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-body1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 0.875)));
  font-weight: var(--forge-typography-body1-font-weight, 400);
  line-height: var(--forge-typography-body1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.125)));
  letter-spacing: var(--forge-typography-body1-letter-spacing, 0.0357142857em);
  text-transform: var(--forge-typography-body1-text-transform, inherit);
  text-decoration: var(--forge-typography-body1-text-decoration, inherit);
  font-size: var(--forge-ai-markdown-font-size, 0.875rem);
  line-height: var(--forge-ai-markdown-line-height, 1.5rem);
  color: var(--forge-theme-on-surface, #000000);
  overflow-wrap: break-word;
}
.text-chunk h1,
.text-chunk h2,
.text-chunk h3,
.text-chunk h4,
.text-chunk h5,
.text-chunk h6 {
  margin: 1.75rem 0 var(--forge-spacing-small, 12px);
}
.text-chunk strong {
  font-weight: 500;
}
.text-chunk a {
  color: var(--forge-theme-primary, #3f51b5);
}
.text-chunk hr {
  border: none;
  border-top: 1px solid var(--forge-theme-outline, #e0e0e0);
}
.text-chunk code {
  color: var(--forge-theme-on-surface-container-low, #000000);
  background-color: var(--forge-theme-surface-container-low, #ebebeb);
  border-radius: calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1));
  padding: var(--forge-spacing-xxxsmall, 2px) var(--forge-spacing-xxsmall, 4px);
  font-size: 0.75em;
}
.text-chunk pre {
  border: 1px solid var(--forge-theme-outline, #e0e0e0);
  border-radius: calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1));
  margin: 0;
  max-width: 100%;
  overflow-x: auto;
}
.text-chunk pre:focus-visible {
  outline: 2px solid var(--forge-theme-primary, #3f51b5);
  outline-offset: 2px;
}
.text-chunk pre code {
  display: block;
  padding: var(--forge-spacing-xsmall, 8px) var(--forge-spacing-small, 12px);
  color: var(--forge-theme-on-surface-container-minimum, #000000);
  background: var(--forge-theme-surface-container-minimum, #f5f5f5);
  white-space: pre;
}
.text-chunk [data-scroll-region=table] {
  max-width: 100%;
  overflow-x: auto;
  border-radius: calc(var(--forge-shape-large, 8px) * var(--forge-shape-factor, 1));
  margin-block: var(--forge-spacing-medium, 16px);
}
.text-chunk [data-scroll-region=table]:focus-visible {
  outline: 2px solid var(--forge-theme-primary, #3f51b5);
  outline-offset: 2px;
}
.text-chunk [data-scroll-region=table] table {
  margin-block: 0;
}
.text-chunk table {
  width: 100%;
  border-spacing: 0;
  background-color: var(--forge-theme-surface, #ffffff);
  border-radius: calc(var(--forge-shape-large, 8px) * var(--forge-shape-factor, 1));
  overflow: hidden;
  margin-block: var(--forge-spacing-medium, 16px);
}
.text-chunk table thead {
  color: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
  font-weight: bold;
  text-align: left;
  font-size: calc(var(--forge-typography-font-size, 1rem) * 0.75);
  box-sizing: border-box;
}
.text-chunk table tr {
  height: 36px;
  height: 32px;
}
.text-chunk table tr:nth-child(even) {
  background-color: var(--forge-theme-surface-dim, #fafafa);
}
.text-chunk table tr:last-child td {
  border-bottom: none;
}
.text-chunk table th,
.text-chunk table td {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-label1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-label1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-font-size-scale, 0.75)));
  font-weight: var(--forge-typography-label1-font-weight, 400);
  line-height: var(--forge-typography-label1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-line-height-scale, 1.25)));
  letter-spacing: var(--forge-typography-label1-letter-spacing, 0.0357142857em);
  text-transform: var(--forge-typography-label1-text-transform, inherit);
  text-decoration: var(--forge-typography-label1-text-decoration, inherit);
  padding-block: var(--forge-spacing-xsmall, 8px);
  padding-inline-start: var(--forge-spacing-xsmall, 8px);
  padding-inline-end: var(--forge-spacing-medium, 16px);
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: var(--forge-theme-outline, #e0e0e0);
}
.text-chunk table th {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-label2-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-label2-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-font-size-scale, 0.8125)));
  font-weight: var(--forge-typography-label2-font-weight, 400);
  line-height: var(--forge-typography-label2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-label-line-height-scale, 1.25)));
  letter-spacing: var(--forge-typography-label2-letter-spacing, 0.0096153846em);
  text-transform: var(--forge-typography-label2-text-transform, inherit);
  text-decoration: var(--forge-typography-label2-text-decoration, inherit);
  font-weight: 600;
}
.text-chunk > p:has(+ ol),
.text-chunk > p:has(+ ul) {
  margin-block-end: var(--forge-spacing-small, 12px);
}
.text-chunk > ul {
  list-style-type: disc;
  padding-inline-start: 1.6875rem;
}
.text-chunk > ol {
  padding-inline-start: 1.75rem;
}
.text-chunk > ol,
.text-chunk > ul {
  margin: var(--forge-spacing-xsmall, 8px) 0;
  margin-block-end: var(--forge-spacing-medium, 16px);
}
.text-chunk > :first-child {
  margin-block-start: 0;
}
.text-chunk > p {
  margin-block-end: var(--forge-spacing-medium, 16px);
  overflow-wrap: anywhere;
}
.text-chunk > p:first-child {
  margin-block-start: 0;
}
.text-chunk > p:last-child {
  margin-block-end: 0;
}

.thinking-indicator {
  margin-block-start: var(--forge-spacing-xsmall, 8px);
}

forge-ai-tool-call-indicator + .thinking-indicator {
  margin-block-start: 0;
}

.toolbar-container {
  position: absolute;
  bottom: -28px;
  transition: opacity 200ms ease-in-out, transform 200ms ease-in-out;
  display: flex;
  align-items: center;
  gap: var(--forge-spacing-xxsmall, 4px);
  opacity: 0;
  transform: translateY(-8px);
  pointer-events: none;
  z-index: 1;
  left: 0;
}

.assistant-response[data-complete]:hover .toolbar-container,
.assistant-response[data-complete] .toolbar-container:focus-within {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

:host(:not(:last-of-type)) .assistant-response[data-complete]::after {
  content: "";
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  height: 40px;
}

:host(:last-of-type) .assistant-response[data-complete] .toolbar-container {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.debug-button {
  color: var(--forge-theme-on-error-container-low, #5f0011);
  --forge-icon-button-focus-indicator-color: var(--forge-theme-error, #b00020);
  --forge-icon-button-tonal-background-color: var(--forge-theme-error-container-low, #f6e0e4);
}`})))()}var w,T;function E(){return(E=e((()=>{x(),h(),f(),g(),y(),C(),a(),l(),v(),d(),w=`forge-ai-assistant-response`,T=class extends i{constructor(...e){super(...e),this.enableReactions=!1,this.debugMode=!1,this.showThinking=!1,this.#e=this.attachInternals(),this.#t=new b(this)}static{this.styles=r(S)}#e;#t;willUpdate(){this.#r()}get#n(){return this.response.children.some(e=>e.type!==`text`||(typeof e.content==`string`?e.content:``).trim().length>0)}#r(){!this.#n&&this.response.status!==`complete`&&!this.showThinking?this.#e.states.add(`empty`):this.#e.states.delete(`empty`)}#i(e){let r=typeof e.content==`string`?e.content:``;if(!r.trim())return n;let i=this.response.status===`streaming`&&e.status===`streaming`,a=this.#t.getCachedHtml(e.messageId,r,{streaming:i});return t`<div class="text-chunk">${_(a)}</div>`}#a(e){let r=this.tools?.get(e.name);return r?.renderer?t`<forge-ai-tool-call .toolCall=${e} .toolDefinition=${r}></forge-ai-tool-call>`:n}get#o(){let e=[],n=[],r=()=>{if(n.length===0)return;let r=n;n=[],e.push(t`<forge-ai-tool-call-indicator .toolCalls=${r} .tools=${this.tools} ?debug-mode=${this.debugMode}></forge-ai-tool-call-indicator>`);for(let t of r)e.push(this.#a(t))};for(let t of this.response.children)t.type===`text`?(r(),e.push(this.#i(t))):n.push(t.data);return r(),e}#s(e){let t=`forge-ai-assistant-response-${e.detail.action}`,n=new CustomEvent(t,{detail:{responseId:this.response.id}});this.dispatchEvent(n)}#c(e){let{action:t,feedback:n}=e.detail,r=new CustomEvent(t===`positive`?`forge-ai-assistant-response-thumbs-up`:`forge-ai-assistant-response-thumbs-down`,{detail:{responseId:this.response.id,feedback:n}});this.dispatchEvent(r)}get#l(){return this.response.status!==`complete`||!this.response.children.some(e=>e.type===`text`&&(typeof e.content==`string`?e.content:``).trim().length>0)?n:t`
      <div class="toolbar-container">
        <forge-ai-response-message-toolbar
          ?enable-reactions=${this.enableReactions}
          feedback-type=${u(this.response.feedback?.type)}
          feedback-reason=${u(this.response.feedback?.reason)}
          @forge-ai-response-message-toolbar-action=${this.#s}
          @forge-ai-response-message-toolbar-feedback=${this.#c}>
        </forge-ai-response-message-toolbar>
      </div>
    `}get#u(){if(!this.showThinking)return n;let e=this.response.children[this.response.children.length-1];return(this.response.status!==`streaming`||this.response.isThinking!==!0)&&e?.type===`text`&&e.status===`streaming`&&(typeof e.content==`string`?e.content:``).trim().length>0||this.response.children.some(e=>e.type===`toolCall`?e.data.status===`parsing`||e.data.status===`executing`||e.data.status===`pending`:!1)?n:t`<div class="thinking-indicator">
      <forge-ai-thinking-indicator show-text></forge-ai-thinking-indicator>
    </div>`}render(){return t`
      <div class="assistant-response" ?data-complete=${this.response.status===`complete`}>${this.#o} ${this.#u} ${this.#l}</div>
    `}},o([s({attribute:!1})],T.prototype,`response`,void 0),o([s({attribute:!1})],T.prototype,`tools`,void 0),o([s({type:Boolean,attribute:`enable-reactions`})],T.prototype,`enableReactions`,void 0),o([s({type:Boolean,attribute:`debug-mode`})],T.prototype,`debugMode`,void 0),o([s({type:Boolean,attribute:`show-thinking`})],T.prototype,`showThinking`,void 0),T=o([c(w)],T)})))()}function D(){return(D=e((()=>{E()})))()}export{b as n,x as r,D as t};