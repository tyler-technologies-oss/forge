import{A as t,b as a}from"./iframe-D3Oii2TL.js";import{s as p,g as u,b,G as f}from"./utils-B3jYbaiS.js";import{o as g}from"./style-map-CFX20BJT.js";import{s as S}from"./decorators-Bq3mcwYy.js";import"./service-adapter-8tADcN_b.js";import"./select-dropdown-CqT4T8LQ.js";import"./linear-progress-DLb8lZjg.js";import"./list-BRTZHC4C.js";import"./popover-88j80EOP.js";import"./overlay-yYpcIpns.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-DYD8m2j0.js";import"./tyler-icons-CWFKOemj.js";import"./select-4VeiR_E8.js";import"./label-DTIviHOl.js";import"./button-CSCDv7wg.js";import"./focus-indicator-BZl6qRLK.js";import"./state-layer-RJ83GVyt.js";import"./button-toggle-group-CZruN2gd.js";import"./checkbox-DU0EpUEb.js";import"./icon-button-C1Zmz9J7.js";import"./switch-Cw2nKkSw.js";const x="forge-select{max-width:256px}",{action:m}=__STORYBOOK_MODULE_ACTIONS__,c="forge-select",h=m("change"),$=m("forge-select-all"),A={title:"Components/Select",component:c,subcomponents:{"Forge Option":"forge-option","Forge Option Group":"forge-option-group"},render:e=>{const i=b(e),d=i?g(i):t;return a`
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
        style=${d}
        @change=${h}
        @forge-select-all=${$}>
        <forge-option value="1">Option 1</forge-option>
        <forge-option value="2">Option 2</forge-option>
        <forge-option value="3">Option 3</forge-option>
        ${e.supportText.length?a`<span slot="support-text">${e.supportText}</span>`:t}
        ${e.supportTextEnd.length?a`<span slot="support-text-end">${e.supportTextEnd}</span>`:t}
      </forge-select>
    `},decorators:[S(x)],argTypes:{...u({tagName:c,exclude:["popoverTargetElement","popoverIcon","popoverExpanded","value","selectedIndex","options","optionBuilder","selectedTextBuilder","popupElement","beforeValueChange","showSelectAll"],controls:{labelPosition:{control:"select",options:["inline-start","inline-end","block-start","inset","none"]},labelAlignment:{control:"select",options:["default","center","baseline","start","end"]},variant:{control:"select",options:["plain","outlined","tonal","filled","raised"]},theme:{control:"select",options:[...f,"default"]},shape:{control:"select",options:["default","rounded","squared"]},density:{control:"select",options:["default","extra-small","small","medium","large","extra-large"]},supportTextInset:{control:"select",options:["start","end","both","none"]}}}),supportText:{control:{type:"text"}},supportTextEnd:{control:{type:"text"}},showSelectAll:{control:{type:"boolean"}},selectAllLabel:{control:{type:"text"}}},args:{label:"Label",placeholder:"",multiple:!1,labelPosition:"inset",labelAlignment:"default",variant:"outlined",theme:"default",shape:"default",density:"default",dense:!1,supportText:"",supportTextEnd:"",invalid:!1,required:!1,optional:!1,disabled:!1,floatLabel:!1,supportTextInset:"none",open:!1,showSelectAll:!1,selectAllLabel:"Select all"}},o={},l={...p,args:{labelPosition:"block-start"}},s={...p,args:{labelPosition:"inline-start"}},r={...p,args:{multiple:!0}},n={parameters:{controls:{disable:!0}},args:{multiple:!0,showSelectAll:!0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    labelPosition: 'block-start'
  }
}`,...l.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    labelPosition: 'inline-start'
  }
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    multiple: true
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  args: {
    multiple: true,
    showSelectAll: true
  }
}`,...n.parameters?.docs?.source}}};const y=["Demo","LabelAbove","LabelInline","Multiple","SelectAll"],R=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,LabelAbove:l,LabelInline:s,Multiple:r,SelectAll:n,__namedExportsOrder:y,default:A},Symbol.toStringTag,{value:"Module"}));export{o as D,l as L,r as M,R as S,s as a,n as b};
