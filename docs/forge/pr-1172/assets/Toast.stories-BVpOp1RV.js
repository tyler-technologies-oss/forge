import{A as c,b as m}from"./iframe-ZvzVysMB.js";import{n as l,e as p}from"./ref-9F0ZFO8q.js";import{o as d}from"./style-map-BYFhBNXo.js";import{g as u,b,G as f,O as T}from"./utils-D5x2rMta.js";import"./service-adapter-8tADcN_b.js";import"./button-B8ecmhvI.js";import"./toast-BaONwOs2.js";import"./overlay-DZcAclZS.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,a="forge-toast",g=r("forge-toast-action"),_=r("forge-toast-close"),O={title:"Components/Toast",render:t=>{const i=b(t),n=i?d(i):c,s=p();return m`
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
}`,...o.parameters?.docs?.source}}};const $=["Demo","Dismissible"],N=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,Dismissible:o,__namedExportsOrder:$,default:O},Symbol.toStringTag,{value:"Module"}));export{e as D,N as T,o as a};
