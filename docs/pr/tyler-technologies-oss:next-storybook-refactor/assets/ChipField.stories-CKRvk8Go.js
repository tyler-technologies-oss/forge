import{x as h,T as g}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{o as v}from"./style-map-D0ILlpbs.js";import{a as m}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{a as $,g as x,G as A}from"./utils-d6LfNt4R.js";import"./chip-field-DyLsRC_p.js";import"./label-D62slEY0.js";import"./index-Dh0vMUMR.js";import"./button-BDRrw9v7.js";import"./focus-indicator-By3BQe1w.js";import"./state-layer-b0IlkqgO.js";import"./button-toggle-group-D0JifxTm.js";import"./checkbox-BZl9IGGg.js";import"./icon-button-FC5ZAhze.js";import"./icon-V4IE3JYq.js";import"./switch-DljXu9M_.js";const a="forge-chip-field",C=m("forge-chip-field-member-added"),y=m("forge-chip-field-member-removed"),E={title:"Components/Chip Field",render:e=>{const i=$(e),c=i?v(i):g,f=t=>{if(t.target){const n=t.target,r=t.detail,o=document.createElement("forge-chip");o.setAttribute("slot","member"),o.setAttribute("type","field"),o.setAttribute("dense",""),o.addEventListener("forge-chip-delete",b),o.value=r,o.textContent=r,n.appendChild(o)}C(t)},u=t=>{t.detail.remove(),y(t)},b=t=>{t.target&&t.target.remove()};return h`
      <forge-chip-field 
        .addOnBlur=${e.addOnBlur}
        .floatLabel=${e.floatLabel}
        .labelPosition=${e.labelPosition}
        .labelAlignment=${e.labelAlignment}
        .invalid=${e.invalid}
        .required=${e.required}
        .optional=${e.optional}
        .disabled=${e.disabled}
        .dense=${e.dense}
        .popoverIcon=${e.popoverIcon}
        .popoverExpanded=${e.popoverExpanded}
        .variant=${e.variant}
        .theme=${e.theme}
        .shape=${e.shape}
        .density=${e.density}
        @forge-chip-field-member-added=${f}
        @forge-chip-field-member-removed=${u}
        style=${c}>
        <label slot="label" for="tag-input">Tags</label>
        <input type="text" id="tag-input" />
        <div slot="helper-text">Press enter to create a tag</div>
      </forge-chip-field>
    `},component:a,subcomponents:{Chip:"forge-chip"},argTypes:{...x({tagName:a,exclude:["value","popoverTargetElement","supportTextInset"],controls:{labelPosition:{control:"select",options:["inline-start","inline-end","block-start","inset","none"]},labelAlignment:{control:"select",options:["default","center","baseline","start","end"]},variant:{control:"select",options:["plain","outlined","tonal","filled","raised"]},shape:{control:"select",options:["default","rounded","square"]},density:{control:"select",options:["default","extra-small","small","medium","large","extra-large"]},theme:{control:"select",options:["default",...A]}}})},args:{addOnBlur:!1,floatLabel:!1,labelPosition:"inset",labelAlignment:"default",invalid:!1,required:!1,optional:!1,disabled:!1,dense:!1,popoverIcon:!1,popoverExpanded:!1}},l={};var s,d,p;l.parameters={...l.parameters,docs:{...(s=l.parameters)==null?void 0:s.docs,source:{originalSource:"{}",...(p=(d=l.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};const O=["Demo"],w=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,__namedExportsOrder:O,default:E},Symbol.toStringTag,{value:"Module"}));export{w as C,l as D};
