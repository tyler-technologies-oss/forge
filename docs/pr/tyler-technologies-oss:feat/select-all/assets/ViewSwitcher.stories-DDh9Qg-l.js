import{x as s}from"./iframe-C2OLFiEs.js";import{g as m}from"./utils-Cqbxq2Mi.js";import"./service-adapter-CffG5Lhq.js";import"./view-switcher-BUh552L0.js";import"./tab-bar-BSuMMnJ8.js";import"./state-layer-gAgMwMHF.js";import"./focus-indicator-BfYyibdg.js";import{n as g,e as c}from"./ref-ColnIQm7.js";import{s as f}from"./decorators-BHKRAWR6.js";const o="forge-view{width:100%;height:200px;border:2px dashed grey;display:flex;justify-content:center;align-items:center}forge-tab-bar{margin-bottom:12px}",t="forge-view-switcher",p={title:"Components/View Switcher",render:a=>{const r=c();function i(n){r.value!==void 0&&(r.value.index=n.detail.index)}return s`
      <forge-tab-bar active-tab="0" @forge-tab-bar-change=${i}>
        <forge-tab>Tab 1</forge-tab>
        <forge-tab>Tab 2</forge-tab>
        <forge-tab>Tab 3</forge-tab>
      </forge-tab-bar>
      <forge-view-switcher ${g(r)} .animationType=${a.animationType} style=${o}>
        <forge-view name="view1" .selected=${!0}>View 1</forge-view>
        <forge-view name="view2">View 2</forge-view>
        <forge-view name="view3">View 3</forge-view>
      </forge-view-switcher>
    `},component:t,subcomponents:{View:"forge-view"},parameters:{actions:{disable:!0}},decorators:[f(o)],argTypes:{...m({tagName:t,exclude:["index"],controls:{animationType:{control:"select",options:["none","slide","fade"]}}})},args:{animationType:"none"}},e={};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};const b=["Demo"],S=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:b,default:p},Symbol.toStringTag,{value:"Module"}));export{e as D,S as V};
