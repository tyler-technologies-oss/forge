import{A as t,b as o}from"./iframe-Dth6_egW.js";import{o as c}from"./style-map-DzgqexjE.js";import{s as m}from"./decorators-Jd5OEl0M.js";import{s,g as u,b as x,G as b}from"./utils-CWixVBNc.js";import"./service-adapter-CffG5Lhq.js";import"./text-field-95RFwaUi.js";import"./base-field-3pt65tIH.js";import"./focus-indicator-B-dA_pS-.js";import"./label-BliWxyZI.js";import"./index-DTwfV0k0.js";import"./button-CCXfLiyX.js";import"./state-layer-DGD4bZzf.js";import"./button-toggle-group-CSQXWtK6.js";import"./checkbox-A_T5kZqn.js";import"./icon-button-CF_eJVHZ.js";import"./tyler-icons-CBdZU-Tr.js";import"./switch-OFMDq2FL.js";const f="forge-text-field{max-width:500px}",i="forge-text-field",$={title:"Components/Text Field",component:i,render:e=>{const p=x(e),d=p?c(p):t;return o`
      <forge-text-field
        .labelPosition=${e.labelPosition}
        .labelAlignment=${e.labelAlignment}
        .variant=${e.variant}
        .theme=${e.theme}
        .shape=${e.shape}
        .density=${e.density}
        .dense=${e.dense}
        .popoverIcon=${e.popoverIcon}
        .popoverExpanded=${e.popoverExpanded}
        .supportTextInset=${e.supportTextInset}
        .showClear=${e.showClear}
        .floatLabel=${e.floatLabel}
        ?optional=${e.optional}
        ?disabled=${e.disabled}
        ?required=${e.required}
        ?invalid=${e.invalid}
        style=${d}>
        ${e.label.length?o`<label>${e.label}</label>`:t}
        ${e.textarea?o`<textarea placeholder=${e.placeholder??t} .value=${e.value}></textarea>`:o`<input .type=${e.type||"text"} placeholder=${e.placeholder??t} .value=${e.value} />`}
        ${e.supportText.length?o`<span slot="support-text">${e.supportText}</span>`:t}
        ${e.supportTextEnd.length?o`<span slot="support-text-end">${e.supportTextEnd}</span>`:t}
      </forge-text-field>
    `},decorators:[m(f)],parameters:{actions:{disable:!0}},argTypes:{...u({tagName:i,exclude:["popoverTargetElement"],controls:{labelPosition:{control:"select",options:["inline-start","inline-end","block-start","inset","none"]},labelAlignment:{control:"select",options:["default","center","baseline","start","end"]},variant:{control:"select",options:["plain","outlined","tonal","filled","raised"]},theme:{control:"select",options:[...b,"default"]},shape:{control:"select",options:["default","rounded","squared"]},density:{control:"select",options:["default","extra-small","small","medium","large","extra-large"]},supportTextInset:{control:"select",options:["start","end","both","none"]}}}),label:{control:{type:"text"}},value:{control:{type:"text"}},placeholder:{control:{type:"text"}},type:{control:"select",options:["text","password","email","number","tel","url"]},supportText:{control:{type:"text"}},supportTextEnd:{control:{type:"text"}},textarea:{control:{type:"boolean"}}},args:{label:"Label",value:"",type:"text",supportText:"",supportTextEnd:"",textarea:!1,showClear:!1,labelPosition:"inset",labelAlignment:"default",invalid:!1,required:!1,optional:!1,disabled:!1,floatLabel:!1,variant:"outlined",theme:"default",shape:"default",density:"default",dense:!1,popoverIcon:!1,popoverExpanded:!1,supportTextInset:"none"}},a={},l={...s,args:{textarea:!0}},r={...s,args:{labelPosition:"block-start"}},n={...s,args:{labelPosition:"inline-start"}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    textarea: true
  }
}`,...l.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    labelPosition: 'block-start'
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    labelPosition: 'inline-start'
  }
}`,...n.parameters?.docs?.source}}};const y=["Demo","Textarea","LabelAbove","LabelInline"],j=Object.freeze(Object.defineProperty({__proto__:null,Demo:a,LabelAbove:r,LabelInline:n,Textarea:l,__namedExportsOrder:y,default:$},Symbol.toStringTag,{value:"Module"}));export{a as D,r as L,j as T,l as a,n as b};
