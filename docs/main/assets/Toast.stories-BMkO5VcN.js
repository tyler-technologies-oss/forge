import"./lit-element-CYrSCkDY.js";import{E as f,x as b}from"./lit-html-CuBe1DX_.js";import{a as d}from"./index-B-lxVbXh.js";import{g as T,G as g,O as $,b as x}from"./utils-CXSdATrE.js";import{o as O}from"./style-map-CeP1Mntv.js";import{n as _,e as h}from"./ref-BHdy32Cl.js";import"./feature-detection-CY6TVbRZ.js";import"./toast-BhVYtotM.js";import"./overlay-8j8D8Fh1.js";import"./button-CutPPNni.js";import"./focus-indicator-NbLDNrYT.js";import"./index-CiLSBptl.js";import"./state-layer-sxQMIn2c.js";const r="forge-toast",A=d("forge-toast-action"),E=d("forge-toast-close"),L={title:"Components/Toast",render:t=>{const i=x(t),u=i?O(i):f,s=h();return b`
      <forge-button variant="raised" @click=${()=>s.value.open=!s.value.open}>Show Toast</forge-button>
      <forge-toast
        ${_(s)}
        .open=${t.open}
        .duration=${t.duration}
        .placement=${t.placement}
        .actionText=${t.actionText}
        .dismissible=${t.dismissible}
        .dismissLabel=${t.dismissLabel}
        .theme=${t.theme}
        style=${u}
        @forge-toast-action=${A}
        @forge-toast-close=${E}>
        ${t.text}
      </forge-toast>
    `},component:r,argTypes:{...T({tagName:r,controls:{placement:{control:"select",options:$},theme:{control:"select",options:["default",...g]}}}),text:{control:"text"}},args:{text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",open:!1,duration:2750,placement:"bottom",actionText:"",dismissible:!1,dismissLabel:"Dismiss toast",theme:"default"}},e={},o={args:{dismissible:!0,text:"This toast is dismissible!"}};var a,n,m;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:"{}",...(m=(n=e.parameters)==null?void 0:n.docs)==null?void 0:m.source}}};var c,l,p;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    dismissible: true,
    text: 'This toast is dismissible!'
  }
}`,...(p=(l=o.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};const S=["Demo","Dismissible"],z=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,Dismissible:o,__namedExportsOrder:S,default:L},Symbol.toStringTag,{value:"Module"}));export{e as D,z as T,o as a};
