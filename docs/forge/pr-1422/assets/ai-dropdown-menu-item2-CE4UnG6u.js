import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t}from"./lit-html-SpIZ5SkX.js";import{T as n,_ as r,g as i}from"./iframe-CbV23-8Y.js";import{t as a}from"./decorate-2OK4V6AF.js";import{a as o,d as s,l as c,p as l,r as u,t as d}from"./decorators-DcQFeJ4p.js";import{n as f}from"./when-Daf2bbVy.js";import{t as p}from"./class-map-DEew1OiS.js";import{t as m}from"./class-map-8zp5OV2u.js";var h;function g(){return(g=e((()=>{h=`:host {
  display: block;
  position: relative;
  outline: none;
  --_ai-dropdown-menu-item-selection-icon-size: var(--forge-ai-dropdown-menu-item-selection-icon-size, 16px);
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
:host(:focus) .focus-indicator {
  --_focus-indicator-display: var(--forge-focus-indicator-display, flex);
  --_focus-indicator-width: var(--forge-focus-indicator-width, var(--forge-border-medium, 2px));
  --_focus-indicator-active-width: var(--forge-focus-indicator-active-width, 6px);
  --_focus-indicator-color: var(--forge-focus-indicator-color, var(--forge-theme-primary, #3f51b5));
  --_focus-indicator-shape: var(--forge-focus-indicator-shape, calc(var(--forge-shape-extra-small, 1px) * var(--forge-shape-factor, 1)));
  --_focus-indicator-duration: var(--forge-focus-indicator-duration, var(--forge-animation-duration-long4, 600ms));
  --_focus-indicator-easing: var(--forge-focus-indicator-easing, var(--forge-animation-easing-emphasized, cubic-bezier(0.2, 0, 0, 1)));
  --_focus-indicator-shape-start-start: var(--forge-focus-indicator-shape-start-start, var(--_focus-indicator-shape));
  --_focus-indicator-shape-start-end: var(--forge-focus-indicator-shape-start-end, var(--_focus-indicator-shape));
  --_focus-indicator-shape-end-end: var(--forge-focus-indicator-shape-end-end, var(--_focus-indicator-shape));
  --_focus-indicator-shape-end-start: var(--forge-focus-indicator-shape-end-start, var(--_focus-indicator-shape));
  --_focus-indicator-outward-offset: var(--forge-focus-indicator-outward-offset, var(--forge-spacing-xxsmall, 4px));
  --_focus-indicator-inward-offset: var(--forge-focus-indicator-inward-offset, 0px);
  --_focus-indicator-offset-block: var(--forge-focus-indicator-offset-block, 0);
  --_focus-indicator-offset-inline: var(--forge-focus-indicator-offset-inline, 0);
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
}
:host(:focus) .focus-indicator::before {
  content: "";
}
:host(:focus) .focus-indicator {
  display: block;
  --forge-focus-indicator-shape: calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1));
}

.ai-dropdown-menu-item {
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
.ai-dropdown-menu-item::before {
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
.ai-dropdown-menu-item:hover::before {
  background-color: var(--_state-layer-hover-color);
  opacity: var(--_state-layer-hover-opacity);
}
.ai-dropdown-menu-item:active::before {
  opacity: var(--_state-layer-pressed-opacity);
  transition-duration: var(--_state-layer-pressed-duration);
  --_state-layer-pressed-opacity: var(--forge-state-layer-pressed-opacity, 0.18);
}
.ai-dropdown-menu-item {
  margin: var(--forge-spacing-xxxsmall, 2px) var(--forge-spacing-xxsmall, 4px);
  padding: 0 var(--forge-spacing-xsmall, 8px);
  border-radius: calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1));
  font-size: 0.875rem;
  cursor: pointer;
}
.ai-dropdown-menu-item ::slotted([slot=start]),
.ai-dropdown-menu-item ::slotted([slot=end]) {
  color: var(--_list-item-text-color);
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  fill: currentColor;
}
.ai-dropdown-menu-item--with-selection {
  --forge-list-item-padding: 0 var(--forge-spacing-xxsmall, 4px);
}
.ai-dropdown-menu-item--with-description {
  height: var(--_list-item-dense-two-line-height);
  min-height: var(--_list-item-dense-two-line-height);
}
.ai-dropdown-menu-item--selected {
  color: var(--_list-item-selected-color);
}
.ai-dropdown-menu-item--selected::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: var(--_list-item-selected-opacity);
  background-color: var(--_list-item-selected-background);
  pointer-events: none;
}
.ai-dropdown-menu-item--selected {
  --forge-state-layer-color: var(--_list-item-selected-color);
}
.ai-dropdown-menu-item--selected ::slotted([slot=start]),
.ai-dropdown-menu-item--selected ::slotted([slot=end]) {
  color: var(--_list-item-selected-color);
}
.ai-dropdown-menu-item--disabled {
  cursor: var(--_list-item-disabled-cursor);
  opacity: var(--_list-item-disabled-opacity);
}
.ai-dropdown-menu-item__content {
  flex: 1;
  min-width: 0;
}
.ai-dropdown-menu-item__text {
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
  font-weight: normal;
}
.ai-dropdown-menu-item__description {
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
  font-size: var(--_list-item-dense-font-size);
}
.ai-dropdown-menu-item__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.ai-dropdown-menu-item__selection-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: var(--forge-spacing-small, 12px);
}
.ai-dropdown-menu-item__selection-svg {
  fill: currentColor;
  width: var(--_ai-dropdown-menu-item-selection-icon-size);
  height: var(--_ai-dropdown-menu-item-selection-icon-size);
}
.ai-dropdown-menu-item__submenu-arrow {
  width: var(--_ai-dropdown-menu-item-selection-icon-size);
  height: var(--_ai-dropdown-menu-item-selection-icon-size);
  fill: currentColor;
}
.ai-dropdown-menu-item__submenu-arrow-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}`})))()}var _;function v(){return(v=e((()=>{g(),i(),d(),m(),_=class extends r{constructor(...e){super(...e),this.value=``,this.selected=!1,this.disabled=!1,this.selectionMode=`none`,this.submenuTrigger=`hover`,this.submenuOpenDelay=150,this.submenuCloseDelay=300,this._submenuOpen=!1,this._hoverTimeout=null,this._leaveTimeout=null,this._onMouseEnter=()=>{this._hasSubmenu&&!this.disabled&&(this.submenuTrigger===`hover`||this.submenuTrigger===`both`)&&(this._clearAllTimeouts(),this._hoverTimeout=window.setTimeout(()=>{this._submenuOpen=!0},this.submenuOpenDelay))},this._onMouseLeave=()=>{this._hasSubmenu&&(this.submenuTrigger===`hover`||this.submenuTrigger===`both`)&&(this._clearAllTimeouts(),this._leaveTimeout=window.setTimeout(()=>{this._submenuOpen=!1},this.submenuCloseDelay))},this._onItemClick=e=>{this.disabled||this._isFromSubmenu(e)||this._hasSubmenu&&(this.submenuTrigger===`click`||this.submenuTrigger===`both`)&&(e.stopPropagation(),this._clearAllTimeouts(),this._submenuOpen=!this._submenuOpen,this._submenuOpen&&this._focusFirstSubmenuItem())},this._onSubmenuClose=e=>{e.target===this._childSubmenu[0]&&(this._clearAllTimeouts(),this._submenuOpen=!1)},this._onKeyDown=e=>{if(!this.disabled)switch(e.key){case`ArrowRight`:this._hasSubmenu&&(e.preventDefault(),e.stopPropagation(),this._clearAllTimeouts(),this._submenuOpen=!0,this._focusFirstSubmenuItem());break;case`ArrowLeft`:this._submenuOpen&&(e.preventDefault(),e.stopPropagation(),this._clearAllTimeouts(),this._submenuOpen=!1,this.focus());break;case`Escape`:this._submenuOpen&&(e.preventDefault(),e.stopPropagation(),this._clearAllTimeouts(),this._submenuOpen=!1,this.focus())}},this._submenuArrowIcon=t`
    <svg class="ai-dropdown-menu-item__submenu-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
    </svg>
  `,this.#e=t`<div class="ai-dropdown-menu-item__icon"><slot name="start"></slot></div>`,this.#t=t`<div class="ai-dropdown-menu-item__icon"><slot name="end"></slot></div>`}static{this.styles=n(h)}connectedCallback(){super.connectedCallback(),this.setAttribute(`tabindex`,`-1`),this._updateRole(),this._updateSubmenuAttributes(),this.addEventListener(`mouseenter`,this._onMouseEnter),this.addEventListener(`mouseleave`,this._onMouseLeave),this.addEventListener(`keydown`,this._onKeyDown),this.addEventListener(`click`,this._onItemClick),this.addEventListener(`forge-ai-dropdown-menu-close`,this._onSubmenuClose)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`mouseenter`,this._onMouseEnter),this.removeEventListener(`mouseleave`,this._onMouseLeave),this.removeEventListener(`keydown`,this._onKeyDown),this.removeEventListener(`click`,this._onItemClick),this.removeEventListener(`forge-ai-dropdown-menu-close`,this._onSubmenuClose),this._clearAllTimeouts()}updated(e){e.has(`selected`)&&(this.selectionMode===`single`?this.setAttribute(`aria-selected`,this.selected.toString()):this.removeAttribute(`aria-selected`),this.selectionMode===`multi`&&this.setAttribute(`aria-checked`,this.selected.toString())),e.has(`disabled`)&&this.setAttribute(`aria-disabled`,this.disabled.toString()),e.has(`selectionMode`)&&(this._updateRole(),this._updateSubmenuAttributes(),this.selectionMode===`single`?(this.setAttribute(`aria-selected`,this.selected.toString()),this.removeAttribute(`aria-checked`)):this.selectionMode===`multi`?(this.setAttribute(`aria-checked`,this.selected.toString()),this.removeAttribute(`aria-selected`)):(this.removeAttribute(`aria-selected`),this.removeAttribute(`aria-checked`))),e.has(`_submenuOpen`)&&this._updateSubmenuState()}_updateSubmenuAttributes(){this._hasSubmenu?(this.setAttribute(`aria-haspopup`,`menu`),this.setAttribute(`aria-expanded`,this._submenuOpen.toString())):(this.removeAttribute(`aria-haspopup`),this.removeAttribute(`aria-expanded`))}_updateSubmenuState(){if(this._hasSubmenu&&this._childSubmenu.length>0){let e=this._childSubmenu[0];e.open=this._submenuOpen}this._hasSubmenu&&this.setAttribute(`aria-expanded`,this._submenuOpen.toString())}_isFromSubmenu(e){let t=this._childSubmenu[0];return!!t&&e.composedPath().includes(t)}_clearAllTimeouts(){this._hoverTimeout!==null&&(window.clearTimeout(this._hoverTimeout),this._hoverTimeout=null),this._leaveTimeout!==null&&(window.clearTimeout(this._leaveTimeout),this._leaveTimeout=null)}_focusFirstSubmenuItem(){if(this._childSubmenu.length>0){let e=this._childSubmenu[0];requestAnimationFrame(()=>{e.focusFirstItem?.()})}}_updateRole(){switch(this.selectionMode){case`single`:this.setAttribute(`role`,`menuitemradio`);break;case`multi`:this.setAttribute(`role`,`menuitemcheckbox`);break;default:this.setAttribute(`role`,`menuitem`)}}get _hasDescriptionContent(){return this._descriptionSlottedNodes.length>0}get _shouldShowSelectionIcon(){return this.selectionMode!==`none`&&this.selected}get _shouldReserveSelectionSpace(){return this.selectionMode!==`none`}get _childSubmenu(){return this._slottedSubmenu.length>0?this._slottedSubmenu:this._legacySubmenu}get _hasSubmenu(){return this._childSubmenu.length>0}get labelText(){return this._defaultSlottedNodes.filter(e=>!(e instanceof Element&&e.matches(`forge-ai-dropdown-menu`))).map(e=>e.textContent?.trim()||``).join(` `).trim()}get _selectionIcon(){let e=this.selectionMode===`multi`?`M21 7 9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59z`:`M12 8a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4`;return t`
      <svg class="ai-dropdown-menu-item__selection-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
        <path d="${e}" />
      </svg>
    `}#e;#t;get#n(){return t`<div class="ai-dropdown-menu-item__selection-icon">${this._shouldShowSelectionIcon?this._selectionIcon:``}</div>`}#r(e){this._updateSubmenuAttributes(),this.requestUpdate()}render(){let e={"ai-dropdown-menu-item":!0,"ai-dropdown-menu-item--with-selection":this._shouldReserveSelectionSpace,"ai-dropdown-menu-item--with-description":this._hasDescriptionContent,"ai-dropdown-menu-item--selected":this.selected,"ai-dropdown-menu-item--disabled":this.disabled,"ai-dropdown-menu-item--with-submenu":this._hasSubmenu};return t`
      <div class=${p(e)}>
        ${f(this._shouldReserveSelectionSpace,()=>this.#n)} ${this.#e}
        <div class="ai-dropdown-menu-item__content" @slotchange=${this.#r}>
          <span class="ai-dropdown-menu-item__text"><slot></slot></span>
          ${f(this._hasDescriptionContent,()=>t`<span class="ai-dropdown-menu-item__description"><slot name="description"></slot></span>`,()=>t`<slot name="description"></slot>`)}
        </div>
        ${this.#t} ${f(this._hasSubmenu,()=>t`<div class="ai-dropdown-menu-item__submenu-arrow-container">${this._submenuArrowIcon}</div>`)}
      </div>
      <div class="focus-indicator"></div>
      <slot name="submenu" @slotchange=${this.#r}></slot>
    `}},a([s()],_.prototype,`value`,void 0),a([s({type:Boolean,reflect:!0})],_.prototype,`selected`,void 0),a([s({type:Boolean,reflect:!0})],_.prototype,`disabled`,void 0),a([s({attribute:`selection-mode`})],_.prototype,`selectionMode`,void 0),a([s({attribute:`submenu-trigger`})],_.prototype,`submenuTrigger`,void 0),a([s({attribute:`submenu-open-delay`,type:Number})],_.prototype,`submenuOpenDelay`,void 0),a([s({attribute:`submenu-close-delay`,type:Number})],_.prototype,`submenuCloseDelay`,void 0),a([u({slot:`description`,flatten:!0})],_.prototype,`_descriptionSlottedNodes`,void 0),a([u({flatten:!0})],_.prototype,`_defaultSlottedNodes`,void 0),a([o({slot:`submenu`,selector:`forge-ai-dropdown-menu`})],_.prototype,`_slottedSubmenu`,void 0),a([o({selector:`forge-ai-dropdown-menu`})],_.prototype,`_legacySubmenu`,void 0),a([c()],_.prototype,`_submenuOpen`,void 0),a([c()],_.prototype,`_hoverTimeout`,void 0),a([c()],_.prototype,`_leaveTimeout`,void 0),_=a([l(`forge-ai-dropdown-menu-item`)],_)})))()}export{v as t};