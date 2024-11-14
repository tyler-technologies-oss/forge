import"./lit-element-Dk2-kgKT.js";import{k as l,D as s}from"./lit-html-DZH-Jm0H.js";import{a as S}from"./chunk-454WOBUV-CM0pFb8Z.js";import{b as P,g as A,G as E,s as a}from"./utils-BE6XR6X1.js";import{s as L}from"./style-map-DxfbqtuX.js";import{s as O}from"./decorators-DvEJi2JG.js";import"./constants-DjE6emXm.js";import"./select-dropdown-D7YpIRhj.js";import"./linear-progress-CcMix19v.js";import"./list-ePbvhvCk.js";import"./popover-ClXodM0C.js";import"./overlay-BjQy6-wl.js";import"./index-Dh0vMUMR.js";import"./skeleton-Cs99PVGD.js";import"./icon-DHpZ4R73.js";import"./select-C2U7ILen.js";import"./label-C3K2Uabu.js";import"./button-CbYZUGFb.js";import"./focus-indicator-_fDu4ZqT.js";import"./state-layer-DTKAXCUq.js";import"./button-toggle-group-BJ7gYCrU.js";import"./checkbox-DohAEIBZ.js";import"./icon-button-Bwf4zXUE.js";import"./switch-BL3gYf9s.js";const I="forge-select{max-width:256px}",i="forge-select",_=S("change"),k={title:"Components/Select",component:i,subcomponents:{"Forge Option":"forge-option","Forge Option Group":"forge-option-group"},render:e=>{const p=P(e),v=p?L(p):s;return l`
      <forge-select
        .label=${e.label}
        .labelPosition=${e.labelPosition}
        .labelAlignment=${e.labelAlignment}
        .variant=${e.variant}
        .theme=${e.theme}
        .shape=${e.shape}
        .density=${e.density}
        .dense=${e.dense}
        .supportTextInset=${e.supportTextInset}
        .floatLabel=${e.floatLabel}
        .placeholder=${e.placeholder}
        .multiple=${e.multiple}
        .open=${e.open}
        ?optional=${e.optional}
        ?disabled=${e.disabled}
        ?required=${e.required}
        ?invalid=${e.invalid}
        style=${v}
        @change=${_}>
        <forge-option value="1">Option 1</forge-option>
        <forge-option value="2">Option 2</forge-option>
        <forge-option value="3">Option 3</forge-option>
        ${e.supportText.length?l`<span slot="support-text">${e.supportText}</span>`:s}
        ${e.supportTextEnd.length?l`<span slot="support-text-end">${e.supportTextEnd}</span>`:s}
      </forge-text-field>
    `},decorators:[O(I)],argTypes:{...A({tagName:i,exclude:["popoverTargetElement","popoverIcon","popoverExpanded","value","selectedIndex","options","optionBuilder","selectedTextBuilder","popupElement","beforeValueChange"],controls:{labelPosition:{control:"select",options:["inline-start","inline-end","block-start","inset","none"]},labelAlignment:{control:"select",options:["default","center","baseline","start","end"]},variant:{control:"select",options:["plain","outlined","tonal","filled","raised"]},theme:{control:"select",options:[...E,"default"]},shape:{control:"select",options:["default","rounded","squared"]},density:{control:"select",options:["default","extra-small","small","medium","large","extra-large"]},supportTextInset:{control:"select",options:["start","end","both","none"]}}}),supportText:{control:{type:"text"}},supportTextEnd:{control:{type:"text"}}},args:{label:"Label",placeholder:"",multiple:!1,labelPosition:"inset",labelAlignment:"default",variant:"outlined",theme:"default",shape:"default",density:"default",dense:!1,supportText:"",supportTextEnd:"",invalid:!1,required:!1,optional:!1,disabled:!1,floatLabel:!1,supportTextInset:"none",open:!1}},t={},o={...a,args:{labelPosition:"block-start"}},n={...a,args:{labelPosition:"inline-start"}},r={...a,args:{multiple:!0}};var c,m,d;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:"{}",...(d=(m=t.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var u,f,b;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    labelPosition: 'block-start'
  }
}`,...(b=(f=o.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var g,x,$;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    labelPosition: 'inline-start'
  }
}`,...($=(x=n.parameters)==null?void 0:x.docs)==null?void 0:$.source}}};var h,y,T;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    multiple: true
  }
}`,...(T=(y=r.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};const M=["Demo","LabelAbove","LabelInline","Multiple"],ne=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,LabelAbove:o,LabelInline:n,Multiple:r,__namedExportsOrder:M,default:k},Symbol.toStringTag,{value:"Module"}));export{t as D,o as L,r as M,ne as S,n as a};
