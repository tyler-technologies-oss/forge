import{x as b}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as p}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{a as h}from"./index-CIZ3m0iD.js";import{I as S}from"./icon-DjINFoyU.js";import"./constants-DjE6emXm.js";import{B as x}from"./banner-BxjuV6pk.js";import"./icon-button-B2LQlK1e.js";import"./focus-indicator-BPFZRBe9.js";import"./index-Dh0vMUMR.js";import"./state-layer-D8bHAvjj.js";import"./button-BZEZMHKM.js";import{c as E,g as T,s as y,G as I}from"./utils-BeGdvWla.js";const a="forge-banner",v=p("forge-banner-dismissed"),_=p("forge-banner-before-dismiss"),N={title:"Components/Banner",render:t=>{const o=E("forge-banner",t);return o.addEventListener("forge-banner-dismissed",v),o.addEventListener("forge-banner-before-dismiss",_),o.innerHTML=t.text,o},component:a,argTypes:{...T({tagName:a,exclude:["canDismiss"],controls:{theme:{control:"select",options:[...I,"info-secondary"]}}})},args:{theme:x.defaults.THEME,text:"Minim sunt eu laborum labore minim.",dismissed:!1,persistent:!1}},e={},n={...y,render:()=>b`
      <div style="display: flex; gap: 12px; flex-direction: column;">
        <forge-banner theme="error">Error</forge-banner>
        <forge-banner theme="warning">Warning</forge-banner>
        <forge-banner theme="success">Success</forge-banner>
        <forge-banner theme="info">Info (default)</forge-banner>
        <forge-banner theme="info-secondary">Info (secondary)</forge-banner>
      </div>
    `},r={...y,render:()=>(S.define(h),b`
      <forge-banner>
        Minim sunt eu laborum labore minim iconium buttonium.
        <forge-icon slot="icon" name="notifications"></forge-icon>
        <forge-button slot="button" variant="outlined">Learn more...</forge-button>
      </forge-banner>
    `)};var s,i,m;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:"{}",...(m=(i=e.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var f,c,d;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(d=(c=n.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var g,u,l;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(l=(u=r.parameters)==null?void 0:u.docs)==null?void 0:l.source}}};const L=["Default","Themed","Combined"],z=Object.freeze(Object.defineProperty({__proto__:null,Combined:r,Default:e,Themed:n,__namedExportsOrder:L,default:N},Symbol.toStringTag,{value:"Module"}));export{z as B,r as C,e as D,n as T};
