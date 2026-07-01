import{A as t,b as r}from"./iframe-CsSGZsWc.js";import{s as p,g as m,b,G as f}from"./utils-GdTrqNrR.js";import{o as g}from"./style-map-T9_Ws2yB.js";import{s as S}from"./decorators-Cn4uqBAJ.js";import"./service-adapter-8tADcN_b.js";import"./select-dropdown-Njm1Bw2z.js";import"./linear-progress-dFUODLVX.js";import"./list-CCIKok9s.js";import"./popover-CZRIaKbl.js";import"./overlay-CX_m1mvq.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-BxrGynUp.js";import"./tyler-icons-CLRLqkf8.js";import"./select-V5lgi0GI.js";import"./label-CCJpr-qV.js";const x="forge-select{max-width:256px}",{action:d}=__STORYBOOK_MODULE_ACTIONS__,c="forge-select",h=d("change"),$=d("forge-select-all"),A={title:"Components/Select",component:c,subcomponents:{"Forge Option":"forge-option","Forge Option Group":"forge-option-group"},render:e=>{const i=b(e),u=i?g(i):t;return r`
      <forge-select
        label=${e.label??t}
        label-position=${e.labelPosition??t}
        label-alignment=${e.labelAlignment??t}
        variant=${e.variant??t}
        theme=${e.theme??""}
        shape=${e.shape??t}
        density=${e.density??t}
        placeholder=${e.placeholder??t}
        ?dense=${e.dense}
        ?support-text-inset=${e.supportTextInset}
        ?float-label=${e.floatLabel}
        ?multiple=${e.multiple}
        ?show-select-all=${e.showSelectAll}
        select-all-label=${e.selectAllLabel??t}
        ?open=${e.open}
        ?optional=${e.optional}
        ?disabled=${e.disabled}
        ?required=${e.required}
        ?invalid=${e.invalid}
        style=${u}
        @change=${h}
        @forge-select-all=${$}>
        <forge-option value="1">Option 1</forge-option>
        <forge-option value="2">Option 2</forge-option>
        <forge-option value="3">Option 3</forge-option>
        ${e.supportText.length?r`<span slot="support-text">${e.supportText}</span>`:t}
        ${e.supportTextEnd.length?r`<span slot="support-text-end">${e.supportTextEnd}</span>`:t}
      </forge-select>
    `},decorators:[S(x)],argTypes:{...m({tagName:c,exclude:["popoverTargetElement","popoverIcon","popoverExpanded","value","selectedIndex","options","optionBuilder","selectedTextBuilder","popupElement","beforeValueChange","showSelectAll"],controls:{labelPosition:{control:"select",options:["inline-start","inline-end","block-start","inset","none"]},labelAlignment:{control:"select",options:["default","center","baseline","start","end"]},variant:{control:"select",options:["plain","outlined","tonal","filled","raised"]},theme:{control:"select",options:[...f,"default"]},shape:{control:"select",options:["default","rounded","squared"]},density:{control:"select",options:["default","extra-small","small","medium","large","extra-large"]},supportTextInset:{control:"select",options:["start","end","both","none"]}}}),supportText:{control:{type:"text"}},supportTextEnd:{control:{type:"text"}},showSelectAll:{control:{type:"boolean"}},selectAllLabel:{control:{type:"text"}}},args:{label:"Label",placeholder:"",multiple:!1,labelPosition:"inset",labelAlignment:"default",variant:"outlined",theme:"default",shape:"default",density:"default",dense:!1,supportText:"",supportTextEnd:"",invalid:!1,required:!1,optional:!1,disabled:!1,floatLabel:!1,supportTextInset:"none",open:!1,showSelectAll:!1,selectAllLabel:"Select all"}},o={},l={...p,args:{labelPosition:"block-start"}},s={...p,args:{labelPosition:"inline-start"}},n={...p,args:{multiple:!0}},a={parameters:{controls:{disable:!0}},args:{multiple:!0,showSelectAll:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    labelPosition: 'block-start'
  }
}`,...l.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    labelPosition: 'inline-start'
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    multiple: true
  }
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  args: {
    multiple: true,
    showSelectAll: true
  }
}`,...a.parameters?.docs?.source}}};const y=["Demo","LabelAbove","LabelInline","Multiple","SelectAll"],N=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,LabelAbove:l,LabelInline:s,Multiple:n,SelectAll:a,__namedExportsOrder:y,default:A},Symbol.toStringTag,{value:"Module"}));export{o as D,l as L,n as M,N as S,s as a,a as b};
