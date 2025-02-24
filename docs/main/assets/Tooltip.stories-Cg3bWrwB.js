import{x as m,E as f}from"./lit-html-paDGiEfB.js";import{o as d}from"./style-map-C9nPWcxA.js";import{b as u,g as T,O as s,e as g}from"./utils-D5U1kRmx.js";import"./feature-detection-DRCh51Sa.js";import{T as t}from"./tooltip-BEr6TQlq.js";import"./overlay-es9tef1H.js";import"./button-DaDzbT7D.js";import"./focus-indicator-DzT8BbE-.js";import"./index-BmocOEUj.js";import"./state-layer-IxmMcKDT.js";const a="forge-tooltip",y={title:"Components/Tooltip",render:e=>{var l;const r=u(e),c=r?d(r):f;return m`
      <forge-button variant="raised">Hover me</forge-button>
      <forge-tooltip
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
    `},component:a,parameters:{layout:"centered",actions:{disable:!0}},argTypes:{...T({tagName:a,exclude:["anchor","anchorElement","target","position","boundary","boundaryElement"],controls:{type:{control:"select",options:["presentation","label","description"]},placement:{control:"select",options:s},flip:{control:"select",options:g},triggerType:{control:"multi-select",options:["hover","longpress","focus"]},fallbackPlacements:{control:"multi-select",options:s}}})},args:{open:!1,type:t.defaults.TYPE,placement:t.defaults.PLACEMENT,delay:t.defaults.DELAY,offset:t.defaults.OFFSET,flip:t.defaults.FLIP,triggerType:t.defaults.TRIGGER_TYPES}},o={};var n,p,i;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(i=(p=o.parameters)==null?void 0:p.docs)==null?void 0:i.source}}};const E=["Demo"],I=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:E,default:y},Symbol.toStringTag,{value:"Module"}));export{o as D,I as T};
