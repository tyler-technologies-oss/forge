import{A as n,b as p}from"./iframe-BPj94FGh.js";import{o as i}from"./style-map-DhpmFxzM.js";import{g as c,b as m,O as l,e as f}from"./utils-LbM5kS63.js";import"./service-adapter-8tADcN_b.js";import{T as t}from"./tooltip-WnsCuOqb.js";import"./overlay-MMpEd-75.js";import"./button-fWyNfyy9.js";import"./focus-indicator-DDCQz0qC.js";import"./state-layer-mJUCxnSJ.js";const s="forge-tooltip",u={title:"Components/Tooltip",render:e=>{const r=m(e),a=r?i(r):n;return p`
      <forge-button id="my-button" variant="raised">Hover me</forge-button>
      <forge-tooltip
        anchor="my-button"
        .open=${e.open}
        .type=${e.type}
        .placement=${e.placement}
        .delay=${e.delay}
        .offset=${e.offset}
        .flip=${e.flip}
        .fallbackPlacements=${e.fallbackPlacements?.length?e.fallbackPlacements:[]}
        .triggerType=${e.triggerType}
        style=${a}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </forge-tooltip>
    `},component:s,parameters:{layout:"centered",actions:{disable:!0}},argTypes:{...c({tagName:s,exclude:["anchor","anchorElement","target","position","boundary","boundaryElement"],controls:{type:{control:"select",options:["presentation","label","description"]},placement:{control:"select",options:l},flip:{control:"select",options:f},triggerType:{control:"multi-select",options:["hover","longpress","focus"]},fallbackPlacements:{control:"multi-select",options:l}}})},args:{open:!1,type:t.defaults.TYPE,placement:t.defaults.PLACEMENT,delay:t.defaults.DELAY,offset:t.defaults.OFFSET,flip:t.defaults.FLIP,triggerType:t.defaults.TRIGGER_TYPES}},o={};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};const d=["Demo"],S=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:d,default:u},Symbol.toStringTag,{value:"Module"}));export{o as D,S as T};
