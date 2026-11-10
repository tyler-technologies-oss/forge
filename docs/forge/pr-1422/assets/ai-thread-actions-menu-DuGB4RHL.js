import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t}from"./lit-html-SpIZ5SkX.js";import{T as n,_ as r,g as i}from"./iframe-CbV23-8Y.js";import{t as a}from"./decorate-2OK4V6AF.js";import{d as o,p as s,t as c}from"./decorators-DcQFeJ4p.js";import{n as l}from"./when-Daf2bbVy.js";import{t as u}from"./ai-dropdown-menu2-DsyYeTZS.js";import{t as d}from"./ai-dropdown-menu-item2-CE4UnG6u.js";var f;function p(){return(p=e((()=>{f=`/**
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

:host {
  display: flex;
}

forge-ai-dropdown-menu {
  display: flex;
}

.forge-icon {
  color: var(--forge-theme-text-medium, rgba(0, 0, 0, 0.6));
}

forge-ai-dropdown-menu-item[value=delete] {
  color: var(--forge-theme-error, #b00020);
  --forge-state-layer-color: var(--forge-theme-error, #b00020);
  --forge-focus-indicator-color: var(--forge-theme-error, #b00020);
  --forge-icon-color: var(--forge-theme-error, #b00020);
}`})))()}var m,h;function g(){return(g=e((()=>{d(),u(),p(),i(),c(),m=`forge-ai-thread-actions-menu`,h=class extends r{constructor(...e){super(...e),this.showRename=!1,this.showDelete=!1,this.density=`small`}static{this.styles=n(f)}#e(){let e=new CustomEvent(`forge-ai-thread-actions-menu-open`,{detail:{id:this.thread.id},bubbles:!0,composed:!0});this.dispatchEvent(e)}#t(){let e=new CustomEvent(`forge-ai-thread-actions-menu-close`,{bubbles:!0,composed:!0});this.dispatchEvent(e)}#n(e){e.key===`Escape`&&e.stopPropagation()}#r(e){e.stopPropagation()}#i(){let e=new CustomEvent(`forge-ai-thread-actions-menu-rename`,{detail:{id:this.thread.id},bubbles:!0,composed:!0});this.dispatchEvent(e)}#a(){let e=new CustomEvent(`forge-ai-thread-actions-menu-delete-click`,{detail:{id:this.thread.id},bubbles:!0,composed:!0});this.dispatchEvent(e)}render(){return t`
      <forge-ai-dropdown-menu
        variant="icon-button-squared"
        density=${this.density}
        selection-mode="none"
        popover-placement="bottom-start"
        trigger-label="More actions for ${this.thread.title}"
        @keydown=${this.#n}
        @forge-ai-dropdown-menu-open=${this.#e}
        @forge-ai-dropdown-menu-close=${this.#t}
        @click=${this.#r}>
        <slot name="trigger-icon" slot="trigger-content">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" class="forge-icon">
            <path
              d="M12 16a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2" />
          </svg>
        </slot>

        ${l(this.showRename,()=>t`
            <forge-ai-dropdown-menu-item value="rename" @click=${this.#i}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" slot="start" class="forge-icon" aria-hidden="true">
                <path
                  d="m14.06 9 .94.94L5.92 19H5v-.92zm3.6-6c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z" />
              </svg>
              <span>Rename</span>
            </forge-ai-dropdown-menu-item>
          `)}
        ${l(this.showDelete,()=>t`
            <forge-ai-dropdown-menu-item value="delete" @click=${this.#a}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" slot="start" class="forge-icon" aria-hidden="true">
                <path d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3zM7 6h10v13H7zm2 2v9h2V8zm4 0v9h2V8z" />
              </svg>
              <span>Delete</span>
            </forge-ai-dropdown-menu-item>
          `)}
      </forge-ai-dropdown-menu>
    `}},a([o({type:Object})],h.prototype,`thread`,void 0),a([o({type:Boolean,attribute:`show-rename`})],h.prototype,`showRename`,void 0),a([o({type:Boolean,attribute:`show-delete`})],h.prototype,`showDelete`,void 0),a([o()],h.prototype,`density`,void 0),h=a([s(m)],h)})))()}function _(){return(_=e((()=>{g()})))()}export{_ as t};