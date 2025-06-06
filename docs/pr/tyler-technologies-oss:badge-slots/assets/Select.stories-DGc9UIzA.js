import"./lit-element-BuSzPo2N.js";import{E as l,x as a}from"./lit-html-Ox1a2bD1.js";import{a as S}from"./index-B-lxVbXh.js";import{g as P,s,G as E,b as A}from"./utils-C9ubTmun.js";import{o as L}from"./style-map-CeIg-cuG.js";import{s as O}from"./decorators-CiKOYuay.js";import"./feature-detection-CY6TVbRZ.js";import"./select-dropdown-CZdSzMMv.js";import"./linear-progress-CJb_8skk.js";import"./list-DCzhHkfW.js";import"./popover-Bqa_o4zH.js";import"./overlay-D__9laOM.js";import"./index-CiLSBptl.js";import"./skeleton-DocRecw2.js";import"./icon-Bqgt-0wI.js";import"./select-Deij91Nn.js";import"./label-BM0pESju.js";import"./button-CC-L5W3b.js";import"./focus-indicator-Cgfkaa3d.js";import"./state-layer-BVsNuAhs.js";import"./button-toggle-group-5BDyeLck.js";import"./checkbox-CF9fzMIR.js";import"./icon-button-BkG6pY8m.js";import"./switch-ZI6WyDhE.js";const I="forge-select{max-width:256px}",i="forge-select",_=S("change"),M={title:"Components/Select",component:i,subcomponents:{"Forge Option":"forge-option","Forge Option Group":"forge-option-group"},render:e=>{const p=A(e),v=p?L(p):l;return a`
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
        ${e.supportText.length?a`<span slot="support-text">${e.supportText}</span>`:l}
        ${e.supportTextEnd.length?a`<span slot="support-text-end">${e.supportTextEnd}</span>`:l}
      </forge-text-field>
    `},decorators:[O(I)],argTypes:{...P({tagName:i,exclude:["popoverTargetElement","popoverIcon","popoverExpanded","value","selectedIndex","options","optionBuilder","selectedTextBuilder","popupElement","beforeValueChange"],controls:{labelPosition:{control:"select",options:["inline-start","inline-end","block-start","inset","none"]},labelAlignment:{control:"select",options:["default","center","baseline","start","end"]},variant:{control:"select",options:["plain","outlined","tonal","filled","raised"]},theme:{control:"select",options:[...E,"default"]},shape:{control:"select",options:["default","rounded","squared"]},density:{control:"select",options:["default","extra-small","small","medium","large","extra-large"]},supportTextInset:{control:"select",options:["start","end","both","none"]}}}),supportText:{control:{type:"text"}},supportTextEnd:{control:{type:"text"}}},args:{label:"Label",placeholder:"",multiple:!1,labelPosition:"inset",labelAlignment:"default",variant:"outlined",theme:"default",shape:"default",density:"default",dense:!1,supportText:"",supportTextEnd:"",invalid:!1,required:!1,optional:!1,disabled:!1,floatLabel:!1,supportTextInset:"none",open:!1}},t={},o={...s,args:{labelPosition:"block-start"}},n={...s,args:{labelPosition:"inline-start"}},r={...s,args:{multiple:!0}};var c,m,d;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:"{}",...(d=(m=t.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var u,f,b;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(T=(y=r.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};const q=["Demo","LabelAbove","LabelInline","Multiple"],ne=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,LabelAbove:o,LabelInline:n,Multiple:r,__namedExportsOrder:q,default:M},Symbol.toStringTag,{value:"Module"}));export{t as D,o as L,r as M,ne as S,n as a};
