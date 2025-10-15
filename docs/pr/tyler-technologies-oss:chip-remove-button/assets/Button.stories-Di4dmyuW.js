import{x as n}from"./iframe-7bgTGKC7.js";import{e as b}from"./class-map-Ccg7ypfC.js";import{g as p,s as v,G as h,c as y}from"./utils-DF51qB8z.js";import{I as g,h as S,d as $}from"./icon-kuXwuZAY.js";import"./service-adapter-CffG5Lhq.js";import"./button-DH3Lg7cK.js";import"./focus-indicator-CoRMRfCA.js";import"./state-layer-gAgMwMHF.js";import"./index-5CPwzmQS.js";import"./circular-progress-_RSm0FGC.js";const d="forge-button",I={title:"Components/Button",render:e=>{const t=y(d,e);return t.textContent=e.text,t},component:d,argTypes:{...p({tagName:d,exclude:["form","name","value"],controls:{variant:{control:{type:"select"},options:["text","outlined","tonal","filled","raised","link"]},theme:{control:{type:"select"},options:h}}}),text:{control:"text"}},args:{text:"Button",variant:"text",pill:!1,theme:"primary",type:"button",disabled:!1,popoverIcon:!1,dense:!1,fullWidth:!1}},r={},o={...v,render:()=>n`
      <forge-button>Text</forge-button>
      <forge-button variant="outlined">Outlined</forge-button>
      <forge-button variant="tonal">Tonal</forge-button>
      <forge-button variant="filled">Filled</forge-button>
      <forge-button variant="raised">Raised</forge-button>
      <forge-button variant="link">Link</forge-button>
    `},a={parameters:{controls:{include:["variant"]}},args:{variant:"raised"},render:({variant:e})=>(g.define(S),n`
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
    `},i={parameters:{controls:{include:["variant","iconSlot"]}},argTypes:{iconSlot:{options:["start","end"],control:{type:"select"}}},args:{variant:"raised",iconSlot:"start"},render:({variant:e,iconSlot:t})=>(g.define($),n`
      <forge-button .variant=${e}>
        <forge-icon slot=${t} name="forge_logo"></forge-icon>
        Button
      </forge-button>
    `)},l={parameters:{controls:{include:["variant","theme","disabled"]}},args:{variant:"raised"},render:({variant:e,theme:t,disabled:c})=>n`
      <forge-button .variant=${e} .theme=${t} ?disabled=${c}>
        Loading...
        <forge-circular-progress slot="end" aria-label="Loading something important"></forge-circular-progress>
      </forge-button>
    `},u={parameters:{controls:{include:["variant","dense","disabled","pill"]}},args:{variant:"text",pill:!1,dense:!1,disabled:!1},render:({variant:e,dense:t,pill:c,disabled:f})=>{const m=b({"forge-button":!0,"forge-button--outlined":e==="outlined","forge-button--tonal":e==="tonal","forge-button--filled":e==="filled","forge-button--raised":e==="raised","forge-button--link":e==="link","forge-button--dense":t,"forge-button--pill":c});return n`<button class=${m} ?disabled=${f}>Click me</button>`}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}};const T=["Demo","Variants","Anchor","Themed","WithIcon","WithCircularProgress","CSSOnly"],E=Object.freeze(Object.defineProperty({__proto__:null,Anchor:a,CSSOnly:u,Demo:r,Themed:s,Variants:o,WithCircularProgress:l,WithIcon:i,__namedExportsOrder:T,default:I},Symbol.toStringTag,{value:"Module"}));export{a as A,E as B,u as C,r as D,s as T,o as V,i as W,l as a};
