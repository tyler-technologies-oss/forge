import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t}from"./lit-html-SpIZ5SkX.js";import{T as n,_ as r,g as i}from"./iframe-BbUsXXnT.js";import{t as a}from"./decorate-2OK4V6AF.js";import{d as o,p as s,t as c}from"./decorators-Ci1onliJ.js";import{t as l}from"./tooltip2-DY1gJCOv.js";import{n as u}from"./when-Daf2bbVy.js";import{r as d,t as f}from"./dom-C1zFLlWW.js";var p;function m(){return(m=e((()=>{p=`/**
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
:host {
  display: block;
  container-type: inline-size;
  width: 100%;
  max-inline-size: var(--forge-ai-suggestions-inline-size, 768px);
}

.custom-list-item {
  --forge-list-item-height: 32px;
  --forge-list-item-padding: var(--forge-spacing-xxsmall, 4px);
  --forge-list-item-shape: calc(var(--forge-shape-large, 8px) * var(--forge-shape-factor, 1));
  --forge-icon-color: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
  display: flex;
  align-items: center;
  justify-content: start;
  gap: var(--forge-spacing-medium, 16px);
  margin-inline: calc(var(--forge-spacing-xxsmall, 4px) * -1) 0;
  margin-block: 0;
  width: 100%;
}
.custom-list-item button {
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
  justify-content: start;
  text-box-trim: both;
  max-inline-size: var(--forge-ai-suggestion-max-width, 82.5cqi);
  min-inline-size: 0;
}
.custom-list-item button .suggestion-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.custom-list-item button:hover, .custom-list-item button:focus-within, .custom-list-item button::after {
  border-radius: calc(var(--forge-shape-large, 8px) * var(--forge-shape-factor, 1));
}

:host(:state(inline)) .custom-list-item {
  flex: 0 0 auto; /* === don't grow, don't shrink, size to content */
  width: fit-content; /* optional, just makes intent explicit */
}

:host(:state(block)) .forge-list {
  display: flex;
  flex-direction: column;
  gap: var(--forge-spacing-xxsmall, 4px);
}

.block-layout-container {
  display: flex;
  flex-direction: column;
}

.scroll-container {
  overflow: scroll;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  height: 100%;
}

.suggestions-inline {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  width: max-content;
  gap: var(--forge-spacing-small, 12px);
}

.suggestion-tooltip {
  --forge-tooltip-content-align: start;
}`})))()}var h,g;function _(){return(_=e((()=>{l(),m(),i(),c(),h=`forge-ai-suggestions`,g=class extends r{static{this.styles=n(p)}#e;constructor(){super(),this.suggestions=[],this.variant=`inline`,this._suggestionState=new Map,this.#e=this.attachInternals(),this.#r()}willUpdate(e){e.has(`variant`)&&this.#r(),e.has(`suggestions`)&&this.#t()}updated(e){e.has(`suggestions`)&&this.#n()}#t(){let e=new Map;for(let t of this.suggestions){let n=this._suggestionState.get(t);n?e.set(t,n):e.set(t,{id:f(`suggestion`),isOverflowing:!1})}this._suggestionState=e}#n(){setTimeout(()=>{let e=!1;(this.shadowRoot?.querySelectorAll(`.action-title`))?.forEach(t=>{let n=t.querySelector(`.suggestion-text`),r=n.scrollWidth>n.offsetWidth,i=t.id;for(let[,t]of this._suggestionState.entries())if(t.id===i&&t.isOverflowing!==r){t.isOverflowing=r,e=!0;break}}),e&&this.requestUpdate()})}#r(){d(this.#e,`inline`,this.variant===`inline`),d(this.#e,`block`,this.variant===`block`)}get#i(){return this.suggestions?.map(e=>{let n=this._suggestionState.get(e),r=n?.id??``,i=n?.isOverflowing??!1;return t`
        <li class="forge-list-item custom-list-item">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon" aria-hidden="true">
            <path
              d="M9 22a1 1 0 0 1-1-1v-3H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6.1l-3.7 3.71c-.2.19-.45.29-.7.29zm1-6v3.08L13.08 16H20V4H4v12zM6 7h12v2H6zm0 4h9v2H6z" />
          </svg>
          <button id="${r}" class="action-title" @click=${()=>this._handleSuggestionClick(e)}>
            <span class="suggestion-text">${e.text}</span>
          </button>
          ${u(i,()=>t`<forge-ai-tooltip class="suggestion-tooltip" for="${r}" role="presentation">${e.text}</forge-ai-tooltip>`)}
        </li>
      `})}_handleSuggestionClick(e){let t=new CustomEvent(`forge-ai-suggestions-select`,{detail:{text:e.text,value:e.value},bubbles:!0,composed:!0,cancelable:!0});this.dispatchEvent(t)}get#a(){return t`
      <div class="scroll-container">
        <ul class="forge-list suggestions-inline">
          ${this.#i}
        </ul>
      </div>
    `}get#o(){return t`
      <div class="block-layout-container">
        <ul class="forge-list forge-list--block-layout">
          ${this.#i}
        </ul>
      </div>
    `}render(){return this.variant===`block`?this.#o:this.#a}},a([o({type:Array,attribute:!1})],g.prototype,`suggestions`,void 0),a([o({type:String,attribute:`variant`})],g.prototype,`variant`,void 0),g=a([s(h)],g)})))()}function v(){return(v=e((()=>{_()})))()}export{v as t};