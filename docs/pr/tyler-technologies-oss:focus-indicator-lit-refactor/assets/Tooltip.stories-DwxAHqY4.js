import{E as m,x as f}from"./iframe-B36M3axR.js";import{o as u}from"./style-map-Df0nJbme.js";import{g as d,O as s,e as T,a as y}from"./utils-JcRLWv5w.js";import"./service-adapter-BykFeYYZ.js";import{T as t}from"./tooltip-CRaofu57.js";import"./overlay-DWLd4_Vp.js";import"./button-C9kCF3a-.js";import"./focus-indicator-u5r21UtO.js";import"./state-layer-BRTtEqto.js";const a="forge-tooltip",g={title:"Components/Tooltip",render:e=>{var l;const r=y(e),c=r?u(r):m;return f`
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
    `},component:a,parameters:{layout:"centered",actions:{disable:!0}},argTypes:{...d({tagName:a,exclude:["anchor","anchorElement","target","position","boundary","boundaryElement"],controls:{type:{control:"select",options:["presentation","label","description"]},placement:{control:"select",options:s},flip:{control:"select",options:T},triggerType:{control:"multi-select",options:["hover","longpress","focus"]},fallbackPlacements:{control:"multi-select",options:s}}})},args:{open:!1,type:t.defaults.TYPE,placement:t.defaults.PLACEMENT,delay:t.defaults.DELAY,offset:t.defaults.OFFSET,flip:t.defaults.FLIP,triggerType:t.defaults.TRIGGER_TYPES}},o={};var n,p,i;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(i=(p=o.parameters)==null?void 0:p.docs)==null?void 0:i.source}}};const b=["Demo"],C=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:b,default:g},Symbol.toStringTag,{value:"Module"}));export{o as D,C as T};
