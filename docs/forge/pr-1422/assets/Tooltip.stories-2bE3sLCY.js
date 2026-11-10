import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,o as r,t as i}from"./lit-html-SpIZ5SkX.js";import{i as a,l as o,m as s,r as c,s as l}from"./utils-C90un5XN.js";import{r as u,t as d}from"./style-map-C_WKUe4Y.js";import{t as f}from"./button-6zjUplxX.js";import{a as p}from"./tooltip-d_L1ineX.js";import{t as m}from"./tooltip-COSkiEPb.js";var h=t({Demo:()=>v,__namedExportsOrder:()=>y,default:()=>_}),g,_,v,y;function b(){return(b=e((()=>{r(),d(),s(),m(),f(),g=`forge-tooltip`,_={title:`Components/Tooltip`,render:e=>{let t=o(e),r=t?u(t):i;return n`
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
        style=${r}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </forge-tooltip>
    `},component:g,parameters:{layout:`centered`,actions:{disable:!0}},argTypes:{...l({tagName:g,exclude:[`anchor`,`anchorElement`,`target`,`position`,`boundary`,`boundaryElement`],controls:{type:{control:`select`,options:[`presentation`,`label`,`description`]},placement:{control:`select`,options:a},flip:{control:`select`,options:c},triggerType:{control:`multi-select`,options:[`hover`,`longpress`,`focus`]},fallbackPlacements:{control:`multi-select`,options:a}}})},args:{open:!1,type:p.defaults.TYPE,placement:p.defaults.PLACEMENT,delay:p.defaults.DELAY,offset:p.defaults.OFFSET,flip:p.defaults.FLIP,triggerType:p.defaults.TRIGGER_TYPES}},v={},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{}`,...v.parameters?.docs?.source}}},y=[`Demo`]})))()}export{h as n,b as r,v as t};