import"./lit-element-CgJqSpuc.js";import{x as l,E as a}from"./lit-html-paDGiEfB.js";import{a as S}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{b as P,g as E,G as A,s}from"./utils-BY68bB8K.js";import{o as L}from"./style-map-C9nPWcxA.js";import{s as O}from"./decorators-DJTA_amK.js";import"./constants-CFf81ck9.js";import"./select-dropdown-C9qRgO2U.js";import"./linear-progress-lcPOWOLB.js";import"./list-CZ9CZlmI.js";import"./popover-AeD9fFPd.js";import"./overlay-DUpFUxF7.js";import"./index-BmocOEUj.js";import"./skeleton-RPu_OG0b.js";import"./icon-FszQmWVN.js";import"./select-DArY6x1I.js";import"./label-D4PQ7L2z.js";import"./button-CVZhEkBO.js";import"./focus-indicator-DesOnyyZ.js";import"./state-layer-COSQHCpS.js";import"./button-toggle-group-C7b9_lqU.js";import"./checkbox-BavEIv2Q.js";import"./icon-button-CSqhF-TJ.js";import"./switch-DTtl0JRG.js";const I="forge-select{max-width:256px}",i="forge-select",_=S("change"),M={title:"Components/Select",component:i,subcomponents:{"Forge Option":"forge-option","Forge Option Group":"forge-option-group"},render:e=>{const p=P(e),v=p?L(p):a;return l`
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
        ${e.supportText.length?l`<span slot="support-text">${e.supportText}</span>`:a}
        ${e.supportTextEnd.length?l`<span slot="support-text-end">${e.supportTextEnd}</span>`:a}
      </forge-text-field>
    `},decorators:[O(I)],argTypes:{...E({tagName:i,exclude:["popoverTargetElement","popoverIcon","popoverExpanded","value","selectedIndex","options","optionBuilder","selectedTextBuilder","popupElement","beforeValueChange"],controls:{labelPosition:{control:"select",options:["inline-start","inline-end","block-start","inset","none"]},labelAlignment:{control:"select",options:["default","center","baseline","start","end"]},variant:{control:"select",options:["plain","outlined","tonal","filled","raised"]},theme:{control:"select",options:[...A,"default"]},shape:{control:"select",options:["default","rounded","squared"]},density:{control:"select",options:["default","extra-small","small","medium","large","extra-large"]},supportTextInset:{control:"select",options:["start","end","both","none"]}}}),supportText:{control:{type:"text"}},supportTextEnd:{control:{type:"text"}}},args:{label:"Label",placeholder:"",multiple:!1,labelPosition:"inset",labelAlignment:"default",variant:"outlined",theme:"default",shape:"default",density:"default",dense:!1,supportText:"",supportTextEnd:"",invalid:!1,required:!1,optional:!1,disabled:!1,floatLabel:!1,supportTextInset:"none",open:!1}},t={},o={...s,args:{labelPosition:"block-start"}},n={...s,args:{labelPosition:"inline-start"}},r={...s,args:{multiple:!0}};var c,m,d;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:"{}",...(d=(m=t.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var u,f,b;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
