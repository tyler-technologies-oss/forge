import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{S as r,p as i}from"./iframe-CebKObJP.js";import{C as a,S as ee,t as o,x as s}from"./dist-CPhmYI86.js";import{a as c,c as l,p as u,r as d}from"./async-directive-BUe4G5yg.js";import{i as f,n as te,s as p,t as m}from"./base-lit-element-C_IqN1_h.js";import{a as h,i as g,o as _,t as v}from"./icon-DTQwimRS.js";import{O as y,t as b}from"./tyler-icons-CLXzO0Q_.js";import{p as x}from"./constants-jVWZdget.js";import{t as S}from"./decorate-2OK4V6AF.js";import{n as ne,t as re}from"./icon-button-BbUSIC3F.js";import{t as C}from"./icon-button-DNkXDhJe.js";import{n as w,t as T}from"./button-BMAHj3R-.js";import{t as E}from"./button-DoiHRyaz.js";import{r as D,t as O}from"./style-map-C_WKUe4Y.js";import{n as k,r as A,t as j}from"./dialog-BozKl7wX.js";import{i as M,n as N,t as P}from"./ref-DN8O4ptj.js";import{n as F,r as I,t as L}from"./circular-progress-CdbiX3fs.js";import{n as R}from"./when-Daf2bbVy.js";var z;function B(){return(B=e((()=>{z=`:host{display:contents}.outer-container{box-sizing:border-box;padding:var(--forge-spacing-medium,16px);justify-content:center;gap:var(--forge-spacing-medium,16px);flex-direction:column;max-width:480px;display:flex}.title-container{align-items:start;gap:var(--forge-spacing-medium,16px);grid-template-columns:1fr auto;display:grid}.close-button-container{height:24px;margin-block-start:-10px;margin-inline-end:-10px}.title{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-heading4-font-family,var(--forge-typography-font-family,"Roboto", sans-serif));font-size:var(--forge-typography-heading4-font-size,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-heading4-font-size-scale,1.25)));font-weight:var(--forge-typography-heading4-font-weight,500);line-height:var(--forge-typography-heading4-line-height,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-heading4-line-height-scale,1.5)));letter-spacing:var(--forge-typography-heading4-letter-spacing,.005em);text-transform:var(--forge-typography-heading4-text-transform,inherit);-webkit-text-decoration:var(--forge-typography-heading4-text-decoration,inherit);text-decoration:var(--forge-typography-heading4-text-decoration,inherit);text-wrap:balance;word-break:break-all}h1{margin:0}.message-container{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-body2-font-family,var(--forge-typography-font-family,"Roboto", sans-serif));font-size:var(--forge-typography-body2-font-size,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-body-font-size-scale,1)));font-weight:var(--forge-typography-body2-font-weight,400);line-height:var(--forge-typography-body2-line-height,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-body-line-height-scale,1.375)));letter-spacing:var(--forge-typography-body2-letter-spacing,.015625em);text-transform:var(--forge-typography-body2-text-transform,inherit);-webkit-text-decoration:var(--forge-typography-body2-text-decoration,inherit);text-decoration:var(--forge-typography-body2-text-decoration,inherit);color:inherit}.actions-container{gap:var(--forge-spacing-medium,16px);flex-flow:wrap;justify-content:end;align-items:center;display:flex}`})))()}var V,H;function U(){return(U=e((()=>{i(),d(),O(),o(),b(),te(),p(),E(),L(),j(),C(),v(),w(),I(),A(),ne(),h(),B(),V=`forge-confirmation-dialog`,H=class extends m{constructor(...e){super(...e),this.open=!1,this.isBusy=!1,this.busyLabel=`Loading`,this.#n=n`<slot name="title" id="confirmation-dialog-title" class="title"></slot>`,this.#i=n`<slot name="secondary-button-text" id="secondary-button-slot"></slot>`}static{this[a]=V}static{this[ee]=[T,F,k,re,g]}static{_.define([y])}static{this.styles=r(z)}#e;get#t(){let e=this._slottedTitleNodes.length>0;return R(e,()=>n`<h1>${this.#n}</h1>`,()=>n`${this.#n}`)}#n;get#r(){return n`
      <forge-icon-button autofocus aria-label="Close confirmation dialog" @click=${()=>this.#l(!1)}>
        <forge-icon name="close"></forge-icon>
      </forge-icon-button>
    `}#i;get#a(){return this.isBusy?this.#o:n`<slot name="primary-button-text" id="primary-button-slot">Confirm</slot>`}get#o(){return n`<forge-circular-progress slot="end" aria-label=${this.busyLabel}></forge-circular-progress>`}get#s(){let e=this._slottedSecondaryButtonTextNodes.length>0;return R(e,()=>n`
        <forge-button variant="outlined" ?disabled=${this.isBusy} id="secondary-button" @click=${()=>this.#l(!1)}>
          ${this.#i}
        </forge-button>
      `,()=>n`${this.#i}`)}get#c(){return n`
      <forge-button
        ?disabled=${this.isBusy}
        variant="raised"
        id="primary-button"
        style=${D({minWidth:this.#e})}
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
        .label=${this.label||f(this._slottedTitleNodes)||``}
        .description=${this.description||f(this._slottedMessageNodes)||``}>
        <div class="outer-container">
          <div class="title-container" style=${D({display:e?`grid`:`none`})}>
            ${this.#t}
            <div class="close-button-container">${this.#r}</div>
          </div>
          <div class="message-container">
            <slot name="message" id="confirmation-message"></slot>
          </div>
          <div class="actions-container">${this.#s} ${this.#c}</div>
        </div>
      </forge-dialog>
    `}#l(e,t=`action`,n){let r=new CustomEvent(`forge-confirmation-dialog-action`,{bubbles:!0,composed:!0,cancelable:!0,detail:{value:e,reason:t}});this.dispatchEvent(r),r.defaultPrevented&&n?n?.preventDefault():r.defaultPrevented||(this.open=!1,this.isBusy=!1)}#u(e){e.detail.reason===`backdrop`?e.preventDefault():this.#l(!1,`light-dismiss`,e)}#d(e){let t=e.target.name;[`title`,`secondary-button-text`,`primary-button-text`].includes(t)&&this.requestUpdate()}},S([u({type:Boolean})],H.prototype,`open`,void 0),S([u()],H.prototype,`label`,void 0),S([u()],H.prototype,`description`,void 0),S([u({type:Boolean,attribute:`is-busy`})],H.prototype,`isBusy`,void 0),S([u({type:String,attribute:`busy-label`})],H.prototype,`busyLabel`,void 0),S([c({slot:`title`,flatten:!0})],H.prototype,`_slottedTitleNodes`,void 0),S([c({slot:`message`,flatten:!0})],H.prototype,`_slottedMessageNodes`,void 0),S([c({slot:`secondary-button-text`,flatten:!0})],H.prototype,`_slottedSecondaryButtonTextNodes`,void 0),S([l(`#primary-button`)],H.prototype,`_primaryButtonRef`,void 0),s(V,H)})))()}function W(){return(W=e((()=>{x()})))()}function G(){return(G=e((()=>{o(),U(),W()})))()}var K=t({Demo:()=>Z,__namedExportsOrder:()=>Q,default:()=>X}),q,J,Y,X,Z,Q;function $(){return($=e((()=>{i(),P(),G(),{action:q}=__STORYBOOK_MODULE_ACTIONS__,J=`forge-confirmation-dialog`,Y=q(`forge-confirmation-dialog-action`),X={title:`Components/Confirmation Dialog`,render:e=>{let t=N();function r(){let e=t.value;e.open=!e.open}function i(t){Y(t),e.preventDefault&&t.preventDefault()}return n`
      <forge-button variant="raised" @click=${r}>Show Confirmation Dialog</forge-button>
      <forge-confirmation-dialog ${M(t)} @forge-confirmation-dialog-action=${i} .isBusy=${e.isBusy}>
        ${e.title.length?n`<span slot="title">${e.title}</span>`:``}
        ${e.message.length?n`<span slot="message">${e.message}</span>`:``}
        ${e.secondaryButtonText.length?n`<span slot="secondary-button-text">${e.secondaryButtonText}</span>`:``}
        ${e.primaryButtonText.length?n`<span slot="primary-button-text">${e.primaryButtonText}</span>`:``}
      </forge-confirmation-dialog>
    `},component:J,argTypes:{isBusy:{control:`boolean`},title:{control:`text`},message:{control:`text`},secondaryButtonText:{control:`text`},primaryButtonText:{control:`text`},preventDefault:{control:`boolean`}},args:{isBusy:!1,title:`Delete selected images?`,message:`Images will be permanently removed from your account and all synced devices.`,secondaryButtonText:`No`,primaryButtonText:`Yes`,preventDefault:!1}},Z={},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{}`,...Z.parameters?.docs?.source}}},Q=[`Demo`]})))()}export{Z as n,$ as r,K as t};