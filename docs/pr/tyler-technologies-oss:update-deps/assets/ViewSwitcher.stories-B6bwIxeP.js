import{x as s}from"./iframe-BciiVb0K.js";import{g as m}from"./utils-D7XrLKwY.js";import"./feature-detection-BwPJgXni.js";import"./view-switcher-C2ZLZ4UU.js";import"./tab-bar-DdL2OpRI.js";import"./state-layer-CLjAHnoF.js";import"./focus-indicator-B9KMEBVK.js";import"./index-5CPwzmQS.js";import{n as g,e as c}from"./ref-D3ww8A08.js";import{s as p}from"./decorators-Bjcxn9ch.js";const o="forge-view{width:100%;height:200px;border:2px dashed grey;display:flex;justify-content:center;align-items:center}forge-tab-bar{margin-bottom:12px}",t="forge-view-switcher",f={title:"Components/View Switcher",render:a=>{const r=c();function i(n){r.value!==void 0&&(r.value.index=n.detail.index)}return s`
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
    `},component:t,subcomponents:{View:"forge-view"},parameters:{actions:{disable:!0}},decorators:[p(o)],argTypes:{...m({tagName:t,exclude:["index"],controls:{animationType:{control:"select",options:["none","slide","fade"]}}})},args:{animationType:"none"}},e={};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};const b=["Demo"],V=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:b,default:f},Symbol.toStringTag,{value:"Module"}));export{e as D,V};
