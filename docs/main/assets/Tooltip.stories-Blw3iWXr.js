import{k as m,D as f}from"./lit-html-DZH-Jm0H.js";import{s as d}from"./style-map-DxfbqtuX.js";import{b as u,g as T,O as l,d as g}from"./utils-Dj42C_k3.js";import"./constants-DjE6emXm.js";import{T as t}from"./tooltip-CoCQ3Otm.js";import"./overlay-DWm8nYOy.js";import"./button-C5f1g9CL.js";import"./focus-indicator-_fDu4ZqT.js";import"./index-Dh0vMUMR.js";import"./state-layer-DTKAXCUq.js";const a="forge-tooltip",y={title:"Components/Tooltip",render:e=>{var s;const r=u(e),c=r?d(r):f;return m`
      <forge-button variant="raised">Hover me</forge-button>
      <forge-tooltip
        .open=${e.open}
        .type=${e.type}
        .placement=${e.placement}
        .delay=${e.delay}
        .offset=${e.offset}
        .flip=${e.flip}
        .fallbackPlacements=${(s=e.fallbackPlacements)!=null&&s.length?e.fallbackPlacements:[]}
        .triggerType=${e.triggerType}
        style=${c}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </forge-tooltip>
    `},component:a,parameters:{layout:"centered",actions:{disable:!0}},argTypes:{...T({tagName:a,exclude:["anchor","anchorElement","target","position","boundary","boundaryElement"],controls:{type:{control:"select",options:["presentation","label","description"]},placement:{control:"select",options:l},flip:{control:"select",options:g},triggerType:{control:"multi-select",options:["hover","longpress","focus"]},fallbackPlacements:{control:"multi-select",options:l}}})},args:{open:!1,type:t.defaults.TYPE,placement:t.defaults.PLACEMENT,delay:t.defaults.DELAY,offset:t.defaults.OFFSET,flip:t.defaults.FLIP,triggerType:t.defaults.TRIGGER_TYPES}},o={};var n,p,i;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(i=(p=o.parameters)==null?void 0:p.docs)==null?void 0:i.source}}};const b=["Demo"],C=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:b,default:y},Symbol.toStringTag,{value:"Module"}));export{o as D,C as T};
