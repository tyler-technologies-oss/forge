import{x as c}from"./iframe-D16yKRLu.js";import{g as p}from"./utils-CwQ2mEzo.js";import"./feature-detection-CY6TVbRZ.js";import"./view-switcher-CMdWoHU0.js";import"./tab-bar-DJS5oYWT.js";import"./state-layer-BVsNuAhs.js";import"./focus-indicator-Cgfkaa3d.js";import"./index-CiLSBptl.js";import{n as f,e as b}from"./ref-C_aqJkpv.js";import{s as d}from"./decorators-B6_piezP.js";const o="forge-view{width:100%;height:200px;border:2px dashed grey;display:flex;justify-content:center;align-items:center}forge-tab-bar{margin-bottom:12px}",t="forge-view-switcher",l={title:"Components/View Switcher",render:s=>{const r=b();function m(g){r.value!==void 0&&(r.value.index=g.detail.index)}return c`
      <forge-tab-bar active-tab="0" @forge-tab-bar-change=${m}>
        <forge-tab>Tab 1</forge-tab>
        <forge-tab>Tab 2</forge-tab>
        <forge-tab>Tab 3</forge-tab>
      </forge-tab-bar>
      <forge-view-switcher ${f(r)} .animationType=${s.animationType} style=${o}>
        <forge-view name="view1" .selected=${!0}>View 1</forge-view>
        <forge-view name="view2">View 2</forge-view>
        <forge-view name="view3">View 3</forge-view>
      </forge-view-switcher>
    `},component:t,subcomponents:{View:"forge-view"},parameters:{actions:{disable:!0}},decorators:[d(o)],argTypes:{...p({tagName:t,exclude:["index"],controls:{animationType:{control:"select",options:["none","slide","fade"]}}})},args:{animationType:"none"}},e={};var a,i,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:"{}",...(n=(i=e.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const w=["Demo"],j=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:w,default:l},Symbol.toStringTag,{value:"Module"}));export{e as D,j as V};
