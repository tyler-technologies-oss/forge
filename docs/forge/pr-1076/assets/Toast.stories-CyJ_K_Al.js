import{A as m,b as c}from"./iframe-B1rDg3rc.js";import{n as l,e as p}from"./ref-DeV6-h_u.js";import{o as d}from"./style-map-yQANZLc0.js";import{g as u,b,G as f,O as T}from"./utils-dyGV7reF.js";import"./service-adapter-CoGDs2_3.js";import"./button-BwyCbBt8.js";import"./focus-indicator-O36tFu3y.js";import"./state-layer-CwwoRddA.js";import"./toast-6_d_JI4K.js";import"./overlay-DPtUw_or.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,a="forge-toast",g=r("forge-toast-action"),_=r("forge-toast-close"),O={title:"Components/Toast",render:t=>{const i=b(t),n=i?d(i):m,s=p();return c`
      <forge-button variant="raised" @click=${()=>s.value.open=!s.value.open}>Show Toast</forge-button>
      <forge-toast
        ${l(s)}
        .open=${t.open}
        .duration=${t.duration}
        .placement=${t.placement}
        .actionText=${t.actionText}
        .dismissible=${t.dismissible}
        .dismissLabel=${t.dismissLabel}
        .theme=${t.theme}
        style=${n}
        @forge-toast-action=${g}
        @forge-toast-close=${_}>
        ${t.text}
      </forge-toast>
    `},component:a,argTypes:{...u({tagName:a,controls:{placement:{control:"select",options:T},theme:{control:"select",options:["default",...f]}}}),text:{control:"text"}},args:{text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",open:!1,duration:2750,placement:"bottom",actionText:"",dismissible:!1,dismissLabel:"Dismiss toast",theme:"default"}},e={},o={args:{dismissible:!0,text:"This toast is dismissible!"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    dismissible: true,
    text: 'This toast is dismissible!'
  }
}`,...o.parameters?.docs?.source}}};const $=["Demo","Dismissible"],M=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,Dismissible:o,__namedExportsOrder:$,default:O},Symbol.toStringTag,{value:"Module"}));export{e as D,M as T,o as a};
