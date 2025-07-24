import{x as i}from"./iframe-B_AFpbKZ.js";import{g as n}from"./utils-D0zOu5id.js";import"./service-adapter-BykFeYYZ.js";import"./keyboard-shortcut-BkPHDYRH.js";import"./button-BjTHYlPk.js";import"./focus-indicator-CyTlhlQD.js";import"./state-layer-BRTtEqto.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,o="forge-keyboard-shortcut",s=c("forge-keyboard-shortcut-activate"),d=c("activateCallback"),u={title:"Components/Keyboard Shortcut",render:e=>i`
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
        @forge-keyboard-shortcut-activate=${s}>
      </forge-keyboard-shortcut>
    `,component:o,argTypes:{...n({tagName:o,exclude:["activateCallback","target","key"]})},args:{keyBinding:"a",global:!1,allowWhileTyping:!1,preventDefault:!1,capture:!1,useCode:!1,disabled:!1}},t={};var a,r,l;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:"{}",...(l=(r=t.parameters)==null?void 0:r.docs)==null?void 0:l.source}}};const p=["Demo"],_=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:p,default:u},Symbol.toStringTag,{value:"Module"}));export{t as D,_ as K};
