import"./lit-element-JplMEnZc.js";import{x as c}from"./lit-html-paDGiEfB.js";import{a as i}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{g as s}from"./utils-D5U1kRmx.js";import"./feature-detection-DRCh51Sa.js";import"./keyboard-shortcut-CDd1YIFs.js";import"./button-DaDzbT7D.js";import"./focus-indicator-DzT8BbE-.js";import"./index-BmocOEUj.js";import"./state-layer-IxmMcKDT.js";const o="forge-keyboard-shortcut",n=i("forge-keyboard-shortcut-activate"),p=i("activateCallback"),d={title:"Components/Keyboard Shortcut",render:e=>c`
      <forge-button variant="raised">Shortcut target</forge-button>
      <forge-keyboard-shortcut
        .activateCallback=${p}
        .keyBinding=${e.keyBinding}
        .global=${e.global}
        .allowWhileTyping=${e.allowWhileTyping}
        .preventDefault=${e.preventDefault}
        .capture=${e.capture}
        .useCode=${e.useCode}
        .disabled=${e.disabled}
        @forge-keyboard-shortcut-activate=${n}>
      </forge-keyboard-shortcut>
    `,component:o,argTypes:{...s({tagName:o,exclude:["activateCallback","target","key"]})},args:{keyBinding:"a",global:!1,allowWhileTyping:!1,preventDefault:!1,capture:!1,useCode:!1,disabled:!1}},t={};var a,r,l;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:"{}",...(l=(r=t.parameters)==null?void 0:r.docs)==null?void 0:l.source}}};const u=["Demo"],S=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:u,default:d},Symbol.toStringTag,{value:"Module"}));export{t as D,S as K};
