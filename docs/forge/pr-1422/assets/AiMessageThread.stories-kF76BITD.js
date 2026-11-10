import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{T as i,_ as a,g as o}from"./iframe-BbUsXXnT.js";import{t as s}from"./decorate-2OK4V6AF.js";import{d as c,o as l,p as u,t as d}from"./decorators-Ci1onliJ.js";import{t as f}from"./tooltip2-DY1gJCOv.js";import{n as p}from"./when-Daf2bbVy.js";import{t as m}from"./ai-tool-call2-bfR1ACt5.js";import{n as h,r as g,t as _}from"./ai-assistant-response-UT3k0v69.js";import{r as v,t as y}from"./unsafe-html-DLpnvkX2.js";import{t as b}from"./ai-thinking-indicator-ChrmcsO8.js";import{t as x}from"./ai-user-message-N-i96lpR.js";import{t as S}from"./ai-response-message-ByBw4OFQ.js";import{t as C}from"./ai-suggestions-B7a5xXdN.js";import{t as w}from"./ai-empty-state-DHSrhNJu.js";import{t as T}from"./ai-client-message-DqgAZpIk.js";import{t as E}from"./ai-error-message-B-OLhAZH.js";var D;function O(){return(O=e((()=>{D=`@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
/**
 * @license
 * Copyright Tyler Technologies, Inc.
 * License: Apache-2.0
 */
.forge-fab {
  --_fab-display:var(--forge-fab-display, inline-flex);
  --_fab-gap:var(--forge-fab-gap, var(--forge-spacing-xsmall, 8px));
  --_fab-background:var(--forge-fab-background, var(--forge-theme-secondary, #ffc107));
  --_fab-color:var(--forge-fab-color, var(--forge-theme-on-secondary, #000000));
  --_fab-size:var(--forge-fab-size, 56px);
  --_fab-padding:var(--forge-fab-padding, var(--forge-spacing-xsmall, 8px));
  --_fab-shadow:var(--forge-fab-shadow, 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12));
  --_fab-hover-shadow:var(--forge-fab-hover-shadow, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12));
  --_fab-active-shadow:var(--forge-fab-active-shadow, 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12));
  --_fab-lowered-shadow:var(--forge-fab-lowered-shadow, 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12));
  --_fab-lowered-hover-shadow:var(--forge-fab-lowered-hover-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
  --_fab-lowered-active-shadow:var(--forge-fab-lowered-active-shadow, 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12));
  --_fab-transition-duration:var(--forge-fab-transition-duration, var(--forge-animation-duration-short3, 150ms));
  --_fab-transition-timing:var(--forge-fab-transition-timing, var(--forge-animation-easing-standard, cubic-bezier(0.2, 0, 0, 1)));
  --_fab-shape:var(--forge-fab-shape, calc(var(--forge-shape-full, 9999px) * var(--forge-shape-factor, 1)));
  --_fab-shape-start-start:var(--forge-fab-shape-start-start, var(--_fab-shape));
  --_fab-shape-start-end:var(--forge-fab-shape-start-end, var(--_fab-shape));
  --_fab-shape-end-start:var(--forge-fab-shape-end-start, var(--_fab-shape));
  --_fab-shape-end-end:var(--forge-fab-shape-end-end, var(--_fab-shape));
  --_fab-extended-padding:var(--forge-fab-extended-padding, var(--forge-spacing-medium-large, 20px));
  --_fab-extended-min-width:var(--forge-fab-extended-min-width, 96px);
  --_fab-density-small-size:var(--forge-fab-density-small-size, 40px);
  --_fab-density-medium-size:var(--forge-fab-density-medium-size, var(--_fab-size));
  --_fab-density-large-size:var(--forge-fab-density-large-size, 96px);
  --_fab-disabled-cursor:var(--forge-fab-disabled-cursor, not-allowed);
  --_fab-disabled-background:var(--forge-fab-disabled-background, var(--forge-theme-surface-container, #e0e0e0));
  --_fab-disabled-color:var(--forge-fab-disabled-color, var(--forge-theme-on-surface-container, #000000));
  --_fab-disabled-opacity:var(--forge-fab-disabled-opacity, 0.38);
}

.forge-fab {
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
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: var(--_fab-gap);
  z-index: 0;
  background: var(--_fab-background);
  color: var(--_fab-color);
  cursor: pointer;
  box-shadow: var(--_fab-shadow);
  box-sizing: border-box;
  height: var(--_fab-density-medium-size);
  min-width: var(--_fab-density-medium-size);
  padding-inline: var(--_fab-padding);
  border-width: medium;
  border-style: none;
  border-color: currentColor;
  border-top-left-radius: var(--_fab-shape-start-start);
  border-top-right-radius: var(--_fab-shape-start-end);
  border-bottom-left-radius: var(--_fab-shape-end-start);
  border-bottom-right-radius: var(--_fab-shape-end-end);
  user-select: none;
  white-space: nowrap;
  transition-property: box-shadow, background, color;
  transition-duration: var(--_fab-transition-duration);
  transition-timing-function: var(--_fab-transition-timing);
}

.forge-fab:hover {
  --_fab-shadow:var(--_fab-hover-shadow);
}

.forge-fab:active {
  --_fab-shadow:var(--_fab-active-shadow);
}

.forge-fab:not(:disabled) {
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

.forge-fab:not(:disabled)::before {
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

.forge-fab:not(:disabled):hover::before {
  background-color: var(--_state-layer-hover-color);
  opacity: var(--_state-layer-hover-opacity);
}

.forge-fab:not(:disabled):active::before {
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
.forge-fab:not(:disabled) {
  outline: none;
}

.forge-fab:not(:disabled):focus-visible::after {
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

.forge-fab:not(:disabled):focus-visible::after {
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

.forge-fab:not(:disabled) {
  --forge-focus-indicator-color: var(--_fab-background);
  --forge-focus-indicator-shape-start-start: var(--_fab-shape-start-start);
  --forge-focus-indicator-shape-start-end: var(--_fab-shape-start-end);
  --forge-focus-indicator-shape-end-start: var(--_fab-shape-end-start);
  --forge-focus-indicator-shape-end-end: var(--_fab-shape-end-end);
}

.forge-fab--extended {
  --_fab-padding:var(--_fab-extended-padding);
  min-width: var(--_fab-extended-min-width);
}

.forge-fab:disabled {
  cursor: var(--_fab-disabled-cursor);
  --_fab-background:var(--_fab-disabled-background);
  --_fab-color:var(--_fab-disabled-color);
  pointer-events: none;
  opacity: var(--_fab-disabled-opacity);
  pointer-events: auto;
  cursor: not-allowed;
}

.forge-fab--dense, .forge-fab--small {
  --_fab-size:var(--_fab-density-small-size);
}

.forge-fab--large {
  --_fab-size:var(--_fab-density-large-size);
  --_fab-shape:var(--forge-fab-shape, calc(var(--forge-shape-extra-large, 16px) * var(--forge-shape-factor, 1)));
}

.forge-fab--flat {
  --_fab-shadow:var(--_fab-lowered-shadow);
}

.forge-fab--flat:hover {
  --_fab-shadow:var(--_fab-lowered-hover-shadow);
}

.forge-fab--flat:active {
  --_fab-shadow:var(--_fab-lowered-active-shadow);
}

:host {
  display: grid;
  height: 100%;
  position: relative;
}

.message-thread::-webkit-scrollbar {
  height: var(--forge-scrollbar-height, 16px);
  width: var(--forge-scrollbar-width, 16px);
}
.message-thread::-webkit-scrollbar-track {
  background-color: var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb));
}
.message-thread::-webkit-scrollbar-track:hover {
  background-color: var(--forge-scrollbar-track-container-hover, var(--forge-theme-surface-container-low, #ebebeb));
}
.message-thread::-webkit-scrollbar-corner {
  background-color: var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb));
}
.message-thread::-webkit-scrollbar-thumb {
  height: var(--forge-scrollbar-thumb-min-height, 32px);
  width: var(--forge-scrollbar-thumb-min-width, 32px);
  border-radius: var(--forge-scrollbar-border-radius, calc(var(--forge-shape-full, 9999px) * var(--forge-shape-factor, 1)));
  border-width: var(--forge-scrollbar-border-width, 3px);
  border-style: solid;
  border-color: transparent;
  background-color: var(--forge-scrollbar-thumb-container, var(--forge-theme-surface-container-medium, #c2c2c2));
  background-clip: content-box;
}
.message-thread::-webkit-scrollbar-thumb:hover {
  background-color: var(--forge-scrollbar-thumb-container-hover, var(--forge-theme-surface-container-high, #9e9e9e));
}
.message-thread {
  overflow-y: auto;
}
@media not all and (min-resolution: 0.001dpcm) {
  @supports (-webkit-appearance: none) {
    .message-thread {
      overflow-y: scroll;
    }
  }
}

.message-thread-content {
  --_message-thread-item-spacing: var(--forge-spacing-xlarge, 32px);
  display: flex;
  flex-direction: column;
  padding: var(--forge-spacing-medium, 16px) var(--forge-spacing-medium, 16px) var(--forge-spacing-xxlarge, 48px) var(--forge-spacing-medium, 16px);
  max-inline-size: var(--forge-ai-message-thread-content-max-width, none);
  margin-inline: auto;
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
}

.message-thread-content > * + * {
  margin-block-start: var(--_message-thread-item-spacing);
}

forge-ai-empty-state {
  margin-block: auto;
}

.scroll-to-bottom-button {
  --forge-fab-size: 40px;
  --forge-fab-background: var(--forge-theme-surface-bright, #ffffff);
  --forge-fab-color: var(--forge-theme-text-high, rgba(0, 0, 0, 0.87));
  position: absolute;
  bottom: var(--forge-spacing-xxsmall, 4px);
  left: 50%;
  transform: translateX(-50%) translateY(0);
  opacity: 1;
  visibility: visible;
  z-index: 1;
  transition: opacity var(--forge-animation-duration-short2, 100ms) var(--forge-animation-easing-accelerate, cubic-bezier(0.3, 0, 1, 1)), transform var(--forge-animation-duration-short2, 100ms) var(--forge-animation-easing-accelerate, cubic-bezier(0.3, 0, 1, 1)), visibility 0s 0s;
}
.scroll-to-bottom-button--hidden {
  opacity: 0;
  transform: translateX(-50%) translateY(24px);
  visibility: hidden;
  pointer-events: none;
  transition: opacity var(--forge-animation-duration-short2, 100ms) var(--forge-animation-easing-accelerate, cubic-bezier(0.3, 0, 1, 1)), transform var(--forge-animation-duration-short2, 100ms) var(--forge-animation-easing-accelerate, cubic-bezier(0.3, 0, 1, 1)), visibility 0s var(--forge-animation-duration-short2, 100ms);
}
.scroll-to-bottom-button svg {
  width: 24px;
  height: 24px;
  fill: currentColor;
}

forge-ai-user-message,
forge-ai-response-message,
forge-ai-error-message {
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
forge-ai-user-message h1,
forge-ai-user-message h2,
forge-ai-user-message h3,
forge-ai-user-message h4,
forge-ai-user-message h5,
forge-ai-user-message h6,
forge-ai-response-message h1,
forge-ai-response-message h2,
forge-ai-response-message h3,
forge-ai-response-message h4,
forge-ai-response-message h5,
forge-ai-response-message h6,
forge-ai-error-message h1,
forge-ai-error-message h2,
forge-ai-error-message h3,
forge-ai-error-message h4,
forge-ai-error-message h5,
forge-ai-error-message h6 {
  margin: 1.75rem 0 var(--forge-spacing-small, 12px);
}
forge-ai-user-message strong,
forge-ai-response-message strong,
forge-ai-error-message strong {
  font-weight: 500;
}
forge-ai-user-message a,
forge-ai-response-message a,
forge-ai-error-message a {
  color: var(--forge-theme-primary, #3f51b5);
}
forge-ai-user-message hr,
forge-ai-response-message hr,
forge-ai-error-message hr {
  border: none;
  border-top: 1px solid var(--forge-theme-outline, #e0e0e0);
}
forge-ai-user-message code,
forge-ai-response-message code,
forge-ai-error-message code {
  color: var(--forge-theme-on-surface-container-low, #000000);
  background-color: var(--forge-theme-surface-container-low, #ebebeb);
  border-radius: calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1));
  padding: var(--forge-spacing-xxxsmall, 2px) var(--forge-spacing-xxsmall, 4px);
  font-size: 0.75em;
}
forge-ai-user-message pre,
forge-ai-response-message pre,
forge-ai-error-message pre {
  border: 1px solid var(--forge-theme-outline, #e0e0e0);
  border-radius: calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1));
  margin: 0;
  max-width: 100%;
  overflow-x: auto;
}
forge-ai-user-message pre:focus-visible,
forge-ai-response-message pre:focus-visible,
forge-ai-error-message pre:focus-visible {
  outline: 2px solid var(--forge-theme-primary, #3f51b5);
  outline-offset: 2px;
}
forge-ai-user-message pre code,
forge-ai-response-message pre code,
forge-ai-error-message pre code {
  display: block;
  padding: var(--forge-spacing-xsmall, 8px) var(--forge-spacing-small, 12px);
  color: var(--forge-theme-on-surface-container-minimum, #000000);
  background: var(--forge-theme-surface-container-minimum, #f5f5f5);
  white-space: pre;
}
forge-ai-user-message [data-scroll-region=table],
forge-ai-response-message [data-scroll-region=table],
forge-ai-error-message [data-scroll-region=table] {
  max-width: 100%;
  overflow-x: auto;
  border-radius: calc(var(--forge-shape-large, 8px) * var(--forge-shape-factor, 1));
  margin-block: var(--forge-spacing-medium, 16px);
}
forge-ai-user-message [data-scroll-region=table]:focus-visible,
forge-ai-response-message [data-scroll-region=table]:focus-visible,
forge-ai-error-message [data-scroll-region=table]:focus-visible {
  outline: 2px solid var(--forge-theme-primary, #3f51b5);
  outline-offset: 2px;
}
forge-ai-user-message [data-scroll-region=table] table,
forge-ai-response-message [data-scroll-region=table] table,
forge-ai-error-message [data-scroll-region=table] table {
  margin-block: 0;
}
forge-ai-user-message table,
forge-ai-response-message table,
forge-ai-error-message table {
  width: 100%;
  border-spacing: 0;
  background-color: var(--forge-theme-surface, #ffffff);
  border-radius: calc(var(--forge-shape-large, 8px) * var(--forge-shape-factor, 1));
  overflow: hidden;
  margin-block: var(--forge-spacing-medium, 16px);
}
forge-ai-user-message table thead,
forge-ai-response-message table thead,
forge-ai-error-message table thead {
  color: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
  font-weight: bold;
  text-align: left;
  font-size: calc(var(--forge-typography-font-size, 1rem) * 0.75);
  box-sizing: border-box;
}
forge-ai-user-message table tr,
forge-ai-response-message table tr,
forge-ai-error-message table tr {
  height: 36px;
  height: 32px;
}
forge-ai-user-message table tr:nth-child(even),
forge-ai-response-message table tr:nth-child(even),
forge-ai-error-message table tr:nth-child(even) {
  background-color: var(--forge-theme-surface-dim, #fafafa);
}
forge-ai-user-message table tr:last-child td,
forge-ai-response-message table tr:last-child td,
forge-ai-error-message table tr:last-child td {
  border-bottom: none;
}
forge-ai-user-message table th,
forge-ai-user-message table td,
forge-ai-response-message table th,
forge-ai-response-message table td,
forge-ai-error-message table th,
forge-ai-error-message table td {
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
forge-ai-user-message table th,
forge-ai-response-message table th,
forge-ai-error-message table th {
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
forge-ai-user-message > p:has(+ ol),
forge-ai-user-message > p:has(+ ul),
forge-ai-response-message > p:has(+ ol),
forge-ai-response-message > p:has(+ ul),
forge-ai-error-message > p:has(+ ol),
forge-ai-error-message > p:has(+ ul) {
  margin-block-end: var(--forge-spacing-small, 12px);
}
forge-ai-user-message > ul,
forge-ai-response-message > ul,
forge-ai-error-message > ul {
  list-style-type: disc;
  padding-inline-start: 1.6875rem;
}
forge-ai-user-message > ol,
forge-ai-response-message > ol,
forge-ai-error-message > ol {
  padding-inline-start: 1.75rem;
}
forge-ai-user-message > ol,
forge-ai-user-message > ul,
forge-ai-response-message > ol,
forge-ai-response-message > ul,
forge-ai-error-message > ol,
forge-ai-error-message > ul {
  margin: var(--forge-spacing-xsmall, 8px) 0;
  margin-block-end: var(--forge-spacing-medium, 16px);
}
forge-ai-user-message > :first-child,
forge-ai-response-message > :first-child,
forge-ai-error-message > :first-child {
  margin-block-start: 0;
}
forge-ai-user-message > p,
forge-ai-response-message > p,
forge-ai-error-message > p {
  margin-block-end: var(--forge-spacing-medium, 16px);
  overflow-wrap: anywhere;
}
forge-ai-user-message > p:first-child,
forge-ai-response-message > p:first-child,
forge-ai-error-message > p:first-child {
  margin-block-start: 0;
}
forge-ai-user-message > p:last-child,
forge-ai-response-message > p:last-child,
forge-ai-error-message > p:last-child {
  margin-block-end: 0;
}`})))()}var k,A,j;function M(){return(M=e((()=>{g(),f(),m(),b(),_(),T(),E(),w(),S(),x(),O(),o(),d(),y(),k=`forge-ai-message-thread`,A=100,j=class extends a{constructor(...e){super(...e),this.messageItems=[],this.enableReactions=!1,this.showThinking=!1,this.debugMode=!1,this.autoScroll=`on`,this.#e=new h(this),this.#t=new ResizeObserver(()=>this.#i()),this.#n=!0,this.#a=()=>{this.#i()},this.#o=()=>{this.scrollToBottom({force:!0,behavior:`smooth`})}}static{this.styles=i(D)}#e;#t;#n;connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.#t.observe(this._messageThreadContainer)}disconnectedCallback(){super.disconnectedCallback(),this.#t.disconnect()}firstUpdated(){this.#t.observe(this._messageThreadContainer)}updated(e){super.updated(e),this.autoScroll===`on`&&(e.has(`messageItems`)||e.has(`showThinking`))&&this.#r()}async#r(){await this.updateComplete,await new Promise(requestAnimationFrame),this.scrollToBottom()}#i(){let e=this._messageThreadContainer;if(!e)return;let{scrollTop:t,scrollHeight:n,clientHeight:r}=e,i=t+r>=n-A;i!==this.#n&&(this.#n=i,this.requestUpdate())}#a;scrollToBottom({force:e=!1,behavior:t=`smooth`}={}){if(!e&&!this.#n)return;let n=this._messageThreadContainer;n.scrollTo({top:n.scrollHeight,behavior:t})}#o;get#s(){if(!this.messageItems.length)return r;let e=this.#n?` scroll-to-bottom-button--hidden`:``;return n`
      <button
        id="scroll-to-bottom-btn"
        class=${`forge-fab scroll-to-bottom-button${e}`}
        aria-label="Scroll to bottom"
        @click=${this.#o}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7.03 13.92h4V5l2.01-.03v8.95h3.99l-5 5Z" />
        </svg>
      </button>
      <forge-ai-tooltip for="scroll-to-bottom-btn" placement="top">Scroll to bottom</forge-ai-tooltip>
    `}#c(e){this.#x({type:`forge-ai-message-thread-copy`,detail:{messageId:e}})}#l(e){this.#x({type:`forge-ai-message-thread-resend`,detail:{messageId:e}})}#u(e,t){let n={messageId:e,feedback:t};this.#x({type:`forge-ai-message-thread-thumbs-up`,detail:n})}#d(e,t){let n={messageId:e,feedback:t};this.#x({type:`forge-ai-message-thread-thumbs-down`,detail:n})}#f(e){this.#x({type:`forge-ai-message-thread-user-copy`,detail:{messageId:e}})}#p(e){this.#x({type:`forge-ai-message-thread-user-resend`,detail:{messageId:e}})}#m(e,t){this.#x({type:`forge-ai-message-thread-user-edit`,detail:{messageId:e,content:t}})}#h(e){let t=this.tools?.get(e.name);return n`<forge-ai-tool-call .toolCall=${e} .toolDefinition=${t}></forge-ai-tool-call>`}get#g(){let e=this.messageItems[this.messageItems.length-1];return e?.type===`assistant`?e.data:void 0}#_(e){return n`
      <forge-ai-assistant-response
        .response=${e}
        .tools=${this.tools}
        ?enable-reactions=${this.enableReactions}
        ?debug-mode=${this.debugMode}
        ?show-thinking=${this.showThinking&&e===this.#g}
        @forge-ai-assistant-response-copy=${e=>this.#c(e.detail.responseId)}
        @forge-ai-assistant-response-resend=${e=>this.#l(e.detail.responseId)}
        @forge-ai-assistant-response-thumbs-up=${e=>this.#u(e.detail.responseId,e.detail.feedback)}
        @forge-ai-assistant-response-thumbs-down=${e=>this.#d(e.detail.responseId,e.detail.feedback)}>
      </forge-ai-assistant-response>
    `}get#v(){return this.messageItems.length?r:n`
      <forge-ai-empty-state>
        <slot name="empty-state-icon" slot="icon"></slot>
        <slot name="empty-state-heading" slot="heading">
          <span>How can I help you today?</span>
        </slot>
        <slot name="empty-state-message" slot="body"> Start a conversation by asking a question or describing what you'd like help with. </slot>
        <slot name="empty-state-actions" slot="actions"></slot>
      </forge-ai-empty-state>
    `}get#y(){return!this.showThinking||this.#g?r:n`<div class="thinking-indicator">
      <forge-ai-thinking-indicator class="status-indicator" show-text></forge-ai-thinking-indicator>
    </div>`}get#b(){return this.messageItems.filter(e=>e.type===`assistant`?!0:e.type===`toolCall`?!!this.tools?.get(e.data.name)?.renderer:e.type===`message`&&e.data.role!==`tool`).map(e=>{if(e.type===`assistant`)return this.#_(e.data);if(e.type===`toolCall`)return this.#h(e.data);let t=e.data,r=typeof t.content==`string`?t.content:``;if(t.role===`user`){let e=this.#e.getCachedHtml(t.id,r,{streaming:!1});return n`
          <forge-ai-user-message
            message-id=${t.id}
            .timestamp=${t.timestamp}
            .content=${r}
            ?streaming=${this.showThinking}
            @forge-ai-user-message-copy=${e=>this.#f(e.detail.messageId)}
            @forge-ai-user-message-resend=${e=>this.#p(e.detail.messageId)}
            @forge-ai-user-message-edit=${e=>this.#m(e.detail.messageId,e.detail.content)}>
            ${v(e)}
          </forge-ai-user-message>
        `}if(t.role===`system`)return n`
          <forge-ai-client-message kind=${t.kind??`text`} .header=${t.header} .content=${r} .actions=${t.actions??[]}>
          </forge-ai-client-message>
        `;if(t.status===`error`){let e=this.#e.getCachedHtml(t.id,r,{streaming:!1});return n`
          <forge-ai-error-message>
            <span slot="title">Error</span>
            ${v(e)}
          </forge-ai-error-message>
        `}return p(r.trim().length,()=>{let e=t.status===`streaming`||t.status===`pending`,i=this.#e.getCachedHtml(t.id,r,{streaming:e});return n`<forge-ai-response-message>${v(i)}</forge-ai-response-message>`})})}render(){return n`
      <div class="message-thread" @scroll=${this.autoScroll?this.#a:void 0}>
        ${this.#s}
        <div class="message-thread-content">${this.#v} ${this.#b} ${this.#y}</div>
      </div>
    `}#x(e){let t=new CustomEvent(e.type,{detail:e.detail,bubbles:!0,composed:!0});return this.dispatchEvent(t),t}},s([c({attribute:!1})],j.prototype,`messageItems`,void 0),s([c({attribute:!1})],j.prototype,`tools`,void 0),s([c({type:Boolean,attribute:`enable-reactions`})],j.prototype,`enableReactions`,void 0),s([c({type:Boolean,attribute:`show-thinking`})],j.prototype,`showThinking`,void 0),s([c({type:Boolean,attribute:`debug-mode`})],j.prototype,`debugMode`,void 0),s([c({attribute:`auto-scroll`})],j.prototype,`autoScroll`,void 0),s([l(`.message-thread`)],j.prototype,`_messageThreadContainer`,void 0),j=s([u(k)],j)})))()}function N(){return(N=e((()=>{M()})))()}var P=t({Demo:()=>z,WithClientMessages:()=>H,WithErroredToolCalls:()=>V,WithToolCalls:()=>B,__namedExportsOrder:()=>U,default:()=>R}),F,I,L,R,z,B,V,H,U;function W(){return(W=e((()=>{o(),N(),C(),{action:F}=__STORYBOOK_MODULE_ACTIONS__,I=`forge-ai-message-thread`,L=n`<style>
  .message-thread-story-host {
    inline-size: 100%;
    block-size: 600px;
    max-inline-size: 800px;
    margin-inline: auto;
    border: 1px solid var(--forge-theme-outline);
    overflow: hidden;
  }
</style>`,R={title:`AI/Components/Chat/Message Thread`,component:I,argTypes:{enableReactions:{control:`boolean`,description:`Enable thumbs up/down reaction buttons on assistant messages`},showThinking:{control:`boolean`,description:`Show thinking indicator when AI is processing`},debugMode:{control:`boolean`,description:`Show tool call inputs/outputs in the expanded tool call timeline`},autoScroll:{control:{type:`select`},options:[`off`,`on`],description:`Automatically scroll to the latest content when it changes`,defaultValue:`on`}},args:{enableReactions:!1,showThinking:!1,debugMode:!1,autoScroll:`on`},render:e=>{let t=[{type:`message`,data:{id:`msg-1`,role:`user`,content:`Hello! Can you help me understand web components?`,timestamp:Date.now()-6e4,status:`complete`}},{type:`message`,data:{id:`msg-2`,role:`assistant`,content:`Of course! Web Components are a suite of different technologies allowing you to create reusable custom elements — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps.

The main technologies are:
- **Custom Elements**: Define new HTML elements
- **Shadow DOM**: Encapsulated styles and markup
- **HTML Templates**: Reusable markup patterns`,timestamp:Date.now()-55e3,status:`complete`}},{type:`message`,data:{id:`msg-3`,role:`user`,content:`Can you show me a tool call example?`,timestamp:Date.now()-3e4,status:`complete`}},{type:`toolCall`,data:{id:`tool-1`,messageId:`msg-4`,name:`search_documentation`,args:{query:`web components tool call example`},status:`complete`,type:`client`,result:{found:!0}}},{type:`message`,data:{id:`msg-4`,role:`assistant`,content:`I've searched the documentation and found some examples for you!`,timestamp:Date.now()-2e4,status:`complete`}},{type:`message`,data:{id:`msg-5`,role:`user`,content:`Now look up the latest release and summarize it.`,timestamp:Date.now()-15e3,status:`complete`}},{type:`assistant`,data:{id:`res-1`,status:`complete`,timestamp:Date.now()-1e4,children:[{type:`text`,messageId:`res-1`,content:`Let me gather the details for you.

`,status:`complete`},{type:`toolCall`,data:{id:`tc-1`,messageId:`res-1`,name:`fetch_release`,args:{channel:`stable`},status:`complete`,type:`agent`,result:{version:`2.4.0`,date:`2026-06-20`},startTimestamp:Date.now()-1e4,endTimestamp:Date.now()-9200}},{type:`toolCall`,data:{id:`tc-2`,messageId:`res-1`,name:`search_documentation`,args:{query:`release notes 2.4.0`},status:`complete`,type:`client`,result:{found:!0,sections:3},startTimestamp:Date.now()-9200,endTimestamp:Date.now()-8500}},{type:`text`,messageId:`res-1`,content:`The latest stable release is **2.4.0** (June 20, 2026), which focuses on tooling improvements.`,status:`complete`}]}}],r=new Map([[`search_documentation`,{name:`search_documentation`,displayName:`Search Documentation`,description:`Search through documentation`}],[`fetch_release`,{name:`fetch_release`,displayName:`Fetch Release`,description:`Fetch the latest release information`}]]),i=F(`forge-ai-message-thread-copy`),a=F(`forge-ai-message-thread-resend`),o=F(`forge-ai-message-thread-thumbs-up`),s=F(`forge-ai-message-thread-thumbs-down`),c=F(`forge-ai-message-thread-scroll-request`);return n`
      ${L}
      <div class="message-thread-story-host">
        <forge-ai-message-thread
          .messageItems=${t}
          .tools=${r}
          ?enable-reactions=${e.enableReactions}
          ?show-thinking=${e.showThinking}
          ?debug-mode=${e.debugMode}
          auto-scroll=${e.autoScroll}
          @forge-ai-message-thread-copy=${i}
          @forge-ai-message-thread-resend=${a}
          @forge-ai-message-thread-thumbs-up=${o}
          @forge-ai-message-thread-thumbs-down=${s}
          @forge-ai-message-thread-scroll-request=${c}>
        </forge-ai-message-thread>
      </div>
    `}},z={},B={render:e=>{let t=[{type:`message`,data:{id:`msg-1`,role:`user`,content:`How many permits are overdue, and which departments are they stuck in?`,timestamp:Date.now()-2e4,status:`complete`}},{type:`assistant`,data:{id:`res-1`,status:`complete`,timestamp:Date.now()-15e3,children:[{type:`text`,messageId:`res-1`,content:`Let me check the current backlog. First I'll pull every pending permit, then narrow it down to the ones past their SLA.

`,status:`complete`},{type:`toolCall`,data:{id:`tc-1`,messageId:`res-1`,name:`permits.query`,args:{status:`pending`,sla:`overdue`,window_days:30},status:`complete`,type:`agent`,result:{overdue_count:412,total_pending:1183,oldest_days:47},startTimestamp:Date.now()-15e3,endTimestamp:Date.now()-14600}},{type:`toolCall`,data:{id:`tc-2`,messageId:`res-1`,name:`permits.group_by`,args:{field:`reviewing_department`,filter:`overdue`},status:`complete`,type:`agent`,result:{Building:168,Zoning:121,Fire:74,"Public Works":49},startTimestamp:Date.now()-14600,endTimestamp:Date.now()-14100}},{type:`text`,messageId:`res-1`,content:`There are **412 overdue permits** out of 1,183 pending, with the oldest sitting **47 days** past its SLA.

By reviewing department:
- **Building** — 168
- **Zoning** — 121
- **Fire** — 74
- **Public Works** — 49

Building and Zoning together account for roughly 70% of the backlog, so they're the best place to focus.`,status:`complete`}]}}],r=new Map([[`permits.query`,{name:`permits.query`,displayName:`Query Permits`,description:`Pull permits matching a status and SLA window`}],[`permits.group_by`,{name:`permits.group_by`,displayName:`Group Permits`,description:`Break the backlog down by a field`}]]),i=F(`forge-ai-message-thread-copy`),a=F(`forge-ai-message-thread-resend`),o=F(`forge-ai-message-thread-thumbs-up`),s=F(`forge-ai-message-thread-thumbs-down`),c=F(`forge-ai-message-thread-scroll-request`);return n`
      ${L}
      <div class="message-thread-story-host">
        <forge-ai-message-thread
          .messageItems=${t}
          .tools=${r}
          ?enable-reactions=${e.enableReactions}
          ?show-thinking=${e.showThinking}
          ?debug-mode=${e.debugMode}
          auto-scroll=${e.autoScroll}
          @forge-ai-message-thread-copy=${i}
          @forge-ai-message-thread-resend=${a}
          @forge-ai-message-thread-thumbs-up=${o}
          @forge-ai-message-thread-thumbs-down=${s}
          @forge-ai-message-thread-scroll-request=${c}>
        </forge-ai-message-thread>
      </div>
    `}},V={render:e=>{let t=[{type:`message`,data:{id:`msg-1`,role:`user`,content:`Pull the latest sales figures and email them to the leadership list.`,timestamp:Date.now()-2e4,status:`complete`}},{type:`assistant`,data:{id:`res-1`,status:`complete`,timestamp:Date.now()-15e3,children:[{type:`text`,messageId:`res-1`,content:`I'll grab the numbers first, then send them out.

`,status:`complete`},{type:`toolCall`,data:{id:`tc-1`,messageId:`res-1`,name:`sales.fetch_report`,args:{period:`Q2-2026`,region:`all`},status:`complete`,type:`agent`,result:{total:482e4,currency:`USD`,rows:128},startTimestamp:Date.now()-15e3,endTimestamp:Date.now()-14500}},{type:`toolCall`,data:{id:`tc-2`,messageId:`res-1`,name:`email.send`,args:{list:`leadership`,subject:`Q2 2026 Sales`},status:`error`,type:`agent`,result:{error:`SMTP 550: recipient list "leadership" not found`,code:550},startTimestamp:Date.now()-14500,endTimestamp:Date.now()-13900}},{type:`text`,messageId:`res-1`,content:"I pulled the Q2 2026 report (**$4.82M** across 128 rows), but sending the email **failed** — the mailing list `leadership` could not be found. Could you confirm the correct list name or share the recipient addresses?",status:`complete`}]}}],r=new Map([[`sales.fetch_report`,{name:`sales.fetch_report`,displayName:`Fetch Sales Report`,description:`Pull an aggregated sales report for a period`}],[`email.send`,{name:`email.send`,displayName:`Send Email`,description:`Send an email to a distribution list`}]]),i=F(`forge-ai-message-thread-copy`),a=F(`forge-ai-message-thread-resend`),o=F(`forge-ai-message-thread-thumbs-up`),s=F(`forge-ai-message-thread-thumbs-down`),c=F(`forge-ai-message-thread-scroll-request`);return n`
      ${L}
      <div class="message-thread-story-host">
        <forge-ai-message-thread
          .messageItems=${t}
          .tools=${r}
          ?enable-reactions=${e.enableReactions}
          ?show-thinking=${e.showThinking}
          ?debug-mode=${e.debugMode}
          auto-scroll=${e.autoScroll}
          @forge-ai-message-thread-copy=${i}
          @forge-ai-message-thread-resend=${a}
          @forge-ai-message-thread-thumbs-up=${o}
          @forge-ai-message-thread-thumbs-down=${s}
          @forge-ai-message-thread-scroll-request=${c}>
        </forge-ai-message-thread>
      </div>
    `}},H={render:e=>{let t=F(`forge-ai-message-thread-copy`),r=F(`forge-ai-message-thread-resend`),i=F(`forge-ai-message-thread-thumbs-up`),a=F(`forge-ai-message-thread-thumbs-down`),o=F(`forge-ai-message-thread-scroll-request`),s=F(`client-message-action-click`),c=[{type:`message`,data:{id:`msg-1`,role:`user`,content:`Summarize the latest incident report.`,timestamp:Date.now()-9e4,status:`complete`}},{type:`message`,data:{id:`switch-1`,role:`system`,content:`Switched to Incident Response Agent`,timestamp:Date.now()-85e3,status:`complete`,clientOnly:!0}},{type:`message`,data:{id:`msg-2`,role:`assistant`,content:`Here is a summary of the most recent incident report...`,timestamp:Date.now()-8e4,status:`complete`}},{type:`message`,data:{id:`indexing-1`,role:`system`,content:`Indexing 3 uploaded documents...`,timestamp:Date.now()-6e4,status:`complete`,clientOnly:!0,kind:`info`,header:`Indexing`}},{type:`message`,data:{id:`upload-error-1`,role:`system`,content:`incident-photos.zip could not be uploaded because it exceeds the 25 MB limit.`,timestamp:Date.now()-5e4,status:`complete`,clientOnly:!0,kind:`warning`,header:`Upload failed`}},{type:`message`,data:{id:`msg-3`,role:`user`,content:`Send a message now.`,timestamp:Date.now()-3e4,status:`complete`}},{type:`message`,data:{id:`session-expired-1`,role:`system`,content:`Your session expired. Please refresh the page to re-authenticate.`,timestamp:Date.now()-25e3,status:`complete`,clientOnly:!0,kind:`error`,header:`Session expired`,actions:[{id:`refresh`,label:`Refresh`,onClick:()=>s(`refresh`)}]}},{type:`message`,data:{id:`upload-success-1`,role:`system`,content:`incident-photos-resized.zip uploaded successfully.`,timestamp:Date.now()-1e4,status:`complete`,clientOnly:!0,kind:`success`}}];return n`
      ${L}
      <div class="message-thread-story-host">
        <forge-ai-message-thread
          .messageItems=${c}
          ?enable-reactions=${e.enableReactions}
          ?show-thinking=${e.showThinking}
          ?debug-mode=${e.debugMode}
          auto-scroll=${e.autoScroll}
          @forge-ai-message-thread-copy=${t}
          @forge-ai-message-thread-resend=${r}
          @forge-ai-message-thread-thumbs-up=${i}
          @forge-ai-message-thread-thumbs-down=${a}
          @forge-ai-message-thread-scroll-request=${o}>
        </forge-ai-message-thread>
      </div>
    `}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: args => {
    const messageItems: MessageItem[] = [{
      type: 'message',
      data: {
        id: 'msg-1',
        role: 'user',
        content: 'How many permits are overdue, and which departments are they stuck in?',
        timestamp: Date.now() - 20000,
        status: 'complete'
      }
    }, {
      type: 'assistant',
      data: {
        id: 'res-1',
        status: 'complete',
        timestamp: Date.now() - 15000,
        children: [{
          type: 'text',
          messageId: 'res-1',
          content: "Let me check the current backlog. First I'll pull every pending permit, then narrow it down to the ones past their SLA.\\n\\n",
          status: 'complete'
        }, {
          type: 'toolCall',
          data: {
            id: 'tc-1',
            messageId: 'res-1',
            name: 'permits.query',
            // eslint-disable-next-line camelcase -- sample tool arguments mimic a snake_case backend API
            args: {
              status: 'pending',
              sla: 'overdue',
              window_days: 30
            },
            status: 'complete',
            type: 'agent',
            // eslint-disable-next-line camelcase -- sample tool result mimic a snake_case backend API
            result: {
              overdue_count: 412,
              total_pending: 1183,
              oldest_days: 47
            },
            startTimestamp: Date.now() - 15000,
            endTimestamp: Date.now() - 14600
          }
        }, {
          type: 'toolCall',
          data: {
            id: 'tc-2',
            messageId: 'res-1',
            name: 'permits.group_by',
            args: {
              field: 'reviewing_department',
              filter: 'overdue'
            },
            status: 'complete',
            type: 'agent',
            result: {
              Building: 168,
              Zoning: 121,
              Fire: 74,
              'Public Works': 49
            },
            startTimestamp: Date.now() - 14600,
            endTimestamp: Date.now() - 14100
          }
        }, {
          type: 'text',
          messageId: 'res-1',
          content: "There are **412 overdue permits** out of 1,183 pending, with the oldest sitting **47 days** past its SLA.\\n\\nBy reviewing department:\\n- **Building** — 168\\n- **Zoning** — 121\\n- **Fire** — 74\\n- **Public Works** — 49\\n\\nBuilding and Zoning together account for roughly 70% of the backlog, so they're the best place to focus.",
          status: 'complete'
        }]
      }
    }];
    const tools: Map<string, ToolDefinition> = new Map([['permits.query', {
      name: 'permits.query',
      displayName: 'Query Permits',
      description: 'Pull permits matching a status and SLA window'
    }], ['permits.group_by', {
      name: 'permits.group_by',
      displayName: 'Group Permits',
      description: 'Break the backlog down by a field'
    }]]);
    const onCopy = action('forge-ai-message-thread-copy');
    const onResend = action('forge-ai-message-thread-resend');
    const onThumbsUp = action('forge-ai-message-thread-thumbs-up');
    const onThumbsDown = action('forge-ai-message-thread-thumbs-down');
    const onScrollRequest = action('forge-ai-message-thread-scroll-request');
    return html\`
      \${storyStyles}
      <div class="message-thread-story-host">
        <forge-ai-message-thread
          .messageItems=\${messageItems}
          .tools=\${tools}
          ?enable-reactions=\${args.enableReactions}
          ?show-thinking=\${args.showThinking}
          ?debug-mode=\${args.debugMode}
          auto-scroll=\${args.autoScroll}
          @forge-ai-message-thread-copy=\${onCopy}
          @forge-ai-message-thread-resend=\${onResend}
          @forge-ai-message-thread-thumbs-up=\${onThumbsUp}
          @forge-ai-message-thread-thumbs-down=\${onThumbsDown}
          @forge-ai-message-thread-scroll-request=\${onScrollRequest}>
        </forge-ai-message-thread>
      </div>
    \`;
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: args => {
    const messageItems: MessageItem[] = [{
      type: 'message',
      data: {
        id: 'msg-1',
        role: 'user',
        content: 'Pull the latest sales figures and email them to the leadership list.',
        timestamp: Date.now() - 20000,
        status: 'complete'
      }
    }, {
      type: 'assistant',
      data: {
        id: 'res-1',
        status: 'complete',
        timestamp: Date.now() - 15000,
        children: [{
          type: 'text',
          messageId: 'res-1',
          content: "I'll grab the numbers first, then send them out.\\n\\n",
          status: 'complete'
        }, {
          type: 'toolCall',
          data: {
            id: 'tc-1',
            messageId: 'res-1',
            name: 'sales.fetch_report',
            args: {
              period: 'Q2-2026',
              region: 'all'
            },
            status: 'complete',
            type: 'agent',
            result: {
              total: 4820000,
              currency: 'USD',
              rows: 128
            },
            startTimestamp: Date.now() - 15000,
            endTimestamp: Date.now() - 14500
          }
        }, {
          type: 'toolCall',
          data: {
            id: 'tc-2',
            messageId: 'res-1',
            name: 'email.send',
            args: {
              list: 'leadership',
              subject: 'Q2 2026 Sales'
            },
            status: 'error',
            type: 'agent',
            result: {
              error: 'SMTP 550: recipient list "leadership" not found',
              code: 550
            },
            startTimestamp: Date.now() - 14500,
            endTimestamp: Date.now() - 13900
          }
        }, {
          type: 'text',
          messageId: 'res-1',
          content: 'I pulled the Q2 2026 report (**$4.82M** across 128 rows), but sending the email **failed** — the mailing list \`leadership\` could not be found. Could you confirm the correct list name or share the recipient addresses?',
          status: 'complete'
        }]
      }
    }];
    const tools: Map<string, ToolDefinition> = new Map([['sales.fetch_report', {
      name: 'sales.fetch_report',
      displayName: 'Fetch Sales Report',
      description: 'Pull an aggregated sales report for a period'
    }], ['email.send', {
      name: 'email.send',
      displayName: 'Send Email',
      description: 'Send an email to a distribution list'
    }]]);
    const onCopy = action('forge-ai-message-thread-copy');
    const onResend = action('forge-ai-message-thread-resend');
    const onThumbsUp = action('forge-ai-message-thread-thumbs-up');
    const onThumbsDown = action('forge-ai-message-thread-thumbs-down');
    const onScrollRequest = action('forge-ai-message-thread-scroll-request');
    return html\`
      \${storyStyles}
      <div class="message-thread-story-host">
        <forge-ai-message-thread
          .messageItems=\${messageItems}
          .tools=\${tools}
          ?enable-reactions=\${args.enableReactions}
          ?show-thinking=\${args.showThinking}
          ?debug-mode=\${args.debugMode}
          auto-scroll=\${args.autoScroll}
          @forge-ai-message-thread-copy=\${onCopy}
          @forge-ai-message-thread-resend=\${onResend}
          @forge-ai-message-thread-thumbs-up=\${onThumbsUp}
          @forge-ai-message-thread-thumbs-down=\${onThumbsDown}
          @forge-ai-message-thread-scroll-request=\${onScrollRequest}>
        </forge-ai-message-thread>
      </div>
    \`;
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: args => {
    const onCopy = action('forge-ai-message-thread-copy');
    const onResend = action('forge-ai-message-thread-resend');
    const onThumbsUp = action('forge-ai-message-thread-thumbs-up');
    const onThumbsDown = action('forge-ai-message-thread-thumbs-down');
    const onScrollRequest = action('forge-ai-message-thread-scroll-request');
    const onActionClick = action('client-message-action-click');
    const refreshAction: ClientMessageAction[] = [{
      id: 'refresh',
      label: 'Refresh',
      onClick: () => onActionClick('refresh')
    }];
    const messageItems: MessageItem[] = [{
      type: 'message',
      data: {
        id: 'msg-1',
        role: 'user',
        content: 'Summarize the latest incident report.',
        timestamp: Date.now() - 90000,
        status: 'complete'
      }
    }, {
      type: 'message',
      data: {
        id: 'switch-1',
        role: 'system',
        content: 'Switched to Incident Response Agent',
        timestamp: Date.now() - 85000,
        status: 'complete',
        clientOnly: true
      }
    }, {
      type: 'message',
      data: {
        id: 'msg-2',
        role: 'assistant',
        content: 'Here is a summary of the most recent incident report...',
        timestamp: Date.now() - 80000,
        status: 'complete'
      }
    }, {
      type: 'message',
      data: {
        id: 'indexing-1',
        role: 'system',
        content: 'Indexing 3 uploaded documents...',
        timestamp: Date.now() - 60000,
        status: 'complete',
        clientOnly: true,
        kind: 'info',
        header: 'Indexing'
      }
    }, {
      type: 'message',
      data: {
        id: 'upload-error-1',
        role: 'system',
        content: 'incident-photos.zip could not be uploaded because it exceeds the 25 MB limit.',
        timestamp: Date.now() - 50000,
        status: 'complete',
        clientOnly: true,
        kind: 'warning',
        header: 'Upload failed'
      }
    }, {
      type: 'message',
      data: {
        id: 'msg-3',
        role: 'user',
        content: 'Send a message now.',
        timestamp: Date.now() - 30000,
        status: 'complete'
      }
    }, {
      type: 'message',
      data: {
        id: 'session-expired-1',
        role: 'system',
        content: 'Your session expired. Please refresh the page to re-authenticate.',
        timestamp: Date.now() - 25000,
        status: 'complete',
        clientOnly: true,
        kind: 'error',
        header: 'Session expired',
        actions: refreshAction
      }
    }, {
      type: 'message',
      data: {
        id: 'upload-success-1',
        role: 'system',
        content: 'incident-photos-resized.zip uploaded successfully.',
        timestamp: Date.now() - 10000,
        status: 'complete',
        clientOnly: true,
        kind: 'success'
      }
    }];
    return html\`
      \${storyStyles}
      <div class="message-thread-story-host">
        <forge-ai-message-thread
          .messageItems=\${messageItems}
          ?enable-reactions=\${args.enableReactions}
          ?show-thinking=\${args.showThinking}
          ?debug-mode=\${args.debugMode}
          auto-scroll=\${args.autoScroll}
          @forge-ai-message-thread-copy=\${onCopy}
          @forge-ai-message-thread-resend=\${onResend}
          @forge-ai-message-thread-thumbs-up=\${onThumbsUp}
          @forge-ai-message-thread-thumbs-down=\${onThumbsDown}
          @forge-ai-message-thread-scroll-request=\${onScrollRequest}>
        </forge-ai-message-thread>
      </div>
    \`;
  }
}`,...H.parameters?.docs?.source}}},U=[`Demo`,`WithToolCalls`,`WithErroredToolCalls`,`WithClientMessages`]})))()}export{B as a,V as i,z as n,W as o,H as r,P as t};