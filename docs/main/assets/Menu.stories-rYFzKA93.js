import"./lit-element-Dk2-kgKT.js";import{k as u,D as b}from"./lit-html-DZH-Jm0H.js";import{b as g,g as v,O as f}from"./utils-DY7h9u6A.js";import{s as S}from"./style-map-DxfbqtuX.js";import"./constants-DjE6emXm.js";import"./menu-fLEWlBYS.js";import"./linear-progress-CcMix19v.js";import"./list-CSSI_lb0.js";import"./popover-tgjxHp7t.js";import"./overlay-DWm8nYOy.js";import"./index-Dh0vMUMR.js";import"./skeleton-Cs99PVGD.js";import"./icon-DHpZ4R73.js";import"./button-C5f1g9CL.js";import"./focus-indicator-_fDu4ZqT.js";import"./state-layer-DTKAXCUq.js";const s="forge-menu",O={title:"Components/Menu",render:e=>{const a=g(e),d=a?S(a):b;let r=[{label:"Save",value:"save"},{label:"Edit",value:"edit"},{label:"Delete",value:"delete"}];return e.mode==="cascade"&&(r[1]={...r[1],options:[{label:"As New",value:"asNew"},{label:"Overwrite",value:"overwrite"},{label:"More",value:"more",options:[{label:"Option 1",value:"option1"},{label:"Option 2",value:"option2"},{label:"Option 3",value:"option3"}]}]}),u`
      <forge-menu
        .open=${e.open}
        .placement=${e.placement}
        .persistSelection=${e.persistSelection}
        .mode=${e.mode}
        .options=${r}
        style=${d}>
        <forge-button type="button" variant="raised">Menu</forge-button>
      </forge-menu>
    `},component:s,parameters:{actions:{disable:!0}},argTypes:{...v({tagName:s,include:["open","placement","persistSelection","mode"],controls:{placement:{control:"select",options:[...f]},persistSelection:{type:"boolean"},mode:{control:"select",options:["click","cascade"]}}})},args:{open:!1,placement:"bottom-start",persistSelection:!1,mode:"click"}},o={},t={args:{mode:"cascade"}};var n,l,i;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(i=(l=o.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};var p,m,c;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    mode: 'cascade'
  }
}`,...(c=(m=t.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};const y=["Demo","Cascading"],z=Object.freeze(Object.defineProperty({__proto__:null,Cascading:t,Demo:o,__namedExportsOrder:y,default:O},Symbol.toStringTag,{value:"Module"}));export{t as C,o as D,z as M};
