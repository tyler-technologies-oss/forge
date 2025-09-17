import{x as n}from"./iframe-C5EPRJGw.js";import{e as R}from"./class-map-sM9kDHFr.js";import{g as j,s as F,G as N,c as D}from"./utils-C_Nqz1Py.js";import{I as B,h as M,d as V}from"./icon-B8CdcxqJ.js";import"./feature-detection-uS6p5jc8.js";import"./button-DEhPRUdY.js";import"./focus-indicator-BeibAi2h.js";import"./index-CiLSBptl.js";import"./state-layer-C7sW6v-0.js";import"./circular-progress-xrl2HF46.js";const d="forge-button",G={title:"Components/Button",render:e=>{const t=D(d,e);return t.textContent=e.text,t},component:d,argTypes:{...j({tagName:d,exclude:["form","name","value"],controls:{variant:{control:{type:"select"},options:["text","outlined","tonal","filled","raised","link"]},theme:{control:{type:"select"},options:N}}}),text:{control:"text"}},args:{text:"Button",variant:"text",pill:!1,theme:"primary",type:"button",disabled:!1,popoverIcon:!1,dense:!1,fullWidth:!1}},r={},o={...F,render:()=>n`
      <forge-button>Text</forge-button>
      <forge-button variant="outlined">Outlined</forge-button>
      <forge-button variant="tonal">Tonal</forge-button>
      <forge-button variant="filled">Filled</forge-button>
      <forge-button variant="raised">Raised</forge-button>
      <forge-button variant="link">Link</forge-button>
    `},a={parameters:{controls:{include:["variant"]}},args:{variant:"raised"},render:({variant:e})=>(B.define(M),n`
      <forge-button .variant=${e}>
        <a href="javascript: void(0);">
          Anchor button
          <forge-icon slot="end" name="open_in_new"></forge-icon>
        </a>
      </forge-button>
    `)},s={parameters:{controls:{include:["variant"]}},args:{variant:"raised"},render:({variant:e})=>n`
      <forge-button variant=${e}>Primary</forge-button>
      <forge-button variant=${e} theme="secondary">Secondary</forge-button>
      <forge-button variant=${e} theme="tertiary">Tertiary</forge-button>
      <forge-button variant=${e} theme="success">Success</forge-button>
      <forge-button variant=${e} theme="warning">Warning</forge-button>
      <forge-button variant=${e} theme="error">Error</forge-button>
      <forge-button variant=${e} theme="info">Info</forge-button>
    `},i={parameters:{controls:{include:["variant","iconSlot"]}},argTypes:{iconSlot:{options:["start","end"],control:{type:"select"}}},args:{variant:"raised",iconSlot:"start"},render:({variant:e,iconSlot:t})=>(B.define(V),n`
      <forge-button .variant=${e}>
        <forge-icon slot=${t} name="forge_logo"></forge-icon>
        Button
      </forge-button>
    `)},l={parameters:{controls:{include:["variant","theme","disabled"]}},args:{variant:"raised"},render:({variant:e,theme:t,disabled:c})=>n`
      <forge-button .variant=${e} .theme=${t} ?disabled=${c}>
        Loading...
        <forge-circular-progress slot="end" aria-label="Loading something important"></forge-circular-progress>
      </forge-button>
    `},u={parameters:{controls:{include:["variant","dense","disabled","pill"]}},args:{variant:"text",pill:!1,dense:!1,disabled:!1},render:({variant:e,dense:t,pill:c,disabled:E})=>{const w=R({"forge-button":!0,"forge-button--outlined":e==="outlined","forge-button--tonal":e==="tonal","forge-button--filled":e==="filled","forge-button--raised":e==="raised","forge-button--link":e==="link","forge-button--dense":t,"forge-button--pill":c});return n`<button class=${w} ?disabled=${E}>Click me</button>`}};var g,f,m;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:"{}",...(m=(f=r.parameters)==null?void 0:f.docs)==null?void 0:m.source}}};var b,p,v;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(T=(I=s.parameters)==null?void 0:I.docs)==null?void 0:T.source}}};var x,_,O;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(O=(_=i.parameters)==null?void 0:_.docs)==null?void 0:O.source}}};var k,C,L;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(L=(C=l.parameters)==null?void 0:C.docs)==null?void 0:L.source}}};var P,W,A;u.parameters={...u.parameters,docs:{...(P=u.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(A=(W=u.parameters)==null?void 0:W.docs)==null?void 0:A.source}}};const z=["Demo","Variants","Anchor","Themed","WithIcon","WithCircularProgress","CSSOnly"],te=Object.freeze(Object.defineProperty({__proto__:null,Anchor:a,CSSOnly:u,Demo:r,Themed:s,Variants:o,WithCircularProgress:l,WithIcon:i,__namedExportsOrder:z,default:G},Symbol.toStringTag,{value:"Module"}));export{a as A,te as B,u as C,r as D,s as T,o as V,i as W,l as a};
