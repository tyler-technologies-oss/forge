import{b as r}from"./iframe-CvOKOd3F.js";import{g as l}from"./utils-zCyTXnrZ.js";import"./service-adapter-CoGDs2_3.js";import"./keyboard-shortcut-YNNDN05D.js";import"./button-Bi90NRzP.js";import"./focus-indicator-D4rjhUva.js";import"./state-layer-D7Damx7l.js";const{action:a}=__STORYBOOK_MODULE_ACTIONS__,o="forge-keyboard-shortcut",c=a("forge-keyboard-shortcut-activate"),i=a("activateCallback"),s={title:"Components/Keyboard Shortcut",render:e=>r`
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
  `,component:o,argTypes:{...l({tagName:o,exclude:["activateCallback","target","key"]})},args:{keyBinding:"a",global:!1,allowWhileTyping:!1,preventDefault:!1,capture:!1,useCode:!1,disabled:!1}},t={};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};const n=["Demo"],y=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:n,default:s},Symbol.toStringTag,{value:"Module"}));export{t as D,y as K};
