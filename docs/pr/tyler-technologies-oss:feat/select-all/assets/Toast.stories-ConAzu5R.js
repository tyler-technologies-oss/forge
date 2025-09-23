import{E as m,x as c}from"./iframe-7ipV3BDo.js";import{g as l,G as p,O as d,a as u}from"./utils-Cqbxq2Mi.js";import{o as f}from"./style-map-Ct8U4Hxk.js";import{n as T,e as b}from"./ref-DeObZquI.js";import"./service-adapter-CffG5Lhq.js";import"./toast-BeJa9waC.js";import"./overlay-B5pGv-rV.js";import"./button-DlJOcJKO.js";import"./focus-indicator-DjsWD5XE.js";import"./state-layer-gAgMwMHF.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,a="forge-toast",g=r("forge-toast-action"),_=r("forge-toast-close"),O={title:"Components/Toast",render:t=>{const i=u(t),n=i?f(i):m,s=b();return c`
      <forge-button variant="raised" @click=${()=>s.value.open=!s.value.open}>Show Toast</forge-button>
      <forge-toast
        ${T(s)}
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
    `},component:a,argTypes:{...l({tagName:a,controls:{placement:{control:"select",options:d},theme:{control:"select",options:["default",...p]}}}),text:{control:"text"}},args:{text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",open:!1,duration:2750,placement:"bottom",actionText:"",dismissible:!1,dismissLabel:"Dismiss toast",theme:"default"}},e={},o={args:{dismissible:!0,text:"This toast is dismissible!"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    dismissible: true,
    text: 'This toast is dismissible!'
  }
}`,...o.parameters?.docs?.source}}};const $=["Demo","Dismissible"],M=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,Dismissible:o,__namedExportsOrder:$,default:O},Symbol.toStringTag,{value:"Module"}));export{e as D,M as T,o as a};
