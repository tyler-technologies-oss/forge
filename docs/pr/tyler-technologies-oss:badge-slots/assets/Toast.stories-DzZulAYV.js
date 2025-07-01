import{E as f,x as T}from"./iframe-Bh6VOYaj.js";import{g as b,G as g,O as _,a as O}from"./utils-D_oObhyi.js";import{o as $}from"./style-map-C0bv6awB.js";import{n as x,e as S}from"./ref-CQUqGCQM.js";import"./feature-detection-uS6p5jc8.js";import"./toast-DoZF_dv5.js";import"./overlay-rvLcgp1q.js";import"./button-r2EMLpWm.js";import"./focus-indicator-IWpzSXYP.js";import"./index-CiLSBptl.js";import"./state-layer-BFwsAUDA.js";const{action:d}=__STORYBOOK_MODULE_ACTIONS__,a="forge-toast",h=d("forge-toast-action"),A=d("forge-toast-close"),E={title:"Components/Toast",render:t=>{const i=O(t),u=i?$(i):f,s=S();return T`
      <forge-button variant="raised" @click=${()=>s.value.open=!s.value.open}>Show Toast</forge-button>
      <forge-toast
        ${x(s)}
        .open=${t.open}
        .duration=${t.duration}
        .placement=${t.placement}
        .actionText=${t.actionText}
        .dismissible=${t.dismissible}
        .dismissLabel=${t.dismissLabel}
        .theme=${t.theme}
        style=${u}
        @forge-toast-action=${h}
        @forge-toast-close=${A}>
        ${t.text}
      </forge-toast>
    `},component:a,argTypes:{...b({tagName:a,controls:{placement:{control:"select",options:_},theme:{control:"select",options:["default",...g]}}}),text:{control:"text"}},args:{text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",open:!1,duration:2750,placement:"bottom",actionText:"",dismissible:!1,dismissLabel:"Dismiss toast",theme:"default"}},e={},o={args:{dismissible:!0,text:"This toast is dismissible!"}};var r,n,m;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:"{}",...(m=(n=e.parameters)==null?void 0:n.docs)==null?void 0:m.source}}};var c,l,p;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    dismissible: true,
    text: 'This toast is dismissible!'
  }
}`,...(p=(l=o.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};const L=["Demo","Dismissible"],B=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,Dismissible:o,__namedExportsOrder:L,default:E},Symbol.toStringTag,{value:"Module"}));export{e as D,B as T,o as a};
