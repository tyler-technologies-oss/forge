import{x as b}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as y}from"./index-CWt9cj6R.js";import{I as h}from"./icon-CiIDkczu.js";import"./constants-BMnwgo1j.js";import{B as S}from"./banner-CdXc7_et.js";import"./icon-button-HggojrXv.js";import"./focus-indicator-WHVXAnYX.js";import"./index-Dh0vMUMR.js";import"./state-layer-CoXZFfb6.js";import"./button-CvtGTUrx.js";import{c as T,g as x,s as p,G as E}from"./utils-D8HxbzAZ.js";const a="forge-banner",I={title:"Components/Banner",render:o=>{const t=T("forge-banner",o);return t.innerHTML=o.text,t},component:a,parameters:{actions:{disable:!0}},argTypes:{...x({tagName:a,controls:{theme:{control:"select",options:[...E,"info-secondary"]}}})},args:{theme:S.defaults.THEME,text:"Minim sunt eu laborum labore minim."}},e={},r={...p,render:()=>b`
      <div style="display: flex; gap: 12px; flex-direction: column;">
        <forge-banner theme="error">Error</forge-banner>
        <forge-banner theme="warning">Warning</forge-banner>
        <forge-banner theme="success">Success</forge-banner>
        <forge-banner theme="info">Info (default)</forge-banner>
        <forge-banner theme="info-secondary">Info (secondary)</forge-banner>
      </div>
    `},n={...p,render:()=>(h.define(y),b`
      <forge-banner>
        Minim sunt eu laborum labore minim iconium buttonium.
        <forge-icon slot="icon" name="notifications"></forge-icon>
        <forge-button slot="button" variant="outlined">Learn more...</forge-button>
      </forge-banner>
    `)};var s,i,m;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:"{}",...(m=(i=e.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var c,f,u;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(u=(f=r.parameters)==null?void 0:f.docs)==null?void 0:u.source}}};var g,l,d;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(d=(l=n.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};const _=["Default","Themed","Combined"],j=Object.freeze(Object.defineProperty({__proto__:null,Combined:n,Default:e,Themed:r,__namedExportsOrder:_,default:I},Symbol.toStringTag,{value:"Module"}));export{j as B,n as C,e as D,r as T};
