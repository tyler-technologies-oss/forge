import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,o as r,t as i}from"./lit-html-SpIZ5SkX.js";import{l as a,m as o,n as s,s as c}from"./utils-BifgMLEM.js";import{o as l,t as u}from"./icon-BDzt98o-.js";import{Gt as d,_ as f,t as p}from"./tyler-icons-CLXzO0Q_.js";import{t as m}from"./menu-DVlR3rlP.js";import{r as h,t as g}from"./style-map-C_WKUe4Y.js";import{n as _,t as v}from"./split-button-COn1qLId.js";var y=t({Demo:()=>S,__namedExportsOrder:()=>C,default:()=>x}),b,x,S,C;function w(){return(w=e((()=>{u(),v(),p(),r(),g(),o(),m(),l.define([d,f]),b=`forge-split-button`,x={title:`Components/Split Button`,render:e=>{let t=[{label:`Schedule send`,value:`schedule`,leadingIcon:d.name,leadingIconType:`component`},{label:`Save draft`,value:`draft`,leadingIcon:f.name,leadingIconType:`component`}],r=a(e);return n`
      <forge-split-button
        variant=${e.variant}
        theme=${e.theme}
        ?disabled=${e.disabled}
        ?dense=${e.dense}
        ?pill=${e.pill}
        style=${r?h(r):i}>
        <forge-button style="min-width: 100px;">Send</forge-button>
        <forge-menu .options=${t}>
          <forge-button aria-label="Show menu" popover-icon></forge-button>
        </forge-menu>
      </forge-split-button>
    `},component:b,parameters:{actions:{disable:!0}},argTypes:{...c({tagName:b,controls:{variant:{control:{type:`select`},options:[`text`,`outlined`,`filled`,`raised`]},theme:{control:{type:`select`},options:s}}})},args:{variant:`raised`,theme:_.defaults.DEFAULT_THEME,disabled:!1,dense:!1,pill:!1}},S={},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{}`,...S.parameters?.docs?.source}}},C=[`Demo`]})))()}export{y as n,w as r,S as t};