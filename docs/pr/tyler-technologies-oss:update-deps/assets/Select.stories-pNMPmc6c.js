import{E as r,x as s}from"./iframe-BnJdS9oE.js";import{g as d,s as a,G as m,a as u}from"./utils-D7XrLKwY.js";import{o as f}from"./style-map-DVE0Z-ag.js";import{s as b}from"./decorators-B1RYw9iA.js";import"./feature-detection-BwPJgXni.js";import"./select-dropdown-Du1d_a8s.js";import"./linear-progress-CfBpjTvZ.js";import"./list-ucSdTmS4.js";import"./popover-CCIxKg31.js";import"./overlay-B72xXWi5.js";import"./index-5CPwzmQS.js";import"./skeleton-1JRnRe4N.js";import"./icon-FzRol6Tl.js";import"./select-CJYQS9kr.js";import"./label-73doN4RE.js";import"./button-Bjtey6FZ.js";import"./focus-indicator-B9KMEBVK.js";import"./state-layer-CLjAHnoF.js";import"./button-toggle-group-C96H3ppB.js";import"./checkbox-DYAJ7rMi.js";import"./icon-button-DpLi6_yQ.js";import"./switch-WjqoziFM.js";const g="forge-select{max-width:256px}",{action:x}=__STORYBOOK_MODULE_ACTIONS__,i="forge-select",$=x("change"),T={title:"Components/Select",component:i,subcomponents:{"Forge Option":"forge-option","Forge Option Group":"forge-option-group"},render:e=>{const p=u(e),c=p?f(p):r;return s`
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
        style=${c}
        @change=${$}>
        <forge-option value="1">Option 1</forge-option>
        <forge-option value="2">Option 2</forge-option>
        <forge-option value="3">Option 3</forge-option>
        ${e.supportText.length?s`<span slot="support-text">${e.supportText}</span>`:r}
        ${e.supportTextEnd.length?s`<span slot="support-text-end">${e.supportTextEnd}</span>`:r}
      </forge-text-field>
    `},decorators:[b(g)],argTypes:{...d({tagName:i,exclude:["popoverTargetElement","popoverIcon","popoverExpanded","value","selectedIndex","options","optionBuilder","selectedTextBuilder","popupElement","beforeValueChange"],controls:{labelPosition:{control:"select",options:["inline-start","inline-end","block-start","inset","none"]},labelAlignment:{control:"select",options:["default","center","baseline","start","end"]},variant:{control:"select",options:["plain","outlined","tonal","filled","raised"]},theme:{control:"select",options:[...m,"default"]},shape:{control:"select",options:["default","rounded","squared"]},density:{control:"select",options:["default","extra-small","small","medium","large","extra-large"]},supportTextInset:{control:"select",options:["start","end","both","none"]}}}),supportText:{control:{type:"text"}},supportTextEnd:{control:{type:"text"}}},args:{label:"Label",placeholder:"",multiple:!1,labelPosition:"inset",labelAlignment:"default",variant:"outlined",theme:"default",shape:"default",density:"default",dense:!1,supportText:"",supportTextEnd:"",invalid:!1,required:!1,optional:!1,disabled:!1,floatLabel:!1,supportTextInset:"none",open:!1}},t={},o={...a,args:{labelPosition:"block-start"}},n={...a,args:{labelPosition:"inline-start"}},l={...a,args:{multiple:!0}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    labelPosition: 'block-start'
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    labelPosition: 'inline-start'
  }
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    multiple: true
  }
}`,...l.parameters?.docs?.source}}};const h=["Demo","LabelAbove","LabelInline","Multiple"],z=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,LabelAbove:o,LabelInline:n,Multiple:l,__namedExportsOrder:h,default:T},Symbol.toStringTag,{value:"Module"}));export{t as D,o as L,l as M,z as S,n as a};
