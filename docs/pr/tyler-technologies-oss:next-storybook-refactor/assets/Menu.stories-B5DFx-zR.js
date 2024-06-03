import{x as m,T as l}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{d as c,g as u,O as d}from"./constants-CYeMfgsl.js";import"./menu-CYy-Hi3i.js";import"./linear-progress-Cj7EgNE2.js";import"./list-AKznUQR6.js";import"./popover-BYOA7f1d.js";import"./overlay-Dg3gyJj4.js";import"./index-Dh0vMUMR.js";import"./skeleton-DlZvZ332.js";import"./icon-Cl4LFQNy.js";import"./button-Cmiqf2xE.js";import"./focus-indicator-Cam4qI9V.js";import"./state-layer-02o5UE3p.js";import{o as b}from"./style-map-D0ILlpbs.js";const s="forge-menu",f={title:"Components/Menu",render:e=>{const r=c(e),p=r?b(r):l;let o=[{label:"Edit",value:"edit"},{label:"Delete",value:"delete"}];return e.mode==="cascade"&&(o[0]={...o[0],options:[{label:"As New",value:"asNew"},{label:"Overwrite",value:"overwrite"}]}),m`
      <forge-menu
        .open=${e.open}
        .placement=${e.placement}
        .persistSelection=${e.persistSelection}
        .mode=${e.mode}
        .options=${o}
        style=${p}>
        <forge-button type="button" variant="raised">Menu</forge-button>
      </forge-menu>
    `},component:s,parameters:{actions:{disable:!0}},argTypes:{...u({tagName:s,include:["open","placement","persistSelection","mode"],controls:{placement:{control:"select",options:[...d]},persistSelection:{type:"boolean"},mode:{control:"select",options:["click","cascade"]}}})},args:{}},t={};var n,a,i;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(i=(a=t.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};const g=["Demo"],P=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:g,default:f},Symbol.toStringTag,{value:"Module"}));export{t as D,P as M};
