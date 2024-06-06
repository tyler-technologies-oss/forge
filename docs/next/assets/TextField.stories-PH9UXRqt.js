import{x as t,T as o}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as S,g as E,G as L,s}from"./utils-CpphmWLJ.js";import{o as A}from"./style-map-D0ILlpbs.js";import{s as I}from"./decorators-B79PnA5z.js";import"./constants-BMnwgo1j.js";import"./text-field-piDMR7NH.js";import"./base-field-Db0ByNro.js";import"./focus-indicator-WHVXAnYX.js";import"./index-Dh0vMUMR.js";import"./label-Ba8gSJXo.js";import"./button-DKp5JmaL.js";import"./state-layer-DfBT0h4a.js";import"./button-toggle-group-CUV8xQR0.js";import"./checkbox-BnMMH_z2.js";import"./icon-button-VlM_yzEM.js";import"./icon-Sxf3JEPH.js";import"./switch-CvJdSirX.js";const _="forge-text-field{max-width:500px}",i="forge-text-field",g={title:"Components/Text Field",component:i,render:e=>{const p=S(e),P=p?A(p):o;return t`
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
        style=${P}>
        ${e.label.length?t`<label>${e.label}</label>`:o}
        ${e.textarea?t`<textarea placeholder=${e.placeholder??o} .value=${e.value}></textarea>`:t`<input .type=${e.type||"text"} placeholder=${e.placeholder??o} .value=${e.value}>`}
        ${e.supportText.length?t`<span slot="support-text">${e.supportText}</span>`:o}
        ${e.supportTextEnd.length?t`<span slot="support-text-end">${e.supportTextEnd}</span>`:o}
      </forge-text-field>
    `},decorators:[I(_)],parameters:{actions:{disable:!0}},argTypes:{...E({tagName:i,exclude:["popoverTargetElement"],controls:{labelPosition:{control:"select",options:["inline-start","inline-end","block-start","inset","none"]},labelAlignment:{control:"select",options:["default","center","baseline","start","end"]},variant:{control:"select",options:["plain","outlined","tonal","filled","raised"]},theme:{control:"select",options:[...L,"default"]},shape:{control:"select",options:["default","rounded","squared"]},density:{control:"select",options:["default","extra-small","small","medium","large","extra-large"]},supportTextInset:{control:"select",options:["start","end","both","none"]}}}),label:{control:{type:"text"}},value:{control:{type:"text"}},placeholder:{control:{type:"text"}},type:{control:"select",options:["text","password","email","number","tel","url"]},supportText:{control:{type:"text"}},supportTextEnd:{control:{type:"text"}},textarea:{control:{type:"boolean"}}},args:{label:"Label",value:"",type:"text",supportText:"",supportTextEnd:"",textarea:!1,showClear:!1,labelPosition:"inset",labelAlignment:"default",invalid:!1,required:!1,optional:!1,disabled:!1,floatLabel:!1,variant:"outlined",theme:"default",shape:"default",density:"default",dense:!1,popoverIcon:!1,popoverExpanded:!1,supportTextInset:"none"}},a={},l={...s,args:{textarea:!0}},r={...s,args:{labelPosition:"block-start"}},n={...s,args:{labelPosition:"inline-start"}};var d,c,m;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:"{}",...(m=(c=a.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var u,x,b;l.parameters={...l.parameters,docs:{...(u=l.parameters)==null?void 0:u.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    textarea: true
  }
}`,...(b=(x=l.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var f,$,y;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    labelPosition: 'block-start'
  }
}`,...(y=($=r.parameters)==null?void 0:$.docs)==null?void 0:y.source}}};var T,v,h;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    labelPosition: 'inline-start'
  }
}`,...(h=(v=n.parameters)==null?void 0:v.docs)==null?void 0:h.source}}};const C=["Demo","Textarea","LabelAbove","LabelInline"],U=Object.freeze(Object.defineProperty({__proto__:null,Demo:a,LabelAbove:r,LabelInline:n,Textarea:l,__namedExportsOrder:C,default:g},Symbol.toStringTag,{value:"Module"}));export{a as D,r as L,U as T,l as a,n as b};
