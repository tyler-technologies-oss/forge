import"./lit-element-CgJqSpuc.js";import{x as u,E as b}from"./lit-html-paDGiEfB.js";import{b as g,g as v,O as f}from"./utils-B8wO9gy3.js";import{o as S}from"./style-map-C9nPWcxA.js";import"./constants-CFf81ck9.js";import"./menu-CNDrq6h_.js";import"./linear-progress-DKZR2TB_.js";import"./list-CZ9CZlmI.js";import"./popover-CFhwSXnG.js";import"./overlay-DUpFUxF7.js";import"./index-BmocOEUj.js";import"./skeleton-RPu_OG0b.js";import"./icon-FszQmWVN.js";import"./button-CVZhEkBO.js";import"./focus-indicator-DesOnyyZ.js";import"./state-layer-COSQHCpS.js";const s="forge-menu",O={title:"Components/Menu",render:e=>{const a=g(e),d=a?S(a):b;let r=[{label:"Save",value:"save"},{label:"Edit",value:"edit"},{label:"Delete",value:"delete"}];return e.mode==="cascade"&&(r[1]={...r[1],options:[{label:"As New",value:"asNew"},{label:"Overwrite",value:"overwrite"},{label:"More",value:"more",options:[{label:"Option 1",value:"option1"},{label:"Option 2",value:"option2"},{label:"Option 3",value:"option3"}]}]}),u`
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
