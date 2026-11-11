import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{D as r,v as i}from"./iframe-Bgb4QAnH.js";import{_ as a,m as o}from"./utils---Cxtfrg.js";import{M as s,N as c,j as l,t as u}from"./dist-19HqaCjJ.js";import{a as d,p as f,r as p}from"./async-directive-Beo_QdOI.js";import{n as m,t as h}from"./base-lit-element-DxEpJ0cU.js";import{o as g,t as _}from"./icon-BteVHPiC.js";import{Ht as v,R as y,V as b,nt as x,rt as S,t as C}from"./tyler-icons-D6M2os7k.js";import{p as w}from"./constants-DkDd_oHl.js";import{t as T}from"./decorate-2OK4V6AF.js";import{t as E}from"./icon-button-BIlBoWYT.js";import{t as D}from"./menu-Dm2AUrvn.js";import{n as O,t as k}from"./button-CDp9KJUO.js";import{t as A}from"./button-ag7q_HUf.js";import{n as j,r as M,t as N}from"./toolbar-BfOZ3VA-.js";import{n as P}from"./when-Daf2bbVy.js";var F;function I(){return(I=e((()=>{F=`:host{display:block}:host forge-toolbar{--forge-toolbar-background:var(--forge-theme-primary-container-low,#e8eaf6)}.start-container{align-items:center;gap:var(--forge-spacing-medium,16px);display:flex}.selected-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-body1-font-family,var(--forge-typography-font-family,"Roboto", sans-serif));font-size:var(--forge-typography-body1-font-size,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-body-font-size-scale,.875)));font-weight:var(--forge-typography-body1-font-weight,400);line-height:var(--forge-typography-body1-line-height,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-body-line-height-scale,1.125)));letter-spacing:var(--forge-typography-body1-letter-spacing,.0357143em);text-transform:var(--forge-typography-body1-text-transform,inherit);-webkit-text-decoration:var(--forge-typography-body1-text-decoration,inherit);text-decoration:var(--forge-typography-body1-text-decoration,inherit)}`})))()}var L,R;function z(){return(z=e((()=>{i(),p(),u(),m(),A(),N(),O(),M(),I(),L=`forge-multi-select-header`,R=class extends h{constructor(...e){super(...e),this.text=``,this.noBorder=!0,this.#e=n`<slot name="select-all-button-text"></slot>`}static{this[c]=L}static{this[s]=[k,j]}static{this.styles=r(F)}#e;get#t(){let e=this._slottedSelectAllNodes.length>0;return P(e,()=>n`<forge-button id="select-all-button" @click=${this.#r}>${this.#e}</forge-button>`,()=>n`${this.#e}`)}render(){return n`
      <forge-toolbar ?no-divider=${this.noBorder} @slotchange=${this.#n}>
        <div slot="start" class="start-container">
          <span class="selected-text">${this.text}</span>
          ${this.#t}
        </div>
        <slot name="actions" slot="end"></slot>
      </forge-toolbar>
    `}#n(e){let t=e.target.name;[`select-all-button-text`,`actions`].includes(t)&&this.requestUpdate()}#r(){let e=new CustomEvent(`forge-multi-select-header-select-all`,{bubbles:!0,composed:!0});this.dispatchEvent(e)}},T([f({type:String})],R.prototype,`text`,void 0),T([f({type:Boolean,attribute:`no-border`})],R.prototype,`noBorder`,void 0),T([d({slot:`select-all-button-text`,flatten:!0})],R.prototype,`_slottedSelectAllNodes`,void 0),l(L,R)})))()}function B(){return(B=e((()=>{w()})))()}function V(){return(V=e((()=>{u(),z(),B()})))()}var H=t({BasicImplementation:()=>K,Demo:()=>G,WithCustomText:()=>q,WithSelectAllButton:()=>J,__namedExportsOrder:()=>Y,default:()=>W}),U,W,G,K,q,J,Y;function X(){return(X=e((()=>{i(),_(),C(),o(),V(),E(),D(),{action:U}=__STORYBOOK_MODULE_ACTIONS__,g.define([y,b,x,S,v]),W={title:`Components/Multi Select Header`,component:`forge-multi-select-header`,render:e=>{let t=U(`forge-multi-select-header-select-all`);return n`
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