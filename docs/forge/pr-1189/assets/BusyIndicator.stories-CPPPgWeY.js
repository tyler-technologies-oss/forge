var _=e=>{throw TypeError(e)};var b=(e,o,t)=>o.has(e)||_("Cannot "+t);var l=(e,o,t)=>(b(e,o,"read from private field"),t?t.call(e):o.get(e)),x=(e,o,t)=>o.has(e)?_("Cannot add the same private member more than once"):o instanceof WeakSet?o.add(e):o.set(e,t),u=(e,o,t,g)=>(b(e,o,"write to private field"),g?g.call(e,t):o.set(e,t),t),d=(e,o,t)=>(b(e,o,"access private method"),t);import{r as U,b as n}from"./iframe-DhPPATOI.js";import{n as Y,e as j}from"./ref-BhDBbNSW.js";import{s as F}from"./decorators-BUCTEMc-.js";import{s as q}from"./utils-BUEgyQuR.js";import{t as G,C as K,a as H}from"./service-adapter-gy1PbA1l.js";import{n as i}from"./property-Dg1Vmfps.js";import{n as N}from"./query-assigned-nodes-D8SsSM9e.js";import{e as J}from"./class-map-CEQgffN4.js";import{n as c}from"./when-CI7b_ccM.js";import{c as E,B as Q}from"./base-lit-element-HaqO9pkv.js";import{B as V}from"./button-D5tK2bf-.js";import{C as W}from"./circular-progress-D4RaVrYZ.js";import{D as X}from"./dialog-DGghfkK0.js";import{L as Z}from"./linear-progress-BGu4ylYb.js";const ee=':host{display:contents;border-radius:inherit}.surface{padding:var(--forge-spacing-large, 24px);display:grid;gap:var(--forge-spacing-large, 24px)}.layout-container{display:flex;align-items:center;gap:var(--forge-spacing-large, 24px)}.layout-container .content{display:flex;align-items:center;gap:var(--forge-spacing-medium, 16px);width:100%}.message{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-body2-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-body2-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 1)));font-weight:var(--forge-typography-body2-font-weight, 400);line-height:var(--forge-typography-body2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.375)));letter-spacing:var(--forge-typography-body2-letter-spacing, .015625em);text-transform:var(--forge-typography-body2-text-transform, inherit);text-decoration:var(--forge-typography-body2-text-decoration, inherit);flex:1 auto;margin-block:0;color:var(--forge-theme-text-medium, rgba(0, 0, 0, .6))}.title{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-heading4-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-heading4-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading4-font-size-scale, 1.25)));font-weight:var(--forge-typography-heading4-font-weight, 500);line-height:var(--forge-typography-heading4-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading4-line-height-scale, 1.5)));letter-spacing:var(--forge-typography-heading4-letter-spacing, .005em);text-transform:var(--forge-typography-heading4-text-transform, inherit);text-decoration:var(--forge-typography-heading4-text-decoration, inherit);margin:0}.progress-container{min-width:244px}forge-dialog.inline{border-radius:inherit}forge-dialog.inline::part(root){position:absolute;overflow:clip}forge-dialog.inline::part(root),forge-dialog.inline::part(backdrop){border-radius:inherit}.transparent{--forge-dialog-background: transparent;--forge-dialog-elevation: none}';var te=Object.defineProperty,s=(e,o,t,g)=>{for(var h=void 0,v=e.length-1,T;v>=0;v--)(T=e[v])&&(h=T(o,t,h)||h);return h&&te(o,t,h),h},w,S,C;const P="forge-busy-indicator";var p,r,O,z,M,B,L,k,D,R,I,$,A;const y=class y extends(C=Q,S=K,w=H,C){constructor(){super(...arguments);x(this,r);x(this,p);this.open=!1,this.mode="fullscreen",this.headingLevel=1,this.cancelable=!1,this.variant="spinner",this.determinate=!1,this.progress=0,this.buffer=0,this.transparent=!1,u(this,p,null)}disconnectedCallback(){l(this,p)&&d(this,r,$).call(this),super.disconnectedCallback()}willUpdate(t){t.has("open")&&d(this,r,R).call(this)}render(){return n`
      <forge-dialog
        class=${J({inline:this.mode==="inline",transparent:this.transparent})}
        persistent
        fullscreen-threshold="0"
        .open=${this.open}
        .mode=${this.mode==="inline"?"inline-modal":"modal"}
        .label=${this.label||this.titleText||E(this._slottedTitleNodes)||""}
        .description=${this.description||this.message||E(this._slottedMessageNodes)||""}>
        <div class="surface" @slotchange=${d(this,r,A)}>
          ${l(this,r,O)}
          ${c(this.variant==="spinner"||this.variant==="message-only"||this.message||this.cancelable,()=>n`<div class="layout-container">${l(this,r,M)} ${l(this,r,B)}</div>`)}
          ${l(this,r,k)}
        </div>
      </forge-dialog>
    `}};p=new WeakMap,r=new WeakSet,O=function(){const t=!!this.titleText?.trim()||this._slottedTitleNodes.length>0;return c(t,()=>n`<div role="heading" aria-level=${this.headingLevel} id="title" class="title"><slot name="title">${this.titleText}</slot></div>`,()=>n`<slot name="title"></slot>`)},z=function(){const t=!!this.message?.trim()||this._slottedMessageNodes.length>0;return c(t,()=>n`<p id="message" class="message"><slot name="message">${this.message}</slot></p>`,()=>n`<slot name="message"></slot>`)},M=function(){return c(this.variant==="spinner",()=>n`<div>
          <forge-circular-progress class="spinner" aria-hidden="true" ?determinate="${this.determinate}" .progress=${this.progress}></forge-circular-progress>
        </div>`)},B=function(){const t=this.variant==="message-only"||this.message||this.cancelable;return c(t,()=>n`<div class="content">${l(this,r,z)} ${l(this,r,L)}</div>`)},L=function(){return c(this.cancelable,()=>n`<forge-button class="cancel-button" variant="outlined" @click=${d(this,r,D)}>
          <slot name="cancel-text">Cancel</slot>
        </forge-button>`)},k=function(){return c(this.variant==="progress",()=>n`<div class="progress-container">
          <forge-linear-progress
            aria-hidden="true"
            .determinate="${this.determinate}"
            .buffer=${this.buffer}
            .progress=${this.progress}></forge-linear-progress>
        </div>`)},D=function(){const t=new CustomEvent("forge-busy-indicator-cancel",{bubbles:!0,cancelable:!0});this.dispatchEvent(t),t.defaultPrevented||(this.open=!1)},R=function(){this.open&&this.mode==="fullscreen"?d(this,r,I).call(this):l(this,p)&&d(this,r,$).call(this)},I=function(){u(this,p,document.activeElement)},$=function(){l(this,p)?.focus({preventScroll:!0}),u(this,p,null)},A=function(t){const g=t.target.name;["title","message"].includes(g)&&this.requestUpdate()},y[S]=P,y[w]=[V,W,X,Z],y.styles=U(ee);let a=y;s([i({type:Boolean})],a.prototype,"open");s([i({type:String})],a.prototype,"mode");s([i({attribute:"title-text"})],a.prototype,"titleText");s([i({attribute:"heading-level",type:Number})],a.prototype,"headingLevel");s([i()],a.prototype,"message");s([i()],a.prototype,"label");s([i()],a.prototype,"description");s([i({type:Boolean})],a.prototype,"cancelable");s([i()],a.prototype,"variant");s([i({type:Boolean})],a.prototype,"determinate");s([i({type:Number})],a.prototype,"progress");s([i({type:Number})],a.prototype,"buffer");s([i({type:Boolean})],a.prototype,"transparent");s([N({slot:"title",flatten:!0})],a.prototype,"_slottedTitleNodes");s([N({slot:"message",flatten:!0})],a.prototype,"_slottedMessageNodes");G(P,a);const{action:re}=__STORYBOOK_MODULE_ACTIONS__,oe="forge-busy-indicator",ae=re("forge-busy-indicator-cancel"),se={title:"Components/Busy Indicator",component:oe,render:e=>{const o=j();function t(){const g=o.value;g.open=!0,setTimeout(()=>g.open=!1,3e3)}return n`
      <forge-button variant="raised" @click=${t}>Show Busy Indicator</forge-button>
      <forge-busy-indicator
        ${Y(o)}
        @forge-busy-indicator-cancel=${ae}
        .mode=${e.mode}
        .titleText="${e.titleText}"
        .message=${e.message}
        .cancelable=${e.cancelable}
        .variant=${e.variant}
        .determinate=${e.determinate}
        .progress=${e.progress}
        .buffer=${e.buffer}
        .transparent=${e.transparent}></forge-busy-indicator>
    `},argTypes:{mode:{control:"select",options:["modal","inline"]},variant:{control:"select",options:["spinner","progress","message-only"]}},args:{mode:"modal",titleText:"",message:"Please wait while we load your data...",cancelable:!1,variant:"spinner",progress:.5,buffer:1,determinate:!1,transparent:!1}},f={},m={...q,decorators:[F(`
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
  `};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:"{}",...f.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};const ie=["Demo","Inline"],Te=Object.freeze(Object.defineProperty({__proto__:null,Demo:f,Inline:m,__namedExportsOrder:ie,default:se},Symbol.toStringTag,{value:"Module"}));export{Te as B,f as D,m as I};
