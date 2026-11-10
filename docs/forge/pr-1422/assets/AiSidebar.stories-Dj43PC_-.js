import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{T as r,_ as i,g as a}from"./iframe-BbUsXXnT.js";import{t as o}from"./decorate-2OK4V6AF.js";import{d as s,l as c,p as l,t as ee}from"./decorators-Ci1onliJ.js";import{n as te}from"./when-Daf2bbVy.js";import{t as u}from"./class-map-DEew1OiS.js";import{t as ne}from"./class-map-8zp5OV2u.js";import{o as d,t as f}from"./icon-CdA8CuQQ.js";import{Bt as p,Gt as m,I as re,Pt as ie,c as ae,en as oe,t as h,x as g}from"./tyler-icons-kuH1S-j5.js";import{r as se,t as _}from"./if-defined-B1ve8lTA.js";import{r as v,t as y}from"./style-map-C_WKUe4Y.js";import{i as b,n as x,t as S}from"./ref-CKV-hb40.js";import{t as ce}from"./ai-chat-interface-CAxWu6mk.js";import{t as le}from"./ai-chat-header-3ROKo4HO.js";import{t as ue}from"./ai-prompt-iYuT5w8U.js";import{t as C}from"./ai-user-message-N-i96lpR.js";import{t as w}from"./ai-response-message-ByBw4OFQ.js";import{t as T}from"./card-fYAE1Lx6.js";import{t as E}from"./button-6zjUplxX.js";import{n as D,t as O}from"./resize-controller-BKPqdzyB.js";import{t as k}from"./scaffold-KCbMx9PQ.js";import{t as A}from"./app-bar-CzN-hPQF.js";import{t as j}from"./toolbar-BJddCJGC.js";function M(e){return e===`session`?window.sessionStorage:window.localStorage}function N({kind:e,key:t}){try{let n=M(e).getItem(t);if(n===null)return;let r=Number(n);return Number.isFinite(r)?r:void 0}catch{return}}function P({kind:e,key:t,value:n}){try{M(e).setItem(t,String(n))}catch{}}function F({kind:e,key:t}){try{M(e).removeItem(t)}catch{}}var I;function L(){return(L=e((()=>{I=`/**
 * @license
 * Copyright Tyler Technologies, Inc.
 * License: Apache-2.0
 */
.forge-drawer {
  --_drawer-background:var(--forge-drawer-background, var(--forge-theme-surface, #ffffff));
  --_drawer-border-color:var(--forge-drawer-border-color, var(--forge-theme-outline, #e0e0e0));
  --_drawer-width:var(--forge-drawer-width, 256px);
  --_drawer-border-width:var(--forge-drawer-border-width, var(--forge-border-thin, 1px));
  --_drawer-transition-duration:var(--forge-drawer-transition-duration, var(--forge-animation-duration-medium1, 250ms));
  --_drawer-transition-easing:var(--forge-drawer-transition-easing, var(--forge-animation-easing-standard, cubic-bezier(0.2, 0, 0, 1)));
  --_drawer-transition-duration-close:var(--forge-drawer-transition-duration-close, var(--forge-animation-duration-short4, 200ms));
}

.forge-drawer {
  width: var(--_drawer-width);
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  background-color: var(--_drawer-background);
  border-color: var(--_drawer-border-color);
  transition-property: transform;
  transition-duration: var(--_drawer-transition-duration);
  transition-timing-function: var(--_drawer-transition-easing);
  border-right-width: var(--_drawer-border-width);
  border-right-style: solid;
}

.forge-drawer--closing {
  transform: translateX(-100%);
  left: 0;
  z-index: var(--forge-z-index-surface, 1);
  position: absolute;
  top: 0;
  right: 0;
  transition-duration: var(--_drawer-transition-duration-close);
}

.forge-drawer--closed {
  transform: translateX(-100%);
  left: 0;
  width: 0;
  border: none;
}

.forge-drawer--right {
  border-left-width: var(--_drawer-border-width);
  border-left-style: solid;
  border-right: none;
}

.forge-drawer--right.forge-drawer--closing {
  transform: translateX(100%);
  right: 0;
  left: auto;
  z-index: var(--forge-z-index-surface, 1);
  position: absolute;
  top: 0;
  right: 0;
  transition-duration: var(--_drawer-transition-duration-close);
}

.forge-drawer--right.forge-drawer--closed {
  transform: translateX(100%);
  right: 0;
  left: auto;
  width: 0;
  border: none;
}

.forge-drawer--mini {
  width: var(--_mini-drawer-width);
  z-index: var(--forge-z-index-surface, 1);
  transition: width var(--_mini-drawer-transition-duration) var(--_mini-drawer-transition-easing);
}

:host {
  display: block;
  width: auto;
  height: 100%;
  overflow: hidden;
}

.animation-container {
  --forge-drawer-width: 420px;
  width: var(--forge-drawer-width);
  height: 100%;
  position: relative;
  transition: width 250ms cubic-bezier(0.2, 0, 0, 1);
  overflow: hidden;
}
.animation-container--closed {
  width: 0;
}
.animation-container--closing {
  width: 0;
}
.animation-container--open {
  width: var(--forge-drawer-width);
}
.animation-container--resizing {
  transition: none;
}

.forge-drawer {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: var(--forge-drawer-width);
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
}
.forge-drawer--resizing {
  user-select: none;
  transition: none;
}

.resize-handle {
  position: absolute;
  top: 0;
  left: 0;
  width: 8px;
  height: 100%;
  cursor: ew-resize;
  z-index: 10;
}
.resize-handle::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: var(--forge-theme-outline, #e0e0e0);
  opacity: 0;
  transition: all var(--forge-animation-duration-short4, 200ms) var(--forge-animation-easing-standard, cubic-bezier(0.2, 0, 0, 1));
}
.resize-handle__grip {
  position: absolute;
  top: 50%;
  left: 0;
  translate: 0 -50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 6px;
  height: 32px;
  color: var(--forge-theme-text-low, rgba(0, 0, 0, 0.38));
  background-color: var(--forge-theme-surface, #ffffff);
  border: 1px solid var(--forge-theme-outline, #e0e0e0);
  border-inline-start: none;
  border-start-end-radius: calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1));
  border-end-end-radius: calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1));
  pointer-events: none;
  transition: color var(--forge-animation-duration-short4, 200ms) var(--forge-animation-easing-standard, cubic-bezier(0.2, 0, 0, 1)), border-color var(--forge-animation-duration-short4, 200ms) var(--forge-animation-easing-standard, cubic-bezier(0.2, 0, 0, 1));
}
.resize-handle__grip svg {
  flex-shrink: 0;
  width: 12px;
  height: 12px;
  fill: currentColor;
}
.resize-handle:hover::before {
  opacity: 0.4;
  width: 2px;
  background-color: var(--forge-theme-primary, #3f51b5);
}
.resize-handle:focus-visible {
  outline: 2px solid var(--forge-theme-primary, #3f51b5);
  outline-offset: -2px;
}
.resize-handle:focus-visible::before {
  opacity: 0.6;
  width: 2px;
  background-color: var(--forge-theme-primary, #3f51b5);
}
.resize-handle--active::before {
  opacity: 0.8;
  width: 3px;
  background-color: var(--forge-theme-primary, #3f51b5);
}
.resize-handle:hover .resize-handle__grip, .resize-handle:focus-visible .resize-handle__grip, .resize-handle--active .resize-handle__grip {
  color: var(--forge-theme-primary, #3f51b5);
  border-color: var(--forge-theme-primary, #3f51b5);
}`})))()}var R,z,B,V,H,U,W;function G(){return(G=e((()=>{D(),L(),a(),ee(),ne(),S(),y(),R=420,z=360,B=800,V=`forge-ai-sidebar-width`,H=[`session`,`local`],U=`forge-ai-sidebar`,W=class extends i{static{this.styles=r(I)}#e;#t;#n;#r;constructor(){super(),this.open=!1,this.resizable=`on`,this.width=R,this._closing=!1,this._containerClosing=!1,this._isResizing=!1,this.#e=x(),this.#t=x(),this.#n=x(),this.width=this.#l()??R,this.#r=new O(this,{targetElementRef:this.#n,resizeHandleRef:this.#e,minWidth:z,maxWidth:B,defaultWidth:R,onResize:e=>{this.width=e},onResizeStart:()=>{this._isResizing=!0},onResizeEnd:()=>{this._isResizing=!1},onCommit:e=>{this.#c(e)}})}render(){let e={"animation-container":!0,"animation-container--open":this.open&&!this._containerClosing,"animation-container--closing":this._containerClosing,"animation-container--closed":!this.open&&!this._containerClosing,"animation-container--resizing":this._isResizing},t={"forge-drawer":!0,"forge-drawer--right":!0,"forge-drawer--closing":this._closing,"forge-drawer--closed":!this.open&&!this._closing,"forge-drawer--resizing":this._isResizing},r={"resize-handle":!0,"resize-handle--active":this._isResizing},i={"--forge-drawer-width":`${this.width}px`};return n`
      <div
        ${b(this.#n)}
        class=${u(e)}
        style=${v(i)}
        @transitionend=${this.#i}>
        <aside
          ${b(this.#t)}
          class=${u(t)}
          ?open=${this.open}
          role="complementary"
          aria-hidden=${!this.open}
          @transitionend=${this.#a}>
          ${te(this.resizable===`on`,()=>n`
              <div
                ${b(this.#e)}
                class=${u(r)}
                role="slider"
                aria-orientation="vertical"
                aria-label="Resize sidebar, use left and right arrow keys"
                aria-valuemin="${z}"
                aria-valuemax="${B}"
                aria-valuenow=${this.width}
                aria-valuetext="${this.width} pixels"
                tabindex="0"
                @pointerdown=${this.#o}
                @keydown=${this.#s}>
                <span class="resize-handle__grip" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2" />
                  </svg>
                </span>
              </div>
            `)}
          <slot></slot>
        </aside>
      </div>
    `}show(){this.open||(this._closing=!1,this._containerClosing=!1,this.open=!0,this.#f(`forge-ai-sidebar-open`))}close(){this.open&&!this._closing&&!this._containerClosing&&(this._closing=!0,this._containerClosing=!0)}toggle(){this.open?this.close():this.show()}willUpdate(e){e.has(`width`)&&this.width!==this.#r.currentWidth&&this.#r.setWidth(this.width),e.has(`resizable`)&&this.resizable===`off`&&(this.#r.resetWidth(),this.hasUpdated&&this.#d())}#i(e){e.target===e.currentTarget&&this._containerClosing&&(this._containerClosing=!1)}#a(e){e.target===e.currentTarget&&this._closing&&(this.open=!1,this._closing=!1,this.#f(`forge-ai-sidebar-close`))}#o(e){this.#r.handlePointerDown(e)}#s(e){this.#r.handleKeyDown(e)}#c(e){this.#f(`forge-ai-sidebar-resize`,{width:e}),this.#u(e)}#l(){for(let e of H){let t=N({kind:e,key:V});if(t!==void 0)return t}}#u(e){for(let t of H)P({kind:t,key:V,value:e})}#d(){for(let e of H)F({kind:e,key:V})}#f(e,t){let n=new CustomEvent(e,{bubbles:!0,composed:!0,detail:t});this.dispatchEvent(n)}},o([s({type:Boolean})],W.prototype,`open`,void 0),o([s()],W.prototype,`resizable`,void 0),o([s({type:Number})],W.prototype,`width`,void 0),o([c()],W.prototype,`_closing`,void 0),o([c()],W.prototype,`_containerClosing`,void 0),o([c()],W.prototype,`_isResizing`,void 0),W=o([l(U)],W)})))()}function K(){return(K=e((()=>{G()})))()}var de=t({Demo:()=>Z,__namedExportsOrder:()=>Q,default:()=>X}),q,J,Y,X,Z,Q;function $(){return($=e((()=>{a(),_(),S(),f(),h(),K(),ce(),ue(),le(),C(),w(),k(),A(),T(),j(),E(),{action:q}=__STORYBOOK_MODULE_ACTIONS__,d.define([ie,oe,m,re,ae,p,g]),J=`forge-ai-sidebar`,Y=n`<style>
  .sidebar-story-scaffold {
    overflow: hidden;
    block-size: 600px;
    border: 1px solid var(--forge-theme-outline);
  }
  .sidebar-story-body {
    padding: var(--forge-spacing-large);
  }
</style>`,X={title:`AI/Components/Containers/Sidebar`,component:J,argTypes:{open:{control:{type:`boolean`},description:`Controls whether the sidebar is open`},resizable:{control:{type:`select`},options:[`on`,`off`],description:`Enables sidebar resizing`},width:{control:{type:`number`},description:`The current width of the sidebar in pixels. When set, overrides the persisted width.`}},args:{open:!1,resizable:`on`,width:void 0},render:e=>{let t=q(`forge-ai-sidebar-open`),r=q(`forge-ai-sidebar-close`),i=q(`forge-ai-sidebar-resize`),a=x();return n`
      ${Y}
      <forge-scaffold class="sidebar-story-scaffold">
        <forge-app-bar slot="header" title-text="AI Sidebar Demo"></forge-app-bar>

        <forge-toolbar slot="body-header">
          <h2 class="forge-typography--heading4">Page Title</h2>
          <forge-button slot="end" variant="filled" @click=${()=>a.value?.toggle()}>Ask AI Assistant</forge-button>
        </forge-toolbar>

        <main slot="body" class="sidebar-story-body">
          <forge-card>
            <p>Demo of the AI Sidebar component within a typical application layout.</p>
          </forge-card>
        </main>

        <forge-ai-sidebar
          ${b(a)}
          slot="body-right"
          ?open=${e.open}
          resizable=${e.resizable}
          width=${se(e.width)}
          @forge-ai-sidebar-open=${t}
          @forge-ai-sidebar-close=${r}
          @forge-ai-sidebar-resize=${i}>
          <forge-ai-chat-interface>
            <forge-ai-chat-header
              slot="header"
              show-expand-button
              show-minimize-button
              minimize-icon="panel"
              @forge-ai-chat-header-expand=${e=>{let t=e.currentTarget;t.expanded=!t.expanded}}
              @forge-ai-chat-header-minimize=${()=>{a.value?.close()}}>
            </forge-ai-chat-header>
            <forge-ai-user-message> Hello! Can you help me understand the analytics data I'm seeing in my dashboard? </forge-ai-user-message>
            <forge-ai-response-message>
              I'd be happy to help you understand your analytics data! I can see you're looking at your dashboard with various metrics and activity reports.
              What specific aspects would you like me to explain? I can help with: - Interpreting trends and patterns - Explaining key performance indicators -
              Suggesting areas for improvement - Answering questions about specific data points
            </forge-ai-response-message>
            <forge-ai-user-message> What should I focus on first when reviewing my dashboard? </forge-ai-user-message>
            <forge-ai-response-message>
              Great question! Here's a recommended approach for dashboard review: 1. **Start with key metrics** - Look at your primary KPIs first 2. **Check for
              anomalies** - Notice any unusual spikes or drops 3. **Review time trends** - Compare current data to historical patterns 4. **Identify
              opportunities** - Look for areas showing positive growth 5. **Address concerns** - Investigate any declining metrics Would you like me to walk
              through any of these areas with your current data?
            </forge-ai-response-message>

            <forge-ai-prompt slot="prompt"></forge-ai-prompt>
          </forge-ai-chat-interface>
        </forge-ai-sidebar>
      </forge-scaffold>
    `}},Z={},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{}`,...Z.parameters?.docs?.source}}},Q=[`Demo`]})))()}export{Z as n,$ as r,de as t};