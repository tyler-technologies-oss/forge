import{r as I,b as r}from"./iframe-Y92HmdHZ.js";import{C as P,a as w}from"./service-adapter-8tADcN_b.js";import{I as D,V as N,W,X as R,Y as z,O as L}from"./tyler-icons-SWWw4qdQ.js";import{s as y}from"./utils-DbbJplVM.js";import{B as H,t as U}from"./base-lit-element-DXQv51bq.js";import{n as x}from"./property-4XXebId8.js";import{n as k}from"./query-assigned-nodes-D8SsSM9e.js";import{n as Y}from"./when-CI7b_ccM.js";import{B as F}from"./button-BUQjmV8l.js";import"./focus-indicator-CypHdldK.js";import"./state-layer-C4o8tMgM.js";import{T as G}from"./toolbar-xc73DdA4.js";import"./icon-button-BG-KzVAg.js";import"./menu-Croe9Yxl.js";import"./linear-progress-Dj7Wb6Io.js";import"./list-CSKmw5w_.js";import"./popover-CqxRAdRj.js";import"./overlay-OLurZXLD.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-FcTi7X6q.js";import"./list-item-DkeO-h5u.js";const V=':host{display:block}:host forge-toolbar{--forge-toolbar-background: var(--forge-theme-primary-container-low, #e8eaf6)}.start-container{display:flex;align-items:center;gap:var(--forge-spacing-medium, 16px)}.selected-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-body1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-body1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, .875)));font-weight:var(--forge-typography-body1-font-weight, 400);line-height:var(--forge-typography-body1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.125)));letter-spacing:var(--forge-typography-body1-letter-spacing, .0357142857em);text-transform:var(--forge-typography-body1-text-transform, inherit);text-decoration:var(--forge-typography-body1-text-decoration, inherit)}';var q=Object.defineProperty,K=Object.getOwnPropertyDescriptor,v=e=>{throw TypeError(e)},f=(e,t,o,d)=>{for(var a=d>1?void 0:d?K(t,o):t,g=e.length-1,u;g>=0;g--)(u=e[g])&&(a=(d?u(t,o,a):u(a))||a);return d&&a&&q(t,o,a),a},S=(e,t,o)=>t.has(e)||v("Cannot "+o),h=(e,t,o)=>(S(e,t,"read from private field"),o?o.call(e):t.get(e)),_=(e,t,o)=>t.has(e)?v("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,o),E=(e,t,o)=>(S(e,t,"access private method"),o),A,T,b,p,m,C,B,M;const O="forge-multi-select-header";let l=class extends(b=H,T=P,A=w,b){constructor(){super(...arguments),_(this,m),this.text="",this.noBorder=!0,_(this,p,r`<slot name="select-all-button-text"></slot>`)}render(){return r`
      <forge-toolbar ?no-divider=${this.noBorder} @slotchange=${E(this,m,B)}>
        <div slot="start" class="start-container">
          <span class="selected-text">${this.text}</span>
          ${h(this,m,C)}
        </div>
        <slot name="actions" slot="end"></slot>
      </forge-toolbar>
    `}};p=new WeakMap;m=new WeakSet;C=function(){const e=this._slottedSelectAllNodes.length>0;return Y(e,()=>r`<forge-button id="select-all-button" @click=${E(this,m,M)}>${h(this,p)}</forge-button>`,()=>r`${h(this,p)}`)};B=function(e){const t=e.target.name;["select-all-button-text","actions"].includes(t)&&this.requestUpdate()};M=function(){const e=new CustomEvent("forge-multi-select-header-select-all",{bubbles:!0,composed:!0});this.dispatchEvent(e)};l[T]=O;l[A]=[F,G];l.styles=I(V);f([x({type:String})],l.prototype,"text",2);f([x({type:Boolean,attribute:"no-border"})],l.prototype,"noBorder",2);f([k({slot:"select-all-button-text",flatten:!0})],l.prototype,"_slottedSelectAllNodes",2);l=f([U(O)],l);const{action:$}=__STORYBOOK_MODULE_ACTIONS__;D.define([N,W,R,z,L]);const X="forge-multi-select-header",j={title:"Components/Multi Select Header",component:X,render:e=>{const t=$("forge-multi-select-header-select-all"),o=[{label:"Export as a PDF",value:"option-1",icon:"file_pdf",leadingIconType:"component"},{label:"Export to Excel",value:"option-2",icon:"file_excel",leadingIconType:"component"}];return r`
      <forge-multi-select-header .text=${e.text} .noBorder=${e.noBorder} @forge-multi-select-header-select-all=${t}>
        ${e.selectAllText?r`<span slot="select-all-button-text">${e.selectAllText}</span>`:""}
        <forge-icon-button slot="actions" aria-label="Select all items">
          <forge-icon name="download"></forge-icon>
        </forge-icon-button>
        <forge-icon-button slot="actions" aria-label="Clear selection">
          <forge-icon name="delete"></forge-icon>
        </forge-icon-button>
        <forge-menu slot="actions" .options=${o}>
          <forge-icon-button aria-label="More actions">
            <forge-icon name="more_vert"></forge-icon>
          </forge-icon-button>
        </forge-menu>
      </forge-multi-select-header>
    `},argTypes:{text:{control:"text"},noBorder:{control:"boolean"},selectAllText:{control:"text"}},args:{text:"3 items selected",noBorder:!1,selectAllText:"Select All"}},n={},s={...y,render:()=>r`
    <forge-multi-select-header text="3 items selected">
      <forge-icon-button slot="actions" aria-label="Delete selected">
        <forge-icon name="delete"></forge-icon>
      </forge-icon-button>
    </forge-multi-select-header>
  `},c={...y,render:()=>r`<forge-multi-select-header text="5 rows selected for processing"></forge-multi-select-header>`},i={...y,render:()=>{const e=$("forge-multi-select-header-select-all");return r`
      <forge-multi-select-header text="3 items selected" @forge-multi-select-header-select-all=${e}>
        <span slot="select-all-button-text">Select All Items</span>
      </forge-multi-select-header>
    `}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:"{}",...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-multi-select-header text="3 items selected">
      <forge-icon-button slot="actions" aria-label="Delete selected">
        <forge-icon name="delete"></forge-icon>
      </forge-icon-button>
    </forge-multi-select-header>
  \`
}`,...s.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`<forge-multi-select-header text="5 rows selected for processing"></forge-multi-select-header>\`
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    const handleSelectAll = action('forge-multi-select-header-select-all');
    return html\`
      <forge-multi-select-header text="3 items selected" @forge-multi-select-header-select-all=\${handleSelectAll}>
        <span slot="select-all-button-text">Select All Items</span>
      </forge-multi-select-header>
    \`;
  }
}`,...i.parameters?.docs?.source}}};const J=["Demo","BasicImplementation","WithCustomText","WithSelectAllButton"],xe=Object.freeze(Object.defineProperty({__proto__:null,BasicImplementation:s,Demo:n,WithCustomText:c,WithSelectAllButton:i,__namedExportsOrder:J,default:j},Symbol.toStringTag,{value:"Module"}));export{s as B,n as D,xe as M,c as W,i as a};
