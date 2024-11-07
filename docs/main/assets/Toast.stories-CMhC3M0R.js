import"./lit-element-Dk2-kgKT.js";import{k as f,D as b}from"./lit-html-DZH-Jm0H.js";import{a as d}from"./chunk-454WOBUV-CM0pFb8Z.js";import{b as T,g,O as $,G as x}from"./utils-CkdzhxtS.js";import{s as O}from"./style-map-DxfbqtuX.js";import{K as _,i as h}from"./ref-9TtedaQt.js";import"./constants-DjE6emXm.js";import"./toast-COZoY26W.js";import"./overlay-DWm8nYOy.js";import"./button-CbYZUGFb.js";import"./focus-indicator-_fDu4ZqT.js";import"./index-Dh0vMUMR.js";import"./state-layer-DTKAXCUq.js";const a="forge-toast",A=d("forge-toast-action"),L=d("forge-toast-close"),S={title:"Components/Toast",render:t=>{const i=T(t),u=i?O(i):b,o=h();return f`
      <forge-button variant="raised" @click=${()=>o.value.open=!o.value.open}>Show Toast</forge-button>
      <forge-toast
        ${_(o)}
        .open=${t.open}
        .duration=${t.duration}
        .placement=${t.placement}
        .actionText=${t.actionText}
        .dismissible=${t.dismissible}
        .dismissLabel=${t.dismissLabel}
        .theme=${t.theme}
        style=${u}
        @forge-toast-action=${A}
        @forge-toast-close=${L}>
        ${t.text}
      </forge-toast>
    `},component:a,argTypes:{...g({tagName:a,controls:{placement:{control:"select",options:$},theme:{control:"select",options:["default",...x]}}}),text:{control:"text"}},args:{text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",open:!1,duration:2750,placement:"bottom",actionText:"",dismissible:!1,dismissLabel:"Dismiss toast",theme:"default"}},e={},s={args:{dismissible:!0,text:"This toast is dismissible!"}};var r,n,m;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:"{}",...(m=(n=e.parameters)==null?void 0:n.docs)==null?void 0:m.source}}};var c,l,p;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    dismissible: true,
    text: 'This toast is dismissible!'
  }
}`,...(p=(l=s.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};const D=["Demo","Dismissible"],R=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,Dismissible:s,__namedExportsOrder:D,default:S},Symbol.toStringTag,{value:"Module"}));export{e as D,R as T,s as a};
