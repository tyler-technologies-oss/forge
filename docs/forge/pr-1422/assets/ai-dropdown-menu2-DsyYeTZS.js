import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t}from"./lit-html-SpIZ5SkX.js";import{T as n,_ as r,g as i}from"./iframe-CbV23-8Y.js";import{t as a}from"./decorate-2OK4V6AF.js";import{a as o,d as s,l as c,o as l,p as u,r as d,t as f}from"./decorators-DcQFeJ4p.js";import{n as p}from"./when-Daf2bbVy.js";import{t as m}from"./class-map-DEew1OiS.js";import{t as h}from"./class-map-8zp5OV2u.js";import{t as g}from"./dom-C1zFLlWW.js";import{t as _}from"./popover2-h2YYmqha.js";import{r as v,t as y}from"./if-defined-B1ve8lTA.js";import{t as b}from"./ai-dropdown-menu-item2-CE4UnG6u.js";var x;function S(){return(S=e((()=>{x=`/**
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

:host {
  display: contents;
}

.forge-divider {
  margin: var(--forge-spacing-xsmall, 8px) 0;
}`})))()}var C;function w(){return(w=e((()=>{S(),i(),f(),C=class extends r{static{this.styles=n(x)}connectedCallback(){super.connectedCallback()}render(){return t`<div class="forge-divider" role="separator"></div>`}},C=a([u(`forge-ai-dropdown-menu-separator`)],C)})))()}var T;function E(){return(E=e((()=>{T=class{constructor(e,t,n,r,i,a){this._host=e,this._getMenuItems=t,this._onItemSelect=n,this._onClose=r,this._onOpen=i,this._isSubmenu=a,this._selectedIndex=-1,this._openedViaKeyboard=!1}get selectedIndex(){return this._selectedIndex}set selectedIndex(e){this._selectedIndex=e}get openedViaKeyboard(){return this._openedViaKeyboard}set openedViaKeyboard(e){this._openedViaKeyboard=e}handleKeyDown(e,t,n){let r=e.target;if(r&&r!==this._host){let e=r.closest(`forge-ai-dropdown-menu[data-submenu="true"]`);if(e&&e!==this._host)return!1}switch(e.key){case`Enter`:case` `:if(t&&this._selectedIndex>=0)return e.preventDefault(),this._onItemSelect(this._selectedIndex),!0;break;case`Escape`:if(t)return e.preventDefault(),this._onClose(),n?.focus(),!0;break;case`ArrowDown`:if(t)return e.preventDefault(),this._moveSelection(1),!0;if(n&&e.composedPath()[0]===n)return e.preventDefault(),this._openedViaKeyboard=!0,this._onOpen(),!0;break;case`ArrowUp`:if(t)return e.preventDefault(),this._moveSelection(-1),!0;break;case`ArrowRight`:if(t&&this._selectedIndex>=0){let e=this._getMenuItems()[this._selectedIndex];return e&&e.dispatchEvent(new KeyboardEvent(`keydown`,{key:`ArrowRight`,bubbles:!1})),!0}break;case`ArrowLeft`:if(t&&this._isSubmenu()){e.preventDefault(),this._onClose();let t=this._host.parentElement;return t&&t.tagName.toLowerCase()===`forge-ai-dropdown-menu-item`&&t.focus(),!0}break;case`Home`:if(t)return e.preventDefault(),this._selectedIndex=0,this._updateItemFocus(),!0;break;case`End`:if(t)return e.preventDefault(),this._selectedIndex=Math.max(0,this._getMenuItems().length-1),this._updateItemFocus(),!0}return!1}_moveSelection(e){let t=this._getMenuItems();if(t.length!==0){if(this._selectedIndex===-1)this._selectedIndex=e>0?0:t.length-1;else{let n=this._selectedIndex+e;n<0?n=t.length-1:n>=t.length&&(n=0),this._selectedIndex=n}this._updateItemFocus()}}_updateItemFocus(){this._getMenuItems().forEach((e,t)=>{e.setAttribute(`tabindex`,t===this._selectedIndex?`0`:`-1`),t===this._selectedIndex&&e.focus()})}focusFirstItem(){this._getMenuItems().length>0&&(this._selectedIndex=0,this._updateItemFocus())}clearItemFocus(){this._getMenuItems().forEach(e=>{e.setAttribute(`tabindex`,`-1`)})}onOpen(){this._selectedIndex=-1,this.clearItemFocus()}onClose(){this._openedViaKeyboard=!1}onShown(){this._openedViaKeyboard&&(this._openedViaKeyboard=!1,this.focusFirstItem())}reset(){this._selectedIndex=-1,this._openedViaKeyboard=!1}}})))()}var D;function O(){return(O=e((()=>{D=class{constructor(e,t,n){this._getMenuItems=e,this._onSelectionChange=t,this._value=null,this._config={closeOnSingleSelect:!0,showSelectionCount:!0,...n}}get value(){return this._value}set value(e){this._value=e,this._updateItemSelectionState()}get selectionMode(){return this._config.mode}set selectionMode(e){this._config.mode=e,this._updateItemSelectionState()}updateConfig(e){this._config={...this._config,...e},this._updateItemSelectionState()}selectItem(e){let t=e.value||``;switch(this._config.mode){case`none`:return this._handleActionSelection(e,t);case`single`:return this._handleSingleSelection(e,t);case`multi`:return this._handleMultiSelection(e,t);default:return{shouldClose:!1}}}getSelectedItems(){let e=this._getMenuItems(),t=this._getSelectedValuesArray();return e.filter(e=>{let n=e.value||``;return t.includes(n)})}getSelectedText(){if(this._config.mode===`none`)return``;let e=this.getSelectedItems();return e.length===0?``:this._config.mode===`single`?e[0].labelText||``:this._config.mode===`multi`&&this._config.showSelectionCount?e.length===1?`1 option selected`:`${e.length} options selected`:``}shouldShowSelectedText(){return(this._config.mode===`single`||this._config.mode===`multi`)&&this.getSelectedText()!==``}_updateItemSelectionState(){let e=this._getMenuItems(),t=this._getSelectedValuesArray();e.forEach(e=>{e.selectionMode=this._config.mode;let n=e.value||``;e.selected=t.includes(n)})}_handleActionSelection(e,t){let n={selectionMode:`none`,value:t,selectedItem:e,timestamp:Date.now()};return this._onSelectionChange(n),{shouldClose:!0}}_handleSingleSelection(e,t){let n=typeof this._value==`string`?this._value:null;this._value=t,this._updateItemSelectionState();let r={selectionMode:`single`,value:this._value,selectedItem:e,previousValue:n,timestamp:Date.now()};return this._onSelectionChange(r),{shouldClose:!!this._config.closeOnSingleSelect}}_handleMultiSelection(e,t){let n=this._getSelectedValuesArray(),r=n.indexOf(t),i=[],a=[];r>=0?(n.splice(r,1),a=[e]):(n.push(t),i=[e]),this._value=n,this._updateItemSelectionState();let o={selectionMode:`multi`,value:n,selectedItem:this.getSelectedItems(),addedItems:i.length>0?i:void 0,removedItems:a.length>0?a:void 0,timestamp:Date.now()};return this._onSelectionChange(o),{shouldClose:!1}}_getSelectedValuesArray(){return Array.isArray(this._value)?[...this._value]:this._value?[this._value]:[]}reset(){this._value=null,this._updateItemSelectionState()}}})))()}var k;function A(){return(A=e((()=>{k=`/**
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
  display: inline-block;
  position: relative;
  color: var(--forge-theme-text-high, rgba(0, 0, 0, 0.87));
  --_ai-dropdown-menu-min-width: var(--forge-ai-dropdown-menu-min-width, 200px);
  --_ai-dropdown-menu-max-width: var(--forge-ai-dropdown-menu-max-width, 400px);
  --_ai-dropdown-menu-max-height: var(--forge-ai-dropdown-menu-max-height, 300px);
  --_ai-dropdown-menu-padding: var(--forge-ai-dropdown-menu-padding, var(--forge-spacing-xxsmall, 4px) 0);
}

.forge-button,
.forge-icon-button {
  --forge-button-color: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
  --forge-icon-button-color: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
}
.forge-button ::slotted(svg),
.forge-icon-button ::slotted(svg) {
  fill: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
}

.ai-dropdown-menu__dropdown::-webkit-scrollbar {
  height: var(--forge-scrollbar-height, 16px);
  width: var(--forge-scrollbar-width, 16px);
}
.ai-dropdown-menu__dropdown::-webkit-scrollbar-track {
  background-color: var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb));
}
.ai-dropdown-menu__dropdown::-webkit-scrollbar-track:hover {
  background-color: var(--forge-scrollbar-track-container-hover, var(--forge-theme-surface-container-low, #ebebeb));
}
.ai-dropdown-menu__dropdown::-webkit-scrollbar-corner {
  background-color: var(--forge-scrollbar-track-container, var(--forge-theme-surface-container-low, #ebebeb));
}
.ai-dropdown-menu__dropdown::-webkit-scrollbar-thumb {
  height: var(--forge-scrollbar-thumb-min-height, 32px);
  width: var(--forge-scrollbar-thumb-min-width, 32px);
  border-radius: var(--forge-scrollbar-border-radius, calc(var(--forge-shape-full, 9999px) * var(--forge-shape-factor, 1)));
  border-width: var(--forge-scrollbar-border-width, 3px);
  border-style: solid;
  border-color: transparent;
  background-color: var(--forge-scrollbar-thumb-container, var(--forge-theme-surface-container-medium, #c2c2c2));
  background-clip: content-box;
}
.ai-dropdown-menu__dropdown::-webkit-scrollbar-thumb:hover {
  background-color: var(--forge-scrollbar-thumb-container-hover, var(--forge-theme-surface-container-high, #9e9e9e));
}
.ai-dropdown-menu__dropdown {
  min-width: var(--_ai-dropdown-menu-min-width);
  max-width: var(--_ai-dropdown-menu-max-width);
  max-height: var(--_ai-dropdown-menu-max-height);
  overflow-y: auto;
  padding: var(--_ai-dropdown-menu-padding);
}

::slotted([slot=header]) {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-heading1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-heading1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading1-font-size-scale, 0.875)));
  font-weight: var(--forge-typography-heading1-font-weight, 500);
  line-height: var(--forge-typography-heading1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading1-line-height-scale, 1.125)));
  letter-spacing: var(--forge-typography-heading1-letter-spacing, 0.0178571429em);
  text-transform: var(--forge-typography-heading1-text-transform, inherit);
  text-decoration: var(--forge-typography-heading1-text-decoration, inherit);
  display: block;
  margin-block-start: var(--forge-spacing-xxsmall, 4px);
  margin-inline: var(--forge-spacing-small, 12px);
}`})))()}var j;function M(){return(M=e((()=>{j=`.ai-dropdown-menu-item-group {
  display: block;
  margin-block: var(--forge-spacing-xsmall, 8px);
}

::slotted([slot=label]) {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--forge-typography-overline-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));
  font-size: var(--forge-typography-overline-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-overline-font-size-scale, 0.75)));
  font-weight: var(--forge-typography-overline-font-weight, 500);
  line-height: var(--forge-typography-overline-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-overline-line-height-scale, 2)));
  letter-spacing: var(--forge-typography-overline-letter-spacing, 0.1666666667em);
  text-transform: var(--forge-typography-overline-text-transform, uppercase);
  text-decoration: var(--forge-typography-overline-text-decoration, inherit);
  margin-inline: var(--forge-spacing-small, 12px);
  color: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
}

.ai-dropdown-menu-item-group__content {
  display: block;
}`})))()}var N;function P(){return(P=e((()=>{M(),w(),i(),f(),y(),N=class extends r{constructor(...e){super(...e),this._groupId=g(`group`),this.#e=t`<slot name="label" @slotchange=${this.#r}></slot>`,this.#t=t`<slot></slot>`}static{this.styles=n(j)}get _hasLabel(){return this._labelSlottedNodes.length>0}#e;#t;get#n(){return p(this._hasLabel,()=>t`<div class="ai-dropdown-menu-item-group__label" id="${this._groupId}-label">${this.#e}</div>`,()=>this.#e)}#r(e){e.target.name===`label`&&this.requestUpdate()}render(){return t`
      <forge-ai-dropdown-menu-separator></forge-ai-dropdown-menu-separator>
      <div
        class="ai-dropdown-menu-item-group"
        role="${v(this._hasLabel?`group`:void 0)}"
        aria-labelledby="${v(this._hasLabel?`${this._groupId}-label`:void 0)}">
        ${this.#n}
        <div class="ai-dropdown-menu-item-group__content">${this.#t}</div>
      </div>
    `}},a([d({slot:`label`,flatten:!0})],N.prototype,`_labelSlottedNodes`,void 0),a([c()],N.prototype,`_groupId`,void 0),N=a([u(`forge-ai-dropdown-menu-item-group`)],N)})))()}var F;function I(){return(I=e((()=>{_(),E(),O(),A(),w(),P(),b(),i(),f(),y(),h(),F=class extends r{constructor(...e){super(...e),this.variant=`button`,this.density=`medium`,this.open=!1,this.disabled=!1,this.selectionMode=`none`,this.value=null,this.popoverPlacement=`bottom-start`,this._isSubmenu=!1,this._onKeyDown=e=>{!this.disabled&&this._navigationController&&this._navigationController.handleKeyDown(e,this.open,this._triggerButton)},this.#e=t`<slot name="trigger-content">Choose...</slot>`,this.#r=t`
    <slot name="header"></slot>
    <slot @slotchange=${this._onDefaultSlotChange}></slot>
  `}static{this.styles=n(k)}connectedCallback(){super.connectedCallback(),this._detectSubmenuMode(),this._initializeControllers(),this.addEventListener(`keydown`,this._onKeyDown),this.addEventListener(`focusout`,this._onFocusOut)}_detectSubmenuMode(){this._isSubmenu=this.parentElement?.tagName.toLowerCase()===`forge-ai-dropdown-menu-item`,this._isSubmenu&&this.setAttribute(`data-submenu`,`true`)}_initializeControllers(){this._navigationController=new T(this,()=>this._getMenuItems(),e=>this._selectItem(e),()=>{this.open=!1},()=>{this.open=!0},()=>this._isSubmenu),this._selectionManager=new D(()=>this._getMenuItems(),e=>this._dispatchSelectionEvent(e),{mode:this.selectionMode}),this._selectionManager.value=this.value}firstUpdated(){this._updateItemSelectionState()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`keydown`,this._onKeyDown),this.removeEventListener(`focusout`,this._onFocusOut)}updated(e){e.has(`open`)&&(this._popover.open=this.open,this.open?(this.setAttribute(`data-handles-escape`,``),this._navigationController?.onOpen(),this._dispatchOpenCloseEvent(`open`)):e.get(`open`)===!0&&(this.removeAttribute(`data-handles-escape`),this._navigationController?.onClose(),this._dispatchOpenCloseEvent(`close`))),e.has(`selectionMode`)&&this._selectionManager?.updateConfig({mode:this.selectionMode}),e.has(`value`)&&this._selectionManager&&(this._selectionManager.value=this.value)}_updateItemSelectionState(){this._selectionManager&&(this._selectionManager.value=this.value)}_handleTriggerClick(){this.disabled||(this.open=!this.open)}focusFirstItem(){this._navigationController?.focusFirstItem()}_getMenuItems(){let e=[];return this._slottedItems.forEach(t=>{if(t.tagName.toLowerCase()===`forge-ai-dropdown-menu-item`)e.push(t);else if(t.tagName.toLowerCase()===`forge-ai-dropdown-menu-item-group`){let n=t.querySelectorAll(`forge-ai-dropdown-menu-item`);e.push(...Array.from(n))}}),e}_selectItem(e){let t=this._getMenuItems()[e];t&&this._selectionManager&&(this._selectionManager.selectItem(t).shouldClose&&this._closeAfterSelection(),this.value=this._selectionManager.value)}_closeAfterSelection(){this.open=!1,this._isSubmenu?(this.parentElement?.closest(`forge-ai-dropdown-menu`))?._closeAfterSelection():this._triggerButton?.focus()}_dispatchSelectionEvent(e){this.dispatchEvent(new CustomEvent(`forge-ai-dropdown-menu-change`,{detail:e,bubbles:!0,composed:!0}))}_dispatchOpenCloseEvent(e){let t={detail:{timestamp:Date.now()},bubbles:!0,composed:!0};e===`open`?this.dispatchEvent(new CustomEvent(`forge-ai-dropdown-menu-open`,t)):this.dispatchEvent(new CustomEvent(`forge-ai-dropdown-menu-close`,t))}_onPopoverToggle(e){e.target===e.currentTarget&&(this.open=e.detail.open,e.detail.open&&this._navigationController?.onShown())}_onItemClick(e){let t=e.target.closest(`forge-ai-dropdown-menu-item`);if(!t||t.disabled)return;let n=this._getMenuItems().findIndex(e=>e===t);if(n>=0&&t.closest(`forge-ai-dropdown-menu`)===this){let e=t.querySelector(`forge-ai-dropdown-menu[data-submenu="true"]`);e&&e.open||this._selectItem(n)}}_onFocusOut(e){if(!this.open)return;let t=e.relatedTarget;t&&this.contains(t)||(this.open=!1)}_onDefaultSlotChange(){this._selectionManager&&(this._selectionManager.value=this.value,this.requestUpdate())}get _dropdownRole(){switch(this.selectionMode){case`single`:case`multi`:return`listbox`;default:return`menu`}}get _ariaHasPopup(){return this.selectionMode===`none`?`menu`:`listbox`}get _ariaMultiSelectable(){return this.selectionMode===`multi`?`true`:void 0}get _popoverPlacement(){return this._isSubmenu?`right-start`:this.popoverPlacement}get _popoverAnchor(){return this._isSubmenu?this.parentElement:this._triggerButton}get _selectedText(){return this._selectionManager?.getSelectedText()||``}get _shouldShowSelectedText(){return this._selectionManager?.shouldShowSelectedText()||!1}#e;get#t(){return this._shouldShowSelectedText?t`<slot name="selected-text">${this._selectedText}</slot>`:this.#e}#n(e){let t=e.target.name;(t===`header`||t===`selected-text`)&&this.requestUpdate()}#r;get#i(){let e=this.variant===`button`,n=this.variant===`icon-button`||this.variant===`icon-button-squared`,r=this.variant===`icon-button-squared`,i=this.density===`large`?``:`${e?`forge-button`:`forge-icon-button`}--${this.density}`;return t`
      <button
        id="dropdown-trigger"
        class=${m({"forge-button":e,"forge-icon-button":n,"forge-icon-button--squared":r,[i]:!!i})}
        type="button"
        aria-label=${v(this.triggerLabel)}
        aria-expanded=${this.open}
        aria-haspopup=${this._ariaHasPopup}
        aria-controls="dropdown-content"
        ?disabled=${this.disabled}
        @click=${this._handleTriggerClick}>
        <slot name="start"></slot>
        ${this.#t}
        <slot name="end"></slot>
      </button>
    `}get#a(){return t`
      <forge-ai-popover .anchor=${this._popoverAnchor} placement=${this._popoverPlacement} .flip=${!0} @forge-ai-popover-toggle=${this._onPopoverToggle}>
        <div
          id="dropdown-content"
          role=${this._dropdownRole}
          aria-labelledby="dropdown-trigger"
          aria-multiselectable=${v(this._ariaMultiSelectable)}
          aria-orientation="vertical"
          @click=${this._onItemClick}
          tabindex="0"
          class="ai-dropdown-menu__dropdown"
          @slotchange=${this.#n}>
          ${this.#r}
        </div>
      </forge-ai-popover>
    `}render(){return t` ${this._isSubmenu?``:this.#i} ${this.#a} `}},a([s()],F.prototype,`variant`,void 0),a([s()],F.prototype,`density`,void 0),a([s({type:Boolean,reflect:!0})],F.prototype,`open`,void 0),a([s({type:Boolean,reflect:!0})],F.prototype,`disabled`,void 0),a([s({attribute:`selection-mode`})],F.prototype,`selectionMode`,void 0),a([s()],F.prototype,`value`,void 0),a([s({attribute:`popover-placement`})],F.prototype,`popoverPlacement`,void 0),a([s({attribute:`trigger-label`})],F.prototype,`triggerLabel`,void 0),a([c()],F.prototype,`_isSubmenu`,void 0),a([l(`.forge-button,.forge-icon-button`)],F.prototype,`_triggerButton`,void 0),a([l(`forge-ai-popover`)],F.prototype,`_popover`,void 0),a([o({flatten:!0})],F.prototype,`_slottedItems`,void 0),F=a([u(`forge-ai-dropdown-menu`)],F)})))()}export{P as n,w as r,I as t};