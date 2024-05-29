import{x as c,o as m,A as f}from"./style-map-D-TaQ64I.js";import{g as d,a as u,O as T,b as g}from"./constants-DyS6XWk2.js";import"./button-B4OA40O0.js";import"./focus-indicator-DEXc5aaB.js";import"./index-kxh4SYdw.js";import"./state-layer-Cw24Ee-e.js";import{T as t}from"./tooltip-BsfF_gEx.js";import"./with-longpress-listener-Czl_7a_U.js";const s="forge-tooltip",y={title:"Components/Tooltip",render:e=>{var l;const r=d(e),i=r?m(r):f;return c`
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
        style=${i}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </forge-tooltip>
    `},component:s,parameters:{layout:"centered",actions:{disable:!0}},argTypes:{...u({tagName:s,exclude:["anchor","anchorElement","target","position","boundary","boundaryElement"],controls:{type:{control:"select",options:["presentation","label","description"]},flip:{control:"select",options:T},triggerType:{control:"multi-select",options:["hover","longpress","focus"]},fallbackPlacements:{control:"multi-select",options:g}}})},args:{open:!1,type:t.defaults.TYPE,placement:t.defaults.PLACEMENT,delay:t.defaults.DELAY,offset:t.defaults.OFFSET,flip:t.defaults.FLIP,triggerType:t.defaults.TRIGGER_TYPES}},o={};var a,n,p;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:"{}",...(p=(n=o.parameters)==null?void 0:n.docs)==null?void 0:p.source}}};const b=["Demo"],C=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:b,default:y},Symbol.toStringTag,{value:"Module"}));export{o as D,C as T};
