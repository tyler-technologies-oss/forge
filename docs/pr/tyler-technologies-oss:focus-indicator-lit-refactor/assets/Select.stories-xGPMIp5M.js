import{E as r,x as s}from"./iframe-C-zGdqN1.js";import{g as d,s as a,G as m,a as u}from"./utils-C6yJXN8D.js";import{o as f}from"./style-map-5dBbmg8m.js";import{s as b}from"./decorators-C4_Fy-aL.js";import"./service-adapter-CffG5Lhq.js";import"./select-dropdown-DOSKOwEE.js";import"./linear-progress-r0Hzg69v.js";import"./list-CmHWhttf.js";import"./popover-BWVazmya.js";import"./overlay-B5pGv-rV.js";import"./index-5CPwzmQS.js";import"./skeleton-BSiuL_ME.js";import"./icon-kuXwuZAY.js";import"./select-CW8Q66y_.js";import"./label-T9KNg8gr.js";import"./button-Jx8CpyBN.js";import"./focus-indicator-BjnXPPKr.js";import"./state-layer-gAgMwMHF.js";import"./button-toggle-group-q88-Lmtu.js";import"./checkbox-BNCl0EhR.js";import"./icon-button-CD4lrhc9.js";import"./switch-BF1O_XGo.js";const g="forge-select{max-width:256px}",{action:x}=__STORYBOOK_MODULE_ACTIONS__,i="forge-select",$=x("change"),T={title:"Components/Select",component:i,subcomponents:{"Forge Option":"forge-option","Forge Option Group":"forge-option-group"},render:e=>{const p=u(e),c=p?f(p):r;return s`
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
