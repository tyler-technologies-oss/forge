import"./lit-element-Dk2-kgKT.js";import{k as n}from"./lit-html-DZH-Jm0H.js";import{R as w}from"./class-map-D93gIiBE.js";import{c as j,g as F,s as N,G as D}from"./utils-DY7h9u6A.js";import{t as M}from"./index-fxMNKkgx.js";import{I as A}from"./icon-DHpZ4R73.js";import{b as V}from"./index-ByifSpfC.js";import"./constants-DjE6emXm.js";import"./button-C5f1g9CL.js";import"./focus-indicator-_fDu4ZqT.js";import"./index-Dh0vMUMR.js";import"./state-layer-DTKAXCUq.js";import"./circular-progress-lUr9lcmF.js";const d="forge-button",G={title:"Components/Button",render:t=>{const e=j(d,t);return e.textContent=t.text,e},component:d,argTypes:{...F({tagName:d,exclude:["form","name","value"],controls:{variant:{control:{type:"select"},options:["text","outlined","tonal","filled","raised","link"]},theme:{control:{type:"select"},options:D}}}),text:{control:"text"}},args:{text:"Button",variant:"text",pill:!1,theme:"primary",type:"button",disabled:!1,popoverIcon:!1,dense:!1,fullWidth:!1}},r={},o={...N,render:()=>n`
      <forge-button>Text</forge-button>
      <forge-button variant="outlined">Outlined</forge-button>
      <forge-button variant="tonal">Tonal</forge-button>
      <forge-button variant="filled">Filled</forge-button>
      <forge-button variant="raised">Raised</forge-button>
      <forge-button variant="link">Link</forge-button>
    `},a={parameters:{controls:{include:["variant"]}},args:{variant:"raised"},render:({variant:t})=>(A.define(V),n`
      <forge-button .variant=${t}>
        <a href="javascript: void(0);">
          Anchor button
          <forge-icon slot="end" name="open_in_new"></forge-icon>
        </a>
      </forge-button>
    `)},s={parameters:{controls:{include:["variant"]}},args:{variant:"raised"},render:({variant:t})=>n`
      <forge-button variant=${t}>Primary</forge-button>
      <forge-button variant=${t} theme="secondary">Secondary</forge-button>
      <forge-button variant=${t} theme="tertiary">Tertiary</forge-button>
      <forge-button variant=${t} theme="success">Success</forge-button>
      <forge-button variant=${t} theme="warning">Warning</forge-button>
      <forge-button variant=${t} theme="error">Error</forge-button>
      <forge-button variant=${t} theme="info">Info</forge-button>
    `},i={parameters:{controls:{include:["variant","iconSlot"]}},argTypes:{iconSlot:{options:["start","end"],control:{type:"select"}}},args:{variant:"raised",iconSlot:"start"},render:({variant:t,iconSlot:e})=>(A.define(M),n`
      <forge-button .variant=${t}>
        <forge-icon slot=${e} name="forge_logo"></forge-icon>
        Button
      </forge-button>
    `)},l={parameters:{controls:{include:["variant","theme","disabled"]}},args:{variant:"raised"},render:({variant:t,theme:e,disabled:c})=>n`
      <forge-button .variant=${t} .theme=${e} ?disabled=${c}>
        Loading...
        <forge-circular-progress slot="end" aria-label="Loading something important"></forge-circular-progress>
      </forge-button>
    `},u={parameters:{controls:{include:["variant","dense","disabled","pill"]}},args:{variant:"text",pill:!1,dense:!1,disabled:!1},render:({variant:t,dense:e,pill:c,disabled:B})=>{const E=w({"forge-button":!0,"forge-button--outlined":t==="outlined","forge-button--tonal":t==="tonal","forge-button--filled":t==="filled","forge-button--raised":t==="raised","forge-button--link":t==="link","forge-button--dense":e,"forge-button--pill":c});return n`<button class=${E} ?disabled=${B}>Click me</button>`}};var g,f,m;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:"{}",...(m=(f=r.parameters)==null?void 0:f.docs)==null?void 0:m.source}}};var b,p,v;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
      <forge-button>Text</forge-button>
      <forge-button variant="outlined">Outlined</forge-button>
      <forge-button variant="tonal">Tonal</forge-button>
      <forge-button variant="filled">Filled</forge-button>
      <forge-button variant="raised">Raised</forge-button>
      <forge-button variant="link">Link</forge-button>
    \`;
  }
}`,...(v=(p=o.parameters)==null?void 0:p.docs)==null?void 0:v.source}}};var h,y,S;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['variant']
    }
  },
  args: {
    variant: 'raised'
  },
  render: ({
    variant
  }) => {
    IconRegistry.define(tylIconOpenInNew);
    return html\`
      <forge-button .variant=\${variant}>
        <a href="javascript: void(0);">
          Anchor button
          <forge-icon slot="end" name="open_in_new"></forge-icon>
        </a>
      </forge-button>
    \`;
  }
}`,...(S=(y=a.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var $,I,T;s.parameters={...s.parameters,docs:{...($=s.parameters)==null?void 0:$.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['variant']
    }
  },
  args: {
    variant: 'raised'
  },
  render: ({
    variant
  }) => {
    return html\`
      <forge-button variant=\${variant}>Primary</forge-button>
      <forge-button variant=\${variant} theme="secondary">Secondary</forge-button>
      <forge-button variant=\${variant} theme="tertiary">Tertiary</forge-button>
      <forge-button variant=\${variant} theme="success">Success</forge-button>
      <forge-button variant=\${variant} theme="warning">Warning</forge-button>
      <forge-button variant=\${variant} theme="error">Error</forge-button>
      <forge-button variant=\${variant} theme="info">Info</forge-button>
    \`;
  }
}`,...(T=(I=s.parameters)==null?void 0:I.docs)==null?void 0:T.source}}};var x,_,k;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['variant', 'iconSlot']
    }
  },
  argTypes: {
    iconSlot: {
      options: ['start', 'end'],
      control: {
        type: 'select'
      }
    }
  },
  args: {
    variant: 'raised',
    iconSlot: 'start'
  },
  render: ({
    variant,
    iconSlot
  }) => {
    IconRegistry.define(tylIconForgeLogo);
    return html\`
      <forge-button .variant=\${variant}>
        <forge-icon slot=\${iconSlot} name="forge_logo"></forge-icon>
        Button
      </forge-button>
    \`;
  }
}`,...(k=(_=i.parameters)==null?void 0:_.docs)==null?void 0:k.source}}};var O,C,L;l.parameters={...l.parameters,docs:{...(O=l.parameters)==null?void 0:O.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['variant', 'theme', 'disabled']
    }
  },
  args: {
    variant: 'raised'
  },
  render: ({
    variant,
    theme,
    disabled
  }) => {
    return html\`
      <forge-button .variant=\${variant} .theme=\${theme} ?disabled=\${disabled}>
        Loading...
        <forge-circular-progress slot="end" aria-label="Loading something important"></forge-circular-progress>
      </forge-button>
    \`;
  }
}`,...(L=(C=l.parameters)==null?void 0:C.docs)==null?void 0:L.source}}};var P,R,W;u.parameters={...u.parameters,docs:{...(P=u.parameters)==null?void 0:P.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['variant', 'dense', 'disabled', 'pill']
    }
  },
  args: {
    variant: 'text',
    pill: false,
    dense: false,
    disabled: false
  },
  render: ({
    variant,
    dense,
    pill,
    disabled
  }) => {
    const classes = classMap({
      'forge-button': true,
      'forge-button--outlined': variant === 'outlined',
      'forge-button--tonal': variant === 'tonal',
      'forge-button--filled': variant === 'filled',
      'forge-button--raised': variant === 'raised',
      'forge-button--link': variant === 'link',
      'forge-button--dense': dense,
      'forge-button--pill': pill
    });
    return html\`<button class=\${classes} ?disabled=\${disabled}>Click me</button>\`;
  }
}`,...(W=(R=u.parameters)==null?void 0:R.docs)==null?void 0:W.source}}};const z=["Demo","Variants","Anchor","Themed","WithIcon","WithCircularProgress","CSSOnly"],ot=Object.freeze(Object.defineProperty({__proto__:null,Anchor:a,CSSOnly:u,Demo:r,Themed:s,Variants:o,WithCircularProgress:l,WithIcon:i,__namedExportsOrder:z,default:G},Symbol.toStringTag,{value:"Module"}));export{a as A,ot as B,u as C,r as D,s as T,o as V,i as W,l as a};
