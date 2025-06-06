import"./lit-element-BuSzPo2N.js";import{x as c}from"./lit-html-Ox1a2bD1.js";import{a as i}from"./index-B-lxVbXh.js";import{g as s}from"./utils-C9ubTmun.js";import"./feature-detection-CY6TVbRZ.js";import"./keyboard-shortcut-wz335gzF.js";import"./button-CC-L5W3b.js";import"./focus-indicator-Cgfkaa3d.js";import"./index-CiLSBptl.js";import"./state-layer-BVsNuAhs.js";const o="forge-keyboard-shortcut",n=i("forge-keyboard-shortcut-activate"),p=i("activateCallback"),d={title:"Components/Keyboard Shortcut",render:e=>c`
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
