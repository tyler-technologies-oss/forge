import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{p as r}from"./iframe-CuAvrKn_.js";import{m as i,s as a}from"./utils-Cppiha4b.js";import{n as o,t as s}from"./decorators-v5gVx1cJ.js";import{i as c,n as l,t as u}from"./ref-UkViCfGj.js";import{t as d}from"./tabs-BAiFDT69.js";import{n as f,t as p}from"./view-switcher-ByX9l4aS.js";var m;function h(){return(h=e((()=>{m=`forge-view{border:2px dashed gray;justify-content:center;align-items:center;width:100%;height:200px;display:flex}forge-tab-bar{margin-bottom:12px}`})))()}var g=t({Demo:()=>y,__namedExportsOrder:()=>b,default:()=>v}),_,v,y,b;function x(){return(x=e((()=>{r(),i(),p(),f(),d(),u(),h(),s(),_=`forge-view-switcher`,v={title:`Components/View Switcher`,render:e=>{let t=l();function r(e){t.value!==void 0&&(t.value.index=e.detail.index)}return n`
      <forge-tab-bar active-tab="0" @forge-tab-bar-change=${r}>
        <forge-tab>Tab 1</forge-tab>
        <forge-tab>Tab 2</forge-tab>
        <forge-tab>Tab 3</forge-tab>
      </forge-tab-bar>
      <forge-view-switcher ${c(t)} .animationType=${e.animationType} style=${m}>
        <forge-view name="view1" .selected=${!0}>View 1</forge-view>
        <forge-view name="view2">View 2</forge-view>
        <forge-view name="view3">View 3</forge-view>
      </forge-view-switcher>
    `},component:_,subcomponents:{View:`forge-view`},parameters:{actions:{disable:!0}},decorators:[o(m)],argTypes:{...a({tagName:_,exclude:[`index`],controls:{animationType:{control:`select`,options:[`none`,`slide`,`fade`]}}})},args:{animationType:`none`}},y={},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{}`,...y.parameters?.docs?.source}}},b=[`Demo`]})))()}export{g as n,x as r,y as t};