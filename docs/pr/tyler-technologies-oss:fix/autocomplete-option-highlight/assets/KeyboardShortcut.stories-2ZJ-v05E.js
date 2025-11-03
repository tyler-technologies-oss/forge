import{x as r}from"./iframe-DmsQxkI_.js";import{g as l}from"./utils-bIwC1Fgv.js";import"./service-adapter-CffG5Lhq.js";import"./keyboard-shortcut-rXqqnOKl.js";import"./button-C-sYPeRE.js";import"./focus-indicator-fQr_SoQN.js";import"./state-layer-gAgMwMHF.js";const{action:a}=__STORYBOOK_MODULE_ACTIONS__,o="forge-keyboard-shortcut",c=a("forge-keyboard-shortcut-activate"),i=a("activateCallback"),n={title:"Components/Keyboard Shortcut",render:e=>r`
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
    `,component:o,argTypes:{...l({tagName:o,exclude:["activateCallback","target","key"]})},args:{keyBinding:"a",global:!1,allowWhileTyping:!1,preventDefault:!1,capture:!1,useCode:!1,disabled:!1}},t={};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};const s=["Demo"],y=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:s,default:n},Symbol.toStringTag,{value:"Module"}));export{t as D,y as K};
