import{E as t,x as o}from"./iframe-DjbInO_b.js";import{g as c,s,G as m,a as u}from"./utils-CW5S_tZJ.js";import{o as x}from"./style-map-CmNzl15F.js";import{s as b}from"./decorators-9mZgX7CQ.js";import"./service-adapter-CffG5Lhq.js";import"./text-field-DdpU3jHv.js";import"./base-field-CMrVGdu7.js";import"./focus-indicator-Cv_1OuCy.js";import"./label-ZCcUmsQy.js";import"./index-5CPwzmQS.js";import"./button-tJdHvmw4.js";import"./state-layer-BEEsPoZf.js";import"./button-toggle-group-BMLnQmLS.js";import"./checkbox-BXz5TMrh.js";import"./icon-button-TbubEjoj.js";import"./icon-8E01u_jy.js";import"./switch-D4rjtgfb.js";const f="forge-text-field{max-width:500px}",i="forge-text-field",$={title:"Components/Text Field",component:i,render:e=>{const p=u(e),d=p?x(p):t;return o`
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
    `},decorators:[b(f)],parameters:{actions:{disable:!0}},argTypes:{...c({tagName:i,exclude:["popoverTargetElement"],controls:{labelPosition:{control:"select",options:["inline-start","inline-end","block-start","inset","none"]},labelAlignment:{control:"select",options:["default","center","baseline","start","end"]},variant:{control:"select",options:["plain","outlined","tonal","filled","raised"]},theme:{control:"select",options:[...m,"default"]},shape:{control:"select",options:["default","rounded","squared"]},density:{control:"select",options:["default","extra-small","small","medium","large","extra-large"]},supportTextInset:{control:"select",options:["start","end","both","none"]}}}),label:{control:{type:"text"}},value:{control:{type:"text"}},placeholder:{control:{type:"text"}},type:{control:"select",options:["text","password","email","number","tel","url"]},supportText:{control:{type:"text"}},supportTextEnd:{control:{type:"text"}},textarea:{control:{type:"boolean"}}},args:{label:"Label",value:"",type:"text",supportText:"",supportTextEnd:"",textarea:!1,showClear:!1,labelPosition:"inset",labelAlignment:"default",invalid:!1,required:!1,optional:!1,disabled:!1,floatLabel:!1,variant:"outlined",theme:"default",shape:"default",density:"default",dense:!1,popoverIcon:!1,popoverExpanded:!1,supportTextInset:"none"}},a={},l={...s,args:{textarea:!0}},r={...s,args:{labelPosition:"block-start"}},n={...s,args:{labelPosition:"inline-start"}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
