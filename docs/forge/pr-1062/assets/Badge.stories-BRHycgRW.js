import{A as m,b as r}from"./iframe-t5tnxelm.js";import{s as c,b as y,g as u,c as S,G as I}from"./utils-Jq8-zXrZ.js";import{I as l,f as v,g as x}from"./tyler-icons-B0WPf66k.js";import{e as w}from"./class-map-BC9WsRkP.js";import{o as T}from"./style-map-CUgDiOmq.js";import"./service-adapter-CffG5Lhq.js";import"./badge-BRk-mS7K.js";import"./icon-button-DtIeUSSM.js";import"./focus-indicator-Be5X-pqJ.js";import"./state-layer-u9rLNX9t.js";import"./index-DTwfV0k0.js";const f="forge-badge",A={title:"Components/Badge",render:d=>{const e=S(f,d);return e.innerHTML=d.text,e},component:f,parameters:{actions:{disable:!0}},argTypes:{...u({tagName:f,controls:{theme:{control:"select",options:["default",...I,"info-primary","info-secondary"]}}})},args:{text:"Status",dot:!1,theme:"default",strong:!1,hide:!1}},o={},a={...c,render:()=>r`
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
  `},g={...c,render:()=>(l.define(v),r`
      <forge-badge>
        <forge-icon name="alert" slot="start"></forge-icon>
        <span>Warning</span>
      </forge-badge>
    `)},n={...c,render:()=>(l.define(x),r`
      <forge-icon-button>
        <forge-icon name="notifications"></forge-icon>
        <forge-badge slot="badge">1</forge-badge>
      </forge-icon-button>
    `)},s={parameters:{controls:{exclude:["hide","strong"]}},args:{dot:!1,showIcon:!1},render:({text:d,dot:e,showIcon:b,...p})=>{const i=y(p),h=i?T(i):m;return r`
      <div class=${w({"forge-badge":!0,"forge-badge--dot":e})} style=${h}>
        ${b&&!e?r`<svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Forge design system logo</title>
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z" />
            </svg>`:""}
        ${e?m:d}
      </div>
    `}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
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
  \`
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    strong: true
  },
  render: () => html\`
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
  \`
}`,...t.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};const P=["Demo","Themed","Strong","WithIcon","WithIconButton","CSSOnly"],N=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:s,Demo:o,Strong:t,Themed:a,WithIcon:g,WithIconButton:n,__namedExportsOrder:P,default:A},Symbol.toStringTag,{value:"Module"}));export{N as B,s as C,o as D,t as S,a as T,g as W,n as a};
