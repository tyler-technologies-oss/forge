import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{g as i}from"./iframe-B8S20_VI.js";import{_ as a,l as o,m as s,n as c,s as l}from"./utils-BifgMLEM.js";import{n as u,t as d}from"./decorators-CjEroPVL.js";import{r as f,t as p}from"./style-map-C_WKUe4Y.js";import{t as m}from"./select-DXif6aAM.js";var h;function g(){return(g=e((()=>{h=`forge-select{max-width:256px}`})))()}var _=t({Demo:()=>C,LabelAbove:()=>w,LabelInline:()=>T,Multiple:()=>E,SelectAll:()=>D,__namedExportsOrder:()=>O,default:()=>S}),v,y,b,x,S,C,w,T,E,D,O;function k(){return(k=e((()=>{i(),s(),p(),d(),m(),g(),{action:v}=__STORYBOOK_MODULE_ACTIONS__,y=`forge-select`,b=v(`change`),x=v(`forge-select-all`),S={title:`Components/Select`,component:y,subcomponents:{"Forge Option":`forge-option`,"Forge Option Group":`forge-option-group`},render:e=>{let t=o(e),i=t?f(t):r;return n`
      <forge-select
        label=${e.label??r}
        label-position=${e.labelPosition??r}
        label-alignment=${e.labelAlignment??r}
        variant=${e.variant??r}
        theme=${e.theme??``}
        shape=${e.shape??r}
        density=${e.density??r}
        placeholder=${e.placeholder??r}
        ?dense=${e.dense}
        ?support-text-inset=${e.supportTextInset}
        ?float-label=${e.floatLabel}
        ?multiple=${e.multiple}
        ?show-select-all=${e.showSelectAll}
        select-all-label=${e.selectAllLabel??r}
        ?open=${e.open}
        ?optional=${e.optional}
        ?disabled=${e.disabled}
        ?readonly=${e.readonly}
        ?required=${e.required}
        ?invalid=${e.invalid}
        style=${i}
        @change=${b}
        @forge-select-all=${x}>
        <forge-option value="1">Option 1</forge-option>
        <forge-option value="2">Option 2</forge-option>
        <forge-option value="3">Option 3</forge-option>
        ${e.supportText.length?n`<span slot="support-text">${e.supportText}</span>`:r}
        ${e.supportTextEnd.length?n`<span slot="support-text-end">${e.supportTextEnd}</span>`:r}
      </forge-select>
    `},decorators:[u(h)],argTypes:{...l({tagName:y,exclude:[`popoverTargetElement`,`popoverIcon`,`popoverExpanded`,`value`,`selectedIndex`,`options`,`optionBuilder`,`selectedTextBuilder`,`popupElement`,`beforeValueChange`,`showSelectAll`],controls:{labelPosition:{control:`select`,options:[`inline-start`,`inline-end`,`block-start`,`inset`,`none`]},labelAlignment:{control:`select`,options:[`default`,`center`,`baseline`,`start`,`end`]},variant:{control:`select`,options:[`plain`,`outlined`,`tonal`,`filled`,`raised`]},theme:{control:`select`,options:[...c,`default`]},shape:{control:`select`,options:[`default`,`rounded`,`squared`]},density:{control:`select`,options:[`default`,`extra-small`,`small`,`medium`,`large`,`extra-large`]},supportTextInset:{control:`select`,options:[`start`,`end`,`both`,`none`]}}}),supportText:{control:{type:`text`}},supportTextEnd:{control:{type:`text`}},showSelectAll:{control:{type:`boolean`}},selectAllLabel:{control:{type:`text`}}},args:{label:`Label`,placeholder:``,multiple:!1,labelPosition:`inset`,labelAlignment:`default`,variant:`outlined`,theme:`default`,shape:`default`,density:`default`,dense:!1,supportText:``,supportTextEnd:``,invalid:!1,required:!1,optional:!1,disabled:!1,readonly:!1,floatLabel:!1,supportTextInset:`none`,open:!1,showSelectAll:!1,selectAllLabel:`Select all`}},C={},w={...a,args:{labelPosition:`block-start`}},T={...a,args:{labelPosition:`inline-start`}},E={...a,args:{multiple:!0}},D={parameters:{controls:{disable:!0}},args:{multiple:!0,showSelectAll:!0}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    labelPosition: 'block-start'
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    labelPosition: 'inline-start'
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    multiple: true
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  args: {
    multiple: true,
    showSelectAll: true
  }
}`,...D.parameters?.docs?.source}}},O=[`Demo`,`LabelAbove`,`LabelInline`,`Multiple`,`SelectAll`]})))()}export{D as a,E as i,w as n,_ as o,T as r,k as s,C as t};