import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-Cygt-aqC.js";import{_ as a,l as o,m as s,n as c,s as l}from"./utils-C3ow8Ikc.js";import{n as u,t as d}from"./decorators-CIf0wI47.js";import{r as f,t as p}from"./style-map-C_WKUe4Y.js";import{t as m}from"./text-field-BOfJMjtJ.js";var h;function g(){return(g=e((()=>{h=`forge-text-field{max-width:500px}`})))()}var _=t({Demo:()=>b,LabelAbove:()=>S,LabelInline:()=>C,Textarea:()=>x,__namedExportsOrder:()=>w,default:()=>y}),v,y,b,x,S,C,w;function T(){return(T=e((()=>{i(),p(),d(),s(),m(),g(),v=`forge-text-field`,y={title:`Components/Text Field`,component:v,render:e=>{let t=o(e),i=t?f(t):r;return n`
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
        style=${i}>
        ${e.label.length?n`<label>${e.label}</label>`:r}
        ${e.textarea?n`<textarea placeholder=${e.placeholder??r} .value=${e.value}></textarea>`:n`<input .type=${e.type||`text`} placeholder=${e.placeholder??r} .value=${e.value} />`}
        ${e.supportText.length?n`<span slot="support-text">${e.supportText}</span>`:r}
        ${e.supportTextEnd.length?n`<span slot="support-text-end">${e.supportTextEnd}</span>`:r}
      </forge-text-field>
    `},decorators:[u(h)],parameters:{actions:{disable:!0}},argTypes:{...l({tagName:v,exclude:[`popoverTargetElement`],controls:{labelPosition:{control:`select`,options:[`inline-start`,`inline-end`,`block-start`,`inset`,`none`]},labelAlignment:{control:`select`,options:[`default`,`center`,`baseline`,`start`,`end`]},variant:{control:`select`,options:[`plain`,`outlined`,`tonal`,`filled`,`raised`]},theme:{control:`select`,options:[...c,`default`]},shape:{control:`select`,options:[`default`,`rounded`,`squared`]},density:{control:`select`,options:[`default`,`extra-small`,`small`,`medium`,`large`,`extra-large`]},supportTextInset:{control:`select`,options:[`start`,`end`,`both`,`none`]}}}),label:{control:{type:`text`}},value:{control:{type:`text`}},placeholder:{control:{type:`text`}},type:{control:`select`,options:[`text`,`password`,`email`,`number`,`tel`,`url`]},supportText:{control:{type:`text`}},supportTextEnd:{control:{type:`text`}},textarea:{control:{type:`boolean`}}},args:{label:`Label`,value:``,type:`text`,supportText:``,supportTextEnd:``,textarea:!1,showClear:!1,labelPosition:`inset`,labelAlignment:`default`,invalid:!1,required:!1,optional:!1,disabled:!1,floatLabel:!1,variant:`outlined`,theme:`default`,shape:`default`,density:`default`,dense:!1,popoverIcon:!1,popoverExpanded:!1,supportTextInset:`none`}},b={},x={...a,args:{textarea:!0}},S={...a,args:{labelPosition:`block-start`}},C={...a,args:{labelPosition:`inline-start`}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    textarea: true
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    labelPosition: 'block-start'
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    labelPosition: 'inline-start'
  }
}`,...C.parameters?.docs?.source}}},w=[`Demo`,`Textarea`,`LabelAbove`,`LabelInline`]})))()}export{x as a,_ as i,S as n,T as o,C as r,b as t};