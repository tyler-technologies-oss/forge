import{A as n,b as p}from"./iframe-DhPPATOI.js";import{o as c}from"./style-map-CcP_kdqL.js";import{g as i,b as m,O as l,e as f}from"./utils-BUEgyQuR.js";import"./service-adapter-gy1PbA1l.js";import{T as t}from"./tooltip-BJ-I3FD9.js";import"./overlay-DnA59UKB.js";import"./button-D5tK2bf-.js";const s="forge-tooltip",u={title:"Components/Tooltip",render:e=>{const r=m(e),a=r?c(r):n;return p`
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
    `},component:s,parameters:{layout:"centered",actions:{disable:!0}},argTypes:{...i({tagName:s,exclude:["anchor","anchorElement","target","position","boundary","boundaryElement"],controls:{type:{control:"select",options:["presentation","label","description"]},placement:{control:"select",options:l},flip:{control:"select",options:f},triggerType:{control:"multi-select",options:["hover","longpress","focus"]},fallbackPlacements:{control:"multi-select",options:l}}})},args:{open:!1,type:t.defaults.TYPE,placement:t.defaults.PLACEMENT,delay:t.defaults.DELAY,offset:t.defaults.OFFSET,flip:t.defaults.FLIP,triggerType:t.defaults.TRIGGER_TYPES}},o={};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};const d=["Demo"],_=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:d,default:u},Symbol.toStringTag,{value:"Module"}));export{o as D,_ as T};
