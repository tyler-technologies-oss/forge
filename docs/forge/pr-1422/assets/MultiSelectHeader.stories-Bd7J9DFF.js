import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{T as r,g as i}from"./iframe-BbUsXXnT.js";import{_ as a,m as o}from"./utils-C90un5XN.js";import{d as s,r as c,t as l}from"./decorators-Ci1onliJ.js";import{n as u}from"./when-Daf2bbVy.js";import{C as d,S as f,t as p,x as m}from"./dist-CPhmYI86.js";import{n as h,t as g}from"./base-lit-element-DvCODc3f.js";import{p as _}from"./constants-Bpi-_RbP.js";import{o as v,t as y}from"./icon-CdA8CuQQ.js";import{t as b}from"./decorate-DvwEnSYK.js";import{R as x,et as S,t as C,tt as w,z as T,zt as E}from"./tyler-icons-kuH1S-j5.js";import{t as D}from"./icon-button-Cw3e2eGB.js";import{n as O,t as k}from"./button-ChOt7pzd.js";import{t as A}from"./button-6zjUplxX.js";import{t as j}from"./menu-DLRi2CZU.js";import{n as M,r as N,t as P}from"./toolbar-BJddCJGC.js";var F;function I(){return(I=e((()=>{F=`:host{display:block}:host forge-toolbar{--forge-toolbar-background:var(--forge-theme-primary-container-low,#e8eaf6)}.start-container{align-items:center;gap:var(--forge-spacing-medium,16px);display:flex}.selected-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-body1-font-family,var(--forge-typography-font-family,"Roboto", sans-serif));font-size:var(--forge-typography-body1-font-size,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-body-font-size-scale,.875)));font-weight:var(--forge-typography-body1-font-weight,400);line-height:var(--forge-typography-body1-line-height,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-body-line-height-scale,1.125)));letter-spacing:var(--forge-typography-body1-letter-spacing,.0357143em);text-transform:var(--forge-typography-body1-text-transform,inherit);-webkit-text-decoration:var(--forge-typography-body1-text-decoration,inherit);text-decoration:var(--forge-typography-body1-text-decoration,inherit)}`})))()}var L,R;function z(){return(z=e((()=>{i(),l(),p(),h(),A(),P(),O(),N(),I(),L=`forge-multi-select-header`,R=class extends g{constructor(...e){super(...e),this.text=``,this.noBorder=!0,this.#e=n`<slot name="select-all-button-text"></slot>`}static{this[d]=L}static{this[f]=[k,M]}static{this.styles=r(F)}#e;get#t(){let e=this._slottedSelectAllNodes.length>0;return u(e,()=>n`<forge-button id="select-all-button" @click=${this.#r}>${this.#e}</forge-button>`,()=>n`${this.#e}`)}render(){return n`
      <forge-toolbar ?no-divider=${this.noBorder} @slotchange=${this.#n}>
        <div slot="start" class="start-container">
          <span class="selected-text">${this.text}</span>
          ${this.#t}
        </div>
        <slot name="actions" slot="end"></slot>
      </forge-toolbar>
    `}#n(e){let t=e.target.name;[`select-all-button-text`,`actions`].includes(t)&&this.requestUpdate()}#r(){let e=new CustomEvent(`forge-multi-select-header-select-all`,{bubbles:!0,composed:!0});this.dispatchEvent(e)}},b([s({type:String})],R.prototype,`text`,void 0),b([s({type:Boolean,attribute:`no-border`})],R.prototype,`noBorder`,void 0),b([c({slot:`select-all-button-text`,flatten:!0})],R.prototype,`_slottedSelectAllNodes`,void 0),m(L,R)})))()}function B(){return(B=e((()=>{_()})))()}function V(){return(V=e((()=>{p(),z(),B()})))()}var H=t({BasicImplementation:()=>K,Demo:()=>G,WithCustomText:()=>q,WithSelectAllButton:()=>J,__namedExportsOrder:()=>Y,default:()=>W}),U,W,G,K,q,J,Y;function X(){return(X=e((()=>{i(),y(),C(),o(),V(),D(),j(),{action:U}=__STORYBOOK_MODULE_ACTIONS__,v.define([x,T,S,w,E]),W={title:`Components/Multi Select Header`,component:`forge-multi-select-header`,render:e=>{let t=U(`forge-multi-select-header-select-all`);return n`
      <forge-multi-select-header .text=${e.text} .noBorder=${e.noBorder} @forge-multi-select-header-select-all=${t}>
        ${e.selectAllText?n`<span slot="select-all-button-text">${e.selectAllText}</span>`:``}
        <forge-icon-button slot="actions" aria-label="Select all items">
          <forge-icon name="download"></forge-icon>
        </forge-icon-button>
        <forge-icon-button slot="actions" aria-label="Clear selection">
          <forge-icon name="delete"></forge-icon>
        </forge-icon-button>
        <forge-menu slot="actions" .options=${[{label:`Export as a PDF`,value:`option-1`,icon:`file_pdf`,leadingIconType:`component`},{label:`Export to Excel`,value:`option-2`,icon:`file_excel`,leadingIconType:`component`}]}>
          <forge-icon-button aria-label="More actions">
            <forge-icon name="more_vert"></forge-icon>
          </forge-icon-button>
        </forge-menu>
      </forge-multi-select-header>
    `},argTypes:{text:{control:`text`},noBorder:{control:`boolean`},selectAllText:{control:`text`}},args:{text:`3 items selected`,noBorder:!1,selectAllText:`Select All`}},G={},K={...a,render:()=>n`
    <forge-multi-select-header text="3 items selected">
      <forge-icon-button slot="actions" aria-label="Delete selected">
        <forge-icon name="delete"></forge-icon>
      </forge-icon-button>
    </forge-multi-select-header>
  `},q={...a,render:()=>n`<forge-multi-select-header text="5 rows selected for processing"></forge-multi-select-header>`},J={...a,render:()=>{let e=U(`forge-multi-select-header-select-all`);return n`
      <forge-multi-select-header text="3 items selected" @forge-multi-select-header-select-all=${e}>
        <span slot="select-all-button-text">Select All Items</span>
      </forge-multi-select-header>
    `}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-multi-select-header text="3 items selected">
      <forge-icon-button slot="actions" aria-label="Delete selected">
        <forge-icon name="delete"></forge-icon>
      </forge-icon-button>
    </forge-multi-select-header>
  \`
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`<forge-multi-select-header text="5 rows selected for processing"></forge-multi-select-header>\`
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    const handleSelectAll = action('forge-multi-select-header-select-all');
    return html\`
      <forge-multi-select-header text="3 items selected" @forge-multi-select-header-select-all=\${handleSelectAll}>
        <span slot="select-all-button-text">Select All Items</span>
      </forge-multi-select-header>
    \`;
  }
}`,...J.parameters?.docs?.source}}},Y=[`Demo`,`BasicImplementation`,`WithCustomText`,`WithSelectAllButton`]})))()}export{J as a,q as i,G as n,X as o,H as r,K as t};