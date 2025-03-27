import"./lit-element-B3QVTycr.js";import{x as s,E as i}from"./lit-html-CuBe1DX_.js";import{g as B,s as c,G as H,c as O,b as V}from"./utils-BEyWTXMe.js";import{e as _}from"./index-RsKXMDm2.js";import{I as $}from"./icon-DNSPAaK0.js";import{e as C}from"./class-map-CuXcqkpw.js";import{o as W}from"./style-map-CeP1Mntv.js";import"./feature-detection-C61kIZu7.js";import"./badge-DmYwJsoi.js";import"./icon-button-BgvK8Gih.js";import"./focus-indicator-B_9E-jM6.js";import"./index-CiLSBptl.js";import"./state-layer-DA2sYK0k.js";const d="forge-badge",N={title:"Components/Badge",render:n=>{const e=O(d,n);return e.innerHTML=n.text,e},component:d,parameters:{actions:{disable:!0}},argTypes:{...B({tagName:d,controls:{theme:{control:"select",options:["default",...H,"info-primary","info-secondary"]}}})},args:{text:"Status"}},r={},o={...c,render:()=>s`
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
    `},a={...c,args:{strong:!0},render:()=>s`
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
    `},t={...c,render:()=>($.define(_),s`
      <forge-icon-button>
        <forge-icon name="notifications"></forge-icon>
        <forge-badge slot="badge">1</forge-badge>
      </forge-icon-button>
    `)},g={parameters:{controls:{exclude:["hide","strong"]}},args:{dot:!1,showIcon:!1},render:({text:n,dot:e,showIcon:z,...M})=>{const f=V(M),A=f?W(f):i;return s`
      <div class=${C({"forge-badge":!0,"forge-badge--dot":e})} style=${A}>
        ${z&&!e?s`<svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Forge design system logo</title>
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z" />
            </svg>`:""}
        ${e?i:n}
      </div>
    `}};var m,l,b;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(b=(l=r.parameters)==null?void 0:l.docs)==null?void 0:b.source}}};var p,h,y;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(y=(h=o.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var u,S,v;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(v=(S=a.parameters)==null?void 0:S.docs)==null?void 0:v.source}}};var x,I,w;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(w=(I=t.parameters)==null?void 0:I.docs)==null?void 0:w.source}}};var T,E,P;g.parameters={...g.parameters,docs:{...(T=g.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(P=(E=g.parameters)==null?void 0:E.docs)==null?void 0:P.source}}};const D=["Demo","Themed","Strong","WithIconButton","CSSOnly"],ee=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:g,Demo:r,Strong:a,Themed:o,WithIconButton:t,__namedExportsOrder:D,default:N},Symbol.toStringTag,{value:"Module"}));export{ee as B,g as C,r as D,a as S,o as T,t as W};
