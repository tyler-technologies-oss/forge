import{E as r,x as s}from"./iframe-mS7RoxC1.js";import{g as v,s as a,G as O,a as P}from"./utils-BIyK4qxX.js";import{o as _}from"./style-map-2A53FHV0.js";import{s as E}from"./decorators-GmMkt5pq.js";import"./feature-detection-uS6p5jc8.js";import"./select-dropdown-Qp4OpFw2.js";import"./linear-progress-2PahUgVv.js";import"./list-CWXU2VGN.js";import"./popover-CkPGSxIK.js";import"./overlay-rvLcgp1q.js";import"./index-CiLSBptl.js";import"./skeleton-C4EH8VF8.js";import"./icon-BIwO9Z2o.js";import"./select-C5AOzonp.js";import"./label-Bs2Fua0N.js";import"./button-axir9R8P.js";import"./focus-indicator-IWpzSXYP.js";import"./state-layer-BFwsAUDA.js";import"./button-toggle-group-D5jBldBo.js";import"./checkbox-DOmkbh7U.js";import"./icon-button-BTs0N2W7.js";import"./switch-Bt2bdQXJ.js";const A="forge-select{max-width:256px}",{action:L}=__STORYBOOK_MODULE_ACTIONS__,i="forge-select",I=L("change"),M={title:"Components/Select",component:i,subcomponents:{"Forge Option":"forge-option","Forge Option Group":"forge-option-group"},render:e=>{const p=P(e),S=p?_(p):r;return s`
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
        style=${S}
        @change=${I}>
        <forge-option value="1">Option 1</forge-option>
        <forge-option value="2">Option 2</forge-option>
        <forge-option value="3">Option 3</forge-option>
        ${e.supportText.length?s`<span slot="support-text">${e.supportText}</span>`:r}
        ${e.supportTextEnd.length?s`<span slot="support-text-end">${e.supportTextEnd}</span>`:r}
      </forge-text-field>
    `},decorators:[E(A)],argTypes:{...v({tagName:i,exclude:["popoverTargetElement","popoverIcon","popoverExpanded","value","selectedIndex","options","optionBuilder","selectedTextBuilder","popupElement","beforeValueChange"],controls:{labelPosition:{control:"select",options:["inline-start","inline-end","block-start","inset","none"]},labelAlignment:{control:"select",options:["default","center","baseline","start","end"]},variant:{control:"select",options:["plain","outlined","tonal","filled","raised"]},theme:{control:"select",options:[...O,"default"]},shape:{control:"select",options:["default","rounded","squared"]},density:{control:"select",options:["default","extra-small","small","medium","large","extra-large"]},supportTextInset:{control:"select",options:["start","end","both","none"]}}}),supportText:{control:{type:"text"}},supportTextEnd:{control:{type:"text"}}},args:{label:"Label",placeholder:"",multiple:!1,labelPosition:"inset",labelAlignment:"default",variant:"outlined",theme:"default",shape:"default",density:"default",dense:!1,supportText:"",supportTextEnd:"",invalid:!1,required:!1,optional:!1,disabled:!1,floatLabel:!1,supportTextInset:"none",open:!1}},t={},o={...a,args:{labelPosition:"block-start"}},n={...a,args:{labelPosition:"inline-start"}},l={...a,args:{multiple:!0}};var c,d,m;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:"{}",...(m=(d=t.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var u,f,b;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    labelPosition: 'block-start'
  }
}`,...(b=(f=o.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var g,x,$;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    labelPosition: 'inline-start'
  }
}`,...($=(x=n.parameters)==null?void 0:x.docs)==null?void 0:$.source}}};var T,h,y;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    multiple: true
  }
}`,...(y=(h=l.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const C=["Demo","LabelAbove","LabelInline","Multiple"],te=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,LabelAbove:o,LabelInline:n,Multiple:l,__namedExportsOrder:C,default:M},Symbol.toStringTag,{value:"Module"}));export{t as D,o as L,l as M,te as S,n as a};
