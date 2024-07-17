import{x as t,T as n}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as y,g as v,G as T,s as h}from"./utils-BJOK626P.js";import{o as S}from"./style-map-D0ILlpbs.js";import{n as g,e as E}from"./ref-BorTy8X1.js";import"./constants-DjE6emXm.js";import"./base-field-DI05trcI.js";import"./focus-indicator-BPFZRBe9.js";import"./index-Dh0vMUMR.js";import"./label-u49DyhbP.js";import"./button-BZEZMHKM.js";import"./state-layer-D8bHAvjj.js";import"./button-toggle-group-CVRZEG3N.js";import"./checkbox-an-Xb1xB.js";import"./icon-button-B2LQlK1e.js";import"./icon-DjINFoyU.js";import"./switch-CiP8pWu1.js";import{s as x}from"./decorators-EVhofM2Q.js";const s="forge-field",I={title:"Components/Field",component:s,render:e=>{const a=y(e),b=a?S(a):n,r=E();function i({target:$}){r.value.floatLabel=!!$.value}return t`
      <forge-field
        ${g(r)}
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
        .floatLabel=${e.floatLabel||!!e.value}
        .multiline=${e.multiline}
        ?optional=${e.optional}
        ?disabled=${e.disabled}
        ?required=${e.required}
        ?invalid=${e.invalid}
        style=${b}>
        ${e.label.length?t`<label for="my-input">${e.label}</label>`:n}
        ${e.multiline?t`<textarea .value=${e.value} @input=${i}></textarea>`:t`<input id="my-input" type="text" .value=${e.value} @input=${i} />`}
        ${e.supportText.length?t`<span slot="support-text">${e.supportText}</span>`:n}
        ${e.supportTextEnd.length?t`<span slot="support-text-end">${e.supportTextEnd}</span>`:n}
      </forge-field>
    `},parameters:{actions:{disable:!0}},argTypes:{...v({tagName:s,exclude:["popoverTargetElement","focusIndicatorTargetElement","forgeIndicatorFocusMode","focusIndicatorAllowFocus"],controls:{labelPosition:{control:"select",options:["inline-start","inline-end","block-start","inset","none"]},labelAlignment:{control:"select",options:["default","center","baseline","start","end"]},variant:{control:"select",options:["plain","outlined","tonal","filled","raised"]},theme:{control:"select",options:[...T,"default"]},shape:{control:"select",options:["default","rounded","squared"]},density:{control:"select",options:["default","extra-small","small","medium","large","extra-large"]},supportTextInset:{control:"select",options:["start","end","both","none"]}}}),label:{control:{type:"text"}},value:{control:{type:"text"}},supportText:{control:{type:"text"}},supportTextEnd:{control:{type:"text"}},multiline:{control:{type:"boolean"}}},args:{label:"Label",value:"",supportText:"",supportTextEnd:"",multiline:!1,labelPosition:"inset",labelAlignment:"default",invalid:!1,required:!1,optional:!1,disabled:!1,floatLabel:!1,variant:"outlined",theme:"default",shape:"default",density:"default",dense:!1,popoverIcon:!1,popoverExpanded:!1,supportTextInset:"none"}},o={decorators:[x(`
    forge-field {
      max-width: 320px;
    }
  `)]},l={...h,decorators:[x(`
    forge-field {
      max-width: 320px;

      [data-forge-field-input] {
        display: flex;
        align-items: center;
      }
    }
  `)],render:()=>t`
    <forge-field label-position="block-start">
      <span slot="label">Static label</span>
      <span data-forge-field-input>Static value text</span>
    </forge-field>
  `};var p,d,u;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  decorators: [storyStyles(\`
    forge-field {
      max-width: 320px;
    }
  \`)]
}`,...(u=(d=o.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var c,m,f;l.parameters={...l.parameters,docs:{...(c=l.parameters)==null?void 0:c.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  decorators: [storyStyles(\`
    forge-field {
      max-width: 320px;

      [data-forge-field-input] {
        display: flex;
        align-items: center;
      }
    }
  \`)],
  render: () => html\`
    <forge-field label-position="block-start">
      <span slot="label">Static label</span>
      <span data-forge-field-input>Static value text</span>
    </forge-field>
  \`
}`,...(f=(m=l.parameters)==null?void 0:m.docs)==null?void 0:f.source}}};const A=["Demo","StaticField"],R=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,StaticField:l,__namedExportsOrder:A,default:I},Symbol.toStringTag,{value:"Module"}));export{o as D,R as F,l as S};
