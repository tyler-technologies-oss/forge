import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{p as r}from"./iframe-CebKObJP.js";import{_ as i,m as a,n as o,o as s,s as c}from"./utils-C3ow8Ikc.js";import{t as l}from"./class-map-DEew1OiS.js";import{t as u}from"./class-map-8zp5OV2u.js";import{o as d,t as f}from"./icon-DTQwimRS.js";import{Ft as p,Jt as m,K as h,Pt as g,Q as _,q as v,t as y}from"./tyler-icons-CLXzO0Q_.js";import{t as b}from"./icon-button-DNkXDhJe.js";import{n as x}from"./badge-DX-XPtKB.js";import{t as S}from"./label-CpDrT-9D.js";import{t as C}from"./circular-progress-CdbiX3fs.js";var w=t({Anchor:()=>M,CSSOnly:()=>L,Demo:()=>k,Themed:()=>N,Toggle:()=>j,Variants:()=>A,WithBadge:()=>P,WithCircularProgress:()=>F,WithLabel:()=>I,__namedExportsOrder:()=>R,default:()=>O}),T,E,D,O,k,A,j,M,N,P,F,I,L,R;function z(){return(z=e((()=>{r(),a(),f(),y(),u(),b(),C(),x(),S(),{action:T}=__STORYBOOK_MODULE_ACTIONS__,E=`forge-icon-button`,d.define([_,h,v,p,g,m]),D=T(`click`),O={title:`Components/Icon Button`,render:e=>{let t=s(E,e);if(t.addEventListener(`click`,D),e.toggle){t.setAttribute(`aria-label`,`Toggle icon button demo`);let e=document.createElement(`forge-icon`);e.name=h.name,e.slot=`on`,t.appendChild(e);let n=document.createElement(`forge-icon`);n.name=v.name,t.appendChild(n)}else{t.setAttribute(`aria-label`,`Icon button demo`);let e=document.createElement(`forge-icon`);e.name=_.name,t.appendChild(e)}return t},component:E,argTypes:{...c({tagName:E,exclude:[`form`,`name`,`value`,`type`,`on`],controls:{variant:{control:{type:`select`},options:[`icon`,`outlined`,`tonal`,`filled`,`raised`]},theme:{control:{type:`select`},options:o},shape:{control:{type:`select`},options:[`circular`,`squared`]},density:{control:{type:`select`},options:[`small`,`medium`,`large`]}}})},args:{variant:`icon`,theme:`default`,disabled:!1,dense:!1,toggle:!1,pressed:!1,shape:`circular`,density:`large`,popoverIcon:!1}},k={},A={...i,render:()=>n`
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
  `},j={...i,render:()=>n`
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
  `},M={parameters:{controls:{include:[`variant`]}},render:({variant:e})=>n`
    <forge-icon-button .variant=${e}>
      <a href="javascript: alert('Icon button with anchor works!');" aria-label="Anchor link icon button">
        <forge-icon .name=${p.name}></forge-icon>
      </a>
    </forge-icon-button>
  `},N={parameters:{controls:{include:[`variant`]}},render:({variant:e})=>n`
    <forge-icon-button variant=${e} aria-label="Default theme icon button">
      <forge-icon name="forge_logo"></forge-icon>
    </forge-icon-button>
    <forge-icon-button variant=${e} theme="primary" aria-label="Primary theme icon button">
      <forge-icon name="forge_logo"></forge-icon>
    </forge-icon-button>
    <forge-icon-button variant=${e} theme="secondary" aria-label="Secondary theme icon button">
      <forge-icon name="forge_logo"></forge-icon>
    </forge-icon-button>
    <forge-icon-button variant=${e} theme="tertiary" aria-label="Tertiary theme icon button">
      <forge-icon name="forge_logo"></forge-icon>
    </forge-icon-button>
    <forge-icon-button variant=${e} theme="success" aria-label="Success theme icon button">
      <forge-icon name="forge_logo"></forge-icon>
    </forge-icon-button>
    <forge-icon-button variant=${e} theme="warning" aria-label="Warning theme icon button">
      <forge-icon name="forge_logo"></forge-icon>
    </forge-icon-button>
    <forge-icon-button variant=${e} theme="error" aria-label="Error theme icon button">
      <forge-icon name="forge_logo"></forge-icon>
    </forge-icon-button>
    <forge-icon-button variant=${e} theme="info" aria-label="Info theme icon button">
      <forge-icon name="forge_logo"></forge-icon>
    </forge-icon-button>
  `},P={parameters:{controls:{exclude:[`toggle`,`on`,`popoverIcon`]}},render:e=>{let t=s(E,e);t.setAttribute(`aria-label`,`Icon button with badge`);let n=document.createElement(`forge-icon`);n.name=g.name,t.appendChild(n);let r=document.createElement(`forge-badge`);return r.textContent=`3`,r.slot=`badge`,t.appendChild(r),t}},F={parameters:{controls:{include:[`variant`,`theme`,`disabled`]}},render:({variant:e,theme:t,disabled:r})=>n`
    <forge-icon-button .variant=${e} .theme=${t} ?disabled=${r} aria-label="Loading">
      <forge-circular-progress aria-label="Progress label"></forge-circular-progress>
    </forge-icon-button>
  `},I={...i,render:()=>n`
    <forge-label style="display: flex; flex-direction: column; width: min-content; align-items: center;">
      <forge-icon-button>
        <forge-icon name=${m.name}></forge-icon>
      </forge-icon-button>
      <span>Settings</span>
    </forge-label>
  `},L={parameters:{controls:{include:[`variant`,`density`,`disabled`,`shape`]}},args:{variant:`icon`,density:`large`,disabled:!1,shape:`circular`},render:({variant:e,density:t,disabled:r,shape:i})=>n`<button class=${l({"forge-icon-button":!0,"forge-icon-button--outlined":e===`outlined`,"forge-icon-button--tonal":e===`tonal`,"forge-icon-button--filled":e===`filled`,"forge-icon-button--raised":e===`raised`,"forge-icon-button--small":t===`small`,"forge-icon-button--medium":t===`medium`,"forge-icon-button--large":t===`large`,"forge-icon-button--squared":i===`squared`})} ?disabled=${r} aria-label="My CSS-only icon button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>`},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
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
  \`
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
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
  \`
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['variant']
    }
  },
  render: ({
    variant
  }) => html\`
    <forge-icon-button .variant=\${variant}>
      <a href="javascript: alert('Icon button with anchor works!');" aria-label="Anchor link icon button">
        <forge-icon .name=\${tylIconOpenInNew.name}></forge-icon>
      </a>
    </forge-icon-button>
  \`
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['variant']
    }
  },
  render: ({
    variant
  }) => html\`
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
  \`
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
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
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['variant', 'theme', 'disabled']
    }
  },
  render: ({
    variant,
    theme,
    disabled
  }) => html\`
    <forge-icon-button .variant=\${variant} .theme=\${theme} ?disabled=\${disabled} aria-label="Loading">
      <forge-circular-progress aria-label="Progress label"></forge-circular-progress>
    </forge-icon-button>
  \`
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-label style="display: flex; flex-direction: column; width: min-content; align-items: center;">
      <forge-icon-button>
        <forge-icon name=\${tylIconSettings.name}></forge-icon>
      </forge-icon-button>
      <span>Settings</span>
    </forge-label>
  \`
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
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
}`,...L.parameters?.docs?.source}}},R=[`Demo`,`Variants`,`Toggle`,`Anchor`,`Themed`,`WithBadge`,`WithCircularProgress`,`WithLabel`,`CSSOnly`]})))()}export{N as a,P as c,z as d,w as i,F as l,L as n,j as o,k as r,A as s,M as t,I as u};