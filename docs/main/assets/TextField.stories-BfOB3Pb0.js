import"./lit-element-Dk2-kgKT.js";import{k as t,D as o}from"./lit-html-DZH-Jm0H.js";import{b as S,g as E,G as L,s as n}from"./utils-DY7h9u6A.js";import{s as A}from"./style-map-DxfbqtuX.js";import{s as I}from"./decorators-DvEJi2JG.js";import"./constants-DjE6emXm.js";import"./text-field-DqH-bXsA.js";import"./base-field-BFFwcPMe.js";import"./focus-indicator-_fDu4ZqT.js";import"./index-Dh0vMUMR.js";import"./label-DfCsGThT.js";import"./button-C5f1g9CL.js";import"./state-layer-DTKAXCUq.js";import"./button-toggle-group-BJ7gYCrU.js";import"./checkbox-D4QiEHwm.js";import"./icon-button-XdSjYqUR.js";import"./icon-DHpZ4R73.js";import"./switch-BteFxJWF.js";const _="forge-text-field{max-width:500px}",i="forge-text-field",g={title:"Components/Text Field",component:i,render:e=>{const p=S(e),P=p?A(p):o;return t`
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
        ${e.textarea?t`<textarea placeholder=${e.placeholder??o} .value=${e.value}></textarea>`:t`<input .type=${e.type||"text"} placeholder=${e.placeholder??o} .value=${e.value} />`}
        ${e.supportText.length?t`<span slot="support-text">${e.supportText}</span>`:o}
        ${e.supportTextEnd.length?t`<span slot="support-text-end">${e.supportTextEnd}</span>`:o}
      </forge-text-field>
    `},decorators:[I(_)],parameters:{actions:{disable:!0}},argTypes:{...E({tagName:i,exclude:["popoverTargetElement"],controls:{labelPosition:{control:"select",options:["inline-start","inline-end","block-start","inset","none"]},labelAlignment:{control:"select",options:["default","center","baseline","start","end"]},variant:{control:"select",options:["plain","outlined","tonal","filled","raised"]},theme:{control:"select",options:[...L,"default"]},shape:{control:"select",options:["default","rounded","squared"]},density:{control:"select",options:["default","extra-small","small","medium","large","extra-large"]},supportTextInset:{control:"select",options:["start","end","both","none"]}}}),label:{control:{type:"text"}},value:{control:{type:"text"}},placeholder:{control:{type:"text"}},type:{control:"select",options:["text","password","email","number","tel","url"]},supportText:{control:{type:"text"}},supportTextEnd:{control:{type:"text"}},textarea:{control:{type:"boolean"}}},args:{label:"Label",value:"",type:"text",supportText:"",supportTextEnd:"",textarea:!1,showClear:!1,labelPosition:"inset",labelAlignment:"default",invalid:!1,required:!1,optional:!1,disabled:!1,floatLabel:!1,variant:"outlined",theme:"default",shape:"default",density:"default",dense:!1,popoverIcon:!1,popoverExpanded:!1,supportTextInset:"none"}},a={},l={...n,args:{textarea:!0}},r={...n,args:{labelPosition:"block-start"}},s={...n,args:{labelPosition:"inline-start"}};var d,c,m;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:"{}",...(m=(c=a.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var u,x,b;l.parameters={...l.parameters,docs:{...(u=l.parameters)==null?void 0:u.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    textarea: true
  }
}`,...(b=(x=l.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var f,$,y;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    labelPosition: 'block-start'
  }
}`,...(y=($=r.parameters)==null?void 0:$.docs)==null?void 0:y.source}}};var v,T,h;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    labelPosition: 'inline-start'
  }
}`,...(h=(T=s.parameters)==null?void 0:T.docs)==null?void 0:h.source}}};const C=["Demo","Textarea","LabelAbove","LabelInline"],U=Object.freeze(Object.defineProperty({__proto__:null,Demo:a,LabelAbove:r,LabelInline:s,Textarea:l,__namedExportsOrder:C,default:g},Symbol.toStringTag,{value:"Module"}));export{a as D,r as L,U as T,l as a,s as b};
