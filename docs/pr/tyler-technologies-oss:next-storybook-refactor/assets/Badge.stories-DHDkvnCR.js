import{x as n}from"./lit-element-Dm2J4qPi.js";import{c as x,g as T,s as t,I as P,t as v,G as E}from"./icon-CwdXRdNp.js";import"./badge-ChZZJuMm.js";import"./icon-button-BheCV1x3.js";import"./base-button-adapter-DYnMb4TW.js";const g="forge-badge",_={title:"Components/Badge",render:s=>{const d=x(g,s);return d.innerHTML=s.text,d},component:g,parameters:{actions:{disable:!0}},argTypes:{...T({tagName:g,controls:{theme:{control:"select",options:["default",...E,"info-primary","info-secondary"]}}})},args:{text:"Status"}},e={},r={...t,render:()=>n`
    <div style="display: flex; gap: 8px;">
      <forge-badge theme="default">default</forge-badge>
      <forge-badge theme="primary">Primary</forge-badge>
      <forge-badge theme="secondary">Secondary</forge-badge>
      <forge-badge theme="tertiary">Tertiary</forge-badge>
      <forge-badge theme="success">Success</forge-badge>
      <forge-badge theme="error">Error</forge-badge>
      <forge-badge theme="warning">Warning</forge-badge>
      <forge-badge theme="info">Info</forge-badge>
      <forge-badge theme="info-secondary">Info (secondary)</forge-badge>
    </div>
    `},o={...t,args:{strong:!0},render:()=>n`
    <div style="display: flex; gap: 8px;">
      <forge-badge strong theme="default">default</forge-badge>
      <forge-badge strong theme="primary">Primary</forge-badge>
      <forge-badge strong theme="secondary">Secondary</forge-badge>
      <forge-badge strong theme="tertiary">Tertiary</forge-badge>
      <forge-badge strong theme="success">Success</forge-badge>
      <forge-badge strong theme="error">Error</forge-badge>
      <forge-badge strong theme="warning">Warning</forge-badge>
      <forge-badge strong theme="info">Info</forge-badge>
      <forge-badge strong theme="info-secondary">Info (secondary)</forge-badge>
    </div>
    `},a={...t,render:()=>(P.define(v),n`
    <forge-icon-button>
      <forge-icon name="notifications" style="position: absolute;"></forge-icon>
      <forge-badge slot="badge">1</forge-badge>
    </forge-icon-button>
    `)};var f,i,c;e.parameters={...e.parameters,docs:{...(f=e.parameters)==null?void 0:f.docs,source:{originalSource:"{}",...(c=(i=e.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};var m,b,y;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
    <div style="display: flex; gap: 8px;">
      <forge-badge theme="default">default</forge-badge>
      <forge-badge theme="primary">Primary</forge-badge>
      <forge-badge theme="secondary">Secondary</forge-badge>
      <forge-badge theme="tertiary">Tertiary</forge-badge>
      <forge-badge theme="success">Success</forge-badge>
      <forge-badge theme="error">Error</forge-badge>
      <forge-badge theme="warning">Warning</forge-badge>
      <forge-badge theme="info">Info</forge-badge>
      <forge-badge theme="info-secondary">Info (secondary)</forge-badge>
    </div>
    \`;
  }
}`,...(y=(b=r.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var l,u,p;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    strong: true
  },
  render: () => {
    return html\`
    <div style="display: flex; gap: 8px;">
      <forge-badge strong theme="default">default</forge-badge>
      <forge-badge strong theme="primary">Primary</forge-badge>
      <forge-badge strong theme="secondary">Secondary</forge-badge>
      <forge-badge strong theme="tertiary">Tertiary</forge-badge>
      <forge-badge strong theme="success">Success</forge-badge>
      <forge-badge strong theme="error">Error</forge-badge>
      <forge-badge strong theme="warning">Warning</forge-badge>
      <forge-badge strong theme="info">Info</forge-badge>
      <forge-badge strong theme="info-secondary">Info (secondary)</forge-badge>
    </div>
    \`;
  }
}`,...(p=(u=o.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var h,S,I;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    IconRegistry.define(tylIconNotifications);
    return html\`
    <forge-icon-button>
      <forge-icon name="notifications" style="position: absolute;"></forge-icon>
      <forge-badge slot="badge">1</forge-badge>
    </forge-icon-button>
    \`;
  }
}`,...(I=(S=a.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};const W=["Demo","Themed","Strong","WithIconButton"],L=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,Strong:o,Themed:r,WithIconButton:a,__namedExportsOrder:W,default:_},Symbol.toStringTag,{value:"Module"}));export{L as B,e as D,o as S,r as T,a as W};
