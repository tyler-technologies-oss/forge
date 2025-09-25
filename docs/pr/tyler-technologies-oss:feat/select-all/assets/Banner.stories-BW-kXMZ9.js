import{x as s}from"./iframe-TounFTVn.js";import{I as d,g as f}from"./icon-kuXwuZAY.js";import"./service-adapter-CffG5Lhq.js";import{B as l}from"./banner-0-z_2jL3.js";import"./icon-button-CysI0CPp.js";import"./focus-indicator-Bg6HJ9xm.js";import"./state-layer-gAgMwMHF.js";import"./index-5CPwzmQS.js";import"./button-D0qBXGrU.js";import{g,s as a,G as u,c as b}from"./utils-D4P_Rfvb.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,m="forge-banner",p=c("forge-banner-dismissed"),v=c("forge-banner-before-dismiss"),h={title:"Components/Banner",render:i=>{const t=b("forge-banner",i);return t.addEventListener("forge-banner-dismissed",p),t.addEventListener("forge-banner-before-dismiss",v),t.innerHTML=i.text,t},component:m,argTypes:{...g({tagName:m,exclude:["canDismiss"],controls:{theme:{control:"select",options:[...u,"info-secondary"]}}})},args:{theme:l.defaults.THEME,text:"Minim sunt eu laborum labore minim.",dismissed:!1,persistent:!1}},e={},n={...a,render:()=>s`
      <div style="display: flex; gap: 12px; flex-direction: column;">
        <forge-banner theme="error">Error</forge-banner>
        <forge-banner theme="warning">Warning</forge-banner>
        <forge-banner theme="success">Success</forge-banner>
        <forge-banner theme="info">Info (default)</forge-banner>
        <forge-banner theme="info-secondary">Info (secondary)</forge-banner>
      </div>
    `},r={...a,render:()=>(d.define(f),s`
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
    `};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const y=["Default","Themed","Combined","CSSOnly"],I=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:o,Combined:r,Default:e,Themed:n,__namedExportsOrder:y,default:h},Symbol.toStringTag,{value:"Module"}));export{I as B,r as C,e as D,n as T,o as a};
