import"./lit-element-JplMEnZc.js";import{x as f,E as b}from"./lit-html-paDGiEfB.js";import{a as d}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{b as T,g,O as $,G as x}from"./utils-dxGSIiWA.js";import{o as O}from"./style-map-C9nPWcxA.js";import{n as _,e as h}from"./ref-DJjbfkOF.js";import"./feature-detection-ONR9WHvu.js";import"./toast-Cvhn27Rq.js";import"./overlay-D8lPnEIG.js";import"./button-ClwhnaJK.js";import"./focus-indicator-I_IrwQSK.js";import"./index-BgGCUUFB.js";import"./state-layer-CxIpCmDW.js";const r="forge-toast",A=d("forge-toast-action"),E=d("forge-toast-close"),L={title:"Components/Toast",render:t=>{const i=T(t),u=i?O(i):b,s=h();return f`
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
    `},component:r,argTypes:{...g({tagName:r,controls:{placement:{control:"select",options:$},theme:{control:"select",options:["default",...x]}}}),text:{control:"text"}},args:{text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",open:!1,duration:2750,placement:"bottom",actionText:"",dismissible:!1,dismissLabel:"Dismiss toast",theme:"default"}},e={},o={args:{dismissible:!0,text:"This toast is dismissible!"}};var a,n,m;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:"{}",...(m=(n=e.parameters)==null?void 0:n.docs)==null?void 0:m.source}}};var c,l,p;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    dismissible: true,
    text: 'This toast is dismissible!'
  }
}`,...(p=(l=o.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};const S=["Demo","Dismissible"],z=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,Dismissible:o,__namedExportsOrder:S,default:L},Symbol.toStringTag,{value:"Module"}));export{e as D,z as T,o as a};
