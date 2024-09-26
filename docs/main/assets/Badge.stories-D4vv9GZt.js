import"./lit-element-Dk2-kgKT.js";import{k as g,D as i}from"./lit-html-DZH-Jm0H.js";import{c as B,g as H,s as c,b as O,G as V}from"./utils-Dj42C_k3.js";import{a as _}from"./index-ByifSpfC.js";import{I as $}from"./icon-DHpZ4R73.js";import{R as C}from"./class-map-D93gIiBE.js";import{s as W}from"./style-map-DxfbqtuX.js";import"./constants-DjE6emXm.js";import"./badge-CO5a_--I.js";import"./icon-button-XdSjYqUR.js";import"./focus-indicator-_fDu4ZqT.js";import"./index-Dh0vMUMR.js";import"./state-layer-DTKAXCUq.js";const d="forge-badge",R={title:"Components/Badge",render:n=>{const e=B(d,n);return e.innerHTML=n.text,e},component:d,parameters:{actions:{disable:!0}},argTypes:{...H({tagName:d,controls:{theme:{control:"select",options:["default",...V,"info-primary","info-secondary"]}}})},args:{text:"Status"}},r={},o={...c,render:()=>g`
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
    `},a={...c,args:{strong:!0},render:()=>g`
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
    `},t={...c,render:()=>($.define(_),g`
      <forge-icon-button>
        <forge-icon name="notifications" style="position: absolute;"></forge-icon>
        <forge-badge slot="badge">1</forge-badge>
      </forge-icon-button>
    `)},s={parameters:{controls:{exclude:["hide","strong"]}},args:{dot:!1,showIcon:!1},render:({text:n,dot:e,showIcon:E,...M})=>{const f=O(M),A=f?W(f):i;return g`
      <div class=${C({"forge-badge":!0,"forge-badge--dot":e})} style=${A}>
        ${E&&!e?g`<svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Forge design system logo</title>
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z" />
            </svg>`:""}
        ${e?i:n}
      </div>
    `}};var m,l,b;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(b=(l=r.parameters)==null?void 0:l.docs)==null?void 0:b.source}}};var p,y,h;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(h=(y=o.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var u,S,v;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
        <forge-icon name="notifications" style="position: absolute;"></forge-icon>
        <forge-badge slot="badge">1</forge-badge>
      </forge-icon-button>
    \`;
  }
}`,...(w=(I=t.parameters)==null?void 0:I.docs)==null?void 0:w.source}}};var T,P,z;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(z=(P=s.parameters)==null?void 0:P.docs)==null?void 0:z.source}}};const D=["Demo","Themed","Strong","WithIconButton","CSSOnly"],ee=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:s,Demo:r,Strong:a,Themed:o,WithIconButton:t,__namedExportsOrder:D,default:R},Symbol.toStringTag,{value:"Module"}));export{ee as B,s as C,r as D,a as S,o as T,t as W};
