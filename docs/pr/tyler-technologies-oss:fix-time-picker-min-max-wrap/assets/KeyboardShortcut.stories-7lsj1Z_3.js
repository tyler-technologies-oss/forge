import{x as i}from"./iframe-Cnwcw40-.js";import{g as n}from"./utils-Bnph8n13.js";import"./feature-detection-uS6p5jc8.js";import"./keyboard-shortcut-Cs_3tUZu.js";import"./button-r2EMLpWm.js";import"./focus-indicator-IWpzSXYP.js";import"./index-CiLSBptl.js";import"./state-layer-BFwsAUDA.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,o="forge-keyboard-shortcut",s=c("forge-keyboard-shortcut-activate"),d=c("activateCallback"),p={title:"Components/Keyboard Shortcut",render:e=>i`
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
    `,component:o,argTypes:{...n({tagName:o,exclude:["activateCallback","target","key"]})},args:{keyBinding:"a",global:!1,allowWhileTyping:!1,preventDefault:!1,capture:!1,useCode:!1,disabled:!1}},t={};var a,r,l;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:"{}",...(l=(r=t.parameters)==null?void 0:r.docs)==null?void 0:l.source}}};const u=["Demo"],h=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:u,default:p},Symbol.toStringTag,{value:"Module"}));export{t as D,h as K};
