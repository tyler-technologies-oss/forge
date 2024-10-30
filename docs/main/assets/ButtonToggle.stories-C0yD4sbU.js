import"./lit-element-Dk2-kgKT.js";import{k as i,D as d}from"./lit-html-DZH-Jm0H.js";import{a as c}from"./chunk-454WOBUV-CM0pFb8Z.js";import{b as p,g as r,G as f}from"./utils-LP4Qb3bB.js";import{s as b}from"./style-map-DxfbqtuX.js";import"./constants-DjE6emXm.js";import"./button-toggle-group-BJ7gYCrU.js";const n="forge-button-toggle-group",g="forge-button-toggle",$=c("forge-button-toggle-group-change"),o=c("forge-button-toggle-select"),y={title:"Components/Button Toggle",render:e=>{const l=p(e),m=l?b(l):d;return i`
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
        @forge-button-toggle-group-change=${$}
        style=${m}>
        <forge-button-toggle .required=${e.selected} .selected=${e.selected} value="email" @forge-button-toggle-select=${o}
          >By email</forge-button-toggle
        >
        <forge-button-toggle value="mail" @forge-button-toggle-select=${o}>By mail</forge-button-toggle>
        <forge-button-toggle value="phone" @forge-button-toggle-select=${o}>By phone</forge-button-toggle>
      </forge-button-toggle-group>
    `},component:n,subcomponents:{"Button Toggle":g},argTypes:{...r({tagName:`${n}`,exclude:["value","required"],controls:{theme:{control:"select",options:["default",...f]}}}),...r({tagName:`${g}`,exclude:["value","required"]})},args:{outlined:!0,multiple:!1,stretch:!1,mandatory:!1,vertical:!1,disabled:!1,readonly:!1,dense:!1,selected:!1,theme:"tertiary"}},t={};var s,a,u;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:"{}",...(u=(a=t.parameters)==null?void 0:a.docs)==null?void 0:u.source}}};const h=["Demo"],q=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:h,default:y},Symbol.toStringTag,{value:"Module"}));export{q as B,t as D};
