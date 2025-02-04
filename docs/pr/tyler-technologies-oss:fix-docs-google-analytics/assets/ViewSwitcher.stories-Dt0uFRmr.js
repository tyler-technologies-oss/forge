import"./lit-element-JplMEnZc.js";import{x as p}from"./lit-html-paDGiEfB.js";import{g as c}from"./utils-DyehaB2W.js";import"./feature-detection-ONR9WHvu.js";import"./view-switcher-DNTvJD0u.js";import"./tab-bar-BluGt5BA.js";import"./state-layer-B7GOb8iB.js";import"./focus-indicator-R2otSvsR.js";import"./index-BmocOEUj.js";import{n as f,e as b}from"./ref-DJjbfkOF.js";import{s as d}from"./decorators-DOnQS6BC.js";const o="forge-view{width:100%;height:200px;border:2px dashed grey;display:flex;justify-content:center;align-items:center}forge-tab-bar{margin-bottom:12px}",t="forge-view-switcher",l={title:"Components/View Switcher",render:s=>{const r=b();function m(g){r.value!==void 0&&(r.value.index=g.detail.index)}return p`
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
    `},component:t,subcomponents:{View:"forge-view"},parameters:{actions:{disable:!0}},decorators:[d(o)],argTypes:{...c({tagName:t,exclude:["index"],controls:{animationType:{control:"select",options:["none","slide","fade"]}}})},args:{animationType:"none"}},e={};var a,i,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:"{}",...(n=(i=e.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const w=["Demo"],C=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:w,default:l},Symbol.toStringTag,{value:"Module"}));export{e as D,C as V};
