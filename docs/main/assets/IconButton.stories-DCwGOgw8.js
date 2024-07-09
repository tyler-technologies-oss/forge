import{x as f}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as G}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{c as k,g as M,s as D,G as q}from"./utils-CpZ1flO4.js";import{t as B}from"./index-fxMNKkgx.js";import{I as z}from"./icon-DjINFoyU.js";import{j as N,l as j,b as F,a as R,m as V}from"./index-CIZ3m0iD.js";import"./constants-DjE6emXm.js";import"./icon-button-B2LQlK1e.js";import"./focus-indicator-BPFZRBe9.js";import"./index-Dh0vMUMR.js";import"./state-layer-D8bHAvjj.js";import"./circular-progress-Dp-fjhiT.js";import"./badge-TZPsSqfc.js";import"./label-u49DyhbP.js";import"./button-BZEZMHKM.js";import"./button-toggle-group-CVRZEG3N.js";import"./checkbox-an-Xb1xB.js";import"./switch-CiP8pWu1.js";const m="forge-icon-button";z.define([B,N,j,F,R,V]);const H=G("click"),J={title:"Components/Icon Button",render:o=>{const e=k(m,o);if(e.addEventListener("click",H),o.toggle){e.setAttribute("aria-label","Toggle icon button demo");const n=document.createElement("forge-icon");n.name=N.name,n.slot="on",e.appendChild(n);const r=document.createElement("forge-icon");r.name=j.name,e.appendChild(r)}else{e.setAttribute("aria-label","Icon button demo");const n=document.createElement("forge-icon");n.name=B.name,e.appendChild(n)}return e},component:m,argTypes:{...M({tagName:m,exclude:["form","name","value","type"],controls:{variant:{control:{type:"select"},options:["icon","outlined","tonal","filled","raised"]},theme:{control:{type:"select"},options:q},shape:{control:{type:"select"},options:["circular","squared"]},density:{control:{type:"select"},options:["small","medium","large"]}}})},args:{variant:"icon",theme:"default",disabled:!1,dense:!1,toggle:!1,on:!1,shape:"circular",density:"large",popoverIcon:!1}},t={},a={...D,render:()=>f`
      <forge-icon-button aria-label="Default icon button">
        <forge-icon name="favorite"></forge-icon>
      </forge-icon-button>

      <forge-icon-button variant="outlined" aria-label="Outlined icon button">
        <forge-icon name="favorite"></forge-icon>
      </forge-icon-button>

      <forge-icon-button variant="tonal" aria-label="Tonal icon button">
        <forge-icon name="favorite"></forge-icon>
      </forge-icon-button>

      <forge-icon-button variant="filled" aria-label="Filled icon button">
        <forge-icon name="favorite"></forge-icon>
      </forge-icon-button>

      <forge-icon-button variant="raised" aria-label="Raised icon button">
        <forge-icon name="favorite"></forge-icon>
      </forge-icon-button>
    `},i={parameters:{controls:{include:["variant"]}},render:({variant:o})=>f`
      <forge-icon-button .variant=${o}>
        <a href="javascript: alert('Icon button with anchor works!');" aria-label="Anchor link icon button">
          <forge-icon .name=${F.name}></forge-icon>
        </a>
      </forge-icon-button>
    `},c={parameters:{controls:{include:["variant"]}},render:({variant:o})=>f`
      <forge-icon-button variant=${o} aria-label="Default theme icon button">
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
      <forge-icon-button variant=${o} theme="primary" aria-label="Primary theme icon button">
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
      <forge-icon-button variant=${o} theme="secondary" aria-label="Secondary theme icon button">
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
      <forge-icon-button variant=${o} theme="tertiary" aria-label="Tertiary theme icon button">
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
      <forge-icon-button variant=${o} theme="success" aria-label="Success theme icon button">
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
      <forge-icon-button variant=${o} theme="warning" aria-label="Warning theme icon button">
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
      <forge-icon-button variant=${o} theme="error" aria-label="Error theme icon button">
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
      <forge-icon-button variant=${o} theme="info" aria-label="Info theme icon button">
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
    `},l={parameters:{controls:{exclude:["toggle","on","popoverIcon"]}},render:o=>{const e=k(m,o);e.setAttribute("aria-label","Icon button with badge");const n=document.createElement("forge-icon");n.name=R.name,e.appendChild(n);const r=document.createElement("forge-badge");return r.textContent="3",r.slot="badge",e.appendChild(r),e}},g={parameters:{controls:{include:["variant","theme","disabled"]}},render:({variant:o,theme:e,disabled:n})=>f`
      <forge-icon-button .variant=${o} .theme=${e} ?disabled=${n} aria-label="Loading">
        <forge-circular-progress aria-label="Progress label"></forge-circular-progress>
      </forge-icon-button>
    `},s={...D,render:()=>f`
      <forge-label style="display: flex; flex-direction: column; width: min-content; align-items: center;">
        <forge-icon-button>
          <forge-icon name=${V.name}></forge-icon>
        </forge-icon-button>
        <span>Settings</span>
      </forge-label>
    `};var u,b,d;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:"{}",...(d=(b=t.parameters)==null?void 0:b.docs)==null?void 0:d.source}}};var p,h,v;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
      <forge-icon-button aria-label="Default icon button">
        <forge-icon name="favorite"></forge-icon>
      </forge-icon-button>

      <forge-icon-button variant="outlined" aria-label="Outlined icon button">
        <forge-icon name="favorite"></forge-icon>
      </forge-icon-button>

      <forge-icon-button variant="tonal" aria-label="Tonal icon button">
        <forge-icon name="favorite"></forge-icon>
      </forge-icon-button>

      <forge-icon-button variant="filled" aria-label="Filled icon button">
        <forge-icon name="favorite"></forge-icon>
      </forge-icon-button>

      <forge-icon-button variant="raised" aria-label="Raised icon button">
        <forge-icon name="favorite"></forge-icon>
      </forge-icon-button>
    \`;
  }
}`,...(v=(h=a.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var y,$,I;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['variant']
    }
  },
  render: ({
    variant
  }) => {
    return html\`
      <forge-icon-button .variant=\${variant}>
        <a href="javascript: alert('Icon button with anchor works!');" aria-label="Anchor link icon button">
          <forge-icon .name=\${tylIconOpenInNew.name}></forge-icon>
        </a>
      </forge-icon-button>
    \`;
  }
}`,...(I=($=i.parameters)==null?void 0:$.docs)==null?void 0:I.source}}};var S,_,E;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['variant']
    }
  },
  render: ({
    variant
  }) => {
    return html\`
      <forge-icon-button variant=\${variant} aria-label="Default theme icon button">
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
      <forge-icon-button variant=\${variant} theme="primary" aria-label="Primary theme icon button">
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
      <forge-icon-button variant=\${variant} theme="secondary" aria-label="Secondary theme icon button">
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
      <forge-icon-button variant=\${variant} theme="tertiary" aria-label="Tertiary theme icon button">
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
      <forge-icon-button variant=\${variant} theme="success" aria-label="Success theme icon button">
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
      <forge-icon-button variant=\${variant} theme="warning" aria-label="Warning theme icon button">
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
      <forge-icon-button variant=\${variant} theme="error" aria-label="Error theme icon button">
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
      <forge-icon-button variant=\${variant} theme="info" aria-label="Info theme icon button">
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
    \`;
  }
}`,...(E=(_=c.parameters)==null?void 0:_.docs)==null?void 0:E.source}}};var C,T,w;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: ['toggle', 'on', 'popoverIcon']
    }
  },
  render: args => {
    const el = customElementStoryRenderer(component, args);
    el.setAttribute('aria-label', 'Icon button with badge');
    const icon = document.createElement('forge-icon');
    icon.name = tylIconNotifications.name;
    el.appendChild(icon);
    const badge = document.createElement('forge-badge');
    badge.textContent = '3';
    badge.slot = 'badge';
    el.appendChild(badge);
    return el;
  }
}`,...(w=(T=l.parameters)==null?void 0:T.docs)==null?void 0:w.source}}};var x,A,P;g.parameters={...g.parameters,docs:{...(x=g.parameters)==null?void 0:x.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['variant', 'theme', 'disabled']
    }
  },
  render: ({
    variant,
    theme,
    disabled
  }) => {
    return html\`
      <forge-icon-button .variant=\${variant} .theme=\${theme} ?disabled=\${disabled} aria-label="Loading">
        <forge-circular-progress aria-label="Progress label"></forge-circular-progress>
      </forge-icon-button>
    \`;
  }
}`,...(P=(A=g.parameters)==null?void 0:A.docs)==null?void 0:P.source}}};var O,W,L;s.parameters={...s.parameters,docs:{...(O=s.parameters)==null?void 0:O.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
      <forge-label style="display: flex; flex-direction: column; width: min-content; align-items: center;">
        <forge-icon-button>
          <forge-icon name=\${tylIconSettings.name}></forge-icon>
        </forge-icon-button>
        <span>Settings</span>
      </forge-label>
    \`;
  }
}`,...(L=(W=s.parameters)==null?void 0:W.docs)==null?void 0:L.source}}};const K=["Demo","Variants","Anchor","Themed","WithBadge","WithCircularProgress","WithLabel"],bo=Object.freeze(Object.defineProperty({__proto__:null,Anchor:i,Demo:t,Themed:c,Variants:a,WithBadge:l,WithCircularProgress:g,WithLabel:s,__namedExportsOrder:K,default:J},Symbol.toStringTag,{value:"Module"}));export{i as A,t as D,bo as I,c as T,a as V,l as W,g as a,s as b};
