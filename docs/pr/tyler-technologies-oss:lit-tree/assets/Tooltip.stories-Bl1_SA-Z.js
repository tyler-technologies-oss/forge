import{x as m,E as f}from"./lit-html-paDGiEfB.js";import{o as u}from"./style-map-C9nPWcxA.js";import{b as d,g as T,O as s,e as y}from"./utils-CrLe_RCC.js";import"./feature-detection-DRCh51Sa.js";import{T as t}from"./tooltip-DJSv_HE1.js";import"./overlay-D-D6lM0z.js";import"./button-C8Y3s8GC.js";import"./focus-indicator-N8y3p24x.js";import"./index-BgGCUUFB.js";import"./state-layer-BM79vS2j.js";const a="forge-tooltip",g={title:"Components/Tooltip",render:e=>{var l;const r=d(e),c=r?u(r):f;return m`
      <forge-button id="my-button" variant="raised">Hover me</forge-button>
      <forge-tooltip
        anchor="my-button"
        .open=${e.open}
        .type=${e.type}
        .placement=${e.placement}
        .delay=${e.delay}
        .offset=${e.offset}
        .flip=${e.flip}
        .fallbackPlacements=${(l=e.fallbackPlacements)!=null&&l.length?e.fallbackPlacements:[]}
        .triggerType=${e.triggerType}
        style=${c}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </forge-tooltip>
    `},component:a,parameters:{layout:"centered",actions:{disable:!0}},argTypes:{...T({tagName:a,exclude:["anchor","anchorElement","target","position","boundary","boundaryElement"],controls:{type:{control:"select",options:["presentation","label","description"]},placement:{control:"select",options:s},flip:{control:"select",options:y},triggerType:{control:"multi-select",options:["hover","longpress","focus"]},fallbackPlacements:{control:"multi-select",options:s}}})},args:{open:!1,type:t.defaults.TYPE,placement:t.defaults.PLACEMENT,delay:t.defaults.DELAY,offset:t.defaults.OFFSET,flip:t.defaults.FLIP,triggerType:t.defaults.TRIGGER_TYPES}},o={};var n,p,i;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(i=(p=o.parameters)==null?void 0:p.docs)==null?void 0:i.source}}};const b=["Demo"],I=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:b,default:g},Symbol.toStringTag,{value:"Module"}));export{o as D,I as T};
