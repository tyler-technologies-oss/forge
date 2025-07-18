import{x as r}from"./iframe-Dusku7t3.js";import{g as J,s as d,G as Q,c as j}from"./utils-D0zOu5id.js";import{p as H,r as V,d as G,h as K,g as U,c as Y,I as X}from"./icon-eJOvSyyv.js";import{e as Z}from"./class-map-wMyEh-aY.js";import"./service-adapter-BykFeYYZ.js";import"./icon-button-CbIuTIAL.js";import"./focus-indicator-B6EU3cOJ.js";import"./state-layer-BRTtEqto.js";import"./index-CiLSBptl.js";import"./circular-progress-CZq2hNtE.js";import"./badge-Cu0Ba4Nc.js";import"./label-DKzNMyNt.js";import"./button-DNlRsDtE.js";import"./button-toggle-group-CUk-cDcn.js";import"./checkbox-BkhlnQoo.js";import"./switch-CYButROR.js";const{action:oo}=__STORYBOOK_MODULE_ACTIONS__,m="forge-icon-button";X.define([G,H,V,K,U,Y]);const eo=oo("click"),no={title:"Components/Icon Button",render:o=>{const e=j(m,o);if(e.addEventListener("click",eo),o.toggle){e.setAttribute("aria-label","Toggle icon button demo");const n=document.createElement("forge-icon");n.name=H.name,n.slot="on",e.appendChild(n);const t=document.createElement("forge-icon");t.name=V.name,e.appendChild(t)}else{e.setAttribute("aria-label","Icon button demo");const n=document.createElement("forge-icon");n.name=G.name,e.appendChild(n)}return e},component:m,argTypes:{...J({tagName:m,exclude:["form","name","value","type","on"],controls:{variant:{control:{type:"select"},options:["icon","outlined","tonal","filled","raised"]},theme:{control:{type:"select"},options:Q},shape:{control:{type:"select"},options:["circular","squared"]},density:{control:{type:"select"},options:["small","medium","large"]}}})},args:{variant:"icon",theme:"default",disabled:!1,dense:!1,toggle:!1,pressed:!1,shape:"circular",density:"large",popoverIcon:!1}},a={},i={...d,render:()=>r`
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
          <forge-icon .name=${K.name}></forge-icon>
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
    `},s={parameters:{controls:{exclude:["toggle","on","popoverIcon"]}},render:o=>{const e=j(m,o);e.setAttribute("aria-label","Icon button with badge");const n=document.createElement("forge-icon");n.name=U.name,e.appendChild(n);const t=document.createElement("forge-badge");return t.textContent="3",t.slot="badge",e.appendChild(t),e}},f={parameters:{controls:{include:["variant","theme","disabled"]}},render:({variant:o,theme:e,disabled:n})=>r`
      <forge-icon-button .variant=${o} .theme=${e} ?disabled=${n} aria-label="Loading">
        <forge-circular-progress aria-label="Progress label"></forge-circular-progress>
      </forge-icon-button>
    `},u={...d,render:()=>r`
      <forge-label style="display: flex; flex-direction: column; width: min-content; align-items: center;">
        <forge-icon-button>
          <forge-icon name=${Y.name}></forge-icon>
        </forge-icon-button>
        <span>Settings</span>
      </forge-label>
    `},b={parameters:{controls:{include:["variant","density","disabled","shape"]}},args:{variant:"icon",density:"large",disabled:!1,shape:"circular"},render:({variant:o,density:e,disabled:n,shape:t})=>r`<button class=${Z({"forge-icon-button":!0,"forge-icon-button--outlined":o==="outlined","forge-icon-button--tonal":o==="tonal","forge-icon-button--filled":o==="filled","forge-icon-button--raised":o==="raised","forge-icon-button--small":e==="small","forge-icon-button--medium":e==="medium","forge-icon-button--large":e==="large","forge-icon-button--squared":t==="squared"})} ?disabled=${n} aria-label="My CSS-only icon button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>`};var p,v,h;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:"{}",...(h=(v=a.parameters)==null?void 0:v.docs)==null?void 0:h.source}}};var y,_,S;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(S=(_=i.parameters)==null?void 0:_.docs)==null?void 0:S.source}}};var $,I,C;c.parameters={...c.parameters,docs:{...($=c.parameters)==null?void 0:$.docs,source:{originalSource:`{
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
}`,...(C=(I=c.parameters)==null?void 0:I.docs)==null?void 0:C.source}}};var w,E,O;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(O=(E=l.parameters)==null?void 0:E.docs)==null?void 0:O.source}}};var T,x,A;g.parameters={...g.parameters,docs:{...(T=g.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(A=(x=g.parameters)==null?void 0:x.docs)==null?void 0:A.source}}};var P,L,D;s.parameters={...s.parameters,docs:{...(P=s.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(D=(L=s.parameters)==null?void 0:L.docs)==null?void 0:D.source}}};var M,B,W;f.parameters={...f.parameters,docs:{...(M=f.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(W=(B=f.parameters)==null?void 0:B.docs)==null?void 0:W.source}}};var R,k,F;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(F=(k=u.parameters)==null?void 0:k.docs)==null?void 0:F.source}}};var N,q,z;b.parameters={...b.parameters,docs:{...(N=b.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(z=(q=b.parameters)==null?void 0:q.docs)==null?void 0:z.source}}};const to=["Demo","Variants","Toggle","Anchor","Themed","WithBadge","WithCircularProgress","WithLabel","CSSOnly"],$o=Object.freeze(Object.defineProperty({__proto__:null,Anchor:l,CSSOnly:b,Demo:a,Themed:g,Toggle:c,Variants:i,WithBadge:s,WithCircularProgress:f,WithLabel:u,__namedExportsOrder:to,default:no},Symbol.toStringTag,{value:"Module"}));export{l as A,b as C,a as D,$o as I,c as T,i as V,s as W,g as a,f as b,u as c};
