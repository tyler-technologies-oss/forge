import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{T as r,g as i}from"./iframe-CbV23-8Y.js";import{d as a,o,r as s,t as c}from"./decorators-DcQFeJ4p.js";import{n as l}from"./when-Daf2bbVy.js";import{C as u,S as ee,t as d,x as f}from"./dist-CPhmYI86.js";import{i as p,n as te,s as m,t as h}from"./base-lit-element-BTojiV2b.js";import{p as g}from"./constants-Bpi-_RbP.js";import{a as _,i as v,o as y,t as b}from"./icon-DTOjPWy9.js";import{t as x}from"./decorate-DvwEnSYK.js";import{M as ne,t as re}from"./tyler-icons-kuH1S-j5.js";import{r as S,t as C}from"./style-map-C_WKUe4Y.js";import{i as w,n as T,t as E}from"./ref-DZ35M6As.js";import{n as D,t as O}from"./icon-button-BRvxNmXW.js";import{t as k}from"./icon-button-D4UjEleU.js";import{n as A,t as j}from"./button-D513iKC3.js";import{t as M}from"./button-5s54CFRd.js";import{n as N,r as P,t as F}from"./dialog-ibtmnkLf.js";import{n as I,r as L,t as R}from"./circular-progress-DM4cNVHb.js";var z;function B(){return(B=e((()=>{z=`:host{display:contents}.outer-container{box-sizing:border-box;padding:var(--forge-spacing-medium,16px);justify-content:center;gap:var(--forge-spacing-medium,16px);flex-direction:column;max-width:480px;display:flex}.title-container{align-items:start;gap:var(--forge-spacing-medium,16px);grid-template-columns:1fr auto;display:grid}.close-button-container{height:24px;margin-block-start:-10px;margin-inline-end:-10px}.title{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-heading4-font-family,var(--forge-typography-font-family,"Roboto", sans-serif));font-size:var(--forge-typography-heading4-font-size,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-heading4-font-size-scale,1.25)));font-weight:var(--forge-typography-heading4-font-weight,500);line-height:var(--forge-typography-heading4-line-height,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-heading4-line-height-scale,1.5)));letter-spacing:var(--forge-typography-heading4-letter-spacing,.005em);text-transform:var(--forge-typography-heading4-text-transform,inherit);-webkit-text-decoration:var(--forge-typography-heading4-text-decoration,inherit);text-decoration:var(--forge-typography-heading4-text-decoration,inherit);text-wrap:balance;word-break:break-all}h1{margin:0}.message-container{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-body2-font-family,var(--forge-typography-font-family,"Roboto", sans-serif));font-size:var(--forge-typography-body2-font-size,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-body-font-size-scale,1)));font-weight:var(--forge-typography-body2-font-weight,400);line-height:var(--forge-typography-body2-line-height,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-body-line-height-scale,1.375)));letter-spacing:var(--forge-typography-body2-letter-spacing,.015625em);text-transform:var(--forge-typography-body2-text-transform,inherit);-webkit-text-decoration:var(--forge-typography-body2-text-decoration,inherit);text-decoration:var(--forge-typography-body2-text-decoration,inherit);color:inherit}.actions-container{gap:var(--forge-spacing-medium,16px);flex-flow:wrap;justify-content:end;align-items:center;display:flex}`})))()}var V,H;function U(){return(U=e((()=>{i(),c(),C(),d(),re(),te(),m(),M(),R(),F(),k(),b(),A(),L(),P(),D(),_(),B(),V=`forge-confirmation-dialog`,H=class extends h{constructor(...e){super(...e),this.open=!1,this.isBusy=!1,this.busyLabel=`Loading`,this.#n=n`<slot name="title" id="confirmation-dialog-title" class="title"></slot>`,this.#i=n`<slot name="secondary-button-text" id="secondary-button-slot"></slot>`}static{this[u]=V}static{this[ee]=[j,I,N,O,v]}static{y.define([ne])}static{this.styles=r(z)}#e;get#t(){let e=this._slottedTitleNodes.length>0;return l(e,()=>n`<h1>${this.#n}</h1>`,()=>n`${this.#n}`)}#n;get#r(){return n`
      <forge-icon-button autofocus aria-label="Close confirmation dialog" @click=${()=>this.#l(!1)}>
        <forge-icon name="close"></forge-icon>
      </forge-icon-button>
    `}#i;get#a(){return this.isBusy?this.#o:n`<slot name="primary-button-text" id="primary-button-slot">Confirm</slot>`}get#o(){return n`<forge-circular-progress slot="end" aria-label=${this.busyLabel}></forge-circular-progress>`}get#s(){let e=this._slottedSecondaryButtonTextNodes.length>0;return l(e,()=>n`
        <forge-button variant="outlined" ?disabled=${this.isBusy} id="secondary-button" @click=${()=>this.#l(!1)}>
          ${this.#i}
        </forge-button>
      `,()=>n`${this.#i}`)}get#c(){return n`
      <forge-button
        ?disabled=${this.isBusy}
        variant="raised"
        id="primary-button"
        style=${S({minWidth:this.#e})}
        @click=${()=>this.#l(!0)}>
        ${this.#a}
      </forge-button>
    `}willUpdate(e){e.has(`isBusy`)&&(this.#e=this.isBusy&&this._primaryButtonRef?`${this._primaryButtonRef.clientWidth}px`:void 0)}render(){let e=this._slottedTitleNodes.length>0;return n`
      <forge-dialog
        @slotchange=${this.#d}
        @forge-dialog-before-close=${this.#u}
        @forge-dialog-close=${()=>this.isBusy=!1}
        fullscreen-threshold="0"
        ?open=${this.open}
        .label=${this.label||p(this._slottedTitleNodes)||``}
        .description=${this.description||p(this._slottedMessageNodes)||``}>
        <div class="outer-container">
          <div class="title-container" style=${S({display:e?`grid`:`none`})}>
            ${this.#t}
            <div class="close-button-container">${this.#r}</div>
          </div>
          <div class="message-container">
            <slot name="message" id="confirmation-message"></slot>
          </div>
          <div class="actions-container">${this.#s} ${this.#c}</div>
        </div>
      </forge-dialog>
    `}#l(e,t=`action`,n){let r=new CustomEvent(`forge-confirmation-dialog-action`,{bubbles:!0,composed:!0,cancelable:!0,detail:{value:e,reason:t}});this.dispatchEvent(r),r.defaultPrevented&&n?n?.preventDefault():r.defaultPrevented||(this.open=!1,this.isBusy=!1)}#u(e){e.detail.reason===`backdrop`?e.preventDefault():this.#l(!1,`light-dismiss`,e)}#d(e){let t=e.target.name;[`title`,`secondary-button-text`,`primary-button-text`].includes(t)&&this.requestUpdate()}},x([a({type:Boolean})],H.prototype,`open`,void 0),x([a()],H.prototype,`label`,void 0),x([a()],H.prototype,`description`,void 0),x([a({type:Boolean,attribute:`is-busy`})],H.prototype,`isBusy`,void 0),x([a({type:String,attribute:`busy-label`})],H.prototype,`busyLabel`,void 0),x([s({slot:`title`,flatten:!0})],H.prototype,`_slottedTitleNodes`,void 0),x([s({slot:`message`,flatten:!0})],H.prototype,`_slottedMessageNodes`,void 0),x([s({slot:`secondary-button-text`,flatten:!0})],H.prototype,`_slottedSecondaryButtonTextNodes`,void 0),x([o(`#primary-button`)],H.prototype,`_primaryButtonRef`,void 0),f(V,H)})))()}function W(){return(W=e((()=>{g()})))()}function G(){return(G=e((()=>{d(),U(),W()})))()}var K=t({Demo:()=>Z,__namedExportsOrder:()=>Q,default:()=>X}),q,J,Y,X,Z,Q;function $(){return($=e((()=>{i(),E(),G(),{action:q}=__STORYBOOK_MODULE_ACTIONS__,J=`forge-confirmation-dialog`,Y=q(`forge-confirmation-dialog-action`),X={title:`Components/Confirmation Dialog`,render:e=>{let t=T();function r(){let e=t.value;e.open=!e.open}function i(t){Y(t),e.preventDefault&&t.preventDefault()}return n`
      <forge-button variant="raised" @click=${r}>Show Confirmation Dialog</forge-button>
      <forge-confirmation-dialog ${w(t)} @forge-confirmation-dialog-action=${i} .isBusy=${e.isBusy}>
        ${e.title.length?n`<span slot="title">${e.title}</span>`:``}
        ${e.message.length?n`<span slot="message">${e.message}</span>`:``}
        ${e.secondaryButtonText.length?n`<span slot="secondary-button-text">${e.secondaryButtonText}</span>`:``}
        ${e.primaryButtonText.length?n`<span slot="primary-button-text">${e.primaryButtonText}</span>`:``}
      </forge-confirmation-dialog>
    `},component:J,argTypes:{isBusy:{control:`boolean`},title:{control:`text`},message:{control:`text`},secondaryButtonText:{control:`text`},primaryButtonText:{control:`text`},preventDefault:{control:`boolean`}},args:{isBusy:!1,title:`Delete selected images?`,message:`Images will be permanently removed from your account and all synced devices.`,secondaryButtonText:`No`,primaryButtonText:`Yes`,preventDefault:!1}},Z={},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{}`,...Z.parameters?.docs?.source}}},Q=[`Demo`]})))()}export{Z as n,$ as r,K as t};