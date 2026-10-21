import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-CuAvrKn_.js";import{_ as a,l as o,m as s,n as c,o as l,s as u}from"./utils-Cppiha4b.js";import{t as d}from"./class-map-DEew1OiS.js";import{t as f}from"./class-map-8zp5OV2u.js";import{o as p,t as m}from"./icon-DzM2_TPc.js";import{Pt as h,o as g,t as _}from"./tyler-icons-CLXzO0Q_.js";import{t as v}from"./icon-button-Dibkr9Dk.js";import{n as y}from"./badge-DaBY4PGe.js";import{r as b,t as x}from"./style-map-C_WKUe4Y.js";var S=t({CSSOnly:()=>A,Demo:()=>T,Strong:()=>D,Themed:()=>E,WithIcon:()=>O,WithIconButton:()=>k,__namedExportsOrder:()=>j,default:()=>w}),C,w,T,E,D,O,k,A,j;function M(){return(M=e((()=>{i(),s(),_(),m(),f(),x(),y(),v(),C=`forge-badge`,w={title:`Components/Badge`,render:e=>{let t=l(C,e);return t.innerHTML=e.text,t},component:C,parameters:{actions:{disable:!0}},argTypes:{...u({tagName:C,controls:{theme:{control:`select`,options:[`default`,...c,`info-primary`,`info-secondary`]}}})},args:{text:`Status`,dot:!1,theme:`default`,strong:!1,hide:!1}},T={},E={...a,render:()=>n`
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
  `},D={...a,args:{strong:!0},render:()=>n`
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
  `},O={...a,render:()=>(p.define(g),n`
      <forge-badge>
        <forge-icon name="alert" slot="start"></forge-icon>
        <span>Warning</span>
      </forge-badge>
    `)},k={...a,render:()=>(p.define(h),n`
      <forge-icon-button>
        <forge-icon name="notifications"></forge-icon>
        <forge-badge slot="badge">1</forge-badge>
      </forge-icon-button>
    `)},A={parameters:{controls:{exclude:[`hide`,`strong`]}},args:{dot:!1,showIcon:!1},render:({text:e,dot:t,showIcon:i,...a})=>{let s=o(a),c=s?b(s):r;return n`
      <div class=${d({"forge-badge":!0,"forge-badge--dot":t})} style=${c}>
        ${i&&!t?n`<svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Forge design system logo</title>
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z" />
            </svg>`:``}
        ${t?r:e}
      </div>
    `}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
}`,...A.parameters?.docs?.source}}},j=[`Demo`,`Themed`,`Strong`,`WithIcon`,`WithIconButton`,`CSSOnly`]})))()}export{E as a,M as c,D as i,A as n,O as o,T as r,k as s,S as t};