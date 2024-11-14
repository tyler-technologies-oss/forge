import"./lit-element-Dk2-kgKT.js";import{k as r}from"./lit-html-DZH-Jm0H.js";import{a as G}from"./chunk-454WOBUV-CM0pFb8Z.js";import{c as R,g as J,s as N,G as K}from"./utils-BE6XR6X1.js";import{t as j}from"./index-fxMNKkgx.js";import{I as Q}from"./icon-DHpZ4R73.js";import{j as q,l as z,b as F,a as H,m as V}from"./index-ByifSpfC.js";import{R as U}from"./class-map-D93gIiBE.js";import"./constants-DjE6emXm.js";import"./icon-button-Bwf4zXUE.js";import"./focus-indicator-_fDu4ZqT.js";import"./index-Dh0vMUMR.js";import"./state-layer-DTKAXCUq.js";import"./circular-progress-BUABMyQV.js";import"./badge-CO5a_--I.js";import"./label-C3K2Uabu.js";import"./button-CbYZUGFb.js";import"./button-toggle-group-BJ7gYCrU.js";import"./checkbox-DohAEIBZ.js";import"./switch-BL3gYf9s.js";const m="forge-icon-button";Q.define([j,q,z,F,H,V]);const X=G("click"),Y={title:"Components/Icon Button",render:o=>{const e=R(m,o);if(e.addEventListener("click",X),o.toggle){e.setAttribute("aria-label","Toggle icon button demo");const n=document.createElement("forge-icon");n.name=q.name,n.slot="on",e.appendChild(n);const t=document.createElement("forge-icon");t.name=z.name,e.appendChild(t)}else{e.setAttribute("aria-label","Icon button demo");const n=document.createElement("forge-icon");n.name=j.name,e.appendChild(n)}return e},component:m,argTypes:{...J({tagName:m,exclude:["form","name","value","type"],controls:{variant:{control:{type:"select"},options:["icon","outlined","tonal","filled","raised"]},theme:{control:{type:"select"},options:K},shape:{control:{type:"select"},options:["circular","squared"]},density:{control:{type:"select"},options:["small","medium","large"]}}})},args:{variant:"icon",theme:"default",disabled:!1,dense:!1,toggle:!1,on:!1,shape:"circular",density:"large",popoverIcon:!1}},a={},i={...N,render:()=>r`
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
    `},c={parameters:{controls:{include:["variant"]}},render:({variant:o})=>r`
      <forge-icon-button .variant=${o}>
        <a href="javascript: alert('Icon button with anchor works!');" aria-label="Anchor link icon button">
          <forge-icon .name=${F.name}></forge-icon>
        </a>
      </forge-icon-button>
    `},l={parameters:{controls:{include:["variant"]}},render:({variant:o})=>r`
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
    `},s={parameters:{controls:{exclude:["toggle","on","popoverIcon"]}},render:o=>{const e=R(m,o);e.setAttribute("aria-label","Icon button with badge");const n=document.createElement("forge-icon");n.name=H.name,e.appendChild(n);const t=document.createElement("forge-badge");return t.textContent="3",t.slot="badge",e.appendChild(t),e}},g={parameters:{controls:{include:["variant","theme","disabled"]}},render:({variant:o,theme:e,disabled:n})=>r`
      <forge-icon-button .variant=${o} .theme=${e} ?disabled=${n} aria-label="Loading">
        <forge-circular-progress aria-label="Progress label"></forge-circular-progress>
      </forge-icon-button>
    `},u={...N,render:()=>r`
      <forge-label style="display: flex; flex-direction: column; width: min-content; align-items: center;">
        <forge-icon-button>
          <forge-icon name=${V.name}></forge-icon>
        </forge-icon-button>
        <span>Settings</span>
      </forge-label>
    `},f={parameters:{controls:{include:["variant","density","disabled","shape"]}},args:{variant:"icon",density:"large",disabled:!1,shape:"circular"},render:({variant:o,density:e,disabled:n,shape:t})=>r`<button class=${U({"forge-icon-button":!0,"forge-icon-button--outlined":o==="outlined","forge-icon-button--tonal":o==="tonal","forge-icon-button--filled":o==="filled","forge-icon-button--raised":o==="raised","forge-icon-button--small":e==="small","forge-icon-button--medium":e==="medium","forge-icon-button--large":e==="large","forge-icon-button--squared":t==="squared"})} ?disabled=${n} aria-label="My CSS-only icon button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>`};var b,d,p;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:"{}",...(p=(d=a.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var h,v,y;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(y=(v=i.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var S,$,I;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(I=($=c.parameters)==null?void 0:$.docs)==null?void 0:I.source}}};var _,w,C;l.parameters={...l.parameters,docs:{...(_=l.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(C=(w=l.parameters)==null?void 0:w.docs)==null?void 0:C.source}}};var E,x,T;s.parameters={...s.parameters,docs:{...(E=s.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(T=(x=s.parameters)==null?void 0:x.docs)==null?void 0:T.source}}};var A,O,P;g.parameters={...g.parameters,docs:{...(A=g.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...(P=(O=g.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};var L,k,M;u.parameters={...u.parameters,docs:{...(L=u.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
}`,...(M=(k=u.parameters)==null?void 0:k.docs)==null?void 0:M.source}}};var W,B,D;f.parameters={...f.parameters,docs:{...(W=f.parameters)==null?void 0:W.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['variant', 'density', 'disabled', 'shape']
    }
  },
  args: {
    variant: 'icon',
    density: 'large',
    disabled: false,
    shape: 'circular'
  },
  render: ({
    variant,
    density,
    disabled,
    shape
  }) => {
    const classes = {
      'forge-icon-button': true,
      'forge-icon-button--outlined': variant === 'outlined',
      'forge-icon-button--tonal': variant === 'tonal',
      'forge-icon-button--filled': variant === 'filled',
      'forge-icon-button--raised': variant === 'raised',
      'forge-icon-button--small': density === 'small',
      'forge-icon-button--medium': density === 'medium',
      'forge-icon-button--large': density === 'large',
      'forge-icon-button--squared': shape === 'squared'
    };
    return html\`<button class=\${classMap(classes)} ?disabled=\${disabled} aria-label="My CSS-only icon button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>\`;
  }
}`,...(D=(B=f.parameters)==null?void 0:B.docs)==null?void 0:D.source}}};const Z=["Demo","Variants","Anchor","Themed","WithBadge","WithCircularProgress","WithLabel","CSSOnly"],Io=Object.freeze(Object.defineProperty({__proto__:null,Anchor:c,CSSOnly:f,Demo:a,Themed:l,Variants:i,WithBadge:s,WithCircularProgress:g,WithLabel:u,__namedExportsOrder:Z,default:Y},Symbol.toStringTag,{value:"Module"}));export{c as A,f as C,a as D,Io as I,l as T,i as V,s as W,g as a,u as b};
