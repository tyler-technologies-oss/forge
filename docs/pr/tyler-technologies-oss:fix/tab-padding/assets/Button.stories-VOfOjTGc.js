import{x as u}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{c as A,g as B,s as E,G as w}from"./utils-BJOK626P.js";import{t as R}from"./index-fxMNKkgx.js";import{I as P}from"./icon-DjINFoyU.js";import{b as k}from"./index-CIZ3m0iD.js";import"./constants-DjE6emXm.js";import"./button-BZEZMHKM.js";import"./focus-indicator-BPFZRBe9.js";import"./index-Dh0vMUMR.js";import"./state-layer-D8bHAvjj.js";import"./circular-progress-Dp-fjhiT.js";const c="forge-button",C={title:"Components/Button",render:t=>{const r=A(c,t);return r.textContent=t.text,r},component:c,argTypes:{...B({tagName:c,exclude:["form","name","value"],controls:{variant:{control:{type:"select"},options:["text","outlined","tonal","filled","raised","link"]},theme:{control:{type:"select"},options:w}}}),text:{control:"text"}},args:{text:"Button",variant:"text",pill:!1,theme:"primary",type:"button",disabled:!1,popoverIcon:!1,dense:!1,fullWidth:!1}},n={},e={...E,render:()=>u`
      <forge-button>Text</forge-button>
      <forge-button variant="outlined">Outlined</forge-button>
      <forge-button variant="tonal">Tonal</forge-button>
      <forge-button variant="filled">Filled</forge-button>
      <forge-button variant="raised">Raised</forge-button>
      <forge-button variant="link">Link</forge-button>
    `},o={parameters:{controls:{include:["variant"]}},args:{variant:"raised"},render:({variant:t})=>(P.define(k),u`
      <forge-button .variant=${t}>
        <a href="javascript: void(0);">
          Anchor button
          <forge-icon slot="end" name="open_in_new"></forge-icon>
        </a>
      </forge-button>
    `)},a={parameters:{controls:{include:["variant"]}},args:{variant:"raised"},render:({variant:t})=>u`
      <forge-button variant=${t}>Primary</forge-button>
      <forge-button variant=${t} theme="secondary">Secondary</forge-button>
      <forge-button variant=${t} theme="tertiary">Tertiary</forge-button>
      <forge-button variant=${t} theme="success">Success</forge-button>
      <forge-button variant=${t} theme="warning">Warning</forge-button>
      <forge-button variant=${t} theme="error">Error</forge-button>
      <forge-button variant=${t} theme="info">Info</forge-button>
    `},i={parameters:{controls:{include:["variant","iconSlot"]}},argTypes:{iconSlot:{options:["start","end"],control:{type:"select"}}},args:{variant:"raised",iconSlot:"start"},render:({variant:t,iconSlot:r})=>(P.define(R),u`
      <forge-button .variant=${t}>
        <forge-icon slot=${r} name="forge_logo"></forge-icon>
        Button
      </forge-button>
    `)},s={parameters:{controls:{include:["variant","theme","disabled"]}},args:{variant:"raised"},render:({variant:t,theme:r,disabled:W})=>u`
      <forge-button .variant=${t} .theme=${r} ?disabled=${W}>
        Loading...
        <forge-circular-progress slot="end" aria-label="Loading something important"></forge-circular-progress>
      </forge-button>
    `};var g,l,d;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:"{}",...(d=(l=n.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var f,m,b;e.parameters={...e.parameters,docs:{...(f=e.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(b=(m=e.parameters)==null?void 0:m.docs)==null?void 0:b.source}}};var p,v,h;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(h=(v=o.parameters)==null?void 0:v.docs)==null?void 0:h.source}}};var y,$,S;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(S=($=a.parameters)==null?void 0:$.docs)==null?void 0:S.source}}};var I,T,_;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
}`,...(_=(T=i.parameters)==null?void 0:T.docs)==null?void 0:_.source}}};var x,L,O;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(O=(L=s.parameters)==null?void 0:L.docs)==null?void 0:O.source}}};const j=["Demo","Variants","Anchor","Themed","WithIcon","WithCircularProgress"],U=Object.freeze(Object.defineProperty({__proto__:null,Anchor:o,Demo:n,Themed:a,Variants:e,WithCircularProgress:s,WithIcon:i,__namedExportsOrder:j,default:C},Symbol.toStringTag,{value:"Module"}));export{o as A,U as B,n as D,a as T,e as V,i as W,s as a};
