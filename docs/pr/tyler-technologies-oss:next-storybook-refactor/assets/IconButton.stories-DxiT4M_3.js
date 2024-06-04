import{x as f}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as G}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{c as W,g as M,s as B,G as q}from"./utils-9x9J8UB7.js";import{t as N}from"./index-fxMNKkgx.js";import{I as z}from"./icon-V4IE3JYq.js";import{f as j,i as D,h as F,a as R,j as V}from"./index-Dh2cEqRr.js";import"./icon-button-CrlUtV4j.js";import"./focus-indicator-DB3Uau5R.js";import"./index-Dh0vMUMR.js";import"./state-layer-7Eqbkxx0.js";import"./circular-progress-DUGq3cnW.js";import"./badge-COHMqm-e.js";import"./label-rCd_TJHf.js";import"./button-BNIBqQee.js";import"./button-toggle-group-CnP-ho8N.js";import"./checkbox-Bmwif0Ou.js";import"./switch-jYFmeTKz.js";const m="forge-icon-button";z.define([N,j,D,F,R,V]);const H=G("click"),J={title:"Components/Icon Button",render:e=>{const o=W(m,e);if(o.addEventListener("click",H),e.toggle){o.setAttribute("aria-label","Toggle icon button demo");const n=document.createElement("forge-icon");n.name=j.name,n.slot="on",o.appendChild(n);const r=document.createElement("forge-icon");r.name=D.name,o.appendChild(r)}else{o.setAttribute("aria-label","Icon button demo");const n=document.createElement("forge-icon");n.name=N.name,o.appendChild(n)}return o},component:m,argTypes:{...M({tagName:m,exclude:["form","name","value","type"],controls:{variant:{control:{type:"select"},options:["icon","outlined","filled","raised"]},theme:{control:{type:"select"},options:q},shape:{control:{type:"select"},options:["circular","squared"]},density:{control:{type:"select"},options:["small","medium","large"]}}})},args:{variant:"icon",theme:"primary",disabled:!1,dense:!1,toggle:!1,on:!1,shape:"circular",density:"large",popoverIcon:!1}},t={},a={...B,render:()=>f`
      <forge-icon-button aria-label="Default icon button">
        <forge-icon name="favorite"></forge-icon>
      </forge-icon-button>

      <forge-icon-button variant="outlined" aria-label="Outlined icon button">
        <forge-icon name="favorite"></forge-icon>
      </forge-icon-button>

      <forge-icon-button variant="filled" aria-label="Filled icon button">
        <forge-icon name="favorite"></forge-icon>
      </forge-icon-button>

      <forge-icon-button variant="raised" aria-label="Raised icon button">
        <forge-icon name="favorite"></forge-icon>
      </forge-icon-button>
    `},i={parameters:{controls:{include:["variant"]}},render:({variant:e})=>f`
      <forge-icon-button .variant=${e}>
        <a href="javascript: alert('Icon button with anchor works!');" aria-label="Anchor link icon button">
          <forge-icon .name=${F.name}></forge-icon>
        </a>
      </forge-icon-button>
    `},c={parameters:{controls:{include:["variant"]}},render:({variant:e})=>f`
      <forge-icon-button variant=${e}>
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
      <forge-icon-button variant=${e} theme="secondary">
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
      <forge-icon-button variant=${e} theme="tertiary">
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
      <forge-icon-button variant=${e} theme="success">
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
      <forge-icon-button variant=${e} theme="warning">
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
      <forge-icon-button variant=${e} theme="error">
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
      <forge-icon-button variant=${e} theme="info">
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
    `},s={parameters:{controls:{exclude:["toggle","on","popoverIcon"]}},render:e=>{const o=W(m,e);o.setAttribute("aria-label","Icon button with badge");const n=document.createElement("forge-icon");n.name=R.name,o.appendChild(n);const r=document.createElement("forge-badge");return r.textContent="3",r.slot="badge",o.appendChild(r),o}},l={parameters:{controls:{include:["variant","theme","disabled"]}},render:({variant:e,theme:o,disabled:n})=>f`
      <forge-icon-button .variant=${e} .theme=${o} ?disabled=${n} aria-label="Loading">
        <forge-circular-progress aria-label="Progress label"></forge-circular-progress>
      </forge-icon-button>
    `},g={...B,render:()=>f`
      <forge-label style="display: flex; flex-direction: column; width: min-content; align-items: center;">
        <forge-icon-button>
          <forge-icon name=${V.name}></forge-icon>
        </forge-icon-button>
        <span>Settings</span>
      </forge-label>
    `};var u,d,b;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:"{}",...(b=(d=t.parameters)==null?void 0:d.docs)==null?void 0:b.source}}};var p,h,v;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
      <forge-icon-button aria-label="Default icon button">
        <forge-icon name="favorite"></forge-icon>
      </forge-icon-button>

      <forge-icon-button variant="outlined" aria-label="Outlined icon button">
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
}`,...(I=($=i.parameters)==null?void 0:$.docs)==null?void 0:I.source}}};var _,S,E;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['variant']
    }
  },
  render: ({
    variant
  }) => {
    return html\`
      <forge-icon-button variant=\${variant}>
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
      <forge-icon-button variant=\${variant} theme="secondary">
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
      <forge-icon-button variant=\${variant} theme="tertiary">
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
      <forge-icon-button variant=\${variant} theme="success">
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
      <forge-icon-button variant=\${variant} theme="warning">
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
      <forge-icon-button variant=\${variant} theme="error">
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
      <forge-icon-button variant=\${variant} theme="info">
        <forge-icon name="forge_logo"></forge-icon>
      </forge-icon-button>
    \`;
  }
}`,...(E=(S=c.parameters)==null?void 0:S.docs)==null?void 0:E.source}}};var C,w,x;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(x=(w=s.parameters)==null?void 0:w.docs)==null?void 0:x.source}}};var A,O,P;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...(P=(O=l.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};var T,L,k;g.parameters={...g.parameters,docs:{...(T=g.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(k=(L=g.parameters)==null?void 0:L.docs)==null?void 0:k.source}}};const K=["Demo","Variants","Anchor","Themed","WithBadge","WithCircularProgress","WithLabel"],ue=Object.freeze(Object.defineProperty({__proto__:null,Anchor:i,Demo:t,Themed:c,Variants:a,WithBadge:s,WithCircularProgress:l,WithLabel:g,__namedExportsOrder:K,default:J},Symbol.toStringTag,{value:"Module"}));export{i as A,t as D,ue as I,c as T,a as V,s as W,l as a,g as b};
