import"./lit-element-BuSzPo2N.js";import{x as s}from"./lit-html-Ox1a2bD1.js";import{a as x}from"./index-B-lxVbXh.js";import{I as L,g as M}from"./icon-Bqgt-0wI.js";import"./feature-detection-CY6TVbRZ.js";import{B as w}from"./banner-BiV2PXva.js";import"./icon-button-BkG6pY8m.js";import"./focus-indicator-Cgfkaa3d.js";import"./index-CiLSBptl.js";import"./state-layer-BVsNuAhs.js";import"./button-CC-L5W3b.js";import{g as E,s as a,G as T,c as C}from"./utils-C9ubTmun.js";const m="forge-banner",I=x("forge-banner-dismissed"),V=x("forge-banner-before-dismiss"),z={title:"Components/Banner",render:i=>{const t=C("forge-banner",i);return t.addEventListener("forge-banner-dismissed",I),t.addEventListener("forge-banner-before-dismiss",V),t.innerHTML=i.text,t},component:m,argTypes:{...E({tagName:m,exclude:["canDismiss"],controls:{theme:{control:"select",options:[...T,"info-secondary"]}}})},args:{theme:w.defaults.THEME,text:"Minim sunt eu laborum labore minim.",dismissed:!1,persistent:!1}},e={},n={...a,render:()=>s`
      <div style="display: flex; gap: 12px; flex-direction: column;">
        <forge-banner theme="error">Error</forge-banner>
        <forge-banner theme="warning">Warning</forge-banner>
        <forge-banner theme="success">Success</forge-banner>
        <forge-banner theme="info">Info (default)</forge-banner>
        <forge-banner theme="info-secondary">Info (secondary)</forge-banner>
      </div>
    `},r={...a,render:()=>(L.define(M),s`
      <forge-banner>
        Minim sunt eu laborum labore minim iconium buttonium.
        <forge-icon slot="icon" name="notifications"></forge-icon>
        <forge-button slot="button" variant="outlined">Learn more...</forge-button>
      </forge-banner>
    `)},o={...a,render:()=>s`
      <div class="forge-banner">
        <svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99h-3.98zm8.87-4.19V11c0-3.25-2.25-5.97-5.29-6.69v-.72C13.59 2.71 12.88 2 12 2s-1.59.71-1.59 1.59v.72A6.873 6.873 0 005.12 11v5.82L3 18.94V20h18v-1.06l-2.12-2.12zM16 13.01h-3v3h-2v-3H8V11h3V8h2v3h3v2.01z" />
        </svg>
        <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
        <button type="button" class="forge-button forge-button--outlined">Learn more</button>
      </div>
    `};var c,d,f;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:"{}",...(f=(d=e.parameters)==null?void 0:d.docs)==null?void 0:f.source}}};var l,g,u;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
      <div style="display: flex; gap: 12px; flex-direction: column;">
        <forge-banner theme="error">Error</forge-banner>
        <forge-banner theme="warning">Warning</forge-banner>
        <forge-banner theme="success">Success</forge-banner>
        <forge-banner theme="info">Info (default)</forge-banner>
        <forge-banner theme="info-secondary">Info (secondary)</forge-banner>
      </div>
    \`;
  }
}`,...(u=(g=n.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var b,p,v;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    IconRegistry.define(tylIconNotifications);
    return html\`
      <forge-banner>
        Minim sunt eu laborum labore minim iconium buttonium.
        <forge-icon slot="icon" name="notifications"></forge-icon>
        <forge-button slot="button" variant="outlined">Learn more...</forge-button>
      </forge-banner>
    \`;
  }
}`,...(v=(p=r.parameters)==null?void 0:p.docs)==null?void 0:v.source}}};var h,y,S;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
      <div class="forge-banner">
        <svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99h-3.98zm8.87-4.19V11c0-3.25-2.25-5.97-5.29-6.69v-.72C13.59 2.71 12.88 2 12 2s-1.59.71-1.59 1.59v.72A6.873 6.873 0 005.12 11v5.82L3 18.94V20h18v-1.06l-2.12-2.12zM16 13.01h-3v3h-2v-3H8V11h3V8h2v3h3v2.01z" />
        </svg>
        <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
        <button type="button" class="forge-button forge-button--outlined">Learn more</button>
      </div>
    \`;
  }
}`,...(S=(y=o.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};const O=["Default","Themed","Combined","CSSOnly"],q=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:o,Combined:r,Default:e,Themed:n,__namedExportsOrder:O,default:z},Symbol.toStringTag,{value:"Module"}));export{q as B,r as C,e as D,n as T,o as a};
