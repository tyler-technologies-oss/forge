import{E as i,x as l}from"./iframe-CTlBxetq.js";import{g as v,s as h,D as u,G as y,a as c}from"./utils-CW5S_tZJ.js";import{o as d}from"./style-map-B468b6Ja.js";import{e as $}from"./class-map-CSW7lCGB.js";import{p as A,q as x,h as w}from"./tyler-icons-DSFxyJDy.js";import{I}from"./icon-8E01u_jy.js";import"./service-adapter-CffG5Lhq.js";import"./floating-action-button-K9ML0G-e.js";import"./focus-indicator-DqecK8AZ.js";import"./state-layer-BEEsPoZf.js";import"./index-5CPwzmQS.js";import"./button-DuzS7LRd.js";const m="forge-fab";I.define([A,x,w]);const S={title:"Components/Floating Action Button",render:e=>{const s=c(e),o=s?d(s):i;return l`
      <forge-fab
        .theme=${e.theme}
        .density=${e.density}
        .elevation=${e.elevation}
        .popoverIcon=${e.popoverIcon}
        .disabled=${e.disabled}
        .dense=${e.dense}
        style=${o}
        aria-label="Favorite">
        <forge-icon name="favorite"></forge-icon>
      </forge-fab>
    `},component:m,parameters:{actions:{disable:!0}},argTypes:{...v({tagName:m,exclude:["type","name","value","form"],controls:{theme:{control:"select",options:y},density:{control:"select",options:u},elevation:{control:"select",options:["raised","lowered"]}}})},args:{theme:"secondary",density:"medium",elevation:"raised",disabled:!1,popoverIcon:!1,dense:!1}},a={},r={render:e=>{const s=c(e),o=s?d(s):i;return l`
      <forge-fab
        .theme=${e.theme}
        .density=${e.density}
        .elevation=${e.elevation}
        .popoverIcon=${e.popoverIcon}
        .disabled=${e.disabled}
        .dense=${e.dense}
        style=${o}>
        <forge-icon name="add"></forge-icon>
        <span slot="label">Create</span>
      </forge-fab>
    `}},n={...h,render:e=>l`
      <forge-fab>
        <a href="javascript: void(0);" aria-label="FAB with anchor">
          <forge-icon name="open_in_new"></forge-icon>
        </a>
      </forge-fab>
    `},t={parameters:{controls:{include:/^--|density|extended|disabled|elevation/}},args:{extended:!1},render:({extended:e,density:s,disabled:o,elevation:p,...f})=>{const g=c(f),b=g?d(g):i;return l`<button class=${$({"forge-fab":!0,"forge-fab--extended":e,"forge-fab--small":s==="small","forge-fab--large":s==="large","forge-fab--flat":p==="lowered"})} style=${b} aria-label="Floating Action Button Demo" .disabled=${o}>
      <svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 10H6v-2h8v2zm4-4H6v-2h12v2z" />
      </svg>
      ${e?l`<span>Extended</span>`:i}
    </button>`}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    return html\`
      <forge-fab
        .theme=\${args.theme}
        .density=\${args.density}
        .elevation=\${args.elevation}
        .popoverIcon=\${args.popoverIcon}
        .disabled=\${args.disabled}
        .dense=\${args.dense}
        style=\${style}>
        <forge-icon name="add"></forge-icon>
        <span slot="label">Create</span>
      </forge-fab>
    \`;
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: args => {
    return html\`
      <forge-fab>
        <a href="javascript: void(0);" aria-label="FAB with anchor">
          <forge-icon name="open_in_new"></forge-icon>
        </a>
      </forge-fab>
    \`;
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: /^--|density|extended|disabled|elevation/
    }
  },
  args: {
    extended: false
  },
  render: ({
    extended,
    density,
    disabled,
    elevation,
    ...args
  }) => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const classes = {
      'forge-fab': true,
      'forge-fab--extended': extended,
      'forge-fab--small': density === 'small',
      'forge-fab--large': density === 'large',
      'forge-fab--flat': elevation === 'lowered'
    };
    return html\`<button class=\${classMap(classes)} style=\${style} aria-label="Floating Action Button Demo" .disabled=\${disabled}>
      <svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 10H6v-2h8v2zm4-4H6v-2h12v2z" />
      </svg>
      \${extended ? html\`<span>Extended</span>\` : nothing}
    </button>\`;
  }
}`,...t.parameters?.docs?.source}}};const V=["Demo","Extended","WithAnchor","CSSOnly"],j=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:t,Demo:a,Extended:r,WithAnchor:n,__namedExportsOrder:V,default:S},Symbol.toStringTag,{value:"Module"}));export{t as C,a as D,r as E,j as F,n as W};
