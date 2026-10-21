import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{p as r}from"./iframe-CebKObJP.js";import{_ as i,m as a,n as o,o as s,s as c}from"./utils-C3ow8Ikc.js";import{t as l}from"./class-map-DEew1OiS.js";import{t as u}from"./class-map-8zp5OV2u.js";import{o as d,t as f}from"./icon-DTQwimRS.js";import{Ft as p,Q as m,t as h}from"./tyler-icons-CLXzO0Q_.js";import{t as g}from"./button-DoiHRyaz.js";import{t as _}from"./circular-progress-CdbiX3fs.js";var v=t({Anchor:()=>C,CSSOnly:()=>D,Demo:()=>x,Themed:()=>w,Variants:()=>S,WithCircularProgress:()=>E,WithIcon:()=>T,__namedExportsOrder:()=>O,default:()=>b}),y,b,x,S,C,w,T,E,D,O;function k(){return(k=e((()=>{r(),u(),a(),h(),f(),g(),_(),y=`forge-button`,b={title:`Components/Button`,render:e=>{let t=s(y,e);return t.textContent=e.text,t},component:y,argTypes:{...c({tagName:y,exclude:[`name`,`value`],controls:{variant:{control:{type:`select`},options:[`text`,`outlined`,`tonal`,`filled`,`raised`,`link`]},theme:{control:{type:`select`},options:o}}}),text:{control:`text`}},args:{text:`Button`,variant:`text`,pill:!1,theme:`primary`,type:`button`,disabled:!1,popoverIcon:!1,dense:!1,fullWidth:!1}},x={},S={...i,render:()=>n`
    <forge-button>Text</forge-button>
    <forge-button variant="outlined">Outlined</forge-button>
    <forge-button variant="tonal">Tonal</forge-button>
    <forge-button variant="filled">Filled</forge-button>
    <forge-button variant="raised">Raised</forge-button>
    <forge-button variant="link">Link</forge-button>
  `},C={parameters:{controls:{include:[`variant`]}},args:{variant:`raised`},render:({variant:e})=>(d.define(p),n`
      <forge-button .variant=${e}>
        <a href="javascript: void(0);">
          Anchor button
          <forge-icon slot="end" name="open_in_new"></forge-icon>
        </a>
      </forge-button>
    `)},w={parameters:{controls:{include:[`variant`]}},args:{variant:`raised`},render:({variant:e})=>n`
    <forge-button variant=${e}>Primary</forge-button>
    <forge-button variant=${e} theme="secondary">Secondary</forge-button>
    <forge-button variant=${e} theme="tertiary">Tertiary</forge-button>
    <forge-button variant=${e} theme="success">Success</forge-button>
    <forge-button variant=${e} theme="warning">Warning</forge-button>
    <forge-button variant=${e} theme="error">Error</forge-button>
    <forge-button variant=${e} theme="info">Info</forge-button>
  `},T={parameters:{controls:{include:[`variant`,`iconSlot`]}},argTypes:{iconSlot:{options:[`start`,`end`],control:{type:`select`}}},args:{variant:`raised`,iconSlot:`start`},render:({variant:e,iconSlot:t})=>(d.define(m),n`
      <forge-button .variant=${e}>
        <forge-icon slot=${t} name="forge_logo"></forge-icon>
        Button
      </forge-button>
    `)},E={parameters:{controls:{include:[`variant`,`theme`,`disabled`]}},args:{variant:`raised`},render:({variant:e,theme:t,disabled:r})=>n`
    <forge-button .variant=${e} .theme=${t} ?disabled=${r}>
      Loading...
      <forge-circular-progress slot="end" aria-label="Loading something important"></forge-circular-progress>
    </forge-button>
  `},D={parameters:{controls:{include:[`variant`,`dense`,`disabled`,`pill`]}},args:{variant:`text`,pill:!1,dense:!1,disabled:!1},render:({variant:e,dense:t,pill:r,disabled:i})=>{let a=l({"forge-button":!0,"forge-button--outlined":e===`outlined`,"forge-button--tonal":e===`tonal`,"forge-button--filled":e===`filled`,"forge-button--raised":e===`raised`,"forge-button--link":e===`link`,"forge-button--dense":t,"forge-button--pill":r});return n`<button class=${a} ?disabled=${i}>Click me</button>`}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-button>Text</forge-button>
    <forge-button variant="outlined">Outlined</forge-button>
    <forge-button variant="tonal">Tonal</forge-button>
    <forge-button variant="filled">Filled</forge-button>
    <forge-button variant="raised">Raised</forge-button>
    <forge-button variant="link">Link</forge-button>
  \`
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
  }) => html\`
    <forge-button variant=\${variant}>Primary</forge-button>
    <forge-button variant=\${variant} theme="secondary">Secondary</forge-button>
    <forge-button variant=\${variant} theme="tertiary">Tertiary</forge-button>
    <forge-button variant=\${variant} theme="success">Success</forge-button>
    <forge-button variant=\${variant} theme="warning">Warning</forge-button>
    <forge-button variant=\${variant} theme="error">Error</forge-button>
    <forge-button variant=\${variant} theme="info">Info</forge-button>
  \`
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
  }) => html\`
    <forge-button .variant=\${variant} .theme=\${theme} ?disabled=\${disabled}>
      Loading...
      <forge-circular-progress slot="end" aria-label="Loading something important"></forge-circular-progress>
    </forge-button>
  \`
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}},O=[`Demo`,`Variants`,`Anchor`,`Themed`,`WithIcon`,`WithCircularProgress`,`CSSOnly`]})))()}export{w as a,T as c,x as i,k as l,v as n,S as o,D as r,E as s,C as t};