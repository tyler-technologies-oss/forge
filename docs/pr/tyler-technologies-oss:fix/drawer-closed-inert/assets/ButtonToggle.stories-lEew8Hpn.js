import{E as u,x as c}from"./iframe-Zi_yFChD.js";import{g as r,G as m,a as i}from"./utils-BfYLGoHh.js";import{o as d}from"./style-map-CwoYj-4x.js";import"./service-adapter-CffG5Lhq.js";import"./button-toggle-group-NdkMCNt6.js";import"./focus-indicator-B0oakgHm.js";const{action:a}=__STORYBOOK_MODULE_ACTIONS__,n="forge-button-toggle-group",g="forge-button-toggle",p=a("forge-button-toggle-group-change"),o=a("forge-button-toggle-select"),f={title:"Components/Button Toggle",render:e=>{const l=i(e),s=l?d(l):u;return c`
      <forge-button-toggle-group
        .outlined=${e.outlined}
        .multiple=${e.multiple}
        .stretch=${e.stretch}
        .mandatory=${e.mandatory}
        .vertical=${e.vertical}
        .disabled=${e.disabled}
        .dense=${e.dense}
        .theme=${e.theme}
        ?readonly=${e.readonly}
        ?required=${e.required}
        aria-label="Choose communication type"
        @forge-button-toggle-group-change=${p}
        style=${s}>
        <forge-button-toggle .required=${e.selected} .selected=${e.selected} value="email" @forge-button-toggle-select=${o}
          >By email</forge-button-toggle
        >
        <forge-button-toggle value="mail" @forge-button-toggle-select=${o}>By mail</forge-button-toggle>
        <forge-button-toggle value="phone" @forge-button-toggle-select=${o}>By phone</forge-button-toggle>
      </forge-button-toggle-group>
    `},component:n,subcomponents:{"Button Toggle":g},argTypes:{...r({tagName:`${n}`,exclude:["value","required"],controls:{theme:{control:"select",options:["default",...m]}}}),...r({tagName:`${g}`,exclude:["value","required"]})},args:{outlined:!0,multiple:!1,stretch:!1,mandatory:!1,vertical:!1,disabled:!1,readonly:!1,dense:!1,selected:!1,theme:"tertiary"}},t={};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};const b=["Demo"],v=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:b,default:f},Symbol.toStringTag,{value:"Module"}));export{v as B,t as D};
