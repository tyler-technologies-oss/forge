import{r as A,b as n}from"./iframe-Y92HmdHZ.js";import{n as L,e as W}from"./ref-C9xd_Bhv.js";import{C as U,a as Y}from"./service-adapter-8tADcN_b.js";import{c as B,B as G,t as j}from"./base-lit-element-DXQv51bq.js";import{n as g}from"./property-4XXebId8.js";import{e as q}from"./query-CtiAP21w.js";import{n as _}from"./query-assigned-nodes-D8SsSM9e.js";import{o as C}from"./style-map-CPyruTRu.js";import{n as T}from"./when-CI7b_ccM.js";import{M as F,I as K,D as H}from"./tyler-icons-SWWw4qdQ.js";import{B as J}from"./button-BUQjmV8l.js";import"./focus-indicator-CypHdldK.js";import"./state-layer-C4o8tMgM.js";import{C as Q}from"./circular-progress-Bc1cF_P_.js";import{D as V}from"./dialog-C-zyrl9l.js";import{I as X}from"./icon-button-BG-KzVAg.js";const Z=':host{display:contents}.outer-container{box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;padding:var(--forge-spacing-medium, 16px);gap:var(--forge-spacing-medium, 16px);max-width:480px}.title-container{display:grid;grid-template-columns:1fr auto;align-items:start;gap:var(--forge-spacing-medium, 16px)}.close-button-container{height:24px;margin-block-start:-10px;margin-inline-end:-10px}.title{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-heading4-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-heading4-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading4-font-size-scale, 1.25)));font-weight:var(--forge-typography-heading4-font-weight, 500);line-height:var(--forge-typography-heading4-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading4-line-height-scale, 1.5)));letter-spacing:var(--forge-typography-heading4-letter-spacing, .005em);text-transform:var(--forge-typography-heading4-text-transform, inherit);text-decoration:var(--forge-typography-heading4-text-decoration, inherit);text-wrap:balance;word-break:break-all}h1{margin:0}.message-container{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-body2-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-body2-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 1)));font-weight:var(--forge-typography-body2-font-weight, 400);line-height:var(--forge-typography-body2-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.375)));letter-spacing:var(--forge-typography-body2-letter-spacing, .015625em);text-transform:var(--forge-typography-body2-text-transform, inherit);text-decoration:var(--forge-typography-body2-text-decoration, inherit);color:inherit}.actions-container{display:flex;gap:var(--forge-spacing-medium, 16px);align-items:center;flex-wrap:wrap;flex-direction:row;justify-content:end}';var tt=Object.defineProperty,et=Object.getOwnPropertyDescriptor,w=t=>{throw TypeError(t)},c=(t,e,o,s)=>{for(var a=s>1?void 0:s?et(e,o):e,v=t.length-1,b;v>=0;v--)(b=t[v])&&(a=(s?b(e,o,a):b(a))||a);return s&&a&&tt(e,o,a),a},x=(t,e,o)=>e.has(t)||w("Cannot "+o),l=(t,e,o)=>(x(t,e,"read from private field"),o?o.call(t):e.get(t)),y=(t,e,o)=>e.has(t)?w("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,o),ot=(t,e,o,s)=>(x(t,e,"write to private field"),e.set(t,o),o),p=(t,e,o)=>(x(t,e,"access private method"),o),D,S,$,h,r,E,m,N,u,O,M,z,I,d,P,R;const k="forge-confirmation-dialog";let i=class extends($=G,S=U,D=Y,$){constructor(){super(...arguments),y(this,r),this.open=!1,this.isBusy=!1,this.busyLabel="Loading",y(this,h),y(this,m,n`<slot name="title" id="confirmation-dialog-title" class="title"></slot>`),y(this,u,n`<slot name="secondary-button-text" id="secondary-button-slot"></slot>`)}willUpdate(t){t.has("isBusy")&&ot(this,h,this.isBusy&&this._primaryButtonRef?`${this._primaryButtonRef.clientWidth}px`:void 0)}render(){const t=this._slottedTitleNodes.length>0;return n`
      <forge-dialog
        @slotchange=${p(this,r,R)}
        @forge-dialog-before-close=${p(this,r,P)}
        @forge-dialog-close=${()=>this.isBusy=!1}
        fullscreen-threshold="0"
        ?open=${this.open}
        .label=${this.label||B(this._slottedTitleNodes)||""}
        .description=${this.description||B(this._slottedMessageNodes)||""}>
        <div class="outer-container">
          <div class="title-container" style=${C({display:t?"grid":"none"})}>
            ${l(this,r,E)}
            <div class="close-button-container">${l(this,r,N)}</div>
          </div>
          <div class="message-container">
            <slot name="message" id="confirmation-message"></slot>
          </div>
          <div class="actions-container">${l(this,r,z)} ${l(this,r,I)}</div>
        </div>
      </forge-dialog>
    `}};h=new WeakMap;r=new WeakSet;E=function(){const t=this._slottedTitleNodes.length>0;return T(t,()=>n`<h1>${l(this,m)}</h1>`,()=>n`${l(this,m)}`)};m=new WeakMap;N=function(){return n`
      <forge-icon-button autofocus aria-label="Close confirmation dialog" @click=${()=>p(this,r,d).call(this,!1)}>
        <forge-icon name="close"></forge-icon>
      </forge-icon-button>
    `};u=new WeakMap;O=function(){return this.isBusy?l(this,r,M):n`<slot name="primary-button-text" id="primary-button-slot">Confirm</slot>`};M=function(){return n`<forge-circular-progress slot="end" aria-label=${this.busyLabel}></forge-circular-progress>`};z=function(){const t=this._slottedSecondaryButtonTextNodes.length>0;return T(t,()=>n`
        <forge-button variant="outlined" ?disabled=${this.isBusy} id="secondary-button" @click=${()=>p(this,r,d).call(this,!1)}>
          ${l(this,u)}
        </forge-button>
      `,()=>n`${l(this,u)}`)};I=function(){return n`
      <forge-button
        ?disabled=${this.isBusy}
        variant="raised"
        id="primary-button"
        style=${C({minWidth:l(this,h)})}
        @click=${()=>p(this,r,d).call(this,!0)}>
        ${l(this,r,O)}
      </forge-button>
    `};d=function(t,e="action",o){const s=new CustomEvent("forge-confirmation-dialog-action",{bubbles:!0,composed:!0,cancelable:!0,detail:{value:t,reason:e}});this.dispatchEvent(s),s.defaultPrevented&&o?o?.preventDefault():s.defaultPrevented||(this.open=!1,this.isBusy=!1)};P=function(t){if(t.detail.reason==="backdrop"){t.preventDefault();return}p(this,r,d).call(this,!1,"light-dismiss",t)};R=function(t){const e=t.target.name;["title","secondary-button-text","primary-button-text"].includes(e)&&this.requestUpdate()};i[S]=k;i[D]=[J,Q,V,X,F];K.define([H]);i.styles=A(Z);c([g({type:Boolean})],i.prototype,"open",2);c([g()],i.prototype,"label",2);c([g()],i.prototype,"description",2);c([g({type:Boolean,attribute:"is-busy"})],i.prototype,"isBusy",2);c([g({type:String,attribute:"busy-label"})],i.prototype,"busyLabel",2);c([_({slot:"title",flatten:!0})],i.prototype,"_slottedTitleNodes",2);c([_({slot:"message",flatten:!0})],i.prototype,"_slottedMessageNodes",2);c([_({slot:"secondary-button-text",flatten:!0})],i.prototype,"_slottedSecondaryButtonTextNodes",2);c([q("#primary-button")],i.prototype,"_primaryButtonRef",2);i=c([j(k)],i);const{action:nt}=__STORYBOOK_MODULE_ACTIONS__,rt="forge-confirmation-dialog",it=nt("forge-confirmation-dialog-action"),at={title:"Components/Confirmation Dialog",render:t=>{const e=W();function o(){const a=e.value;a.open=!a.open}function s(a){it(a),t.preventDefault&&a.preventDefault()}return n`
      <forge-button variant="raised" @click=${o}>Show Confirmation Dialog</forge-button>
      <forge-confirmation-dialog ${L(e)} @forge-confirmation-dialog-action=${s} .isBusy=${t.isBusy}>
        ${t.title.length?n`<span slot="title">${t.title}</span>`:""}
        ${t.message.length?n`<span slot="message">${t.message}</span>`:""}
        ${t.secondaryButtonText.length?n`<span slot="secondary-button-text">${t.secondaryButtonText}</span>`:""}
        ${t.primaryButtonText.length?n`<span slot="primary-button-text">${t.primaryButtonText}</span>`:""}
      </forge-confirmation-dialog>
    `},component:rt,argTypes:{isBusy:{control:"boolean"},title:{control:"text"},message:{control:"text"},secondaryButtonText:{control:"text"},primaryButtonText:{control:"text"},preventDefault:{control:"boolean"}},args:{isBusy:!1,title:"Delete selected images?",message:"Images will be permanently removed from your account and all synced devices.",secondaryButtonText:"No",primaryButtonText:"Yes",preventDefault:!1}},f={};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:"{}",...f.parameters?.docs?.source}}};const st=["Demo"],Ct=Object.freeze(Object.defineProperty({__proto__:null,Demo:f,__namedExportsOrder:st,default:at},Symbol.toStringTag,{value:"Module"}));export{Ct as C,f as D};
