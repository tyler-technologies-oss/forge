import{E as t,x as o}from"./iframe-BJgJTvSF.js";import{g as E,s,G as S,a as L}from"./utils-BuPomTDA.js";import{o as A}from"./style-map-UupG38-a.js";import{s as I}from"./decorators-CNUCyv4p.js";import"./feature-detection-uS6p5jc8.js";import"./text-field-BnoM3v28.js";import"./base-field-PCIQc44M.js";import"./focus-indicator-IWpzSXYP.js";import"./index-CiLSBptl.js";import"./label-BSASIOtP.js";import"./button-r2EMLpWm.js";import"./state-layer-BFwsAUDA.js";import"./button-toggle-group-D5jBldBo.js";import"./checkbox-DOmkbh7U.js";import"./icon-button-DkluvO-9.js";import"./icon-B8CdcxqJ.js";import"./switch-Bt2bdQXJ.js";const _="forge-text-field{max-width:500px}",i="forge-text-field",g={title:"Components/Text Field",component:i,render:e=>{const p=L(e),P=p?A(p):t;return o`
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
        ${e.label.length?o`<label>${e.label}</label>`:t}
        ${e.textarea?o`<textarea placeholder=${e.placeholder??t} .value=${e.value}></textarea>`:o`<input .type=${e.type||"text"} placeholder=${e.placeholder??t} .value=${e.value} />`}
        ${e.supportText.length?o`<span slot="support-text">${e.supportText}</span>`:t}
        ${e.supportTextEnd.length?o`<span slot="support-text-end">${e.supportTextEnd}</span>`:t}
      </forge-text-field>
    `},decorators:[I(_)],parameters:{actions:{disable:!0}},argTypes:{...E({tagName:i,exclude:["popoverTargetElement"],controls:{labelPosition:{control:"select",options:["inline-start","inline-end","block-start","inset","none"]},labelAlignment:{control:"select",options:["default","center","baseline","start","end"]},variant:{control:"select",options:["plain","outlined","tonal","filled","raised"]},theme:{control:"select",options:[...S,"default"]},shape:{control:"select",options:["default","rounded","squared"]},density:{control:"select",options:["default","extra-small","small","medium","large","extra-large"]},supportTextInset:{control:"select",options:["start","end","both","none"]}}}),label:{control:{type:"text"}},value:{control:{type:"text"}},placeholder:{control:{type:"text"}},type:{control:"select",options:["text","password","email","number","tel","url"]},supportText:{control:{type:"text"}},supportTextEnd:{control:{type:"text"}},textarea:{control:{type:"boolean"}}},args:{label:"Label",value:"",type:"text",supportText:"",supportTextEnd:"",textarea:!1,showClear:!1,labelPosition:"inset",labelAlignment:"default",invalid:!1,required:!1,optional:!1,disabled:!1,floatLabel:!1,variant:"outlined",theme:"default",shape:"default",density:"default",dense:!1,popoverIcon:!1,popoverExpanded:!1,supportTextInset:"none"}},a={},l={...s,args:{textarea:!0}},r={...s,args:{labelPosition:"block-start"}},n={...s,args:{labelPosition:"inline-start"}};var d,c,m;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:"{}",...(m=(c=a.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var u,x,b;l.parameters={...l.parameters,docs:{...(u=l.parameters)==null?void 0:u.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    textarea: true
  }
}`,...(b=(x=l.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var f,$,y;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    labelPosition: 'block-start'
  }
}`,...(y=($=r.parameters)==null?void 0:$.docs)==null?void 0:y.source}}};var v,T,h;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    labelPosition: 'inline-start'
  }
}`,...(h=(T=n.parameters)==null?void 0:T.docs)==null?void 0:h.source}}};const C=["Demo","Textarea","LabelAbove","LabelInline"],R=Object.freeze(Object.defineProperty({__proto__:null,Demo:a,LabelAbove:r,LabelInline:n,Textarea:l,__namedExportsOrder:C,default:g},Symbol.toStringTag,{value:"Module"}));export{a as D,r as L,R as T,l as a,n as b};
