import{x as r,E as m}from"./iframe-yXOA0_SQ.js";import{g as _,s as c,G as $,c as C,a as D}from"./utils-BuPomTDA.js";import{I as B,f as N,g as R}from"./icon-B8CdcxqJ.js";import{e as L}from"./class-map-CX5H7D91.js";import{o as j}from"./style-map-MNapIyZ7.js";import"./feature-detection-uS6p5jc8.js";import"./badge-Hg5-wnuZ.js";import"./icon-button-DkluvO-9.js";import"./focus-indicator-IWpzSXYP.js";import"./index-CiLSBptl.js";import"./state-layer-BFwsAUDA.js";const f="forge-badge",F={title:"Components/Badge",render:d=>{const e=C(f,d);return e.innerHTML=d.text,e},component:f,parameters:{actions:{disable:!0}},argTypes:{..._({tagName:f,controls:{theme:{control:"select",options:["default",...$,"info-primary","info-secondary"]}}})},args:{text:"Status",dot:!1,theme:"default",strong:!1,hide:!1}},o={},a={...c,render:()=>r`
      <div style="display: flex; gap: 8px;">
        <forge-badge theme="default">Default</forge-badge>
        <forge-badge theme="primary">Primary</forge-badge>
        <forge-badge theme="secondary">Secondary</forge-badge>
        <forge-badge theme="tertiary">Tertiary</forge-badge>
        <forge-badge theme="success">Success</forge-badge>
        <forge-badge theme="error">Error</forge-badge>
        <forge-badge theme="warning">Warning</forge-badge>
        <forge-badge theme="info">Info</forge-badge>
        <forge-badge theme="info-secondary">Info (secondary)</forge-badge>
      </div>
    `},t={...c,args:{strong:!0},render:()=>r`
      <div style="display: flex; gap: 8px;">
        <forge-badge strong theme="default">Default</forge-badge>
        <forge-badge strong theme="primary">Primary</forge-badge>
        <forge-badge strong theme="secondary">Secondary</forge-badge>
        <forge-badge strong theme="tertiary">Tertiary</forge-badge>
        <forge-badge strong theme="success">Success</forge-badge>
        <forge-badge strong theme="error">Error</forge-badge>
        <forge-badge strong theme="warning">Warning</forge-badge>
        <forge-badge strong theme="info">Info</forge-badge>
        <forge-badge strong theme="info-secondary">Info (secondary)</forge-badge>
      </div>
    `},n={...c,render:()=>(B.define(N),r`
      <forge-badge>
        <forge-icon name="alert" slot="start"></forge-icon>
        <span>Warning</span>
      </forge-badge>
    `)},g={...c,render:()=>(B.define(R),r`
      <forge-icon-button>
        <forge-icon name="notifications"></forge-icon>
        <forge-badge slot="badge">1</forge-badge>
      </forge-icon-button>
    `)},s={parameters:{controls:{exclude:["hide","strong"]}},args:{dot:!1,showIcon:!1},render:({text:d,dot:e,showIcon:H,...O})=>{const i=D(O),V=i?j(i):m;return r`
      <div class=${L({"forge-badge":!0,"forge-badge--dot":e})} style=${V}>
        ${H&&!e?r`<svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Forge design system logo</title>
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z" />
            </svg>`:""}
        ${e?m:d}
      </div>
    `}};var l,b,p;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:"{}",...(p=(b=o.parameters)==null?void 0:b.docs)==null?void 0:p.source}}};var h,y,u;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
      <div style="display: flex; gap: 8px;">
        <forge-badge theme="default">Default</forge-badge>
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
}`,...(u=(y=a.parameters)==null?void 0:y.docs)==null?void 0:u.source}}};var S,I,v;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    strong: true
  },
  render: () => {
    return html\`
      <div style="display: flex; gap: 8px;">
        <forge-badge strong theme="default">Default</forge-badge>
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
}`,...(v=(I=t.parameters)==null?void 0:I.docs)==null?void 0:v.source}}};var x,w,T;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    IconRegistry.define(tylIconAlert);
    return html\`
      <forge-badge>
        <forge-icon name="alert" slot="start"></forge-icon>
        <span>Warning</span>
      </forge-badge>
    \`;
  }
}`,...(T=(w=n.parameters)==null?void 0:w.docs)==null?void 0:T.source}}};var P,W,A;g.parameters={...g.parameters,docs:{...(P=g.parameters)==null?void 0:P.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    IconRegistry.define(tylIconNotifications);
    return html\`
      <forge-icon-button>
        <forge-icon name="notifications"></forge-icon>
        <forge-badge slot="badge">1</forge-badge>
      </forge-icon-button>
    \`;
  }
}`,...(A=(W=g.parameters)==null?void 0:W.docs)==null?void 0:A.source}}};var E,z,M;s.parameters={...s.parameters,docs:{...(E=s.parameters)==null?void 0:E.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: ['hide', 'strong']
    }
  },
  args: {
    dot: false,
    showIcon: false
  },
  render: ({
    text,
    dot,
    showIcon,
    ...args
  }) => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const classes = {
      'forge-badge': true,
      'forge-badge--dot': dot
    };
    return html\`
      <div class=\${classMap(classes)} style=\${style}>
        \${showIcon && !dot ? html\`<svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Forge design system logo</title>
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z" />
            </svg>\` : ''}
        \${dot ? nothing : text}
      </div>
    \`;
  }
}`,...(M=(z=s.parameters)==null?void 0:z.docs)==null?void 0:M.source}}};const G=["Demo","Themed","Strong","WithIcon","WithIconButton","CSSOnly"],ae=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:s,Demo:o,Strong:t,Themed:a,WithIcon:n,WithIconButton:g,__namedExportsOrder:G,default:F},Symbol.toStringTag,{value:"Module"}));export{ae as B,s as C,o as D,t as S,a as T,n as W,g as a};
