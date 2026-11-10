import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{T as r,g as i}from"./iframe-BbUsXXnT.js";import{_ as a,m as o}from"./utils-C90un5XN.js";import{d as s,r as c,t as l}from"./decorators-Ci1onliJ.js";import{n as u}from"./when-Daf2bbVy.js";import{t as d}from"./class-map-DEew1OiS.js";import{t as f}from"./class-map-8zp5OV2u.js";import{C as p,S as m,t as h,x as g}from"./dist-CPhmYI86.js";import{i as _,n as v,s as y,t as b}from"./base-lit-element-DvCODc3f.js";import{p as x}from"./constants-Bpi-_RbP.js";import{t as S}from"./decorate-DvwEnSYK.js";import{i as C,n as w,t as T}from"./ref-CKV-hb40.js";import{n as ee,t as te}from"./button-ChOt7pzd.js";import{t as E}from"./button-6zjUplxX.js";import{n as D,r as O,t as k}from"./linear-progress-C3JNzRVg.js";import{n as A,t as j}from"./decorators-D1191oN3.js";import{n as M,r as N,t as P}from"./dialog-DukH9C2E.js";import{n as F,r as I,t as L}from"./circular-progress-DM4cNVHb.js";var R;function z(){return(z=e((()=>{R=`:host{border-radius:inherit;display:contents}.surface{padding:var(--forge-spacing-large,24px);gap:var(--forge-spacing-large,24px);display:grid}.layout-container{align-items:center;gap:var(--forge-spacing-large,24px);display:flex}.layout-container .content{align-items:center;gap:var(--forge-spacing-medium,16px);width:100%;display:flex}.message{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-body2-font-family,var(--forge-typography-font-family,"Roboto", sans-serif));font-size:var(--forge-typography-body2-font-size,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-body-font-size-scale,1)));font-weight:var(--forge-typography-body2-font-weight,400);line-height:var(--forge-typography-body2-line-height,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-body-line-height-scale,1.375)));letter-spacing:var(--forge-typography-body2-letter-spacing,.015625em);text-transform:var(--forge-typography-body2-text-transform,inherit);-webkit-text-decoration:var(--forge-typography-body2-text-decoration,inherit);text-decoration:var(--forge-typography-body2-text-decoration,inherit);color:var(--forge-theme-text-medium,#0009);flex:auto;margin-block:0}.title{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-heading4-font-family,var(--forge-typography-font-family,"Roboto", sans-serif));font-size:var(--forge-typography-heading4-font-size,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-heading4-font-size-scale,1.25)));font-weight:var(--forge-typography-heading4-font-weight,500);line-height:var(--forge-typography-heading4-line-height,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-heading4-line-height-scale,1.5)));letter-spacing:var(--forge-typography-heading4-letter-spacing,.005em);text-transform:var(--forge-typography-heading4-text-transform,inherit);-webkit-text-decoration:var(--forge-typography-heading4-text-decoration,inherit);text-decoration:var(--forge-typography-heading4-text-decoration,inherit);margin:0}.progress-container{min-width:244px}forge-dialog.inline{border-radius:inherit}forge-dialog.inline::part(root){position:absolute;overflow:clip}forge-dialog.inline::part(root),forge-dialog.inline::part(backdrop){border-radius:inherit}.transparent{--forge-dialog-background:transparent;--forge-dialog-elevation:none}`})))()}var B,V;function H(){return(H=e((()=>{i(),l(),f(),h(),v(),y(),E(),L(),P(),k(),ee(),I(),N(),O(),z(),B=`forge-busy-indicator`,V=class extends b{constructor(...e){super(...e),this.open=!1,this.mode=`fullscreen`,this.headingLevel=1,this.cancelable=!1,this.variant=`spinner`,this.determinate=!1,this.progress=0,this.buffer=0,this.transparent=!1,this.#e=null}static{this[p]=B}static{this[m]=[te,F,M,D]}static{this.styles=r(R)}#e;get#t(){let e=!!this.titleText?.trim()||this._slottedTitleNodes.length>0;return u(e,()=>n`<div role="heading" aria-level=${this.headingLevel} id="title" class="title"><slot name="title">${this.titleText}</slot></div>`,()=>n`<slot name="title"></slot>`)}get#n(){let e=!!this.message?.trim()||this._slottedMessageNodes.length>0;return u(e,()=>n`<p id="message" class="message"><slot name="message">${this.message}</slot></p>`,()=>n`<slot name="message"></slot>`)}get#r(){return u(this.variant===`spinner`,()=>n`<div>
          <forge-circular-progress class="spinner" aria-hidden="true" ?determinate="${this.determinate}" .progress=${this.progress}></forge-circular-progress>
        </div>`)}get#i(){let e=this.variant===`message-only`||this.message||this.cancelable;return u(e,()=>n`<div class="content">${this.#n} ${this.#a}</div>`)}get#a(){return u(this.cancelable,()=>n`<forge-button class="cancel-button" variant="outlined" @click=${this.#s}>
          <slot name="cancel-text">Cancel</slot>
        </forge-button>`)}get#o(){return u(this.variant===`progress`,()=>n`<div class="progress-container">
          <forge-linear-progress
            aria-hidden="true"
            .determinate="${this.determinate}"
            .buffer=${this.buffer}
            .progress=${this.progress}></forge-linear-progress>
        </div>`)}disconnectedCallback(){this.#e&&this.#u(),super.disconnectedCallback()}willUpdate(e){e.has(`open`)&&this.#c()}render(){return n`
      <forge-dialog
        class=${d({inline:this.mode===`inline`,transparent:this.transparent})}
        persistent
        fullscreen-threshold="0"
        .open=${this.open}
        .mode=${this.mode===`inline`?`inline-modal`:`modal`}
        .label=${this.label||this.titleText||_(this._slottedTitleNodes)||``}
        .description=${this.description||this.message||_(this._slottedMessageNodes)||``}>
        <div class="surface" @slotchange=${this.#d}>
          ${this.#t}
          ${u(this.variant===`spinner`||this.variant===`message-only`||this.message||this.cancelable,()=>n`<div class="layout-container">${this.#r} ${this.#i}</div>`)}
          ${this.#o}
        </div>
      </forge-dialog>
    `}#s(){let e=new CustomEvent(`forge-busy-indicator-cancel`,{bubbles:!0,cancelable:!0});this.dispatchEvent(e),e.defaultPrevented||(this.open=!1)}#c(){this.open&&this.mode===`fullscreen`?this.#l():this.#e&&this.#u()}#l(){this.#e=document.activeElement}#u(){this.#e?.focus({preventScroll:!0}),this.#e=null}#d(e){let t=e.target.name;[`title`,`message`].includes(t)&&this.requestUpdate()}},S([s({type:Boolean})],V.prototype,`open`,void 0),S([s({type:String})],V.prototype,`mode`,void 0),S([s({attribute:`title-text`})],V.prototype,`titleText`,void 0),S([s({attribute:`heading-level`,type:Number})],V.prototype,`headingLevel`,void 0),S([s()],V.prototype,`message`,void 0),S([s()],V.prototype,`label`,void 0),S([s()],V.prototype,`description`,void 0),S([s({type:Boolean})],V.prototype,`cancelable`,void 0),S([s()],V.prototype,`variant`,void 0),S([s({type:Boolean})],V.prototype,`determinate`,void 0),S([s({type:Number})],V.prototype,`progress`,void 0),S([s({type:Number})],V.prototype,`buffer`,void 0),S([s({type:Boolean})],V.prototype,`transparent`,void 0),S([c({slot:`title`,flatten:!0})],V.prototype,`_slottedTitleNodes`,void 0),S([c({slot:`message`,flatten:!0})],V.prototype,`_slottedMessageNodes`,void 0),g(B,V)})))()}function U(){return(U=e((()=>{x()})))()}function W(){return(W=e((()=>{h(),H(),U()})))()}var G=t({Demo:()=>X,Inline:()=>Z,__namedExportsOrder:()=>Q,default:()=>Y}),K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{i(),T(),j(),o(),W(),{action:K}=__STORYBOOK_MODULE_ACTIONS__,q=`forge-busy-indicator`,J=K(`forge-busy-indicator-cancel`),Y={title:`Components/Busy Indicator`,component:q,render:e=>{let t=w();function r(){let e=t.value;e.open=!0,setTimeout(()=>e.open=!1,3e3)}return n`
      <forge-button variant="raised" @click=${r}>Show Busy Indicator</forge-button>
      <forge-busy-indicator
        ${C(t)}
        @forge-busy-indicator-cancel=${J}
        .mode=${e.mode}
        .titleText="${e.titleText}"
        .message=${e.message}
        .cancelable=${e.cancelable}
        .variant=${e.variant}
        .determinate=${e.determinate}
        .progress=${e.progress}
        .buffer=${e.buffer}
        .transparent=${e.transparent}></forge-busy-indicator>
    `},argTypes:{mode:{control:`select`,options:[`modal`,`inline`]},variant:{control:`select`,options:[`spinner`,`progress`,`message-only`]}},args:{mode:`modal`,titleText:``,message:`Please wait while we load your data...`,cancelable:!1,variant:`spinner`,progress:.5,buffer:1,determinate:!1,transparent:!1}},X={},Z={...a,decorators:[A(`
    .parent {
      position: relative;
      height: 300px;
      border: 1px solid var(--forge-theme-outline);
      border-radius: var(--forge-shape-large);
    }
  `)],render:()=>n`
    <div class="parent">
      <forge-busy-indicator open mode="inline" title-text="Loading" message="Please wait while we load your data..."></forge-busy-indicator>
    </div>
  `},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  decorators: [storyStyles(\`
    .parent {
      position: relative;
      height: 300px;
      border: 1px solid var(--forge-theme-outline);
      border-radius: var(--forge-shape-large);
    }
  \`)],
  render: () => html\`
    <div class="parent">
      <forge-busy-indicator open mode="inline" title-text="Loading" message="Please wait while we load your data..."></forge-busy-indicator>
    </div>
  \`
}`,...Z.parameters?.docs?.source}}},Q=[`Demo`,`Inline`]})))()}export{$ as i,X as n,Z as r,G as t};