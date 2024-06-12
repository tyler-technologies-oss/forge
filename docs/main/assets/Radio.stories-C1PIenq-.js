import{x as l,T as n}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as m,g as p}from"./utils-C7XotN6S.js";import"./constants-CmaEVTEu.js";import"./label-BsLwoMJm.js";import"./index-Dh0vMUMR.js";import"./button-DqH9YfaW.js";import"./focus-indicator-CexacDHl.js";import"./state-layer-DjEoH8hN.js";import"./button-toggle-group-CSWkQPk2.js";import"./checkbox-DJehbw3q.js";import"./icon-button-Cqg7QjNu.js";import"./icon-DdNu5rAq.js";import"./switch-DYQgudGV.js";import{o as c}from"./style-map-D0ILlpbs.js";const a="forge-radio",u={title:"Components/Radio",render:e=>{const t=m(e),r=t?c(t):n;return l`
      <forge-radio
        name="radios"
        value="1"
        .labelPosition=${e.labelPosition}
        .dense=${e.dense}
        .disabled=${e.disabled}
        .defaultChecked=${e.defaultChecked}
        .readonly=${e.readonly}
        style=${r}
        >Option 1</forge-radio
      >
      <forge-radio
        name="radios"
        value="1"
        .labelPosition=${e.labelPosition}
        .dense=${e.dense}
        .disabled=${e.disabled}
        .defaultChecked=${e.defaultChecked}
        .readonly=${e.readonly}
        style=${r}
        >Option 2</forge-radio
      >
    `},component:a,parameters:{actions:{disable:!0}},argTypes:{...p({tagName:a,exclude:["value","checked","required"],controls:{labelPosition:{control:"select",options:["start","end"]}}})},args:{}},o={};var i,s,d;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:"{}",...(d=(s=o.parameters)==null?void 0:s.docs)==null?void 0:d.source}}};const f=["Demo"],D=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:f,default:u},Symbol.toStringTag,{value:"Module"}));export{o as D,D as R};
