import{x as c,o as m,A as f}from"./style-map-D-TaQ64I.js";import{g as d,a as u,O as T,b as g}from"./constants-vbOiYBmn.js";import"./button-3t8_hLpm.js";import"./state-layer-CPaTwDMH.js";import"./index-JD1MY5Ff.js";import{T as t}from"./tooltip-DhR9W3Dg.js";import"./with-longpress-listener-JG5bxshQ.js";const s="forge-tooltip",y={title:"Components/Tooltip",render:e=>{var l;const r=d(e),i=r?m(r):f;return c`
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
    `},component:s,parameters:{layout:"centered",actions:{disable:!0}},argTypes:{...u({tagName:s,exclude:["anchor","anchorElement","target","position","boundary","boundaryElement"],controls:{type:{control:"select",options:["presentation","label","description"]},flip:{control:"select",options:T},triggerType:{control:"multi-select",options:["hover","longpress","focus"]},fallbackPlacements:{control:"multi-select",options:g}}})},args:{open:!1,type:t.defaults.TYPE,placement:t.defaults.PLACEMENT,delay:t.defaults.DELAY,offset:t.defaults.OFFSET,flip:t.defaults.FLIP,triggerType:t.defaults.TRIGGER_TYPES}},o={};var a,n,p;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:"{}",...(p=(n=o.parameters)==null?void 0:n.docs)==null?void 0:p.source}}};const b=["Demo"],$=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:b,default:y},Symbol.toStringTag,{value:"Module"}));export{o as D,$ as T};
