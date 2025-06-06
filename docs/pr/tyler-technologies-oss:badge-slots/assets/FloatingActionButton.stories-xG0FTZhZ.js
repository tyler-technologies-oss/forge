import"./lit-element-BuSzPo2N.js";import{E as i,x as l}from"./lit-html-Ox1a2bD1.js";import{g as E,s as O,D as C,G as z,b as c}from"./utils-C9ubTmun.js";import{o as d}from"./style-map-CeIg-cuG.js";import{e as B}from"./class-map-D3FxRsP9.js";import{I as F,p as H,q as M,h as D}from"./icon-Bqgt-0wI.js";import"./feature-detection-CY6TVbRZ.js";import"./floating-action-button-CJ2m4J0M.js";import"./focus-indicator-Cgfkaa3d.js";import"./index-CiLSBptl.js";import"./state-layer-BVsNuAhs.js";import"./button-CC-L5W3b.js";const m="forge-fab";F.define([H,M,D]);const T={title:"Components/Floating Action Button",render:e=>{const s=c(e),o=s?d(s):i;return l`
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
    `},component:m,parameters:{actions:{disable:!0}},argTypes:{...E({tagName:m,exclude:["type","name","value","form"],controls:{theme:{control:"select",options:z},density:{control:"select",options:C},elevation:{control:"select",options:["raised","lowered"]}}})},args:{theme:"secondary",density:"medium",elevation:"raised",disabled:!1,popoverIcon:!1,dense:!1}},a={},r={render:e=>{const s=c(e),o=s?d(s):i;return l`
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
    `}},n={...O,render:e=>l`
      <forge-fab>
        <a href="javascript: void(0);" aria-label="FAB with anchor">
          <forge-icon name="open_in_new"></forge-icon>
        </a>
      </forge-fab>
    `},t={parameters:{controls:{include:/^--|density|extended|disabled|elevation/}},args:{extended:!1},render:({extended:e,density:s,disabled:o,elevation:S,...V})=>{const g=c(V),_=g?d(g):i;return l`<button class=${B({"forge-fab":!0,"forge-fab--extended":e,"forge-fab--small":s==="small","forge-fab--large":s==="large","forge-fab--flat":S==="lowered"})} style=${_} aria-label="Floating Action Button Demo" .disabled=${o}>
      <svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 10H6v-2h8v2zm4-4H6v-2h12v2z" />
      </svg>
      ${e?l`<span>Extended</span>`:i}
    </button>`}};var p,f,b;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:"{}",...(b=(f=a.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var v,h,u;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(u=(h=r.parameters)==null?void 0:h.docs)==null?void 0:u.source}}};var y,$,A;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(A=($=n.parameters)==null?void 0:$.docs)==null?void 0:A.source}}};var x,w,I;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(I=(w=t.parameters)==null?void 0:w.docs)==null?void 0:I.source}}};const N=["Demo","Extended","WithAnchor","CSSOnly"],X=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:t,Demo:a,Extended:r,WithAnchor:n,__namedExportsOrder:N,default:T},Symbol.toStringTag,{value:"Module"}));export{t as C,a as D,r as E,X as F,n as W};
