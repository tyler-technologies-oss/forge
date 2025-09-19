import{x as r}from"./iframe-CIxyDGlH.js";import{g as l}from"./utils-D7XrLKwY.js";import"./feature-detection-BwPJgXni.js";import"./keyboard-shortcut-CDvIh3ZR.js";import"./button-Bjtey6FZ.js";import"./focus-indicator-B9KMEBVK.js";import"./index-5CPwzmQS.js";import"./state-layer-CLjAHnoF.js";const{action:a}=__STORYBOOK_MODULE_ACTIONS__,o="forge-keyboard-shortcut",c=a("forge-keyboard-shortcut-activate"),i=a("activateCallback"),n={title:"Components/Keyboard Shortcut",render:e=>r`
      <forge-button variant="raised">Shortcut target</forge-button>
      <forge-keyboard-shortcut
        .activateCallback=${i}
        .keyBinding=${e.keyBinding}
        .global=${e.global}
        .allowWhileTyping=${e.allowWhileTyping}
        .preventDefault=${e.preventDefault}
        .capture=${e.capture}
        .useCode=${e.useCode}
        .disabled=${e.disabled}
        @forge-keyboard-shortcut-activate=${c}>
      </forge-keyboard-shortcut>
    `,component:o,argTypes:{...l({tagName:o,exclude:["activateCallback","target","key"]})},args:{keyBinding:"a",global:!1,allowWhileTyping:!1,preventDefault:!1,capture:!1,useCode:!1,disabled:!1}},t={};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};const s=["Demo"],k=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:s,default:n},Symbol.toStringTag,{value:"Module"}));export{t as D,k as K};
