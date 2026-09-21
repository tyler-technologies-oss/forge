var v=e=>{throw TypeError(e)};var h=(e,o,t)=>o.has(e)||v("Cannot "+t);var g=(e,o,t)=>(h(e,o,"read from private field"),t?t.call(e):o.get(e)),y=(e,o,t)=>o.has(e)?v("Cannot add the same private member more than once"):o instanceof WeakSet?o.add(e):o.set(e,t),E=(e,o,t,c)=>(h(e,o,"write to private field"),c?c.call(e,t):o.set(e,t),t),b=(e,o,t)=>(h(e,o,"access private method"),t);import{b as r,r as w}from"./iframe-DwkZy6ch.js";import{t as M,C as N,a as R}from"./service-adapter-DlT-lJx7.js";import{I as z,V as L,W,X as k,Y as U,O as Y}from"./tyler-icons-9EkLoMUE.js";import{s as x}from"./utils-CElmhe9Y.js";import{n as $}from"./property-CyiWKBF8.js";import{n as j}from"./query-assigned-nodes-D8SsSM9e.js";import{n as F}from"./when-CI7b_ccM.js";import{B as V}from"./base-lit-element-BSRdSawL.js";import{B as q}from"./button-QeQK8Yg7.js";import{T as G}from"./toolbar-BuA_G-vH.js";import"./icon-button-DXyGa-P5.js";import"./menu-Bd2MhDLk.js";import"./linear-progress-VpC6qUWa.js";import"./list-Bduf0Zil.js";import"./popover-C4YB0wev.js";import"./overlay-B-1J0zGL.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-Bcd9Y6-A.js";import"./list-item-CIx9kMCC.js";const K=':host{display:block}:host forge-toolbar{--forge-toolbar-background: var(--forge-theme-primary-container-low, #e8eaf6)}.start-container{display:flex;align-items:center;gap:var(--forge-spacing-medium, 16px)}.selected-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-body1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-body1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, .875)));font-weight:var(--forge-typography-body1-font-weight, 400);line-height:var(--forge-typography-body1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.125)));letter-spacing:var(--forge-typography-body1-letter-spacing, .0357142857em);text-transform:var(--forge-typography-body1-text-transform, inherit);text-decoration:var(--forge-typography-body1-text-decoration, inherit)}';var X=Object.defineProperty,S=(e,o,t,c)=>{for(var s=void 0,u=e.length-1,_;u>=0;u--)(_=e[u])&&(s=_(o,t,s)||s);return s&&X(o,t,s),s},A,T,B;const I="forge-multi-select-header";var a,l,O,P,D;const p=class p extends(B=V,T=N,A=R,B){constructor(){super(...arguments);y(this,l);y(this,a);this.text="",this.noBorder=!0,E(this,a,r`<slot name="select-all-button-text"></slot>`)}render(){return r`
      <forge-toolbar ?no-divider=${this.noBorder} @slotchange=${b(this,l,P)}>
        <div slot="start" class="start-container">
          <span class="selected-text">${this.text}</span>
          ${g(this,l,O)}
        </div>
        <slot name="actions" slot="end"></slot>
      </forge-toolbar>
    `}};a=new WeakMap,l=new WeakSet,O=function(){const t=this._slottedSelectAllNodes.length>0;return F(t,()=>r`<forge-button id="select-all-button" @click=${b(this,l,D)}>${g(this,a)}</forge-button>`,()=>r`${g(this,a)}`)},P=function(t){const c=t.target.name;["select-all-button-text","actions"].includes(c)&&this.requestUpdate()},D=function(){const t=new CustomEvent("forge-multi-select-header-select-all",{bubbles:!0,composed:!0});this.dispatchEvent(t)},p[T]=I,p[A]=[q,G],p.styles=w(K);let n=p;S([$({type:String})],n.prototype,"text");S([$({type:Boolean,attribute:"no-border"})],n.prototype,"noBorder");S([j({slot:"select-all-button-text",flatten:!0})],n.prototype,"_slottedSelectAllNodes");M(I,n);const{action:C}=__STORYBOOK_MODULE_ACTIONS__;z.define([L,W,k,U,Y]);const J="forge-multi-select-header",Q={title:"Components/Multi Select Header",component:J,render:e=>{const o=C("forge-multi-select-header-select-all"),t=[{label:"Export as a PDF",value:"option-1",icon:"file_pdf",leadingIconType:"component"},{label:"Export to Excel",value:"option-2",icon:"file_excel",leadingIconType:"component"}];return r`
      <forge-multi-select-header .text=${e.text} .noBorder=${e.noBorder} @forge-multi-select-header-select-all=${o}>
        ${e.selectAllText?r`<span slot="select-all-button-text">${e.selectAllText}</span>`:""}
        <forge-icon-button slot="actions" aria-label="Select all items">
          <forge-icon name="download"></forge-icon>
        </forge-icon-button>
        <forge-icon-button slot="actions" aria-label="Clear selection">
          <forge-icon name="delete"></forge-icon>
        </forge-icon-button>
        <forge-menu slot="actions" .options=${t}>
          <forge-icon-button aria-label="More actions">
            <forge-icon name="more_vert"></forge-icon>
          </forge-icon-button>
        </forge-menu>
      </forge-multi-select-header>
    `},argTypes:{text:{control:"text"},noBorder:{control:"boolean"},selectAllText:{control:"text"}},args:{text:"3 items selected",noBorder:!1,selectAllText:"Select All"}},i={},m={...x,render:()=>r`
    <forge-multi-select-header text="3 items selected">
      <forge-icon-button slot="actions" aria-label="Delete selected">
        <forge-icon name="delete"></forge-icon>
      </forge-icon-button>
    </forge-multi-select-header>
  `},d={...x,render:()=>r`<forge-multi-select-header text="5 rows selected for processing"></forge-multi-select-header>`},f={...x,render:()=>{const e=C("forge-multi-select-header-select-all");return r`
      <forge-multi-select-header text="3 items selected" @forge-multi-select-header-select-all=${e}>
        <span slot="select-all-button-text">Select All Items</span>
      </forge-multi-select-header>
    `}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:"{}",...i.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-multi-select-header text="3 items selected">
      <forge-icon-button slot="actions" aria-label="Delete selected">
        <forge-icon name="delete"></forge-icon>
      </forge-icon-button>
    </forge-multi-select-header>
  \`
}`,...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`<forge-multi-select-header text="5 rows selected for processing"></forge-multi-select-header>\`
}`,...d.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    const handleSelectAll = action('forge-multi-select-header-select-all');
    return html\`
      <forge-multi-select-header text="3 items selected" @forge-multi-select-header-select-all=\${handleSelectAll}>
        <span slot="select-all-button-text">Select All Items</span>
      </forge-multi-select-header>
    \`;
  }
}`,...f.parameters?.docs?.source}}};const Z=["Demo","BasicImplementation","WithCustomText","WithSelectAllButton"],Se=Object.freeze(Object.defineProperty({__proto__:null,BasicImplementation:m,Demo:i,WithCustomText:d,WithSelectAllButton:f,__namedExportsOrder:Z,default:Q},Symbol.toStringTag,{value:"Module"}));export{m as B,i as D,Se as M,d as W,f as a};
