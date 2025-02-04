import"./lit-element-JplMEnZc.js";import{x as r}from"./lit-html-paDGiEfB.js";import{a as U}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{c as z,g as X,s as d,G as Y}from"./utils-DzhRrs8R.js";import{t as H}from"./index-fxMNKkgx.js";import{I as Z}from"./icon-Ctzrqx63.js";import{j as V,l as G,b as J,a as K,m as Q}from"./index-CbZAylpk.js";import{e as oo}from"./class-map-D55lQyt8.js";import"./feature-detection-ONR9WHvu.js";import"./icon-button-D5fTQ0k5.js";import"./focus-indicator-I_IrwQSK.js";import"./index-BgGCUUFB.js";import"./state-layer-CxIpCmDW.js";import"./circular-progress-Dxa58JUX.js";import"./badge-CzgFSHGZ.js";import"./label-0TgDsZHI.js";import"./button-ClwhnaJK.js";import"./button-toggle-group-SI6kj2fb.js";import"./checkbox-BMGViPZ8.js";import"./switch-BTIWsPYn.js";const m="forge-icon-button";Z.define([H,V,G,J,K,Q]);const eo=U("click"),no={title:"Components/Icon Button",render:o=>{const e=z(m,o);if(e.addEventListener("click",eo),o.toggle){e.setAttribute("aria-label","Toggle icon button demo");const n=document.createElement("forge-icon");n.name=V.name,n.slot="on",e.appendChild(n);const t=document.createElement("forge-icon");t.name=G.name,e.appendChild(t)}else{e.setAttribute("aria-label","Icon button demo");const n=document.createElement("forge-icon");n.name=H.name,e.appendChild(n)}return e},component:m,argTypes:{...X({tagName:m,exclude:["form","name","value","type"],controls:{variant:{control:{type:"select"},options:["icon","outlined","tonal","filled","raised"]},theme:{control:{type:"select"},options:Y},shape:{control:{type:"select"},options:["circular","squared"]},density:{control:{type:"select"},options:["small","medium","large"]}}})},args:{variant:"icon",theme:"default",disabled:!1,dense:!1,toggle:!1,on:!1,shape:"circular",density:"large",popoverIcon:!1}},a={},i={...d,render:()=>r`
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
    `},c={...d,render:()=>r`
      <forge-icon-button toggle aria-label="Default toggle icon button">
        <forge-icon name="favorite_border"></forge-icon>
        <forge-icon slot="on" name="favorite"></forge-icon>
      </forge-icon-button>

      <forge-icon-button toggle variant="outlined" aria-label="Outlined toggle icon button">
        <forge-icon name="favorite_border"></forge-icon>
        <forge-icon slot="on" name="favorite"></forge-icon>
      </forge-icon-button>

      <forge-icon-button toggle variant="tonal" aria-label="Tonal toggle icon button">
        <forge-icon name="favorite_border"></forge-icon>
        <forge-icon slot="on" name="favorite"></forge-icon>
      </forge-icon-button>

      <forge-icon-button toggle variant="filled" aria-label="Filled toggle icon button">
        <forge-icon name="favorite_border"></forge-icon>
        <forge-icon slot="on" name="favorite"></forge-icon>
      </forge-icon-button>

      <forge-icon-button toggle variant="raised" aria-label="Raised toggle icon button">
        <forge-icon name="favorite_border"></forge-icon>
        <forge-icon slot="on" name="favorite"></forge-icon>
      </forge-icon-button>
    `},l={parameters:{controls:{include:["variant"]}},render:({variant:o})=>r`
      <forge-icon-button .variant=${o}>
        <a href="javascript: alert('Icon button with anchor works!');" aria-label="Anchor link icon button">
          <forge-icon .name=${J.name}></forge-icon>
        </a>
      </forge-icon-button>
    `},g={parameters:{controls:{include:["variant"]}},render:({variant:o})=>r`
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
    `},s={parameters:{controls:{exclude:["toggle","on","popoverIcon"]}},render:o=>{const e=z(m,o);e.setAttribute("aria-label","Icon button with badge");const n=document.createElement("forge-icon");n.name=K.name,e.appendChild(n);const t=document.createElement("forge-badge");return t.textContent="3",t.slot="badge",e.appendChild(t),e}},f={parameters:{controls:{include:["variant","theme","disabled"]}},render:({variant:o,theme:e,disabled:n})=>r`
      <forge-icon-button .variant=${o} .theme=${e} ?disabled=${n} aria-label="Loading">
        <forge-circular-progress aria-label="Progress label"></forge-circular-progress>
      </forge-icon-button>
    `},u={...d,render:()=>r`
      <forge-label style="display: flex; flex-direction: column; width: min-content; align-items: center;">
        <forge-icon-button>
          <forge-icon name=${Q.name}></forge-icon>
        </forge-icon-button>
        <span>Settings</span>
      </forge-label>
    `},b={parameters:{controls:{include:["variant","density","disabled","shape"]}},args:{variant:"icon",density:"large",disabled:!1,shape:"circular"},render:({variant:o,density:e,disabled:n,shape:t})=>r`<button class=${oo({"forge-icon-button":!0,"forge-icon-button--outlined":o==="outlined","forge-icon-button--tonal":o==="tonal","forge-icon-button--filled":o==="filled","forge-icon-button--raised":o==="raised","forge-icon-button--small":e==="small","forge-icon-button--medium":e==="medium","forge-icon-button--large":e==="large","forge-icon-button--squared":t==="squared"})} ?disabled=${n} aria-label="My CSS-only icon button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>`};var p,v,h;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:"{}",...(h=(v=a.parameters)==null?void 0:v.docs)==null?void 0:h.source}}};var y,S,_;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(_=(S=i.parameters)==null?void 0:S.docs)==null?void 0:_.source}}};var $,I,w;c.parameters={...c.parameters,docs:{...($=c.parameters)==null?void 0:$.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
      <forge-icon-button toggle aria-label="Default toggle icon button">
        <forge-icon name="favorite_border"></forge-icon>
        <forge-icon slot="on" name="favorite"></forge-icon>
      </forge-icon-button>

      <forge-icon-button toggle variant="outlined" aria-label="Outlined toggle icon button">
        <forge-icon name="favorite_border"></forge-icon>
        <forge-icon slot="on" name="favorite"></forge-icon>
      </forge-icon-button>

      <forge-icon-button toggle variant="tonal" aria-label="Tonal toggle icon button">
        <forge-icon name="favorite_border"></forge-icon>
        <forge-icon slot="on" name="favorite"></forge-icon>
      </forge-icon-button>

      <forge-icon-button toggle variant="filled" aria-label="Filled toggle icon button">
        <forge-icon name="favorite_border"></forge-icon>
        <forge-icon slot="on" name="favorite"></forge-icon>
      </forge-icon-button>

      <forge-icon-button toggle variant="raised" aria-label="Raised toggle icon button">
        <forge-icon name="favorite_border"></forge-icon>
        <forge-icon slot="on" name="favorite"></forge-icon>
      </forge-icon-button>
    \`;
  }
}`,...(w=(I=c.parameters)==null?void 0:I.docs)==null?void 0:w.source}}};var C,E,T;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(T=(E=l.parameters)==null?void 0:E.docs)==null?void 0:T.source}}};var x,O,A;g.parameters={...g.parameters,docs:{...(x=g.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(A=(O=g.parameters)==null?void 0:O.docs)==null?void 0:A.source}}};var P,L,D;s.parameters={...s.parameters,docs:{...(P=s.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(D=(L=s.parameters)==null?void 0:L.docs)==null?void 0:D.source}}};var M,W,B;f.parameters={...f.parameters,docs:{...(M=f.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(B=(W=f.parameters)==null?void 0:W.docs)==null?void 0:B.source}}};var k,F,R;u.parameters={...u.parameters,docs:{...(k=u.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(R=(F=u.parameters)==null?void 0:F.docs)==null?void 0:R.source}}};var N,j,q;b.parameters={...b.parameters,docs:{...(N=b.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(q=(j=b.parameters)==null?void 0:j.docs)==null?void 0:q.source}}};const to=["Demo","Variants","Toggle","Anchor","Themed","WithBadge","WithCircularProgress","WithLabel","CSSOnly"],Eo=Object.freeze(Object.defineProperty({__proto__:null,Anchor:l,CSSOnly:b,Demo:a,Themed:g,Toggle:c,Variants:i,WithBadge:s,WithCircularProgress:f,WithLabel:u,__namedExportsOrder:to,default:no},Symbol.toStringTag,{value:"Module"}));export{l as A,b as C,a as D,Eo as I,c as T,i as V,s as W,g as a,f as b,u as c};
