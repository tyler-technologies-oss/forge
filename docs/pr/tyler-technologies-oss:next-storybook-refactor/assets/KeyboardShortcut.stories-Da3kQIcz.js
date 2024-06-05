import{x as i}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as c}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{g as s}from"./utils-Tr_H8vMI.js";import"./keyboard-shortcut-CYFvNlQF.js";import"./button-D5XxdyZ6.js";import"./focus-indicator-By3BQe1w.js";import"./index-Dh0vMUMR.js";import"./state-layer-b0IlkqgO.js";const o="forge-keyboard-shortcut",n=c("forge-keyboard-shortcut-activate"),d=c("activateCallback"),p={title:"Components/Keyboard Shortcut",render:e=>i`
      <forge-button variant="raised">Shortcut target</forge-button>
      <forge-keyboard-shortcut
        .activateCallback=${d}
        .keyBinding=${e.keyBinding}
        .global=${e.global}
        .allowWhileTyping=${e.allowWhileTyping}
        .preventDefault=${e.preventDefault}
        .capture=${e.capture}
        .useCode=${e.useCode}
        .disabled=${e.disabled}
        @forge-keyboard-shortcut-activate=${n}>
      </forge-keyboard-shortcut>
    `,component:o,argTypes:{...s({tagName:o,exclude:["activateCallback","target","key"]})},args:{keyBinding:"a",global:!1,allowWhileTyping:!1,preventDefault:!1,capture:!1,useCode:!1,disabled:!1}},t={};var a,r,l;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:"{}",...(l=(r=t.parameters)==null?void 0:r.docs)==null?void 0:l.source}}};const u=["Demo"],$=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:u,default:p},Symbol.toStringTag,{value:"Module"}));export{t as D,$ as K};
